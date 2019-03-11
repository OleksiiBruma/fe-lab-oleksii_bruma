import React from 'react';
import BookCard from "../bookCard/bookCard"
import MyBooks from "../myBooks/myBooks";

const BooksShelf = (props) => {


  return (
      <div className="search-result">
        <div className="container">
        <h2>Search result:</h2>
        <ul>
          {
            props.books.map(book => {
              return <BookCard
                  key={book.id}
                  title={book.volumeInfo.title}
                  subtitle={book.volumeInfo.subtitle}
                  image={book.volumeInfo.imageLinks.thumbnail}
                  description={book.volumeInfo.description}
                  date={book.volumeInfo.publishedDate}
                  author={book.volumeInfo.authors}
                  id={book.id}
                  addUserBooks={props.addUserBooks}/>
            })
          }
        </ul>
        </div>
          <div className="container">
        <h2>My books:</h2>
        <ul>
          {
            props.userBooks.map(book => {
              return <MyBooks
                  key={book.id}
                  title={book.volumeInfo.title}
                  subtitle={book.volumeInfo.subtitle}
                  image={book.volumeInfo.imageLinks.thumbnail}
                  description={book.volumeInfo.description}
                  date={book.volumeInfo.publishedDate}
                  author={book.volumeInfo.authors}
                  id={book.id}
                  deleteUserBooks={props.deleteUserBooks}/>
            })
          }
        </ul>
      </div>
      </div>
  )

};

export default BooksShelf;