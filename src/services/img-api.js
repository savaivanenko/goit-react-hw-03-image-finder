
const fetchImg = ( {nextSearch, currentPage, }) => {
  const  apiKey = "18829521-149535e09ae4dfbd453ab9183";
  const url = `https://pixabay.com/api/?q=${nextSearch}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;
 
  return fetch(url)
    .then(response => {
      if (response.ok) { return response.json()}
      this.setState({status: 'rejected'})
    })  
  }

export default { fetchImg }  