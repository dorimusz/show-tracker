import './App.css';
import React, { useState } from 'react';
import NumberPresenter from './NumberPresenter';
import NumberModifier from './NumberModifier';

function App() {
  const [value, setValue] = useState(0);

  return (
    <div className="App">
      <h1>Change the value by clicking the buttons</h1>
      <p>{value}</p>
      <button onClick={() => setValue(value + 1)}>+</button>
      <button onClick={() => setValue(value - 1)}>-</button>

      <NumberPresenter value={value} />
      <NumberModifier increment={() => setValue(value + 1)} decrement={() => setValue(value - 1)} />
    </div>
  );
}

export default App;
