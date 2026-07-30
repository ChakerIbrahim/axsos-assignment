import { useState } from 'react';
import useList from './useList';

export default (initialList = [])=> {
  const [list, setList] = useState(initialList);

  function add(str) {
    setList([...list, str]);
  }

  function remove(index) {
    setList([
      ...list.slice(0, index),
      ...list.slice(index +1)
    ]);
  }

  return {
    list,
    add,
    remove
  };
}

export default () => {
  const [val, setVal] = useState('');
  const {list, add } =useList(['first', 'second']);


  function handleSubmit() {
    add(val);
    setVal('');
  }

  return (
    <>
      {list.map((item, i) => <p key={i}> {item}</p>)}
      <input 
        onChange={e => setVal(e.target.value)}
        value={val}
        />
        <button onClick={handleSubmit}>Add</button>
    </>
  )
}

const myArray = doSomething();
doSomethingToMyArray(myArray);
console.log("This message will wait until the above lines complete")

const noMondays = new Promise( (resolve, reject) => {
  if(new Date().getDay()!==1) {
    resolve("Good, it's not Monday!");
  }else{
    reject("Someone has a case of the Mondays!");
  }
});
noMondays
    .then(res => console.log(res))
    .catch( err => console.log(err));

    fetch("http://www.example.com")
      .then(response => {

      }).catch(err => {
        console.log(err);
      })

      let response = await fetch("http:/www.example.com");