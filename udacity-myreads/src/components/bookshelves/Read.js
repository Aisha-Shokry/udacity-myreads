import React from "react";
import { Row, Col } from "antd";
import BookCard from "../BookCard";
import { Droppable } from "react-beautiful-dnd";

export default function Read(props) {
  return (
    <Droppable droppableId="read">
      {(provided) => (
        <div ref={provided.innerRef} className="bookShelfPage" id="read">
          {props.readBooks.length > 0 ? (
            <Row justify="center">
              {props.readBooks.map((book, index) => (
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
