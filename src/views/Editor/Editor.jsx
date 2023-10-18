import { CloudinaryImage } from "@cloudinary/url-gen";
import { useState, useMemo, useCallback, useEffect } from "react";
import { AdvancedImage } from "@cloudinary/react";
import {
  generativeReplace,
  grayscale,
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

  useEffect(() => {
    getImage(id)
      .then((res) => {
        const imageUrlData = res.images[0].split("/");
        const fileName = imageUrlData[imageUrlData.length - 1];
        const imageName = fileName.split(".")[0];
        setImage(`marilu-photography/${imageName}`);
        setAuthor(res.author);
        console.log("entra aqui", res);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  const handleButtonClick = (button) => {
    setActiveButton(button);
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
  };

  const effectSubmitsMap = {
    generativeReplace: () => {
      if (fromText && toText) {
        setActions([
          ...actions,
          { name: "generativeReplace", value: [fromText, toText] },
        ]);
      }
    },
    grayscale: () => {
      setActions([...actions, { name: "grayscale" }]);
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

  const imageToRender = useMemo(
    () => new CloudinaryImage(image, { cloudName: "dy2v6iwv8" }),
    [image]
  );

  const renderImage = useCallback(() => {
    let result = imageToRender;

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
      }
    });

    return result;
  }, [actions, imageToRender]);

  const handleSave = () => {
    const editedImageUrl = renderImage().toURL();
      editImage(id, {editedImageUrl})
      .then((res) => {
          console.log(res)
          navigate(`/profile/${author}`)
          
      })
      .catch((error) => {
          console.error(error)
      })

    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="editor-options">
              <div className="my-3">
                <button
                  className={`btn ${
                    activeButton === "generativeReplace"
                      ? "btn-primary"
                      : "btn-secondary"
                  }`}
                  onClick={() => handleButtonClick("generativeReplace")}
                >
                  Generative Replace
                </button>
              </div>
              <div className="my-3">
                <button
                  className={`btn ${
                    activeButton === "grayscale"
                      ? "btn-primary"
                      : "btn-secondary"
                  }`}
                  onClick={() => handleButtonClick("grayscale")}
                >
                  Grayscale
                </button>
              </div>
              <div className="my-3">
                <button
                  className={`btn ${
                    activeButton === "textOverlay"
                      ? "btn-primary"
                      : "btn-secondary"
                  }`}
                  onClick={() => handleButtonClick("textOverlay")}
                >
                  Text Overlay
                </button>
              </div>

              <div className="my-3">
                <button
                  className={`btn ${
                    activeButton === "pad" ? "btn-primary" : "btn-secondary"
                  }`}
                  onClick={() => handleButtonClick("pad")}
                >
                  Generative Background
                </button>
              </div>
            </div>
          </div>
          <div className={`col-md-4 ${activeButton ? "" : "d-none"}`}>
            <div className="editor-inputs">
              {activeButton === "generativeReplace" && (
                <>
                  <input
                    type="text"
                    placeholder="From"
                    value={fromText}
                    onChange={(e) => setFromText(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="To"
                    value={toText}
                    onChange={(e) => setToText(e.target.value)}
                  />
                  <button
                    onClick={() => effectSubmitsMap["generativeReplace"]()}
                  >
                    Apply
                  </button>
                </>
              )}
              {activeButton === "grayscale" && (
                <>
                  <p>No values needed, just click Apply.</p>
                  <button onClick={() => effectSubmitsMap["grayscale"]()}>
                    Apply
                  </button>
                </>
              )}
              {activeButton === "textOverlay" && (
                <>
                  <input
                    type="text"
                    placeholder="Text"
                    value={textOverlay}
                    onChange={(e) => setTextOverlay(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Font"
                    value={textFont}
                    onChange={(e) => setTextFont(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Font Size"
                    value={textSize}
                    onChange={(e) => setTextSize(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Text Color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                  />
                  <button onClick={() => effectSubmitsMap["textOverlay"]()}>
                    Apply
                  </button>
                </>
              )}
              {activeButton === "pad" && (
                <>
                  <input
                    type="number"
                    placeholder="width"
                    value={fromText}
                    onChange={(e) => setFromText(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="height"
                    value={toText}
                    onChange={(e) => setToText(e.target.value)}
                  />

                  <button onClick={() => effectSubmitsMap["pad"]()}>
                    Apply
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="col-md-4">
            <div className="editor-output">
              <AdvancedImage cldImg={renderImage()} />
              <button onClick={handleSave} to={`/profile/${id}`}>Guardar</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default EditorTool;
