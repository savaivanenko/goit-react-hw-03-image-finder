import React from 'react';
import ImageGalleryItem from './ImageGalleryItem'
import Modal from './Modal'
import Button from './Button'
import ImgApi from '../services/img-api'

export default class ImageGallery extends React.Component{
  state = {
    images: [],
    currentPage : 1,
    status: 'idle',
    currentImageUrl: null,
    showModal : false,
}
  
  componentDidUpdate(prevProps, prevState) {

    const prevSearch = prevProps.searchValue;
    const nextSearch = this.props.searchValue;
    let currentPage = this.state.currentPage;

    if (prevSearch !== nextSearch || prevState.currentPage !== currentPage){
      this.setState({status : 'pending'})
      console.log("изменился запрос");
      
      if (prevSearch !== nextSearch){
        this.setState({images: []})
      if (prevSearch !== nextSearch){
        this.setState({currentPage: 1})
      }    
    }

      const options = {
        nextSearch, 
        currentPage,
      }  

        ImgApi.fetchImg(options)
        .then(response => {
          console.log(response);
           this.setState(state => ({
            images: [...state.images, ...response.hits]
          }))
          console.log(this.state.images);
          if (this.state.images.length === 0) {return this.setState({ status: 'rejected' })} 
          return this.setState({ status: 'resolved' })
        })
        .catch(error => this.setState({ status: 'rejected' }))        
      
      this.setState({loading: true})
      // fetchImg (this.props.searchValue)
    }
  }

  onBtnClick = () =>{
    return this.setState(state =>
      ({currentPage: state.currentPage + 1}))
  } 
 

  toggleModal = () => {
    this.setState(state => ({
      showModal : !state.showModal
    }))
  }

  HandlerOpenBigImg = (url) => {
    this.setState({ currentImageUrl: url})
    this.toggleModal();
  }

  render() {

    const { status, showModal, currentImageUrl } = this.state;

    if (status === 'idle'){
      return <div>Введите что-либо</div>
    }
    if (status === 'pending'){
      return <div>подождите загружаем</div>
    }
    if (status === 'rejected'){
      return <h1>Result not found for {this.props.searchValue}</h1>
    }
    if (status === 'resolved'){
      return(
        <>
        <ul className="ImageGallery">
          {this.state.images.map((image, key) =>
            <ImageGalleryItem 
              openBigImg={this.HandlerOpenBigImg}
              key={image.id}
              image={image}/>
          )}
        </ul>

        <Button  onClick={this.onBtnClick}/>

        { showModal &&  <Modal onClose ={this.toggleModal}>              
            <img src={currentImageUrl} alt="" /> 
          </Modal>}
        </>
      )
    }    
  }
}  