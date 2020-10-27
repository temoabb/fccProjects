import React from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './Length.css'

const Length = (props) => (
  <div className="length__card">

    <div id={props.idType} style={{ textAlign: 'center' }} >{props.type} LENGTH</div>

    <div className="length__card__control">

      <button id={props.decBtn} onClick={props.decrement} className="length__card__button">
        -
      </button>

      <div className="control__number" id={props.defaultBreak}>
        {props.duration}
      </div>

      <button id={props.incBtn} onClick={props.increment} className="length__card__button">
        +
      </button>

    </div>
  </div>
)

// type, idType


export default Length;