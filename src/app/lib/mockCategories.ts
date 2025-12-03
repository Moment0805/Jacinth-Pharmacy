export interface MockCategory {
  id: string;
  name: string;
  slug: string;
  image?: string;
}

export const mockCategories: MockCategory[] = [
  {
    id: "1",
    name: "Fruits & Vegetables",
    slug: "fruits-vegetables",
  },
  {
    id: "2",
    name: "Baby & Pregnancy",
    slug: "baby-pregnancy",
  },
  {
    id: "3",
    name: "Beverages",
    slug: "beverages",
  },
  {
    id: "4",
    name: "Meats & Seafood",
    slug: "meats-seafood",
  },
  {
    id: "5",
    name: "Biscuits & Snacks",
    slug: "biscuits-snacks",
    image: "/05.svg",
  },
  {
    id: "6",
    name: "Breads & Bakery",
    slug: "breads-bakery",
  },
  {
    id: "7",
    name: "Breakfast & Dairy",
    slug: "breakfast-dairy",
    image: "/07.svg",
  },
  {
    id: "8",
    name: "Frozen Foods",
    slug: "frozen-foods",
  },
  {
    id: "9",
    name: "Grocery & Staples",
    slug: "grocery-staples",
    image: "/09.svg",
  },
  {
    id: "10",
    name: "Healthcare",
    slug: "healthcare",
  },
  {
    id: "11",
    name: "Household Needs",
    slug: "household-needs",
  },
];
