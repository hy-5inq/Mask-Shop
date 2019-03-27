import React from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import MenuBar from './menu-bar.jsx'

import '../stylesheets/Product-Detail.css'

class ProductDetail extends React.Component{

	render() {
		return (
			<div className={`Wrapper`}>
				<MenuBar/>

				<div className={`Flex-Nav-Monitor`}>
					<span className={`Flex-Nav-Monitor__Text`}>{`Home`} > {`선택된 메뉴명`} > {`선택된 아이템명`}</span>
				</div>

				<div className={`Grid-Item-Summary-Container`}>
					<div className={`Summary-Container__Item`}>

					</div>
					<div className={`Summary-Container__Item`}>

						<hr className={`Bold-Band --Dark`} />

						<div className={`Item-Title-Container`}>
							<span className={`Item-Title-Container__Text`}>{`마스크 MK-101`}</span>
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
										{`33,333원`}
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
										{`35,000원`}
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
										{`350원 (1%)`}
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
										{`2,500원 (40,000원 이상 구매시 무료)`}
									</span>
								</div>
							</div>
						</div>
						<hr className={`Normal-Band --Light-Dark`}/>

						<div className={`Item-Short-Description-Container`}>
							<span className={`Item-Short-Description__Text`}>
								{`# 마스크 특징 1 , # 마스크 특징 2 ...`}
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
									<input className={`Option`} type="number" min={`1`} name={`quantity`} />
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
										<option value="">{`[필수] 사이즈를 선택하세요`}</option>
										<option value="">{`-------------------------`}</option>
										<option value="M">M</option>
										<option value="L">L</option>
										<option value="XL">XL</option>
										<option value="XXL">XXL</option>
										<option value="XXXL">XXXL</option>
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

							<div className={`Order-Buttons__Item --Transition-Color`}>
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

				<div className={`Flex-Anchor-Container`}>
					<div className={`Anchor-Container__Item`}>
						<a href={`#prdDetail`} className={`Anchor-Container__Item-Text`}>
							{`상세 정보`}
						</a>
					</div>
					<div className={`Anchor-Container__Item`}>
						<a href={`#relatedItem`} className={`Anchor-Container__Item-Text`}>
							{`관련 아이템`}
						</a>
					</div>
					<div className={`Anchor-Container__Item`}>
						<a href={`#reply`} className={`Anchor-Container__Item-Text`}>
							{`댓글 보기`}
						</a>
						<span className={`Anchor-Container__Item-Number`}>
							{0}
						</span>
					</div>
					<div className={`Anchor-Container__Item`}>
						<a href={`#question`} className={`Anchor-Container__Item-Text`}>
							{`질문 보기`}
						</a>
						<span className={`Anchor-Container__Item-Number`}>
							{0}
						</span>
					</div>
				</div>

				<div className={`Dummy-Product-Detail`}>
					<span>
						{`상품 설명이 이곳에 담긴다.`}
					</span>
				</div>

				<hr className={`Normal-Band --Light-Dark`}/>

				<div className={`Flex-Anchor-Container`}>
					<div className={`Anchor-Container__Item`}>
						<a href={`#prdDetail`} className={`Anchor-Container__Item-Text`}>
							{`상세 정보`}
						</a>
					</div>
					<div className={`Anchor-Container__Item`}>
						<a href={`#relatedItem`} className={`Anchor-Container__Item-Text`}>
							{`관련 아이템`}
						</a>
					</div>
					<div className={`Anchor-Container__Item`}>
						<a href={`#reply`} className={`Anchor-Container__Item-Text`}>
							{`댓글 보기`}
						</a>
						<span className={`Anchor-Container__Item-Number`}>
							{0}
						</span>
					</div>
					<div className={`Anchor-Container__Item`}>
						<a href={`#question`} className={`Anchor-Container__Item-Text`}>
							{`질문 보기`}
						</a>
						<span className={`Anchor-Container__Item-Number`}>
							{0}
						</span>
					</div>
				</div>
			</div>
		)
	}
}

export default ProductDetail
