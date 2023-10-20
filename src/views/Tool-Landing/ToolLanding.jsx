import './ToolLanding.css'
import { Sliders2Vertical, Icon1Circle, Stars, VectorPen, Icon2Circle, Icon3Circle, Icon4Circle, } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
const ToolLanding = () => {


  return (
    <div className="PhotoIA">
      <header>
        <div className='header-info-cont'>
        <h1>Discover <span>PhotoIA</span></h1>
        <p>Register and try our powerful image editing tool now.</p>
        <Link className="btn-header" to={'/register'}>Sign Up now</Link>
        </div>
      </header>

      <section className="benefits">
        <div className="benefit">
          <div className='icon-container'><VectorPen /></div>
          <div>
            <h3>Edit your images easily.</h3>
            <p>Transform your photos with simplicity. PhotoIA offers an intuitive editing experience, making it effortless to enhance your images.</p>
          </div>

        </div>
        <div className="benefit">
          <div className='icon-container'><Stars /></div>
          <div>
            <h3>Utilize AI for image enhancements.</h3>
            <p>Unlock the power of artificial intelligence to elevate your visuals. PhotoIA harnesses AI technology to enhance your images like never before.</p>
          </div>

        </div>
        <div className="benefit">
          <div className='icon-container'><Sliders2Vertical /></div>
          <div>
            <h3>Apply effects, texts, and resize.</h3>
            <p>Customize your images with various effects, add text overlays, and resize them to perfection. PhotoIA provides a wide range of creative tools at your fingertips.</p>
          </div>

        </div>
      </section>

      <section className="how-it-works">
        <div className="how-it-works-step">
          <div className='my-2'>
            <h2>How it works.</h2>
          </div>
          <div className='my-2'>
            <Icon1Circle />
            <p>Upload and edit your image.</p>
          </div>
          <div className='my-2'>
            <Icon2Circle />
            <p>Use AI to enhance or replace your image.</p>
          </div>
          <div className='my-2'>
            <Icon3Circle />
            <p>Apply effects, texts, or resize your image.</p>
          </div>
          <div className='my-2'>
            <Icon4Circle />
            <p>Save and publish your image.</p>
          </div>
        </div>
        <div>
          <img src="img\mobile.png" alt="" />
        </div>
      </section>

      <section className="how-it-works-details d-flex flex-column align-items-center">
        <div className="how-it-works-details-text d-flex">
          <div className='how-it-works-details-info'>
            <h2>Using IA</h2>
            <p>Unlock the incredible potential of artificial intelligence with our app. With our AI-powered image editing feature, you can easily remove or replace specific elements within your images. Simply upload the image, select the object you want to eliminate, and specify what you'd like to replace it with. Our AI algorithms will seamlessly blend the new element into the image, giving you complete control over your visuals. It's a revolutionary way to enhance and transform your photos, making your editing process faster and more intuitive than ever before.</p>
          </div>
          <div className='how-it-works-details-img'>
            <img src="\img\generativeIA.gif" alt="Step 2 Image" />
          </div>
        </div>
        <div className="how-it-works-details-text d-flex">
        <div className='how-it-works-details-img byn-img'>
            <img src="\img\byn.png" alt="Step 3 Image" />
          </div>
          <div className='how-it-works-details-info byn-text'>
            <h2>Apply Effects</h2>
            <p>Experience the versatility of our app's editing capabilities. With our user-friendly tools, you can effortlessly apply stunning effects like classic black and white transformations, or enhance your images with vibrant colors. Add text to convey your message or caption your photos with style. Need to resize or crop your images? It's a breeze with our intuitive resizing options. Whether you're a creative professional or a hobbyist, our app empowers you to achieve your vision, giving you the freedom to make your images stand out with ease.</p>
          </div>
          
        </div>

      </section>

      <section className="motivation">
        <div className='header-info-cont'>
        <h2>Join Us and Transform Your Images!</h2>
        <p>Convince users of the benefits and potential of your image editing tool.</p>
        <Link className="btn-end" to={'/register'}>Sign Up now</Link>
        </div>
        
      </section>
    </div>
  );
}

export default ToolLanding;