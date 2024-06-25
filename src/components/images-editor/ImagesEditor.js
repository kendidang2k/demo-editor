import { getEditorDefaults } from '@pqina/pintura';
import { PinturaEditor } from '@pqina/react-pintura';
import React, { useMemo, useState } from 'react'
import '@pqina/pintura/pintura.css';

import {
    // editor
    createDefaultImageReader,
    createDefaultImageWriter,
    createDefaultShapePreprocessor,

    // plugins
    setPlugins,
    plugin_crop,
    plugin_finetune,
    plugin_finetune_defaults,
    plugin_filter,
    plugin_filter_defaults,
    plugin_annotate,
    markup_editor_defaults,
} from "@pqina/pintura";

import {
    LocaleCore,
    LocaleCrop,
    LocaleFinetune,
    LocaleFilter,
    LocaleAnnotate,
    LocaleMarkupEditor,
} from "@pqina/pintura/locale/en_GB";

setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate);

const editorDefaults = {
    utils: ["crop", "finetune", "filter", "annotate"],
    imageReader: createDefaultImageReader(),
    imageWriter: createDefaultImageWriter(),
    shapePreprocessor: createDefaultShapePreprocessor(),
    ...plugin_finetune_defaults,
    ...plugin_filter_defaults,
    ...markup_editor_defaults,
    locale: {
        ...LocaleCore,
        ...LocaleCrop,
        ...LocaleFinetune,
        ...LocaleFilter,
        ...LocaleAnnotate,
        ...LocaleMarkupEditor,
    },
};

export default function ImagesEditor({ selectedImage, uploadedFiles }) {
    console.log("🚀 ~ ImagesEditor ~ selectedFiles:", selectedImage)
    const [result, setResult] = useState();

    const selectedUploadedImage = useMemo(() => {
        if (!selectedImage) return
        return uploadedFiles[selectedImage.name]
    }, [uploadedFiles, selectedImage])
    console.log("🚀 ~ selectedUploadedImage ~ selectedUploadedImage:", selectedUploadedImage)


    const downloadImage = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const urlObject = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = urlObject;
        link.download = 'downloaded_image.jpg'; // Specify the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(urlObject);
    };

    return (
        <div>
            <div style={{ height: "70vh" }}>
                <PinturaEditor
                    {...editorDefaults}
                    src={selectedUploadedImage}
                    onLoad={(res) => console.log("load image", res)}
                    onProcess={({ dest }) => {
                        downloadImage(URL.createObjectURL(dest))
                        // setResult(URL.createObjectURL(dest))
                    }}
                />
            </div>

            {!!result?.length && (
                <p>
                    <img src={result} alt="" />
                </p>
            )}
        </div>
    )
}