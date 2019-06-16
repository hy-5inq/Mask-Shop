import React from 'react'
import '../stylesheets/modal-buy.css'

class ModalBuy extends React.Component{
	constructor(props) {
		super(props)
	}
	
	componentDidMount() {
		this.loadUserData()
	}

	onClickBack(event) {
		const modal = event.target.closest(`.modal-buy`)	
		if (!event.target.classList.contains(`modal-buy`)) {
			return
		}			

		modal.style.display = `none`
	}

	async loadUserData() {
		const res = await fetch(`https://mask-shop.kro.kr/v1/api/users`, {
			headers: {
				"x-access-token": document.cookie.split(';').map(item => {
					return item.split(`=`)[0] === `webtoken` && item.split(`=`)[1]
				}).toString()				
			}
		})
		const user = await res.json()

		const el = document.querySelector(`.modal-buy`)
		el.querySelector(`.modal-buy-name-input`).value = user.data.name
		el.querySelector(`.modal-buy-phone-1`).value = user.data.phone.split(`-`)[0]
		el.querySelector(`.modal-buy-phone-2`).value = user.data.phone.split(`-`)[1]
		el.querySelector(`.modal-buy-phone-3`).value = user.data.phone.split(`-`)[2]
		el.querySelector(`.modal-buy-email-input`).value = user.data.email
	}

	buy(event) {	
		event.preventDefault()
		const IMP = window.IMP
		const el = document.querySelector(`.modal-buy`)
		const name = el.querySelector(`.modal-buy-name-input`).value
		const address = `${el.querySelector(`.modal-buy-address-text`).value} ${el.querySelector(`.modal-buy-address-text-detail`).value}`
		const phone = `${el.querySelector(`.modal-buy-phone-1`).value}-${el.querySelector(`.modal-buy-phone-2`).value}-${el.querySelector(`.modal-buy-phone-3`).value}`
		const email = el.querySelector(`.modal-buy-email-input`).value

		if (name.length <= 0 || el.querySelector(`.modal-buy-address-text-detail`).value.length <= 0) {
			return
		}

		IMP.init(`imp92116496`)
		IMP.request_pay({
			pg : `payco`,
			pay_method : `card`,
			merchant_uid : `merchant_` + new Date().getTime(),
			name : `상품명: ${this.props.itemName}`,
			amount : this.props.itemPrice * this.props.itemNumber,
			buyer_email : email,
			buyer_name : name,
			buyer_tel : phone,
			buyer_addr : address,
			buyer_postcode : `123-456`,
		}, rsp => {
			if ( rsp.success ) {
				let msg = `결제가 완료되었습니다.`
				msg += `고유ID : ` + rsp.imp_uid
				msg += `상점 거래ID : ` + rsp.merchant_uid
				msg += `결제 금액 : ` + rsp.paid_amount
				msg += `카드 승인번호 : ` + rsp.apply_num
				location.href = `https://mask-shop.kro.kr/orderlist`
			} else {
				let msg = `결제에 실패하였습니다.`
				msg += `에러내용 : ` + rsp.error_msg
			}	
		})
		return
	}

	handleFindPostCode(){
        daum.postcode.load(function(){
            new daum.Postcode({
                oncomplete: function(data) {
					let zoneCodeInput = document.querySelector(`.modal-buy-address-code`)
					let addressInput = document.querySelector(`.modal-buy-address-text`)

					zoneCodeInput.value = data.zonecode
					addressInput.value = data.address
                }
            }).open()
		})
	}

	render(){
		return(
			<div className='modal-buy' onClick={this.onClickBack}>
				<form className='modal-buy-content'>
					<h1>배송지 선택</h1>	
					<label className='modal-buy-name-label'>· 이름</label>
					<input type='text' className='modal-buy-name-input' required/>
					
					<label className='modal-buy-address-label'>· 주소</label>
					<span className='modal-buy-address-input'>
						<button className='modal-buy-addrees-btn' onClick={this.handleFindPostCode.bind(this)}>주소찾기</button>
						<input className='modal-buy-address-code' type='text'  readOnly/>
						<input className='modal-buy-address-text' type='text' readOnly/>
						<input className='modal-buy-address-text-detail' type='text' required/>
					</span>

					<label className='modal-buy-phone-label'>· 연락처</label>
					<span className='modal-buy-phone-input'>
						<input className='modal-buy-phone-1' type='text' /> - <input className='modal-buy-phone-2' type='text' /> - <input className='modal-buy-phone-3' type='text' />
					</span>

					<label className='modal-buy-email-label'>· 이메일</label>
					<input type='text' className='modal-buy-email-input' />

					<button className='modal-buy-button' onClick={this.buy.bind(this)}>결제하기</button>						
				</form>
			</div>			
		)
	}
}

export default ModalBuy
