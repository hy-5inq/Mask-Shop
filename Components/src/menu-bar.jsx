import React from 'react'
import FA from 'react-fontawesome' // FontAwesome

import '../stylesheets/menu-bar.css'

export default class MenuBar extends React.Component{
	constructor(props) {
		super(props)

		this.state = {
			userName: ``,
		}
	}	

	componentDidMount() {
		this.onClickCategory()
	}

	componentWillMount() {
		this.checkLogin()
	}	

	checkLogin() {
		if (this.Login.isLogin()) {
			this.Login.getNickname()
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
	
	onClickShopBasket() {
		
		foldAll()
		const ORDER_CART = document.body.querySelector('#ORDER_CART')
		ORDER_CART.classList.remove(`--Fold-Off`)
		
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
									{this.Login.isLogin() ? 
										<span><strong>{this.state.userName}</strong>님 환영합니다!</span>
										: <span>로그인</span>}
								</a>
							</li>
							{this.Login.isLogin() ? <li className='logout' onClickCapture={this.Login.kakaoLogout}><a>로그아웃</a></li> : <React.Fragment></React.Fragment>}
							<li className='order-list'><a href='#' i18n-content='ORDER_LIST'></a></li>
							<li className='shop-basket' onClick={this.onClickShopBasket}><a href='#' i18n-content='SHOP_BASKET'></a></li>
							<li className='my-page' onClick={this.onClickMyPage}><a href='#' i18n-content='MY_PAGE'></a></li>
						</ul>

						<ul className='menu-top-right'>
							<li className='search'>
								<input type='text' className='search-text' />
								<a className='search-btn'><FA name='search' /></a>
							</li>
							<li className='recent-product'>
								<a className='recent-product-btn'><FA name='eye' /></a>
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
