import React from 'react';

const Search = (props) => {

  return (
      <div className="search">
        <form onSubmit={props.searchBooks} action="">
          <input onChange={props.handleSearch} type="text"/>
          <button type="submit">search</button>
        </form>
      </div>
  );

};

export default Search;
