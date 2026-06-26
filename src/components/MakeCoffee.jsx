// MakeCoffee.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import IngredientCard from "./IngredientsCard";

const ALL_INGREDIENTS = [
  { id: 1, name: "Espresso", image: "espresso.jpg", category: "Base" },
  { id: 2, name: "Double Espresso", image: "espresso.jpg", category: "Base" },
  { id: 3, name: "Cold Brew", image: "cold-brew-coffee.jpg", category: "Base" },
  { id: 4, name: "Drip Coffee", image: "coffee.jpg", category: "Base" },
  { id: 5, name: "Whole Milk", image: "milk.jpg", category: "Milk" },
  { id: 6, name: "Oat Milk", image: "oat-milk.jpg", category: "Milk" },
  { id: 7, name: "Almond Milk", image: "almond-milk.jpg", category: "Milk" },
  { id: 8, name: "Coconut Milk", image: "coconut-milk.jpg", category: "Milk" },
  { id: 9, name: "Heavy Cream", image: "heavy-cream.jpg", category: "Milk" },
  { id: 10, name: "Condensed Milk", image: "condensed-milk.jpg", category: "Milk" },
  { id: 11, name: "Whipped Cream", image: "whipped-cream.jpg", category: "Topping" },
  { id: 12, name: "Vanilla Syrup", image: "vanilla.jpg", category: "Syrup" },
  { id: 13, name: "Caramel Syrup", image: "caramel.jpg", category: "Syrup" },
  { id: 14, name: "Hazelnut Syrup", image: "hazelnut.jpg", category: "Syrup" },
  { id: 15, name: "Chocolate Syrup", image: "chocolate-syrup.jpg", category: "Syrup" },
  { id: 16, name: "Brown Sugar", image: "brown-sugar.jpg", category: "Sweetener" },
  { id: 17, name: "White Sugar", image: "sugar.jpg", category: "Sweetener" },
  { id: 18, name: "Honey", image: "honey.jpg", category: "Sweetener" },
  { id: 19, name: "Maple Syrup", image: "maple-syrup.jpg", category: "Sweetener" },
  { id: 20, name: "Stevia", image: "stevia.jpg", category: "Sweetener" },
  { id: 21, name: "Cinnamon", image: "cinnamon.jpg", category: "Spice" },
  { id: 22, name: "Nutmeg", image: "nutmeg.jpg", category: "Spice" },
  { id: 23, name: "Cardamom", image: "cardamom.jpg", category: "Spice" },
  { id: 24, name: "Cocoa Powder", image: "cocoa-powder.jpg", category: "Spice" },
  { id: 25, name: "Vanilla Extract", image: "vanilla-extract.jpg", category: "Spice" },
  { id: 26, name: "Ice", image: "ice.jpg", category: "Extra" },
  { id: 27, name: "Sea Salt", image: "salt.jpg", category: "Extra" },
  { id: 28, name: "Peppermint Syrup", image: "peppermint.jpg", category: "Syrup" },
  { id: 29, name: "Lavender Syrup", image: "lavender.jpg", category: "Syrup" },
  { id: 30, name: "Toffee Syrup", image: "toffee.jpg", category: "Syrup" },
  { id: 31, name: "Cocoa Nibs", image: "cocoa-nibs.jpg", category: "Topping" },
  { id: 32, name: "Cinnamon Powder", image: "cinnamon-powder.jpg", category: "Topping" },
];

const CATEGORIES = ["All", "Base", "Milk", "Syrup", "Sweetener", "Spice", "Topping", "Extra"];
const SUGGESTIONS = ["espresso", "oat milk", "vanilla", "caramel", "cinnamon", "hazelnut"];
const ITEMS_PER_PAGE = 8;

const INGREDIENT_COLORS = {
  Espresso: "#2C1503",
  "Double Espresso": "#1a0d02",
  "Cold Brew": "#3B1F0B",
  "Drip Coffee": "#5C3310",
  "Whole Milk": "#F5F0E8",
  "Oat Milk": "#E8D9C0",
  "Almond Milk": "#F0E4CF",
  "Coconut Milk": "#FEFEFE",
  "Heavy Cream": "#FFF8E7",
  "Condensed Milk": "#F5DEB3",
  "Whipped Cream": "#FFFDF5",
  "Vanilla Syrup": "#F3E5AB",
  "Caramel Syrup": "#C68E17",
  "Hazelnut Syrup": "#B5651D",
  "Chocolate Syrup": "#3D1C02",
  "Brown Sugar": "#A0522D",
  "White Sugar": "#F5F5DC",
  Honey: "#EB9605",
  "Maple Syrup": "#B5651D",
  Stevia: "#C8E6C0",
  Cinnamon: "#8B4513",
  Nutmeg: "#7B3F00",
  Cardamom: "#6B8E23",
  "Cocoa Powder": "#3E1503",
  "Vanilla Extract": "#F5DEB3",
  Ice: "#D6EAF8",
  "Sea Salt": "#E0E0E0",
  "Peppermint Syrup": "#98FB98",
  "Lavender Syrup": "#B57EDC",
  "Toffee Syrup": "#8B6914",
  "Cocoa Nibs": "#2E1A05",
  "Cinnamon Powder": "#D2691E",
};

const MakeCoffee = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [showCupModal, setShowCupModal] = useState(false);
  const [shakeWarning, setShakeWarning] = useState(false);

  const hasCoffeeBase = selectedIngredients.some(
    (item) => item.category === "Base"
  );

  const filteredIngredients = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return ALL_INGREDIENTS.filter((ingredient) => {
      const matchesSearch =
        !query || ingredient.name.toLowerCase().includes(query);
      const matchesCategory =
        activeCategory === "All" || ingredient.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const totalPages = Math.ceil(filteredIngredients.length / ITEMS_PER_PAGE);

  const paginatedIngredients = filteredIngredients.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const applySearch = (value) => {
    setSearchQuery(value.trim());
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    applySearch(searchInput);
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleCategory = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const addToCup = (ingredient) => {
    if (ingredient.name === "Whipped Cream") {
      const hasOtherIngredient = selectedIngredients.some(
        (item) => item.name !== "Whipped Cream"
      );
      const alreadyHasWhippedCream = selectedIngredients.some(
        (item) => item.name === "Whipped Cream"
      );
      if (!hasOtherIngredient || alreadyHasWhippedCream) return;
    }
    setSelectedIngredients((prev) => [...prev, ingredient]);
  };

  const removeFromCup = (index) => {
    setSelectedIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCup = () => {
    setSelectedIngredients([]);
  };

  const handleBrewMyCup = () => {
    if (!hasCoffeeBase) {
      setShakeWarning(true);
      setTimeout(() => setShakeWarning(false), 820);
      return;
    }
    navigate("/order", {
      state: { selectedIngredients, ingredientColors: INGREDIENT_COLORS },
    });
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }
    const pages = [1];
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    if (currentPage > 3) pages.push("...");
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const groupedIngredients = selectedIngredients.reduce((acc, item) => {
    const existing = acc.find((g) => g.name === item.name);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ ...item, count: 1 });
    }
    return acc;
  }, []);

  return (
    <section className="min-h-screen bg-[#120A08] px-6 py-16 relative">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-[#C08B5C] font-cormorant italic tracking-[0.3em] text-lg mb-2">
          — handcrafted selection —
        </p>
        <h1 className="text-[#F5E6D3] font-poppins text-4xl md:text-5xl font-bold tracking-tight">
          Make Your Coffee
        </h1>
        <p className="text-[#C08B5C] font-cormorant text-xl mt-4 max-w-xl mx-auto">
          Choose your ingredients and craft your perfect cup
        </p>
        <div className="w-24 h-[1px] bg-[#C08B5C] mx-auto mt-6 opacity-60" />
      </div>

      {/* Centered Main Content */}
      <div className="max-w-4xl mx-auto">
        {/* Search */}
        <div className="max-w-xl mx-auto mb-6">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <svg
              className="absolute left-4 w-4 h-4 text-[#5B3625]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search ingredients..."
              className="w-full bg-[#1a0e09] border border-[#5B3625] rounded-full py-3 pl-11 pr-24 text-[#F5E6D3] font-cormorant text-lg placeholder-[#5B3625] focus:outline-none focus:border-[#C08B5C] focus:shadow-[0_0_20px_#C08B5C20] transition-all duration-300"
            />
            {searchInput && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-20 text-[#5B3625] hover:text-[#C08B5C] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button
              type="submit"
              className="absolute right-1.5 bg-[#C08B5C] hover:bg-[#a97545] text-[#120A08] font-poppins text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-300"
            >
              Search
            </button>
          </form>

          {searchQuery && (
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="text-[#5B3625] font-cormorant italic text-sm">
                Results for:
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#3E1F0D] text-[#C08B5C] font-poppins text-xs px-3 py-1 rounded-full border border-[#5B3625]">
                &ldquo;{searchQuery}&rdquo;
                <button onClick={clearSearch} className="hover:text-[#F5E6D3] transition-colors">×</button>
              </span>
            </div>
          )}
        </div>

        {/* Suggestions */}
        {!searchQuery && (
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setSearchInput(suggestion);
                  applySearch(suggestion);
                }}
                className="px-3 py-1 rounded-full border border-[#3E1F0D] bg-[#1a0e09] text-[#C08B5C] font-cormorant italic text-sm hover:border-[#C08B5C] hover:bg-[#3E1F0D] transition-all duration-300"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleCategory(category)}
              className={`px-4 py-1.5 rounded-full font-poppins text-[10px] tracking-wider transition-all duration-300 ${
                activeCategory === category
                  ? "bg-[#C08B5C] text-[#120A08] font-bold shadow-[0_0_15px_#C08B5C50]"
                  : "border border-[#5B3625] text-[#C08B5C] hover:bg-[#3E1F0D] hover:border-[#C08B5C]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredIngredients.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-16">
            <p className="text-[#5B3625] font-cormorant italic text-xl">No ingredients found</p>
            <button
              onClick={() => {
                clearSearch();
                handleCategory("All");
              }}
              className="px-5 py-2 rounded-full border border-[#C08B5C] text-[#C08B5C] font-poppins text-xs hover:bg-[#3E1F0D] transition-all duration-300"
            >
              Show All
            </button>
          </div>
        )}

        {/* Ingredients Grid */}
        {filteredIngredients.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-[#5B3625] font-cormorant italic text-xs tracking-widest">
                {filteredIngredients.length} ingredients
              </p>
              <p className="text-[#5B3625] font-cormorant italic text-xs tracking-widest">
                {currentPage} / {totalPages}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {paginatedIngredients.map((ingredient) => (
                <IngredientCard
                  key={ingredient.id}
                  ingredient={ingredient}
                  onAdd={() => addToCup(ingredient)}
                  ingredientColor={INGREDIENT_COLORS[ingredient.name]}
                  isInCup={selectedIngredients.some(
                    (item) => item.name === ingredient.name
                  )}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full border font-poppins text-xs transition-all duration-300 ${
                    currentPage === 1
                      ? "border-[#2a1810] text-[#2a1810] cursor-not-allowed"
                      : "border-[#5B3625] text-[#C08B5C] hover:bg-[#3E1F0D] hover:border-[#C08B5C]"
                  }`}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Prev
                </button>
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((page, index) =>
                    page === "..." ? (
                      <span key={`ellipsis-${index}`} className="text-[#5B3625] font-cormorant px-1">…</span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`w-8 h-8 rounded-full font-poppins text-xs transition-all duration-300 ${
                          currentPage === page
                            ? "bg-[#C08B5C] text-[#120A08] font-bold shadow-[0_0_15px_#C08B5C60]"
                            : "border border-[#5B3625] text-[#C08B5C] hover:bg-[#3E1F0D]"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full border font-poppins text-xs transition-all duration-300 ${
                    currentPage === totalPages
                      ? "border-[#2a1810] text-[#2a1810] cursor-not-allowed"
                      : "border-[#5B3625] text-[#C08B5C] hover:bg-[#3E1F0D] hover:border-[#C08B5C]"
                  }`}
                >
                  Next
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* FLOATING CUP — Top Right (Desktop) */}
      <div className="hidden lg:block fixed top-24 right-6 w-72 z-40">
        <div className="bg-[#1a0e09]/95 backdrop-blur-md border border-[#3E1F0D] rounded-2xl p-5 shadow-[0_10px_50px_#00000090]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#F5E6D3] font-cormorant text-lg italic">Your Cup</h3>
            {selectedIngredients.length > 0 && (
              <button
                onClick={clearCup}
                className="text-[#5B3625] hover:text-red-400 font-poppins text-[10px] tracking-wider transition-colors"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Cup Visual */}
          <div className="relative mx-auto w-40 h-44 mb-4">
            <div
              className="absolute inset-x-2 top-0 bottom-4 border-2 border-[#3E1F0D] rounded-b-[1.5rem] overflow-hidden bg-[#0d0705]"
              style={{ clipPath: "polygon(5% 0%, 95% 0%, 88% 100%, 12% 100%)" }}
            >
              {selectedIngredients.length > 0 && (
                <div className="absolute bottom-0 left-0 right-0 flex flex-col-reverse">
                  {selectedIngredients.map((item, index) => (
                    <div
                      key={index}
                      className="w-full transition-all duration-500 ease-out"
                      style={{
                        height: `${Math.max(
                          10,
                          Math.min(36, 140 / selectedIngredients.length)
                        )}px`,
                        backgroundColor:
                          INGREDIENT_COLORS[item.name] || "#5C3310",
                        opacity: 0.9,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="absolute right-[-12px] top-[30%] w-5 h-10 border-2 border-[#3E1F0D] rounded-r-full border-l-0" />
            {selectedIngredients.length > 0 && !selectedIngredients.some((i) => i.name === "Ice") && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-[2px] bg-gradient-to-t from-[#5B3625] to-transparent rounded-full animate-pulse"
                    style={{
                      height: `${14 + i * 4}px`,
                      animationDelay: `${i * 0.3}s`,
                      animationDuration: "2s",
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Empty / Ingredient List */}
          {selectedIngredients.length === 0 ? (
            <div className="text-center py-2">
              <p className="text-[#5B3625] font-cormorant italic text-sm">
                Your cup is empty
              </p>
              <p className="text-[#3E1F0D] font-cormorant italic text-xs mt-1">
                Start by adding a coffee base
              </p>
            </div>
          ) : (
            <div className="space-y-1.5 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3E1F0D] scrollbar-track-transparent pr-1 mb-2">
              {groupedIngredients.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="flex items-center justify-between bg-[#120A08] rounded-lg px-2.5 py-1.5 group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className="w-2.5 h-2.5 rounded-full border border-[#3E1F0D] shrink-0"
                      style={{
                        backgroundColor:
                          INGREDIENT_COLORS[item.name] || "#5C3310",
                      }}
                    />
                    <span className="text-[#C08B5C] font-cormorant text-xs truncate">
                      {item.name}
                    </span>
                    {item.count > 1 && (
                      <span className="text-[#5B3625] font-poppins text-[9px] shrink-0">
                        ×{item.count}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      const idx = selectedIngredients.findIndex(
                        (i) => i.name === item.name
                      );
                      if (idx !== -1) removeFromCup(idx);
                    }}
                    className="text-[#3E1F0D] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all shrink-0 ml-1"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Warning */}
          {selectedIngredients.length > 0 && !hasCoffeeBase && (
            <div
              className={`mt-3 flex items-center gap-2 bg-[#2a1208] border border-[#5B3625] rounded-lg px-2.5 py-1.5 ${
                shakeWarning ? "animate-shake" : ""
              }`}
            >
              <svg
                className="w-3.5 h-3.5 text-[#C08B5C] shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <p className="text-[#C08B5C] font-cormorant italic text-[11px]">
                Add a coffee base
              </p>
            </div>
          )}

          {/* Brew Button */}
          <button
            onClick={handleBrewMyCup}
            disabled={selectedIngredients.length === 0}
            className={`w-full mt-4 py-3 rounded-full font-poppins text-xs font-semibold tracking-wider transition-all duration-500 ${
              selectedIngredients.length === 0
                ? "bg-[#2a1810] text-[#3E1F0D] cursor-not-allowed"
                : hasCoffeeBase
                ? "bg-gradient-to-r from-[#C08B5C] via-[#D4A574] to-[#C08B5C] text-[#120A08] shadow-[0_0_30px_#C08B5C40] hover:shadow-[0_0_50px_#C08B5C60]"
                : "bg-[#3E1F0D] text-[#C08B5C] border border-[#5B3625] hover:bg-[#5B3625]"
            }`}
          >
            {selectedIngredients.length === 0 ? (
              "Add Ingredients"
            ) : hasCoffeeBase ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Brew My Cup
              </span>
            ) : (
              "Add a Coffee Base"
            )}
          </button>
        </div>
      </div>

      {/* MOBILE: Floating Cup Button */}
      {selectedIngredients.length > 0 && (
        <div className="lg:hidden fixed bottom-6 left-4 right-4 z-50">
          <button
            onClick={() => setShowCupModal(true)}
            className="w-full bg-gradient-to-r from-[#1a0e09] to-[#2a1810] border border-[#3E1F0D] rounded-2xl px-5 py-4 flex items-center justify-between shadow-[0_-4px_30px_#00000080]"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-[#3E1F0D] rounded-full flex items-center justify-center">
                  <span className="text-lg">☕</span>
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#C08B5C] rounded-full flex items-center justify-center">
                  <span className="text-[#120A08] font-poppins text-[10px] font-bold">
                    {selectedIngredients.length}
                  </span>
                </div>
              </div>
              <div className="text-left">
                <p className="text-[#F5E6D3] font-poppins text-sm font-semibold">
                  Your Cup
                </p>
                <p className="text-[#5B3625] font-cormorant italic text-xs">
                  {groupedIngredients.length} ingredient
                  {groupedIngredients.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#C08B5C] font-poppins text-xs tracking-wider">
              VIEW
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </div>
          </button>
        </div>
      )}

      {/* MOBILE: Cup Modal */}
      {showCupModal && (
        <div className="lg:hidden fixed inset-0 z-[60] flex items-end">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowCupModal(false)}
          />
          <div className="relative w-full bg-[#1a0e09] border-t border-[#3E1F0D] rounded-t-3xl p-6 pb-10 max-h-[80vh] overflow-y-auto animate-slideUp">
            <div className="w-12 h-1 bg-[#3E1F0D] rounded-full mx-auto mb-6" />
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[#F5E6D3] font-cormorant text-2xl italic">
                Your Cup
              </h3>
              <div className="flex items-center gap-3">
                {selectedIngredients.length > 0 && (
                  <button
                    onClick={clearCup}
                    className="text-[#5B3625] hover:text-red-400 font-poppins text-[10px] tracking-wider transition-colors"
                  >
                    CLEAR ALL
                  </button>
                )}
                <button
                  onClick={() => setShowCupModal(false)}
                  className="text-[#5B3625] hover:text-[#C08B5C] transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              {groupedIngredients.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="flex items-center justify-between bg-[#120A08] rounded-lg px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full border border-[#3E1F0D]"
                      style={{
                        backgroundColor:
                          INGREDIENT_COLORS[item.name] || "#5C3310",
                      }}
                    />
                    <span className="text-[#C08B5C] font-cormorant text-base">
                      {item.name}
                    </span>
                    {item.count > 1 && (
                      <span className="text-[#5B3625] font-poppins text-xs">
                        ×{item.count}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      const idx = selectedIngredients.findIndex(
                        (i) => i.name === item.name
                      );
                      if (idx !== -1) removeFromCup(idx);
                    }}
                    className="text-[#3E1F0D] hover:text-red-400 transition-all"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {!hasCoffeeBase && (
              <div
                className={`mb-4 flex items-center gap-2 bg-[#2a1208] border border-[#5B3625] rounded-lg px-4 py-3 ${
                  shakeWarning ? "animate-shake" : ""
                }`}
              >
                <svg
                  className="w-4 h-4 text-[#C08B5C] shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <p className="text-[#C08B5C] font-cormorant italic text-sm">
                  Add a coffee base to brew your cup
                </p>
              </div>
            )}

            <button
              onClick={handleBrewMyCup}
              className={`w-full py-4 rounded-full font-poppins text-sm font-semibold tracking-wider transition-all duration-500 ${
                hasCoffeeBase
                  ? "bg-gradient-to-r from-[#C08B5C] via-[#D4A574] to-[#C08B5C] text-[#120A08] shadow-[0_0_30px_#C08B5C40]"
                  : "bg-[#3E1F0D] text-[#C08B5C] border border-[#5B3625]"
              }`}
            >
              {hasCoffeeBase ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Brew My Cup
                </span>
              ) : (
                "Add a Coffee Base First"
              )}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.8s ease-in-out;
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #3E1F0D;
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
};

export default MakeCoffee;