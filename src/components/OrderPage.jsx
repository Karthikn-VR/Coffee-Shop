// OrderPage.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CUP_SIZES = [
  { id: "small", name: "Small", oz: "8 oz", price: 3.5, icon: "S" },
  { id: "medium", name: "Medium", oz: "12 oz", price: 4.5, icon: "M" },
  { id: "large", name: "Large", oz: "16 oz", price: 5.5, icon: "L" },
  { id: "xl", name: "Extra Large", oz: "20 oz", price: 6.5, icon: "XL" },
];

const EXTRA_TOPPINGS = [
  { id: "whipped-cream", name: "Whipped Cream", price: 0.75 },
  { id: "cocoa-nibs", name: "Cocoa Nibs", price: 0.5 },
  { id: "cinnamon-dust", name: "Cinnamon Dust", price: 0.25 },
  { id: "caramel-drizzle", name: "Caramel Drizzle", price: 0.75 },
  { id: "chocolate-shavings", name: "Chocolate Shavings", price: 0.5 },
  { id: "marshmallows", name: "Marshmallows", price: 0.5 },
];

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedIngredients = [], ingredientColors = {} } =
    location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    instructions: "",
  });
  const [cupSize, setCupSize] = useState("medium");
  const [extraToppings, setExtraToppings] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!selectedIngredients || selectedIngredients.length === 0) {
      navigate("/make-coffee");
    }
  }, [selectedIngredients, navigate]);

  const selectedSize = CUP_SIZES.find((s) => s.id === cupSize);
  const toppingsTotal = extraToppings.reduce((sum, t) => {
    const topping = EXTRA_TOPPINGS.find((et) => et.id === t);
    return sum + (topping?.price || 0);
  }, 0);
  const subtotal = (selectedSize?.price || 0) + toppingsTotal;
  const total = promoApplied ? 0 : subtotal;

  const toggleTopping = (id) => {
    setExtraToppings((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      // Accepts digits, spaces, dashes, parentheses, and optional + prefix. 7-15 digits.
      const digitsOnly = formData.phone.replace(/\D/g, "");
      if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }

    // Email is optional but if provided, must be valid
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toLowerCase() === "coffee") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code. Try again.");
      setPromoApplied(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!promoApplied) {
      setPromoError("Please enter the promo code to complete payment");
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      customer: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || null,
        instructions: formData.instructions,
      },
      order: {
        ingredients: selectedIngredients.map((i) => ({
          id: i.id,
          name: i.name,
          category: i.category,
        })),
        cupSize: cupSize,
        extraToppings: extraToppings,
        subtotal: subtotal,
        promoCode: "Coffee",
        discount: subtotal,
        total: 0,
      },
      timestamp: new Date().toISOString(),
    };

    try {
      // Replace with your actual endpoint
      await fetch("http://localhost:8000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });
    } catch (error) {
      console.log("Order payload ready:", orderPayload);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setOrderPlaced(true);
    }, 2000);
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

  // Order Success Screen
  if (orderPlaced) {
    return (
      <section className="min-h-screen bg-[#120A08] flex items-center justify-center px-6">
        <div className="text-center max-w-md animate-fadeIn">
          <div className="relative mx-auto w-24 h-24 mb-8">
            <div className="absolute inset-0 bg-[#C08B5C] rounded-full opacity-20 animate-ping" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-[#C08B5C] to-[#8B6914] rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-[#120A08]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-[#F5E6D3] font-cormorant text-4xl italic mb-3">
            Order Placed!
          </h1>
          <p className="text-[#C08B5C] font-cormorant text-xl mb-2">
            Your coffee is being crafted with love
          </p>
          <p className="text-[#5B3625] font-cormorant italic text-sm mb-8">
            {formData.email
              ? `A confirmation has been sent to ${formData.email}`
              : `We'll text you at ${formData.phone} when your order is ready`}
          </p>

          <div className="bg-[#1a0e09] border border-[#3E1F0D] rounded-2xl p-6 mb-8">
            <p className="text-[#5B3625] font-poppins text-[10px] tracking-[0.3em] mb-4">
              ORDER SUMMARY
            </p>
            <div className="space-y-2">
              {groupedIngredients.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor:
                        ingredientColors[item.name] || "#5C3310",
                    }}
                  />
                  <span className="text-[#C08B5C] font-cormorant text-sm">
                    {item.name}
                    {item.count > 1 ? ` ×${item.count}` : ""}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full h-[1px] bg-[#3E1F0D] my-4" />
            <div className="flex justify-between">
              <span className="text-[#5B3625] font-cormorant text-sm">
                {selectedSize?.name} ({selectedSize?.oz})
              </span>
              <span className="text-[#C08B5C] font-poppins text-sm font-bold">
                FREE
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate("/make-coffee")}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#C08B5C] via-[#D4A574] to-[#C08B5C] text-[#120A08] font-poppins text-sm font-semibold tracking-wider shadow-[0_0_30px_#C08B5C40] hover:shadow-[0_0_50px_#C08B5C60] transition-all duration-500"
          >
            Make Another Cup
          </button>
        </div>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out;
          }
        `}</style>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#120A08] px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-[#5B3625] hover:text-[#C08B5C] font-cormorant italic text-sm mb-6 transition-colors"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to ingredients
        </button>
        <p className="text-[#C08B5C] font-cormorant italic tracking-[0.3em] text-lg mb-2">
          — almost there —
        </p>
        <h1 className="text-[#F5E6D3] font-poppins text-4xl md:text-5xl font-bold tracking-tight">
          Complete Your Order
        </h1>
        <div className="w-24 h-[1px] bg-[#C08B5C] mx-auto mt-6 opacity-60" />
      </div>

      {/* Progress Steps */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="flex items-center justify-center gap-4">
          {[
            { num: 1, label: "Details" },
            { num: 2, label: "Customize" },
            { num: 3, label: "Payment" },
          ].map((s, index) => (
            <div key={s.num} className="flex items-center gap-4">
              <button
                onClick={() => {
                  if (s.num < step) setStep(s.num);
                }}
                className={`flex items-center gap-2 transition-all duration-300 ${
                  s.num < step
                    ? "cursor-pointer"
                    : s.num === step
                    ? ""
                    : "cursor-default"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-poppins text-xs font-bold transition-all duration-300 ${
                    step >= s.num
                      ? "bg-[#C08B5C] text-[#120A08] shadow-[0_0_15px_#C08B5C50]"
                      : "border border-[#3E1F0D] text-[#3E1F0D]"
                  }`}
                >
                  {step > s.num ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    s.num
                  )}
                </div>
                <span
                  className={`font-cormorant text-sm hidden sm:inline ${
                    step >= s.num
                      ? "text-[#C08B5C] italic"
                      : "text-[#3E1F0D]"
                  }`}
                >
                  {s.label}
                </span>
              </button>
              {index < 2 && (
                <div
                  className={`w-12 h-[1px] transition-all duration-300 ${
                    step > s.num ? "bg-[#C08B5C]" : "bg-[#3E1F0D]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left: Form */}
        <div className="flex-1">
          {/* Step 1: Details */}
          {step === 1 && (
            <div className="bg-[#1a0e09] border border-[#3E1F0D] rounded-2xl p-8 animate-fadeIn">
              <h2 className="text-[#F5E6D3] font-cormorant text-2xl italic mb-6">
                Your Details
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-[#C08B5C] font-poppins text-[10px] tracking-[0.2em] mb-2">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="What should we call you?"
                    className={`w-full bg-[#120A08] border ${
                      errors.name ? "border-red-400" : "border-[#3E1F0D]"
                    } rounded-xl py-3.5 px-5 text-[#F5E6D3] font-cormorant text-lg placeholder-[#3E1F0D] focus:outline-none focus:border-[#C08B5C] focus:shadow-[0_0_20px_#C08B5C10] transition-all duration-300`}
                  />
                  {errors.name && (
                    <p className="text-red-400 font-cormorant text-xs mt-1 italic">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#C08B5C] font-poppins text-[10px] tracking-[0.2em] mb-2">
                    PHONE NUMBER *
                  </label>
                  <div className="relative">
                    <svg
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B3625]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+91-1234567890"
                      className={`w-full bg-[#120A08] border ${
                        errors.phone ? "border-red-400" : "border-[#3E1F0D]"
                      } rounded-xl py-3.5 pl-12 pr-5 text-[#F5E6D3] font-cormorant text-lg placeholder-[#3E1F0D] focus:outline-none focus:border-[#C08B5C] focus:shadow-[0_0_20px_#C08B5C10] transition-all duration-300`}
                    />
                  </div>
                  {errors.phone ? (
                    <p className="text-red-400 font-cormorant text-xs mt-1 italic">
                      {errors.phone}
                    </p>
                  ) : (
                    <p className="text-[#5B3625] font-cormorant italic text-xs mt-1">
                      We&apos;ll text you when your order is ready
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#C08B5C] font-poppins text-[10px] tracking-[0.2em] mb-2">
                    EMAIL ADDRESS
                    <span className="ml-2 text-[#5B3625] font-cormorant italic text-[11px] normal-case tracking-normal">
                      (optional)
                    </span>
                  </label>
                  <div className="relative">
                    <svg
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B3625]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="your@email.com"
                      className={`w-full bg-[#120A08] border ${
                        errors.email ? "border-red-400" : "border-[#3E1F0D]"
                      } rounded-xl py-3.5 pl-12 pr-5 text-[#F5E6D3] font-cormorant text-lg placeholder-[#3E1F0D] focus:outline-none focus:border-[#C08B5C] focus:shadow-[0_0_20px_#C08B5C10] transition-all duration-300`}
                    />
                  </div>
                  {errors.email ? (
                    <p className="text-red-400 font-cormorant text-xs mt-1 italic">
                      {errors.email}
                    </p>
                  ) : (
                    <p className="text-[#5B3625] font-cormorant italic text-xs mt-1">
                      Add your email for a digital receipt
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#C08B5C] font-poppins text-[10px] tracking-[0.2em] mb-2">
                    SPECIAL INSTRUCTIONS
                  </label>
                  <textarea
                    value={formData.instructions}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        instructions: e.target.value,
                      })
                    }
                    placeholder="Extra hot, no foam, light ice..."
                    rows={3}
                    className="w-full bg-[#120A08] border border-[#3E1F0D] rounded-xl py-3.5 px-5 text-[#F5E6D3] font-cormorant text-lg placeholder-[#3E1F0D] focus:outline-none focus:border-[#C08B5C] focus:shadow-[0_0_20px_#C08B5C10] transition-all duration-300 resize-none"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  if (validateStep1()) setStep(2);
                }}
                className="w-full mt-8 py-3.5 rounded-full bg-gradient-to-r from-[#C08B5C] via-[#D4A574] to-[#C08B5C] text-[#120A08] font-poppins text-sm font-semibold tracking-wider shadow-[0_0_30px_#C08B5C40] hover:shadow-[0_0_50px_#C08B5C60] transition-all duration-500"
              >
                Continue to Customize
              </button>
            </div>
          )}

          {/* Step 2: Cup Size & Toppings */}
          {step === 2 && (
            <div className="space-y-8 animate-fadeIn">
              {/* Cup Size */}
              <div className="bg-[#1a0e09] border border-[#3E1F0D] rounded-2xl p-8">
                <h2 className="text-[#F5E6D3] font-cormorant text-2xl italic mb-2">
                  Choose Your Cup
                </h2>
                <p className="text-[#5B3625] font-cormorant italic text-sm mb-6">
                  Select the perfect size for your brew
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {CUP_SIZES.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setCupSize(size.id)}
                      className={`relative p-4 rounded-xl border transition-all duration-300 text-center group ${
                        cupSize === size.id
                          ? "border-[#C08B5C] bg-[#2a1810] shadow-[0_0_20px_#C08B5C20]"
                          : "border-[#3E1F0D] bg-[#120A08] hover:border-[#5B3625]"
                      }`}
                    >
                      <div
                        className={`mx-auto mb-3 font-poppins font-bold transition-all ${
                          cupSize === size.id
                            ? "text-[#C08B5C] text-3xl"
                            : "text-[#3E1F0D] text-2xl group-hover:text-[#5B3625]"
                        }`}
                      >
                        {size.icon}
                      </div>
                      <p
                        className={`font-cormorant text-sm ${
                          cupSize === size.id
                            ? "text-[#F5E6D3]"
                            : "text-[#5B3625]"
                        }`}
                      >
                        {size.name}
                      </p>
                      <p
                        className={`font-cormorant italic text-xs ${
                          cupSize === size.id
                            ? "text-[#C08B5C]"
                            : "text-[#3E1F0D]"
                        }`}
                      >
                        {size.oz}
                      </p>
                      <p
                        className={`font-poppins text-xs font-bold mt-2 ${
                          cupSize === size.id
                            ? "text-[#C08B5C]"
                            : "text-[#5B3625]"
                        }`}
                      >
                        ${size.price.toFixed(2)}
                      </p>
                      {cupSize === size.id && (
                        <div className="absolute top-2 right-2">
                          <div className="w-5 h-5 bg-[#C08B5C] rounded-full flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-[#120A08]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Toppings */}
              <div className="bg-[#1a0e09] border border-[#3E1F0D] rounded-2xl p-8">
                <h2 className="text-[#F5E6D3] font-cormorant text-2xl italic mb-2">
                  Extra Toppings
                </h2>
                <p className="text-[#5B3625] font-cormorant italic text-sm mb-6">
                  Add the finishing touches — optional
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {EXTRA_TOPPINGS.map((topping) => {
                    const isSelected = extraToppings.includes(topping.id);
                    return (
                      <button
                        key={topping.id}
                        onClick={() => toggleTopping(topping.id)}
                        className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                          isSelected
                            ? "border-[#C08B5C] bg-[#2a1810]"
                            : "border-[#3E1F0D] bg-[#120A08] hover:border-[#5B3625]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                              isSelected
                                ? "border-[#C08B5C] bg-[#C08B5C]"
                                : "border-[#3E1F0D]"
                            }`}
                          >
                            {isSelected && (
                              <svg
                                className="w-3 h-3 text-[#120A08]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                          <span
                            className={`font-cormorant text-sm ${
                              isSelected
                                ? "text-[#F5E6D3]"
                                : "text-[#5B3625]"
                            }`}
                          >
                            {topping.name}
                          </span>
                        </div>
                        <span
                          className={`font-poppins text-xs ${
                            isSelected
                              ? "text-[#C08B5C]"
                              : "text-[#3E1F0D]"
                          }`}
                        >
                          +${topping.price.toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3.5 rounded-full border border-[#3E1F0D] text-[#C08B5C] font-poppins text-sm tracking-wider hover:bg-[#3E1F0D] transition-all duration-300"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-[#C08B5C] via-[#D4A574] to-[#C08B5C] text-[#120A08] font-poppins text-sm font-semibold tracking-wider shadow-[0_0_30px_#C08B5C40] hover:shadow-[0_0_50px_#C08B5C60] transition-all duration-500"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="bg-[#1a0e09] border border-[#3E1F0D] rounded-2xl p-8 animate-fadeIn">
              <h2 className="text-[#F5E6D3] font-cormorant text-2xl italic mb-2">
                Payment
              </h2>
              <p className="text-[#5B3625] font-cormorant italic text-sm mb-8">
                Use your promo code to complete the transaction
              </p>

              {/* Promo Code */}
              <div className="mb-8">
                <label className="block text-[#C08B5C] font-poppins text-[10px] tracking-[0.2em] mb-2">
                  PROMO CODE
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      setPromoError("");
                    }}
                    placeholder="Enter promo code"
                    disabled={promoApplied}
                    className={`flex-1 bg-[#120A08] border ${
                      promoApplied
                        ? "border-green-600/50 text-green-400"
                        : promoError
                        ? "border-red-400"
                        : "border-[#3E1F0D]"
                    } rounded-xl py-3.5 px-5 text-[#F5E6D3] font-cormorant text-lg placeholder-[#3E1F0D] focus:outline-none focus:border-[#C08B5C] transition-all duration-300 ${
                      promoApplied ? "opacity-60" : ""
                    }`}
                  />
                  <button
                    onClick={handleApplyPromo}
                    disabled={promoApplied || !promoCode.trim()}
                    className={`px-6 py-3.5 rounded-xl font-poppins text-xs font-semibold tracking-wider transition-all duration-300 ${
                      promoApplied
                        ? "bg-green-900/30 text-green-400 border border-green-600/30 cursor-default"
                        : !promoCode.trim()
                        ? "bg-[#2a1810] text-[#3E1F0D] cursor-not-allowed"
                        : "bg-[#C08B5C] text-[#120A08] hover:bg-[#a97545]"
                    }`}
                  >
                    {promoApplied ? (
                      <span className="flex items-center gap-1">
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
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Applied
                      </span>
                    ) : (
                      "Apply"
                    )}
                  </button>
                </div>
                {promoError && (
                  <p className="text-red-400 font-cormorant text-xs mt-2 italic">
                    {promoError}
                  </p>
                )}
                {promoApplied && (
                  <div className="mt-3 flex items-center gap-2 bg-green-900/20 border border-green-600/20 rounded-lg px-4 py-2.5">
                    <svg
                      className="w-4 h-4 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-green-400 font-cormorant italic text-sm">
                      Code &quot;Coffee&quot; applied — 100% discount!
                    </p>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="bg-[#120A08] rounded-xl p-5 mb-8 border border-[#3E1F0D]">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#5B3625] font-cormorant text-sm">
                      {selectedSize?.name} Cup ({selectedSize?.oz})
                    </span>
                    <span className="text-[#C08B5C] font-poppins text-sm">
                      ${selectedSize?.price.toFixed(2)}
                    </span>
                  </div>
                  {extraToppings.map((t) => {
                    const topping = EXTRA_TOPPINGS.find((et) => et.id === t);
                    return (
                      <div key={t} className="flex justify-between">
                        <span className="text-[#5B3625] font-cormorant text-sm">
                          {topping?.name}
                        </span>
                        <span className="text-[#C08B5C] font-poppins text-sm">
                          +${topping?.price.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                  <div className="w-full h-[1px] bg-[#3E1F0D]" />
                  <div className="flex justify-between">
                    <span className="text-[#5B3625] font-cormorant text-sm">
                      Subtotal
                    </span>
                    <span className="text-[#C08B5C] font-poppins text-sm">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between">
                      <span className="text-green-400 font-cormorant text-sm italic">
                        Promo: Coffee
                      </span>
                      <span className="text-green-400 font-poppins text-sm">
                        -${subtotal.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="w-full h-[1px] bg-[#3E1F0D]" />
                  <div className="flex justify-between items-center">
                    <span className="text-[#F5E6D3] font-poppins text-sm font-bold tracking-wider">
                      TOTAL
                    </span>
                    <span className="text-[#F5E6D3] font-poppins text-xl font-bold">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3.5 rounded-full border border-[#3E1F0D] text-[#C08B5C] font-poppins text-sm tracking-wider hover:bg-[#3E1F0D] transition-all duration-300"
                >
                  Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className={`flex-1 py-3.5 rounded-full font-poppins text-sm font-semibold tracking-wider transition-all duration-500 relative overflow-hidden ${
                    isSubmitting
                      ? "bg-[#3E1F0D] text-[#C08B5C] cursor-wait"
                      : promoApplied
                      ? "bg-gradient-to-r from-[#C08B5C] via-[#D4A574] to-[#C08B5C] text-[#120A08] shadow-[0_0_30px_#C08B5C40] hover:shadow-[0_0_50px_#C08B5C60]"
                      : "bg-[#2a1810] text-[#3E1F0D] cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="w-4 h-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Brewing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      ☕ Place Order
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Order Summary */}
        <div className="lg:w-80 shrink-0">
          <div className="sticky top-8">
            <div className="bg-[#1a0e09] border border-[#3E1F0D] rounded-2xl p-6 shadow-[0_0_40px_#00000080]">
              <h3 className="text-[#F5E6D3] font-cormorant text-xl italic mb-4">
                Your Cup
              </h3>

              {/* Mini Cup */}
              <div className="relative mx-auto w-32 h-36 mb-6">
                <div
                  className="absolute inset-x-2 top-0 bottom-4 border-2 border-[#3E1F0D] rounded-b-[1.5rem] overflow-hidden bg-[#0d0705]"
                  style={{
                    clipPath:
                      "polygon(5% 0%, 95% 0%, 88% 100%, 12% 100%)",
                  }}
                >
                  {selectedIngredients.length > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 flex flex-col-reverse">
                      {selectedIngredients.map((item, index) => (
                        <div
                          key={index}
                          className="w-full transition-all duration-500"
                          style={{
                            height: `${Math.max(
                              8,
                              Math.min(
                                30,
                                120 / selectedIngredients.length
                              )
                            )}px`,
                            backgroundColor:
                              ingredientColors[item.name] || "#5C3310",
                            opacity: 0.9,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="absolute right-[-10px] top-[30%] w-5 h-9 border-2 border-[#3E1F0D] rounded-r-full border-l-0" />
              </div>

              {/* Ingredients */}
              <div className="space-y-1.5 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3E1F0D] scrollbar-track-transparent pr-1 mb-4">
                {groupedIngredients.map((item, index) => (
                  <div
                    key={`${item.name}-${index}`}
                    className="flex items-center gap-2 px-2 py-1"
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        backgroundColor:
                          ingredientColors[item.name] || "#5C3310",
                      }}
                    />
                    <span className="text-[#C08B5C] font-cormorant text-xs">
                      {item.name}
                      {item.count > 1 ? ` ×${item.count}` : ""}
                    </span>
                  </div>
                ))}
              </div>

              <div className="w-full h-[1px] bg-[#3E1F0D] my-3" />

              {/* Size */}
              <div className="flex justify-between px-2 mb-1">
                <span className="text-[#5B3625] font-cormorant text-xs">
                  Size
                </span>
                <span className="text-[#C08B5C] font-cormorant text-xs">
                  {selectedSize?.name} ({selectedSize?.oz})
                </span>
              </div>

              {/* Toppings */}
              {extraToppings.length > 0 && (
                <div className="px-2 mb-1">
                  <span className="text-[#5B3625] font-cormorant text-xs">
                    Toppings:{" "}
                  </span>
                  <span className="text-[#C08B5C] font-cormorant text-xs">
                    {extraToppings
                      .map(
                        (t) =>
                          EXTRA_TOPPINGS.find((et) => et.id === t)?.name
                      )
                      .join(", ")}
                  </span>
                </div>
              )}

              {/* Instructions */}
              {formData.instructions && (
                <div className="px-2 mt-2">
                  <span className="text-[#5B3625] font-cormorant text-xs italic">
                    Note: {formData.instructions}
                  </span>
                </div>
              )}

              <div className="w-full h-[1px] bg-[#3E1F0D] my-3" />

              <div className="flex justify-between px-2">
                <span className="text-[#F5E6D3] font-poppins text-xs font-bold tracking-wider">
                  TOTAL
                </span>
                <span
                  className={`font-poppins text-lg font-bold ${
                    promoApplied ? "text-green-400" : "text-[#F5E6D3]"
                  }`}
                >
                  ${total.toFixed(2)}
                </span>
              </div>
              {promoApplied && (
                <p className="text-green-400 font-cormorant italic text-[10px] text-right px-2 mt-1">
                  Promo applied ✓
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
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

export default OrderPage;