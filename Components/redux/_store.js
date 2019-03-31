/**
 * _store.js
 * 클라이언트 사이드를 이루는 모든 데이터 상태를 관리할 스토어 입니다. 여러 리듀서(데이터 저장소 단위)를 묶어서 한 스토어로 만들 수 있어요
 */

import { createStore , combineReducers , applyMiddleware } from 'redux'

import homeReducer from './HomeReducer.js'

import logger from 'redux-logger'
import thunk from 'redux-thunk'

const originReducer = combineReducers({
	homeReducer : homeReducer
})

const _store = createStore(originReducer , applyMiddleware(logger , thunk))

export default _store
