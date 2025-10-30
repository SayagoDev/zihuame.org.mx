export interface Program {
  id: string;
  name: string;
  description: string;
  image: string;
  backgroundColor: string;
  areas: string[];
  testimonials: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
