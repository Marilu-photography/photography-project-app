import {CloudinaryImage} from "@cloudinary/url-gen";
import { useState } from "react";
import {AdvancedImage} from "@cloudinary/react";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { text } from "@cloudinary/url-gen/qualifiers/source";
import { Position } from "@cloudinary/url-gen/qualifiers/position";
import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { generativeReplace } from "@cloudinary/url-gen/actions/effect";
import { useMemo } from "react";
import { useCallback } from "react";


const Editor = () => {
    const [image, setImage] = useState('cld-sample-5');
    const [loading, setLoading] = useState(true)
    const [actions, setActions] = useState([
        {
            name: 'generativeReplace',
            value: ["shoe", "cat"]
        }
    ]);

    const effectsMap = {
        generativeReplace: (imageR, itemToReplace, newItem) => {
            return imageR.effect(generativeReplace().from(itemToReplace).to(newItem))
        },
    }

    const effectSubmitsMap = {
        generativeReplace: (from, to) => {
            setActions([{ name: 'generativeReplace', value: [from, to] }, ...actions])
        }
    }

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
        <div style={{ width: "33%" }}>
            <AdvancedImage cldImg={renderImage()}  />
        </div>
        //input boton: Marca de agua/eliminar fondo/etc
        //luego un formulario con el apply
        //aqui el formulario seria tipo texto y ya, al darle al aply
        //
    )
}

export default Editor