import React from 'react'

import FA from 'react-fontawesome'

import '../stylesheets/snap-card.css'
import '../stylesheets/my-page.css'
import '../stylesheets/track-delivery.css'

class TrackDelivery extends React.Component {

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

					<div className="TrackDelivery__Element">
                        <div className="OrderCart__Element__Item">
							<span className="OrderCart__Element__Item__Text">2</span>
						</div>
						<div className="OrderCart__Element__Item">
							<span className="OrderCart__Element__Item__Text">마스크 MK-101 외 3건</span>
						</div>
						<div className="OrderCart__Element__Item">
							<span className="OrderCart__Element__Item__Text">100,000</span>
						</div>
						<div className="OrderCart__Element__Item">
							<span className="OrderCart__Element__Item__Text">배송 전</span>
						</div>
						<div className="OrderCart__Element__Item">
							<span className="OrderCart__Element__Item__Text">O</span>
						</div>
                        <div className="OrderCart__Element__Item">
                        <button className="TrackDelivery__Element__Item__Btn">취소</button>
						</div>

					</div>

                    <div className="TrackDelivery__Element">
                        <div className="OrderCart__Element__Item">
							<span className="OrderCart__Element__Item__Text">1</span>
						</div>
						<div className="OrderCart__Element__Item">
							<span className="OrderCart__Element__Item__Text">마스크 MK-102 외 3건</span>
						</div>
						<div className="OrderCart__Element__Item">
							<span className="OrderCart__Element__Item__Text">100,000</span>
						</div>
						<div className="OrderCart__Element__Item">
							<span className="OrderCart__Element__Item__Text">배송 중</span>
						</div>
						<div className="OrderCart__Element__Item">
							<span className="OrderCart__Element__Item__Text">O</span>
						</div>
                        <div className="OrderCart__Element__Item">
                            <button className="TrackDelivery__Element__Item__Btn">반품</button>
						</div>

					</div>

				</div>

			</div>

		)

	}


}

export default TrackDelivery
