import React, { useState, useEffect } from 'react';
import './App.css';
import Recipe from './Recipe';
import { async } from 'q';


const App = () => {
const APP_ID = '3a0d08a1';
const APP_KEY = 'd1600a2325b7a888a81c607acbc58891';

const [recipes, setRecipes] = useState([]);
const [search, setSearch] = useState("");
const [query, setQuery] = useState('')


useEffect(() => {
getRecipes();
}, [query]);

const getRecipes = async () => {
  const response = await fetch (`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();

    setRecipes(data.hits)
    // console.log(data);
}

const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch('');
}

const updateSearch = e => {
  setSearch(e.target.value);
}

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text"
          value={search} onChange={updateSearch}
          placeholder="Enter recipe name"
        />
        <button className="search-button"
        type="submit">
        Search
        </button>
      </form>
        <div className="recipe">
              {recipes.map(recipe =>
                  <Recipe
                    key={recipe.recipe.label}
                    title={recipe.recipe.label}
                    calories={recipe.recipe.calories}
                    image={recipe.recipe.image}
                    ingredients={recipe.recipe.ingredients}
                  />
            )};
      </div>
    </div>     
  );
}

export default App;
