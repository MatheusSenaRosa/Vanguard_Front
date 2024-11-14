import { useEffect, useState } from "react";

export const useProgressiveImg = (imageSrc: string): [string, boolean] => {
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        setSrc(imageSrc);
      };
    }
  }, [imageSrc]);

  const isSkeleton = !src;

  return [src, isSkeleton];
};
