import './App.css';
import axios from "axios"
import { useState } from  'react'

function App() {

  const [food, setFood] = useState("")

  const getFood = () => {
    
    axios.get("https://restaurant-builder-server.herokuapp.com/").then((res) => {
      setFood(res.data[0].name)
    }).catch((err) => console.log(err))
  }

  return (
    <div>
      <button onClick={ getFood }>add food</button>
      <p>{ food }</p>
    </div>
  );
}

export default App;
