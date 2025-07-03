export default function CategoryFilter({ categories, activeCategory, setActiveCategory }) {
  if (!categories || categories.length === 0) return null;
  
  return (
    <div className="flex overflow-x-auto pb-2 scrollbar-hide space-x-2 w-full max-w-full">
      {categories.map(category => (
        <button
          key={category}
          className={`px-3 py-1.5 md:px-5 md:py-2.5 rounded-full transition-all duration-300 font-medium text-xs md:text-sm whitespace-nowrap ${
            activeCategory === category
              ? 'bg-premium-gold text-premium-navy shadow-md'
              : 'bg-premium-cream text-premium-charcoal hover:bg-premium-cream/80'
          }`}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}