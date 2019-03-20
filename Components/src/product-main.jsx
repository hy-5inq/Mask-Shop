import React from 'react'
import FA from 'react-fontawesome' // FontAwesome

import '../stylesheets/Product-main.css'

export default class ProductMain extends React.Component{
	render(){
		return(
			<div className='product-main'>
				<div className='sub-menu'>
					<div className='sub-menu-path'>
						<div className='inner'>
							Home > 선택된 메뉴명
						</div>
					</div>
					<div className='sub-menu-title'>
						<div className='inner'>
							<p>선택된 메뉴명</p>
						</div>
					</div>
					<div className='sub-menu-list'>
						<div className='inner'>
							<span className='sub-menu-item'>카테고리1</span>
							<span className='sub-menu-item'>카테고리2</span>
							<span className='sub-menu-item'>카테고리3</span>
							<span className='sub-menu-item'>카테고리4</span>
							<span className='sub-menu-item'>카테고리5</span>
							<span className='sub-menu-item'>카테고리6</span>
							<span className='sub-menu-item'>카테고리7</span>
							<span className='sub-menu-item'>카테고리8</span>
						</div>
					</div>
				</div>
				<div className='item-view'>
					<div className='bar'>
						<div className='inner'>
							<span className='total-number-item' i18n-content='TOTAL_NUMBER_ITEM'></span>
							<ul className='sort-item'>
								<li className='sort-popularity' i18n-content='SORT_POPULARITY'></li>
								<li className='sort-name' i18n-content='SORT_NAME'></li>
								<li className='sort-low-price' i18n-content='SORT_LOW_RPICE'></li>
								<li className='sort-high-price' i18n-content='SORT_HIGH_PRICE'></li>
								<li className='sort-date' i18n-content='SORT_DATE'></li>
							</ul>
						</div>
					</div>
					<div className='list'>
						<div className='inner'>
							
						</div>
					</div>
					<div className='page-move'>
						<div className='inner'></div>
					</div>
				</div>
			</div>
		)
	}

}
