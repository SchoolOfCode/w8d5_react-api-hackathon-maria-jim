import "./App.css";
import { useState, useEffect } from "react";
import Cocktail from "../Cocktail";
import CocktailImage from "../CocktailImage";
import IngredientsUL from "../IngredientsUL";
import IngredientsLI from "../IngredientsLI";
import ButtonNewRecipe from "../Button";

// API website https://www.thecocktaildb.com/api.php?ref=apilist.fun


function App() {
  const [pictureURL, setPictureURL] = useState("");
  const [cocktailName, setCocktailName] = useState("");
  const [cocktailInstructions, setCocktailInstructions] = useState("");
  const [cocktailMeasureAndIngredients, setCocktailMeasureAndIngredients] = useState([]);

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

    let arrMeasuresAndIngridients= [];
      
      for(let i=0; i<arrIngredients.length; i++){
        if (arrMeasures[i]){
          arrMeasuresAndIngridients.push({ingredient:` ${arrMeasures[i]} ${arrIngredients[i]}`, key: i})
        }
        if (arrMeasures[i] === null){
          arrMeasuresAndIngridients.push({ingredient:`${arrIngredients[i]}`, key: i})
        }
        
      }
      console.log(arrMeasuresAndIngridients);
      setCocktailMeasureAndIngredients(arrMeasuresAndIngridients);
    
    

    //console.log(data);
    console.log("our Ingreds", arrIngredients);
    console.log("our Measures", arrMeasures);
  }

  useEffect(() => {
    getRandomRecipe();
  }, []);

  const buttonName = "Get new recipe!";
 
  function handleClick(){
    console.log("handleclick working")
    async function getNewRandomRecipe() {
      let response = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/random.php"
      );
      console.log(response);
      let data = await response.json();
  
      let arrIngredients = [];
      let arrMeasures = [];
      
      //Create an array of objects 
      //  each object will have {index:{index} measure: {measure} ingredient: {ingredient}}
      // for loop with if statement
      // if statement -> if index is the same push add to object 
  
      setPictureURL(data.drinks[0].strDrinkThumb);
      setCocktailName(data.drinks[0].strDrink);
      setCocktailInstructions(data.drinks[0].strInstructions);
  
      for (let i = 1; i < 16; i++) {
        const key1 = "strIngredient" + i;
        const key2 = "strMeasure" + i;
        const ingredient = data.drinks[0][key1];
        const measure = data.drinks[0][key2];
        if (ingredient !== null && ingredient !== "") {
          arrIngredients.push(ingredient);
          arrMeasures.push(measure);
        }
      }
      
      let arrMeasuresAndIngridients= [];
      
      for(let i=0; i<arrIngredients.length; i++){
        if (arrMeasures[i]){
          arrMeasuresAndIngridients.push({ingredient:` ${arrMeasures[i]} ${arrIngredients[i]}`, key: i})
        }
        if (arrMeasures[i] === null){
          arrMeasuresAndIngridients.push({ingredient:`${arrIngredients[i]}`, key: i})
        }
        
      }
      console.log(arrMeasuresAndIngridients);
      setCocktailMeasureAndIngredients(arrMeasuresAndIngridients);
  
      //console.log(data);
      console.log("our Ingreds", arrIngredients);
      console.log("our Measures", arrMeasures);
      console.log("our measures and ingridients", arrMeasuresAndIngridients);
    }
    getNewRandomRecipe();
  }

  return (
    <div className="App">
      <h1>Cocktail Inspirations</h1>
      <div><ButtonNewRecipe text={buttonName} onClick ={handleClick}/></div>
      <div id="recipe-div">
        <Cocktail cocktailname={cocktailName} />
        <CocktailImage src={pictureURL} cocktailname={cocktailName} />
        <div id="ingridients"><IngredientsUL>
          {cocktailMeasureAndIngredients.map((item) => {
            return <IngredientsLI text={item.ingredient}></IngredientsLI>;
          })}
        </IngredientsUL>
        </div>
        <h2>Recipe</h2>
        <p className="instructions">{cocktailInstructions}</p>
      </div>
     
    </div>
  );
}

export default App;

/* { for (let i=0; i<cocktailIngredients.length; i++){
          <IngredientsLI measure={cocktailMeasures[i] text={cocktailIngredients[i]} }></IngredientsLI>;
        }}

        */
