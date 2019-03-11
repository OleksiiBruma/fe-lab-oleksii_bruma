import React, {Component} from 'react';
import Search from './Search'
import SearchResult from "./searchResult"
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchField: ""
    };
    this.searchBooks = this.searchBooks.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.storeBooks =  this.storeBooks.bind(this);
    this.parseJSON = this.parseJSON.bind(this);
  }

  searchBooks(e) {
    e.preventDefault();
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.searchField}`, {
      method: 'get',
      headers: {
        'Content-Type': 'text/html'
      },
      success: function(response) {
        console.log(response)
      }
    }).then(this.parseJSON)
        .then(this.storeBooks)

  }
  parseJSON(response){
    if (response.status === 200 ) {
      const data = response.json();
      return data
    }
  }
  storeBooks(data){
    console.log(data.items);
    this.setState({books:[...data.items]});

  }


  handleSearch = (e) => {
    console.log(e.target.value);
    this.setState({searchField: e.target.value})
  };

  render() {
    return (
        <div className="App">
          <Search searchBooks={this.searchBooks} handleSearch={this.handleSearch}/>
          <SearchResult books={this.state.books}/>
        </div>
    );
  }
}

export default App;
