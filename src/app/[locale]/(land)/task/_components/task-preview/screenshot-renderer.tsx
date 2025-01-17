import Image from "next/image";
import React, { useEffect, useState } from "react";

import { DotLoader } from "@/components/common/loader-renderer";

interface ScreenshotRendererProps {
  src: string;
  alt: string;
}

const ScreenshotRenderer: React.FC<ScreenshotRendererProps> = ({
  src,
  alt,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 当 src 变化时，重置 loading 状态
    setLoading(true);
  }, [src]);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    console.error("Image failed to load");
  };

  return (
    <div className="relative h-full w-full">
      {loading && <DotLoader className="absolute left-0 top-0 z-50" />}
      <Image
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
        width={1000}
        height={1000}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "0.3rem",
          opacity: loading ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      />
    </div>
  );
};

export default ScreenshotRenderer;
