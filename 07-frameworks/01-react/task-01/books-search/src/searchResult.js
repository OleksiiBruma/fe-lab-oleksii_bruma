import React from 'react';
import BookCard from "./bookCard"

const SearchResult = (props) => {

  return (
      <div className="search-result">
        <h2>Search result:</h2>
        <ul>
          {
            props.books.map(book => {
              console.log(book);
              return <BookCard
                  title={book.volumeInfo.title}
                  subtitle={book.volumeInfo.subtitle}
                  image={book.volumeInfo.imageLinks.thumbnail}
                  description={book.volumeInfo.description}
                  date={book.volumeInfo.publishedDate}
                  author={book.volumeInfo.authors}/>
            })
          }
        </ul>
      </div>
  )

};

export default SearchResult;