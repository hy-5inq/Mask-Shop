import React from 'react'
import FA from 'react-fontawesome' // FontAwesome

import '../stylesheets/menu-bar.css'

export default class MenuBar extends React.Component{
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
							<li className='login' i18n-content='LOGIN'></li>
							<li className='sign-up' i18n-content='SIGN_UP'></li>
							<li className='shop-basket' i18n-content='SHOP_BASKET'></li>
							<li className='my-page' i18n-content='MY_PAGE'></li>
						</ul>									

						<ul className='menu-top-right'>
							<li className='search'>
								<input type='text' className='search-text' />
								<a className='search-btn'><FA name='search' /></a>
							</li>
							<li className='recent-product'>
								<a className='recent-product-btn'><FA name='eye' /></a>
							</li>
							<li className='favorite-product'>
								<a className='favorite-product-btn'><FA name='star' /></a>
							</li>
							<li className='make-shorcut'>
								<a className='make-shortcut-btn'><FA name='map-pin' /></a>
							</li>
						</ul>
					</div>
				</div>
				<div className='menu-title' i18n-content='MENU_TITLE'></div>
				<div className='menu-bottom'>
					<div className='inner'>
						<span className='menu menu-all' 
							onMouseEnter={this.onMouseEnterMenu.bind(this)}
							onMouseLeave={this.onMouseLeaveMenu.bind(this)} >
							<FA name='bars' size='2x' />
							<div className='hover menu-all-hover' ></div>
						</span>
						<span className='menu menu-by-dust'
							onMouseEnter={this.onMouseEnterMenu.bind(this)}
							onMouseLeave={this.onMouseLeaveMenu.bind(this)}>
							<p i18n-content='MENU_BY_DUST'></p>
							<div className='hover menu-by-dust-hover' ></div>
						</span>
						<span className='menu menu-by-size'
							onMouseEnter={this.onMouseEnterMenu.bind(this)}
							onMouseLeave={this.onMouseLeaveMenu.bind(this)}>
							<p i18n-content='MENU_BY_SIZE'></p>
							<div className='hover menu-by-size-hover' ></div>
						</span>
						<span className='menu menu-by-usage'
							onMouseEnter={this.onMouseEnterMenu.bind(this)}
							onMouseLeave={this.onMouseLeaveMenu.bind(this)}>
							<p i18n-content='MENU_BY_USAGE'></p>
							<div className='hover menu-by-size-usage' ></div>
						</span>
						<span className='menu menu-by-company'
							onMouseEnter={this.onMouseEnterMenu.bind(this)}
							onMouseLeave={this.onMouseLeaveMenu.bind(this)}>
							<p i18n-content='MENU_BY_COMPANY'></p>
							<div className='hover menu-by-size-company' ></div>
						</span>
					</div>
				</div>
			</React.Fragment>
		)
	}

}
