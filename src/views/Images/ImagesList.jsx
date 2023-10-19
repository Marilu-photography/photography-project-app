import { useEffect, useState } from "react";
import { getImagesList } from "../../services/ImagesServices";
import './ImagesList.css';
import ImagesCard from "../../components/ImagesCard/imagesCard";


const ImagesList = () => {
  const [images, setImagesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getImagesList()
      .then((images) => {
        setImagesData(images);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);


  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!images.length) {
    return <p>No products found 🥺</p>;
  }

return (

  <div className="container">
  <div className="row contendor-gallery">
    <h1 className="h1-Gallery">Image Gallery</h1>

   
      {images.map((image) => (
          <div key={image._id} className="col-12 col-lg-4 col-md-6 mb-4" >
          <ImagesCard image={image} />
          </div>
      ))}
    </div>
    </div>
  
);
};
export default ImagesList;
