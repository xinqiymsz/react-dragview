import React, { Component } from 'react';
import DragSort from './DragSort'
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      list: [{name: 'title'},{name: 'name'},{name: 'code'},{name: 'email'}, {name: 'lala'}, {name: 'olol'}],
    }
  }

  handleDragMove = (data, from, to) => {
    console.log(data);
  }

  handleDragEnd = () => {
   
  }

  renderRowItem = (item, index) => {
    return (
      <div
        style={{
          height: '35px',
          lineHeight: '30px',
          backgroundColor: '#eee',
          margin: '10px'
        }}
        key={item.name}
      >{item.name}</div>)
  }

  render() {
    return (
      <div>
        <h3>react-drag</h3>
  
        <DragSort
          onDragEnd={this.handleDragEnd}
          onChange={this.handleDragMove}
          data={this.state.list}
          renderRowItem={this.renderRowItem}
          activeColor='#e6f7ff'
        />
      </div>
    )
  }
  
}

export default App;


