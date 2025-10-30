import { ReactNode } from "react";
import { DonationProvider } from "./DonationProvider";
import { ContactProvider } from "./ContactProvider";
import { DonationModal } from "@/components/donation/DonationModal";
import { ContactModal } from "@/components/contact/ContactModal";
import { programService } from "@/data/donations/program/program.service";

interface ClientProvidersProps {
  children: ReactNode;
}

export async function ClientProviders({ children }: ClientProvidersProps) {
  const initialPrograms = await programService.getAllPrograms();
  return (
    <DonationProvider>
      <ContactProvider>
        {children}
        <DonationModal initialPrograms={initialPrograms} />
        <ContactModal />
      </ContactProvider>
    </DonationProvider>
  );
}
