import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
// import './App.css'
import axios from 'axios';


const fruits = [

  'banana',
  'pineapple',
  'peach',
  'apple'
];

export default function FruitForm() {
  const [selectedFruit, setSelectedFruit] = useState(fruits[0]);
  const[isTasty, setIsTasty] = useState(false);

function handleSubmit(event) {
        event.preventDefault();
        console.log('The ' + selectedFruit + ' is' + (isTasty ? '' : ' not') + ' tasty!');
    }

    return (
      <form onSubmit={handleSubmit}>
        <select value={selectedFruit} onChange={e => setSelectedFruit(e.target.value)}>
          {fruits.map((fruits,idx) =>
            <option key={idx} value={fruit}>{fruit}</option>
          )}
        </select>
             <label>
                       <input type="checkbox" checked={isTasty} onChange={e => setIsTasty(e.target.checked)}/> Is it tasty?
                   </label>
          <button>Take a bite!</button>
      </form>
    );


}

const [myVal, setMyVal] = useState(");

  <option value="">Please select a value</option>
  {options.map(...)}

axios.get('http://www.example.com').then(response => {
  console.log(response);
})

const [pieceOfState, setPieceOfState] = useState('initial value here');


const Example = (props) => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/people/')
    .then(response => response.json())
    .then(response => setPeople(response.results))
  }),[];

  return (
    <div>
      {people.length > 0 && people.map((person, index) => {
        return (<div key={index}>{person.name}</div>)
      })}
    </div>
  )
}
export default Example;

useEffect(() => {
  alert("When will this run?");
}), [StaticRange.isSubmitted]);