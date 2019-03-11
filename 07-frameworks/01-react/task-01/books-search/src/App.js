import React, {Component} from 'react';
import Search from './search/Search'
import BooksShelf from "./booksShelf/booksShelf"
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      userBooks: [],
      searchField: "",
    };
    this.searchBooks = this.searchBooks.bind(this);
    this.addUserBooks = this.addUserBooks.bind(this);
    this.deleteUserBooks = this.deleteUserBooks.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.storeBooks = this.storeBooks.bind(this);
  }

  searchBooks(e) {
    e.preventDefault();
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.searchField}`, {})
        .then((response) => response.json())
        .then(this.storeBooks)
  }

  storeBooks(data) {
    this.setState({books: [...data.items]});
  }

  addUserBooks(book) {
    if (this.state.userBooks.some((id) => book.props.id === id.id)) {
      return
    }
    this.setState({userBooks: [...this.state.userBooks, ...this.state.books.filter(id => book.props.id === id.id)]});
  }

  deleteUserBooks(book) {
    this.setState({userBooks: [...this.state.userBooks.filter(id => book.props.id !== id.id)]});
  }

  handleSearch = (e) => {
    this.setState({searchField: e.target.value})
  };

  render() {
    return (
        <div className="App">
          <Search searchBooks={this.searchBooks} handleSearch={this.handleSearch}/>
          <BooksShelf className="search-result" addUserBooks={this.addUserBooks} books={this.state.books}
                      userBooks={this.state.userBooks} deleteUserBooks={this.deleteUserBooks}/>
        </div>
    );
  }
}

export default App;
