import { useEffect, useState } from "react";
import { getImagesList } from "../../services/ImagesServices";
import './ImagesList.css';
import ImagesCard from "../../components/ImagesCard/imagesCard";
import { useAuthContext } from "../../contexts/AuthContext";


const ImagesList = ({isHome}) => {
  const [images, setImagesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user: currentUser } = useAuthContext();
  console.log(images)


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
    return <p>No images found 🥺</p>;
  }


  const sortedImages = [...images].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const filteredImages = isHome ? sortedImages.slice(0, 6) : sortedImages;


  return (

    <div className="container ImageList-gallery">
      <div className="row contendor-gallery">
        <h1 className="h1-Gallery">Image Gallery</h1>

        {filteredImages.map((image) => (
          <div key={image._id} className="col-12 col-lg-4 col-md-6 mb-4">
            <ImagesCard image={image} currentUser={currentUser} />
          </div>
        ))}

      </div>
    </div>

  );
};
export default ImagesList;
