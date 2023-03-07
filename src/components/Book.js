import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "../styles/Book.css";
import { BookContext } from "./BookContext";

function Book() {
  // const [book, setBook] = useState(null);
  const { id } = useParams();
  const { books } = useContext(BookContext);

  const book = books.find((book) => book.id === parseInt(id));

  const [quantity, setQuantity] = useState(1); 
  const [totalPrice, setTotalPrice] = useState(""); 

  //OLD data fetch
  // useEffect(() => {
  //   fetch(`https://api.npoint.io/82cb711372a8762d67eb/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => setBook(data))
  //     .catch((error) => console.error(error));
  // }, [id]);
  if (!book) {
    return <div>Loading...</div>;
  }

  //CART
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);

    if (newQuantity >= 1 && newQuantity <= 42) {
      setTotalPrice(newQuantity * book.price);
    }
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const newCartItem = {
      id: book.id,
      title: book.title,
      price: book.price,
      quantity: quantity,
    };
    const existingCartItem = cart.find((item) => item.id === book.id);
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      cart.push(newCartItem);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div className="book_page">
      <div className="book_img_container">
        {book.image ? (
          <img src={book.image} alt={book.title} />
        ) : (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
            alt="NoImage"
          />
        )}
      </div>
      <div className="book_info">
        <h2>{book.title}</h2>
        <p>Author: {book.author}</p>
        <p>Price: {book.price}</p>
        <p>Description: {book.description}</p>
      </div>
      <div className="form_container">
        <form>
          <div>
            <label>
              Price $:
              <input data-testid="price-input" type="number" value={book.price} readOnly />
            </label>
          </div>
          <div>
            <label>
              Quantity(1-42):
              <input
                data-testid="quantity-input"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max="42"
              />
            </label>
          </div>
          <div>
            <label>
              Total price:
              {totalPrice ? (
                <input
                  type="number"
                  value={parseFloat(totalPrice).toFixed(2)}
                  readOnly
                />
              ) : (
                <input data-testid="total-cost" type="number" value={book.price} readOnly />
              )}
            </label>
          </div>
          <button type="submit" onClick={handleAddToCart}>
            Add to cart
          </button>
        </form>
      </div>
    </div>
  );
}

export default Book;
