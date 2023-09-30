import {CloudinaryImage} from "@cloudinary/url-gen";
import { useState, useMemo, useCallback } from "react";
import {AdvancedImage} from "@cloudinary/react";
import { generativeReplace, grayscale } from "@cloudinary/url-gen/actions/effect";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

import './Editor.css'
import { source } from "@cloudinary/url-gen/actions/overlay";
import { text } from "@cloudinary/url-gen/qualifiers/source";
import { Position } from "@cloudinary/url-gen/qualifiers/position";
import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";




const Editor = () => {
    const [image, setImage] = useState('cld-sample-5');
    const [loading, setLoading] = useState(true)
    /*const [actions, setActions] = useState([
        {
            name: 'generativeReplace',
            value: ["shoe", "cat"]
        }
    ]);*/
    const [actions, setActions] = useState([]);
    const [fromText, setFromText] = useState("");
    const [toText, setToText] = useState("");
    const [applyGrayscale, setApplyGrayscale] = useState(false);
    const [showInputs, setShowInputs] = useState(false);


    const effectsMap = {
        generativeReplace: (imageR, itemToReplace, newItem) => {
            return imageR.effect(generativeReplace().from(itemToReplace).to(newItem))
        },
    }

    const handleApplyGrayscale = () => {
        setApplyGrayscale(true);
      };
      
    const effectSubmitsMap = {
        generativeReplace: () => {
          if (fromText && toText) {
            setActions([...actions, { name: "generativeReplace", value: [fromText, toText] }]);
           // setShowInputs(false);
          }
        },
      };
  
    /*const effectSubmitsMap = {
        generativeReplace: (from, to) => {
            setActions([{ name: 'generativeReplace', value: [from, to] }, ...actions])
        }
    }*/

    //<GenerativeReplaceForm onSubmit={effectSubmitsMap['generativeReplace']} />

    // const onSubmitGenerativeReplace = (from, to) => {
    //     setActions()
    // }

    //hacer un use effect donde setImage sea la imagen subida segun su id

    const imageToRender = useMemo(() => new CloudinaryImage(image, {cloudName: 'dy2v6iwv8'}), [image])

    const renderImage = useCallback(() => {
        return actions.reduce((result, currentAction) => {
            return effectsMap[currentAction.name](result, ...currentAction.value)
        }, imageToRender)
    }, [actions, imageToRender])

    

    
return (
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="editor-options">
                <button onClick={() => setShowInputs(!showInputs)}>
                  {showInputs ? "Hide Inputs" : "Generative Replace"}
                </button>
              </div>
            </div>
            <div className={`col-md-4 ${showInputs ? "" : "d-none"}`}>
              <div className="editor-inputs">
                {showInputs && (
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