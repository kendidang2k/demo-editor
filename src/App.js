import { useState } from 'react';
import DropzoneUploader from './components/dropzone-uploader/DropzoneUploader';
import ImagesEditor from './components/images-editor/ImagesEditor';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [files, setFiles] = useState([]);
  console.log("🚀 ~ App ~ files:", files)

  return (
    <div className="App flex h-screen items-center justify-center">
      <div className={`${selectedImage ? "w-1/2" : "w-full"} h-full transition-all duration-300 ease-in-out`}>
        <DropzoneUploader files={files} setFiles={setFiles} selectedImage={selectedImage} setSelectedImage={setSelectedImage} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
        {/* <FineUploader /> */}
      </div>
      <div className={`${selectedImage ? "w-1/2" : "w-0"} h-full transition-all duration-300 ease-in-out`}>
        <ImagesEditor selectedImage={selectedImage} uploadedFiles={uploadedFiles} files={files} setFiles={setFiles} />
      </div>
    </div>
  );
}

export default App;
