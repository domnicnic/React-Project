import React, { useState } from 'react'
import config from '../../../config/config'
import logo from '../../../assets/images/logo.png'
import login from '../../../assets/images/login.png'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { apiService } from '../../../services/api'
import { useTitle } from '../../../utils/titleManager'

function LoginPage() {
    const navigate = useNavigate()
    const { login: authLogin } = useAuth()
    const { register:userLogin, formState: { errors }, handleSubmit } = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    
    // Set page title
    useTitle('Login')

    const onSubmit = async (data) => {
        setIsLoading(true)
        setErrorMessage('')
        try {
            console.log('Attempting login with:', { email: data.email })
            const response = await apiService.login(data.email, data.password)
            if (response.success) {
                authLogin(response.data.user, response.data.token)
                navigate('/dashboard')
            } else {
                setErrorMessage('Login failed. Please check your credentials.')
            }
        } catch (error) {
            if (error.message === 'Login failed') {
                setErrorMessage('Invalid email or password. Please try again.')
            } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
                setErrorMessage('Network Error: Please check if the backend server is running on port 8001')
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.')
            }
        } finally {
            setIsLoading(false)
        }
    };
    
  return (
    <div className="login-page">
        <div className="login-box">
            <div className="contentBox">
                <div className="logo d-flex flex-wrap w-100">
                <img src={logo} alt="logo"/>
                </div>
                <h1>Welcome to {config.title}</h1>
                <p>Enter your email address and password to access admin panel.</p>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                            </div>
                              <input {...userLogin('email', { required: true })} type="text" className="form-control" placeholder="example@gmail.com" />
                        </div>
                        <span className='text-danger'>{errors.email?.type==='required' && 'Email is required'}</span>
                    </div>
                    <div className="form-group">
                        <label>Password <a className="float-right" href="forgot.html">Forgot your password?</a></label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-lock"></i></span>
                            </div>
                            <input {...userLogin('password', { required: true })} type="password" className="form-control" placeholder="Test@123"/>
                          </div>
                          <span className='text-danger'>{errors.password?.type==='required' && 'Password is required'}</span>
                    </div>
                    <div className="form-group">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div>
                    </div>
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <div className="form-group mb-0">
                        <button 
                            type="submit" 
                            className="btn btn-primary w-100" 
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
            <div className="imgBox d-none d-md-block">
                <img src={login} alt="image" />
            </div>
        </div>
    </div>
  )
}

export default LoginPage