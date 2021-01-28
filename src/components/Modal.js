import React from 'react';
import { createPortal } from 'react-dom';


const modalRoot = document.querySelector('#modal-root')

export default class Modal extends React.Component{
  
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown )
  }
  
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown )
  }

  handleKeyDown = e =>{
    if(e.code === 'Escape'){
      this.props.onClose();
    }
  }

  handleOverlayClick = e => {
    if (e.currentTarget === e.target){
      this.props.onClose();
    }
  }

  render(){
    return createPortal(
      <div className="Overlay" onClick={this.handleOverlayClick}>
        <div className="Modal">
          {this.props.children}
        </div>
      </div>,
      modalRoot
    );
  }

}