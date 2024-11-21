import recipes from "../Models/recipeSchema.js";

// const recipes = [
//   {
//     id: 1,
//     name: "Spaghetti Bolognese",
//     procedure:
//       "Cook spaghetti according to package instructions. Sauté onions, garlic, and ground beef. Add tomatoes and simmer for 20 minutes. Mix with spaghetti and serve.",
//     ingredients: [
//       "spaghetti",
//       "ground beef",
//       "onion",
//       "garlic",
//       "tomato sauce",
//       "olive oil",
//       "salt",
//       "pepper",
//     ],
//     duration: "40 minutes",
//   },
//   {
//     id: 2,
//     name: "Chicken Caesar Salad",
//     procedure:
//       "Grill chicken breasts. Toss romaine lettuce with Caesar dressing, croutons, and Parmesan cheese. Top with grilled chicken slices and serve.",
//     ingredients: [
//       "chicken breast",
//       "romaine lettuce",
//       "Caesar dressing",
//       "croutons",
//       "Parmesan cheese",
//     ],
//     duration: "25 minutes",
//   },
//   {
//     id: 3,
//     name: "Vegetable Stir-Fry",
//     procedure:
//       "Heat oil in a wok. Stir-fry vegetables with soy sauce, garlic, and ginger until tender. Serve with rice or noodles.",
//     ingredients: [
//       "broccoli",
//       "carrots",
//       "bell peppers",
//       "soy sauce",
//       "garlic",
//       "ginger",
//       "vegetable oil",
//     ],
//     duration: "20 minutes",
//   },
//   {
//     id: 4,
//     name: "Pancakes",
//     procedure:
//       "Mix flour, sugar, eggs, milk, and baking powder to make batter. Cook on a hot griddle until golden. Serve with syrup.",
//     ingredients: [
//       "flour",
//       "sugar",
//       "eggs",
//       "milk",
//       "baking powder",
//       "butter",
//       "maple syrup",
//     ],
//     duration: "15 minutes",
//   },
//   {
//     id: 5,
//     name: "Beef Tacos",
//     procedure:
//       "Cook ground beef with taco seasoning. Assemble tacos with beef, lettuce, tomatoes, cheese, and salsa in tortillas.",
//     ingredients: [
//       "ground beef",
//       "taco seasoning",
//       "lettuce",
//       "tomatoes",
//       "cheese",
//       "salsa",
//       "tortillas",
//     ],
//     duration: "30 minutes",
//   },
//   {
//     id: 6,
//     name: "Tomato Soup",
//     procedure:
//       "Sauté onions and garlic in a pot. Add tomatoes, broth, and herbs. Simmer and blend until smooth. Serve warm.",
//     ingredients: [
//       "tomatoes",
//       "onion",
//       "garlic",
//       "vegetable broth",
//       "basil",
//       "olive oil",
//     ],
//     duration: "30 minutes",
//   },
//   {
//     id: 7,
//     name: "Grilled Cheese Sandwich",
//     procedure:
//       "Butter bread slices. Add cheese between slices and grill until golden and cheese melts. Serve warm.",
//     ingredients: ["bread", "cheese", "butter"],
//     duration: "10 minutes",
//   },
//   {
//     id: 8,
//     name: "Chocolate Chip Cookies",
//     procedure:
//       "Mix butter, sugar, eggs, flour, and chocolate chips to form dough. Scoop and bake at 350°F for 10-12 minutes.",
//     ingredients: [
//       "butter",
//       "sugar",
//       "eggs",
//       "flour",
//       "chocolate chips",
//       "baking soda",
//     ],
//     duration: "25 minutes",
//   },
//   {
//     id: 9,
//     name: "Fruit Smoothie",
//     procedure: "Blend fruits, yogurt, and milk until smooth. Serve cold.",
//     ingredients: [
//       "banana",
//       "strawberries",
//       "blueberries",
//       "yogurt",
//       "milk",
//       "honey",
//     ],
//     duration: "5 minutes",
//   },
//   {
//     id: 10,
//     name: "Vegetable Curry",
//     procedure:
//       "Sauté onions, garlic, and spices. Add mixed vegetables and coconut milk. Simmer until vegetables are tender. Serve with rice or naan.",
//     ingredients: [
//       "onion",
//       "garlic",
//       "mixed vegetables",
//       "coconut milk",
//       "curry powder",
//       "salt",
//       "oil",
//     ],
//     duration: "35 minutes",
//   },
// ];



export const getRecipes = async (req, res) => {
  try {
    const getRecipes = await recipes.find();
    res
      .status(200)
      .json({ message: "Recipe viewed successfully", data: getRecipes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await recipes.findById(recipeId);
    if (!recipe) {
      return res
        .status(404)
        .json({ message: "Recipe not Found", id: recipeId });
    }
    res
      .status(200)
      .json({ message: "Recipe viewed successfully", data: recipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createRecipe = async (req, res) => {
  try {
    const newRecipe = new recipes(req.body);
    await newRecipe.save();
    res
      .status(200)
      .json({ message: "Recipe created successfully", data: newRecipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const { name, procedure, ingredients, duration } = req.body;
    const result = await recipes.findByIdAndUpdate(
      { _id: recipeId },
      {name, procedure, ingredients, duration} ,
      { new: true }
    );
    if (result.matchedCount === 0 ) {
        return res
        .status(404)
        .json({ message: "Recipe not Found", id: recipeId });
    }
    res
      .status(200)
      .json({ message: "Recipe Updated successfully", data: result });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteRecipe = async (req,res)=>{
    try {
        const recipeId = req.params.id;
        const result = await recipes.findByIdAndDelete({_id:recipeId})
        if (!result) {
            return res
        .status(404)
        .json({ message: "Recipe not Found", id: recipeId });
        }
        const recipe = await recipes.find();
        res.status(200).json({
            message:"Recipe Deleted Successfully",data:recipe
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// export const getRecipes = (req, res) => {
//   res
//     .status(200)
//     .json({ message: "Recipes Data Received Successfully", data: recipes });
// };
// export const getRecipeById = (req, res) => {
//   const recipeId = req.params.id;
//   const recipeDet = recipes.find((ele) => ele.id == recipeId);
//   if (!recipeDet) {
//     return res.status(403).json({ message: "Recipe not found" });
//   }
//   res
//     .status(200)
//     .json({ message: "Recipe Data Received Successfully", data: recipeDet });
// };

// export const createRecipe = (req,res)=>{
//     const {name,procedure,ingredients,duration} = req.body;
//     const newRecipe = {
//         id:recipes.length+1,
//         name:name,
//         procedure:procedure,
//         ingredients:ingredients,
//         duration:duration,
//     }

//     recipes.push(newRecipe);

//     res.status(200).json({message:"Recipe Added Successfully",data:newRecipe})
// }
// export const updateRecipe = (req,res)=>{
//     const recipeId = req.params.id;
//     const {name,procedure,ingredients,duration} = req.body;
//     const index = recipes.findIndex(ele=>ele.id == recipeId)

//     if (index === -1) {
//        return res.status(404).json({message:"Recipe not found"})
//     }

//     recipes[index].name = name;
//     recipes[index].procedure = procedure;
//     recipes[index].ingredients = ingredients;
//     recipes[index].duration = duration;

//     res.status(200).json({
//         message:"Recipe updated successfully",
//         data:recipes[index]
//     })
// }

// export const deleteRecipe = (req,res)=>{
//     const recipeId = req.params.id;
//     const index = recipes.findIndex(ele=>ele.id==recipeId)

//     if (index === -1) {
//         return res.status(404).json({message:"Recipe not found"})
//      }

//     recipes.splice(index,1)

//     res.status(200).json({message:"Recipe deleted successfully"})
// }
