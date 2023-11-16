import { CloudinaryImage } from "@cloudinary/url-gen";
import { useState, useMemo, useEffect } from "react";
import { AdvancedImage } from "@cloudinary/react";
import {
  generativeReplace,
  grayscale,
  sepia,
  blur,
  negate,
  pixelate,
} from "@cloudinary/url-gen/actions/effect";
import {
  saturation,
  contrast,
  brightness,
  gamma,
} from "@cloudinary/url-gen/actions/adjust";
import { pad } from "@cloudinary/url-gen/actions/resize";
import { generativeFill } from "@cloudinary/url-gen/qualifiers/background";
import "./Editor.css";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { Position } from "@cloudinary/url-gen/qualifiers/position";
import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { getImage } from "../../services/ImagesServices";
import { useNavigate, useParams } from "react-router-dom";
import { text } from "@cloudinary/url-gen/qualifiers/source";
import { editImage } from "../../services/ImagesServices";
import { ArrowLeftCircle, CircleHalf } from "react-bootstrap-icons";
import { ArrowDownShort } from "react-bootstrap-icons";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { SketchPicker, HuePicker } from "react-color";
import { Download } from "react-bootstrap-icons";
import { AspectRatio } from "react-bootstrap-icons";
import { Sliders2Vertical } from "react-bootstrap-icons";
import { Fonts } from "react-bootstrap-icons";
import { CircleSquare, InfoCircle, Trash3 } from "react-bootstrap-icons";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleHalfStroke,
  faClone,
  faCubes,
  faDroplet,
  faFont,
  faMaximize,
  faMinus,
  faS,
  faSun,
  faSwatchbook,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";

const EditorTool = () => {
  const { id } = useParams();

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actions, setActions] = useState([]);
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [activeButton, setActiveButton] = useState(null);
  const [textOverlay, setTextOverlay] = useState("");
  const [textFont, setTextFont] = useState("arial");
  const [textSize, setTextSize] = useState(100);
  const [textColor, setTextColor] = useState("#000000");
  const [author, setAuthor] = useState(null);
  const navigate = useNavigate();
  const [isApplyingFilter, setIsApplyingFilter] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [isNegate, setIsNegate] = useState(false);
  const [sepiaValue, setSepiaValue] = useState("");
  const [blurValue, setBlurValue] = useState("");
  const [initialImageUrl, setInitialImageUrl] = useState(null);
  const [pixelateValue, setPixelateValue] = useState("");
  const [saturationLevel, setSaturationLevel] = useState("");
  const [contrastLevel, setContrastLevel] = useState("");
  const [brightnessLevel, setBrightnessLevel] = useState("");
  const [gammaLevel, setGammaLevel] = useState("");

  //traer la imagen y poder usarla
  useEffect(() => {
    getImage(id)
      .then((res) => {
        const imageUrlData = res.images[0].split("/");
        const fileName = imageUrlData[imageUrlData.length - 1];
        const imageName = fileName.split(".")[0];
        setInitialImageUrl(`marilu-photography/${imageName}`);
        setImage(`marilu-photography/${imageName}`);
        setAuthor(res.author);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  // Lógica de los filtros que necesitan valores
  const effectsMap = {
    generativeReplace: (itemToReplace, newItem) => {
      return generativeReplace().from(itemToReplace).to(newItem);
    },
    pad: (imageR, width, height) => {
      return imageR.resize(pad().w(width).h(height));
    },
    textOverlay: (textContent, font, size, color) => {
      const textStyle = new TextStyle(font, size)
        .fontWeight("normal")
        .textAlignment("left");

      const textSource = text(textContent, textStyle).textColor(color);
      const overlayAction = source(textSource).position(
        new Position().gravity(compass("center"))
      );

      return overlayAction;
    },
    sepia: (sepiaValue) => {
      return sepia().level(sepiaValue);
    },
    blur: (blurValue) => {
      return blur().strength(blurValue);
    },
    pixelate: (pixelateValue) => {
      return pixelate().squareSize(pixelateValue);
    },
    saturation: (contrastLevel) => {
      return contrast().level(contrastLevel);
    },
    contrast: (saturationLevel) => {
      return saturation().level(saturationLevel);
    },
    brightness: (brightnessLevel) => {
      return brightness().level(brightnessLevel);
    },
    gamma: (gammaLevel) => {
      return gamma().level(gammaLevel);
    },
  };

  // Aplicar la logica de los filtros concatenando con los otros existentes
  const effectSubmitsMap = {
    generativeReplace: () => {
      if (fromText && toText !== "") {
        setActions([
          ...actions,
          { name: "generativeReplace", value: [fromText, toText] },
        ]);
      }
    },
    grayscale: () => {
      setIsGrayscale(true);
      setActions([...actions, { name: "grayscale" }]);
    },
    negate: () => {
      setIsNegate(true);
      setActions([...actions, { name: "negate" }]);
    },
    sepia: () => {
      if (sepiaValue) {
        setActions([...actions, { name: "sepia", value: [sepiaValue] }]);
      }
    },
    blur: () => {
      if (blurValue) {
        setActions([...actions, { name: "blur", value: [blurValue] }]);
      }
    },
    pixelate: () => {
      if (pixelateValue) {
        setActions([...actions, { name: "pixelate", value: [pixelateValue] }]);
      }
    },
    pad: () => {
      if (fromText && toText) {
        setActions([...actions, { name: "pad", value: [fromText, toText] }]);
      }
    },

    textOverlay: () => {
      if (textOverlay && textFont && textSize && textColor) {
        setActions([
          ...actions,
          {
            name: "textOverlay",
            value: [textOverlay, textFont, textSize, textColor],
          },
        ]);
      }
    },
    saturation: () => {
      if (saturationLevel) {
        setActions([
          ...actions,
          { name: "saturation", value: [saturationLevel] },
        ]);
      }
    },
    brightness: () => {
      if (brightnessLevel) {
        setActions([
          ...actions,
          { name: "brightness", value: [brightnessLevel] },
        ]);
      }
    },
    contrast: () => {
      if (contrastLevel) {
        setActions([...actions, { name: "contrast", value: [contrastLevel] }]);
      }
    },
    gamma: () => {
      if (gammaLevel) {
        setActions([...actions, { name: "gamma", value: [gammaLevel] }]);
      }
    },
  };

  //Renderizar los filtros en la imagen

  const renderImage = useMemo(() => {
    let result = new CloudinaryImage(image, { cloudName: "dy2v6iwv8" });

    actions.forEach((currentAction) => {
      if (currentAction.name === "generativeReplace") {
        const [from, to] = currentAction.value;
        result = result.effect(
          effectsMap["generativeReplace"](...currentAction.value)
        );
      } else if (currentAction.name === "grayscale") {
        result = result.effect(grayscale());
      } else if (currentAction.name === "negate") {
        result = result.effect(negate());
      } else if (currentAction.name === "textOverlay") {
        result = result.overlay(
          effectsMap["textOverlay"](...currentAction.value)
        );
      } else if (currentAction.name === "pad") {
        const [width, height] = currentAction.value;
        result = result.resize(
          pad().width(width).height(height).background(generativeFill())
        );
      } else if (currentAction.name === "sepia") {
        const [level] = currentAction.value;
        result = result.effect(effectsMap["sepia"](...currentAction.value));
      } else if (currentAction.name === "blur") {
        const [strength] = currentAction.value;
        result = result.effect(effectsMap["blur"](...currentAction.value));
      } else if (currentAction.name === "pixelate") {
        const [squareSize] = currentAction.value;
        result = result.effect(effectsMap["pixelate"](...currentAction.value));
      } else if (currentAction.name === "saturation") {
        const [level] = currentAction.value;
        result = result.adjust(
          effectsMap["saturation"](...currentAction.value)
        );
      } else if (currentAction.name === "brightness") {
        const [level] = currentAction.value;
        result = result.adjust(
          effectsMap["brightness"](...currentAction.value)
        );
      } else if (currentAction.name === "contrast") {
        const [level] = currentAction.value;
        result = result.adjust(effectsMap["contrast"](...currentAction.value));
      } else if (currentAction.name === "gamma") {
        const [level] = currentAction.value;
        result = result.adjust(effectsMap["contrast"](...currentAction.value));
      }
    });

    return result;
  }, [actions, image]);

  //ACIONES DE LOS BOTONES

  //Volver hacia atrás

  const handleNavigation = () => {
    navigate(-1);
  };

  //Desplegar las secciones

  const handleButtonClick = (button) => {
    if (button === activeButton) {
      setActiveButton(null);
    } else {
      setActiveButton(button);
    }
  };

  //Botón aplicar filtros

  const handleApplyFilter = (actionName, filterFunction) => {
    setIsApplyingFilter(actionName);

    setTimeout(() => {
      filterFunction();
      setIsApplyingFilter(null);
    }, 1000);
  };

  //Botón quitar un filtro

  const handleRemoveFilter = (filterName) => {
    const updatedActions = actions.filter(
      (action) => action.name !== filterName
    );
    setActions(updatedActions);
  };

  //Botón guardar imagen

  const handleSave = () => {
    const editedImageUrl = renderImage.toURL();
    editImage(id, { editedImageUrl })
      .then((res) => {
        console.log(res);
        navigate(`/profile/${author}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //Botón descartar todos los filtros

  const handleDiscardChanges = () => {
    setActions([]);
    setActiveButton(null);
    setActiveFilter(null);
    setImage(initialImageUrl);
  };

  //Botón de descargar imagen

  const handleOpenInNewTab = () => {
    const editedImageUrl = renderImage.toURL();
    window.open(editedImageUrl, "_blank");
  };

  //variables del slider
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="EditorTool-desk hide-on-mobile">
        <div className="row">
          <div className="col-md-3 editor-options">
            <div>
              <button className="btn-back-arrow" onClick={handleNavigation}>
                <ArrowLeftCircle style={{ width: "50px" }} />
              </button>
            </div>
            <div className="editor-inputs">
              <h5>Select Action</h5>
              <div className="my-3 ">
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="tooltip-generative-replace">
                      Use AI to edit your image in the first place
                    </Tooltip>
                  }
                >
                  <button
                    className={` imputs-btn ${
                      activeButton === "generativeReplace" ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick("generativeReplace")}
                  >
                    <span>Generative Replace</span>
                    <span>
                      <ArrowDownShort style={{ width: "20px" }} />
                    </span>
                  </button>
                </OverlayTrigger>
              </div>
              <div>
                {activeButton === "generativeReplace" && (
                  <>
                    <div className="input-container">
                      <label>From</label>
                      <input
                        className="editor-input"
                        type="text"
                        placeholder="e.g. dog"
                        value={fromText}
                        onChange={(e) => setFromText(e.target.value)}
                      />
                    </div>
                    <div className="input-container">
                      <label>To</label>
                      <input
                        className="editor-input"
                        type="text"
                        placeholder="e.g. cat"
                        value={toText}
                        onChange={(e) => setToText(e.target.value)}
                      />
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="apply-edition-btn m-2 m-2"
                        onClick={() =>
                          handleApplyFilter("generativeReplace", () => {
                            effectSubmitsMap["generativeReplace"]();
                            setFromText("");
                            setToText("");
                          })
                        }
                      >
                        {isApplyingFilter === "generativeReplace"
                          ? "Applying..."
                          : "Apply"}
                      </button>
                      <button
                        className="apply-remove-btn m-2"
                        onClick={() => handleRemoveFilter("generativeReplace")}
                      >
                        <Trash3 />
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="my-3 ">
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="tooltip-generative-replace">
                      Apply adjustments to your image
                    </Tooltip>
                  }
                >
                  <button
                    className={` imputs-btn ${
                      activeButton === "adjusts" ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick("adjusts")}
                  >
                    <span>Ajusts</span>
                    <span>
                      <ArrowDownShort style={{ width: "20px" }} />
                    </span>
                  </button>
                </OverlayTrigger>
              </div>
              <div>
                {activeButton === "adjusts" && (
                  <>
                    <div className="input-container">
                      <label>
                        Saturation{" "}
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-saturation-replace">
                              Apply saturation to your image
                            </Tooltip>
                          }
                        >
                          <InfoCircle style={{ width: "15px" }} />
                        </OverlayTrigger>
                      </label>
                      <OverlayTrigger
                        placement="top-end"
                        overlay={
                          <Tooltip id="tooltip-saturation-replace">
                            {saturationLevel ? saturationLevel : 0}
                          </Tooltip>
                        }
                      >
                        <input
                          className="editor-input"
                          type="range"
                          placeholder="50"
                          min="-100"
                          max="100"
                          value={saturationLevel}
                          onChange={(e) => setSaturationLevel(e.target.value)}
                        />
                      </OverlayTrigger>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="apply-edition-btn m-2"
                        onClick={() =>
                          handleApplyFilter("saturation", () => {
                            effectSubmitsMap["saturation"]();
                            setSaturationLevel("");
                          })
                        }
                      >
                        {isApplyingFilter === "saturation"
                          ? "Applying..."
                          : "Apply"}
                      </button>
                      <button
                        className="apply-remove-btn m-2"
                        onClick={() => handleRemoveFilter("saturation")}
                      >
                        <Trash3 />
                      </button>
                    </div>
                    <div className="input-container">
                      <label>
                        Brightness{" "}
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-brightness-replace">
                              Apply brightness to your image
                            </Tooltip>
                          }
                        >
                          <InfoCircle style={{ width: "15px" }} />
                        </OverlayTrigger>
                      </label>
                      <OverlayTrigger
                        placement="top-end"
                        overlay={
                          <Tooltip id="tooltip-saturation-replace">
                            {brightnessLevel ? brightnessLevel : 0}
                          </Tooltip>
                        }
                      >
                        <input
                          className="editor-input"
                          type="range"
                          placeholder="50"
                          min="-99"
                          max="100"
                          value={brightnessLevel}
                          onChange={(e) => setBrightnessLevel(e.target.value)}
                        />
                      </OverlayTrigger>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="apply-edition-btn m-2"
                        onClick={() =>
                          handleApplyFilter("brightness", () => {
                            effectSubmitsMap["brightness"]();
                            setBrightnessLevel("");
                          })
                        }
                      >
                        {isApplyingFilter === "brightness"
                          ? "Applying..."
                          : "Apply"}
                      </button>
                      <button
                        className="apply-remove-btn m-2"
                        onClick={() => handleRemoveFilter("brightness")}
                      >
                        <Trash3 />
                      </button>
                    </div>
                    <div className="input-container">
                      <label>
                        Contrast{" "}
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-contrast-replace">
                              Apply contrast to your image
                            </Tooltip>
                          }
                        >
                          <InfoCircle style={{ width: "15px" }} />
                        </OverlayTrigger>
                      </label>
                      <OverlayTrigger
                        placement="top-end"
                        overlay={
                          <Tooltip id="tooltip-saturation-replace">
                            {contrastLevel ? contrastLevel : 0}
                          </Tooltip>
                        }
                      >
                        <input
                          className="editor-input"
                          type="range"
                          placeholder="50"
                          min="-100"
                          max="100"
                          value={contrastLevel}
                          onChange={(e) => setContrastLevel(e.target.value)}
                        />
                      </OverlayTrigger>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="apply-edition-btn m-2"
                        onClick={() =>
                          handleApplyFilter("contrast", () => {
                            effectSubmitsMap["contrast"]();
                            setContrastLevel("");
                          })
                        }
                      >
                        {isApplyingFilter === "contrast"
                          ? "Applying..."
                          : "Apply"}
                      </button>
                      <button
                        className="apply-remove-btnn m-2"
                        onClick={() => handleRemoveFilter("contrast")}
                      >
                        <Trash3 />
                      </button>
                    </div>
                    <div className="input-container">
                      <label>
                        Gamma{" "}
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-gamma-replace">
                              Apply gamma to your image
                            </Tooltip>
                          }
                        >
                          <InfoCircle style={{ width: "15px" }} />
                        </OverlayTrigger>
                      </label>
                      <OverlayTrigger
                        placement="top-end"
                        overlay={
                          <Tooltip id="tooltip-saturation-replace">
                            {gammaLevel ? gammaLevel : 0}
                          </Tooltip>
                        }
                      >
                        <input
                          className="editor-input"
                          type="range"
                          placeholder="50"
                          min="-50"
                          max="150"
                          value={gammaLevel}
                          onChange={(e) => setGammaLevel(e.target.value)}
                        />
                      </OverlayTrigger>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="apply-edition-btn m-2"
                        onClick={() =>
                          handleApplyFilter("gamma", () => {
                            effectSubmitsMap["gamma"]();
                            setGammaLevel("");
                          })
                        }
                      >
                        {isApplyingFilter === "gamma" ? "Applying..." : "Apply"}
                      </button>
                      <button
                        className="apply-remove-btn m-2"
                        onClick={() => handleRemoveFilter("gamma")}
                      >
                        <Trash3 />
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="my-3 ">
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="tooltip-generative-replace">
                      Apply effects to your image
                    </Tooltip>
                  }
                >
                  <button
                    className={` imputs-btn ${
                      activeButton === "effects" ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick("effects")}
                  >
                    <span>Effects</span>
                    <span>
                      <ArrowDownShort style={{ width: "20px" }} />
                    </span>
                  </button>
                </OverlayTrigger>
              </div>
              <div>
                {activeButton === "effects" && (
                  <>
                    <div className="input-container">
                      <p>
                        Grayscale{" "}
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-grayscale-replace">
                              Apply grayscale effect to your image
                            </Tooltip>
                          }
                        >
                          <InfoCircle style={{ width: "15px" }} />
                        </OverlayTrigger>
                      </p>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="apply-edition-btn m-2"
                        onClick={() =>
                          handleApplyFilter(() =>
                            effectSubmitsMap["grayscale"]()
                          )
                        }
                      >
                        {isApplyingFilter === "grayscale"
                          ? "Applying..."
                          : "Apply"}
                      </button>
                      <button
                        className="apply-remove-btn m-2"
                        onClick={() => handleRemoveFilter("grayscale")}
                      >
                        <Trash3 />
                      </button>
                    </div>
                    <div className="input-container">
                      <label>
                        Sepia{" "}
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-sepia-replace">
                              Apply sepia effect to your image
                            </Tooltip>
                          }
                        >
                          <InfoCircle style={{ width: "15px" }} />
                        </OverlayTrigger>
                      </label>
                      <OverlayTrigger
                        placement="top-end"
                        overlay={
                          <Tooltip id="tooltip-saturation-replace">
                            {sepiaValue ? sepiaValue : 0}
                          </Tooltip>
                        }
                      >
                        <input
                          className="editor-input"
                          type="range"
                          placeholder="50"
                          min="1"
                          max="100"
                          value={sepiaValue}
                          onChange={(e) => setSepiaValue(e.target.value)}
                        />
                      </OverlayTrigger>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="apply-edition-btn m-2"
                        onClick={() =>
                          handleApplyFilter("sepia", () => {
                            effectSubmitsMap["sepia"]();
                            setSepiaValue("");
                          })
                        }
                      >
                        {isApplyingFilter === "sepia" ? "Applying..." : "Apply"}
                      </button>
                      <button
                        className="apply-remove-btn m-2"
                        onClick={() => handleRemoveFilter("sepia")}
                      >
                        <Trash3 />
                      </button>
                    </div>
                    <div className="input-container">
                      <label>
                        Blur{" "}
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-blur-replace">
                              Add blur to your image
                            </Tooltip>
                          }
                        >
                          <InfoCircle style={{ width: "15px" }} />
                        </OverlayTrigger>
                      </label>
                      <OverlayTrigger
                        placement="top-end"
                        overlay={
                          <Tooltip id="tooltip-saturation-replace">
                            {blurValue ? blurValue : 0}
                          </Tooltip>
                        }
                      >
                        <input
                          className="editor-input"
                          type="range"
                          placeholder="50"
                          min="1"
                          max="2000"
                          value={blurValue}
                          onChange={(e) => setBlurValue(e.target.value)}
                        />
                      </OverlayTrigger>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="apply-edition-btn m-2"
                        onClick={() =>
                          handleApplyFilter("blur", () => {
                            effectSubmitsMap["blur"]();
                            setBlurValue("");
                          })
                        }
                      >
                        {isApplyingFilter === "blur" ? "Applying..." : "Apply"}
                      </button>
                      <button
                        className="apply-remove-btn m-2"
                        onClick={() => handleRemoveFilter("blur")}
                      >
                        <Trash3 />
                      </button>
                    </div>
                    <div className="input-container">
                      <p>
                        Negate{" "}
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-negate-replace">
                              Apply negative effect to your image
                            </Tooltip>
                          }
                        >
                          <InfoCircle style={{ width: "15px" }} />
                        </OverlayTrigger>
                      </p>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="apply-edition-btn m-2"
                        onClick={() =>
                          handleApplyFilter(() => effectSubmitsMap["negate"]())
                        }
                      >
                        {isApplyingFilter === "negate"
                          ? "Applying..."
                          : "Apply"}
                      </button>
                      <button
                        className="apply-remove-btn m-2"
                        onClick={() => handleRemoveFilter("negate")}
                      >
                        <Trash3 />
                      </button>
                    </div>
                    <div className="input-container">
                      <label>
                        Pixelate{" "}
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-pixelate-replace">
                              Apply pixelated effect to your image.
                            </Tooltip>
                          }
                        >
                          <InfoCircle style={{ width: "15px" }} />
                        </OverlayTrigger>
                      </label>
                      <OverlayTrigger
                        placement="top-end"
                        overlay={
                          <Tooltip id="tooltip-saturation-replace">
                            {pixelateValue ? pixelateValue : 0}
                          </Tooltip>
                        }
                      >
                        <input
                          className="editor-input"
                          type="range"
                          placeholder="50"
                          min="1"
                          max="200"
                          value={pixelateValue}
                          onChange={(e) => setPixelateValue(e.target.value)}
                        />
                      </OverlayTrigger>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="apply-edition-btn m-2"
                        onClick={() =>
                          handleApplyFilter("pixelate", () => {
                            effectSubmitsMap["pixelate"]();
                            setPixelateValue("");
                          })
                        }
                      >
                        {isApplyingFilter === "pixelate"
                          ? "Applying..."
                          : "Apply"}
                      </button>
                      <button
                        className="apply-remove-btn m-2"
                        onClick={() => handleRemoveFilter("pixelate")}
                      >
                        <Trash3 />
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className="my-3">
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="tooltip-generative-replace">
                      Add text to your image
                    </Tooltip>
                  }
                >
                  <button
                    className={`imputs-btn ${
                      activeButton === "textOverlay" ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick("textOverlay")}
                  >
                    <span>Text Layer</span>
                    <span>
                      <ArrowDownShort style={{ width: "20px" }} />
                    </span>
                  </button>
                </OverlayTrigger>
              </div>
              <div>
                {activeButton === "textOverlay" && (
                  <>
                    <div className="input-container">
                      <label>Text</label>
                      <input
                        className="editor-input"
                        type="text"
                        placeholder="e.g. Your watermark"
                        value={textOverlay}
                        onChange={(e) => setTextOverlay(e.target.value)}
                      />
                    </div>
                    <div className="input-container d-flex flex-column">
                      <label>Font</label>
                      <select
                        className="editor-select"
                        value={textFont}
                        onChange={(e) => setTextFont(e.target.value)}
                      >
                        <option value="Arial">Arial</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Helvetica">Helvetica</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Trebuchet MS">Trebuchet MS</option>
                        <option value="Open Sans">Open Sans</option>
                        <option value="Verdana">Verdana</option>
                      </select>
                    </div>
                    <div className="input-container">
                      <label>Font Size</label>
                      <input
                        className="editor-input"
                        type="number"
                        placeholder="Font Size"
                        value={textSize}
                        onChange={(e) => setTextSize(e.target.value)}
                      />
                    </div>
                    <div className="input-container">
                      <label>Font Color</label>
                      <div className="d-flex justify-content-center mt-2">
                        <HuePicker
                          color={textColor}
                          onChangeComplete={(color) => setTextColor(color.hex)}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="apply-edition-btn m-2"
                        onClick={() =>
                          handleApplyFilter("textOverlay", () => {
                            effectSubmitsMap["textOverlay"]();
                            setTextOverlay("");
                            setTextFont("arial");
                            setTextSize(100);
                            setTextColor("#000000");
                          })
                        }
                      >
                        {isApplyingFilter === "textOverlay"
                          ? "Applying..."
                          : "Apply"}
                      </button>
                      <button
                        className="apply-remove-btn m-2"
                        onClick={() => handleRemoveFilter("textOverlay")}
                      >
                        <Trash3 />
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="my-3 ">
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="tooltip-generative-replace">
                      Resizes the image to fill the specified width and height
                      while, padding is added reach the required size.
                    </Tooltip>
                  }
                >
                  <button
                    className={`imputs-btn ${
                      activeButton === "pad" ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick("pad")}
                  >
                    <span> Generative Background</span>
                    <span>
                      <ArrowDownShort style={{ width: "20px" }} />
                    </span>
                  </button>
                </OverlayTrigger>
              </div>
              <div>
                {activeButton === "pad" && (
                  <>
                    <div className="input-container">
                      <label>Width</label>
                      <input
                        className="editor-input"
                        type="number"
                        placeholder="e.g. 1080px"
                        value={fromText}
                        onChange={(e) => setFromText(e.target.value)}
                      />
                    </div>
                    <div className="input-container">
                      <label>Height</label>
                      <input
                        className="editor-input"
                        type="number"
                        placeholder="e.g. 300px"
                        value={toText}
                        onChange={(e) => setToText(e.target.value)}
                      />
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="apply-edition-btn m-2"
                        onClick={() =>
                          handleApplyFilter("pad", () => {
                            effectSubmitsMap["pad"]();
                            setFromText("");
                            setToText("");
                          })
                        }
                      >
                        {isApplyingFilter === "pad" ? "Applying..." : "Apply"}
                      </button>
                      <button
                        className="apply-remove-btn m-2"
                        onClick={() => handleRemoveFilter("pad")}
                      >
                        <Trash3 />
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="d-flex justify-content-between">
                <button
                  className="action-btn"
                  onClick={handleSave}
                  to={`/profile/${id}`}
                >
                  Save Image
                </button>
                <button className="action-btn" onClick={handleDiscardChanges}>
                  Discard Changes
                </button>

                <button className="download-btn" onClick={handleOpenInNewTab}>
                  <Download />
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-9 img-container-tool">
            <div className="editor-output d-flex align-items-center justify-content-center mt-5">
              <div
                className="image-container"
                style={{ position: "fixed", top: "5rem", bottom: "0" }}
              >
                <AdvancedImage cldImg={renderImage} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* MOBILE       */}
      <div className="EditorTool-mobile hide-on-desk">
        <div className="row">
          <div className="col-md-3 editor-options">
            <div className="d-flex justify-content-between">
              <div>
                <button className="btn-back-arrow" onClick={handleNavigation}>
                  <ArrowLeftCircle style={{ width: "50px" }} />
                </button>
              </div>
              <div className="ations-btns my-3 d-flex justify-content-end">
                <button
                  className="action-btn me-2"
                  onClick={handleDiscardChanges}
                >
                  Discard Changes
                </button>
                <button
                  className="action-btn"
                  onClick={handleSave}
                  to={`/profile/${id}`}
                >
                  Save
                </button>
              </div>
            </div>
            <div className="col-md-9">
              <div className="editor-output d-flex flex-column align-items-center justify-content-center">
                <div>
                  <AdvancedImage cldImg={renderImage} />
                </div>

                <div className="ations-btns my-3">
                  <button className="download-btn" onClick={handleOpenInNewTab}>
                    <Download />
                  </button>
                </div>
              </div>
            </div>

            <div className="editor-inputs">
              <Slider {...settings}>
                <div className="mx-2 text-center">
                  <h6>AI</h6>
                  <button
                    className={` imputs-btn-mbl ${
                      activeButton === "generativeReplace" ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick("generativeReplace")}
                  >
                    <span>
                    <FontAwesomeIcon icon={faClone} size="2x" />                    </span>
                  </button>
                </div>
                <div className="mx-2 text-center">
                  <h6>Saturation</h6>
                  <button
                    className={`imputs-btn-mbl ${
                      activeButton === "saturation" ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick("saturation")}
                  >
                    <FontAwesomeIcon icon={faDroplet} size="2x" />
                  </button>
                </div>
                <div className="mx-2 text-center">
                  <h6>Brightness</h6>
                  <button
                    className={`imputs-btn-mbl ${
                      activeButton === "brightness" ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick("brightness")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faSun} size="2x" />
                    </span>
                  </button>
                </div>
                <div className="mx-2 text-center">
                  <h6>Contrast</h6>
                  <button
                    className={`imputs-btn-mbl ${
                      activeButton === "contrast" ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick("contrast")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faCircleHalfStroke} size="2x" />
                    </span>
                  </button>
                </div>
                <div className="mx-2 text-center">
                  <h6>Gamma</h6>
                  <button
                    className={`imputs-btn-mbl ${
                      activeButton === "gamma" ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick("gamma")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faCircle} size="2x" />
                    </span>
                  </button>
                </div>
                <div className="mx-2 text-center">
                  <h6>Grayscale</h6>
                  <button
                    className={`imputs-btn-mbl ${
                      activeButton === "grayscale" ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick("grayscale")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faSwatchbook} size="2x" />
                    </span>
                  </button>
                </div>
                <div className="mx-2 text-center">
                  <h6>Sepia</h6>
                  <button
                    className={`imputs-btn-mbl ${
                      activeButton === "sepia" ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick("sepia")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faS} size="2x" />
                    </span>
                  </button>
                </div>
                <div className="mx-2 text-center">
                  <h6>Blur</h6>
                  <button
                    className={`imputs-btn-mbl ${
                      activeButton === "blur" ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick("blur")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faWandMagicSparkles} size="2x" />
                    </span>
                  </button>
                </div>
                <div className="mx-2 text-center">
                  <h6>Negate</h6>
                  <button
                    className={`imputs-btn-mbl ${
                      activeButton === "negate" ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick("negate")}
                  >
                    <span>
                    <FontAwesomeIcon icon={faMinus} size="2x" />
                    </span>
                  </button>
                </div>
                <div className="mx-2 text-center">
                  <h6>Pixelate</h6>
                  <button
                    className={`imputs-btn-mbl ${
                      activeButton === "pixelate" ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick("pixelate")}
                  >
                    <span>
                    <FontAwesomeIcon icon={faCubes} size="2x" />
                    </span>
                  </button>
                </div>
                <div className="mx-2 text-center">
                  <h6>Text</h6>
                  <button
                    className={`imputs-btn-mbl ${
                      activeButton === "textOverlay" ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick("textOverlay")}
                  >
                    <span>

                    <FontAwesomeIcon icon={faFont} size="2x" />
                    </span>
                  </button>
                </div>
                <div className="mx-2 text-center">
                  <h6>Resize</h6>
                  <button
                    className={`imputs-btn-mbl ${
                      activeButton === "pad" ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick("pad")}
                  >
                    <span>
                      {" "}
                      <FontAwesomeIcon icon={faMaximize} size="2x" />
                    </span>
                  </button>
                </div>
              </Slider>
            </div>
            <div className="editor-inputs-mbl">
              <div className="mt-4">
                {/*  GENERADOR IA INICIO */}
                <div>
                  {activeButton === "generativeReplace" && (
                    <>
                      <p>Use AI to edit your image in the first place</p>
                      <div className="input-container">
                        <label>From</label>
                        <input
                          className="editor-input"
                          type="text"
                          placeholder="e.g. dog"
                          value={fromText}
                          onChange={(e) => setFromText(e.target.value)}
                        />
                      </div>
                      <div className="input-container">
                        <label>To</label>
                        <input
                          className="editor-input"
                          type="text"
                          placeholder="e.g. cat"
                          value={toText}
                          onChange={(e) => setToText(e.target.value)}
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          className="apply-edition-btn m-2"
                          onClick={() =>
                            handleApplyFilter("generativeReplace", () => {
                              effectSubmitsMap["generativeReplace"]();
                              setFromText("");
                              setToText("");
                            })
                          }
                        >
                          {isApplyingFilter === "generativeReplace"
                            ? "Applying..."
                            : "Apply"}
                        </button>
                        <button
                          className="apply-remove-btn m-2"
                          onClick={() =>
                            handleRemoveFilter("generativeReplace")
                          }
                        >
                          <Trash3 />
                        </button>
                      </div>
                    </>
                  )}
                </div>
                {/*  GENERADOR IA FIN */}

                {/*  saturacion */}
                <div>
                  {activeButton === "saturation" && (
                    <>
                      <p>Apply saturation to your image</p>

                      <div className="input-container">
                        <OverlayTrigger
                          placement="top-end"
                          overlay={
                            <Tooltip id="tooltip-saturation-replace">
                              {saturationLevel ? saturationLevel : 0}
                            </Tooltip>
                          }
                        >
                          <input
                            className="editor-input"
                            type="range"
                            placeholder="50"
                            min="-100"
                            max="100"
                            value={saturationLevel}
                            onChange={(e) => setSaturationLevel(e.target.value)}
                          />
                        </OverlayTrigger>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          className="apply-edition-btn m-2"
                          onClick={() =>
                            handleApplyFilter("saturation", () => {
                              effectSubmitsMap["saturation"]();
                              setSaturationLevel("");
                            })
                          }
                        >
                          {isApplyingFilter === "saturation"
                            ? "Applying..."
                            : "Apply"}
                        </button>
                        <button
                          className="apply-remove-btn m-2"
                          onClick={() => handleRemoveFilter("saturation")}
                        >
                          <Trash3 />
                        </button>
                      </div>
                    </>
                  )}
                </div>
                {/*  saturacion */}

                {/*  brillo */}
                <div>
                  {activeButton === "brightness" && (
                    <>
                      <p>Apply brightness to your image</p>

                      <div className="input-container">
                        <OverlayTrigger
                          placement="top-end"
                          overlay={
                            <Tooltip id="tooltip-brightness-replace">
                              {brightnessLevel ? brightnessLevel : 0}
                            </Tooltip>
                          }
                        >
                          <input
                            className="editor-input"
                            type="range"
                            placeholder="50"
                            min="-99"
                            max="100"
                            value={brightnessLevel}
                            onChange={(e) => setBrightnessLevel(e.target.value)}
                          />
                        </OverlayTrigger>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          className="apply-edition-btn m-2"
                          onClick={() =>
                            handleApplyFilter("brightness", () => {
                              effectSubmitsMap["brightness"]();
                              setBrightnessLevel("");
                            })
                          }
                        >
                          {isApplyingFilter === "brightness"
                            ? "Applying..."
                            : "Apply"}
                        </button>
                        <button
                          className="apply-remove-btn m-2"
                          onClick={() => handleRemoveFilter("brightness")}
                        >
                          <Trash3 />
                        </button>
                      </div>
                    </>
                  )}
                </div>
                {/*  brillo */}

                {/*  contraste */}
                <div>
                  {activeButton === "contrast" && (
                    <>
                      <p>Apply contrast to your image</p>

                      <div className="input-container">
                        <OverlayTrigger
                          placement="top-end"
                          overlay={
                            <Tooltip id="tooltip-contrast-replace">
                              {contrastLevel ? contrastLevel : 0}
                            </Tooltip>
                          }
                        >
                          <input
                            className="editor-input"
                            type="range"
                            placeholder="50"
                            min="-100"
                            max="100"
                            value={contrastLevel}
                            onChange={(e) => setContrastLevel(e.target.value)}
                          />
                        </OverlayTrigger>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          className="apply-edition-btn m-2"
                          onClick={() =>
                            handleApplyFilter("contrast", () => {
                              effectSubmitsMap["contrast"]();
                              setContrastLevel("");
                            })
                          }
                        >
                          {isApplyingFilter === "contrast"
                            ? "Applying..."
                            : "Apply"}
                        </button>
                        <button
                          className="apply-remove-btn m-2"
                          onClick={() => handleRemoveFilter("contrast")}
                        >
                          <Trash3 />
                        </button>
                      </div>
                    </>
                  )}
                </div>
                {/*  contraste */}

                {/*  gamma */}
                <div>
                  {activeButton === "gamma" && (
                    <>
                      <p>Apply gamma to your image</p>

                      <div className="input-container">
                        <OverlayTrigger
                          placement="top-end"
                          overlay={
                            <Tooltip id="tooltip-gamma-replace">
                              {gammaLevel ? gammaLevel : 0}
                            </Tooltip>
                          }
                        >
                          <input
                            className="editor-input"
                            type="range"
                            placeholder="50"
                            min="-50"
                            max="150"
                            value={gammaLevel}
                            onChange={(e) => setGammaLevel(e.target.value)}
                          />
                        </OverlayTrigger>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          className="apply-edition-btn m-2"
                          onClick={() =>
                            handleApplyFilter("gamma", () => {
                              effectSubmitsMap["gamma"]();
                              setGammaLevel("");
                            })
                          }
                        >
                          {isApplyingFilter === "gamma"
                            ? "Applying..."
                            : "Apply"}
                        </button>
                        <button
                          className="apply-remove-btn m-2"
                          onClick={() => handleRemoveFilter("gamma")}
                        >
                          <Trash3 />
                        </button>
                      </div>
                    </>
                  )}
                </div>
                {/*  gamma */}

                {/*  B&N INICIO */}
                <div className="w-100">
                  {activeButton === "grayscale" && (
                    <>
                      <p>Apply grayscale to your image</p>
                      <div className="d-flex justify-content-center ">
                        <button
                          className="apply-edition-btn m-2"
                          onClick={() =>
                            handleApplyFilter(() =>
                              effectSubmitsMap["grayscale"]()
                            )
                          }
                        >
                          {isApplyingFilter === "grayscale"
                            ? "Applying..."
                            : "Apply"}
                        </button>
                        <button
                          className="apply-remove-btn m-2"
                          onClick={() => handleRemoveFilter("grayscale")}
                        >
                          <Trash3 />
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/*  B&N FIN */}

                {/*  sepia */}
                <div>
                  {activeButton === "sepia" && (
                    <>
                      <p>Apply sepia to your image</p>

                      <div className="input-container">
                        <OverlayTrigger
                          placement="top-end"
                          overlay={
                            <Tooltip id="tooltip-sepia-replace">
                              {sepiaValue ? sepiaValue : 0}
                            </Tooltip>
                          }
                        >
                          <input
                            className="editor-input"
                            type="range"
                            placeholder="50"
                            min="1"
                            max="100"
                            value={sepiaValue}
                            onChange={(e) => setSepiaValue(e.target.value)}
                          />
                        </OverlayTrigger>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          className="apply-edition-btn m-2"
                          onClick={() =>
                            handleApplyFilter("sepia", () => {
                              effectSubmitsMap["sepia"]();
                              setSepiaValue("");
                            })
                          }
                        >
                          {isApplyingFilter === "sepia"
                            ? "Applying..."
                            : "Apply"}
                        </button>
                        <button
                          className="apply-remove-btn m-2"
                          onClick={() => handleRemoveFilter("sepia")}
                        >
                          <Trash3 />
                        </button>
                      </div>
                    </>
                  )}
                </div>
                {/*  sepia */}

                {/*  blur */}
                <div>
                  {activeButton === "blur" && (
                    <>
                      <p>Apply blur to your image</p>

                      <div className="input-container">
                        <OverlayTrigger
                          placement="top-end"
                          overlay={
                            <Tooltip id="tooltip-blur-replace">
                              {blurValue ? blurValue : 0}
                            </Tooltip>
                          }
                        >
                          <input
                            className="editor-input"
                            type="range"
                            placeholder="50"
                            min="1"
                            max="2000"
                            value={blurValue}
                            onChange={(e) => setBlurValue(e.target.value)}
                          />
                        </OverlayTrigger>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          className="apply-edition-btn m-2"
                          onClick={() =>
                            handleApplyFilter("blur", () => {
                              effectSubmitsMap["blur"]();
                              setBlurValue("");
                            })
                          }
                        >
                          {isApplyingFilter === "blur"
                            ? "Applying..."
                            : "Apply"}
                        </button>
                        <button
                          className="apply-remove-btn m-2"
                          onClick={() => handleRemoveFilter("blur")}
                        >
                          <Trash3 />
                        </button>
                      </div>
                    </>
                  )}
                </div>
                {/*  blur */}

                {/*  negativo */}
                <div className="w-100">
                  {activeButton === "negate" && (
                    <>
                      <p>Apply negate to your image</p>
                      <div className="d-flex justify-content-center ">
                        <button
                          className="apply-edition-btn m-2"
                          onClick={() =>
                            handleApplyFilter(() =>
                              effectSubmitsMap["negate"]()
                            )
                          }
                        >
                          {isApplyingFilter === "negate"
                            ? "Applying..."
                            : "Apply"}
                        </button>
                        <button
                          className="apply-remove-btn m-2"
                          onClick={() => handleRemoveFilter("negate")}
                        >
                          <Trash3 />
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/*  negativo */}

                {/*  pixel */}
                <div>
                  {activeButton === "pixelate" && (
                    <>
                      <p>Apply pixelate to your image</p>

                      <div className="input-container">
                        <OverlayTrigger
                          placement="top-end"
                          overlay={
                            <Tooltip id="tooltip-pixelate-replace">
                              {pixelateValue ? pixelateValue : 0}
                            </Tooltip>
                          }
                        >
                          <input
                            className="editor-input"
                            type="range"
                            placeholder="50"
                            min="1"
                            max="200"
                            value={pixelateValue}
                            onChange={(e) => setPixelateValue(e.target.value)}
                          />
                        </OverlayTrigger>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          className="apply-edition-btn m-2"
                          onClick={() =>
                            handleApplyFilter("pixelate", () => {
                              effectSubmitsMap["pixelate"]();
                              setPixelateValue("");
                            })
                          }
                        >
                          {isApplyingFilter === "pixelate"
                            ? "Applying..."
                            : "Apply"}
                        </button>
                        <button
                          className="apply-remove-btn m-2"
                          onClick={() => handleRemoveFilter("pixelate")}
                        >
                          <Trash3 />
                        </button>
                      </div>
                    </>
                  )}
                </div>
                {/*  pixel */}

                {/*  TEXTO INICIO */}
                {activeButton === "textOverlay" && (
                  <>
                    <div className="input-container">
                      <div>
                        <p>Add text to your image</p>
                        <label>Text</label>
                        <input
                          className="editor-input"
                          type="text"
                          placeholder="e.g. Your watermark"
                          value={textOverlay}
                          onChange={(e) => setTextOverlay(e.target.value)}
                        />
                      </div>
                      <div className="input-container d-flex flex-column">
                        <label>Font</label>
                        <select
                          className="editor-select"
                          value={textFont}
                          onChange={(e) => setTextFont(e.target.value)}
                        >
                          <option value="Arial">Arial</option>
                          <option value="Courier New">Courier New</option>
                          <option value="Georgia">Georgia</option>
                          <option value="Roboto">Roboto</option>
                          <option value="Helvetica">Helvetica</option>
                          <option value="Times New Roman">
                            Times New Roman
                          </option>
                          <option value="Trebuchet MS">Trebuchet MS</option>
                          <option value="Open Sans">Open Sans</option>
                          <option value="Verdana">Verdana</option>
                        </select>
                      </div>
                      <div className="input-container">
                        <label>Font Size</label>
                        <input
                          className="editor-input"
                          type="number"
                          placeholder="Font Size"
                          value={textSize}
                          onChange={(e) => setTextSize(e.target.value)}
                        />
                      </div>
                      <div className="input-container">
                        <label>Font Color</label>
                        <div className="d-flex justify-content-center mt-2">
                          <HuePicker
                            color={textColor}
                            onChangeComplete={(color) =>
                              setTextColor(color.hex)
                            }
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          className="apply-edition-btn m-2"
                          onClick={() =>
                            handleApplyFilter("textOverlay", () => {
                              effectSubmitsMap["textOverlay"]();
                              setTextOverlay("");
                              setTextFont("arial");
                              setTextSize(100);
                              setTextColor("#000000");
                            })
                          }
                        >
                          {isApplyingFilter === "textOverlay"
                            ? "Applying..."
                            : "Apply"}
                        </button>
                        <button
                          className="apply-remove-btn m-2"
                          onClick={() => handleRemoveFilter("textOverlay")}
                        >
                          <Trash3 />
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {/*  TEXTO FIN */}
                {/*  GENERADOR FONDO INICIO */}
                <div>
                  {activeButton === "pad" && (
                    <>
                      <div className="input-container">
                        <p>
                          Resizes the image to fill the specified width and
                          height while, padding is added reach the required
                          size.
                        </p>
                        <label>Width</label>
                        <input
                          className="editor-input"
                          type="number"
                          placeholder="e.g. 1080px"
                          value={fromText}
                          onChange={(e) => setFromText(e.target.value)}
                        />
                      </div>
                      <div className="input-container">
                        <label>Height</label>
                        <input
                          className="editor-input"
                          type="number"
                          placeholder="e.g. 300px"
                          value={toText}
                          onChange={(e) => setToText(e.target.value)}
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          className="apply-edition-btn m-2"
                          onClick={() =>
                            handleApplyFilter("pad", () => {
                              effectSubmitsMap["pad"]();
                              setFromText("");
                              setToText("");
                            })
                          }
                        >
                          {isApplyingFilter === "pad" ? "Applying..." : "Apply"}
                        </button>
                        <button
                          className="apply-remove-btn m-2"
                          onClick={() => handleRemoveFilter("pad")}
                        >
                          <Trash3 />
                        </button>
                      </div>
                    </>
                  )}
                </div>
                {/*  GENERADOR FONDO FIN */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditorTool;
