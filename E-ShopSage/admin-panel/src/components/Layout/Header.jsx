import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { apiService } from '../../services/api'
function Header() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [showNotifications, setShowNotifications] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const [userProfile, setUserProfile] = useState(null)
    const [isLoadingProfile, setIsLoadingProfile] = useState(false)
    useEffect(() => {
        if (user) {
            fetchUserProfile()
        }
    }, [user])

    const fetchUserProfile = async () => {
        if (!user) return
        setIsLoadingProfile(true)
        try {
            // Try to get profile by user ID first
            if (user.id) {
                const response = await apiService.getProfileById(user.id)
                setUserProfile(response.data || response)
            } else {
                // Fallback to current user profile
                const response = await apiService.getProfile()
                setUserProfile(response.data || response)
            }
        } catch (error) {
            console.error('Failed to fetch user profile:', error)
            setUserProfile(user)
        } finally {
            setIsLoadingProfile(false)
        }
    }

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true)
            setShowUserMenu(false)
            
            // Call the logout API
            const response = await apiService.logout()
            console.log('Logout API response:', response)
            
            // Show success message (optional)
            if (response.success) {
                console.log('Logout successful:', response.message)
            }
            
            // Call the auth context logout to clear local state
            await logout()
            
            // Navigate to login page
            navigate('/login')
            
        } catch (error) {
            console.error('Logout failed:', error)
            
            // Show error message (optional)
            console.warn('Logout API failed, but proceeding with local logout')
            
            // Even if API fails, still clear local state and redirect
            await logout()
            navigate('/login')
        } finally {
            setIsLoggingOut(false)
        }
    }

    const handleProfile = async (userId = null) => {
        try {
            if (userId) {
                const response = await apiService.getProfileById(userId)
                if (response) {
                    localStorage.setItem('profileData123', JSON.stringify(response))
                    navigate('/profile')
                    return response
                }
            }
            return null
        } catch (error) {
            console.error('Profile API failed:', error)
            throw error
        }
    }

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications)
        setShowUserMenu(false)
    }

    const toggleUserMenu = () => {
        setShowUserMenu(!showUserMenu)
        setShowNotifications(false)
    }

    const closeDropdowns = () => {
        setShowNotifications(false)
        setShowUserMenu(false)
    }
    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showNotifications || showUserMenu) {
                const dropdowns = document.querySelectorAll('.dropdown-menu')
                const isClickInsideDropdown = Array.from(dropdowns).some(dropdown => 
                    dropdown.contains(event.target)
                )
                const isClickOnToggle = event.target.closest('.dropdown-toggle')
                
                if (!isClickInsideDropdown && !isClickOnToggle) {
                    closeDropdowns()
                }
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    },[showNotifications, showUserMenu])
    // Get user display information
    const getUserDisplayInfo = () => {
        if (userProfile) {
            return {
                name: userProfile.name || user.name || 'Admin User',
                email: userProfile.email || user?.email || 'admin@example.com',
                role: userProfile.role || user.userType || 'Administrator',
                avatar: userProfile.avatar || user.profileImage || null
            }
        }
        if (user) {
            return {
                name: user.name || 'Admin User',
                email: user.email || 'admin@example.com',
                role: user.role || user.userType || 'Administrator',
                avatar: user.avatar || user.profileImage || null
            }
        }
        return {
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'Administrator',
            avatar: null
        }
    }
    const userInfo = getUserDisplayInfo()
    // Sample notifications data
    const notifications = [
        {
            id: 1,
            type: 'user',
            icon: 'fa-regular fa-user-plus',
            title: 'New user registered',
            time: '5 hours ago',
            avatar: null
        },
        {
            id: 2,
            type: 'comment',
            icon: null,
            title: 'Karen Robinson',
            message: 'Wow ! this admin looks good and awesome design',
            time: '2 hours ago',
            avatar: '/src/assets/images/avatar-1.jpg'
        },
        {
            id: 3,
            type: 'comment',
            icon: null,
            title: 'Cristina Pride',
            message: 'Hi, How are you? What about our next meeting',
            time: '1 hour ago',
            avatar: '/src/assets/images/avatar-2.jpg'
        },
        {
            id: 4,
            type: 'success',
            icon: 'fa-solid fa-comment',
            title: 'Jaclyn Brunswick commented on Dashboard',
            time: '1 min ago'
        },
        {
            id: 5,
            type: 'danger',
            icon: 'fa-solid fa-comment',
            title: 'Caleb Flakelar commented on Admin',
            time: '4 days ago'
        }
    ]
    return (
        <div className="navbar navbar-expand flex-column flex-md-row align-items-center navbar-custom">
            <div className="container-fluid">
                <a href="/dashboard" className="navbar-brand mr-0 mr-md-2 logo">
                    <img src={logo} alt="Logo" />
                </a>
                <button type="button" className="navigation-btn">
                    <i className="fa-solid fa-bars"></i>
                </button>
                <ul className="navbar-nav flex-row ml-auto d-flex align-items-center list-unstyled topnav-menu mb-0">
                    <li className="dropdown notification-list">
                        <a 
                            className="nav-link dropdown-toggle notification-toggle" 
                            href="#" 
                            role="button"
                            onClick={(e) => {
                                e.preventDefault()
                                toggleNotifications()
                            }}
                        >
                            <i className="fa-regular fa-bell notification-icon"></i>
                            <span className="noti-icon-badge">{notifications.length}</span>
                        </a>
                        {showNotifications && (
                            <div className="dropdown-menu dropdown-menu-right dropdown-lg show">
                                <div className="dropdown-item noti-title border-bottom">
                                    <h5 className="m-0 font-size-16">
                                        <span className="float-right">
                                            <a href="#" className="text-dark" onClick={(e) => e.preventDefault()}>
                                                <small>Clear All</small>
                                            </a>
                                        </span>
                                        Notification
                                    </h5>
                                </div>
                                <div className="noti-scroll">
                                    {notifications.map((notification) => (
                                        <a 
                                            key={notification.id}
                                            href="#" 
                                            className="dropdown-item notify-item"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <div className={`notify-icon ${notification.type === 'user' ? 'btn btn-primary' : 
                                                           notification.type === 'success' ? 'bg-success' : 
                                                           notification.type === 'danger' ? 'bg-danger' : ''}`}>
                                                {notification.avatar ? (
                                                    <img src={notification.avatar} className="img-fluid rounded-circle" alt=""/>
                                                ) : (
                                                    <i className={notification.icon}></i>
                                                )}
                                            </div>
                                            <p className="notify-details">
                                                {notification.title}
                                                {notification.message && (
                                                    <small className="text-muted"> {notification.message}</small>
                                                )}
                                                <small className="text-muted d-block">{notification.time}</small>
                                            </p>
                                        </a>
                                    ))}
                                </div>
                                <a 
                                    href="#" 
                                    className="dropdown-item align-items-center justify-content-center notify-item border-top"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    View all
                                </a>
                            </div>
                        )}
                    </li>
                    
                    {/* User Menu Dropdown */}
                    <li className="dropdown user-link">
                        <a 
                            className="nav-link dropdown-toggle user-toggle d-flex align-items-center" 
                            href="#" 
                            role="button"
                            onClick={(e) => {
                                e.preventDefault()
                                toggleUserMenu()
                            }}
                        >
                            {userInfo.avatar ? (
                                <img src={userInfo.avatar} alt="User Avatar" className="user-icon rounded-circle" style={{ width: '32px', height: '32px' }} />
                            ) : (
                                <i className="fa-regular fa-user user-icon"></i>
                            )}
                            <i className="fa-solid fa-chevron-down ms-2 dropdown-arrow"></i>
                        </a>
                        {showUserMenu && (
                            <div className="dropdown-menu dropdown-menu-right dropdown-lg show">
                                <div className="dropdown-item user-info-header p-3 border-bottom">
                                    <div className="d-flex align-items-center">
                                        {userInfo.avatar ? (
                                            <img src={userInfo.avatar} alt="User Avatar" className="rounded-circle me-3" style={{ width: '48px', height: '48px' }} />
                                        ) : (
                                            <div className="bg-primary rounded-circle me-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                                                <i className="fa-solid fa-user text-white"></i>
                                            </div>
                                        )}
                                        <div>
                                            <h6 className="mb-1">{userInfo.name}</h6>
                                            <small className="text-muted">{userInfo.email}</small>
                                            <div className="mt-1">
                                                <span className="badge bg-primary">{userInfo.role}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a href="/profile" className="dropdown-item" 
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleProfile(user?.id)
                                }}>
                                    <i className="fa-solid fa-user me-2"></i> My Profile
                                </a>
                                <div className="dropdown-divider"></div>
                                <a href="#" className="dropdown-item" onClick={(e) => e.preventDefault()}>
                                    <i className="fa-solid fa-headset me-2"></i> Support
                                </a>
                                <div className="dropdown-divider"></div>
                                <a 
                                    href="#" 
                                    className="dropdown-item"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleLogout()
                                    }}
                                    style={{ pointerEvents: isLoggingOut ? 'none' : 'auto' }}
                                >
                                    <i className={`${isLoggingOut ? 'fa-solid fa-spinner fa-spin' : 'fa-solid fa-sign-out-alt'} me-2`}></i> 
                                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                                </a>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
            

        </div>
    )
}
export default Header