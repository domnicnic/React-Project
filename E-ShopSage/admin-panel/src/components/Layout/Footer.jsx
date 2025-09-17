import React from 'react'
function Footer() {
    const currentYear = new Date().getFullYear()
    return (
        <div className="col-sm-12 copyright">
            <p>  © {currentYear} E-ShopSage Admin Panel. All rights reserved.</p>
        </div>
    )
}
export default Footer 