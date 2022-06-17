function CocktailImage({ src, text }) {
  console.log({ src });
  return <img src={src} alt={text}></img>;
}

export default CocktailImage;
