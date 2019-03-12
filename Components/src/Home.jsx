import React from 'react'

import * as Actions from '../redux/Action.js'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _history from '../history/_history.js'

import '../stylesheets/Home.css'

class Home extends React.Component{

	handleRouteToContact(){
		_history.push(`/Contact`)
	}

	render(){

		const { myState , myDispatch } = this.props

		return(
			<div>
				<div>
					<h1>Home</h1>
				</div>
				<div>
					<span>현재 스토어의 상태 : {myState.TEXT_STATE}</span>
				</div>
				<div>
					<input id="MY_INPUT" placeholder="텍스트 입력" type="text"/>
					<button onClick={myDispatch.changeText}>텍스트 상태 바꾸기</button>
				</div>
				<div>
					<button onClick={this.handleRouteToContact}>Contact로 이동</button>
				</div>
			</div>
		)
	}

}
// 스토어 데이터 상태 매핑
const mapStateToProps = state => ({
	myState : state.myReducer,
})
// 스토어 액션 디스패치 매핑
const mapDispatchToProps = dispatch => ({

	myDispatch : {

		changeText(){

			const myInput = document.getElementById(`MY_INPUT`)
			dispatch(Actions.AC_USER_CLICKED_BUTTON(myInput.value))
			myInput.value = ``

		},

	},

})

// 해당 컴포넌트를 라우팅 상태와 , 리덕스 스토어와 동기화
// eslint-disable-next-line no-class-assign
Home = withRouter(connect(mapStateToProps,mapDispatchToProps)(Home))

export default Home
