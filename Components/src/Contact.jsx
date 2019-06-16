import React from 'react'

import * as Actions from '../redux/Action.js'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _history from '../history/_history.js'

import '../stylesheets/Contact.css'

class Contact extends React.Component{

	handleRouteToHome(){
		_history.push(`/`)
	}

	render(){

		const { myState , myDispatch } = this.props

		return(
			<div>
				<div><h1>Contact</h1></div>
				<div>
					<span>현재 스토어의 상태 : {myState.TEXT_STATE}</span>
				</div>
				<div>
					<input id="MY_INPUT" placeholder="텍스트 입력" type="text"/>
					<button onClick={myDispatch.changeText}>텍스트 상태 바꾸기</button>
				</div>
				<div>
					<button onClick={this.handleRouteToHome}>Home으로 이동</button>
				</div>
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
