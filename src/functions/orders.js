//The function to fetch all the orders sorted by order's id reversed
export const fetchOrders = (axios, callback) => {

  axios.get("http://localhost:5000/orders/orders-by-id")
       .then((res) => {
                      callback(res.data)
                      for(let i=0; i < res.data.length; i++){

                        let checkedStatus = document.getElementById("checkedStatus" + i)

                        checkedStatus.innerText === "unChecked" ? checkedStatus.classList.add("bold") :
                                                                  checkedStatus.classList.remove("bold")
                      }
                    })
}

 //With below function, when we click on an order, it is marked as checked                
export const markAsChecked = (socket, id) => {

    socket.emit('mark order checked', id)
  }

//With below function, we allow 10 characters maximum in each table data cell
export const renderCharacters = (text) => {

    return text.length > 15 ? text.split("").slice(0, 15).join("") + "..." : text 
}