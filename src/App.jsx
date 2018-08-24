import React, { Component } from 'react';
import './App.css';

const API = 'http://127.0.0.1:8081/countries';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
     items: [],
     currentlyDisplayed: [],
     }
     this.updateState = this.updateState.bind(this);
  };
  updateState(e) {
     this.setState({listItems: e.target.value});
  }
  componentDidMount() {
    fetch(API)
    .then(response => response.json())
    .then(data => this.setState({items:this.sortList(data), currentlyDisplayed:this.sortList(data)}));
  }
  sortList(list){
    return list.sort(function(a,b) {
      if(a.name<b.name) return -1;
      if(a.name>b.name) return 1;
      return 0;
    })
  }
  filterList(event){
    var updatedList = this.state.items;
    updatedList = updatedList.filter(function(item){
      return item.name.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({currentlyDisplayed: updatedList});
  }
  render() {
    return (
       <div>
          <input name="searchItem" type="text" placeholder="Search" onChange={this.filterList.bind(this)}/>
          <ul>
            {this.state.currentlyDisplayed.map(function(item) {
              return <li key={item.name}>{item.name}</li>
            })}
          </ul>
        </div>
    )
 }
}

export default App;