import React from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _history from '../history/_history.js'
import CookieJS from 'js-cookie'
import '../stylesheets/Login.css'
import MenuBar from './menu-bar.jsx';
import Footer from './footer.jsx'
import { AC_SUCCESS_DEFAULT_LOGIN } from '../redux/LoginAction.js'

class Login extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			defaultLoginResponsed : false,
			
		}
	}

	handleRouteToHome(){
		_history.push(`/`)
	}

	componentWillMount() {
		this.checkLogin()
		
	}

	checkLogin() {
		if (this.isLogin || this.isDefaultLogin) {			
			location.href = `/`
			return
		}
		else{
			if(window.sessionStorage.getItem('accountid')){
				location.href = `/`
				return
			}
		}		
	}

	get isLogin() {
		if (window.Kakao && Kakao.Auth.getAccessToken()) {
			return true
		}
		return false
	}

	loginWithKakao() {		
		Kakao.Auth.login({
			success: authObj => {
				console.log(`Auth : ${JSON.stringify(authObj)}`)
				location.href = `/`
		  },
			fail: err => {
				console.log(err)
			}
		})
	}

	kakaoLogout() {
		Kakao.Auth.logout()
	}

	handleDefaultLogin(){
	
		let INPUT_ID = document.getElementById('login-id-input').value
		let INPUT_PW = document.getElementById('login-pwd-input').value

		fetch(`https://mask-shop.kro.kr/v1/api/auth/login`,{

			method : 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body : JSON.stringify({
				accountid : INPUT_ID,
				password : INPUT_PW
			})
			
		}).then(response => (response.json())).then((Jres) => {
			if(Jres.success === true){
				
				if(typeof(CookieJS.get('webtoken')) == "undefined"){

					CookieJS.set('webtoken',Jres.data)
				
				}
				else{

					CookieJS.remove('webtoken')
					CookieJS.set('webtoken',Jres.data)
				
				}
				
				location.href = '/'

			}
		}).catch()
	}

	get isDefaultLogin() {
		if (!window.sessionStorage.getItem(`accountid`)) {
			return false
		}
		return true
	}

	render(){
		return(			
			<React.Fragment>
				{this.isLogin || this.isDefaultLogin ? 
					<span></span>
					:
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
									<input id='login-pwd-input' type='password' />
								</div>
								<div className='submenu'>
									<input id='id-save-box' type='checkbox' />
									<label for='id-save-box' className='id-save-text' i18n-content='LOGIN_SAVE_ID'></label>
								</div>
								<div className='login-btn'>
									<button className='login-btn-default' onClick={this.handleDefaultLogin}>
										<span className='icon-btn-default'>M</span>
										<span i18n-content='LOGIN_BTN_DEFAULT'></span>
									</button>
									<button className='login-btn-kakao' onClick={this.loginWithKakao}>
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
						<Footer />
					</React.Fragment>			
				}
			</React.Fragment>
		)
	}
}

Login = withRouter(connect(null, null)(Login))

export default Login
