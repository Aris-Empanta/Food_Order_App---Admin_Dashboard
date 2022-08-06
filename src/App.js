import './App.css';
import axios from "axios"

function App() {

  const getFood = () => {
    
    axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita").then((res) => {
      console.log(res.data[0])
    }).catch((err) => console.log(err))
  }

  return (
    <div>
      <button onClick={ getFood }>GET FOOD</button>
    </div>
  );
}

export default App;
