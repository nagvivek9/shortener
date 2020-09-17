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

 shortenit() {
  if(!this.state.txt_url||(this.state.txt_url.indexOf('http://')==-1&&this.state.txt_url.indexOf('https://')==-1))
   return alert('Invalid URL, Should have http(s) in the URL');

  console.log('Now we can go for API call');
 };

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
    <input type="button" value="SHORTEN" onClick={this.shortenit.bind(this)}/>
    </div>
   </div>
 );
 }
}

export default App;
