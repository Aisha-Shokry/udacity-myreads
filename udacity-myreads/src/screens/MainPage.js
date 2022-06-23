import React from "react";
import CurrentlyReading from "../components/bookshelves/CurrentlyReading";
import Read from "../components/bookshelves/Read";
import WantToRead from "../components/bookshelves/WantToRead";
import Loader from "../containers/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { DragDropContext } from "react-beautiful-dnd";
export default function MainPage(props) {
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log(result);
    if (!destination) {
      return;
    }
    const dragableBook = props.allBooks.filter(
      (book) => String(book.id) === String(draggableId)
    )[0];
    props.updateShelf(dragableBook, destination.droppableId);

    console.log(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId
    );
  };
  return props.loading ? (
    <Loader />
  ) : (
    <div className="mainPage mt-5 pt-5">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="currently mb-4" id="currentlyReading">
          <h4>Currently reading</h4>
          <CurrentlyReading
            updateShelf={props.updateShelf}
            currentlyBooks={props.allBooks.filter(
              (b) => b.shelf === "currentlyReading"
            )}
          />
        </div>
        <div className="wantTo mb-4" id="wantToRead">
          <h4>Want to read</h4>
          <WantToRead
            updateShelf={props.updateShelf}
            wantBooks={props.allBooks.filter((b) => b.shelf === "wantToRead")}
          />
        </div>
        <div className="read" id="read">
          <h4>Read</h4>
          <Read
            updateShelf={props.updateShelf}
            readBooks={props.allBooks.filter((b) => b.shelf === "read")}
          />
        </div>
      </DragDropContext>
      <div className="searchIcon">
        <Link to="/search">
          <FontAwesomeIcon icon={faSearch} className="mx-2" />
        </Link>
      </div>
    </div>
  );
}
