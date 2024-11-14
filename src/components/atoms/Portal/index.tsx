import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Portal = ({ children, className }: Props) => {
  const [portalElement, setPortalElement] = useState<HTMLDivElement>(null);

  useEffect(() => {
    const elementRef = document.createElement("div");
    elementRef.classList.add(className || "portal");
    document.body.appendChild(elementRef);

    setPortalElement(elementRef);

    return () => {
      document.body.removeChild(elementRef);
    };
  }, [className]);

  return portalElement ? createPortal(children, portalElement) : null;
};
