import { DotLoader } from '@/components/common/loader-renderer';
import Image from 'next/image';
import React, { useState } from 'react';

interface ScreenshotRendererProps {
  src: string;
  alt: string;
}

const ScreenshotRenderer: React.FC<ScreenshotRendererProps> = ({ src, alt }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    console.error('Image failed to load');
  };


  return (
    <div className="relative w-full h-full">
      {
        loading && <DotLoader className="absolute top-0 left-0 z-50" />
      }
      <Image
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
        width={1000}
        height={1000}
        style={{ width: '100%', height: 'auto', borderRadius: '0.3rem' }}
      />
    </div>
  );
};

export default ScreenshotRenderer;
