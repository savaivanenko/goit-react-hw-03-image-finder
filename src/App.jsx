import React from 'react'; 
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

export default class App extends React.Component {
  state = { 
    searchValue : '',
  }   

  handleFormSubmit = searchValue => {
    this.setState({ searchValue })
  } 
 
  render() {
    return (
      <div>
     
        <Searchbar onSubmitToApp={this.handleFormSubmit}/>
        <ImageGallery searchValue={this.state.searchValue}/>
       
        {/* <ToastContainer
          position="top-right"
          autoClose={5000} />         */}
  
      </div>
    )
  }  
}
