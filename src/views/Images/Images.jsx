import { useEffect, useState } from "react";
import { getImagesList } from "../../services/ImagesServices";

const ImagesList = () => {
  const [imagesData, setImagesData] = useState([]);
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

  if (!imagesData.length) {
    return <p>No products found 🥺</p>;
  }



  return (
    <div className="Store">
      <h1>Gallery</h1>

      <div className="row">
        {imagesData.map((image) => (
            <div key={image._id} className="col-lg-4 col-sm-6" >
				<div className="thumbnail">
					<img src={image.imageUrl} />
				</div>

            </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesList;
