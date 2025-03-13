import { motion } from "framer-motion";
import { useRef } from "react";

type PaginationProgressBar = {
  page: number;
  time: number;
};

export const PaginationProgressBar: React.FC<PaginationProgressBar> = ({
  page,
  time,
}) => {
  const widthRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      className="w-[200px] h-[10px] rounded-lg bg-support overflow-hidden"
      ref={widthRef}
    >
      {widthRef.current && (
        <motion.div
          key={page}
          initial={{
            width: 0,
            height: widthRef.current?.clientHeight,
            borderRadius: "8px",
          }}
          animate={{
            width: widthRef.current?.clientWidth,
            height: widthRef.current?.clientHeight,
          }}
          transition={{
            duration: time / 1000,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="bg-main-default"
        />
      )}
    </div>
  );
};
