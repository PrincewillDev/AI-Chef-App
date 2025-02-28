import React from "react";
import IngredientsList from "./components/IngredientsList";
import ClaudeRecipe from "./components/ClaudeRecipe";
import { getRecipeFromChefClaude, getRecipeFromMistral } from "./ai";

export default function Main() {
    const [ingredients, setIngredients] = React.useState([
        "chicken", "all the main spices", "corn", "heavy cream", "pasta"
    ]);
    const [recipe, setRecipe] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    async function getRecipe() {
        setLoading(true);
        setError("");
        try {
            const recipeMarkdown = await getRecipeFromChefClaude(ingredients);
            setRecipe(recipeMarkdown);
        } catch (err) {
            setError("Failed to get recipe: " + err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient");
        if (newIngredient && newIngredient.trim() !== "") {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient.trim()]);
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Recipe Generator</h1>
            
            <form action={addIngredient} className="mb-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        name="ingredient"
                        placeholder="Add an ingredient"
                        className="border p-2 rounded flex-grow"
                        required
                    />
                    <button 
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add ingredient
                    </button>
                </div>
            </form>

            {ingredients.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Your Ingredients</h2>
                    <IngredientsList ingredients={ingredients} />
                    <button 
                        onClick={getRecipe} 
                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        disabled={loading}
                    >
                        {loading ? "Generating..." : "Get Recipe"}
                    </button>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    {error}
                </div>
            )}

            {recipe && <ClaudeRecipe recipeMarkdown={recipe} />}
        </div>
    );
}