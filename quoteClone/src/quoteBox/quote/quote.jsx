import React from 'react';
import './Quote.css';

const Quote = (props) => {
  return (
    <div className="mainn" style={{ color: props.color }}>
      <div className="main__text__div"><h2 id='text'>"{props.quote}</h2></div>
      <div id='author'><h3> - {props.author}</h3></div>
    </div>
  )
}



export default Quote;