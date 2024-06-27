import React, { useMemo, useRef, useState } from "react";
import "cropperjs/dist/cropper.css";
import ReactCropper, { Cropper } from "react-cropper";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { RiArrowGoBackLine, RiArrowGoForwardLine } from "react-icons/ri";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import phone from "../../assets/icons/phone.svg";
import cropIcon from "../../assets/icons/crop.svg";
import expandVe from "../../assets/icons/arrow_expand_horizontal.svg";
import expandHo from "../../assets/icons/arrow_expand_vertical.svg";
import './index.css'
import { Spin } from "antd";

export default function ImageCropper({
  selectedImage,
  uploadedFiles,
  files,
  setFiles,
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(4 / 3);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(false);
  const cropperRef = useRef(null);
  const [isDarkBg, setIsDarkBg] = useState(true)
  const [dragMode, setDragMode] = useState('move'); // Default to 'none' to hide crop frame
  console.log("🚀 ~ dragMode:", dragMode)

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    console.log(cropper.getCroppedCanvas().toDataURL());
  };
  const selectedUploadedImage = useMemo(() => {
    if (!selectedImage) return;
    return uploadedFiles[selectedImage.name];
  }, [uploadedFiles, selectedImage]);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  const showCropFrame = useMemo(() => {
    return dragMode === 'crop';
  }, [dragMode])

  const scaleToFitWidth = () => {
    const cropper = cropperRef.current.cropper;
    const containerData = cropper.getContainerData();
    const canvasData = cropper.getCanvasData();
    canvasData.width = containerData.width;
    canvasData.left = (containerData.width - canvasData.width) / 2;
    canvasData.top = (containerData.height - canvasData.height) / 2;
    cropper.setCanvasData(canvasData);
    // // cropper.zoomTo(scaleRatio, { x: 0, y: 0 });
    // const cropBoxData = cropper.getCropBoxData();
    // cropBoxData.left = (containerData.width - cropBoxData.width) / 2;
    // cropBoxData.top = (containerData.height - cropBoxData.height) / 2;
    // cropper.setCropBoxData(cropBoxData);
  };

  const scaleToFitHeight = () => {
    // const cropper = cropperRef.current.cropper;
    // const containerData = cropper.getContainerData();
    // console.log("🚀 ~ scaleToFitHeight ~ containerData:", containerData, cropperRef.current.cropper.container)
    // const canvasData = cropper.getCanvasData();
    // canvasData.height = containerData.height;
    // canvasData.left = 0;
    // canvasData.top = 0;
    // cropper.setCanvasData(canvasData);
    // cropper.zoomTo(containerData.height / canvasData.height, { x: 0, y: 0 });



    const cropper = cropperRef.current.cropper;
    console.log("🚀 ~ scaleToFitHeight ~ cropper:", cropperRef.current.cropper)
    const containerData = cropper.getContainerData();
    const canvasData = cropper.getCanvasData();
    const scaleRatio = canvasData.height / containerData.height;
    console.log("🚀 ~ scaleToFitHeight ~ canvasData.height:", canvasData.height, containerData.height)

    cropper.zoomTo(scaleRatio);

    // const cropBoxData = cropper.getCropBoxData();
    // cropBoxData.left = (containerData.width - cropBoxData.width) / 2;
    // cropBoxData.top = (containerData.height - cropBoxData.height) / 2;
    // cropper.setCropBoxData(cropBoxData);
  };

  return (
    <>
      {/* <Cropper
        style={{
          containerStyle: {
            backgroundColor: "black",
            position: "relative",
            height: "75%",
          },
        }}
        image={selectedUploadedImage}
        crop={crop}
        zoom={zoom}
        aspect={aspectRatio}
        rotation={rotation}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        
      /> */}
      <Cropper
        className={`${!showCropFrame && "hide_crop_frame"} ${!isDarkBg && "light_bg_cropper"}`}
        ref={cropperRef}
        style={{ height: '75%', width: "100%" }}
        initialAspectRatio={1}
        src={selectedUploadedImage}
        // viewMode={3}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        background={false}
        responsive={true}
        autoCropArea={1}
        width={"100%"}
        onResize={() => {
          console.log('resize')
        }}
        ready={() => {
          setLoading(false)
        }}
        wheelZoomRatio={0.1}
        // checkOrientation={false}
        // zoom={100}
        draggable={true}
        dragMode={dragMode}
        onLoad={() => {
          console.log("start load");
          setLoading(true)
        }}
      // cropBoxMovable={showCropFrame}
      />
      {loading && <div className="absolute left-0 top-0 w-full h-[75%] flex items-center justify-center z-20">
        <Spin />
      </div>}
      <div className="px-2">
        <div className="flex items-center justify-center relative py-3 mb-3">
          <button
            className="absolute left-0 top-3 w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center "
            onClick={() => {
            }}
          >
            <IoChevronBack className="text-white" />
          </button>
          <p className="text-white">선택된 페이지 없음</p>
          <button
            className="absolute right-0 top-3 w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center "
            onClick={() => {
            }}
          >
            <IoChevronForward className="text-white" />
          </button>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button>
              <RiArrowGoBackLine className="text-white text-[20px]" />
            </button>
            <button>
              <RiArrowGoForwardLine className="text-white text-[20px]" />
            </button>
            <button>
              <BsArrowCounterclockwise className="text-white font-bold text-[20px]" />
            </button>
            <button>
              <FaRegTrashAlt className="text-white text-[20px]" />
            </button>
          </div>
          <div>
            <button className="px-3 py-1 bg-[#434343] rounded-lg text-white">가이드 ON</button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setIsDarkBg(!isDarkBg)
            }}
            className="w-10 h-10 rounded-full p-2 border border-gray-300 flex items-center justify-center">
            <img src={phone} alt="phone" width={"80%"} />
          </button>
          <button
            onClick={() => {
              if (showCropFrame) {
                setDragMode('move');
                return
              }
              setDragMode('crop');
            }}
            className="w-10 h-10 rounded-full p-2 border border-gray-300 flex items-center justify-center">
            <img src={cropIcon} alt="phone" />
          </button>
          <button onClick={scaleToFitHeight} className="w-10 h-10 rounded-full p-2 border border-gray-300 flex items-center justify-center">
            <img src={expandHo} alt="phone" />
          </button>
          <button
            onClick={scaleToFitWidth}
            className="w-10 h-10 rounded-full p-2 border border-gray-300 flex items-center justify-center">
            <img src={expandVe} alt="phone" />
          </button>
        </div>
      </div>
    </>
  );
}
