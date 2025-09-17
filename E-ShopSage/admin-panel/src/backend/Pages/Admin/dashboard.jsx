import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import config from '../../../config/config';
import AdminLayout from '../../../components/Layout/AdminLayout';
import { useTitle } from '../../../utils/titleManager';

function Dashboard() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [dateRange, setDateRange] = useState('01/01/2020 - 01/09/2020');
    
    // Set page title
    useTitle('Dashboard');
    
    useEffect(() => { 
        if(!user){
            navigate('/login');
        }
    }, [user, navigate]);
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleDateRangeChange = (e) => {
        setDateRange(e.target.value);
    };

    // Mock data - in a real app, this would come from API calls
    const dashboardData = {
        todayRevenue: 2189,
        productsSold: 1200,
        newCustomers: 2000,
        newVisitors: 720,
        totalVisitors: 121000,
        totalProductViews: 21000,
        revenuePerVisitor: 21.5
    };

    const notifications = [
        {
            id: 1,
            message: 'Draft the new contract document for sales team',
            dueDate: 'Due on 24 Aug, 2019'
        },
        {
            id: 2,
            message: 'Draft the new contract document for sales team the new contract document for sales team',
            dueDate: 'Due on 24 Aug, 2019'
        },
        {
            id: 3,
            message: 'Draft the new contract document for sales team',
            dueDate: 'Due on 24 Aug, 2019'
        },
        {
            id: 4,
            message: 'Draft the new contract document for sales team',
            dueDate: 'Due on 24 Aug, 2019'
        },
        {
            id: 5,
            message: 'Draft the new contract document for sales team',
            dueDate: 'Due on 24 Aug, 2019'
        },
        {
            id: 6,
            message: 'Draft the new contract document for sales team',
            dueDate: 'Due on 24 Aug, 2019'
        },
        {
            id: 7,
            message: 'Draft the new contract document for sales team',
            dueDate: 'Due on 24 Aug, 2019'
        },
        {
            id: 8,
            message: 'Draft the new contract document for sales team',
            dueDate: 'Due on 24 Aug, 2019'
        },
        {
            id: 9,
            message: 'Draft the new contract document for sales team',
            dueDate: 'Due on 24 Aug, 2019'
        }
    ];

    const StatCard = ({ title, value, chartId, borderColor = '#4e73df' }) => (
        <div className="col-xl-3 col-md-6 mb-4">
            <div className="box bg-white" style={{
                border: `1px solid #e3e6f0`,
                borderRadius: '0.75rem',
                boxShadow: '0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15)',
                borderLeft: `4px solid ${borderColor}`,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}>
                <div className="box-row flex-wrap p-3">
                    <div className="box-content">
                        <h6 className="text-muted mb-2" style={{ fontSize: '0.875rem', fontWeight: '600' }}>{title}</h6>
                        <p className="h2 m-0" style={{ color: '#5a5c69', fontWeight: '700' }}>{value}</p>
                    </div>
                    <div className="box-icon chart">
                        <div id={chartId} style={{ width: '100%', height: '100px' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );

    const ChartCard = ({ title, chartId, height = 300, showDropdown = false }) => (
        <div className="col-md-4 mb-4">
            <div className="box bg-white" style={{
                border: '1px solid #e3e6f0',
                borderRadius: '0.75rem',
                boxShadow: '0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15)',
                overflow: 'hidden'
            }}>
                <div className="box-title p-3" style={{
                    borderBottom: '1px solid #e3e6f0',
                    backgroundColor: '#f8f9fc'
                }}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="m-0" style={{ color: '#5a5c69', fontWeight: '600' }}>{title}</h5>
                        {showDropdown && (
                            <div className="box-action dropdown">
                                <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown"
                                    aria-haspopup="false" aria-expanded="false" style={{
                                        border: '1px solid #d1d3e2',
                                        borderRadius: '0.35rem',
                                        padding: '0.375rem 0.75rem'
                                    }}>
                                    <i className="fas fa-ellipsis-v"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-right" style={{
                                    border: '1px solid #e3e6f0',
                                    borderRadius: '0.35rem',
                                    boxShadow: '0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15)'
                                }}>
                                    <a href="#" className="dropdown-item">
                                        <i className="fas fa-sync-alt me-2"></i> Refresh
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="box-row p-3">
                    <div className="box-content">
                        <div id={chartId} style={{ width: '100%', height: `${height}px` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );

    const NotificationCard = () => (
        <div className="col-md-4 mb-4">
            <div className="box bg-white" style={{
                border: '1px solid #e3e6f0',
                borderRadius: '0.75rem',
                boxShadow: '0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15)',
                overflow: 'hidden'
            }}>
                <div className="box-title p-3" style={{
                    borderBottom: '1px solid #e3e6f0',
                    backgroundColor: '#f8f9fc'
                }}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="m-0" style={{ color: '#5a5c69', fontWeight: '600' }}>Notifications</h5>
                        <div className="box-action">
                            <a href="#" className="btn btn-sm btn-primary" style={{
                                borderRadius: '0.35rem',
                                padding: '0.375rem 0.75rem',
                                fontSize: '0.875rem'
                            }}>View All</a>
                        </div>
                    </div>
                </div>
                <div className="box-row flex-wrap boxScroll p-3" style={{ 
                    maxHeight: '300px',
                    overflowY: 'auto'
                }}>
                    <div className="wrap">
                        {notifications.map((notification) => (
                            <div key={notification.id} className="notification-item mb-3 p-3" style={{
                                border: '1px solid #e3e6f0',
                                borderRadius: '0.5rem',
                                backgroundColor: '#f8f9fc',
                                transition: 'all 0.2s ease'
                            }}>
                                <p className="m-0 mb-1" style={{ color: '#5a5c69', fontSize: '0.875rem' }}>{notification.message}</p>
                                <span className="text-muted" style={{ fontSize: '0.75rem' }}>{notification.dueDate}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const OverviewCard = () => (
        <div className="col-md-4 mb-4">
            <div className="box bg-white" style={{
                border: '1px solid #e3e6f0',
                borderRadius: '0.75rem',
                boxShadow: '0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15)',
                overflow: 'hidden'
            }}>
                <div className="box-title p-3" style={{
                    borderBottom: '1px solid #e3e6f0',
                    backgroundColor: '#f8f9fc'
                }}>
                    <h5 className="m-0" style={{ color: '#5a5c69', fontWeight: '600' }}>Overview</h5>
                </div>
                <div className="p-3">
                    <div className="overview-item mb-3 p-3" style={{
                        border: '1px solid #e3e6f0',
                        borderRadius: '0.5rem',
                        backgroundColor: '#f8f9fc'
                    }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="box-content">
                                <h3 className="m-0" style={{ color: '#5a5c69', fontWeight: '700' }}>{dashboardData.totalVisitors.toLocaleString()}</h3>
                                <span className="text-muted" style={{ fontSize: '0.875rem' }}>Total Visitors</span>
                            </div>
                            <div className="box-icon">
                                <i className="fas fa-users" style={{ fontSize: '1.5rem', color: '#4e73df' }}></i>
                            </div>
                        </div>
                    </div>
                    <div className="overview-item mb-3 p-3" style={{
                        border: '1px solid #e3e6f0',
                        borderRadius: '0.5rem',
                        backgroundColor: '#f8f9fc'
                    }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="box-content">
                                <h3 className="m-0" style={{ color: '#5a5c69', fontWeight: '700' }}>{dashboardData.totalProductViews.toLocaleString()}</h3>
                                <span className="text-muted" style={{ fontSize: '0.875rem' }}>Total Product Views</span>
                            </div>
                            <div className="box-icon">
                                <i className="fas fa-eye" style={{ fontSize: '1.5rem', color: '#1cc88a' }}></i>
                            </div>
                        </div>
                    </div>
                    <div className="overview-item p-3" style={{
                        border: '1px solid #e3e6f0',
                        borderRadius: '0.5rem',
                        backgroundColor: '#f8f9fc'
                    }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="box-content">
                                <h3 className="m-0" style={{ color: '#5a5c69', fontWeight: '700' }}>${dashboardData.revenuePerVisitor}</h3>
                                <span className="text-muted" style={{ fontSize: '0.875rem' }}>Revenue Per Visitor</span>
                            </div>
                            <div className="box-icon">
                                <i className="fas fa-dollar-sign" style={{ fontSize: '1.5rem', color: '#f6c23e' }}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const RevenueChartCard = () => (
        <div className="col-md-8 mb-4">
            <div className="box bg-white" style={{
                border: '1px solid #e3e6f0',
                borderRadius: '0.75rem',
                boxShadow: '0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15)',
                overflow: 'hidden'
            }}>
                <div className="box-title p-3" style={{
                    borderBottom: '1px solid #e3e6f0',
                    backgroundColor: '#f8f9fc'
                }}>
                    <h5 className="m-0" style={{ color: '#5a5c69', fontWeight: '600' }}>Revenue</h5>
                </div>
                <div className="box-row p-3">
                    <div className="box-content">
                        <div id="revenue-chart" style={{ width: '100%', height: '300px' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <AdminLayout>
            <div className="page-title col-sm-12 mb-4">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <h1 className="h3 m-0" style={{ color: '#5a5c69', fontWeight: '700' }}>Dashboard</h1>
                    </div>
                </div>
            </div>
            <div className="col-sm-12">
                <div className="row">
                    {/* Stat Cards */}
                    <StatCard 
                        title="Today Revenue" 
                        value={`$${dashboardData.todayRevenue}`} 
                        chartId="today-revenue"
                        borderColor="#4e73df"
                    />
                    <StatCard 
                        title="Product Sold" 
                        value={dashboardData.productsSold} 
                        chartId="product-sold"
                        borderColor="#1cc88a"
                    />
                    <StatCard 
                        title="New Customer" 
                        value={dashboardData.newCustomers} 
                        chartId="new-customer"
                        borderColor="#36b9cc"
                    />
                    <StatCard 
                        title="New Visitors" 
                        value={dashboardData.newVisitors} 
                        chartId="new-visitors"
                        borderColor="#f6c23e"
                    />

                    {/* Chart Cards */}
                    <ChartCard 
                        title="Sales By Category" 
                        chartId="overview-chart" 
                        showDropdown={true}
                    />
                    <ChartCard 
                        title="Targets" 
                        chartId="targets-chart" 
                    />
                    
                    {/* Notifications Card */}
                    <NotificationCard />

                    {/* Overview Card */}
                    <OverviewCard />

                    {/* Revenue Chart Card */}
                    <RevenueChartCard />
                </div>
            </div>
        </AdminLayout>
    );
}

export default Dashboard;