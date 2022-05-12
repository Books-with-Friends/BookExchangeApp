import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Masonry from "react-masonry-css";
import Slide from '@mui/material/Slide';

export default function BasicMasonry() {
  let inputVal;
  const [state, setState] = useState([]);
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const breakpointColumnsObj = {
    default: 5,
    1100: 3,
    700: 2,
    500: 1,
  };

  const addFav = (bookDetails, index) => {
    console.log(bookDetails);
    //title, author, genre, isbn, img_URL 
    const savedDetails = {
        author: bookDetails.author_name[0],
        title: bookDetails.title,
        isbn: bookDetails.isbn[0],
        img_URL: `https://covers.openlibrary.org/b/id/${bookDetails.cover_i}-M.jpg`,
        genre: bookDetails.subject[0]
    }
    fetch('/api/userLibrary', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: "POST",
        body: JSON.stringify(savedDetails)
    }).then(data => setState(state.filter((el,i) => i !== index)))
  }


  const handleSearch = (e) => {
    e.preventDefault();
    handleChange()

    inputVal = document.getElementById("searchString").value.trim();
    makeApiCall("https://openlibrary.org/search.json?title=" + inputVal)

  };


  const makeApiCall = (url) => { 
    fetch(url)
      .then((data) => data.json())
      .then((res) => {
        let newArr = [];
        for (let i = 0; i < 60; i++) {
          if (res.docs[i].cover_i) {
            newArr.push(res.docs[i]);
          }
        }
        setState(newArr);
        handleChange()

      }).catch((err) => console.error(err));
  }

  useEffect(() => {
    makeApiCall("https://openlibrary.org/search.json?title=animal+farm")

  }, []);

  return (
    <React.Fragment>
      <div className="search-box">
        <form className="search-form">
          <input
            type="text"
            placeholder="search book by title"
            name="title"
            id="searchString"
            required
          />
          <input type="submit" value="search" onClick={handleSearch} />
        </form>
        {/* <div className="result-box">table</div> */}
      </div>
      <CssBaseline />
      <Container
        maxWidth="80vw"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {state.map((item, i) => (
                 <Slide
                   in={checked}
                   style={{ transformOrigin: '0 0 0' }}
                   {...(checked ? { timeout: (1000 + (i * 500))} : {})}
                   key={i}
                   direction="left"
                   mountOnEnter={true}
                   unmountOnExit={true}
                   easing={{
                    enter: "cubic-bezier(0, 1.5, .8, 1)",
                    exit: "linear"
                  }}
                 >
            <div className="search-grid-box image"  onClick={() => addFav(item, i)}>
              <img
                className="image_img"
                src={`https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`}
                style={{ width: "100%", display: "block" }}
                alt=""
              />
              <div className="image__overlay image__overlay--primary">
                <div className="image__title">{item.title}</div>
                <p className="image__description">{item.author_name[0]}</p>
                <p className="image__description">{item.first_publish_year}</p>
              </div>
            </div>
            </Slide>
          ))}
        </Masonry>
      </Container>
    </React.Fragment>
  );
}
