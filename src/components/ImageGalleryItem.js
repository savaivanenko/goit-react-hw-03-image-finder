
const ImageGalleryItem = (props) => (
  <li
    onClick={() => props.openBigImg(props.image.largeImageURL)}
    className={ImageGalleryItem}>

    <img src={props.image.webformatURL}  alt="props.image.tags" 
      width='300px'
    />
  </li> 
)

export default ImageGalleryItem;
