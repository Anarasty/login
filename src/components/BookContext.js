import React, { createContext, useState, useEffect } from "react";

export const BookContext = createContext();

const BookContextProvider = (props) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://api.npoint.io/82cb711372a8762d67eb")
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <BookContext.Provider value={{ books }}>
      {props.children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;
