import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { storage } from '../../firebase/config';
import { set } from 'firebase/database';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
    position: 'relative'
};

const img = {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    cursor: 'pointer'
};

export default function DropzoneUploader({ files, setFiles, selectedImage, setSelectedImage, uploadedFiles, setUploadedFiles }) {
    console.log("🚀 ~ DropzoneUploader ~ files:", files)
    const [uploadProgress, setUploadProgress] = useState({});
    console.log("🚀 ~ App ~ uploadProgress:", uploadProgress)
    console.log("🚀 ~ DropzoneUploader ~ uploadedFiles:", uploadedFiles)

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
            acceptedFiles.map(file => { uploadFile(file) })
        }
    });

    const uploadFile = useCallback(
        (file) => {
            console.log("🚀 ~ uploadFile ~ file:", file)
            const storageRef = ref(storage, `uploads/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    console.log("🚀 ~ uploadFile ~ snapshot:", snapshot)
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("🚀 ~ uploadFile ~ progress:", progress)
                    setUploadProgress((prevProgress) => ({
                        ...prevProgress,
                        [file.name]: progress,
                    }));
                },
                (error) => {
                    console.error('Upload failed:', error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        setUploadedFiles((prevFiles) => ({ ...prevFiles, [file.name]: downloadURL }))
                        // setFiles((prevFiles) => (prevFiles.map((prevFile) => prevFile.name === file.name ? { ...prevFile, preview: downloadURL } : prevFile)))
                    });
                },
            );
        },
        [files, setUploadedFiles, setUploadProgress],
    )


    const thumbs = useMemo(() => {
        console.log("🚀 ~ thumbs ~ uploadProgress[file.name]:", selectedImage)
        return files.map(file => (
            <div
                onClick={() => {
                    setSelectedImage(file)
                }}
                style={thumb} key={file.name} className={`${selectedImage?.name === file.name ? "border-[3px] border-green-600" : ""}`}>
                <div style={thumbInner} className='w-full h-full relative flex items-center justify-center flex-col'>
                    <img
                        src={file.preview}
                        style={img}
                        alt={file.name}
                        // Revoke data uri after image is loaded
                        onLoad={() => { URL.revokeObjectURL(file.preview) }}
                        className='absolute left-0 top-0 w-full h-full object-cover cursor-pointer'
                    />
                    {uploadProgress[file.name] !== 100 && <div className='w-[90%] h-[12px] rounded-[20px] bg-slate-200 relative overflow-hidden'>
                        <div style={{ width: `${uploadProgress[file.name]}%` }} className={`bg-blue-500 absolute left-0 top-0 h-full`}></div>
                    </div>}
                </div>
            </div>
        ))
    }, [files, uploadProgress, setSelectedImage, selectedImage]);

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <section className="w-full h-full flex items-center justify-center flex-col">
            <div {...getRootProps({ className: 'dropzone w-[60%] h-[200px] border border-black border-dashed rounded-xl flex items-center justify-center' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
        </section>
    )
}