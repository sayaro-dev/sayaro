import type { Project } from "./data";

export interface Industry {
  slug: string;
  sector: string;
  description: string;
  image: string;
  categories: Project["category"][];
}

export const industries: Industry[] = [
  { slug: "education-academic", sector: "Education & Academic Laboratories", description: "Schools, colleges, universities, polytechnic institutions", image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80", categories: ["Sterilization", "Life Science", "Safety & Airflow", "Thermal & Industrial", "Thermal Baths"] },
  { slug: "pharmaceutical-healthcare", sector: "Pharmaceutical & Healthcare", description: "Pharma companies, hospitals, medical laboratories, diagnostic centres", image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80", categories: ["Sterilization", "Life Science", "Safety & Airflow"] },
  { slug: "food-beverage", sector: "Food & Beverage Industry", description: "Dairy plants, milk production, food processing, beverage manufacturing", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80", categories: ["Sterilization", "Life Science", "Thermal & Industrial"] },
  { slug: "water-environmental", sector: "Water & Environmental Testing", description: "Water treatment plants, wastewater plants, drinking water testing, environmental laboratories", image: "https://images.unsplash.com/photo-1581093458791-9d42e3c11e45?w=800&q=80", categories: ["Life Science", "Thermal Baths", "Thermal & Industrial"] },
  { slug: "chemical-petrochemical", sector: "Chemical & Petrochemical Industry", description: "Chemical manufacturing, petroleum, oil, paint, fertilizer industries", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80", categories: ["Thermal & Industrial", "Safety & Airflow", "Thermal Baths"] },
  { slug: "industrial-quality-control", sector: "Industrial Quality Control (QC)", description: "Manufacturing companies, production plants, quality inspection departments", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", categories: ["Sterilization", "Thermal & Industrial", "Life Science"] },
  { slug: "research-development", sector: "Research & Development (R&D)", description: "Industrial R&D departments, research centres, innovation laboratories", image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80", categories: ["Sterilization", "Life Science", "Thermal & Industrial", "Safety & Airflow", "Thermal Baths"] },
  { slug: "calibration-testing", sector: "Calibration & Testing Services", description: "Calibration companies, testing agencies, certification laboratories", image: "https://images.unsplash.com/photo-1564325724739-bae0bd08762c?w=800&q=80", categories: ["Thermal & Industrial", "Thermal Baths"] },
  { slug: "agriculture-soil-testing", sector: "Agriculture & Soil Testing", description: "Agriculture laboratories, soil testing, fertilizer testing, agricultural research", image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80", categories: ["Life Science", "Thermal & Industrial", "Thermal Baths"] },
  { slug: "biotechnology-life-sciences", sector: "Biotechnology & Life Sciences", description: "Biotechnology, microbiology, biochemistry, life sciences laboratories", image: "https://images.unsplash.com/photo-1607988795691-3d0147b43231?w=800&q=80", categories: ["Sterilization", "Life Science", "Safety & Airflow", "Thermal Baths"] },
  { slug: "material-testing-engineering", sector: "Material Testing & Engineering", description: "Cement, steel, construction, polymer, plastic, textile testing", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80", categories: ["Thermal & Industrial"] },
  { slug: "government-public-sector", sector: "Government & Public Sector Laboratories", description: "Government testing laboratories, public research institutions, regulatory laboratories", image: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=800&q=80", categories: ["Sterilization", "Life Science", "Thermal & Industrial", "Safety & Airflow", "Thermal Baths"] },
];
