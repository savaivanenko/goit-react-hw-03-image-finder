import React from 'react';
import { toast } from 'react-toastify' 
// import { v4 as uuidv4 } from 'uuid';

class Searchbar extends React.Component{
  state = { 
    searchValue : ''
  }

  handleChange = event =>{
    const { value} = event.target;
    this.setState({searchValue: value})
  }
  handleSubmit = event =>{
    event.preventDefault ();

    if (this.state.searchValue.trim() === ''){
      toast.error("Введите что-либо");
      return;
    }
      
    this.props.onSubmitToApp(this.state.searchValue)
    this.setState({searchValue: ''})
  }

  render (){

    return(
      <header className="Searchbar">
        <form onSubmit={this.handleSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={this.state.searchValue} 
            onChange={this.handleChange}
          />
        </form>
      </header>
    )
  }
}

export default Searchbar