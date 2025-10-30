"use client";

import { useDonationModal } from "@/components/donation/hooks/useDonationModal";
import Button from "@/components/Button";
import ButtonLine from "@/components/ButtonLine";
import { MouseEvent, ReactNode } from "react";

interface DonationButtonWrapperProps {
  children: ReactNode;
  className?: string;
  initialProgram?: string;
  initialAmount?: number;
  variant?: "button" | "buttonLine";
  href?: string;
}

export function DonationButtonWrapper({
  children,
  className,
  initialProgram,
  initialAmount,
  variant = "button",
  href = "#",
}: DonationButtonWrapperProps) {
  const { openModal } = useDonationModal();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openModal({
      initialProgram,
      initialAmount,
    });
  };

  if (variant === "buttonLine") {
    return (
      <ButtonLine href={href} onClick={handleClick} className={className}>
        {children}
      </ButtonLine>
    );
  }

  return (
    <Button href={href} onClick={handleClick} className={className}>
      {children}
    </Button>
  );
}
