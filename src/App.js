import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [offset, setOffset] = useState(0);
  const charactersPerPage = 10;
  const searchInputRef = useRef(null);
  const quoteContainerRef = useRef(null);

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    try {
      const response = await fetch(
        `https://thesimpsonsquoteapi.glitch.me/quotes?count=${charactersPerPage}&offset=${offset}`
      );
      const data = await response.json();
      setOffset((prevOffset) => prevOffset + charactersPerPage);
      renderQuotes(data);
    } catch (error) {
      console.error("Error al obtener las citas:", error);
    }
  };

  const searchQuotes = async () => {
    const searchTerm = searchInputRef.current.value.trim().toLowerCase();

    try {
      const response = await fetch(
        `https://thesimpsonsquoteapi.glitch.me/quotes?count=100`
      );
      const data = await response.json();
      renderQuotes(
        data.filter(
          (quote) =>
            quote.character.toLowerCase().includes(searchTerm) ||
            quote.quote.toLowerCase().includes(searchTerm)
        )
      );
    } catch (error) {
      console.error("Error al obtener las citas:", error);
    }
  };

  const renderQuotes = (quotes) => {
    quoteContainerRef.current.innerHTML = "";
    quotes.forEach((quoteData) => {
      const { quote, character, image } = quoteData;
      const articleElement = createArticleElement(quote, character, image);
      quoteContainerRef.current.appendChild(articleElement);
    });
  };

  const createArticleElement = (quote, character, image) => {
    const articleElement = document.createElement("article");
    articleElement.classList.add("article");

    const imgElement = document.createElement("img");
    imgElement.classList.add("image");
    imgElement.src = image;
    imgElement.alt = character;

    const textElement = document.createElement("div");
    textElement.classList.add("text");

    const quoteTextElement = document.createElement("p");
    quoteTextElement.textContent = quote;

    const characterElement = document.createElement("p");
    characterElement.textContent = character;

    textElement.appendChild(characterElement);
    textElement.appendChild(quoteTextElement);

    articleElement.appendChild(imgElement);
    articleElement.appendChild(textElement);

    return articleElement;
  };

  return (
    <div>
      <header className="header">
        <div className="left-section">
          <button className="button">
            <img
              src="./Iconos/Dona3-removebg-preview.png"
              alt="Dona de los Simpsons"
              width="50"
              height="50"
            />
          </button>
        </div>
        <div className="center-section">
          <img
            className="logo"
            src="./Iconos/Titulo.png"
            alt="Titulo de los Simpsons"
            width="100"
            height="100"
          />
        </div>
        <div className="right-section">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Nombre frase ó #frase"
            className="input"
          />
          <button onClick={searchQuotes} className="search-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
      </header>

      <main className="main">
        <div id="characters" className="grid" ref={quoteContainerRef}>
          {/* Contenido principal */}
        </div>
      </main>

      <footer className="footer">
        <button onClick={loadQuotes} className="load-button">
          Load More
        </button>
      </footer>
    </div>
  );
}

export default App;
