import { ReactNode } from "react";
import { DonationProvider } from "./DonationProvider";
import { DonationModal } from "@/components/donation/DonationModal";
import { programService } from "@/data/donations/program/program.service";

interface ClientProvidersProps {
  children: ReactNode;
}

export async function ClientProviders({ children }: ClientProvidersProps) {
  const initialPrograms = await programService.getAllPrograms();
  return (
    <DonationProvider>
      {children}
      <DonationModal initialPrograms={initialPrograms} />
    </DonationProvider>
  );
}
