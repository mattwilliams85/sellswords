import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, logoutUser } from '../actions/auth'

class App extends Component {

  constructor (props) {
    super(props)

    this.props.fetchUser()
    this.logOut = this.logOut.bind(this)
  }

  logOut () {
    this.props.logoutUser().then(data => {
      // reload props from reducer
      this.props.fetchUser()
    })
  }

  renderUserMenu (currentUser) {
    // if current user exists and user id exists than make user navigation
    if (currentUser && currentUser.uid) {
      return (
        <li className='dropdown'>
          <a href='#' className='dropdown-toggle' data-toggle='dropdown' role='button'
            aria-haspopup='true' aria-expanded='false'>
            {currentUser.displayName} <span className='caret' /></a>
          <ul className='dropdown-menu'>
            <li><Link to='/profile'>Profile</Link></li>
            <li role='separator' className='divider' />
            <li><Link to='/login' onClick={this.logOut}>Logout</Link></li>
          </ul>
        </li>
      )
    } else {
      return [
        <li key={1}><Link to='/login'>Login</Link></li>,
        <li key={2}><Link to='/register'>Register</Link></li>
      ]
    }
  }

  render () {
    return (
      <div>
        <header className='navbar navbar-static-top navbar-inverse' id='top' role='banner'>
          <div className='container'>
            <div className='navbar-header layout-row layout-align-space-between'>
              <Link to='/' className='navbar-brand title layout-row layout-align-start-center flex'>
                <div className='sword-icon' />
                SPELL SWORDS
              </Link>
              <div>
                <button className='navbar-toggle collapsed' type='button' data-toggle='collapse' data-target='.bs-navbar-collapse'>
                  <span className='sr-only'>Toggle navigation</span>
                  <span className='icon-bar' />
                  <span className='icon-bar' />
                  <span className='icon-bar' />
                </button>
              </div>
            </div>
            <nav className='collapse navbar-collapse bs-navbar-collapse' role='navigation'>
              <ul className='nav navbar-nav navbar-right'>
                { this.renderUserMenu(this.props.currentUser) }
              </ul>
            </nav>
          </div>
        </header>

        <div className='container layout-column layout-align-center-center'>
          <div className='main-wrap'>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fetchUser, logoutUser }, dispatch)
}

function mapStateToProps (state) {
  return { currentUser: state.currentUser }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
