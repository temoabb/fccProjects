import React from 'react';
import './calc.css'

let emptyArr = [];
let indexOfMinus = null;
let watchDecimals = false;

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      value: "0",
      evaluate: '',
      useMinus: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleContinue = this.handleContinue.bind(this);
    this.handleEmptiness = this.handleEmptiness.bind(this);
    this.handleZeroCheck = this.handleZeroCheck.bind(this);
  }



  handleClear() {
    emptyArr = [];
    indexOfMinus = null;
    watchDecimals = false;

    this.setState({
      value: "0",
      input: '',
      evaluate: '',
      useMinus: false
    })


  }

  handleClick(digit) {

    if (digit === "0" && this.state.value === "0" && this.state.input === "0") {
      alert("You cant type so many Zeros at the beginning! Watch out!")
    } else {
      if (watchDecimals && (digit === "-" || digit === "+" || digit === "*" || digit === "/")) {
        watchDecimals = false;
      }
      // რა ხდება ციფრების აკრეფისას:
      // რა უნდა გამოჩნდეს value-ს ველში ციფრების აკრეფის პროცესში:
      let display;
      if (digit === '*' || digit === '-' || digit === '+' || digit === '/') {
        display = digit;
      } else {
        let currentValue = this.state.value;
        if (currentValue === "0") {
          display = digit
        } else {
          let toStr = currentValue.toString();
          let spl = toStr.split('');
          if (spl[0] === "/" || spl[0] === "*" || spl[0] === "-" || spl[0] === "+") {
            spl.splice(0, 1);
            spl.push(digit);
            spl.join('');
            display = spl
          } else {
            let numb = currentValue + digit;
            display = numb.toString();
          }
        }
      }

      if (this.state.useMinus) {
        let regex = /[-+*/]/
        let test = regex.test(digit);
        let split = [...this.state.evaluate.split('')];
        console.log('split', split);
        let lastEl = split[split.length - 1];
        let test_2 = regex.test(lastEl);

        if (test && test_2) {
          let spread = [...split.slice(0, split.length - 2), digit];
          let joined = spread.join('')

          this.setState(prevState => ({
            input: joined,
            value: display,
            evaluate: joined,
            useMinus: false
          }))
        } else if (test) {
          let newArr = [...split.slice(0, indexOfMinus + 1), "(", "-", ...emptyArr, ")", digit];
          console.log('newArr', newArr);
          let joined = newArr.join('');
          console.log('joined', joined)
          this.setState({
            input: joined,
            value: display,
            evaluate: joined,
            useMinus: false
          })
          indexOfMinus = null;
          emptyArr = []
        } else {
          emptyArr.push(digit)
          this.setState(prevState => ({
            input: prevState.input + digit,
            evaluate: prevState.evaluate + digit,
            value: display
          }))
        }
      } else {
        let joined;

        //თუ საწყისი მდგომარეობაა კალკულატორზე (ანუ როცა არაფერი გვაქვს აკრეფილი, ინფუთ ცარიელი, ველიუ 0) [0, +, -, /, *, )] - აქედან ერთ-ერთზე დაჭერის შემთხვევაში ამოაგდებს რომ არასწორი ქმედებაა და არაფერიც აღარ გაგრძელდება!
        if (this.state.input === '' && this.state.value === "0" && (digit === '+' || digit === '/' || digit === '*' || digit === ')')) {
          this.handleClear();
          alert('Invalid move!');

          // და თუ ასე არ არის, წავიდა:

        } else {
          // ვადგენთ ბოლო აკრეფილი სიმბოლო არის თუ არა -, *, +, / სიმბოლოებიდან ერთ-ერთი:
          let currentEval = this.state.evaluate.split('');
          let lastElem = currentEval[currentEval.length - 1];
          let regex = /[*-/+]/;
          let test = regex.test(lastElem);

          // თუ უკანასკნელად აკრეფილია [ - + /  * ] -დან ერთ-ერთი და,ამასთან, მიმდინარე სიმბოლო კვლავ ერთ-ერთია [ - + / * ]  სიმბოლოებიდან, მაშინ წინა გამოსახულებიდან ვჭრით ბოლო სიმბოლოს და ვანაცვლებთ ახლით:
          if (test && (digit === '+' || digit === '/' || digit === '*')) {
            let spread = [...this.state.evaluate.split('')];

            // ვსპრედავთ ყველას ბოლო წევრამდე და ვამატებთ ახალს:
            let sliced = [...spread.slice(0, spread.length - 1), digit];

            // ვაწებებთ მიღებულ გამოსახულებას, გადავაწერთ ზემოთ გამოცხადებულ join-ს და შევიტანთ evaluate-ში სტეიტში:
            joined = sliced.join('');

            // ვცვლით სტეიტს:
            this.setState(prevState => ({
              //ინფუთში მთლიანად ჩნდება აკრეფილი გამოსახულება, არ აქვს მნიშვნელობა რა ემატება რა არ ემატება ??
              input: joined,
              // ველიუში ზემოთ განსაზღვრული დისპლეი შეინახება. ამას არ ეხება თვლის ლოგიკა, ეს უბრალოდ ვიზუალურად გიჩვენებს აკრეფისას რა ხდება:
              value: display,
              // აქ კი გამზადებულია გამოსახულება, რაც უნდა გამოითვალოს, ფარდის მიღმა:
              evaluate: joined
            }))
            console.log('evaluate symbol', this.state.evaluate);

            // აქ ვარ გაჩერებული ======================================================================================================================

          } else if (test && digit === "-") {

            this.setState(prevState => ({
              input: prevState.input + digit,
              value: display,
              evaluate: prevState.evaluate + digit,
              useMinus: true
            }))
            indexOfMinus = this.state.evaluate.split('').length - 1;
            // console.log('evaluate minus', this.state.evaluate);
          } else {
            // ზემოთ ყველაფერი შესრულდება იმ შემთხვევაში, თუ ბოლო წევრი [- + * /] -დან ერთ-ერთი იყო და ახალი ასევე მათგან ერთ-ერთი;
            // თუ ასე არ არის, მაშინ evaluate და input იდენტური გამოსახულება იქნება.
            this.setState(prevState => ({
              input: prevState.input + digit,
              value: display,
              evaluate: prevState.evaluate + digit
            }))
            // console.log('evaluate normal', this.state.evaluate);
          }
        }
      }
    }


  }

  handleAnswer() {
    let forSplit = this.state.input;
    let splitted = forSplit.split('');
    let lastChar = splitted[splitted.length - 1];
    if (lastChar === '*' || lastChar === '-' || lastChar === '+' || lastChar === '/') {
      alert('Watch out! Looks like your calculations are unfinished!')
    } else {
      let answer = eval(this.state.evaluate);
      this.setState({
        value: answer,
        input: '',
        evaluate: ''
      })
    }
  }

  handleZeroCheck() {
    if (this.state.value === "0" && this.state.input === "0") {
      alert("You cant type multyple zero!")
    }
  }

  handleContinue(dig) {
    if (this.state.input === '' && this.state.value) {
      this.setState({
        input: this.state.value + dig,
        evaluate: this.state.value + dig,
        value: dig
      })
    }
  }

  handleDecimalCheck() {
    if (this.state.input === "" && this.state.value === "0") {
      this.setState({
        input: "0" + ".",
        value: "0.",
        evaluate: "0."
      })
      watchDecimals = true;
    } else {

      if (!watchDecimals) {
        let currentEvaluate = this.state.evaluate;
        let splitted = currentEvaluate.split('');
        let lastSplitted = splitted[splitted.length - 1];
        if (lastSplitted === '+' || lastSplitted === '-' || lastSplitted === '*' || lastSplitted === '/') {
          let spread = [...splitted, "0."];
          let joined = spread.join("");
          this.setState(prevState => ({
            input: joined,
            evaluate: joined,
            value: "0."
          }))
          watchDecimals = true;

        } else {
          this.setState(prevState => ({
            input: prevState.input + ".",
            evaluate: prevState.evaluate + ".",
            value: prevState.value + "."
          }))
          watchDecimals = true;
        }
      }
    }
  }


  handleEmptiness() {
    if (this.state.value === '0' && this.state.input === '') {
      alert("Invalid!");
      this.handleClear();
    }
  }




  render() {
    return (
      <div className="machine">
        <div className="display__section">
          <div className="display__input">{this.state.input}</div>
          <div id="display" className="display__value">{this.state.value}</div>
        </div>
        <div className="actions">
          <button onClick={this.handleClear} id="clear" className="actions-btn">CE</button>
          <button onClick={() => this.handleClick("(")} className="actions-btn">(</button>
          <button onClick={() => this.handleClick(')')} className="actions-btn">)</button>
          <button onClick={() => { this.handleClick("*"); this.handleContinue('*'); }} id="multiply" className="actions-btn">X</button>
          <button onClick={() => this.handleClick("7")} id="seven" className="actions-btn">7</button>
          <button onClick={() => this.handleClick("8")} id="eight" className="actions-btn">8</button>
          <button onClick={() => this.handleClick("9")} id="nine" className="actions-btn">9</button>
          <button onClick={() => { this.handleClick("/"); this.handleContinue('/'); }} id="divide" className="actions-btn">/</button>
          <button onClick={() => this.handleClick("4")} id="four" className="actions-btn">4</button>
          <button onClick={() => this.handleClick("5")} id="five" className="actions-btn">5</button>
          <button onClick={() => this.handleClick("6")} id="six" className="actions-btn">6</button>
          <button onClick={() => { this.handleClick("-"); this.handleContinue('-'); }} id="subtract" className="actions-btn">-</button>
          <button onClick={() => this.handleClick("1")} id="one" className="actions-btn">1</button>
          <button onClick={() => this.handleClick("2")} id="two" className="actions-btn">2</button>
          <button onClick={() => this.handleClick("3")} id="three" className="actions-btn">3</button>
          <button onClick={() => { this.handleClick("+"); this.handleContinue('+'); }} id="add" className="actions-btn">+</button>
          <button onClick={() => this.handleClick("0")} id="zero" className="actions-btn">0</button>
          <button onClick={() => this.handleDecimalCheck()} id="decimal" className="actions-btn">.</button>
          <button onClick={() => { this.handleAnswer(); this.handleEmptiness() }} id="equals" className="actions-btn equal">=</button>
        </div>
      </div>
    )
  }
}


export default Calculator;