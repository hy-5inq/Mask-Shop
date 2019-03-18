import React from 'react'

import * as Actions from '../redux/Action.js'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _history from '../history/_history.js'

import '../stylesheets/Product.css'
import i18next from 'i18next';

class Contact extends React.Component{

	handleRouteToHome(){
		_history.push(`/`)
	}

	render(){
		return(
			<div class='product'>
				<header class='toolbar'>${i18next.t(`APP_NAME`)}</header>
				<main></main>
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
Contact = withRouter(connect(mapStateToProps,mapDispatchToProps)(Contact))

export default Contact
