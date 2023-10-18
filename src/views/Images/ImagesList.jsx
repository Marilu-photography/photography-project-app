import React, { useEffect, useState } from "react";
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
  <div className="row">
    <h1>Image Gallery</h1>

    <div className="row">
      {images.map((image) => (
          <div key={image._id} className="col-lg-4 col-md-6 mb-4" >
          <ImagesCard image={image} />
          </div>
      ))}
    </div>
    </div>
  </div>
);
};
export default ImagesList;
