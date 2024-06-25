import { useState } from 'react';
import './App.css';
import DropzoneUploader from './components/dropzone-uploader/DropzoneUploader';
import ImagesEditor from './components/images-editor/ImagesEditor';

function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [uploadedFiles, setUploadedFiles] = useState([])

  return (
    <div className="App grid grid-cols-2 h-screen items-center justify-center">
      <div className='col-span-1 w-full h-full'>
        <DropzoneUploader selectedImage={selectedImage} setSelectedImage={setSelectedImage} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
      </div>
      <div className='col-span-1'>
        <ImagesEditor selectedImage={selectedImage} uploadedFiles={uploadedFiles} />
      </div>
    </div>
  );
}

export default App;
