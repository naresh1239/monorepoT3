export { ProfileCard } from './ProfileCard'
export type { ProfileCardProps } from './ProfileCard'

export interface User {
  id: number;
  name: string;
  city: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}
export interface Project {
  name: string;
  description: string;
  stack: string[];
  status: "live" | "wip" | "archived";
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  bio: string;
  skills: string[];
  projects: Project[];
  links: { label: string; url: string }[];
}