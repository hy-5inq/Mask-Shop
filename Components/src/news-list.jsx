import React from 'react'
import '../stylesheets/news-list.css'

class NewsList extends React.Component{
	constructor(props) {
		super(props)

		this.state = {
			time: null,
		}
	}
	
	componentDidMount() {
		this.el = document.querySelector(`.news-list`)
		this.updateNewsList()
	}

	updateNewsList() {
		fetch(`/api/www.google.com/search?tbm=nws&q=%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80`)
			.then(data => data.text())
			.then(dom => {
				const oParser = new DOMParser()
				const oDOM = oParser.parseFromString(dom, `text/html`)
			
				this.el.querySelector(`.news-list-contents`).innerHTML = ``
				this.setState({
					time : `(${new Date().getHours()}:${new Date().getMinutes()})`,
				})
				oDOM.querySelectorAll(`#res.med h3 a`).forEach((a, index) => {
					if (index >= 6) {
						return
					}
					const text = a.textContent.split(`미세먼지`).join(`<span style='color:dodgerblue;'>미세먼지</span>`)
					this.el.querySelector(`.news-list-contents`).insertAdjacentHTML(`beforeend`, `<a class='news-list-content' target='_blank' href='${a.href}'>${text}</a>`)
				})
			})
	}

	render(){
		return(
			<div className='news-list'>				
				<div className='news-list-title'>미세먼지 실시간뉴스 <span class='news-time'>{this.state.time}</span></div>
				<div className='news-list-contents'>로딩 중...</div>
			</div>				
		)
	}
}

export default NewsList
