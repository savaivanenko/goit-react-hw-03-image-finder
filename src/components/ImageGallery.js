import React from 'react';
import ImageGalleryItem from './ImageGalleryItem'
import Modal from './Modal'

export default class ImageGallery extends React.Component{
  state = {
    images: [],
    currentPage : 1,
    status: 'idle',
    currentImageUrl: null,
    showModal : false,
}
  
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue || prevState.currentPage !== this.state.currentPage){
      this.setState({status : 'pending'})
      console.log("изменился запрос");
      
      if (prevProps.searchValue !== this.props.searchValue){
        this.setState({images: []})
      if (prevProps.searchValue !== this.props.searchValue){
        this.setState({currentPage: 1})
      }    
    }
      const  apiKey = "18829521-149535e09ae4dfbd453ab9183";
      const url = `https://pixabay.com/api/?q=${this.props.searchValue}&page=${this.state.currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;
  
      const fetchImg = ()=>{
        fetch(url)
        .then(response => {
          if (response.ok) { return response.json()}
            this.setState({status: 'rejected'})
        })  
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
      }
      this.setState({loading: true})
      fetchImg (this.props.searchValue)
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

        <button type='button' onClick={this.onBtnClick} className="Button">Load more</button>
        { showModal &&  <Modal onClose ={this.toggleModal}>             
            <img src={currentImageUrl} alt="" /> 
          </Modal>}
        </>
      )
    }    
  }
}  