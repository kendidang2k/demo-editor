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
        <div className='w-full h-full'>
            {selectedUploadedImage ?
                <FilerobotImageEditor
                    source={selectedUploadedImage}
                    onSave={(editedImageObject, designState) => {
                        console.log('saved', editedImageObject, designState)
                        handleSave(editedImageObject)
                    }}
                    closeAfterSave={true}
                    savingPixelRatio={1}
                    onClose={closeImgEditor}
                    defaultSavedImageQuality={1}
                    previewPixelRatio={10}
                    Text={{ text: 'Filerobot...' }}
                    Rotate={{ angle: 90, componentType: 'slider' }}
                    tools={{
                        transform: {
                            operations: ['rotate', 'resize', 'crop'] // Exclude 'flip'
                        }
                    }}
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
                />
                :
                <div className='w-full h-full bg-black'></div>}
        </div>
    )
}