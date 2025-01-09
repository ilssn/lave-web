import React, { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { OptionProps } from "@/constants/options";
import { useClientTranslation } from "@/hooks/global";
import FileManager from "@/lib/file";

import CropBox from "./crop-box";
import CropRatio from "./crop-ratio";

interface ImageCropperConfirmData {
  firstFrame: File | null;
  lastFrame: File | null;
  thirdFrame: File | null;
  ratio: string;
}

interface ImageCropperProps {
  disable: boolean;
  originFirstFile: File | null;
  originLastFile: File | null;
  originThirdFile: File | null;
  ratioOptions: OptionProps[];
  resize: boolean;
  confirm: ({
    firstFrame,
    lastFrame,
    thirdFrame,
    ratio,
  }: ImageCropperConfirmData) => void;
}

export const ImageCropper = ({
  disable,
  resize,
  ratioOptions,
  originFirstFile,
  originLastFile,
  originThirdFile,
  confirm,
}: ImageCropperProps) => {
  const [ratio, setRatio] = useState(ratioOptions[0].value);
  const [firstSrc, setFirstSrc] = React.useState("");
  const [firstCanvas, setFirstCanvas] =
    React.useState<HTMLCanvasElement | null>(null);
  const [lastSrc, setLastSrc] = React.useState("");
  const [lastCanvas, setLastCanvas] = React.useState<HTMLCanvasElement | null>(
    null
  );
  const [thirdSrc, setThirdSrc] = React.useState("");
  const [thirdCanvas, setThirdCanvas] =
    React.useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    setRatio(ratioOptions[0].value);
  }, [ratioOptions]);

  useEffect(() => {
    if (originFirstFile) {
      const src = URL.createObjectURL(originFirstFile);
      setFirstSrc(src);
    } else {
      setFirstSrc("");
      setFirstCanvas(null);
    }
    if (originLastFile) {
      const src = URL.createObjectURL(originLastFile);
      setLastSrc(src);
    } else {
      setLastSrc("");
      setLastCanvas(null);
    }
    if (originThirdFile) {
      const src = URL.createObjectURL(originThirdFile);
      setThirdSrc(src);
    } else {
      setThirdSrc("");
      setThirdCanvas(null);
    }
  }, [originFirstFile, originLastFile, originThirdFile]);

  const handleComfirm = async () => {
    let firstFrame: File | null = null;
    let lastFrame: File | null = null;
    let thirdFrame: File | null = null;
    let local = "";
    if (firstCanvas) {
      if (resize) {
        const size = ratio.split(":");
        const newCanvas = (await FileManager.resetSizeCanvas(firstCanvas, {
          width: Number(size[0]),
          height: Number(size[1]),
        })) as HTMLCanvasElement;
        local = newCanvas.toDataURL();
      } else {
        local = firstCanvas.toDataURL();
      }
      await FileManager.loadImage(local);
      firstFrame = (await FileManager.imageToFile(local)) as File;
    }
    if (lastCanvas) {
      if (resize) {
        const size = ratio.split(":");
        const newCanvas = (await FileManager.resetSizeCanvas(lastCanvas, {
          width: Number(size[0]),
          height: Number(size[1]),
        })) as HTMLCanvasElement;
        local = newCanvas.toDataURL();
      } else {
        local = lastCanvas.toDataURL();
      }
      await FileManager.loadImage(local);
      lastFrame = (await FileManager.imageToFile(local)) as File;
    }
    if (thirdCanvas) {
      if (resize) {
        const size = ratio.split(":");
        const newCanvas = (await FileManager.resetSizeCanvas(thirdCanvas, {
          width: Number(size[0]),
          height: Number(size[1]),
        })) as HTMLCanvasElement;
        local = newCanvas.toDataURL();
      } else {
        local = thirdCanvas.toDataURL();
      }
      await FileManager.loadImage(local);
      thirdFrame = (await FileManager.imageToFile(local)) as File;
    }
    // confirm
    confirm({ firstFrame, lastFrame, thirdFrame, ratio });
  };

  const { t } = useClientTranslation();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" disabled={disable}>
          {t("v-gen:action.create_video")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-screen overflow-scroll">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("v-gen:form.ratio.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("v-gen:form.ratio.desc")}
          </AlertDialogDescription>
          <div className="relative m-auto flex w-[320px] max-w-full flex-col space-y-2 md:w-[460px]">
            <div className="flex w-full">
              {firstSrc && (
                <CropBox
                  src={firstSrc}
                  ratio={ratio}
                  setCanvas={setFirstCanvas}
                />
              )}
              {lastSrc && (
                <CropBox
                  src={lastSrc}
                  ratio={ratio}
                  setCanvas={setLastCanvas}
                />
              )}
            </div>
            {thirdSrc && (
              <div className="flex w-full justify-center">
                <CropBox
                  src={thirdSrc}
                  ratio={ratio}
                  setCanvas={setThirdCanvas}
                />
              </div>
            )}
            <CropRatio
              ratio={ratio}
              setRatio={setRatio}
              ratioOptions={ratioOptions}
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("global:system.cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={handleComfirm}>
            {t("global:system.confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
