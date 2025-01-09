/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

import { Cropper } from "react-mobile-cropper";
import "react-mobile-cropper/dist/style.css";

import { CircleLoader } from "../loader-renderer";

interface PropsData {
  src: string;
  ratio: string;
  setCanvas: (data: any) => void;
}

const CropBox = ({ src, ratio, setCanvas }: PropsData) => {
  const [ratioValue, setRatioValue] = useState(0);
  const cropperRef = React.useRef<any>(null);
  const [image, setImage] = React.useState<any>(null);

  // :src
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setTimeout(() => {
        setImage(img);
      }, 300);
    };
    img.onerror = () => {
      console.log("Load image error");
    };
  }, [src]);

  // canvas
  useEffect(() => {
    if (cropperRef.current) {
      setTimeout(() => {
        setCanvas(cropperRef.current.getCanvas());
      }, 300);
    }
  }, [image, cropperRef, setCanvas, ratio]);

  // ratio
  useEffect(() => {
    const ratioSizes = ratio.split(":");
    setRatioValue(Number(ratioSizes[0]) / Number(ratioSizes[1]));
  }, [ratio]);

  // change
  const onChange = () => {
    setCanvas(cropperRef.current.getCanvas());
  };

  return (
    <CircleLoader loading={!image}>
      <Cropper
        ref={cropperRef}
        className="w-full"
        src={src}
        onChange={onChange}
        stencilProps={{
          aspectRatio: ratioValue || {
            minimum: 1 / 16,
            maximum: 16 / 1,
          },
          movable: false,
          resizable: true,
        }}
      />
    </CircleLoader>
  );
};

export default CropBox;
