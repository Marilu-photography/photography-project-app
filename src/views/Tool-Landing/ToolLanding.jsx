import './ToolLanding.css'

const ToolLanding = () => {
    return (
        <div className="PhotoIA">
          <header>
            <img src="tu_imagen_de_cabecera.jpg" alt="Cabecera" />
            <h1>Discover Our Image Editing Tool</h1>
            <p>Register and try our powerful image editing tool now.</p>
            <button>Get Started</button>
          </header>
    
          <section className="benefits">
            <div className="benefit">
              <img src="icono_ventaja_1.jpg" alt="Icono 1" />
              <p>Benefit 1: Edit your images easily.</p>
            </div>
            <div className="benefit">
              <img src="icono_ventaja_2.jpg" alt="Icono 2" />
              <p>Benefit 2: Utilize AI for image enhancements.</p>
            </div>
            <div className="benefit">
              <img src="icono_ventaja_3.jpg" alt="Icono 3" />
              <p>Benefit 3: Apply effects, texts, and resize.</p>
            </div>
          </section>
    
          <section className="how-it-works">
            <div className="how-it-works-step">
              <img src="paso1.jpg" alt="Step 1" />
              <p>1. Upload and edit your image.</p>
            </div>
            <div className="how-it-works-step">
              <img src="paso2.jpg" alt="Step 2" />
              <p>2. Use AI to enhance or replace your image.</p>
            </div>
            <div className="how-it-works-step">
              <img src="paso3.jpg" alt="Step 3" />
              <p>3. Apply effects, texts, or resize your image.</p>
            </div>
            <div className="how-it-works-step">
              <img src="paso4.jpg" alt="Step 4" />
              <p>4. Save and publish your image.</p>
            </div>
          </section>
    
          <section className="how-it-works-details">
            <div className="how-it-works-details-text">
              <h2>How Step 2 Works</h2>
              <p>Explain how using AI to enhance or replace images benefits users. Include relevant details.</p>
            </div>
            <img src="imagen_paso_2.jpg" alt="Step 2 Image" />
    
            <div className="how-it-works-details-text">
              <h2>How Step 3 Works</h2>
              <p>Explain how applying effects, text, and resizing images works. Provide user-friendly details.</p>
            </div>
            <img src="imagen_paso_3.jpg" alt="Step 3 Image" />
          </section>
    
          <section className="motivation">
            <h2>Join Us and Transform Your Images!</h2>
            <p>Convince users of the benefits and potential of your image editing tool.</p>
            <button>Sign Up Now</button>
          </section>
        </div>
      );
}

export default ToolLanding;