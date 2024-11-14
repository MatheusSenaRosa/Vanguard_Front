import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  from: "top" | "right" | "bottom" | "left";
  duration?: number;
  useInViewHook?: boolean;
  children: React.ReactNode;
};

export const Reveal = ({ from, useInViewHook, duration = 2, children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView || !useInViewHook) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls, useInViewHook]);

  return (
    <motion.div
      ref={ref}
      variants={{
        topHidden: { opacity: 0, y: -50 },
        rightHidden: { opacity: 0, x: 50 },
        bottomHidden: { opacity: 0, y: 50 },
        leftHidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, y: 0 },
      }}
      initial={`${from}Hidden`}
      animate={mainControls}
      transition={{ duration }}
    >
      {children}
    </motion.div>
  );
};
