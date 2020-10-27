import React from 'react';
import './SwitchQuotes.css'

const SwitchQuote = (props) => {
  return (
    <div className="main">
      <div className="main__links">
        <a id="tweet-quote" href="twitter.com/intent/tweet"><img style={{ width: 50, height: 50 }} src="https://www.iconfinder.com/data/icons/twitter-ui-flat/48/Twitter_UI-05-512.png" alt=" twitter logo" ></img></a>
        <a href="twitter.com/intent/tweet"><img style={{ width: 50, height: 50 }} src="https://lh3.googleusercontent.com/proxy/hKUGWLSQdgiylopy7nv649eE3-ue-q9VSHwPWanbP3dvNokN-CM0vdM80yre0HiPHuW8Syiqr3X338yXMRYP9Dt6K-e0gamyEptkpDA57G9XE4C1w1o" alt=" twitter logo" ></img></a>
      </div>
      <button id="new-quote" className='quote__button' onClick={props.click} style={{ color: props.color, border: '1px solid ' + props.color }}>New quote</button>
    </div>
  )
}




export default SwitchQuote;