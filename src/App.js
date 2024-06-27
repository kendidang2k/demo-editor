import { useState } from 'react';
import DropzoneUploader from './components/dropzone-uploader/DropzoneUploader';
import ImagesEditor from './components/images-editor/ImagesEditor';
import ImageCropper from './components/image-cropper/ImageCropper';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [files, setFiles] = useState([]);
  console.log("🚀 ~ App ~ files:", files)

  return (
    <div className="App flex h-screen items-center justify-center bg-[#262626]">
      <div className={`w-[600px] h-full transition-all duration-300 ease-in-out p-8 relative`}>
        <ImageCropper selectedImage={selectedImage} uploadedFiles={uploadedFiles} files={files} setFiles={setFiles} />
        {/* <ImagesEditor selectedImage={selectedImage} uploadedFiles={uploadedFiles} files={files} setFiles={setFiles} /> */}
      </div>
      <div className={`w-full h-full transition-all duration-300 ease-in-out`}>
        <DropzoneUploader files={files} setFiles={setFiles} selectedImage={selectedImage} setSelectedImage={setSelectedImage} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
        {/* <FineUploader /> */}
      </div>
    </div>
  );
}

export default App;
