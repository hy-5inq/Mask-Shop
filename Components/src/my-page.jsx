import React from 'react'

import { MdPerson , MdKeyboardArrowLeft } from 'react-icons/md'
import { FaHistory, FaTruckMoving, FaUserCog } from 'react-icons/fa'

import '../stylesheets/snap-card.css'
import '../stylesheets/my-page.css'

class MyPage extends React.Component {

	handleFold(){

		const SnapCard = document.body.querySelector(`#MY_PAGE`)
		SnapCard.classList.add(`--Fold-Off`)

	}

	render(){

		return (

			<div id="MY_PAGE" className="SnapCard-Container --Fold-Off">

				<div className="SnapCard-Container__Header --Bg-OrderCart">

					<div className="Header__Item">
						<MdPerson className="Header__Item__Icon" />
					</div>

					<div className="Header__Item">
						<h3 className="Header__Item__Text">마이 페이지</h3>
					</div>

					<div className="Header__Item">
						<MdKeyboardArrowLeft onClick={this.handleFold} className="Header__Item__Icon --Fold" />
					</div>
				</div>

				<div className="MyPage-Grid-Container">
					<div className="MyPage-Grid-Container__Item">
                       
						<div className="MyPage-Grid-Container__Item__User-Box">

							<div className="MyPage-Grid-Container__Item__User-Box__Img-Box">
								<img src="" alt="회원 이미지"/>
							</div>
							<div className="MyPage-Grid-Container__Item__User-Box__Text-Box">

								<div>
									<span className="MyPage-Grid-Container__Item__User-Box__Text-Box__Text">함성준</span>
								</div>
                                
							</div>

						</div>

						<div className="MyPage-Grid-Container__Item__Info-Box">
							<div className="MyPage-Grid-Container__Item__Info-Box__Item">

								<div className="MyPage-Grid-Container__Item__Info-Box__Item__Header">
									<span className="MyPage-Grid-Container__Item__Info-Box__Item__Header__Text">나의 레벨</span>
								</div>
								<div className="MyPage-Grid-Container__Item__Info-Box__Item__Content">
									<span className="MyPage-Grid-Container__Item__Info-Box__Item__Content__Text --Color-Brown">Bronze</span>
								</div>
                                
							</div>
							<div className="MyPage-Grid-Container__Item__Info-Box__Item">

								<div className="MyPage-Grid-Container__Item__Info-Box__Item__Header">
									<span className="MyPage-Grid-Container__Item__Info-Box__Item__Header__Text">나의 댓글</span>
								</div>
								<div className="MyPage-Grid-Container__Item__Info-Box__Item__Content">
									<span className="MyPage-Grid-Container__Item__Info-Box__Item__Content__Text">0</span>
								</div>

							</div>
							<div className="MyPage-Grid-Container__Item__Info-Box__Item">

								<div className="MyPage-Grid-Container__Item__Info-Box__Item__Header">
									<span className="MyPage-Grid-Container__Item__Info-Box__Item__Header__Text">나의 리뷰</span>
								</div>
								<div className="MyPage-Grid-Container__Item__Info-Box__Item__Content">
									<span className="MyPage-Grid-Container__Item__Info-Box__Item__Content__Text">0</span>
								</div>

							</div>
							<div className="MyPage-Grid-Container__Item__Info-Box__Item">

								<div className="MyPage-Grid-Container__Item__Info-Box__Item__Header">
									<span className="MyPage-Grid-Container__Item__Info-Box__Item__Header__Text">마일리지</span>
								</div>
								<div className="MyPage-Grid-Container__Item__Info-Box__Item__Content">
									<span className="MyPage-Grid-Container__Item__Info-Box__Item__Content__Text">76,000</span>
								</div>

							</div>
						</div>

						<div className="MyPage-Grid-Container__Item__Nav-box">

							<FaHistory className="MyPage-Grid-Container__Item__Nav-box__Icon"/>
							<span className="MyPage-Grid-Container__Item__Nav-box__Text">주문 조회</span>

						</div>

						<div className="MyPage-Grid-Container__Item__Nav-box">

							<FaTruckMoving className="MyPage-Grid-Container__Item__Nav-box__Icon"/>
							<span className="MyPage-Grid-Container__Item__Nav-box__Text">배송 조회</span>

						</div>
						<div className="MyPage-Grid-Container__Item__Nav-box">

							<FaUserCog className="MyPage-Grid-Container__Item__Nav-box__Icon"/>
							<span className="MyPage-Grid-Container__Item__Nav-box__Text">회원정보 수정</span>

						</div>
					</div>
                   
				</div>

			</div>

		)

	}


}

export default MyPage
