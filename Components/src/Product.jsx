import React from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _history from '../history/_history.js'

import '../stylesheets/Product.css'
import MenuBar from './menu-bar.jsx'
import ProductMain from './product-main.jsx'

class Product extends React.Component{	
	handleRouteToHome(){
		_history.push(`/`)
	}

	render(){
		return(
			<div className='product'>
				<MenuBar></MenuBar>
				<ProductMain></ProductMain>
			</div>
		)
	}
}

Product = withRouter(connect(null, null)(Product))

export default Product
