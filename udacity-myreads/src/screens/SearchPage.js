import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Row, Col, Input } from "antd";
import BookCard from "../components/BookCard";

//import API
import { search } from "../api/BooksAPI";

export default function SearchPage(props) {
  const [searchValue, setSearchValue] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);
  const handleChangeValue = (e) => {
    setSearchValue(e.target.value);
    getSearchResult(e.target.value);
  };
  const [searchNoresult, setNoResult] = useState(false);
  const getSearchResult = (searchQuery) => {
    searchQuery
      ? search(searchQuery).then((res) =>
          res.length > 0
            ? (setSearchedBooks(res), setNoResult(false))
            : setSearchedBooks([])
        )
      : setSearchedBooks([]);
    setNoResult(true);
  };

  return (
    <div className="mt-5 pt-5">
      <Link to="/">
        <FontAwesomeIcon icon={faArrowLeft} className="mx-2 backIcon" />
      </Link>
      <div className="searchInputDiv m-3">
        <Input
          value={searchValue}
          onChange={handleChangeValue}
          placeholder="Search by title, author, or ISBN"
        />
      </div>
      <Row justify="center">
        {searchedBooks.length > 0 &&
          searchedBooks.map((book, index) => (
            <Col lg={{ span: 4 }} sm={{ span: 24 }} key={book.id}>
              <BookCard
                book={book}
                updateShelf={props.updateShelf}
                myIndex={index}
              />
            </Col>
          ))}
        {searchNoresult && <p className="noResults">No results</p>}
      </Row>
    </div>
  );
}
