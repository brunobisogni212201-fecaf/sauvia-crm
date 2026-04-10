"use client";

import React, { useState, useRef, useEffect } from "react";

type TooltipPosition = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: TooltipPosition;
  delay?: number;
}

const positionStyles: Record<TooltipPosition, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const arrowStyles: Record<TooltipPosition, string> = {
  top: "top-full left-1/2 -translate-x-1/2 border-t-surface-container",
  bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-surface-container",
  left: "left-full top-1/2 -translate-y-1/2 border-l-surface-container",
  right: "right-full top-1/2 -translate-y-1/2 border-r-surface-container",
};

export function Tooltip({
  content,
  children,
  position = "top",
  delay = 300,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {visible && (
        <div
          className={`
            absolute z-50 px-3 py-2 text-sm
            bg-surface-container text-on-surface
            rounded-lg shadow-md
            whitespace-nowrap
            animate-fade-in
            ${positionStyles[position]}
          `}
        >
          {content}
          <span
            className={`
              absolute w-0 h-0 border-4 border-transparent
              ${arrowStyles[position]}
            `}
          />
        </div>
      )}
    </div>
  );
}

export default Tooltip;
