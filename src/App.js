import React, { Component } from 'react';
import DragSort from './DragSort'

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {val: 'apple'},
        {val: 'banana'},
        {val: 'pear'},
        {val: 'orange'},
        {val: 'tomato'},
        {val: 'test'}
      ],
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
        key={item.val}
      >{item.val}</div>)
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


