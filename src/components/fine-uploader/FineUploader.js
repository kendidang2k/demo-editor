import React from 'react'
import ReactDOM from "react-dom";

import FineUploaderTraditional from "fine-uploader-wrappers";
import Gallery from "react-fine-uploader";

import "react-fine-uploader/gallery/gallery.css";
import { storage } from '../../firebase/config';

const uploader = new FineUploaderTraditional({
    options: {
        chunking: {
            enabled: true
        },
        deleteFile: {
            enabled: true,
            endpoint: `${storage}/uploads`
        },
        request: {
            endpoint: `${storage}/uploads`
        },
        retry: {
            enableAuto: true
        }
    }
});

export default function FineUploader() {
    return (
        <div>
            <h1>Upload your files</h1>
            <Gallery uploader={uploader} />
        </div>
    )
}