import './App.css';
import {Route,  Routes} from 'react-router-dom';
import { NavBar } from "./components/navBar"
import { AddProduct } from "./components/addProduct"
import { Preview } from "./components/ProductsPreview"
import { ChatDashboard } from './components/chatDashboard';
import { PrivateChat } from './components/privateChat'
import { Orders } from "./components/orders"
import { SpecificOrder } from "./components/specificOrder"
import { Customers } from "./components/customers"

//The parent component
function App() {

  return(<div>
          <NavBar />
          <Routes>       
            <Route path="add-product" element={<AddProduct />} />
            <Route path="preview" element={<Preview />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/order-number-:id" element={<SpecificOrder />} />
            <Route path="chat" element={<ChatDashboard />} />
            <Route path="chat/:customer" element={<PrivateChat/>} />
            <Route path="customers" element={<Customers />} />
          </Routes>
        </div>)
}

export default App;
