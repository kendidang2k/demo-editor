import { getEditorDefaults } from '@pqina/pintura';
import React, { useMemo, useState } from 'react'
import FilerobotImageEditor, { TABS, TOOLS } from 'react-filerobot-image-editor';

export default function ImagesEditor({ selectedImage, uploadedFiles, files, setFiles }) {
    console.log("🚀 ~ ImagesEditor ~ selectedFiles:", selectedImage)
    const [isImgEditorShown, setIsImgEditorShown] = useState(false);

    const openImgEditor = () => {
        setIsImgEditorShown(true);
    };

    const closeImgEditor = () => {
        setIsImgEditorShown(false);
    };

    const selectedUploadedImage = useMemo(() => {
        if (!selectedImage) return
        return uploadedFiles[selectedImage.name]
    }, [uploadedFiles, selectedImage])
    console.log("🚀 ~ selectedUploadedImage ~ selectedUploadedImage:", selectedUploadedImage)


    const handleSave = (editedImageObject) => {
        const { imageBase64 } = editedImageObject; // Get the base64 string

        // Create a link element, set its href to the base64 string, and programmatically click it
        const link = document.createElement('a');
        link.href = imageBase64;
        link.download = 'edited-image.png'; // You can set the file name here
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <div style={{ height: "70vh" }}>
                {/* <PinturaEditor
                    {...editorDefaults}
                    src={selectedUploadedImage}
                    onLoad={(res) => console.log("load image", res)}
                    onProcess={({ dest, output }) => {
                        console.log("🚀 ~ ImagesEditor ~ dest:", dest, output)
                        const selectedFileIndex = files.findIndex(file => file.name === selectedImage.name)
                        setFiles((prevFiles) => {
                            prevFiles[selectedFileIndex] = URL.createObjectURL(dest)
                            return [...prevFiles]
                        })
                        // setFiles([])
                        // downloadImage(URL.createObjectURL(dest))
                        // setResult(URL.createObjectURL(dest))
                    }}
                /> */}
                {selectedUploadedImage && <FilerobotImageEditor
                    source={selectedUploadedImage}
                    onSave={(editedImageObject, designState) => {
                        console.log('saved', editedImageObject, designState)
                        handleSave(editedImageObject)
                    }
                    }
                    onClose={closeImgEditor}
                    annotationsCommon={{
                        fill: '#ff0000',
                    }}
                    defaultSavedImageQuality={1}
                    previewPixelRatio={1}
                    Text={{ text: 'Filerobot...' }}
                    Rotate={{ angle: 90, componentType: 'slider' }}
                    Crop={{
                        presetsItems: [
                            {
                                titleKey: 'Square',
                                descriptionKey: '1:1',
                                ratio: 1 / 1,
                                // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
                            },
                            {
                                titleKey: 'cinemascope',
                                descriptionKey: '3:2',
                                ratio: 3 / 2,
                                // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
                            },
                        ],

                        // presetsFolders: [
                        //     {
                        //         titleKey: 'socialMedia', // will be translated into Social Media as backend contains this translation key
                        //         // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
                        //         groups: [
                        //             {
                        //                 titleKey: 'facebook',
                        //                 items: [
                        //                     {
                        //                         titleKey: 'profile',
                        //                         width: 180,
                        //                         height: 180,
                        //                         descriptionKey: 'fbProfileSize',
                        //                     },
                        //                     {
                        //                         titleKey: 'coverPhoto',
                        //                         width: 820,
                        //                         height: 312,
                        //                         descriptionKey: 'fbCoverPhotoSize',
                        //                     },
                        //                 ],
                        //             },
                        //         ],
                        //     },
                        // ],
                    }}
                    tabsIds={[TABS.ADJUST]}
                    defaultTabId={TABS.ADJUST}
                    defaultToolId={TOOLS.ADJUST}
                />}
            </div>


        </div>
    )
}