import React from 'react'
import FA from 'react-fontawesome' // FontAwesome

import '../stylesheets/product-main.css'

export default class ProductMain extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			item : [],
		}		
	}

	componentDidMount() {
		document.querySelectorAll(`.item img`).forEach(item => {
			item.addEventListener(`click`, () => {
				this.onClickProduct()
			})
		})

		document.querySelectorAll(`.item p`).forEach(item => {
			item.addEventListener(`click`, () => {
				this.onClickProduct()
			})
		})

		this.Item.getItem()
	}

	get Item() {
		const url = new URL(location.href)
		const main = this
		return {
			getCategory() {
				//Category: dust / size / usage / company
				let array
				switch (url.searchParams.get(`category`)) {
					case `dust`:
						array = [`50 - 80㎍/m³`, `80 - 100㎍/m³`, `100 - 150㎍/m³`, `150㎍/m³ 이상`]
						return array.map((el, index) => {
							if (url.searchParams.get(`subcategory`) == index) {						
								return <a href={`/product?category=dust&subcategory=${index}`} className='sub-menu-item active'>{el}</a>
							}
							return <a href={`/product?category=dust&subcategory=${index}`} className='sub-menu-item'>{el}</a>
						})
					case `size`:
						array = [`소형`, `중형`, `대형`]
						return array.map((el, index) => {
							if (url.searchParams.get(`subcategory`) == index) {
								return <a href={`/product?category=size&subcategory=${index}`} className='sub-menu-item active'>{el}</a>
							}
							return <a href={`/product?category=size&subcategory=${index}`} className='sub-menu-item'>{el}</a>
						})
					case `usage`:
						array = [`방한용`, `황사용`, `보건용`, `방역용`, `수술용`, `산업용`]
						return array.map((el, index) => {
							if (url.searchParams.get(`subcategory`) == index) {
								return <a href={`/product?category=usage&subcategory=${index}`} className='sub-menu-item active'>{el}</a>
							}
							return <a href={`/product?category=usage&subcategory=${index}`} className='sub-menu-item'>{el}</a>
						})
					case `company`:
						array = [`3M`, `크린탑`, `장정산업`, `DOBU`, `마스크상사`, `상공양행`, `림피어`, `세창에스엠`, `㈜HD메디스`]
						return array.map((el, index) => {
							if (url.searchParams.get(`subcategory`) == index) {
								return <a href={`/product?category=company&subcategory=${index}`} className='sub-menu-item active'>{el}</a>
							}
							return <a href={`/product?category=company&subcategory=${index}`} className='sub-menu-item'>{el}</a>
						})
					default: 
						console.info(`NO CATEGORY`)
				}				
			},

			getItem() {
				let array
				if (url.searchParams.get(`category`) === `dust`) array = [`50-80`, `80-100`, `100-150`, `150`]
				if (url.searchParams.get(`category`) === `size`) array = [`소형`, `중형`, `대형`]
				if (url.searchParams.get(`category`) === `using`) array = [`방한용`, `황사용`, `보건용`, `방역용`, `수술용`, `산업용`]
				if (url.searchParams.get(`category`) === `company`) array = [`3M`, `크린탑`, `장정산업`, `DOBU`, `마스크상사`, `상공양행`, `림피어`, `세창에스엠`, `㈜HD메디스`]
				fetch(`/v1/api/item/${url.searchParams.get(`category`)}/${array[url.searchParams.get(`subcategory`)]}`)
					.then(res => {
						return res.json()
					})
					.then(json => {
						main.setState({
							item : json.map(each => {
								return <span className='item' onClickCapture={() => {location.href=`/product-detail?name=${each.itemname}`}}>
											<img className='photo' src={each[`contentimg`][0]} alt='현재 사진 X'></img>
											<p className='item-name'>{each.itemname}</p>
											<p className='item-tag'>{each.feature}</p>
											<p className='item-price'>{each.customprice}원</p>
										</span>
							}) 	
						})
					})				
			}
		}
	}

	get convertCategoryName() {
		const url = new URL(location.href).searchParams.get(`category`)
		return () => {
			switch (url) {
				case `dust`:
					return `미세먼지 농도별`
				case `size`:
					return `크기별`
				case `usage`:
					return `사용별`
				case `company`:
					return `회사별`
			}
		}
	}

	render(){
		return(
			<div className='product-main'>
				<div className='sub-menu'>
					<div className='sub-menu-path'>
						<div className='inner'>
							Home  >  {this.convertCategoryName()}
						</div>
					</div>
					<div className='sub-menu-title'>
						<div className='inner'>
							<p>메뉴({this.convertCategoryName()})</p>
						</div>
					</div>
					<div className='sub-menu-list'>
						<div className='inner'>
							{this.Item.getCategory()}							
						</div>
					</div>
				</div>
				<div className='item-view'>
					<div className='bar'>
						<div className='inner'>
							<span className='total-number-item'>Total <strong>{this.state.item.length}</strong> items</span>
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
							{this.state.item}
						</div>
					</div>
					<div className='page-move'>
						<div className='inner'>
							<div className='page-move-box'>
								<FA className='start' name='angle-double-left'></FA>
								<FA className='before' name='angle-left'></FA>
								<span className='current'>1</span>
								<FA className='after' name='angle-right'></FA>
								<FA className='end' name='angle-double-right'></FA>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

}
