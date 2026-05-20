export type PostItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  excerpt?: string;
  date?: string;
  source: "static" | "wordpress";
};
