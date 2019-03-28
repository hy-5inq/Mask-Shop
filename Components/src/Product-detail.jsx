import React from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import MenuBar from './menu-bar.jsx'

import '../stylesheets/Product-Detail.css'
import FA from 'react-fontawesome'
import { FaAngleLeft , FaAngleRight , FaSearch , FaAngleDoubleLeft , FaAngleDoubleRight } from 'react-icons/fa'
import { IconContext } from 'react-icons'


class ProductDetail extends React.Component{

	render() {

		const { productDetailState } = this.props

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

				{renderAnchor}

				<div className={`Dummy-Product-Detail`}>
					<span>
						{`상품 설명이 이곳에 담긴다.`}
					</span>
				</div>

				<hr className={`Normal-Band --Light-Dark`}/>

				{renderAnchor}

				<div id={`relatedItem`}>
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

				</div>

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
									<IconContext.Provider value={{color : `#555` , width : `20%`}}>
										<FaSearch />
									</IconContext.Provider>
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

					<hr className={`Normal-Band --Light-Dark`}/>

					{renderAnchor}

					<div id={`question`}>
						<h3 className={`Question__Header`}>
							질문 보기
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
			</div>
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
			<a href={`#reply`} className={`Anchor-Container__Item-Text`}>
				{`질문 보기`}
			</a>
			<span className={`Anchor-Container__Item-Number`}>
				{0}
			</span>
		</div>
	</div>
)

const mapStateToProps = state => {

	return {
		productDetailState : state.productDetailState
	}

}

ProductDetail = withRouter(connect(mapStateToProps, null)(ProductDetail))

export default ProductDetail
