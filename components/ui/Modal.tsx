"use client";

import { useEffect, useRef, ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
  showCloseButton?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  className,
  showCloseButton = true,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;

    if (!isInDialog) {
      handleClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onClose={handleClose}
      onClick={handleBackdropClick}
    >
      <div className={cn("modal-box w-11/12 max-w-2xl", className)}>
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          {title && <h3 className="text-lg font-bold">{title}</h3>}
          {showCloseButton && (
            <form method="dialog">
              <button
                type="button"
                onClick={handleClose}
                className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
              >
                <X className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={handleClose}>
          close
        </button>
      </form>
    </dialog>
  );
}
