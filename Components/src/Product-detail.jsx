import React from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import MenuBar from './menu-bar.jsx'
import OrderCart from './order-cart.jsx'
import MyPage from './my-page.jsx'
import TrackDelivery from './track-delivery.jsx'
import Footer from './footer.jsx'
import '../stylesheets/Product-Detail.css'
import FA from 'react-fontawesome'

class ProductDetail extends React.Component{
	constructor(props) {
		super(props)

		this.state = {
			itemName: ``,
			itemPrice: ``,
			img: ``,
			customPrice: ``,
			point: ``,
			deliveryfee: ``,
			feature: ``,
			dust: ``,
			size: ``,
			using: ``,
			company: ``,
		}
	}

	componentWillMount() {
		this.loadItem()	
	}

	async loadItem() {
		const res = await fetch(`https://mask-shop.kro.kr/v1/api/item/${new URL(location.href).searchParams.get(`name`)}`)
		const item = await res.json()

		this.setState({
			img: item.contentimg,
			itemName: item.itemname,
			itemPrice: item.productprice,
			customPrice: item.customprice,
			point: item.point,
			deliveryfee: item.deliveryfee,
			feature: item.feature,
			dust: item.dust,
			size: item.size,
			using: item.using,
			company: item.company,
		})
	}

	async showPayment() {
		const res = await fetch(`https://mask-shop.kro.kr/v1/api/item/${new URL(location.href).searchParams.get(`name`)}`)
		const item = await res.json()

		const IMP = window.IMP
		IMP.init(`imp92116496`)
		IMP.request_pay({
			pg : `payco`,
			pay_method : `card`,
			merchant_uid : `merchant_` + new Date().getTime(),
			name : `상품명: ${item.itemname}`,
			amount : item.productprice,
			buyer_email : `taeuk_kang@naver.com`,
			buyer_name : `구매자이름`,
			buyer_tel : `010-1234-5678`,
			buyer_addr : `주소`,
			buyer_postcode : `123-456`,
			m_redirect_url : `https://mask-shop.kro.kr/`,
		}, rsp => {
			if ( rsp.success ) {
				let msg = `결제가 완료되었습니다.`
				msg += `고유ID : ` + rsp.imp_uid
				msg += `상점 거래ID : ` + rsp.merchant_uid
				msg += `결제 금액 : ` + rsp.paid_amount
				msg += `카드 승인번호 : ` + rsp.apply_num
			} else {
				let msg = `결제에 실패하였습니다.`
				msg += `에러내용 : ` + rsp.error_msg
			}	
		})
	}

	render() {

		return (
			<React.Fragment>
				<div className={`Wrapper`}>
					<MenuBar/>
					<OrderCart></OrderCart>
					<MyPage></MyPage>
					<TrackDelivery></TrackDelivery>
					<div className={`Flex-Nav-Monitor`}>
						<span className={`Flex-Nav-Monitor__Text`}>{`Home`} > {`선택된 메뉴명`} > {`선택된 아이템명`}</span>
					</div>

					<div className={`Grid-Item-Summary-Container`}>
						<div className={`Summary-Container__Item`}>
							<img src={this.state.img} width='100%'/>
						</div>
						<div className={`Summary-Container__Item`}>

							<hr className={`Bold-Band --Dark`} />

							<div className={`Item-Title-Container`}>
								<span className={`Item-Title-Container__Text`}>{this.state.itemName}</span>
							</div>

							<hr className={`Normal-Band --Light-Dark`}/>

							<div >

								<div className={`Grid-Price-Detail-Container`}>
									<div className={`Price-Detail-Container --Item-Key`}>
										<span className={`Item-Key__Text --Price`}>
											{`판매가`}
										</span>
									</div>
									<div className={`Price-Detail-Container --Item-Value`}>
										<span className={`Item-Value__Text --Price`}>
											{`${this.state.itemPrice}원`}
										</span>
									</div>
								</div>
								<div className={`Grid-Price-Detail-Container`}>
									<div className={`Price-Detail-Container --Item-Key`}>
										<span className={`Item-Key__Text`}>
											{`소비자가`}
										</span>
									</div>
									<div className={`Price-Detail-Container --Item-Value`}>
										<span className={`Item-Value__Text`}>
											{`${this.state.customPrice}원`}
										</span>
									</div>
								</div>
								<div className={`Grid-Price-Detail-Container`}>
									<div className={`Price-Detail-Container --Item-Key`}>
										<span className={`Item-Key__Text`}>
											{`적립금`}
										</span>
									</div>
									<div className={`Price-Detail-Container --Item-Value`}>
										<span className={`Item-Value__Text`}>
											{`${this.state.point}원`}
										</span>
									</div>
								</div>
								<div className={`Grid-Price-Detail-Container`}>
									<div className={`Price-Detail-Container --Item-Key`}>
										<span className={`Item-Key__Text`}>
											{`배송비`}
										</span>
									</div>
									<div className={`Price-Detail-Container --Item-Value`}>
										<span className={`Item-Value__Text`}>
											{`${this.state.deliveryfee}원`}
										</span>
									</div>
								</div>
							</div>
							<hr className={`Normal-Band --Light-Dark`}/>

							<div className={`Item-Short-Description-Container`}>
								<span className={`Item-Short-Description__Text`}>
									{`#${this.state.feature} #${this.state.dust}, #${this.state.size}, #${this.state.using}, #${this.state.company}`}
								</span>
							</div>

							<hr className={`Normal-Band --Light-Dark`}/>

							<div className={`Grid-Order-Option-Container`}>
								<div className={`Option-Container__Item`}>
									<div className={`Order-Option `}>
										<span className={`Option-Key`}>
											{`> 수량`}
										</span>
									</div>
									<div className={`Order-Option`}>
										<input className={`Option`} type="number" defaultValue={1} min={`1`} name={`quantity`} />
									</div>
								</div>
								<div className={`Option-Container__Item`}>
									<div className={`Order-Option`}>
										<span className={`Option-Key`}>
											{`> 사이즈`}
										</span>
									</div>
									<div className={`Order-Option`}>
										<select className={`Option`} name="" id="">
											<option value="">{`사이즈 선택`}</option>
											<option value="">{`-------------------------`}</option>
											<option value="M">M</option>
											<option value="L">L</option>
											<option value="XL">XL</option>
											<option value="XXL">XXL</option>
											<option value="XXXL">XXXL</option>
										</select>
									</div>
								</div>
								<div className={`Option-Container__Item`}>
									<div className={`Order-Option`}>
										<span className={`Option-Key`}>
											{`> 정기배송`}
										</span>
									</div>
									<div className={`Order-Option`}>
										<select className={`Option`} name="" id="">
											<option value="">{`배송주기 선택`}</option>
											<option value="">{`-------------------------`}</option>
											<option value="M">1개월</option>
											<option value="L">2개월</option>
											<option value="XL">3개월</option>
											<option value="XXL">4개월</option>
										</select>
									</div>
								</div>
							</div>

							<hr className={`Normal-Band --Light-Dark`}/>

							<div className={`Caution-Container`}>
								<span className={`Caution-Container__Text`}>
									{`최소주문수량 1개 이상`}
								</span>
							</div>

							<hr className={`Bold-Band --Dark`}/>

							<div className={`Order-Info-Container`}>
								<div className={`Grid-Info-Container`}>
									<div className={`Info-Container__Item`}>
										<span className={`Info-Container__Item-Text`}>
											{`상품명`}
										</span>
									</div>
									<div className={`Info-Container__Item --Justify-Center`}>
										<span className={`Info-Container__Item-Text`}>
											{`상품수`}
										</span>
									</div>
									<div className={`Info-Container__Item --Justify-Center`}>
										<span className={`Info-Container__Item-Text`}>
											{`가격`}
										</span>
									</div>
								</div>
							</div>

							<hr className={`Normal-Band --Light-Dark`}/>

							<div className={`Order-Info-Container`}>
								<div className={`Grid-Info-Container`}>
									<div className={`Info-Container__Item`}>
										<span className={`Info-Container__Item-Text`}>
											{`선택한 아이템 이름`}
										</span>
									</div>
									<div className={`Info-Container__Item --Justify-Center`}>
										<span className={`Info-Container__Item-Text`}>
											{`옵션 수량을 반영`}
										</span>
									</div>
									<div className={`Info-Container__Item --Flex-End --Padding-Light-15`}>
										<span className={`Info-Container__Item-Text`}>
											{`상품수 X 가격`}
										</span>
									</div>
								</div>
							</div>

							<hr className={`Normal-Band --Light-Dark`}/>

							<div className={`Flex-Total-Price-Container`}>
								<span className={`Total-Price-Container__Text`}>
									{`합계 : `}
								</span>
								<span className={`Total-Price-Container__Number`}>
									{`상품수 X 가격`}
								</span>
							</div>

							<hr className={`Normal-Band --Light-Dark`}/>

							<div className={`Grid-Order-Buttons-Container`}>

								<div className={`Order-Buttons__Item --Transition-Color`} onClickCapture={this.showPayment}>
									<span className={`Order-Buttons__Item-Text `}>
										{`바로구매`}
									</span>
								</div>

								<div className={`Order-Buttons__Item --Transition-Color --Transition-Border`}>
									<span className={`Order-Buttons__Item-Text`}>
										{`장바구니`}
									</span>
								</div>

								<div className={`Order-Buttons__Item --Transition-Color --Transition-Border`}>
									<span className={`Order-Buttons__Item-Text`}>
										{`관심상품`}
									</span>
								</div>

							</div>

						</div>


					</div>

					<hr className={`Normal-Band --Light-Dark`}/>

					{renderAnchor}

					<div id={`prdDetail`} className={`Dummy-Product-Detail`}>
						<span>
							{`상품 설명이 이곳에 담긴다.`}
						</span>
					</div>

					<hr className={`Normal-Band --Light-Dark`}/>

					{/* <div id={`relatedItem`}>
						<h3 className={`relatedItem__Header`}>
							{`관련 아이템`}
						</h3>

						<div className={`relatedItem__Slider`} style={{width : `100%`}}>

							<IconContext.Provider value={{className : `Icon-Color`}}>
								<a className={`Slider-Prev`} >
									<FaAngleLeft />
								</a>
							</IconContext.Provider>

							<IconContext.Provider value={{className : `Icon-Color`}}>
								<a className={`Slider-Next`} >
									<FaAngleRight />
								</a>
							</IconContext.Provider>


						</div>

					</div> */}

					<hr className={`Normal-Band --Light-Dark`}/>

					<div id={`reply`}>
						<h3 className={`reply__Header`}>
							{`댓글 & 리뷰`}
						</h3>

						<div className={`Grid-Search-Query-Container`}>

							<div className={`Query-Container__Item Grid-Order-By`}>
								<div className={`Order-By`}>
									<span className={`Order-By__Text --Selected`}>
										{`최신순`}
									</span>
								</div>

								<div className={`Order-By`}>
									<span className={`Order-By__Text`}>
										{`평점순`}
									</span>
								</div>

								<div className={`Order-By`}>
									<span className={`Order-By__Text`}>
										{`조회수순`}
									</span>
								</div>
							</div>

							<div className={`Query-Container__Item`}></div>

							<div className={`Query-Container__Item Grid-Search-By`}>

								<div className={`Search-By`}>
									<input type="checkbox"/><span className={`Photo-Only`}>
										{`포토리뷰만 보기`}
									</span>
								</div>
								<div className={`Search-By`}>
									<select name="" id="">
										<option value="내용">내용</option>
										<option value="아이디">아이디</option>
									</select>
								</div>
								<div className={`Search-By`}>
									<div className={`IconSearch`}>
										<input type="text" placeholder={`검색어 입력 ...`}/>
										{/* <IconContext.Provider value={{color : `#555` , width : `20%`}}>
											<FaSearch />
										</IconContext.Provider> */}
									</div>
								</div>

							</div>
						</div>

						<div className={`Flex-Buttons`}>
							<div className={`Flex-Button Write-Button`}>
								<span className={`Flex-Button__Text`}>후기 작성</span>
							</div>
							<div className={`Flex-Button Show-Button`}>
								<span className={`Flex-Button__Text`}>모두 보기</span>
							</div>
						</div>

					</div>
					<hr className={`Normal-Band --Light-Dark`}/>
					<div id={`question`}>
						<h3 className={`Question__Header`}>
							Q & A
						</h3>

						<div>

							<hr className={`Normal-Band --Light-Dark`}/>
							<div className={`Question-Grid-Board`}>
								<div className={`Grid-Board__Row`}>
									<div className={`Grid-Board__Item`}>
										<span className={`Grid-Board__Item-Text`}>
											{`번호`}
										</span>
									</div>
									<div className={`Grid-Board__Item`}>
										<span className={`Grid-Board__Item-Text`}>
											{`제목`}
										</span>
									</div>
									<div className={`Grid-Board__Item`}>
										<div className={`Grid-Board__Item__Item`}>
											<span className={`Grid-Board__Item-Text`}>
												{`작성자`}
											</span>
										</div>
										<div className={`Grid-Board__Item__Item`}>
											<span className={`Grid-Board__Item-Text`}>
												{`작성일`}
											</span>
										</div>
										<div className={`Grid-Board__Item__Item`}>
											<span className={`Grid-Board__Item-Text`}>
												{`조회수`}
											</span>
										</div>
									</div>
								</div>

								<div className={`Dummy-Height`}>

								</div>

								<hr className={`Normal-Band --Light-Dark`}/>

								<div className={`Flex-Buttons`}>
									<div className={`Flex-Button Write-Button`}>
										<span className={`Flex-Button__Text`}>
											{`질문 작성`}
										</span>
									</div>
									<div className={`Flex-Button Show-Button`}>
										<span className={`Flex-Button__Text`}>
											{`모두 보기`}
										</span>
									</div>
								</div>

								<div className={`Page-Move`}>
									<div className={`Grid-Page-Box`}>
										<div className={`Grid-Page-Box__Item`}>
											<FA className='FA16' name='angle-double-left'></FA>
										</div>
										<div className={`Grid-Page-Box__Item`}>
											<FA className='FA16' name='angle-left'></FA>
										</div>
										<div className={`Grid-Page-Box__Item`}>
											<span>
												{1}
											</span>
										</div>
										<div className={`Grid-Page-Box__Item`}>
											<FA className='FA16' name='angle-right'></FA>
										</div>
										<div className={`Grid-Page-Box__Item`}>
											<FA className='FA16' name='angle-double-right'></FA>
										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
				<Footer />
			</React.Fragment>
		)
	}
}


const renderAnchor = (
	<div className={`Flex-Anchor-Container`}>
		<div className={`Anchor-Container__Item`}>
			<a href={`#prdDetail`} className={`Anchor-Container__Item-Text`}>
				{`상세 정보`}
			</a>
		</div>
		{/* <div className={`Anchor-Container__Item`}>
			<a href={`#relatedItem`} className={`Anchor-Container__Item-Text`}>
				{`관련 아이템`}
			</a>
		</div> */}
		<div className={`Anchor-Container__Item`}>
			<a href={`#question`} className={`Anchor-Container__Item-Text`}>
				{`댓글 보기`}
			</a>
			<span className={`Anchor-Container__Item-Number`}>
				{0}
			</span>
		</div>
		<div className={`Anchor-Container__Item`}>
			<a href={`#reply`} className={`Anchor-Container__Item-Text`}>
				{`Q & A`}
			</a>
			<span className={`Anchor-Container__Item-Number`}>
				{0}
			</span>
		</div>
	</div>
)

const mapStateToProps = state => (

	{
		productDetailState : state.productDetailState
	}

)

ProductDetail = withRouter(connect(mapStateToProps, null)(ProductDetail))

export default ProductDetail
