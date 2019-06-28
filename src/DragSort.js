import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

let curDragIndex = null;

class DragSort extends React.Component {

  constructor(props) {
    super();
    this.state = {
      data: props.data
    }
    this.originalBackgroundColor = '' // 原始背景色
  }

  arrMove = (arr, fromIndex, toIndex) => {
    arr = [].concat(arr);
    let item = arr.splice(fromIndex, 1)[0];
    arr.splice(toIndex, 0, item);
    return arr;
  }

  onChangeData = (from, to) => {
    const { data } = this.state;
    const { onChange, activeColor } = this.props;

    if (from === to) return;
    let curValue;

    curValue = data;
    let newValue = this.arrMove(curValue, from, to);
    this.setState({ data: newValue });
    if (typeof onChange === 'function') onChange(newValue, from, to);
    curDragIndex = to;
    let senderName = ReactDOM.findDOMNode(this.refs[`x${from}`]);
    if (!this.originalBackgroundColor) {
      this.originalBackgroundColor = senderName.style.backgroundColor;
    }
    
    senderName.style.backgroundColor = activeColor;
  };

  onDragEnd = () => {
    const { onDragEnd } = this.props;
    let senderName = ReactDOM.findDOMNode(this.refs[`x${curDragIndex}`]);
    senderName.style.backgroundColor = this.originalBackgroundColor;
    curDragIndex = null;
   
    if (typeof onDragEnd === 'function') onDragEnd();
  }

  render() {
    const { data } = this.state;
    const { renderRowItem } = this.props;
    return (
      <div>
        {data.map((item, index) => {
          return React.cloneElement(renderRowItem(item, index), {
            draggable: "true", 
            ref: `x${index}`,
            onDragStart: () => { curDragIndex = index },
            onDragEnter: () => this.onChangeData(curDragIndex, index),
            onDragEnd: this.onDragEnd,
          })
        })}
      </div>
    );
  }
}

DragSort.propTypes = {
  onChange: PropTypes.func,
  onDragEnd: PropTypes.func,
  data: PropTypes.array,
  renderRowItem: PropTypes.func, 
  activeColor: PropTypes.string // 目标位置的激活色
}

DragSort.defaultProps  = {
  onChange: () => {},
  onDragEnd: () => {},
  data: [],
  renderRowItem: () => {},
  activeColor: '#e6f7ff'
}

export default DragSort;

