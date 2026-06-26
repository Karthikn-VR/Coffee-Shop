const getImageUrl = (imageName) => {
  return `https://spoonacular.com/cdn/ingredients_100x100/${imageName}`;
};

const IngredientCard = ({ ingredient, onAdd, ingredientColor, isInCup }) => {
  return (
    <div
      className={`group relative flex flex-col items-center gap-3 p-5 rounded-2xl border bg-[#1a0e09] transition-all duration-500 ${
        isInCup
          ? "border-[#C08B5C] shadow-[0_0_15px_#C08B5C30]"
          : "border-[#5B3625] hover:scale-105"
      }`}
    >
      {/* Color indicator dot */}
      {ingredientColor && (
        <div
          className="absolute top-3 right-3 w-3 h-3 rounded-full border border-[#5B3625]"
          style={{ backgroundColor: ingredientColor }}
        />
      )}

      {/* In-cup badge */}
      {isInCup && (
        <div className="absolute top-3 left-3">
          <span className="text-[8px] font-poppins tracking-widest uppercase bg-[#C08B5C] text-[#120A08] px-2 py-0.5 rounded-full font-bold">
            In Cup
          </span>
        </div>
      )}

      {/* Image */}
      <div
        className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center shadow-lg border-2"
        style={{
          borderColor: ingredientColor || "#5B3625",
          backgroundColor: "#3E1F0D",
        }}
      >
        <img
          src={getImageUrl(ingredient.image)}
          alt={ingredient.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentElement.innerHTML = `
              <span style="color: ${ingredientColor || "#C08B5C"}; font-size: 1.8rem; font-family: 'Cormorant Garamond', serif; font-weight: bold;">
                ${ingredient.name.charAt(0)}
              </span>`;
          }}
        />
      </div>

      {/* Name */}
      <h3 className="text-[#F5E6D3] font-poppins text-sm font-semibold text-center capitalize tracking-wide leading-tight">
        {ingredient.name}
      </h3>

      {/* Category */}
      <span className="text-[10px] text-[#5B3625] font-poppins tracking-widest uppercase">
        {ingredient.category}
      </span>

      {/* Add Button */}
      <button
        onClick={onAdd}
        className="w-full mt-1 py-2 rounded-full border border-[#5B3625] text-[#C08B5C] font-poppins text-xs tracking-wider hover:bg-[#C08B5C] hover:text-[#120A08] hover:border-[#C08B5C] hover:font-bold transition-all duration-300 active:scale-95"
      >
        + ADD TO CUP
      </button>
    </div>
  );
};

export default IngredientCard;