import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import BookList from "./components/BookList";
import Cart from "./components/Cart";
import LoginPage from "./components/LoginPage";
import NotFoundPage from "./components/NotFoundPage";
import Book from "./components/Book";
import "./App.css";
import BookContextProvider from "./components/BookContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("user"));

  function handleLogout() {
    localStorage.removeItem("user");
    setLoggedIn(false);
  }

  return (
    <BrowserRouter>
      <div className="App">
        <BookContextProvider>
          <header>
            <nav className="navbar">
              <div className="logo">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/009/385/602/original/old-book-clipart-design-illustration-free-png.png"
                  alt="MyBookstore"
                />
                <Link className="logo_txt" to="/booklist">
                  JS BAND STORE / Nika Minaieva
                </Link>
              </div>
              <div className="nav-buttons">
                {loggedIn ? (
                  <Link to="/cart">
                    <i className="fa-sharp fa-solid fa-cart-shopping"></i>
                  </Link>
                ) : (
                  <Link to="/cart" style={{ visibility: "hidden" }}>
                    <i className="fa-sharp fa-solid fa-cart-shopping"></i>
                  </Link>
                )}
                {loggedIn && (
                  <div className="user_cointainer">
                    <img
                      src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                      alt="user"
                    />
                    {localStorage.getItem("user")}
                    <button onClick={handleLogout}>Sign out</button>
                  </div>
                )}
              </div>
            </nav>
          </header>
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to="/booklist" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            {/* <Route path="/book_store_prometeus/" element={<LoginPage />} /> */}
            <Route
              path="/booklist"
              element={
                loggedIn ? <BookList /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/cart"
              element={loggedIn ? <Cart /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/login"
              element={
                loggedIn ? (
                  <Navigate to="/booklist" replace />
                ) : (
                  <LoginPage onLogin={() => setLoggedIn(true)} />
                )
              }
            />
            <Route path="/*" element={<NotFoundPage />} />
            <Route
              path="/book/:id"
              element={loggedIn ? <Book /> : <Navigate to="/login" replace />}
            />
          </Routes>
          <footer>
            <p>
              Made in{" "}
              <a target={"_blank"} href="https://prometheus.org.ua/">
                Prometeus
              </a>{" "}
              © 2022{" "}
            </p>
          </footer>
        </BookContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
