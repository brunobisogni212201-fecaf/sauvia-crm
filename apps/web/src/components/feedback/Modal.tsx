"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnOverlay?: boolean;
  showCloseButton?: boolean;
}

const sizeStyles: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-4xl",
};

export function Modal({
  open,
  onClose,
  title,
  children,
  size = "md",
  closeOnOverlay = true,
  showCloseButton = true,
}: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={closeOnOverlay ? onClose : undefined}
      />

      <div
        className={`
        relative w-full ${sizeStyles[size]}
        bg-white rounded-2xl shadow-lg
        animate-scale-in
        ${size === "full" ? "h-[90vh]" : ""}
      `}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-surface-container">
            {title && (
              <h2 className="text-xl font-semibold text-on-surface font-display">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-surface-container transition-colors"
              >
                <X className="w-5 h-5 text-on-surface-variant" />
              </button>
            )}
          </div>
        )}

        <div
          className={`p-6 ${size === "full" ? "overflow-auto h-[calc(90vh-80px)]" : ""}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

interface ModalFooterProps {
  children: React.ReactNode;
}

export function ModalFooter({ children }: ModalFooterProps) {
  return (
    <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-surface-container">
      {children}
    </div>
  );
}

export default Modal;
