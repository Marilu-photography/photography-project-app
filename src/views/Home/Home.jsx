
import ImageSliderComponent from "../../componets/Slider/Slider";
import ProductsList from '../Products/ProductsList';


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
    

        
      
    </div>
  );
}

export default Home;