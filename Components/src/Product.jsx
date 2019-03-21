import React from 'react'

import * as Actions from '../redux/Action.js'
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

const mapStateToProps = state => ({
	myState : state.myReducer,
})

const mapDispatchToProps = dispatch => ({

	myDispatch : {

		changeText(){

			const myInput = document.getElementById(`MY_INPUT`)
			dispatch(Actions.AC_USER_CLICKED_BUTTON(myInput.value))
			myInput.value = ``

		},

	},

})

// eslint-disable-next-line no-class-assign
Product = withRouter(connect(mapStateToProps,mapDispatchToProps)(Product))

export default Product
