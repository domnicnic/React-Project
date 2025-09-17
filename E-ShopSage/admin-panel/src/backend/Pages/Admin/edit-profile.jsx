import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AdminLayout from '../../../components/Layout/AdminLayout'
import { useAuth } from '../../../context/AuthContext'
import { apiService } from '../../../services/api'
import { useTitle } from '../../../utils/titleManager'

function EditProfile() {
    const location = useLocation()
    const navigate = useNavigate()
    const { user, updateUser } = useAuth()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        about: '',
        avatar: null
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)
    useTitle('Edit Profile')
    useEffect(() => {
        loadProfileData()
    }, [])

    const loadProfileData = async () => {
        try {
            setLoading(true)
            let profileData = null
            if (location.state?.profileData) {
                profileData = location.state.profileData
            } else {
                const savedData = localStorage.getItem('profileData')
                console.log('savedData', savedData);
                if (savedData) {
                    profileData = JSON.parse(savedData)
                }
            }
            // If no cached data, fetch from API
            if (!profileData && user?.id) {
                const response = await apiService.getProfileById(user.id)
                profileData = response
            }
            
            if (profileData) {
                setFormData({
                    name: profileData.name || profileData.fullName || user?.name || '',
                    email: profileData.email || user?.email || '',
                    phone: profileData.phone || profileData.phoneNumber || '',
                    address: profileData.address || '',
                    city: profileData.city || profileData.location || '',
                    country: profileData.country || '',
                    about: profileData.about || profileData.bio || '',
                    avatar: profileData.avatar || profileData.profileImage || null
                })
                
                if (profileData.avatar || profileData.profileImage) {
                    setImagePreview(profileData.avatar || profileData.profileImage)
                }
            }
            
        } catch (error) {
            console.error('Failed to load profile data:', error)
            setError('Failed to load profile data. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        setError(null)
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('Please select a valid image file.')
                return
            }
            
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size should be less than 5MB.')
                return
            }
            
            setFormData(prev => ({
                ...prev,
                avatar: file
            }))
            
            // Create preview
            const reader = new FileReader()
            reader.onload = (e) => {
                setImagePreview(e.target.result)
            }
            reader.readAsDataURL(file)
            setError(null)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setSaving(true)
            setError(null)
            
            // Create FormData for file upload
            const submitData = new FormData()
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null && formData[key] !== '') {
                    submitData.append(key, formData[key])
                }
            })
            
            // Add user ID if available
            if (user?.id) {
                submitData.append('userId', user.id)
            }
            
            // Call API to update profile
            const response = await apiService.updateProfileById(user?.id, submitData)
            
            if (response.success) {
                setSuccess(true)
                
                // Update local user context
                const updatedUserData = {
                    name: formData.name,
                    email: formData.email,
                    avatar: imagePreview
                }
                updateUser(updatedUserData)
                
                // Update localStorage
                localStorage.setItem('profileData', JSON.stringify({
                    ...response.data,
                    avatar: imagePreview
                }))
                
                // Redirect to profile page after 2 seconds
                setTimeout(() => {
                    navigate('/profile')
                }, 2000)
            } else {
                setError(response.message || 'Failed to update profile.')
            }
            
        } catch (error) {
            console.error('Profile update failed:', error)
            setError('Failed to update profile. Please try again.')
        } finally {
            setSaving(false)
        }
    }

    const handleCancel = () => {
        navigate('/profile')
    }

    if (loading) {
        return (
            <AdminLayout>
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                    <div className="text-center">
                        <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <h5 className="text-muted">Loading profile data...</h5>
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
                        <h1 className="h3 m-0" style={{ color: '#5a5c69', fontWeight: '700' }}>Edit Profile</h1>
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
                                        <li className="breadcrumb-item">
                                            <a href="/profile" className="text-decoration-none">
                                                <i className="fas fa-user me-1"></i>Profile
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            <i className="fas fa-edit me-1"></i>Edit
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="alert alert-success d-flex align-items-center" role="alert" style={{
                                borderRadius: '1rem',
                                border: 'none',
                                boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)'
                            }}>
                                <i className="fas fa-check-circle me-3 fs-4"></i>
                                <div>
                                    <h6 className="alert-heading mb-1">Profile Updated Successfully!</h6>
                                    <p className="mb-0">Redirecting to profile page...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="alert alert-danger d-flex align-items-center" role="alert" style={{
                                borderRadius: '1rem',
                                border: 'none',
                                boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)'
                            }}>
                                <i className="fas fa-exclamation-triangle me-3 fs-4"></i>
                                <div>
                                    <h6 className="alert-heading mb-1">Update Failed</h6>
                                    <p className="mb-0">{error}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="card" style={{
                            borderRadius: '1.5rem',
                            border: 'none',
                            boxShadow: '0 1rem 3rem rgba(0, 0, 0, 0.1)'
                        }}>
                            <div className="card-header bg-transparent border-0 pt-4 pb-0">
                                <h5 className="mb-0" style={{ color: '#2c3e50', fontWeight: '600' }}>
                                    <i className="fas fa-user-cog me-2 text-primary"></i>
                                    Profile Information
                                </h5>
                            </div>
                            
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit}>
                                    {/* Profile Image Section */}
                                    <div className="row mb-4">
                                        <div className="col-12 text-center">
                                            <div className="position-relative d-inline-block">
                                                <img 
                                                    src={imagePreview || '/src/assets/images/avatar-1.jpg'} 
                                                    alt="Profile" 
                                                    className="rounded-circle border-4 border-white"
                                                    style={{ 
                                                        width: '120px', 
                                                        height: '120px', 
                                                        objectFit: 'cover',
                                                        boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.2)'
                                                    }}
                                                />
                                                <label 
                                                    htmlFor="avatar-upload"
                                                    className="position-absolute bottom-0 end-0 bg-primary rounded-circle border border-white d-flex align-items-center justify-content-center"
                                                    style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    title="Change Profile Picture"
                                                >
                                                    <i className="fas fa-camera text-white"></i>
                                                </label>
                                                <input
                                                    type="file"
                                                    id="avatar-upload"
                                                    name="avatar"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    style={{ display: 'none' }}
                                                />
                                            </div>
                                            <p className="text-muted mt-2 mb-0">
                                                <small>Click the camera icon to change your profile picture</small>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Personal Information */}
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <label className="form-label fw-bold text-muted mb-2">
                                                    <i className="fas fa-user me-1"></i>
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Enter your full name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    style={{
                                                        borderRadius: '0.75rem',
                                                        border: '1px solid #e3e6f0',
                                                        padding: '0.75rem 1rem',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <label className="form-label fw-bold text-muted mb-2">
                                                    <i className="fas fa-envelope me-1"></i>
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control"
                                                    placeholder="Enter your email address"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    style={{
                                                        borderRadius: '0.75rem',
                                                        border: '1px solid #e3e6f0',
                                                        padding: '0.75rem 1rem',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <label className="form-label fw-bold text-muted mb-2">
                                                    <i className="fas fa-phone me-1"></i>
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    className="form-control"
                                                    placeholder="Enter your phone number"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    style={{
                                                        borderRadius: '0.75rem',
                                                        border: '1px solid #e3e6f0',
                                                        padding: '0.75rem 1rem',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <label className="form-label fw-bold text-muted mb-2">
                                                    <i className="fas fa-map-marker-alt me-1"></i>
                                                    City
                                                </label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    className="form-control"
                                                    placeholder="Enter your city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    style={{
                                                        borderRadius: '0.75rem',
                                                        border: '1px solid #e3e6f0',
                                                        padding: '0.75rem 1rem',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <label className="form-label fw-bold text-muted mb-2">
                                                    <i className="fas fa-flag me-1"></i>
                                                    Country
                                                </label>
                                                <input
                                                    type="text"
                                                    name="country"
                                                    className="form-control"
                                                    placeholder="Enter your country"
                                                    value={formData.country}
                                                    onChange={handleInputChange}
                                                    style={{
                                                        borderRadius: '0.75rem',
                                                        border: '1px solid #e3e6f0',
                                                        padding: '0.75rem 1rem',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <label className="form-label fw-bold text-muted mb-2">
                                                    <i className="fas fa-home me-1"></i>
                                                    Address
                                                </label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    className="form-control"
                                                    placeholder="Enter your address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    style={{
                                                        borderRadius: '0.75rem',
                                                        border: '1px solid #e3e6f0',
                                                        padding: '0.75rem 1rem',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="col-12 mb-4">
                                            <div className="form-group">
                                                <label className="form-label fw-bold text-muted mb-2">
                                                    <i className="fas fa-info-circle me-1"></i>
                                                    About Me
                                                </label>
                                                <textarea
                                                    name="about"
                                                    className="form-control"
                                                    rows="4"
                                                    placeholder="Tell us about yourself..."
                                                    value={formData.about}
                                                    onChange={handleInputChange}
                                                    style={{
                                                        borderRadius: '0.75rem',
                                                        border: '1px solid #e3e6f0',
                                                        padding: '0.75rem 1rem',
                                                        transition: 'all 0.3s ease',
                                                        resize: 'vertical'
                                                    }}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="row">
                                        <div className="col-12 text-center">
                                            <div className="d-flex justify-content-center gap-3">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={handleCancel}
                                                    style={{
                                                        borderRadius: '0.75rem',
                                                        padding: '0.75rem 2rem',
                                                        border: '2px solid #6c757d',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                >
                                                    <i className="fas fa-times me-2"></i>
                                                    Cancel
                                                </button>
                                                
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                    disabled={saving}
                                                    style={{
                                                        borderRadius: '0.75rem',
                                                        padding: '0.75rem 2rem',
                                                        boxShadow: '0 0.25rem 0.5rem rgba(0, 123, 255, 0.3)',
                                                        border: 'none',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                >
                                                    {saving ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                            Saving...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className="fas fa-save me-2"></i>
                                                            Save Changes
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
export default EditProfile