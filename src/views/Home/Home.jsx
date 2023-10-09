
import ImagesList from "../Images/ImagesList";
import ImageSliderComponent from "../../components/Slider/Slider";
import ProductsList from '../Products/ProductsList';
import Categories from "../../components/Categories/Categories";


const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

const Home = () => {
  return (
    <div className="Home">
     <ImageSliderComponent/>
     <Categories/>
     <ProductsList />
     <ImagesList/>
    

        
      
    </div>
  );
}

export default Home;