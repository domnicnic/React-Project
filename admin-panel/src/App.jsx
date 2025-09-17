import './App.css'
import '/src/css/bootstrap.min.css'
import '/src/css/dataTables.bootstrap4.min.css'
import '/src/css/daterangepicker.css'
import '/src/css/fontawesome.min.css'
import '/src/css/lightgallery.css'
import '/src/css/select2.min.css'
import logo from '/src/assets/images/logo.svg'
import login from '/src/assets/images/login.png'
import config from './config/config'
function App() {
  return (
    <>
      <div class="login-page">
            <div class="login-box">
                <div class="contentBox">
                    <div class="logo d-flex flex-wrap w-100">
                    <img src={logo} alt="logo"/>
                    </div>
                    <h1>Welcome to {config.title}</h1>
                    <p>Enter your email address and password to access admin panel.</p>
                    <form class="mt-4" action="dashboard.html">
                        <div class="form-group">
                            <label>Email Address</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                </div>
                                <input type="text" class="form-control" placeholder="example@arkasoftwares.com"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Password <a class="float-right" href="forgot.html">Forgot your password?</a></label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fal fa-lock"></i></span>
                                </div>
                                <input type="password" class="form-control" placeholder="Test@123"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                                <label class="form-check-label" for="exampleCheck1">Check me out</label>
                            </div>
                        </div>
                        <div class="form-group mb-0">
                            <button type="submit" class="btn btn-primary w-100">Login</button>
                        </div>
                    </form>
                </div>
                <div class="imgBox d-none d-md-block">
                    <img src={login} alt="image" />
                </div>
            </div>
      </div>
    </>
  )
}
export default App
