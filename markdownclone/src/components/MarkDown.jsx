import React from 'react'
import './markdown.css'

let marked = require('marked');

const defaultValue = `
  **This is bold text**
  
  # This is heading 1
  ## And this is h2.
  ### I can use h3 too
  #### And also h4.


  > This is a block quote.

  * li *
  * li -
  + li +
  - li 
  - list


  [This is a link.](www.youtube.com)

  Inline styles - \`<div></div>\`. I can make words **bold** too.

  



  \`\`\`
    let markDownPrev = 1;

    <h2 className="headings">Textarea here</h2>
    <textarea
       id="editor"
       value={this.state.text} 
       onChange={this.handleChange} />
         
    let justAVariable = 2
    <section>
      <div>
    </section>
    
  \`\`\`

  ![harry_ronn_hermione](https://64.media.tumblr.com/5839570ff3b3c244919292bda766dc28/tumblr_p40hzrcAIR1ul3foto1_1280.png)

`




class MarkDown extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: defaultValue
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      text: event.target.value
    })
  }


  render() {
    const { text } = this.state

    return (
      <div className="markdown__container">

        <h1 className="main__heading">You can type anything in textarea and you'll see it at preview</h1>
        <div className="textarea__and__preview">
          <div className="textarea__div">
            <h2 className="section__headings">Textarea here:</h2>
            <textarea id="editor" value={this.state.text} onChange={this.handleChange} />
          </div>
          <div className="preview__div">
            <h2 className="section__headings">Preview here:</h2>
            <div id="preview" dangerouslySetInnerHTML={{ __html: marked(text, { breaks: true }) }} />
          </div>
        </div>

      </div>

    )
  }
}

export default MarkDown
