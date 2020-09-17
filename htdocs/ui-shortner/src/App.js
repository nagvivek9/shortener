import React from 'react';
import './App.css';

class App extends React.Component {
 constructor(props) {
  super(props);
  this.props=props;
  this.state={
   txt_url:''
  };
 }

 handleChange = ({ target }) => {
  this.setState({ txt_url: target.value });
 };

 render() {
  return (
   <div className="App">
    <h3>
      Welcome to short.com
    </h3>
    <br></br>
    <div>Please enter your URL here</div>
    <div id="container_url">
    <input type="text" id="txt_url" value={this.state.txt_url} onChange={this.handleChange.bind(this)}/>
     <input type="button" value="SHORTEN"/>
    </div>
   </div>
 );
 }
}

export default App;
