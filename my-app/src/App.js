import React, {useState, useEffect} from 'react';
import projectCard from './projectCard';
// import axios from 'axios';
import './App.css';

function App() {
// const [data, setData] = useState([])

// useEffect(() => {
//   axios
//   .get('https://node-api-challenge.herokuapp.com/projects')
//   .then(res => {
//     console.log(res)
//     setData(res)
//   })
//   .catch(err => {
//     console.log(err)
//   })
// }, [])

  return (
    <div className="App">
      <header className="App-header">
        {/* <projectCard projects = {data} /> */}
      </header>
    </div>
  );
}

export default App;
