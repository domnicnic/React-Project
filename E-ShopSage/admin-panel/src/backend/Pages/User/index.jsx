import React, { useState, useEffect } from 'react'
import { apiService } from '../../../services/api'
import { useAuth } from '../../../context/AuthContext'
import AdminLayout from '../../../components/Layout/AdminLayout'
import { useTitle } from '../../../utils/titleManager'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
function Users() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage, setUsersPerPage] = useState(10)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [userToDelete, setUserToDelete] = useState(null)
    const [deleteLoading, setDeleteLoading] = useState(false)
    useTitle('Users Management')
    useEffect(() => {
        fetchUsers()
    }, [])

    useEffect(() => {
        // Filter users based on search term
        const filtered = users.filter(user => 
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredUsers(filtered)
        setCurrentPage(1)
    }, [users, searchTerm])

    const fetchUsers = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await apiService.getUsers()
            console.log('Users response:')
            if (response.success && response.data) {
                setUsers(response.data)
                if (users.length > 0) {
                    toast.success(`Successfully loaded ${response.data.length} users!`, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    })
                }
            } else {
                setError('Failed to fetch users')
            }
        } catch (error) {
            console.error('Error fetching users:', error)
            setError(error.message || 'Failed to fetch users')
        } finally {
            setLoading(false)
        }
    }

    const handleRefresh = () => {
        toast.info('Refreshing users...', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
        fetchUsers()
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const handlePageSizeChange = (e) => {
        const newPageSize = parseInt(e.target.value)
        setUsersPerPage(newPageSize)
        setCurrentPage(1) // Reset to first page when changing page size
    }

    const handleDeleteClick = (user) => {
        setUserToDelete(user)
        setShowDeleteModal(true)
    }

  const handleDeleteConfirm = async () => {
        if (!userToDelete) return
    try {
            setDeleteLoading(true)
            const response = await apiService.deleteUser(userToDelete.id)
            if (response.success) {
                // Remove from local state
                setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete.id))
                // Close modal and reset state
                setShowDeleteModal(false)
                setUserToDelete(null)
                // Show success toast
                toast.success(`User "${userToDelete.name}" deleted successfully!`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            } else {
                throw new Error(response.message || 'Failed to delete user')
            }
            
        } catch (error) {
            console.error('Error deleting user:', error)
            // Show error toast
            toast.error(`Failed to delete user: ${error.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
        } finally {
            setDeleteLoading(false)
        }
    }

    const handleDeleteCancel = () => {
        setShowDeleteModal(false)
        setUserToDelete(null)
    }
  
    const handleDeleteUser = async (userId) => {
        const user = users.find(u => u.id === userId)
      if (user) {
            setUserToDelete(user)
            setShowDeleteModal(true)
        }
    }
    const handleViewDetails = async (userId) => {
      const user = users.find(u => u.id === userId)
      try {
        if (user) {
          const response = await apiService.viewUser(userId)
          console.log('View user response:', response)
          navigate(`/view-user/${userId}`)
          return response
        }
        return null
      } catch (error) {
        console.error('Error fetching user details:', error)
        throw error
      }
    }

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handlePreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1))
    }

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages))
    }

    const getRoleBadgeClass = (role) => {
        switch (role?.toLowerCase()) {
            case 'administrator':
            case 'admin':
                return 'badge bg-primary'
            case 'manager':
                return 'badge bg-success'
            case 'user':
                return 'badge bg-info'
            default:
                return 'badge bg-secondary'
        }
    }

    // Pagination component
    const Pagination = () => {
        const pageNumbers = []
        const maxVisiblePages = 5
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1)
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i)
        }

        if (totalPages <= 1) return null

        return (
            <nav aria-label="Users pagination">
                <ul className="pagination justify-content-center mb-0">
                    {/* Previous button */}
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button 
                            className="page-link" 
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                    </li>

                    {/* First page */}
                    {startPage > 1 && (
                        <>
                            <li className="page-item">
                                <button 
                                    className="page-link" 
                                    onClick={() => handlePageChange(1)}
                                >
                                    1
                                </button>
                            </li>
                            {startPage > 2 && (
                                <li className="page-item disabled">
                                    <span className="page-link">...</span>
                                </li>
                            )}
                        </>
                    )}

                    {/* Page numbers */}
                    {pageNumbers.map(number => (
                        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                            <button 
                                className="page-link" 
                                onClick={() => handlePageChange(number)}
                            >
                                {number}
                            </button>
                        </li>
                    ))}

                    {/* Last page */}
                    {endPage < totalPages && (
                        <>
                            {endPage < totalPages - 1 && (
                                <li className="page-item disabled">
                                    <span className="page-link">...</span>
                                </li>
                            )}
                            <li className="page-item">
                                <button 
                                    className="page-link" 
                                    onClick={() => handlePageChange(totalPages)}
                                >
                                    {totalPages}
                                </button>
                            </li>
                        </>
                    )}

                    {/* Next button */}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button 
                            className="page-link" 
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </li>
                </ul>
            </nav>
        )
    }

    if (loading) {
      return (
        <AdminLayout>
            <div className="container-fluid">
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3">Loading users...</p>
                    </div>
                </div>
          </div>
        </AdminLayout>
        )
    }

    if (error) {
      return (
        <AdminLayout>
            <div className="container-fluid">
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                    <div className="text-center">
                        <i className="fa-solid fa-exclamation-triangle text-danger mb-3" style={{ fontSize: '3rem' }}></i>
                        <h4 className="text-danger">Error Loading Users</h4>
                        <p className="text-muted">{error}</p>
                        <button className="btn btn-primary" onClick={handleRefresh}>
                            <i className="fa-solid fa-redo me-2"></i>Try Again
                        </button>
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
                    <h1 className="h3 m-0" style={{ color: '#5a5c69', fontWeight: '700' }}>Users Management</h1>
                </div>
            </div>
        </div>
        <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <div className="d-flex gap-2">
                    <button 
                        className="btn btn-primary btn-sm"
                        onClick={handleRefresh}
                        title="Refresh Users"
                    >
                        <i className="fa-solid fa-sync-alt me-2"></i>Refresh
                    </button>
                </div>
            </div>
            <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <h6 className="m-0 font-weight-bold text-primary me-3">Users List</h6>
                        <span className="text-muted small">
                            Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
                        </span>
                    </div>
                    <div className="d-flex gap-2 align-items-center">
                        <div className="input-group" style={{ width: '300px' }}>
                            <span className="input-group-text">
                                <i className="fa-solid fa-search"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <label className="form-label mb-0 small">Show:</label>
                            <select 
                                className="form-select form-select-sm" 
                                style={{ width: '80px' }}
                                value={usersPerPage}
                                onChange={handlePageSizeChange}
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                            <span className="small text-muted">per page</span>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    {filteredUsers.length === 0 ? (
                        <div className="text-center py-4">
                            <i className="fa-solid fa-users fa-3x text-gray-300 mb-3"></i>
                            <h5 className="text-gray-500">
                                {searchTerm ? 'No users found matching your search' : 'No users available'}
                            </h5>
                            {searchTerm && (
                                <button 
                                    className="btn btn-outline-secondary btn-sm mt-2"
                                    onClick={() => {
                                        setSearchTerm('')
                                    }}
                                >
                                    Clear Search
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>User Type</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.map((user, index) => (
                                        <tr key={user.id || index}>
                                            <td>{user.id}</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="avatar-sm me-2">
                                                        <img
                                                            src={user.avatar || '/src/assets/images/avatar-1.jpg'}
                                                            alt="User Avatar"
                                                            className="rounded-circle"
                                                            style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                                                        />
                                                    </div>
                                                    <span className="fw-bold">{user.name}</span>
                                                </div>
                                            </td>
                                            <td>{user.email}</td>
                                            <td>
                                                <span className={getRoleBadgeClass(user.role)}>
                                                    {user.role || 'N/A'}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="badge bg-secondary">
                                                    {user.userType || 'N/A'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="btn-group" role="group">
                                                    <button 
                                                        className="btn btn-outline-primary btn-sm"
                                                        title="View Details"
                                                        onClick={() => handleViewDetails(user?.id)}
                                                    >
                                                        <i className="fa-solid fa-eye"></i>
                                                    </button>
                                                    <button 
                                                        className="btn btn-outline-warning btn-sm"
                                                        title="Edit User"
                                                    >
                                                        <i className="fa-solid fa-edit"></i>
                                                    </button>
                                                    <button 
                                                        className="btn btn-outline-danger btn-sm"
                                                        title="Delete User"
                                                        onClick={() => handleDeleteUser(user?.id)}
                                                    >
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                            </table>
                        </div>
                    )}
                    
                    {/* Pagination */}
                    <div className="card-footer">
                        <Pagination />
                    </div>
                </div>
            </div>
        </div>

        {showDeleteModal && (
            <div 
                style={{ 
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div 
                    style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        maxWidth: '500px',
                        width: '90%',
                        zIndex: 10000
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h5 style={{ color: '#dc3545', margin: 0 }}>
                            <i className="fa-solid fa-exclamation-triangle me-2"></i>
                            Confirm Delete
                        </h5>
                        <button 
                            type="button" 
                            onClick={handleDeleteCancel}
                            disabled={deleteLoading}
                            style={{ 
                                background: 'none', 
                                border: 'none', 
                                fontSize: '20px',
                                cursor: deleteLoading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            ×
                        </button>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <p>Are you sure you want to delete this user?</p>
                        {userToDelete && (
                            <div style={{ 
                                backgroundColor: '#fff3cd', 
                                border: '1px solid #ffeaa7', 
                                borderRadius: '4px', 
                                padding: '15px',
                                marginBottom: '15px'
                            }}>
                                <strong>User Details:</strong><br />
                                <strong>Name:</strong> {userToDelete.name}<br />
                                <strong>Email:</strong> {userToDelete.email}<br />
                                <strong>Role:</strong> {userToDelete.role || 'N/A'}
                            </div>
                        )}
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <button 
                            type="button" 
                            onClick={handleDeleteCancel}
                            disabled={deleteLoading}
                            style={{ 
                                padding: '8px 16px',
                                border: '1px solid #6c757d',
                                backgroundColor: '#6c757d',
                                color: 'white',
                                borderRadius: '4px',
                                cursor: deleteLoading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                        <button 
                            type="button" 
                            onClick={handleDeleteConfirm}
                            disabled={deleteLoading}
                            style={{ 
                                padding: '8px 16px',
                                border: '1px solid #dc3545',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                borderRadius: '4px',
                                cursor: deleteLoading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {deleteLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <i className="fa-solid fa-trash me-2"></i>
                                    Delete User
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        )}
    </AdminLayout>
    )
}
export default Users