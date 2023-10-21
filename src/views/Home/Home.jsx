
import ImagesList from "../Images/ImagesList";
import ImageSliderComponent from "../../components/Slider/Slider";
import ProductsList from '../Products/ProductsList';
import Categories from "../../components/Categories/Categories";
import { Link } from "react-router-dom";


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
     <div className="Banner">
        <Link to="/tool-landing">
          <img src="/img/muestra.png" alt="muestra" className="muestra" />
        </Link>
      </div>
     <ImagesList/>
    

        
      
    </div>
  );
}

export default Home;