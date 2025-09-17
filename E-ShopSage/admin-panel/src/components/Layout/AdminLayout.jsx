import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

function AdminLayout({ children }) {
    return (
        <div className="admin-layout">
            <Header />
            <Sidebar />
            <div className="main-content-wrapper">
                <div className="main-content">
                    {children}
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout 