import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import avatarImage from '../../assets/images/avatar-1.jpg'

function Sidebar() {
    const { user, logout } = useAuth()
    const location = useLocation()
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [userProfile, setUserProfile] = useState(null)
    const [activeSubmenu, setActiveSubmenu] = useState(null)
    useEffect(() => {
        if (user) {
            setUserProfile({
                name: user.name || user.fullName || user.username || 'Admin User',
                role: user.role || user.userType || 'Administrator',
                avatar: user.avatar || user.profileImage || avatarImage,
                email: user.email || 'admin@example.com'
            })
        }
    }, [user])

    const menuItems = [
        {
            title: 'Dashboard',
            icon: 'fa-solid fa-tachometer-alt',
            path: '/dashboard'
        },
        {
            title: 'Users',
            icon: 'fa-solid fa-users',
            path: '/users',
        },
    ]
    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }
    
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed)
    }

    const toggleSubmenu = (index) => {
        setActiveSubmenu(activeSubmenu === index ? null : index)
    }

    const isActiveRoute = (path) => {
        return location.pathname === path
    }

    const isActiveSubmenu = (submenu) => {
        return submenu?.some(item => isActiveRoute(item.path))
    }

    return (
        <div className={`dashboard-menu ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="nav-menu">
                <div className="user-profile-section">
                    <div className="user-profile-header">
                        <div className="user-avatar-container">
                            <img 
                                src={userProfile?.avatar || avatarImage} 
                                alt="User Avatar"
                                className="user-avatar"
                            />
                            <div className="user-status-indicator online"></div>
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="sidebar-navigation">
                    <ul className="nav-menu-list">
                        {menuItems.map((item, index) => (
                            <li key={index} className="nav-menu-item">
                                {item.submenu ? (
                                    <div className={`nav-item-with-submenu ${isActiveSubmenu(item.submenu) ? 'active' : ''}`}>
                                        <button 
                                            className={`nav-menu-link submenu-toggle ${isActiveSubmenu(item.submenu) ? 'active' : ''}`}
                                            onClick={() => toggleSubmenu(index)}
                                        >
                                            <div className="nav-link-content">
                                                <i className={`${item.icon} nav-icon`}></i>
                                                {!isCollapsed && (
                                                    <>
                                                        <span className="nav-text">{item.title}</span>
                                                        <i className={`fa-solid fa-chevron-down submenu-arrow ${activeSubmenu === index ? 'rotated' : ''}`}></i>
                                                    </>
                                                )}
                                            </div>
                                        </button>
                                        
                                        <div className={`submenu-container ${activeSubmenu === index ? 'expanded' : ''}`}>
                                            <ul className="submenu-list">
                                                {item.submenu.map((subItem, subIndex) => (
                                                    <li key={subIndex} className="submenu-item">
                                                        <NavLink 
                                                            className={`submenu-link ${isActiveRoute(subItem.path) ? 'active' : ''}`}
                                                            to={subItem.path}
                                                        >
                                                            <i className="fa-solid fa-circle submenu-icon"></i>
                                                            {!isCollapsed && (
                                                                <span className="submenu-text">{subItem.title}</span>
                                                            )}
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <NavLink 
                                        className={`nav-menu-link ${isActiveRoute(item.path) ? 'active' : ''}`}
                                        to={item.path}
                                    >
                                        <div className="nav-link-content">
                                            <i className={`${item.icon} nav-icon`}></i>
                                            {!isCollapsed && (
                                                <span className="nav-text">{item.title}</span>
                                            )}
                                        </div>
                                    </NavLink>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar 