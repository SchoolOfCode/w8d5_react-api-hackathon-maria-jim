function IngredientsUL(props) {
  return (
    <div>
      <h2>Ingredients and Quantities</h2>
      <ul>{props.children}</ul>
    </div>
  );
}

export default IngredientsUL;
