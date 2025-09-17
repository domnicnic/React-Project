import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { apiService } from '../../../services/api'
import { useAuth } from '../../../context/AuthContext'
import AdminLayout from '../../../components/Layout/AdminLayout'
import { useTitle } from '../../../utils/titleManager'
import { toast } from 'react-toastify'
function ViewUser() {
    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const { user: currentUser } = useAuth()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useTitle('View User Details')
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                setLoading(true)
                setError(null)
                // Get user ID from URL params or location state
                const userId = id || location.state?.userId
                if (!userId) {
                    setError('No user ID provided')
                    return
                }
                console.log('Fetching user details for ID:', userId)
                const response = await apiService.viewUser(userId)
                if (response.success && response.data) {
                    setUser(response.data.user)
                } else {
                    throw new Error(response.message || 'Failed to load user details')
                }
            } catch (error) {
                console.error('Error fetching user details:', error)
                setError(error.message || 'Failed to load user details')
                toast.error(`Failed to load user details: ${error.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            } finally {
                setLoading(false)
            }
        }
        fetchUserDetails()
    }, [id, location.state])
    const handleBack = () => {
        navigate('/users')
    }
    const handleEdit = () => {
        navigate(`/edit-user/${user.id}`, { state: { user } })
    }
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case '1':
                return 'badge bg-success'
            default:
                return 'badge bg-primary'
        }
    }
    const getRoleBadgeClass = (role) => {
        switch (role) {
            case '1':
                return 'badge bg-primary'
            default:
                return 'badge bg-primary'
        }
    }
    if (loading) {
        return (
            <AdminLayout>
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3 text-muted">Loading user details...</p>
                    </div>
                </div>
            </AdminLayout>
        )
    }
    if (error) {
        return (
            <AdminLayout>
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                    <div className="text-center">
                        <i className="fa-solid fa-exclamation-triangle text-warning" style={{ fontSize: '3rem' }}></i>
                        <h4 className="mt-3 text-danger">Error Loading User</h4>
                        <p className="text-muted">{error}</p>
                        <button className="btn btn-primary" onClick={handleBack}>
                            <i className="fa-solid fa-arrow-left me-2"></i>
                            Back to Users
                        </button>
                    </div>
                </div>
            </AdminLayout>
        )
    }
    if (!user) {
        return (
            <AdminLayout>
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                    <div className="text-center">
                        <i className="fa-solid fa-user-slash text-muted" style={{ fontSize: '3rem' }}></i>
                        <h4 className="mt-3 text-muted">User Not Found</h4>
                        <p className="text-muted">The requested user could not be found.</p>
                        <button className="btn btn-primary" onClick={handleBack}>
                            <i className="fa-solid fa-arrow-left me-2"></i>
                            Back to Users
                        </button>
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
                        <h1 className="h3 m-0" style={{ color: '#5a5c69', fontWeight: '700' }}>User Details</h1>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-secondary" onClick={handleBack}>
                            <i className="fa-solid fa-arrow-left me-2"></i>
                            Back
                        </button>
                        <button className="btn btn-primary" onClick={handleEdit}>
                            <i className="fa-solid fa-edit me-2"></i>
                            Edit User
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 mb-4">
                        <div className="card shadow-sm">
                            <div className="card-body text-center">
                                <div className="mb-3">
                                    {user.profileImage ? (
                                        <img 
                                            src={user.profileImage} 
                                            alt={user.name}
                                            className="rounded-circle"
                                            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div 
                                            className="rounded-circle d-flex align-items-center justify-content-center mx-auto"
                                            style={{ 
                                                width: '120px', 
                                                height: '120px', 
                                                backgroundColor: '#e3f2fd',
                                                fontSize: '3rem',
                                                color: '#1976d2'
                                            }}
                                        >
                                            <i className="fa-solid fa-user"></i>
                                        </div>
                                    )}
                                </div>
                                
                                <h4 className="card-title mb-1">{user.name}</h4>
                                <p className="text-muted mb-2">{user.email}</p>
                                
                                <div className="mb-3">
                                    <span className={getRoleBadgeClass(user.role)}>
                                        {user.role}
                                    </span>
                                    <span className={getStatusBadgeClass(user.status)}>
                                        {user.status}
                                    </span>
                                </div>

                                <div className="row text-center">
                                    <div className="col-6">
                                        <div className="border-end">
                                            <h5 className="mb-0 text-primary">{user.totalLogins}</h5>
                                            <small className="text-muted">Total Logins</small>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <h5 className="mb-0 text-success">{user.permissions?.length || 0}</h5>
                                        <small className="text-muted">Permissions</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <div className="card shadow-sm h-100">
                                    <div className="card-header bg-primary text-white">
                                        <h5 className="card-title mb-0">
                                            <i className="fa-solid fa-user-circle me-2"></i>
                                            Personal Information
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row mb-3">
                                            <div className="col-4 text-muted">Full Name:</div>
                                            <div className="col-8 fw-bold">{user.name}</div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-4 text-muted">Email:</div>
                                            <div className="col-8">
                                                <a href={`mailto:${user.email}`} className="text-decoration-none">
                                                    {user.email}
                                                </a>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-4 text-muted">Phone:</div>
                                            <div className="col-8">
                                                <a href={`tel:${user.phone}`} className="text-decoration-none">
                                                    {user.phone}
                                                </a>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-4 text-muted">Address:</div>
                                            <div className="col-8">{user.address}</div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-4 text-muted">Department:</div>
                                            <div className="col-8">{user.department}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="card shadow-sm h-100">
                                    <div className="card-header bg-success text-white">
                                        <h5 className="card-title mb-0">
                                            <i className="fa-solid fa-shield-alt me-2"></i>
                                            Account Information
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row mb-3">
                                            <div className="col-4 text-muted">User ID:</div>
                                            <div className="col-8 fw-bold">#{user.id}</div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-4 text-muted">Account Type:</div>
                                            <div className="col-8">{user.accountType}</div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-4 text-muted">User Type:</div>
                                            <div className="col-8">{user.userType}</div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-4 text-muted">Status:</div>
                                            <div className="col-8">
                                                <span className={getStatusBadgeClass(user.status)}>
                                                    {user.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-4 text-muted">Created:</div>
                                            <div className="col-8">{formatDate(user.createdAt)}</div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-4 text-muted">Last Login:</div>
                                            <div className="col-8">{formatDate(user.lastLogin)}</div>
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
export default ViewUser