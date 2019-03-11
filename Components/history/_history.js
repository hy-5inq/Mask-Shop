/**
 * _history.js
 * 브라우저 히스토리 기록을 담당하는 객체입니다. 모든 클라이언트 사이드 라우팅 기록은 이 객체에 저장되요.
 */

import { createBrowserHistory } from 'history'

let _history = createBrowserHistory()

export default _history