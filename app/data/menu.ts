export type MenuItem = {
  name: string;
  price: string;
};

export type MenuCategory = {
  name: string;
  items: MenuItem[];
};

export const vegMenu: MenuCategory[] = [
  {
    name: "Breakfast",
    items: [
      { name: "Aaloo Paratha", price: "₹50" },
      { name: "Paneer Paratha", price: "₹70" },
      { name: "Methi Paratha", price: "₹65" },
      { name: "Pyaaj Paratha", price: "₹60" },
      { name: "Sattu Paratha", price: "₹60" },
      { name: "Plain Dosa", price: "₹60" },
      { name: "Masala Dosa", price: "₹100" },
      { name: "Paneer Dosa", price: "₹120" },
      { name: "Chhole Bhature", price: "₹70" },
    ],
  },
  {
    name: "Starter",
    items: [
      { name: "Fried Papad", price: "₹25" },
      { name: "Masala Papad", price: "₹35" },
      { name: "Crispy Corn", price: "₹215" },
      { name: "Paneer 65", price: "₹195" },
      { name: "Chilly Paneer", price: "₹205" },
      { name: "Mushroom 65", price: "₹215" },
      { name: "Chilly Mushroom", price: "₹200" },
      { name: "Gobi Manchurian", price: "₹195" },
      { name: "Baby Corn 65", price: "₹255" },
      { name: "Chilly Baby Corn", price: "₹255" },
      { name: "Paneer Tikka", price: "₹225" },
    ],
  },
  {
    name: "Rice & Noodles",
    items: [
      { name: "Steam Rice", price: "₹60" },
      { name: "Jeera Rice", price: "₹75" },
      { name: "Fried Rice", price: "₹145" },
      { name: "Veg Biryani", price: "₹180" },
      { name: "Veg Noodles", price: "₹155" },
      { name: "Hakka Noodles", price: "₹155" },
      { name: "Schezwan Noodles", price: "₹165" },
      { name: "Paneer Noodles", price: "₹170" },
      { name: "Veg Chilli Garlic", price: "₹170" },
    ],
  },
  {
    name: "Main Course",
    items: [
      { name: "Dal Makhani", price: "₹125" },
      { name: "Dal Punjabi", price: "₹105" },
      { name: "Tadkewall Daal", price: "₹85" },
      { name: "Mix Veg Gravy", price: "₹165" },
      { name: "Veg Kolhapuri", price: "₹175" },
      { name: "Jeera Aloo", price: "₹135" },
      { name: "Aloo Masala", price: "₹140" },
      { name: "Paneer Masala", price: "₹185" },
      { name: "Kadhai Paneer", price: "₹225" },
      { name: "Paneer Butter Masala", price: "₹195" },
      { name: "Paneer Tawa Masala", price: "₹275" },
      { name: "Paneer Lababdar", price: "₹265" },
      { name: "Shahi Paneer", price: "₹245" },
      { name: "Palak Paneer", price: "₹215" },
      { name: "Malai Paneer", price: "₹275" },
      { name: "Paneer Mushroom Masala", price: "₹235" },
      { name: "Kadhai Mushroom", price: "₹255" },
      { name: "Veg Kofta", price: "₹180" },
      { name: "Paneer Kolhapuri", price: "₹245" },
      { name: "Malai Kofta Paneer", price: "₹245" },
    ],
  },
  {
    name: "Bread",
    items: [
      { name: "Roti (Butter)", price: "₹10 / ₹12" },
      { name: "Naan (Butter)", price: "₹35" },
      { name: "Stuffed Naan", price: "₹65" },
      { name: "Tandoori Roti (Butter)", price: "₹12 / ₹16" },
      { name: "Laccha Paratha", price: "₹40" },
      { name: "Garlic Naan", price: "₹55" },
    ],
  },
  {
    name: "Desserts",
    items: [
      { name: "Makhana Kheer", price: "₹80" },
      { name: "Ras Malai", price: "₹75" },
      { name: "Malai Chamcham", price: "₹45" },
      { name: "Gulab Jamun", price: "₹40" },
    ],
  },
];

export const nonVegMenu: MenuCategory[] = [
  {
    name: "Breakfast",
    items: [
      { name: "Boiled Egg (2 pcs)", price: "₹50" },
      { name: "Omelette (2 pcs)", price: "₹60" },
      { name: "Masala Omelette (2 pcs)", price: "₹70" },
    ],
  },
  {
    name: "Starter",
    items: [
      { name: "Chilly Chicken", price: "₹225" },
      { name: "Chicken 65", price: "₹265" },
      { name: "Chicken Tikka", price: "₹285" },
      { name: "Chicken Lollypop", price: "₹225" },
      { name: "Fish Fry", price: "₹50/pc" },
      { name: "Tandoori Chicken", price: "₹275" },
      { name: "Chicken Afgani", price: "₹300" },
      { name: "Chicken Reshmi Kabab (8 pcs)", price: "₹310" },
      { name: "Chicken Hariyali Tikka", price: "₹315" },
      { name: "Chicken Fry", price: "₹260" },
    ],
  },
  {
    name: "Noodles",
    items: [
      { name: "Egg Noodles", price: "₹170" },
      { name: "Egg + Chicken Noodles", price: "₹185" },
      { name: "Chicken Noodles", price: "₹195" },
    ],
  },
  {
    name: "Main Course",
    items: [
      { name: "Omelette Curry", price: "₹145" },
      { name: "Egg Curry", price: "₹110" },
      { name: "Egg Masala", price: "₹125" },
      { name: "Egg Bhurji Masala", price: "₹165" },
      { name: "Butter Chicken", price: "₹295" },
      { name: "Chicken Curry", price: "₹265" },
      { name: "Chicken Masala", price: "₹285" },
      { name: "Chicken Kadai", price: "₹275" },
      { name: "Chicken Do Pyaza", price: "₹245" },
      { name: "Chicken Butter Masala", price: "₹275" },
      { name: "Chicken Dehati", price: "₹485" },
      { name: "Chicken Afgani", price: "₹280" },
      { name: "Chicken Kolhapuri", price: "₹280" },
      { name: "Chicken Punjabi", price: "₹295" },
      { name: "Chicken Lababdar", price: "₹295" },
      { name: "Chicken Tawa", price: "₹275" },
      { name: "Murg Musallam (Large)", price: "₹550" },
      { name: "Mutton Curry", price: "₹315" },
      { name: "Mutton Dehati", price: "₹565" },
      { name: "Mutton Masala", price: "₹325" },
      { name: "Mutton Bhuna", price: "₹565" },
      { name: "Mutton Rogan Josh", price: "₹335" },
      { name: "Mutton Do Pyaza", price: "₹345" },
    ],
  },
  {
    name: "Bread",
    items: [
      { name: "Roti (Butter)", price: "₹10 / ₹12" },
      { name: "Naan (Butter)", price: "₹35 / ₹40" },
      { name: "Stuffed Naan", price: "₹65" },
      { name: "Tandoori Roti (Butter)", price: "₹12 / ₹16" },
      { name: "Laccha Paratha", price: "₹40" },
      { name: "Garlic Naan", price: "₹55" },
    ],
  },
];
