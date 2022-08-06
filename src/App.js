import './App.css';
import axios from "axios"
import { useState } from  'react'

function App() {

  const [food, setFood] = useState("")

  const getFood = () => {
    
    axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita").then((res) => {
      setFood(res.data[0])
    }).catch((err) => console.log(err))
  }

  return (
    <div>
      <button onClick={ getFood }>{ food }</button>
    </div>
  );
}

export default App;
