import './App.css';
import axios from "axios"

function App() {

  const getFood = () => {
    
    axios.get("https://restaurant-builder-server.herokuapp.com").then((res) => {
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
