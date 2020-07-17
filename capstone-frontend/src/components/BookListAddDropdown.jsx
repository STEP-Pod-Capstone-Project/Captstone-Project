import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import CreateList from './CreateList'
import '../styles/Book.css';

const addBookToBookList = async (bookId, bookListJson) => {

  const bookListUpdateJson = {
    "id": bookListJson.id,
    "add_gbookIDs": bookId,
  }

  // Update BookList in Firebase
  fetch("/api/booklist", {
    method: "PUT",
    body: JSON.stringify(bookListUpdateJson)
  });
}

const BookListAddDropdown = ({ book, bookLists, updateBookLists }) => {
  if (bookLists.length > 0) {
    return (
      <DropdownButton id="button-list-add" className="dropdown-add" title="Add to List">
        {
          bookLists.map(bookList =>
            <Dropdown.Item key={bookList.id}
              onSelect={() => addBookToBookList(book.id, bookList.id)}>
              {bookList.name}
            </Dropdown.Item>
          )
        }
      </DropdownButton>
    );
  } else {
    return (
      // <DropdownButton id="button-list-add" className="dropdown-add" title="No Lists Found" variant="warning">
      //   {
      //     <Dropdown.Item id="create-booklist-search">
      <CreateList id="button-list-add" updateBookLists={updateBookLists} btnStyle="btn btn-warning btn-margin" />
      //     </Dropdown.Item>
      //   }
      // </DropdownButton>
    );
  }
}

export default BookListAddDropdown;