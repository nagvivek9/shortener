import React from 'react';
import './App.css';

class App extends React.Component {
 constructor(props) {
  super(props);
  this.props=props;
 }
 render() {
  return (
   <div className="App">
    <h3>
      Welcome to short.com
    </h3>
    <br></br>
    <div>Please enter your URL here</div>
    <div id="container_url">
     <input type="text" id="txt_url"/>
     <input type="button" value="SHORTEN"/>
    </div>
   </div>
 );
 }
}

export default App;
