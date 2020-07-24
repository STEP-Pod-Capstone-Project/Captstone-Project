import React, { Component } from 'react';
import '../App.css';

import BookSearchTile from './BookSearchTile';

class BookSearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    }
  }

  getData = () => {
    fetch(`https://8080-bbaec244-5a54-4467-aed6-91c386e88c1a.ws-us02.gitpod.io/api/search?searchTerm=${this.props.searchQuery}`)
      .then(response => response.json())
      .then(booksResult => this.setState({ books: booksResult }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div>
        {
          this.state.books.map(book =>
            <BookSearchTile book={book} bookLists={this.props.bookLists} updateBookLists={this.props.updateBookLists} key={book.id} />
          )
        }
      </div>
    );
  }
}


export default BookSearchList;