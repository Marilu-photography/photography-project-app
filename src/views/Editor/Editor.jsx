import { CloudinaryImage } from "@cloudinary/url-gen";
import { useState, useMemo, useCallback, useEffect } from "react";
import { AdvancedImage } from "@cloudinary/react";
import {
  generativeReplace,
  grayscale,
  sepia,
  blur,
} from "@cloudinary/url-gen/actions/effect";
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
import { ArrowLeftCircle } from "react-bootstrap-icons";
import { ArrowDownShort } from "react-bootstrap-icons";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { SketchPicker } from "react-color";
import { Download } from "react-bootstrap-icons";
import { AspectRatio } from "react-bootstrap-icons";
import { Sliders2Vertical } from "react-bootstrap-icons";
import { Fonts } from "react-bootstrap-icons";
import { CircleSquare } from "react-bootstrap-icons";

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
  const [sepiaValue, setSepiaValue] = useState("");
  const [blurValue, setBlurValue] = useState("");
  const [initialImageUrl, setInitialImageUrl] = useState(null);

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

  const handleDiscardChanges = () => {
    setActions([]);
    setActiveButton(null);
    setActiveFilter(null);
    setImage(initialImageUrl);
  };

  const handleButtonClick = (button) => {
    if (button === activeButton) {
      setActiveButton(null);
    } else {
      setActiveButton(button);
    }
  };
  const handleReloadPage = () => {
    setIsApplyingFilter(false);
    setIsImageLoading(true);
    document.location.reload(true);
  };

  const handleApplyFilter = (actionName, filterFunction) => {
    setIsApplyingFilter(actionName);

    setTimeout(() => {
      filterFunction();
      setIsApplyingFilter(null);
    }, 1000);
  };

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
  };

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
  };

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
      }
    });

    const handleRemoveFilter = (filterIndex) => {
      const updatedActions = [...actions];
      updatedActions.splice(filterIndex, 1);
      setActions(updatedActions);
    };

    return result;
  }, [actions, image]);

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

  const handleNavigation = () => {
    navigate(-1);
  };

  const handleOpenInNewTab = () => {
    const editedImageUrl = renderImage().toURL();
    window.open(editedImageUrl, "_blank");
  };

  const handleRemoveFilter = (filterName) => {
    const updatedActions = actions.filter(
      (action) => action.name !== filterName
    );
    setActions(updatedActions);
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
                        className="apply-edition-btn"
                        onClick={() =>
                          handleApplyFilter("generativeReplace", () =>
                            effectSubmitsMap["generativeReplace"]()
                          )
                        }
                      >
                        {isApplyingFilter === "generativeReplace"
                          ? "Applying..."
                          : "Apply"}
                      </button>
                      <button
                        className="remove-filter-btn"
                        onClick={() => handleRemoveFilter("generativeReplace")}
                      >
                        Remove
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
                      Apply grayscale to your image
                    </Tooltip>
                  }
                >
                  <button
                    className={`imputs-btn ${
                      activeButton === "grayscale" ? "active" : ""
                    }`}
                    onClick={() =>
                      handleApplyFilter(() => effectSubmitsMap["grayscale"]())
                    }
                  >
                    Grayscale
                  </button>
                </OverlayTrigger>
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
                      <label>Sepia</label>
                      <input
                        className="editor-input"
                        type="range"
                        placeholder="50"
                        min="1"
                        max="100"
                        value={sepiaValue}
                        onChange={(e) => setSepiaValue(e.target.value)}
                      />
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="apply-edition-btn"
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
                        className="remove-filter-btn"
                        onClick={() => handleRemoveFilter("sepia")}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="input-container">
                      <label>Blur</label>
                      <input
                        className="editor-input"
                        type="range"
                        placeholder="50"
                        min="1"
                        max="2000"
                        value={blurValue}
                        onChange={(e) => setBlurValue(e.target.value)}
                      />
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="apply-edition-btn"
                        onClick={() =>
                          handleApplyFilter("blur", () =>
                            effectSubmitsMap["blur"]()
                          )
                        }
                      >
                        {isApplyingFilter === "blur" ? "Applying..." : "Apply"}
                      </button>
                      <button
                        className="remove-filter-btn"
                        onClick={() => handleRemoveFilter("blur")}
                      >
                        Remove
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
                        <SketchPicker
                          color={textColor}
                          onChangeComplete={(color) => setTextColor(color.hex)}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="apply-edition-btn"
                        onClick={() =>
                          handleApplyFilter("textOverlay", () =>
                            effectSubmitsMap["textOverlay"]()
                          )
                        }
                      >
                        {isApplyingFilter === "textOverlay"
                          ? "Applying..."
                          : "Apply"}
                      </button>
                      <button
                        className="remove-filter-btn"
                        onClick={() => handleRemoveFilter("textOverlay")}
                      >
                        Remove
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
                        className="apply-edition-btn"
                        onClick={() =>
                          handleApplyFilter("pad", () =>
                            effectSubmitsMap["pad"]()
                          )
                        }
                      >
                        {isApplyingFilter === "pad" ? "Applying..." : "Apply"}
                      </button>
                      <button
                        className="remove-filter-btn"
                        onClick={() => handleRemoveFilter("pad")}
                      >
                        Remove
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="d-flex justify-content-between my-5">
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
            <div>
              <button className="btn-back-arrow" onClick={handleNavigation}>
                <ArrowLeftCircle style={{ width: "50px" }} />
              </button>
            </div>
            <div className="col-md-9">
              <div className="editor-output d-flex flex-column align-items-center justify-content-center">
                <div className="mb-3 text-center">
                  <h1>PhotoIA</h1>
                  <h2>
                    Edit your photos like a professional with just one click.
                  </h2>
                </div>
                <div>
                  <AdvancedImage cldImg={renderImage} />
                </div>

                <div className="ations-btns my-3">
                  <button
                    className="action-btn"
                    onClick={handleSave}
                    to={`/profile/${id}`}
                  >
                    Save Image
                  </button>
                  <button className="action-btn" onClick={handleReloadPage}>
                    Discard Changes
                  </button>

                  <button className="download-btn" onClick={handleOpenInNewTab}>
                    <Download />
                  </button>
                </div>
              </div>
            </div>

            <div className="editor-inputs">
              <h5>Select Action</h5>
              <div className="d-flex justify-content-between">
                <div className="my-3 ">
                  <button
                    className={` imputs-btn-mbl ${
                      activeButton === "generativeReplace" ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick("generativeReplace")}
                  >
                    <span>
                      <CircleSquare />
                    </span>
                  </button>
                </div>

                <div className="my-3">
                  <button
                    className={`imputs-btn-mbl ${
                      activeButton === "grayscale" ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick("grayscale")}
                  >
                    <Sliders2Vertical />
                  </button>
                </div>
                <div className="my-3">
                  <button
                    className={`imputs-btn-mbl ${
                      activeButton === "textOverlay" ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick("textOverlay")}
                  >
                    <span>
                      <Fonts />
                    </span>
                  </button>
                </div>
                <div className="my-3 ">
                  <button
                    className={`imputs-btn-mbl ${
                      activeButton === "pad" ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick("pad")}
                  >
                    <span>
                      {" "}
                      <AspectRatio />
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="editor-inputs">
              <div>
                {/*  GENERADOR IA INICIO */}
                <div>
                  {activeButton === "generativeReplace" && (
                    <>
                      <h4>Generative Replace</h4>
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
                          className="apply-edition-btn"
                          onClick={() =>
                            handleApplyFilter(() =>
                              effectSubmitsMap["generativeReplace"]()
                            )
                          }
                        >
                          {isApplyingFilter ? "Applying..." : "Apply"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
                {/*  GENERADOR IA FIN */}
                {/*  B&N INICIO */}
                <div className="w-100">
                  {activeButton === "grayscale" && (
                    <>
                      <h4>Grayscale</h4>
                      <p>Apply grayscale to your image</p>
                      <div className="d-flex justify-content-center ">
                        <button
                          className="apply-edition-btn"
                          onClick={() =>
                            handleApplyFilter(() =>
                              effectSubmitsMap["grayscale"]()
                            )
                          }
                        >
                          {isApplyingFilter ? "Applying..." : "Apply"}
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/*  B&N FIN */}
                {/*  TEXTO INICIO */}
                {activeButton === "textOverlay" && (
                  <>
                    <div className="input-container">
                      <div>
                        <h4>Text Layer</h4>
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
                          <SketchPicker
                            color={textColor}
                            onChangeComplete={(color) =>
                              setTextColor(color.hex)
                            }
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          className="apply-edition-btn"
                          onClick={() =>
                            handleApplyFilter(() =>
                              effectSubmitsMap["textOverlay"]()
                            )
                          }
                        >
                          {isApplyingFilter ? "Applying..." : "Apply"}
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
                        <h4>Generative Background</h4>
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
                          className="apply-edition-btn"
                          onClick={() =>
                            handleApplyFilter(() => effectSubmitsMap["pad"]())
                          }
                        >
                          {isApplyingFilter ? "Applying..." : "Apply"}
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
