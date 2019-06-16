import React from 'react'

import MenuBar from './menu-bar.jsx'
import OrderCart from './order-cart.jsx'
import MyPage from './my-page.jsx'
import TrackDelivery from './track-delivery.jsx'
import Footer from './footer.jsx'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import '../stylesheets/FAQ.css'

class FAQ extends React.Component{

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
                    <h2 className="FAQ-Header-Text">자주 묻는 질문</h2>
                    <h4 className="FAQ-Header-Text-Sub">마스크샵의 자주 묻는 질문을 확인하실 수 있습니다.</h4>
                    <div className="Small-Divider"></div>
                </div>

                <div className="FAQ-Content-Wrapper">
                    <div className="FAQ-Content-Head">
                        <div className="FAQ-Content-Item">번호</div>
                        <div className="FAQ-Content-Item">제목</div>
                        <div className="FAQ-Content-Item">등록일</div>
                    </div>

                    <div className="FAQ-Content-Body">

                        <div className="FAQ-Content-Body-Row">
                            <div className="FAQ-Content-Body-Item">7</div>
                            <div className="FAQ-Content-Body-Item Question">Q.교환 및 반환 안내</div>
                            <div className="FAQ-Content-Body-Item">2019-05-05</div>
                        </div>
                        <div className="FAQ-Content-Body-Content --Fold2">
                        A.마스크는 위생상품으로 박스포장이 뜯어지는 순간부터
   오염의 위험성이 있기 때문에 반환 및 교환이 불가합니다.
   (박스 미개봉시 교환/ 환불가능)
   박스포장이 개봉되지 않은 상태에서 구매처를 통해
   7일 이내에 반환 및 교환신청을 해주시면 정상적으로 처리가 진행됩니다.

   단순변심의 경우, 왕복배송비 5,000원이 발생되는점 양해말씀드립니다 ^~^
   제품 오배송 시에는 고객센터로 연락주시면 신속 정확하게 처리하겠습니다.
                        </div>

                       
                    </div>

                    <div className="FAQ-Content-Body">

                        <div className="FAQ-Content-Body-Row">
                            <div className="FAQ-Content-Body-Item">6</div>
                            <div className="FAQ-Content-Body-Item Question">Q.필터교체마스크 유아사이즈 출시 관련 안내</div>
                            <div className="FAQ-Content-Body-Item">2019-04-29</div>
                        </div>
                        <div className="FAQ-Content-Body-Content --Fold2">
                            A.없어용 ^~^]]
                        </div>

                       
                    </div>

                    <div className="FAQ-Content-Body">

                        <div className="FAQ-Content-Body-Row">
                            <div className="FAQ-Content-Body-Item">5</div>
                            <div className="FAQ-Content-Body-Item Question">Q.필터 내장제품 세탁 및 관리하는 방법</div>
                            <div className="FAQ-Content-Body-Item">2019-04-11</div>
                        </div>
                        <div className="FAQ-Content-Body-Content --Fold2">
                        A.블랙마스크, 유아마스크는 오가닉면으로 제작된 제품으로 세탁 가능합니다.
   단, 필터내장형 제품으로 세탁시에는 필터의 기능이 저하될 수 있습니다.
   3-4회정도 가벼운 손세탁을 하셨을 경우, 약 70%내외의 차단율로 처음보다
   기능이 저하되기 때문에 그 이후 사용시에는 미세먼지 많은 날보다는 
   일반 마스크로 사용하시길 권장드립니다.
   필터 유효기간은 사용자의 환경에 따라 다르나 1개월 정도 사용가능합니다.

   관리방법은 외출시에만 착용하고 평소에는 동봉된 파우치에 담아 오염을 최소화 할 것을 추천드립니다.
   오염이 발생했을시 해당 부분만 가볍게 손세탁하시면 더 오래 사용하실 수 있습니다. ^^
                        </div>

                       
                    </div>

                    <div className="FAQ-Content-Body">

                        <div className="FAQ-Content-Body-Row">
                            <div className="FAQ-Content-Body-Item">4</div>
                            <div className="FAQ-Content-Body-Item Question">Q.필터 교체 마스크의 필터 교체시기</div>
                            <div className="FAQ-Content-Body-Item">2019-04-01</div>
                        </div>
                        <div className="FAQ-Content-Body-Content --Fold2">
                        A.필터교체시기는 사용자의 환경에 따라 다르기 때문에 정확한 안내는 어렵습니다ㅠㅠ
   다만 미세먼지 나쁨기준으로 출퇴근시 사용하실 경우2-3회 이상 사용하셔도 기능상으로는 문제가 없습니다.
   침이나 호흡방식으로 인한 위생상의 문제가 발생할 수 있어 그 이상의 사용은 추천드리지 않습니다.
                        </div>

                       
                    </div>

                    <div className="FAQ-Content-Body">

                        <div className="FAQ-Content-Body-Row">
                            <div className="FAQ-Content-Body-Item">3</div>
                            <div className="FAQ-Content-Body-Item Question">Q.사이즈 추천</div>
                            <div className="FAQ-Content-Body-Item">2019-03-22</div>
                        </div>
                        <div className="FAQ-Content-Body-Content --Fold2">
                        A.본 방식은 구매수량에 따른 추천방법으로 상세사이즈는
   각 제품 상세페이지 참조 부탁드립니다 ^~^)!

   [필터교체마스크/ 블랙마스크]
   중형 : 청소년/ 여성
   대형 : 남성

   [일회용마스크]
   소형 : 어린이
   중형 : 청소년/ 여성
   대형 : 남성

   [유아마스크]
   유아 소형 : 3-4세
   유아 중형 : 5-7세 
   유아 대형 : 8-10세

   ※ 초등학생의 경우, 유아 대형 추천
   ※ 얼굴형, 신체사이즈에 따라 맞는 사이즈가 다르기 때문에 본 표는 구매시 참조용으로 봐주시길 바랍니다.
                        </div>

                       
                    </div>

                    <div className="FAQ-Content-Body">

                        <div className="FAQ-Content-Body-Row">
                            <div className="FAQ-Content-Body-Item">2</div>
                            <div className="FAQ-Content-Body-Item Question">Q.마스크 등급이 뭔가요?</div>
                            <div className="FAQ-Content-Body-Item">2019-03-17</div>
                        </div>
                        <div className="FAQ-Content-Body-Content --Fold2">
                            A.미세먼지 마스크 등급이란 미세먼지를 어느정도로 흡입을 막아주는지에 따라 나뉩니다.
                        </div>

                       
                    </div>

                    <div className="FAQ-Content-Body">

                        <div className="FAQ-Content-Body-Row">
                            <div className="FAQ-Content-Body-Item">1</div>
                            <div className="FAQ-Content-Body-Item Question">Q.배송은 언제 되나요?</div>
                            <div className="FAQ-Content-Body-Item">2019-03-01</div>
                        </div>
                        <div className="FAQ-Content-Body-Content --Fold2">
                         
                                A.당일출고를 원칙으로 하고 있습니다(영업일 기준)

                                [출고시기]

                                월/화/수/목/금 2시 이전 주문 시 "당일 출고"

                                월/화/수/목/금 2시 이후 주문 시 "익일 출고"

                                금요일 2시 이후/ 토/ 일 주문 시 "월요일 출고"


                                [배송추적이 안되는 경우]

                                송장번호는 있는데 추적이 안되는 경우 출고 후, 전산입력까지 시간이 다소 소요될 수 있습니다.
                                  송장번호 발급이후 +1일까지 조금만 기다려주세요 ㅠㅠ
                                  +1일 시점까지도 추적이 안될 경우 본사로 연락주시면 신속하게 처리하겠습니다.


                                - 터미널/허브에 멈춰 있는 경우
                                  배송중인 상태에서 2일 이상 한 곳에 멈춰있는 경우,
                                  본사로 연락주시면 신속하게 처리하겠습니다.


                                제품 오배송 시에는 고객센터로 연락주시면
                                신속 정확하게 처리하겠습니다.
                         
                       
                        </div>

                       
                    </div>

                </div>

                <Footer />

            </React.Fragment>   
        )
    }


}

FAQ = withRouter(connect(null,null)(FAQ))

export default FAQ