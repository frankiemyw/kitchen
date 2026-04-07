export type CateringTray = {
  name: string;
  serving: string;
  description: string;
  image?: string;
};

export const cateringTrays: CateringTray[] = [
  {
    name: "Chicken Adobo Tray",
    serving: "Good for 6–8 persons",
    description:
      "A savory classic that works well for office meals and family gatherings.",
  },
  {
    name: "Pork Menudo Tray",
    serving: "Good for 6–8 persons",
    description:
      "Hearty and flavorful, perfect for group meals and celebrations.",
  },
  {
    name: "Pancit Canton Tray",
    serving: "Good for 8–10 persons",
    description:
      "A Filipino gathering favorite that is easy to share and always welcome on the table.",
  },
  {
    name: "Fried Chicken Tray",
    serving: "Good for 6–8 persons",
    description:
      "Crispy, crowd-friendly, and a reliable favorite for mixed groups.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/clipboard_image_4b8e60ca4ca67878f38e156c4dccc101-F7t3Y7xip3O6fUZslTKJNzPdlQPNGK.png",
  },
  {
    name: "Mixed Vegetables Tray",
    serving: "Good for 6–8 persons",
    description:
      "A lighter dish that pairs well with any group order.",
  },
  {
    name: "Rice Tray",
    serving: "Good for 8–10 persons",
    description:
      "The perfect add-on to complete any tray order.",
  },
];
