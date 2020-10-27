import React from 'react';
import './canvas.css';

import Quote from './quoteBox/quote/quote.jsx'
import SwitchQuote from './quoteBox/links/SwitchQuote.jsx'


const quoteMachine = [
  {
    quote: "Action is the foundational key to all success",
    author: 'Pablo Picasso',
  },
  {
    quote: 'The best years of your life are the ones in which you decide your problems are your own. You do not blame them on your mother, the ecology, or the president. You realize that you control your own destiny.',
    author: 'Albert Ellis'

  },
  {
    quote: 'Success is going from failure to failure without losing enthusiasm',
    author: 'Winston Churchill',
  },
  {
    quote: 'Love many things, for therein lies the true strength, and whosoever loves much performs much, and can accomplish much, and what is done in love is done well.',
    author: 'Vincent Van Gogh'
  },
  {
    quote: 'Follow effective actions with quiet reflection. From the quiet reflection will come even more effective action.',
    author: 'Peter Drucker'
  },
  {
    quote: 'However difficult life may seem, there is always something you can do and succeed at.',
    author: 'Stephen Hawking'
  },
  {
    quote: 'Success is a lousy teacher. It seduces smart people into thinking they can\'t lose.',
    author: 'Bill Gates'
  },
  {
    quote: 'A person with a new idea is a crank until the idea succeeds.',
    author: 'Mark Twain'
  }
]


const colors = [
  'brown', 'salmon', 'seablue', 'green', 'darkgreen', 'purple', 'seagreen', 'red', 'tomato', 'orange'
]

class Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quote: quoteMachine[0].quote,
      author: quoteMachine[0].author,
      color: colors[0]
    }
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    let quoteIndex = Math.floor(Math.random() * quoteMachine.length);
    let colorIndex = Math.floor(Math.random() * colors.length);
    this.setState({
      quote: quoteMachine[quoteIndex].quote,
      author: quoteMachine[quoteIndex].author,
      color: colors[colorIndex]
    })
  }

  render() {
    return (
      <div style={{ backgroundColor: this.state.color }} className="canvas__general">
        <div id="quote-box">
          <Quote quote={this.state.quote} color={this.state.color} author={this.state.author} />
          <SwitchQuote color={this.state.color} click={this.clickHandler} />
        </div>
      </div>
    )
  }

}

export default Canvas;