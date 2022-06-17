import "./App.css";
import { useState, useEffect } from "react";
import Cocktail from "../Cocktail";
import CocktailImage from "../CocktailImage";
import IngredientsUL from "../IngredientsUL";
import IngredientsLI from "../IngredientsLI";

function App() {
  const [pictureURL, setPictureURL] = useState("");
  const [cocktailName, setCocktailName] = useState("");
  const [cocktailIngredients, setCocktailIngredients] = useState([]);
  const [cocktailInstructions, setCocktailInstructions] = useState("");
  const [cocktailMeasures, setCocktailMeasures] = useState([]);

  async function getRandomRecipe() {
    let response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    console.log(response);
    let data = await response.json();
    let arrIngredients = [];
    let arrMeasures = [];

    setPictureURL(data.drinks[0].strDrinkThumb);
    setCocktailName(data.drinks[0].strDrink);
    setCocktailInstructions(data.drinks[0].strInstructions);

    for (let i = 1; i < 16; i++) {
      const key1 = "strIngredient" + i;
      const key2 = "strMeasure" + i;
      const ingredient = data.drinks[0][key1];
      const measure = data.drinks[0][key2];
      if (ingredient !== null) {
        arrIngredients.push(ingredient);
        arrMeasures.push(measure);
      }
    }
    setCocktailIngredients(arrIngredients);
    setCocktailMeasures(arrMeasures);

    //console.log(data);
    console.log("our Ingreds", arrIngredients);
    console.log("our Measures", arrMeasures);
  }

  console.log(cocktailIngredients);
  console.log(cocktailInstructions);

  useEffect(() => {
    getRandomRecipe();
  }, []);

  return (
    <div className="App">
      <h1>Cocktail Inspirations</h1>
      <div id="recipe-div">
        <Cocktail text={cocktailName} />
        <CocktailImage src={pictureURL} text={cocktailName} />
        <IngredientsUL>
          {cocktailIngredients.map((item) => {
            return <IngredientsLI text={item}></IngredientsLI>;
          })}
          {cocktailMeasures.map((item) => {
            return <IngredientsLI text={item}></IngredientsLI>;
          })}
        
        </IngredientsUL>
     

        <h2>Recipe</h2>
        <p>{cocktailInstructions}</p>
      </div>
    </div>
  );
}

export default App;

/* { for (let i=0; i<cocktailIngredients.length; i++){
          <IngredientsLI measure={cocktailMeasures[i] text={cocktailIngredients[i]} }></IngredientsLI>;
        }}

        */
