import './App.css';
import {Component} from 'react'

// import FirstComponent from './components/learning-examples/FirstComponent'
// import SecondComponent from './components/learning-examples/SecondComponent'
// import ThirdComponent from './components/learning-examples/ThirdComponent'
// import FourthComponent from './components/learning-examples/FourthComponent'

import LearningComponent  from './components/learning-examples/LearningComponent';
import CounterButton from './components/conter/Counter';

function App() {
  return (
    <div className="App">
        <CounterButton></CounterButton>
      
    </div>
  );
}


export default App;
