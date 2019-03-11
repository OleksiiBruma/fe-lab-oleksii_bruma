import React from 'react';

const BookCard = (props) => {

  return (
      <li>
          <h3>{props.title}</h3>
          <h4>{props.subtitle}</h4>
        <img src={props.image} alt=""/>
          <p>{props.description}</p>
          <span>{props.date}</span>
          <span>{props.author}</span>
          <button>add</button>
        </li>

  )

};

export default BookCard;