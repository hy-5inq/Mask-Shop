import React from 'react'
import FA from 'react-fontawesome' // FontAwesome
import CookieJS from 'js-cookie'
import '../stylesheets/menu-bar.css'

import RecentList from './recent-list.jsx'

export default class MenuBar extends React.Component{
	constructor(props) {
		super(props)

		this.state = {
			userName: ``,
			defaultLoginResponsed : false
		}
	}	

	componentDidMount() {
		this.onClickCategory()
	}

	componentWillMount() {
		
		this.checkLogin()

	}	

	checkLogin() {
		// alert('카카오 닉네임111')
		console.log(this.Login.isLogin())
		console.log(this.DefaultLogin.isLogin())
		if (this.Login.isLogin()) {
			
			this.Login.getNickname()
		
		}
		else{

			this.DefaultLogin.isLogin()

		}
	}

	get Login() {
		const menuBar = this
		return {
			isLogin() {
				if (window.Kakao && !Kakao.Auth.getAccessToken()) {
					return false
				}
				return true
			},

			getNickname() {
				Kakao.API.request({
					url: `/v1/user/me`,
					success: res => {
						menuBar.setState({
							userName: res[`properties`][`nickname`],
						})

						return res[`properties`][`nickname`]
					},
					fail: err => {
						console.error(err)
					}
				})
			},

			kakaoLogout() {
				Kakao.Auth.logout()
				location.href = `/`
			}
		}
	}

	get DefaultLogin() {
		const menuBar = this
		return {

			isLogin(){
				this.getUserDataByToken()
			},

			getUserDataByToken(){

				return new Promise((resolve,reject) => {

					const webtoken = CookieJS.get('webtoken')

					if(webtoken !== 'undefined'){
	
						let myHeader = new Headers()
						myHeader.append("X-access-token", webtoken);

						fetch('https://mask-shop.kro.kr/v1/api/users',{
						method : 'GET',
						headers : myHeader
						}).then(response => (response.json()).then((Jres) => {

							console.log(Jres)

							window.sessionStorage.setItem('name',Jres.data.name)
							window.sessionStorage.setItem('accountid',Jres.data.accountid)
							window.sessionStorage.setItem('address',Jres.data.address)
							window.sessionStorage.setItem('confirmPasswordQuestion',Jres.data.confirmPasswordQuestion)
							window.sessionStorage.setItem('email',Jres.data.email)
							window.sessionStorage.setItem('mileage',Jres.data.mileage)
							window.sessionStorage.setItem('passwordQuestion',Jres.data.passwordQuestion)
							window.sessionStorage.setItem('phone',Jres.data.phone)
							window.sessionStorage.setItem('postCode',Jres.data.postCode)
							window.sessionStorage.setItem('rank',Jres.data.rank)

							menuBar.setState({
								userName : window.sessionStorage.getItem('name'),
								defaultLoginResponsed : true
							})


							resolve({
								status : true
							})
								
						}))
						
					}

				})
			},
			getNickName(){

				let name = window.sessionStorage.getItem('name')
				if(name != "undefined"){
					menuBar.setState({
						userName : name
					})
				}

			},

			Logout(){

				CookieJS.remove('webtoken')
				window.sessionStorage.removeItem('name')
				window.sessionStorage.removeItem('accountid')
				window.sessionStorage.removeItem('address')
				window.sessionStorage.removeItem('confirmPasswordQuestion')
				window.sessionStorage.removeItem('email')
				window.sessionStorage.removeItem('mileage')
				window.sessionStorage.removeItem('passwordQuestion')
				window.sessionStorage.removeItem('phone')
				window.sessionStorage.removeItem('postCode')
				window.sessionStorage.removeItem('rank')
				location.href = '/'

			}
		}

	onClickRecentList() {
		const recentList = document.querySelector(`.recent-list`)
		if (getComputedStyle(recentList).display === `none`) {			
			recentList.style.display = `inline-block`
		} else {
			recentList.style.display = `none`
		}
		
	}

	onClickCategory() {
		document.querySelectorAll(`.hover li`).forEach(li => {
			li.addEventListener(`click`, () => {
				location.href = `/product`
			})
		})
	}

	onClickTitle() {
		location.href = `/`
	}
	
	onClickSnapCard(id) {
		foldAll()
		const TARGET_CARD = document.body.querySelector(`#${id}`)
		TARGET_CARD.classList.remove(`--Fold-Off`)
		
	}
	
	onClickMyPage() {
		foldAll()
		const MY_PAGE = document.body.querySelector('#MY_PAGE')
		MY_PAGE.classList.remove(`--Fold-Off`)
		
	}
	
	onMouseEnterMenu(event) {
		const menu = event.target.closest(`.menu`)
		this.setVisibilityMenuAll(menu, `block`)		
	}

	onMouseLeaveMenu(event) {
		const menu = event.target.closest(`.menu`)
		this.setVisibilityMenuAll(menu, `none`)		
	}

	setVisibilityMenuAll(target, state) {
		const hoveredEl = target.closest(`.hover`) || target.querySelector(`.hover`)
		if (hoveredEl) {
			hoveredEl.style.display = state
		}
	}

	render(){
		return(
			<React.Fragment>
				<div className='menu-top'>
					<div className='inner'>
						<ul className='menu-top-left'>
							<li className='login'>
								<a href='/login'>
									{this.Login.isLogin() || this.state.defaultLoginResponsed ? 
										<span><strong>{this.state.userName}</strong>님 환영합니다!</span>
										: <span>로그인</span>}
								</a>
							</li>
							{this.Login.isLogin() || this.state.defaultLoginResponsed ? <li className='logout' onClickCapture={()=>{
								this.Login.kakaoLogout()
								this.DefaultLogin.Logout()
							}}><a>로그아웃</a></li> : <React.Fragment></React.Fragment>}
							<li className='join'><a href='/join' i18n-content='JOIN'></a></li>
							<li className='order-list'><a href='#' i18n-content='ORDER_LIST'></a></li>
							<li className='shop-basket' onClick={() => {
								this.onClickSnapCard(`ORDER_CART`)
							}}><a href='#' i18n-content='SHOP_BASKET'></a></li>
							<li className='track-delivery' onClick={() => {
								this.onClickSnapCard(`TRACK_DELIVERY`)
							}}><a href='#' i18n-content='TRACK_DELIVERY'></a></li>
						</ul>

						<ul className='menu-top-right'>
							<li className='search'>
								<input type='text' className='search-text' />
								<a className='search-btn'><FA name='search' /></a>
							</li>
							<li className='recent-product'>
								<a onClick={this.onClickRecentList} className='recent-product-btn'><FA name='eye' /></a>
								<RecentList />
							</li>
						</ul>
					</div>
				</div>
				<div className='menu-title' i18n-content='MENU_TITLE' onClick={this.onClickTitle}></div>
				<div className='menu-bottom'>
					<div className='inner'>
						<span className='menu menu-all' 
							onMouseEnter={this.onMouseEnterMenu.bind(this)}
							onMouseLeave={this.onMouseLeaveMenu.bind(this)} >
							<FA name='bars' size='2x' />
							<div className='hover menu-all-hover' >
								<ul className='ul-by-dust'>
									<li i18n-content='MENU_BY_DUST_1'></li>
									<li i18n-content='MENU_BY_DUST_2'></li>
									<li i18n-content='MENU_BY_DUST_3'></li>
									<li i18n-content='MENU_BY_DUST_4'></li>
								</ul>
								<ul className='ul-by-size'>
									<li i18n-content='MENU_BY_SIZE_SMALL'></li>
									<li i18n-content='MENU_BY_SIZE_MIDDLE'></li>
									<li i18n-content='MENU_BY_SIZE_BIG'></li>
								</ul>
								<ul className='ul-by-usage'>
									<li i18n-content='MENU_BY_USAGE_1'></li>
									<li i18n-content='MENU_BY_USAGE_2'></li>
									<li i18n-content='MENU_BY_USAGE_3'></li>
									<li i18n-content='MENU_BY_USAGE_4'></li>
									<li i18n-content='MENU_BY_USAGE_5'></li>
									<li i18n-content='MENU_BY_USAGE_6'></li>
								</ul>
								<ul className='ul-by-company'>
									<li i18n-content='MENU_BY_COMPANY_1'></li>
									<li i18n-content='MENU_BY_COMPANY_2'></li>
									<li i18n-content='MENU_BY_COMPANY_3'></li>
									<li i18n-content='MENU_BY_COMPANY_4'></li>
									<li i18n-content='MENU_BY_COMPANY_5'></li>
									<li i18n-content='MENU_BY_COMPANY_6'></li>
									<li i18n-content='MENU_BY_COMPANY_7'></li>
								</ul>
							</div>
						</span>
						<span className='menu menu-by-dust'
							onMouseEnter={this.onMouseEnterMenu.bind(this)}
							onMouseLeave={this.onMouseLeaveMenu.bind(this)}>
							<p i18n-content='MENU_BY_DUST'></p>
							<ul className='hover menu-by-dust-hover' >
								<li i18n-content='MENU_BY_DUST_1'></li>
								<li i18n-content='MENU_BY_DUST_2'></li>
								<li i18n-content='MENU_BY_DUST_3'></li>
								<li i18n-content='MENU_BY_DUST_4'></li>
							</ul>
						</span>
						<span className='menu menu-by-size'
							onMouseEnter={this.onMouseEnterMenu.bind(this)}
							onMouseLeave={this.onMouseLeaveMenu.bind(this)}>
							<p i18n-content='MENU_BY_SIZE'></p>
							<ul className='hover menu-by-size-hover' >
								<li i18n-content='MENU_BY_SIZE_SMALL'></li>
								<li i18n-content='MENU_BY_SIZE_MIDDLE'></li>
								<li i18n-content='MENU_BY_SIZE_BIG'></li>
							</ul>
						</span>
						<span className='menu menu-by-usage'
							onMouseEnter={this.onMouseEnterMenu.bind(this)}
							onMouseLeave={this.onMouseLeaveMenu.bind(this)}>
							<p i18n-content='MENU_BY_USAGE'></p>
							<ul className='hover menu-by-size-usage'>
								<li i18n-content='MENU_BY_USAGE_1'></li>
								<li i18n-content='MENU_BY_USAGE_2'></li>
								<li i18n-content='MENU_BY_USAGE_3'></li>
								<li i18n-content='MENU_BY_USAGE_4'></li>
								<li i18n-content='MENU_BY_USAGE_5'></li>
								<li i18n-content='MENU_BY_USAGE_6'></li>
							</ul>
						</span>
						<span className='menu menu-by-company'
							onMouseEnter={this.onMouseEnterMenu.bind(this)}
							onMouseLeave={this.onMouseLeaveMenu.bind(this)}>
							<p i18n-content='MENU_BY_COMPANY'></p>
							<ul className='hover menu-by-size-company'>
								<li i18n-content='MENU_BY_COMPANY_1'></li>
								<li i18n-content='MENU_BY_COMPANY_2'></li>
								<li i18n-content='MENU_BY_COMPANY_3'></li>
								<li i18n-content='MENU_BY_COMPANY_4'></li>
								<li i18n-content='MENU_BY_COMPANY_5'></li>
								<li i18n-content='MENU_BY_COMPANY_6'></li>
								<li i18n-content='MENU_BY_COMPANY_7'></li>
							</ul>
						</span>
					</div>
				</div>
			</React.Fragment>
		)
	}

}

const foldAll = () => {
	
	let snapCards = document.querySelectorAll('.SnapCard-Container').forEach((el) => {
		
		if( el.classList.contains(`--Fold-Off`) === false){
			el.classList.add(`--Fold-Off`)
		}
		
	})
	
}
