import "../css/addProduct.css"

export const AddProduct = () => {

    return(<div className="addProduct">
                <form>
                    <h1 id="formTitle" className="formComponents" >Add Products</h1>
                    <hr id="formLine"></hr>                    
                    <label id="categoryLabel" className="formComponents" >Product Category</label>
                    <input placeholder="Pizza" id="categoryInput" className="formComponents" />
                    <label id="nameLabel" className="formComponents" >Product Name</label>
                    <input id="nameInput" className="formComponents"  placeholder="Margarita"/>
                    <label id="currencyLabel"  className="formComponents" >Currency</label>
                    <select id="currencySelect" name="currency" className="formComponents" >
                        <option value="usd">USD</option>
                        <option value="euro">EUR</option>                                       
                    </select>
                    <label id="quantityLabel" className="formComponents" >Quantity</label>
                    <input placeholder="01" id="quantityInput" className="formComponents"  />
                    <label id="deliveryLabel"  className="formComponents" >Delivery Price</label>
                    <input placeholder="$10" id="deliveryInput"  className="formComponents" />
                    <label id="priceLabel" className="formComponents" >Take away Price</label>
                    <input placeholder="$10" id="priceInput" className="formComponents" />
                    <label id="descriptionLabel" className="formComponents" >Description</label>
                    <textarea id="descriptionInput" placeholder="Description" className="formComponents" />
                    <label id="imageLabel" className="formComponents" >Product Image</label>
                    <input type="file" id="imageInput"  className="formComponents" 
                            accept="image/png, image/jpeg, image/jpg"></input>
                    <input type="submit" id="submit" className="formComponents" />
                </form>
           </div>)
}