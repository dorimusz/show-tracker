import './App.css';
import React from 'react';
import NumberPresenter from './NumberPresenter';
import NumberModifier from './NumberModifier';
import { useCounter } from './CounterProvider';

function App() {
  // const [value, setValue] = useState(0); //no need 
  const { value, decrement, increment } = useCounter(); //ez nem a valuet adja vissza listaként két elemmel, hanem a useContext object értékét/valueját adja vissza, amin rajta van a value, decrement és increment

  return (

    <div className="App">
      <h1>Change the value by clicking the buttons</h1>
      <p>{value}</p>
      <button onClick={decrement}>+</button>
      <button onClick={increment}>-</button>

      <NumberPresenter />
      <NumberModifier />


    </div>

  );
}

export default App;
