import React from 'react'
import '../stylesheets/footer.css'
import logo from '../../public/images/shoplogo.png'

class Footer extends React.Component{
	constructor(props) {
		super(props)
	}
	
	componentDidMount() {
		
	}

	render(){
		return(
			<footer>
				<div className='inner'>
					<div className='line'></div>
					<div className='content'>
						<div className='company-info'>COMPANY INFO</div>
						<div className='content-1'>
							<strong>회사명</strong>
							<span>주식회사 마스크샵</span>
							<strong>대표</strong>
							<span>최수장</span>
							<strong>대표전화</strong>
							<span>010-9433-4892</span>
							<strong>팩스</strong>
							<span>00-000-0000</span>
						</div>
						<div className='content-2'>
							<strong>주소</strong>
							<span>경기 안산시 상록구 한양대학교 ERICA 창의인재원 행복관 463호</span>
						</div>
						<div className='content-3'>
							<strong>사업자 등록번호</strong>
							<span>621-81-96559</span>
							<a target='_blank' href='http://www.ftc.go.kr/www/bizCommList.do?key=232'>사업자 정보 확인</a>
						</div>
						<div className='content-4'>
							<strong>개인정보관리책임자</strong>
							<span>강태욱</span>
							<strong>이메일</strong>
							<span>taeuk_kang@naver.com</span>
						</div>
					</div>
					<div className='phone'>
						<span className='phone-title'>전화문의</span>
						<span className='phone-number'>010-9433-4892</span>
						<strong className='phone-detail'>운영시간: 평일 11~16시(공휴일 제외)</strong>
					</div>
					<img className='mask-img' src={logo} width='200' height='100'/>					
				</div>				
				<div className='copylight'>COPYRIGHT © 2019 Mask Shop. ALL RIGHTS RESERVED.</div>
			</footer>			
		)
	}
}

export default Footer
