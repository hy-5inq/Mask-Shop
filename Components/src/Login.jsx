import React from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _history from '../history/_history.js'

import '../stylesheets/Login.css'
import MenuBar from './menu-bar.jsx';

class Login extends React.Component{

	handleRouteToHome(){
		_history.push(`/`)
	}

	render(){
		return(
			<React.Fragment>
				<MenuBar/>
				<div className='login-wrap'>
					<div className='login-content'>
						<div className='title' >
							<h1 className='login-title' i18n-content='LOGIN_TITLE'></h1>
						</div>
						<div className='login-id'>
							<label for='login-id-input' className='login-id-text' i18n-content='LOGIN_ID'></label>
							<input id='login-id-input' type='text' />
						</div>
						<div className='login-pwd'>
							<label for='login-pwd-input' className='login-pwd-text' i18n-content='LOGIN_PASSWORD'></label>
							<input id='login-pwd-input' type='text' />
						</div>
						<div className='submenu'>
							<input id='id-save-box' type='checkbox' />
							<label for='id-save-box' className='id-save-text' i18n-content='LOGIN_SAVE_ID'></label>
						</div>
						<div className='login-btn'>
							<button className='login-btn-naver'>
								<span className='icon-btn-naver'>N</span>
								<span i18n-content='LOGIN_BTN_NAVER'></span>
							</button>
							<button className='login-btn-kakao'>
								<span className='icon-btn-kakao'>K</span>
								<span i18n-content='LOGIN_BTN_KAKAO'></span>
							</button>
						</div>
						<div className='id-pwd-search'>
							<a className='id-search' i18n-content='LOGIN_ID_SEARCH'></a>
							<a className='pwd-search' i18n-content='LOGIN_PWD_SEARCH'></a>
						</div>						
					</div>
				</div>
			</React.Fragment>
		)
	}
}

Login = withRouter(connect(null, null)(Login))

export default Login
