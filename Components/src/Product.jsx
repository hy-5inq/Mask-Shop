import React from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _history from '../history/_history.js'

import '../stylesheets/Product.css'
import OrderCart from './order-cart.jsx'
import MyPage from './my-page.jsx'
import TrackDelivery from './track-delivery.jsx'
import MenuBar from './menu-bar.jsx'
import ProductMain from './product-main.jsx'
import Footer from './footer.jsx'

class Product extends React.Component{	
	handleRouteToHome(){
		_history.push(`/`)
	}

	render(){
		return(
			<React.Fragment>
				<div className='product'>
					<MenuBar></MenuBar>
					<ProductMain></ProductMain>
					<OrderCart></OrderCart>
					<TrackDelivery></TrackDelivery>
					<MyPage></MyPage>					
				</div>
				<Footer />
			</React.Fragment>
		)
	}
}

Product = withRouter(connect(null, null)(Product))

export default Product
