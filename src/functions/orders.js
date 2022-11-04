//The function to fetch all the orders sorted by order's id reversed
export const fetchOrders = (axios, number, callback) => {

  let sectionButtons = document.getElementsByClassName("sectionButtons")
  
  for(let i=0; i < sectionButtons.length; i++) {

    if(i+1 === number) { sectionButtons[i].style.backgroundColor = "rgb(64, 84, 178)"
  } else {
    sectionButtons[i].style.backgroundColor = "#ba55d3"
  }
  }

  axios.get("http://localhost:5000/orders/orders-by-id?number=" + number)
       .then((res) => {
                      callback(res.data)
                      for(let i=0; i < res.data.length; i++){
                        
                        let checkedStatus = document.getElementById("checkedStatus" + i)

                        checkedStatus.innerText === "unChecked" ? checkedStatus.classList.add("bold") :
                                                                  checkedStatus.classList.remove("bold")
                      }
                    })
}

//The function to fetch the amount of orders groups of ten, 
//so that we create the appropriate buttons
export const fetchOrdersSections = (axios, callback) => {

  

  axios.get("http://localhost:5000/orders/orders-amount")
       .then((res) => callback(res.data))
}

//The function to fetch an orders total price
export const fetchTotalPrice = (axios, id) => {

    

     axios.get("http://localhost:5000/orders/price-of-" + id)
          .then((res) => res.data.totalPrice)

    
}

 //With below function, when we click on an order, it is marked as checked                
export const markAsChecked = (socket, id) => {

    socket.emit('mark order checked', id)
  }

//With below function, we allow 10 characters maximum in each table data cell
export const renderCharacters = (text) => {

    return text.length > 15 ? text.split("").slice(0, 15).join("") + "..." : text 
}

//Below function will generate the id number for each order
export const generateOrderId = (id) => {

  return id.length === 1 ? "#000" + id :
                           id.length === 2 ?
                           "#00" + id :
                           id.length === 3 ?
                           "#0" + id :
                           "#" + id 
}

export const renderComments = (comments) => {

  return comments === "" || comments === null ? "No comments" :
                                                comments
 }