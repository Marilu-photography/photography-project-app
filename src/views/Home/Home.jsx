
import ImageSliderComponent from "../../components/Slider/Slider";
import ProductsList from '../Products/ProductsList';
import ImagesList from './../Images/ImagesList';


const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

const Home = () => {
  return (
    <div className="Home">
     <ImageSliderComponent/>
     <ProductsList />
     <ImagesList />
    

        
      
    </div>
  );
}

export default Home;