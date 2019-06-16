import React from 'react'

import FA from 'react-fontawesome'
import CookieJS from 'js-cookie'

import '../stylesheets/snap-card.css'
import '../stylesheets/my-page.css'
import '../stylesheets/track-delivery.css'


class TrackDelivery extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			userOrder : []
		}
		this.ACTIVATE_DELETE_API_THIS_ORDER = this.ACTIVATE_DELETE_API_THIS_ORDER.bind(this)
		this.RENDER_USER_ORDER_STATE = this.RENDER_USER_ORDER_STATE.bind(this)
	}

	ACTIVATE_DELETE_API_THIS_ORDER = (orderNum) => {

		fetch(`https://mask-shop.kro.kr/v1/api/order/list/${orderNum}`,{
		  method : 'DELETE',
		}).then(response => (response.json())).then((Jres) => {
		  if(Jres.status === 'success'){
			
			alert('취소/반품 신청되었습니다.')
			let refreshedOrder = userOrder.reduce((acc,curr) => {
				if(curr.orderNum !== orderNum){
					acc = acc.concat(curr)
				}
				return acc
			},[])
			this.setState({
				userOrder : refreshedOrder 
			})
			// event.target.closest('.OrderList-ListBody-Wrapper').remove()
			// window.location.reload()
			
		  }
		}) 
	  
	  }

	  RENDER_USER_ORDER_STATE = (userOrder) => {

		return userOrder.map(el => {
			return (
				<div className="TrackDelivery__Element">
	
					<div className="OrderCart__Element__Item">
						<span className="OrderCart__Element__Item__Text">{`${el.orderNum}`}</span>
					</div>
					<div className="OrderCart__Element__Item">
						<span className="OrderCart__Element__Item__Text">{`${el.productName}`}</span>
					</div>
					<div className="OrderCart__Element__Item">
						<span className="OrderCart__Element__Item__Text">{`${parseInt(el.productCount) * parseInt(el.price)}`}</span>
					</div>
					<div className="OrderCart__Element__Item">
						<span className="OrderCart__Element__Item__Text">{`${el.deliver}`}</span>
					</div>
					<div className="OrderCart__Element__Item">
						<span className="OrderCart__Element__Item__Text">{`${el.cycle}`}</span>
					</div>
					<div className="OrderCart__Element__Item">
						<button onClick={()=>{
							this.ACTIVATE_DELETE_API_THIS_ORDER(el.orderNum)
						}} className="TrackDelivery__Element__Item__Btn">{`${TEXT_DECISION(el.deliver)}`}</button>
					</div>
	
				</div>
			)
		})
	
	}

	componentDidMount(){

		setInterval(()=>{

			let user =  window.sessionStorage.getItem('accountid')
			let Token = CookieJS.get('webtoken')
			if(user !== null){
				fetch(`https://mask-shop.kro.kr/v1/api/order/${user}`,{
					method : 'GET',
					headers : {
						'x-access-token' : Token
					}
				}).then(res=>(res.json())).then((res) => {
					if(res.length > 0){
						this.setState({
							userOrder : res
						})
					}
				})
			}
			
		},3000)

	}

	handleFold(){

		const SnapCard = document.body.querySelector(`#TRACK_DELIVERY`)
		SnapCard.classList.add(`--Fold-Off`)

	}

	render(){

		return (

			<div id="TRACK_DELIVERY" className="SnapCard-Container --Fold-Off">

				<div className="SnapCard-Container__Header --Bg-OrderCart">

					<div className="Header__Item">
						<FA className="Header__Item__Icon rotateY" name="truck" />
					</div>

					<div className="Header__Item">
						<h3 className="Header__Item__Text">배송 조회</h3>
					</div>

					<div onClick={this.handleFold} className="Header__Item">
						<FA className="Header__Item__Icon --Fold"  name="angle-left" />
					</div>

				</div>

                <div className="OrderCart-Container">
                
					<div className="TrackDelivery__Header">
                        <div className="OrderCart__Header__Item">
							<span className="OrderCart__Header__Item__Text">No</span>
						</div>
						<div className="OrderCart__Header__Item">
							<span className="OrderCart__Header__Item__Text">주문내용</span>
						</div>
						<div className="OrderCart__Header__Item">
							<span className="OrderCart__Header__Item__Text">주문가격</span>
						</div>
						<div className="OrderCart__Header__Item">
							<span className="OrderCart__Header__Item__Text">배송추적</span>
						</div>
						<div className="OrderCart__Header__Item">
							<span className="OrderCart__Header__Item__Text">정기배송</span>
						</div>
						<div className="OrderCart__Header__Item">
							<span className="OrderCart__Header__Item__Text">취소/반품</span>
						</div>
					</div>

					<div className="">
						{this.RENDER_USER_ORDER_STATE(this.state.userOrder)}
					</div>
        

				</div>

			</div>

		)

	}


}

const TEXT_DECISION = (deliver) => {
	if(deliver !== "배송준비"){
		return "반품"
	}
	return "취소"
}



export default TrackDelivery
