import { CloudinaryImage } from "@cloudinary/url-gen";
import { useState, useMemo, useCallback } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { generativeReplace, grayscale } from "@cloudinary/url-gen/actions/effect";
import { pad } from "@cloudinary/url-gen/actions/resize";
import { generativeFill } from "@cloudinary/url-gen/qualifiers/background";

import './Editor.css'
import { source } from "@cloudinary/url-gen/actions/overlay";
import { text } from "@cloudinary/url-gen/qualifiers/source";
import { Position } from "@cloudinary/url-gen/qualifiers/position";
import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { useParams } from "react-router-dom";




const Editor = () => {
    const { imageId } = useParams();
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true)
    const [actions, setActions] = useState([]);
    const [fromText, setFromText] = useState("");
    const [toText, setToText] = useState("");
    const [activeButton, setActiveButton] = useState(null);
    const [textOverlay, setTextOverlay] = useState("");
    const [textFont, setTextFont] = useState("arial");
    const [textSize, setTextSize] = useState(100);
    const [textColor, setTextColor] = useState("#000000")

    const handleButtonClick = (button) => {
        setActiveButton(button);

    };

    useEffect(() => {
        setLoading(true);
        
        // Aquí debes cargar la imagen usando el ID de la imagen desde la URL
        // Puedes utilizar una función o servicio para obtener la imagen en función de su ID
        // Por ejemplo, si tienes una función getImageById, puedes hacer lo siguiente:
        getImageById(imageId)
            .then((imageData) => {
                setImage(imageData);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al cargar la imagen:", error);
                setLoading(false);
            });
    }, [imageId]);


    const effectsMap = {
        generativeReplace: (imageR, itemToReplace, newItem) => {
            return imageR.effect(generativeReplace().from(itemToReplace).to(newItem))
        },
        pad: (imageR, width, height) => {
            return imageR.resize(pad().w(width).h(height))
        },
        textOverlay: (imageR, text, font, size, color) => {
            const textStyle = new TextStyle(font, size)
                .fontWeight("normal")
                .textAlignment("left");

            const textSource = text(text, textStyle).textColor(color);

            const overlayAction = source(textSource).position(new Position().gravity(compass("center")));

            return imageR.overlay(overlayAction);
        }
    }

    

    const effectSubmitsMap = {
        generativeReplace: () => {
            if (fromText && toText) {
                setActions([...actions, { name: "generativeReplace", value: [fromText, toText] }]);
            }

        },
        grayscale: () => {
            setActions([...actions, { name: "grayscale" }]);
        },
        pad: () => {
            if (fromText && toText) {
            setActions([...actions, { name: "pad", value: [fromText, toText]  }]);
        }},

        textOverlay : () => {
            if(textOverlay && textFont && textSize && textColor) {
        
            setActions([...actions, { name: "textOverlay", value: [textOverlay, textFont, textSize, textColor] }]);
        }},
    }

    /*const applyTextOverlayEffect = () => {
        const textStyle = new TextStyle(textFont, textSize)
            .fontWeight("normal")
            .textAlignment("left");
    
        const textSource = text(textOverlay, textStyle).textColor(textColor);
    
        const overlayAction = source(textSource).position(new Position().gravity(compass("center")));
    
        setActions([...actions, { name: "textOverlay", value: overlayAction }]);
    };
*/

    const imageToRender = useMemo(() => new CloudinaryImage(image, { cloudName: 'dy2v6iwv8' }), [image])

    const renderImage = useCallback(() => {
        let result = imageToRender;

        actions.forEach((currentAction) => {
            if (currentAction.name === "generativeReplace") {
                const [from, to] = currentAction.value;
                result = result.effect(generativeReplace().from(from).to(to));
            } else if (currentAction.name === "grayscale") {
                result = result.effect(grayscale());
            } else if (currentAction.name === "textOverlay") {
                result = result.overlay(currentAction.value);
            } else if (currentAction.name === "pad") {
                const [width, height] = currentAction.value;
                result = result.resize(pad().width(width).height(height).background(generativeFill())
                );
            }
        });

        return result;
    }, [actions, imageToRender]);



    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="editor-options">
                        <div className="my-3">
                            <button
                                className={`btn ${activeButton === "generativeReplace" ? "btn-primary" : "btn-secondary"}`}
                                onClick={() => handleButtonClick("generativeReplace")}
                            >
                                Generative Replace
                            </button>
                        </div>
                        <div className="my-3">
                            <button
                                className={`btn ${activeButton === "grayscale" ? "btn-primary" : "btn-secondary"}`}
                                onClick={() => handleButtonClick("grayscale")}
                            >
                                Grayscale
                            </button>
                        </div>
                        <div className="my-3">
                            <button
                                className={`btn ${activeButton === "textOverlay" ? "btn-primary" : "btn-secondary"}`}
                                onClick={() => handleButtonClick("textOverlay")}
                            >
                                Text Overlay
                            </button>
                        </div>

                        <div className="my-3">
                            <button
                                className={`btn ${activeButton === "pad" ? "btn-primary" : "btn-secondary"}`}
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
                                <button onClick={() => effectSubmitsMap["generativeReplace"]()}>Apply</button>
                            </>
                        )}
                        {activeButton === "grayscale" && (
                            <>
                                <p>No values needed, just click Apply.</p>
                                <button onClick={() => effectSubmitsMap["grayscale"]()}>Apply</button>
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
                                <button onClick={() => effectSubmitsMap["textOverlay"]()}>Apply</button>
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
                               
                                <button onClick={() => effectSubmitsMap["pad"]()}>Apply</button>
                            </>
                        )}
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="editor-output">
                        <AdvancedImage cldImg={renderImage()} />
                        <button>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Editor