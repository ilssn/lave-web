import Image from 'next/image';
import React from 'react';

interface ScreenshotRendererProps {
  src: string;
  alt: string;
}

const ScreenshotRenderer: React.FC<ScreenshotRendererProps> = ({ src, alt }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={1000}
      height={1000}
      style={{ width: '100%', height: 'auto', borderRadius: '0.3rem' }}
    />
  );
};

export default ScreenshotRenderer;
