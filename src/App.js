import './App.css';
import axios from "axios"
import { useState } from  'react'

function App() {

  const [category, setCategory] = useState("pizza")
  const [food, setFood] = useState("")

  const getFood = () => {
    
    axios.get("https://restaurant-builder-server.herokuapp.com/").then((res) => {
      setFood(res.data[0].name)
    }).catch((err) => console.log(err))
  }


  const sendCategory = () => {
     let category = document.getElementById("foodCategory").value

     if(category) {
        console.log(category)
     }     
     axios.post("https://restaurant-builder-server.herokuapp.com/foods", {category : category}).then((res) => {
      console.log(res)
    })
  }
  

  return (
    <div>
      <button onClick={ getFood }>add food</button>
      <p>{ food }</p>
      <input type="text" placeholder='Add food category' id="foodCategory"/><br></br>
      <button onClick= { sendCategory }> SEND CATEGORY </button>
    </div>
  );
}

export default App;
