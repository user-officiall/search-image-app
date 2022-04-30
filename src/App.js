import React, { useState } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./App.css";

function App() {
  const [image, setImage] = useState("");
  const [result, setResult] = useState([]);

  const ACCESS_KEY = "-htyF2rUixQfhY5Vrg_jbw2hYK7qdy9TeDYu6KSDylQ";

  const getValue = (event) => {
    setImage(event.target.value);
  };

  const getImages = () => {
    const url =
      "https://api.unsplash.com/search/photos?page=1&query=" +
      image +
      "&client_id=" +
      ACCESS_KEY;
    axios.get(url).then((response) => {
      setResult(response.data.results);
      console.log(response);
    });
  };
  return (
    <div>
      <h1 className="title">React Image Search with Unsplash API</h1>
      <div className="formSection">
        <input
          type="text"
          name="image"
          placeholder="Search images..."
          onChange={getValue}
        />
        <button type="submit" onClick={getImages}>
          Search
        </button>
      </div>

      <div className="result">
        {/* Rasm Card ko'rinishida chiqadi */}
        {result.map((image, id) => (
          <div key={image.id} className="card">
            <LazyLoadImage
              className="resultImage"
              src={image.urls.full}
              effect="blur"
              delayTime="300"
            />
            {/* Rasm muallifi */}
            <p className="username">Photo by {image.user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
