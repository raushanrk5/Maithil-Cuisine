import Image from "next/image";

type Dish = {
  name: string;
  hindi: string;
  description: string;
  tags: string[];
  price: string;
  image: string;     // swap with real path later e.g. "/dishes/paneer-tikka.jpg"
  emoji: string;     // fallback shown inside placeholder
};

const dishes: Dish[] = [
  {
    name: "Sattu Paratha",
    hindi: "सत्तू पराठा",
    description:
      "Whole wheat flatbread stuffed with spiced roasted gram flour — a Maithili breakfast staple, served with pickle and chutney.",
    tags: ["Veg", "Breakfast"],
    price: "₹60",
    image: "",
    emoji: "🫓",
  },
  {
    name: "Chilly Paneer",
    hindi: "चिली पनीर",
    description:
      "Crispy paneer tossed with bell peppers, onions and fiery Indo-Chinese sauce — bold, tangy, and addictive.",
    tags: ["Veg", "Starter"],
    price: "₹205",
    image: "",
    emoji: "🌶️",
  },
  {
    name: "Kadhai Paneer",
    hindi: "कड़ाई पनीर",
    description:
      "Paneer and peppers slow-cooked in a robust tomato-onion masala with freshly ground kadhai spices.",
    tags: ["Veg", "Main Course"],
    price: "₹225",
    image: "",
    emoji: "🍛",
  },
  {
    name: "Chicken Biryani",
    hindi: "चिकन बिरयानी",
    description:
      "Fragrant basmati rice slow-cooked with tender chicken, whole spices and caramelised onions — a celebration in every bite.",
    tags: ["Non-Veg", "Rice"],
    price: "₹240",
    image: "",
    emoji: "🍚",
  },
  {
    name: "Chicken Do Pyaza",
    hindi: "चिकन दो प्याज़ा",
    description:
      "Chicken cooked with a generous double helping of onions — rich, deeply flavoured and utterly satisfying.",
    tags: ["Non-Veg", "Main Course"],
    price: "₹245",
    image: "",
    emoji: "🍲",
  },
  {
    name: "Fish Curry",
    hindi: "मछली करी",
    description:
      "Fresh fish simmered in a traditional Maithili mustard-based gravy — the soul of Mithila on your plate.",
    tags: ["Non-Veg", "Main Course"],
    price: "₹245",
    image: "",
    emoji: "🐟",
  },
  {
    name: "Mutton Masala",
    hindi: "मटन मसाला",
    description:
      "Slow-cooked mutton in a bold, spiced onion-tomato gravy — rich, tender, and packed with robust flavour.",
    tags: ["Non-Veg", "Main Course"],
    price: "₹325",
    image: "",
    emoji: "🥩",
  },
  {
    name: "Makhana Kheer",
    hindi: "मखाना खीर",
    description:
      "Creamy lotus seed pudding in sweetened milk, delicately flavoured with cardamom — a Maithili dessert treasure.",
    tags: ["Veg", "Dessert"],
    price: "₹80",
    image: "",
    emoji: "🥛",
  },
];

const tagStyles: Record<string, string> = {
  "Non-Veg": "bg-red-50 text-red-700 border border-red-200",
  Veg: "bg-green-50 text-green-700 border border-green-200",
  Breakfast: "bg-orange-50 text-orange-700 border border-orange-200",
  Starter: "bg-purple-50 text-purple-700 border border-purple-200",
  "Main Course": "bg-blue-50 text-blue-700 border border-blue-200",
  Rice: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  Dessert: "bg-pink-50 text-pink-700 border border-pink-200",
};

export default function MenuSection() {
  return (
    <section id="menu" className="py-16 sm:py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-brand-gold" />
            <span className="text-brand-gold text-xs tracking-[0.35em] uppercase font-medium">
              Our Menu
            </span>
            <div className="h-px w-12 bg-brand-gold" />
          </div>
          <h2 className="text-brand-crimson text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Featured Dishes
          </h2>
          <p className="text-brand-navy/65 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            Every dish carries the taste of Mithila — crafted with ancestral
            recipes and the finest local ingredients.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {dishes.map((dish) => (
            <div
              key={dish.name}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-cream-dark hover:shadow-md hover:border-brand-gold/40 transition-all group"
            >
              {/* Image area */}
              {dish.image ? (
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="h-44 w-full bg-linear-to-br from-brand-navy via-brand-crimson/80 to-brand-navy flex flex-col items-center justify-center gap-2 relative overflow-hidden">
                  {/* Subtle dot pattern */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  <span className="text-5xl relative z-10">{dish.emoji}</span>
                  <span className="text-white/40 text-[10px] tracking-widest uppercase relative z-10">
                    Photo coming soon
                  </span>
                </div>
              )}

              {/* Card body */}
              <div className="p-5">
                <div className="flex gap-1.5 flex-wrap mb-3">
                  {dish.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${tagStyles[tag] ?? "bg-gray-100 text-gray-600"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-brand-navy font-bold text-lg mb-0.5 group-hover:text-brand-crimson transition-colors">
                  {dish.name}
                </h3>
                <p className="text-brand-navy/40 text-sm mb-3">{dish.hindi}</p>
                <p className="text-brand-navy/65 text-sm leading-relaxed mb-4">
                  {dish.description}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-brand-cream-dark">
                  <span className="text-brand-crimson font-bold text-lg">
                    {dish.price}
                  </span>
                  <span className="text-brand-gold">✦</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
