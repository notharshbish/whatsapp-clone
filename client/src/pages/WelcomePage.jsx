import React, { useEffect } from 'react'
import '../css/WelcomePage.css'
import Header from '../components/WelcomePage/Header'

function WelcomePage() {

    
    window.onload = () => {
        document.cookie = document.cookie+";max-age=0"
        console.log('The Welcome Page is summonned.')
    }

    return (
        <div className = 'welcomepage'>
            <Header /> 
            <div className="wc_body">
                <div className="wc_body_describe">
                    <span className="wc_body_describe_title">
                    Simple. Secure.
                    </span>
                    <span className="wc_body_describe_title">
                    Reliable Messaging.
                    </span>
                    <span className="wc_body_describe_text">
                        With WhatsApp, you'll get fast, simple, secure messaging and calling for free*, available on phones all over the world.
                    </span>
                </div>
                <div className="wc_body_image">
                    <img src="https://scontent.whatsapp.net/v/t39.8562-34/178505650_460141378430025_2455877548463147186_n.png?ccb=1-5&_nc_sid=2fbf2a&_nc_ohc=jQD2gpmwIhcAX_4E9hf&_nc_ht=scontent.whatsapp.net&oh=01_AVyWpFi0iGFQxLW_jwbGZiy6hpfD-T-plYUYn3d0JSBIng&oe=61DA7ACC" alt="wc_image" />
                </div>
            </div>
        </div>
    )
}

export default WelcomePage
