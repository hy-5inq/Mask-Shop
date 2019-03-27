/**
 * Root.jsx
 * 리덕스 스토어 , 리액트 라우터를 연결시키는 메인 컴포넌트에요.
 * 요청받은 라우트 패스에 따라 다른 컴포넌트를 렌더링 시킵니다.
 * 리덕스 스토어의 데이터를 지속적으로 흘려보냅니다.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router , Route , Switch } from 'react-router-dom'
import '../lib/i18n-contents.js'

import _store from '../redux/_store.js'
import _history from '../history/_history.js'

import Home from './Home.jsx'
import Product from './Product.jsx'
import ProductDetail from './Product-detail.jsx'


class Root extends React.Component{	
	render(){
		return(

			<Provider store={_store}>

				<Router history={_history}>

					<div>
						<Switch>

							<Route exact path="/" component={Home} ></Route>
							<Route path="/Product" component={Product} ></Route>
							<Route path="/Product-detail" component={ProductDetail} ></Route>

						</Switch>
					</div>

				</Router>

			</Provider>

		)

	}

}

ReactDOM.render(<Root /> , document.getElementById(`root`))
