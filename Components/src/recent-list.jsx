import React from 'react'
import '../stylesheets/recent-list.css'

class RecentList extends React.Component{
	constructor(props) {
		super(props)
	}

	render(){
		return(
			<div className='recent-list'>
				<div className='recent-content'>
					<img src='' className='recent-content-img' />
					<span className='recent-content-detail'>
						<a className='recent-content-title'>상품 이름 A</a><br/>
						<a className='recent-content-explain'>상품 설명...</a><br/>
						<a className='recent-content-price'>0,000원</a>
						<button className='recent-content-btn'>삭제</button>
					</span>
				</div>

				<div className='recent-content'>
					<img src='' className='recent-content-img' />
					<span className='recent-content-detail'>
						<a className='recent-content-title'>상품 이름 B</a><br/>
						<a className='recent-content-explain'>상품 설명...</a><br/>
						<a className='recent-content-price'>0,000원</a>
						<button className='recent-content-btn'>삭제</button>
					</span>
				</div>

				<div className='recent-content'>
					<img src='' className='recent-content-img' />
					<span className='recent-content-detail'>
						<a className='recent-content-title'>상품 이름 C</a><br/>
						<a className='recent-content-explain'>상품 설명...</a><br/>
						<a className='recent-content-price'>0,000원</a>
						<button className='recent-content-btn'>삭제</button>
					</span>
				</div>
			</div>
		)
	}
}

export default RecentList
