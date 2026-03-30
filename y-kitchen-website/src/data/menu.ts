export type MenuItem = {
  name: string;
  description: string;
  price: string;
};

export type MenuCategory = {
  title: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    title: "Dine-In Meal Sets",
    items: [
      {
        name: "1 Entree + Rice",
        description: "Chicken or pork",
        price: "₱109",
      },
      {
        name: "1 Entree + Rice + Veggies",
        description: "Chicken or pork",
        price: "₱139",
      },
      {
        name: "1 Vegetables + Rice",
        description: "A lighter everyday option",
        price: "₱90",
      },
      {
        name: "1 Beef + Rice",
        description: "Beef meal served with rice",
        price: "₱120",
      },
      {
        name: "1 Beef + Rice + Veggies",
        description: "Beef meal with vegetables for a more complete plate",
        price: "₱150",
      },
      {
        name: "2 Entrees + Rice",
        description: "Chicken or pork",
        price: "₱170",
      },
      {
        name: "2 Entrees + Rice (with Beef)",
        description: "Includes beef option",
        price: "₱180",
      },
    ],
  },
  {
    title: "Meal Highlights",
    items: [
      { name: "Chicken meals", description: "", price: "" },
      { name: "Pork meals", description: "", price: "" },
      { name: "Beef meals", description: "", price: "" },
      { name: "Vegetable meals", description: "", price: "" },
      { name: "Rice meals", description: "", price: "" },
      { name: "Daily Filipino-style dishes", description: "", price: "" },
    ],
  },
];

export type FeaturedMeal = {
  name: string;
  description: string;
  price: string;
};

export const featuredMeals: FeaturedMeal[] = [
  {
    name: "1 Entree + Rice",
    description:
      "Choice of chicken or pork with rice, perfect for a simple and satisfying everyday meal.",
    price: "₱109",
  },
  {
    name: "1 Entree + Rice + Veggies",
    description:
      "Choice of chicken or pork with rice and vegetables for a more complete meal.",
    price: "₱139",
  },
  {
    name: "1 Beef + Rice",
    description:
      "A hearty beef meal served with rice for a richer and more filling option.",
    price: "₱120",
  },
  {
    name: "2 Entrees + Rice",
    description:
      "Two entrees with rice, ideal for those who want a bigger and more satisfying plate.",
    price: "₱170",
  },
];
