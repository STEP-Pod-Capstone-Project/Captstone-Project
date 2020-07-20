import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import CreateList from './CreateList'
import '../styles/Book.css';

const addBookToBookList = async (book, bookList) => {

  const bookListUpdate = {
    id: bookList.id,
    add_gbookIDs: book.id,
  }

  // Update BookList in Firebase
  fetch('/api/booklist', {
    method: "PUT",
    body: JSON.stringify(bookListUpdate),
  }).catch(err => alert('BookList could not be updated: ' + err));

  //TODO: #85 disable dropdown button for club when book is already in list
}

const BookListAddDropdown = ({ book, bookLists, updateBookLists }) => {
  if (bookLists.length > 0) {
    return (
      <DropdownButton id='button-list-add' className='dropdown-add btn-margin center-horizontal'
        title='Add to List'>
        {
          bookLists.map(bookList =>
            <Dropdown.Item key={bookList.id}
              onSelect={() => addBookToBookList(book, bookList)}>
              {bookList.name}
            </Dropdown.Item>
          )
        }
      </DropdownButton>
    );
  } else {
    return (
      <CreateList id='button-list-add' updateBookLists={updateBookLists} className='dropdown-add'
        btnStyle='btn btn-success btn-margin center-horizontal' />
    );
  }
}

export { BookListAddDropdown };