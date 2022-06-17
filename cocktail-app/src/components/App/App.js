import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [pictureURL, setPictureURL] = useState("");
  const [cocktailName, setCocktailName] = useState("");
  const [cocktailIngredients, setCocktailIngredients] = useState([]);
  const [cocktailInstructions, setcocktailInstructions] = useState("");
  const [cocktailMeasures, setCocktailMeasures] = useState([]);

  async function getRandomRecipe() {
    let response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    console.log(response);
    let data = await response.json();
    setPictureURL(data.drinks[0].strDrinkThumb);
    setCocktailName(data.drinks[0].strDrink);
    /*
    for (let i = 1; i < 16; i++) {
      if (data.drinks[0].strIngredient + i !== null) {
        setCocktailIngredients(
          ...cocktailIngredients,
          data.drinks[0].strIngredient + i
        );
      }
    }*/

    setCocktailIngredients(data.drinks[0].strIngredient1);
    setCocktailMeasures(data.drinks[0].strMeasure);

    setcocktailInstructions(data.drinks[0].strInstructions);

    console.log(data);
  }
  console.log(cocktailIngredients);
  console.log(cocktailInstructions);

  useEffect(() => {
    getRandomRecipe();
  }, []);

  return (
    <div className="App">
      <h1>Cocktail Inspirations</h1>
    </div>
  );
}

export default App;
