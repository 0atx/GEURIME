import React from 'react';
import logo from './logo.svg';
import './App.css';
import Btn from 'components/common/Btn';
import ChangeBtn from 'components/common/ChangeBtn'
import NavBar from 'components/nav/NavBar';

function App() {
  return (
    <div className="App">
      <Btn onClick={() => { console.log("click")}}>클릭</Btn>
      <ChangeBtn bgColor='red' fontColor='blue'>클릭2</ChangeBtn>
      <NavBar></NavBar>
    </div>
  );
}

export default App;
