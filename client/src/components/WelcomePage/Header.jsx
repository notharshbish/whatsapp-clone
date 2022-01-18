import React from 'react'
import '../../css/WelcomePage.css'

function Header() {
    return (
        <div className = 'welcomepage_header'>
            <div className="welcomepage_header_logo">
                <img src="https://static.whatsapp.net/rsrc.php/ym/r/36B424nhiL4.svg" alt="welcomepage_logo" />
            </div>
            <div className="welcomepage_header_other">
                <a href = '/register' className="wc_header_other_register">
                    REGISTER
                </a>
                <a href = '/login' className="wc_header_other_login">
                    LOGIN
                </a>
            </div>
        </div>
    )
}

export default Header
