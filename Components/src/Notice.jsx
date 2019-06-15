import React from 'react'

import MenuBar from './menu-bar.jsx'
import OrderCart from './order-cart.jsx'
import MyPage from './my-page.jsx'
import TrackDelivery from './track-delivery.jsx'
import Footer from './footer.jsx'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import '../stylesheets/FAQ.css'

class Notice extends React.Component{

    componentDidMount(){
        let $Questions = document.querySelectorAll('.Question')
        $Questions.forEach((el) => {

            el.addEventListener('click',(event)=>{

                if(el.parentNode.nextSibling.classList.contains('--Fold-Off2')){
                    el.parentNode.nextSibling.classList.remove('--Fold-Off2')
                    el.parentNode.nextSibling.classList.add('--Fold2')
                }
                else{
                    el.parentNode.nextSibling.classList.remove('--Fold2')
                    el.parentNode.nextSibling.classList.add('--Fold-Off2')
                }

            })
            
        })
    }

    render(){
        return(
            <React.Fragment>
                <MenuBar />
                <OrderCart />
                <MyPage />
                <TrackDelivery />

                <div className="FAQ-Header-Wrapper">
                    <h2 className="FAQ-Header-Text">공지사항</h2>
                    <h4 className="FAQ-Header-Text-Sub">마스크샵의 공지사항을 확인하실 수 있습니다.</h4>
                    <div className="Small-Divider --Teal-Divider"></div>
                </div>

                <div className="FAQ-Content-Wrapper">
                    <div className="FAQ-Content-Head">
                        <div className="FAQ-Content-Item">번호</div>
                        <div className="FAQ-Content-Item">제목</div>
                        <div className="FAQ-Content-Item">등록일</div>
                    </div>

                    <div className="FAQ-Content-Body">

                        <div className="FAQ-Content-Body-Row">
                            <div className="FAQ-Content-Body-Item">6</div>
                            <div className="FAQ-Content-Body-Item Question">어린이날 기념 전품목 5% 특별세일 안내</div>
                            <div className="FAQ-Content-Body-Item">2019-05-05</div>
                        </div>
                        <div className="FAQ-Content-Body-Content --Fold2">

                          <p>어린이날 기념 전 품목 5% 특별세일 이벤트를 진행함을 알려드립니다.</p>
                            <br/>
                            <p>[내용]</p>
                            <p>전 품목 5% 세일</p>
                            
                            <br/>
                          <p>환절기이기도 하고 미세먼지가 심한 요즘 자식들에게 건강을 선물하는 멋진 부모가 되어볼까요? </p>

                        </div>

                       
                    </div>

                    <div className="FAQ-Content-Body">

                        <div className="FAQ-Content-Body-Row">
                            <div className="FAQ-Content-Body-Item">5</div>
                            <div className="FAQ-Content-Body-Item Question">취소 및 반품 담당 택배사 변경 안내</div>
                            <div className="FAQ-Content-Body-Item">2019-04-15</div>
                        </div>
                        <div className="FAQ-Content-Body-Content --Fold2">
                          <p>마스크사 쇼핑몰과 제휴 제휴 관계인 택배사가 변경되었음을 알려드립니다.</p>
                            <br/>
                            <p>[내용]</p>
                            <p>변경 전 : 한진택배</p>
                            <p>변경 후 : CJ 대한통운</p>

                            <br/>
                            <p>[사유]</p>

                                <ul style={{listStyleType : 'none'}}>
                                  <li>배송서비스에 대한 불만율 높음</li>
                                  <li>배송 지연 , 배송 물품 파손 등</li>
                                </ul>

                            <br/>
                            <p>앞으로도 더 나은 마스크샵 쇼핑몰이 되겠습니다.</p>
                        </div>

                       
                    </div>

                    <div className="FAQ-Content-Body">

                        <div className="FAQ-Content-Body-Row">
                            <div className="FAQ-Content-Body-Item">4</div>
                            <div className="FAQ-Content-Body-Item Question">쇼핑몰 홈페이지 유지보수 및 업데이트 안내</div>
                            <div className="FAQ-Content-Body-Item">2019-04-05</div>
                        </div>
                        <div className="FAQ-Content-Body-Content --Fold2">

                          <p>쇼핑몰 홈페이지가 해당 기간동안 사용 불가함을 알려드립니다.</p>
                          <br/>
                          <p>[유지보수 및 업데이트 기간]</p>
                          <p>2019-04-05 ~ 2019-04-11</p>

                          <br/>
                          <p>[업데이트 예정 내용]</p>

                              <ul style={{ listStyleType : 'none'}}>
                                <li>페이지 레이아웃 개선</li>
                                <li>페이지 성능 최적화</li>
                                <li>마스크 아이템 업데이트</li>
                                <li>주문진행 절차 간소화</li>
                              </ul>

                          <br/>
                          <p>소비자분들께 최고의 유저 경험을 약속합니다. -마스크샵-</p>

                        </div>

                       
                    </div>

                    <div className="FAQ-Content-Body">

                        <div className="FAQ-Content-Body-Row">
                            <div className="FAQ-Content-Body-Item">3</div>
                            <div className="FAQ-Content-Body-Item Question">크린탑 124 구매시 1+1 이벤트</div>
                            <div className="FAQ-Content-Body-Item">2019-03-22</div>
                        </div>
                        <div className="FAQ-Content-Body-Content --Fold2">
                          <p>크린탑 124 구매 1+1 이벤트 행사가 시작되었음을 알려드립니다.</p>
                          <br/>
                          <p>[1+1 이벤트 기간]</p>
                          <p>2019-03-22 ~ 2019-04-04</p>

                          <br/>
                          <p>[1+1 증정 물품]</p>
                          <p>200 보건용 마스크</p>

                          <br/>
                          <p>소비자분들의 많은 참여 부탁드립니다.</p>
                          
                        </div>

                       
                    </div>

                    <div className="FAQ-Content-Body">

                        <div className="FAQ-Content-Body-Row">
                            <div className="FAQ-Content-Body-Item">2</div>
                            <div className="FAQ-Content-Body-Item Question">3M 이지핏 황사마스크 20% 할인 판매 안내</div>
                            <div className="FAQ-Content-Body-Item">2019-03-17</div>
                        </div>
                        <div className="FAQ-Content-Body-Content --Fold2">
                            <p>3M 이지핏 황사마스크 20% 할인 판매 이벤트가 시작되었음을 알려드립니다.</p> 
                            <br />
                            <p>[할인기간]</p>
                            <p>2019-03-17 ~ 2019-03-30</p>
                            <br />
                            <p>좋은 품질의 합리적인 마스크를 통해 좋은 건강상태 유지하시길 바랍니다.</p>
                        </div>

                       
                    </div>

                    <div className="FAQ-Content-Body">

                        <div className="FAQ-Content-Body-Row">
                            <div className="FAQ-Content-Body-Item">1</div>
                            <div className="FAQ-Content-Body-Item Question">3.1절 쇼핑몰 휴무 안내</div>
                            <div className="FAQ-Content-Body-Item">2019-03-01</div>
                        </div>
                        <div className="FAQ-Content-Body-Content --Fold2">
                        
                          연휴를 맞아 쇼핑몰 운영진들도 휴가를 다녀올 계획이오니 배송 주문은 하루 일정이 밀릴 수 있습니다
                          이 점 유의하시어 주문해 주시길 바랍니다.
                         
                        </div>

                       
                    </div>

                </div>

                <Footer />

            </React.Fragment>   
        )
    }


}

Notice = withRouter(connect(null,null)(Notice))

export default Notice