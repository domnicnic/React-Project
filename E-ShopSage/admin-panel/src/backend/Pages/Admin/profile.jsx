import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AdminLayout from '../../../components/Layout/AdminLayout'
import { useAuth } from '../../../context/AuthContext'
import { apiService } from '../../../services/api'
import { useTitle } from '../../../utils/titleManager'

function Profile() {
    const location = useLocation()
    const navigate = useNavigate()
    const { user } = useAuth()
    const [profileData, setProfileData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    // Set page title
    useTitle('Profile')
    useEffect(() => {
        loadProfileData()
    }, [])
    const loadProfileData = async () => {
        try {
            setLoading(true)
            if (location.state?.profileData) {
                setProfileData(location.state.profileData)
                setLoading(false)
                return
            }
            
        } catch (error) {
            console.error('Failed to load profile data:', error)
            setError('Failed to load profile data. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleEditProfile = () => {
        navigate('/profile/edit')
    }
    // Get user display information
    const getUserInfo = () => {
        if (profileData) {
            return {
                name: profileData.name || profileData.fullName || profileData.username || 'User',
                role: profileData.role || profileData.userType || 'Administrator',
                location: profileData.location || profileData.city || 'Not specified',
                avatar: profileData.avatar || profileData.profileImage || '/src/assets/images/avatar-1.jpg',
                email: profileData.email || 'Not specified',
                phone: profileData.phone || profileData.phoneNumber || 'Not specified',
                address: profileData.address || 'Not specified',
                about: profileData.about || profileData.bio || 'No information available.'
            }
        }
        if (user) {
            return {
                name: user.name || user.fullName || user.username || 'User',
                role: user.role || user.userType || 'Administrator',
                location: 'Not specified',
                avatar: user.avatar || user.profileImage || '/src/assets/images/avatar-1.jpg',
                email: user.email || 'Not specified',
                phone: 'Not specified',
                address: 'Not specified',
                about: 'No information available.'
            }
        }
        return {
            name: 'User',
            role: 'Administrator',
            location: 'Not specified',
            avatar: '/src/assets/images/avatar-1.jpg',
            email: 'Not specified',
            phone: 'Not specified',
            address: 'Not specified',
            about: 'No information available.'
        }
    }
    const userInfo = getUserInfo()
    if (loading) {
        return (
            <AdminLayout>
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                    <div className="text-center">
                        <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <h5 className="text-muted">Loading profile...</h5>
                    </div>
                </div>
            </AdminLayout>
        )
    }
    if (error) {
        return (
            <AdminLayout>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="alert alert-danger d-flex align-items-center" role="alert" style={{
                                borderRadius: '1rem',
                                border: 'none',
                                boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)'
                            }}>
                                <i className="fas fa-exclamation-triangle me-3 fs-4"></i>
                                <div>
                                    <h6 className="alert-heading mb-1">Error Loading Profile</h6>
                                    <p className="mb-2">{error}</p>
                                    <button 
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={loadProfileData}
                                    >
                                        <i className="fas fa-redo me-1"></i>
                                        Try Again
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        )
    }
    return (
        <AdminLayout>
            <div className="page-title col-sm-12 mb-4">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <h1 className="h3 m-0" style={{ color: '#5a5c69', fontWeight: '700' }}>My Profile</h1>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb mb-0" style={{ fontSize: '0.9rem' }}>
                                        <li className="breadcrumb-item">
                                            <a href="/dashboard" className="text-decoration-none">
                                                <i className="fas fa-home me-1"></i>Dashboard
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            <i className="fas fa-user me-1"></i>Profile
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <button 
                                className="btn btn-primary d-flex align-items-center"
                                onClick={handleEditProfile}
                                style={{
                                    borderRadius: '0.75rem',
                                    padding: '0.75rem 1.5rem',
                                    boxShadow: '0 0.25rem 0.5rem rgba(0, 123, 255, 0.3)',
                                    border: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <i className="fas fa-edit me-2"></i>
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="card h-100" style={{
                            borderRadius: '1.5rem',
                            border: 'none',
                            boxShadow: '0 1rem 3rem rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        }}>
                            <div className="card-body text-center text-white p-4">
                                <div className="position-relative mb-4">
                                    <div className="position-relative d-inline-block">
                                        <img 
                                            src={userInfo.avatar} 
                                            alt="Profile" 
                                            className="rounded-circle border-4 border-white"
                                            style={{ 
                                                width: '120px', 
                                                height: '120px', 
                                                objectFit: 'cover',
                                                boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.2)'
                                            }}
                                        />
                                        <div className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-white" style={{
                                            width: '30px',
                                            height: '30px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <i className="fas fa-check text-white" style={{ fontSize: '0.75rem' }}></i>
                                        </div>
                                    </div>
                                </div>
                                
                                <h3 className="mb-1" style={{ fontWeight: '600' }}>{userInfo.name}</h3>
                                <p className="mb-3 opacity-75">
                                    <i className="fas fa-user-tag me-1"></i>
                                    {userInfo.role}
                                </p>
                                
                                <div className="d-flex justify-content-center align-items-center mb-3">
                                    <i className="fas fa-map-marker-alt me-2 opacity-75"></i>
                                    <span className="opacity-75">{userInfo.location}</span>
                                </div>
                                
                                <div className="row text-center">
                                    <div className="col-4">
                                        <div className="border-end border-white border-opacity-25">
                                            <h5 className="mb-0">150</h5>
                                            <small className="opacity-75">Projects</small>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="border-end border-white border-opacity-25">
                                            <h5 className="mb-0">1.2k</h5>
                                            <small className="opacity-75">Followers</small>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <h5 className="mb-0">890</h5>
                                        <small className="opacity-75">Following</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8 col-md-6">
                        <div className="row">
                            {/* About Section */}
                            <div className="col-12 mb-4">
                                <div className="card" style={{
                                    borderRadius: '1.25rem',
                                    border: 'none',
                                    boxShadow: '0 0.5rem 1.5rem rgba(0, 0, 0, 0.08)'
                                }}>
                                    <div className="card-header bg-transparent border-0 pt-4 pb-0">
                                        <h5 className="mb-0" style={{ color: '#2c3e50', fontWeight: '600' }}>
                                            <i className="fas fa-info-circle me-2 text-primary"></i>
                                            About Me
                                        </h5>
                                    </div>
                                    <div className="card-body pt-3">
                                        <p className="text-muted mb-0" style={{ lineHeight: '1.7' }}>
                                            {userInfo.about}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="col-12 mb-4">
                                <div className="card" style={{
                                    borderRadius: '1.25rem',
                                    border: 'none',
                                    boxShadow: '0 0.5rem 1.5rem rgba(0, 0, 0, 0.08)'
                                }}>
                                    <div className="card-header bg-transparent border-0 pt-4 pb-0">
                                        <h5 className="mb-0" style={{ color: '#2c3e50', fontWeight: '600' }}>
                                            <i className="fas fa-address-book me-2 text-primary"></i>
                                            Contact Information
                                        </h5>
                                    </div>
                                    <div className="card-body pt-3">
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <div className="d-flex align-items-center p-3 rounded" style={{
                                                    backgroundColor: '#f8f9fa',
                                                    border: '1px solid #e9ecef'
                                                }}>
                                                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{
                                                        width: '40px',
                                                        height: '40px'
                                                    }}>
                                                        <i className="fas fa-envelope text-white"></i>
                                                    </div>
                                                    <div>
                                                        <small className="text-muted d-block">Email Address</small>
                                                        <strong>{userInfo.email}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="col-md-6 mb-3">
                                                <div className="d-flex align-items-center p-3 rounded" style={{
                                                    backgroundColor: '#f8f9fa',
                                                    border: '1px solid #e9ecef'
                                                }}>
                                                    <div className="bg-success rounded-circle d-flex align-items-center justify-content-center me-3" style={{
                                                        width: '40px',
                                                        height: '40px'
                                                    }}>
                                                        <i className="fas fa-phone text-white"></i>
                                                    </div>
                                                    <div>
                                                        <small className="text-muted d-block">Phone Number</small>
                                                        <strong>{userInfo.phone}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="col-12">
                                                <div className="d-flex align-items-start p-3 rounded" style={{
                                                    backgroundColor: '#f8f9fa',
                                                    border: '1px solid #e9ecef'
                                                }}>
                                                    <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center me-3 mt-1" style={{
                                                        width: '40px',
                                                        height: '40px'
                                                    }}>
                                                        <i className="fas fa-map-marker-alt text-white"></i>
                                                    </div>
                                                    <div>
                                                        <small className="text-muted d-block">Address</small>
                                                        <strong>{userInfo.address}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Activity & Stats */}
                            <div className="col-12">
                                <div className="card" style={{
                                    borderRadius: '1.25rem',
                                    border: 'none',
                                    boxShadow: '0 0.5rem 1.5rem rgba(0, 0, 0, 0.08)'
                                }}>
                                    <div className="card-header bg-transparent border-0 pt-4 pb-0">
                                        <h5 className="mb-0" style={{ color: '#2c3e50', fontWeight: '600' }}>
                                            <i className="fas fa-chart-line me-2 text-primary"></i>
                                            Recent Activity
                                        </h5>
                                    </div>
                                    <div className="card-body pt-3">
                                        <div className="row">
                                            <div className="col-md-4 mb-3">
                                                <div className="text-center p-3 rounded" style={{
                                                    backgroundColor: '#e3f2fd',
                                                    border: '1px solid #bbdefb'
                                                }}>
                                                    <i className="fas fa-tasks text-primary mb-2" style={{ fontSize: '2rem' }}></i>
                                                    <h6 className="mb-1">Tasks Completed</h6>
                                                    <h4 className="mb-0 text-primary">24</h4>
                                                </div>
                                            </div>
                                            
                                            <div className="col-md-4 mb-3">
                                                <div className="text-center p-3 rounded" style={{
                                                    backgroundColor: '#f3e5f5',
                                                    border: '1px solid #e1bee7'
                                                }}>
                                                    <i className="fas fa-clock text-purple mb-2" style={{ fontSize: '2rem' }}></i>
                                                    <h6 className="mb-1">Hours Worked</h6>
                                                    <h4 className="mb-0 text-purple">156</h4>
                                                </div>
                                            </div>
                                            
                                            <div className="col-md-4 mb-3">
                                                <div className="text-center p-3 rounded" style={{
                                                    backgroundColor: '#e8f5e8',
                                                    border: '1px solid #c8e6c9'
                                                }}>
                                                    <i className="fas fa-star text-success mb-2" style={{ fontSize: '2rem' }}></i>
                                                    <h6 className="mb-1">Performance</h6>
                                                    <h4 className="mb-0 text-success">4.8</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Profile