import './Footer.css'
import logotFooter from '../../assets/logo-footer.png'

const Footer = () => {

    return (
        <div className="footer">
        <div className='img-container container'>
            <div className='img'>
                <img className='img-footer' src={logotFooter} alt='logo' />

            </div>
            <p>© 2023 - All rights reserved</p>
        </div>    
        </div>
    )
}

export default Footer;