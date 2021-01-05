import logo from './logo.svg';
import './App.css';
import {Shapley} from './Shapley';
import { useState } from 'react';
import { k_combinations } from './k_combinations';

// const Inputs = ({arrOfLabels}) => {
//   return arrOfLabels.map(elem => {
//       return <>
//         <label>{elem}: </label>
//         <input type="text" id={elem} value={elem}/>
//       </>
//       }
//   )
// }

// console.log("Shapley = ", Shapley())
function App() {
  let [toggleForms, setToggleForms] = useState(false)
  let [number, setNumber] = useState(0);
  let [keysValsState, setKeysValsState] = useState('');
  let [arrOfLabels, setArrOfLabels] = useState([]);
  let [shapleyVectorValue, setShapleyVectorValue] = useState('');
  let submitFormHandler = (event) => {
    event.preventDefault();
    let arrs = []
    for(let  i=1; i<= number; i++) {
      arrs.push(i)
    }
    let keysVals = {}
    for(let i=0; i < arrs.length; i++) {
      let combinations = k_combinations(arrs, arrs[i])
      for(let j=0; j < combinations.length; j++) {
        let tmp = combinations[j].join("")
        keysVals[tmp] = ""
      }
    }
    setKeysValsState(keysVals)
    setArrOfLabels(arrs)
    if(number !== 0){setToggleForms(true)}
  };
  let submitShapli = (event) => {
    event.preventDefault();
    setShapleyVectorValue((Shapley(number, keysValsState).join(", ")))
  }
  let  inputChangeHandler = (event) => {
    setNumber(event.target.value);
  };
  let inputChangeFieldsHandler = (event) => {
    let vals = keysValsState;
    vals[event.target.id] = event.target.value
    setKeysValsState(vals)
  }
  return (
    <div className="App">
      <header className="App-header">
        {!toggleForms && <form style={{display: "grid"}} onSubmit={submitFormHandler}>
          <label>Number of members: </label>
          <input style={{ margin: "0 auto", marginTop: "5px"}} type="text" id="number" value={number} onChange={inputChangeHandler}/>
          <button style={{ margin: "0 auto", marginTop: "5px", width: "50px", height: "20px"}} type="submit">Submit</button>
        </form>}
        {toggleForms && 
        <form style={{display: "grid"}} onSubmit={submitShapli}>
                  {Object.keys(keysValsState).map(elem => 
      <>
        <label>{elem}: </label>
        <input style={{ margin: "0 auto", marginTop: "5px"}} key={elem} type="text" id={elem} onChange={inputChangeFieldsHandler}/>
      </>
        )}
          <button style={{ margin: "0 auto", marginTop: "5px", width: "50px", height: "20px"}}
                         type="submit">Submit
          </button>
          {shapleyVectorValue && <div style={{ margin: "0 auto", marginTop: "5px", height: "20px"}}>{shapleyVectorValue}</div>}
        </form>
        }
      </header>
    </div>
  );
}

export default App;
