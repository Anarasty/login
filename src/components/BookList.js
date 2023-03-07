import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/BookList.css";
import { BookContext } from "./BookContext";

function BookList() {
  const { books } = useContext(BookContext);
  //OLD data fetch
  // const [books, setBooks] = useState([]);
  // const apiGet = () => {
  //   fetch("https://api.npoint.io/82cb711372a8762d67eb")
  //     .then((response) => response.json())
  //     .then((json) => {
  //       console.log(json);
  //       setBooks(json);
  //     });
  // };
  // useEffect(() => {
  //   apiGet();
  // }, []);

  const [selectedOption, setSelectedOption] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const filteredBooks = books
    .filter((book) => {
      switch (selectedOption) {
        case "lessThan15":
          return book.price < 15;
        case "between15And30":
          return book.price >= 15 && book.price <= 30;
        case "moreThan30":
          return book.price > 30;
        default:
          return true;
      }
    })
    .filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="book-list-main">
      <div className="book-list-search-conteiner">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="all">All books</option>
          <option value="lessThan15">Price less than 15</option>
          <option value="between15And30">Price between 15 and 30</option>
          <option value="moreThan30">Price more than 30</option>
        </select>
      </div>
      <div className="book-list-content">
        <ul>
          {filteredBooks.map((book) => (
            <li key={book.id}>
              {book.image ? (
                <img src={book.image} alt={book.title} />
              ) : (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                  alt="NoImage"
                />
              )}
              <h3>
                {book.title.length > 24
                  ? `${book.title.slice(0, 24)}...`
                  : book.title}
              </h3>
              <p>{book.author}</p>
              <p>{book.price} USD</p>
              <Link className="showBook" to={`/book/${book.id}`}>
                Show Book
              </Link>{" "}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BookList;
