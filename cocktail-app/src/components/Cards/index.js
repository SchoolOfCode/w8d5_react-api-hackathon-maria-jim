import Cocktail from "../Cocktail"
import CocktailImage from "../CocktailImage"
import IngredientsUL from "../IngredientsUL"
import IngredientsLI from "../IngredientsLI"
import {useState} from 'react'



const Cards = (cocktailName,pictureURL,cocktailInstructions,cocktailMeasureAndIngredients) => {
  const [iceCocktail, setIceCocktail] = useState([])
  
  async function getIceCocktail(){
 let response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=ice")
let data = response.json()

  }
  
    return (
    <div id="recipe-div-small">
        <Cocktail text={cocktailName} />
        <CocktailImage src={pictureURL} text={cocktailName} />
        <div id="ingridients"><IngredientsUL>
          {cocktailMeasureAndIngredients.map((item) => {
            return <IngredientsLI text={item.ingredient}></IngredientsLI>;
          })}
        </IngredientsUL>
        </div>
        <h2>Recipe</h2>
        <p className="instructions">{cocktailInstructions}</p>
      </div>
  )
}

export default Cards