import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";
import { FaShare, FaBookmark, FaRegBookmark } from "react-icons/fa";
import "./style/RecipesDetail.css";

const staticRecipes = [
  { 
    id: 1, 
    name: "Pongal", 
    image: "/images/pongal.avif", 
    ingredients: [
    "Raw rice – 1 cup",
    "Yellow moong dal (split yellow gram) – 1/2 cup",
    "Water – 3.5 cups",
    "Salt – to taste",
    "Ghee – 1 tablespoon",
    "Whole black pepper – 1/2 teaspoon",
    "Cumin seeds – 1/2 teaspoon",
    "Fresh ginger – 1-inch piece, chopped",
    "Green chilies – 2, slit",
    "Cashew nuts – 10–12",
    "Asafoetida (hing) – a pinch",
    "Curry leaves – a few"
  ],
  steps: [
    "Rinse the rice and moong dal thoroughly.",
    "In a pressure cooker, add the rinsed rice and moong dal along with water, salt, cumin seeds, chopped ginger, and asafoetida.",
    "Pressure cook for 3–4 whistles or until the mixture is soft and mushy.",
    "In a separate pan, heat ghee over medium heat.",
    "Add the whole black pepper, slit green chilies, cashew nuts, and curry leaves to the ghee.",
    "Sauté until the cashews turn golden brown and the spices release their aroma.",
    "Pour this tempering over the cooked rice and dal mixture.",
    "Mix gently to combine all ingredients.",
    "Serve hot with coconut chutney and sambar."
  ],
    // videoUrl: "https://www.youtube.com/embed/WR5JJP5MyN4"
  },
  { 
    id: 2, 
    name: "Chole Bhature", 
    image: "/images/chole.avif", 
    ingredients: [
    // Chole Ingredients
    "Chickpeas (chana), soaked overnight - 1 cup",
    "Tea bags - 2",
    "Baking soda - ¼ tsp",
    "Salt - 1 tsp + to taste",
    "Water - 3 cups",
    "Oil - 2 tbsp",
    "Bay leaf - 1",
    "Black cardamom - 1",
    "Green cardamom pods - 2",
    "Cinnamon stick - 1-inch piece",
    "Cumin seeds - 1 tsp",
    "Kasuri methi (dried fenugreek leaves) - ½ tsp",
    "Onion, finely chopped - 1 medium",
    "Ginger-garlic paste - 1 tsp",
    "Turmeric powder - ¼ tsp + ¼ tsp for tempering",
    "Red chili powder - 1 tsp + ¼ tsp for tempering",
    "Coriander powder - 1 tsp",
    "Cumin powder - ½ tsp",
    "Garam masala - ½ tsp + ¼ tsp for tempering",
    "Amchur (dry mango powder) - 1 tsp",
    "Tomato puree - 1½ cups",
    "Fresh coriander leaves, chopped - 2 tbsp",
    "Ghee (clarified butter) - 1 tbsp",
    "Green chilies, slit - 2",

    // Bhature Ingredients
    "All-purpose flour (maida) - 2 cups",
    "Semolina (rava) - 2 tbsp",
    "Sugar - 1 tsp",
    "Baking soda - ¼ tsp",
    "Salt - ½ tsp",
    "Oil - 2 tbsp (for dough) + for deep frying",
    "Yogurt (curd) - ¼ cup",
    "Water - as needed to make dough"
  ],
  steps: [
    // Chole Steps
    "Soak chickpeas overnight.",
    "Cook soaked chickpeas with 2 tea bags, ¼ tsp baking soda, 1 tsp salt, and 3 cups water until tender. Remove tea bags and set aside.",
    "Heat 2 tbsp oil in a pan and add bay leaf, black cardamom, green cardamom pods, cinnamon stick, cumin seeds, and kasuri methi. Sauté until aromatic.",
    "Add chopped onion and sauté until golden brown. Add 1 tsp ginger-garlic paste and sauté for a minute.",
    "Add spices: ¼ tsp turmeric, 1 tsp red chili, 1 tsp coriander, ½ tsp cumin, ½ tsp garam masala, 1 tsp amchur, and salt to taste. Cook 2 minutes.",
    "Add 1½ cups tomato puree and cook until oil separates. Add cooked chickpeas and simmer 10 minutes. Adjust consistency with water if needed.",
    "Prepare tempering: heat 1 tbsp ghee, add 2 slit green chilies, ¼ tsp turmeric, ¼ tsp red chili, ¼ tsp garam masala. Pour over chole. Garnish with 2 tbsp chopped coriander leaves.",

    // Bhature Steps
    "In a bowl, mix 2 cups all-purpose flour, 2 tbsp semolina, 1 tsp sugar, ¼ tsp baking soda, ½ tsp salt.",
    "Add 2 tbsp oil and ¼ cup yogurt, mix well. Gradually add water to form soft, smooth dough.",
    "Cover and rest dough for 2 hours. Knead again, divide into small balls.",
    "Roll each ball into a thick disc, applying oil to prevent sticking.",
    "Heat oil in a deep frying pan. Fry each disc until golden brown and puffed. Drain excess oil on paper towels.",
    "Serve hot bhature with prepared chole."
  ],
    // videoUrl: "https://www.youtube.com/embed/MuhLcrPq9bo"
  },
  { 
    id: 3, 
    name: "Biryani", 
    image: "/images/biryani.webp", 
    ingredients: [
    // Chicken Marinade
    "Chicken, cut into pieces - 1 kg",
    "Yogurt - ½ cup",
    "Ginger-garlic paste - 2 tbsp",
    "Lemon juice - 2 tbsp",
    "Turmeric powder - ½ tsp",
    "Red chili powder - 1½ tsp",
    "Coriander powder - 1 tsp",
    "Garam masala - 1 tsp",
    "Salt - to taste",
    "Mint leaves, chopped - 2 tbsp",
    "Coriander leaves, chopped - 2 tbsp",

    // Rice
    "Basmati rice - 2 cups",
    "Water - 4 cups",
    "Bay leaves - 2",
    "Green cardamoms - 4",
    "Cloves - 4",
    "Cinnamon stick - 2-inch piece",
    "Star anise - 1",
    "Mace - 2 strands",
    "Shahi jeera (caraway seeds) - ½ tsp",
    "Salt - to taste",

    // Biryani
    "Onions, thinly sliced - 2 large",
    "Ghee - 3 tbsp",
    "Coconut oil - 2 tbsp",
    "Tomatoes, chopped - 2 medium",
    "Green chilies, slit - 3",
    "Ginger-garlic paste - 1 tbsp",
    "Mint leaves, chopped - 2 tbsp",
    "Coriander leaves, chopped - 2 tbsp",
    "Rose water or kewra water - 1 tsp (optional)",
    "Fried onions (birista) - ½ cup",
    "Cashews, fried - 10",
    "Raisins, fried - 10",
    "Saffron strands soaked in 2 tbsp warm milk - a pinch",
    "Lemon juice - 1 tbsp"
  ],

  steps: [
    // Marinate Chicken
    "Combine chicken pieces with yogurt, ginger-garlic paste, lemon juice, turmeric powder, red chili powder, coriander powder, garam masala, salt, mint, and coriander leaves.",
    "Mix well and refrigerate for at least 2 hours, preferably overnight.",

    // Prepare Rice
    "Wash basmati rice until water runs clear and soak for 30 minutes. Drain.",
    "Boil 4 cups of water with bay leaves, cardamoms, cloves, cinnamon, star anise, mace, shahi jeera, and salt.",
    "Add soaked rice and cook until 70-80% done. Drain and set aside.",

    // Cook Chicken
    "Heat ghee and coconut oil in a heavy-bottomed pan. Sauté sliced onions until golden brown. Remove half for garnishing.",
    "Add chopped tomatoes and green chilies. Cook until tomatoes soften.",
    "Add ginger-garlic paste and sauté for a minute.",
    "Add marinated chicken with marinade and cook until chicken is tender and oil separates.",

    // Layer the Biryani
    "In a large pot, layer half of the cooked chicken.",
    "Spread half of the cooked rice over chicken.",
    "Sprinkle half of the mint, coriander leaves, fried onions, cashews, raisins, saffron milk, and lemon juice.",
    "Repeat with remaining chicken, rice, and garnishes.",

    // Cook Biryani (Dum)
    "Seal the pot with dough or a tight-fitting lid to trap steam.",
    "Place on a tava over low heat and cook for 20-25 minutes, or bake in a preheated oven at 180°C (350°F) for 20-25 minutes.",

    // Serve
    "Gently fluff the biryani before serving.",
    "Serve hot with raita, pickle, and papadam."
  ],
    // videoUrl: "https://www.youtube.com/embed/Mve7xXFwrgY"
  },
  { 
    id: 4, 
    name: "Dosa Chutney", 
    image: "/images/dosa.webp", 
    ingredients: [
        "Fresh grated coconut – 1/2 cup",
        "Roasted gram (chutney dal) – 1 tablespoon",
        "Green chilies – 2 to 3 (adjust to taste)",
        "Ginger – 1/2 inch piece",
        "Salt – to taste",
        "Water – as needed for blending",
        "Oil – 1 teaspoon",
        "Mustard seeds – 1/2 teaspoon",
        "Urad dal – 1/2 teaspoon",
        "Dried red chili – 1 (broken)",
        "Curry leaves – a few",
        "Asafoetida (hing) – a pinch"
      ],
      steps: [
        "Grind grated coconut, roasted gram, green chilies, ginger, and salt with water to a smooth thick chutney.",
        "In a small pan, heat oil and add mustard seeds and urad dal.",
        "Once mustard seeds splutter and dal turns golden, add broken dried red chili, curry leaves, and a pinch of asafoetida. Sauté until aromatic.",
        "Pour the tempering over the ground chutney and mix well.",
        "Serve fresh with idli, dosa, vada, or any South Indian breakfast dish."
      ],

    // videoUrl: "https://www.youtube.com/embed/DCOJMl9Sp2w"
  },
  { 
    id: 5, 
    name: "Paneer Butter Masala", 
    image: "/images/paneer.png", 
    ingredients: [
    "Paneer (cubed) – 250 grams",
    "Onion (finely chopped) – 1 large",
    "Tomatoes (pureed) – 2 medium",
    "Cashew nuts – 10–12",
    "Ginger-garlic paste – 1 tablespoon",
    "Green chili – 1 (optional)",
    "Butter – 2 tablespoons",
    "Oil – 1 tablespoon",
    "Cumin seeds – 1/2 teaspoon",
    "Bay leaf – 1",
    "Cinnamon stick – 1-inch piece",
    "Cloves – 2",
    "Cardamom pods – 2",
    "Red chili powder – 1 teaspoon",
    "Coriander powder – 1 teaspoon",
    "Garam masala – 1/2 teaspoon",
    "Kasuri methi (dried fenugreek leaves) – 1 teaspoon",
    "Fresh cream – 2 tablespoons",
    "Salt – to taste",
    "Sugar – 1 teaspoon",
    "Water – as needed"
  ],
  steps: [
    "Heat oil and 1 tablespoon butter in a pan. Add cumin seeds, bay leaf, cinnamon, cloves, and cardamom. Sauté until aromatic.",
    "Add chopped onions and sauté until golden brown.",
    "Add ginger-garlic paste and green chili. Sauté for a minute.",
    "Add pureed tomatoes and cook until the oil separates from the masala.",
    "Add red chili powder, coriander powder, and salt. Cook for 2 minutes.",
    "Add cashew nuts and water. Cook for 5 minutes.",
    "Let the mixture cool slightly, then blend to a smooth paste.",
    "Return the paste to the pan. Add sugar, garam masala, and kasuri methi. Cook for 5 minutes.",
    "Add paneer cubes and cook for 5 minutes.",
    "Add fresh cream and the remaining butter. Stir well.",
    "Simmer for 5 minutes and serve hot with naan or rice."
  ],
    // videoUrl: "https://www.youtube.com/embed/sVNQIbuv_Mc"
  },
  { 
    id: 6, 
    name: "Idli Sambar", 
    image: "/images/idli.jpg", 
     ingredients: [
    "Toor dal (pigeon pea lentils) – 1/2 cup",
    "Tamarind pulp – 1 tablespoon",
    "Sambar powder – 1 tablespoon",
    "Turmeric powder – 1/4 teaspoon",
    "Salt – to taste",
    "Water – as needed",
    "Oil – 1 tablespoon",
    "Mustard seeds – 1/2 teaspoon",
    "Cumin seeds – 1/2 teaspoon",
    "Dry red chilies – 2",
    "Curry leaves – a few",
    "Asafoetida (hing) – a pinch",
    "Vegetables (carrot, potato, drumstick, etc.) – 1 cup, chopped",
    "Onion – 1, chopped",
    "Tomato – 1, chopped",
    "Green chilies – 2, slit",
    "Coriander leaves – for garnish"
  ],
  steps: [
    "Pressure cook toor dal with turmeric powder and water until soft.",
    "In a separate pan, heat oil and sauté onions until translucent.",
    "Add chopped tomatoes and cook until soft.",
    "Add chopped vegetables and sauté for a few minutes.",
    "Add tamarind pulp, sambar powder, and salt. Cook for a few minutes.",
    "Add the cooked dal to the pan along with water to achieve desired consistency.",
    "Bring to a boil and simmer for 10–15 minutes.",
    "In a small pan, heat oil and add mustard seeds, cumin seeds, dry red chilies, curry leaves, and asafoetida.",
    "Pour this tempering over the sambar.",
    "Garnish with chopped coriander leaves and serve hot with idli or dosa."
  ],
    // videoUrl: "https://www.youtube.com/embed/k1c4h0Caq9k"
  }
];

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pageRef = useRef();
  const [recipe, setRecipe] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [translatedRecipe, setTranslatedRecipe] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const languages = {
    en: "English",
    hi: "Hindi",
    ta: "Tamil",
    te: "Telugu",
    kn: "Kannada",
    ml: "Malayalam",
    gu: "Gujarati",
    mr: "Marathi",
    pa: "Punjabi",
    bn: "Bengali",
    or: "Odia",
    as: "Assamese",
  };

  // Language code mapping for translation API
  const languageCodeMap = {
    en: "en",
    hi: "hi",
    ta: "ta",
    te: "te",
    kn: "kn",
    ml: "ml",
    gu: "gu",
    mr: "mr",
    pa: "pa",
    bn: "bn",
    or: "or",
    as: "as",
  };

  useEffect(() => {
    const dynamicRecipes = JSON.parse(localStorage.getItem("dynamicRecipes")) || [];
    const allRecipes = [...staticRecipes, ...dynamicRecipes];
    const found = allRecipes.find((r) => r.id === parseInt(id));
    setRecipe(found);
    
    // Check if recipe is saved
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setIsSaved(savedRecipes.some(r => r.id === parseInt(id)));
  }, [id]);

  if (!recipe) return <h2>Recipe not found!</h2>;

  const translateText = async (text, targetLang) => {
    if (targetLang === "en" || !text) {
      return text;
    }
    try {
      const apiLangCode = languageCodeMap[targetLang] || targetLang;
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${apiLangCode}`;
      
      console.log(`Translating to ${targetLang}:`, text);
      const response = await axios.get(url);
      
      if (response.data.responseStatus === 200) {
        const translatedText = response.data.responseData.translatedText;
        console.log(`Translation successful:`, translatedText);
        return translatedText;
      } else {
        console.warn(`Translation API returned status ${response.data.responseStatus}:`, response.data);
        return text;
      }
    } catch (error) {
      console.error("Translation error:", error);
      return text;
    }
  };

  const handleTranslate = async (lang) => {
    if (lang === "en") {
      setTranslatedRecipe(null);
      setSelectedLanguage("en");
      return;
    }

    setIsTranslating(true);
    setSelectedLanguage(lang);

    try {
      console.log(`Starting translation to ${languages[lang]}...`);
      
      // Translate recipe name
      const translatedName = await translateText(recipe.name, lang);
      
      // Translate ingredients
      const translatedIngredients = await Promise.all(
        (recipe.ingredients || []).map((ing) => translateText(ing, lang))
      );

      // Translate steps
      const translatedSteps = await Promise.all(
        (recipe.steps || recipe.instructions || []).map((step) =>
          translateText(step, lang)
        )
      );

      console.log("Translation completed successfully");
      
      setTranslatedRecipe({
        ...recipe,
        name: translatedName,
        ingredients: translatedIngredients,
        steps: translatedSteps,
      });
    } catch (error) {
      console.error("Translation failed:", error);
      alert("Translation failed. Please try again.");
      setSelectedLanguage("en");
    } finally {
      setIsTranslating(false);
    }
  };

  const sharePage = async () => {
    if (pageRef.current) {
      const canvas = await html2canvas(pageRef.current);
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], `${recipe.name}.png`, { type: "image/png" });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          navigator.share({
            files: [file],
            title: recipe.name,
            text: `Check out this recipe: ${recipe.name}`,
          });
        } else {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${recipe.name}.png`;
          a.click();
        }
      });
    }
  };

  const toggleSaveRecipe = () => {
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    console.log('Current saved recipes:', savedRecipes);
    
    if (isSaved) {
      // Remove from saved recipes
      const updatedRecipes = savedRecipes.filter(r => r.id !== recipe.id);
      console.log('Removing recipe. Updated recipes:', updatedRecipes);
      localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
    } else {
      // Add to saved recipes
      const recipeToSave = {
        id: recipe.id,
        name: recipe.name,
        image: recipe.image
      };
      console.log('Saving recipe:', recipeToSave);
      const updatedRecipes = [...savedRecipes, recipeToSave];
      console.log('Updated recipes after save:', updatedRecipes);
      localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
    }
    
    // Force a state update in the ProfileScreen by dispatching a storage event
    window.dispatchEvent(new Event('storage'));
    
    setIsSaved(!isSaved);
  };

  const displayRecipe = translatedRecipe || recipe;

  return (
    <div className="recipe-detail" ref={pageRef}>
      <div className="top-controls">
        <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
        
        <div className="right-controls">
          <div className="language-selector">
            <select
              id="language"
              value={selectedLanguage}
              onChange={(e) => handleTranslate(e.target.value)}
              disabled={isTranslating}
              title="Translate recipe"
            >
              {Object.entries(languages).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
            {isTranslating && <span className="translating">Translating...</span>}
          </div>

          <button className="share-btn" onClick={sharePage}>
            <FaShare style={{ marginRight: "5px" }} /> Share
          </button>
          <button 
            className={`save-btn ${isSaved ? 'saved' : ''}`} 
            onClick={toggleSaveRecipe}
            title={isSaved ? 'Remove from saved' : 'Save recipe'}
          >
            {isSaved ? 
              <FaBookmark style={{ marginRight: "5px" }} /> : 
              <FaRegBookmark style={{ marginRight: "5px" }} />
            }
            {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      <h1>{displayRecipe.name}</h1>
      <img src={displayRecipe.image} alt={displayRecipe.name} className="detail-img" />

      <h2>Ingredients</h2>
      <ul>
        {(displayRecipe.ingredients || []).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2>Steps</h2>
<ol>
  {(displayRecipe.steps || displayRecipe.instructions || []).map((step, index) => (
    <li key={index}>{step}</li>
  ))}
</ol>
      {recipe.videoUrl && (
        <>
          <h2>Watch Video</h2>
          <div className="video-container">
            <iframe
              width="100%"
              height="400"
              src={recipe.videoUrl}
              title={recipe.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </>
      )}
    </div>
  );
}
