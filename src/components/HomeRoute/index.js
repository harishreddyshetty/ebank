import './index.css'
import Cookie from 'js-cookie'

const HomeRoute = props => {
  const onClickLogout = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }

  return (
    <div className="home-page">
      <nav className="nav-bar">
        <img
          alt="website logo"
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
        />

        <button onClick={onClickLogout} className="logout-btn" type="button">
          Logout
        </button>
      </nav>
      <div className="card-container">
        <h1 style={{color: 'white', fontSize: '40px'}}>
          Your Flexibility, Our Excellence
        </h1>
        <img
          style={{width: '600px'}}
          alt="digital card"
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
        />
      </div>
    </div>
  )
}

export default HomeRoute
