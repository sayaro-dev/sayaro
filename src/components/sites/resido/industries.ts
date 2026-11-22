// Industry type definition for carousel - matches Sanity CMS structure
export interface Industry {
  slug: string | { current: string };
  sector: string;
  description: string;
  image: string | any; // Can be Sanity image object or string URL
  categories?: string[]; // For backward compatibility with static data
  relevantCategories?: string[]; // From Sanity CMS
}
