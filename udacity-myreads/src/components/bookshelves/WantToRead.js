import React from "react";
import { Row, Col } from "antd";
import BookCard from "../BookCard";
import { Droppable } from "react-beautiful-dnd";

export default function WantToRead(props) {
  return (
    <Droppable droppableId="wantToRead">
      {(provided) => (
        <div ref={provided.innerRef} className="bookShelfPage" id="wantToRead">
          {props.wantBooks.length > 0 ? (
            <Row justify="center">
              {props.wantBooks.map((book, index) => (
                <Col lg={{ span: 4 }} sm={{ span: 24 }} key={book.id}>
                  <BookCard
                    book={book}
                    updateShelf={props.updateShelf}
                    myIndex={index}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
              No books available right now
            </p>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
