import React from 'react';

export default class Button extends React.Component{
  scroll = () => {
    this.props.onClick();
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 1000);
  }
  render(){
    return(
      <button onClick={this.scroll} type='button' className='Button'>Load more</button> 
    )
  }

}  