import {Component} from 'react'
// import {Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'
import './index.css'

class LoginRoute extends Component {
  state = {userId: '', pin: '', loginFailure: false, errorMsg: ''}

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onSuccess = jwtToken => {
    Cookie.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onClickLogin = async event => {
    event.preventDefault()
    const {userId, pin} = this.state

    const details = {user_id: userId, pin}

    const url = 'https://apis.ccbp.in/ebank/login'

    const options = {method: 'POST', body: JSON.stringify(details)}
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    console.log(data)
    if (response.ok) {
      this.onSuccess(data.jwt_token)
    } else {
      this.setState({errorMsg: data.error_msg, loginFailure: true})
    }
  }

  renderLoginForm = () => {
    const {userId, pin, loginFailure, errorMsg} = this.state

    return (
      <div className="login-page">
        <div className="login-container">
          <img
            className="websiteLoginImg"
            alt="website login"
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png "
          />
          <form className="form" onSubmit={this.onClickLogin}>
            <h1>Welcome Back!</h1>
            <label className="label" htmlFor="userId">
              User ID
            </label>
            <input
              className="input"
              onChange={this.onChangeUserId}
              value={userId}
              id="userId"
              type="text"
              placeholder="Enter User ID"
            />
            <label className="label" htmlFor="pin">
              PIN
            </label>
            <input
              className="input"
              onChange={this.onChangePin}
              value={pin}
              id="pin"
              type="password"
              placeholder="Enter PIN"
            />

            <button className="login-btn" type="submit">
              Login
            </button>

            {loginFailure && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }

  render() {
    return <>{this.renderLoginForm()}</>
  }
}

export default LoginRoute
