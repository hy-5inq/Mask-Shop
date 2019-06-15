import React from 'react'
import MyPage from './my-page.jsx'
import OrderCart from './order-cart.jsx'
import MenuBar from './menu-bar.jsx'
import Footer from './footer.jsx'
import TrackDelivery from './track-delivery.jsx'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import '../stylesheets/order-list.css'
import FA from 'react-fontawesome'

class OrderList extends React.Component{

  constructor(props){

    super(props)

    let today = new Date()

    this.state = {
      orderListType : true,
      selectedStartDate : today,
      selectedEndDate : today,
      userOrderList : []
    }

    this.handleChangeOrderListType = this.handleChangeOrderListType.bind(this)
    this.handleStartDateSelectionChange = this.handleStartDateSelectionChange.bind(this)
    this.handleEndDateSelectionChange = this.handleEndDateSelectionChange.bind(this)

  }

  componentDidMount(){

    fetch(`https://mask-shop.kro.kr/v1/api/order/admin`)

  }

  handleChangeOrderListType(bool){
    this.setState({
      orderListType : bool
    })
  }

  handleStartDateSelectionChange(date){
    
    const StartDate = this.state.selectedStartDate

    let InputStartDate = new Date(date).getTime()
    let PrevStartDate = StartDate.getTime()

      if(PrevStartDate != InputStartDate){

        this.setState({
          selectedStartDate : new Date(InputStartDate)
        })

      }

    }
    
  handleEndDateSelectionChange(date){

    const EndDate = this.state.selectedEndDate
    const StartDate = this.state.selectedStartDate
    let PrevStartDate = StartDate.getTime()

    let InputEndDate = new Date(date).getTime()
    let PrevEndDate = EndDate.getTime()

      if(PrevEndDate != InputEndDate && InputEndDate >= PrevStartDate){

        this.setState({
          selectedEndDate : new Date(InputEndDate)
        })

      }
      else{
        alert('기간 시작일 보다 이후여야 합니다.')
      }

  }


  render(){
    return(
      <React.Fragment>
        <MyPage />
        <OrderCart />
        <MenuBar />
        <TrackDelivery />
        <div className="OrderList-Wrapper">

          <div className={`Flex-Nav-Monitor`}>
            <span className={`Flex-Nav-Monitor__Text`}>{`Home`} > {`주문 목록`}</span>
          </div>

          <div className="OrderList-Header-Wrapper" >
            <span className="OrderList-Header-Text">주문 목록</span>
          </div>

          <div className="OrderList-Body-Function-Wrapper">
            <div onClick={()=>{
              this.handleChangeOrderListType(true)
            }} className={`OrderList-Body-Function__Item ${this.state.orderListType? ('--Selected') : ('')}`}>
              <span className="OrderList-Body-Function__Item-Text">주문목록조회</span>
            </div>
            <div onClick={()=>{
              this.handleChangeOrderListType(false)
            }} className={`OrderList-Body-Function__Item ${this.state.orderListType? ('') : ('--Selected')}`}>
              <span className="OrderList-Body-Function__Item-Text">취소/반품 내역</span>
            </div>
          </div>
          
          <div className="OrderList-Body-Config-Wrapper">
            {
              this.state.orderListType? ( <div className="OrderList-Body-Config__Item">

              <select>
                <option value="전체">전체 주문</option>
                <option value="배송전">배송 전 주문</option>
                <option value="배송중">배송 중 주문</option>
                <option value="배송완료">배송 완료 주문</option>
              </select>

            </div>) : (<div></div>)
            }
           

            <div className="OrderList-Body-Config__Item input-box">

            <FA className="Calendar-Icon ci_1" name="calendar" />
            <FA className="Calendar-Icon ci_2" name="calendar" />
              
              <DatePicker 
                dateFormat="yyyy/MM/dd"
                selected={this.state.selectedStartDate}
                onChange={this.handleStartDateSelectionChange}
              />
              
              <span className="mx-20">~</span>
             
              <DatePicker 
                dateFormat="yyyy/MM/dd"
                selected={this.state.selectedEndDate}
                onChange={this.handleEndDateSelectionChange}
              />

            </div>
            
            <div className="OrderList-Body-Config__Item">
              <button id="QUERY_BUTTON">조회</button>
            </div>
            
          </div>

          <div className="OrderList-Body-Description-Wrapper">
            <p className="OrderList-Body-Description-Text">
              주문번호를 클릭하시면 해당 주문에 대한 상세내역을 확인하실 수 있습니다.
            </p>
          </div>
        
          <div className="OrderList-Header-Wrapper" >
            <span className="OrderList-Header-Text">주문 목록 리스트</span>
          </div>

          <div className="OrderList-ListHeader-Wrapper">
            <div>
              <span>주문번호</span>
            </div>
            <div>
              <span>상품정보</span>
            </div>
            <div>
              <span>주문금액</span>
            </div>
            <div>
              <span>주문일자</span>
            </div>
            <div>
              <span>송장번호</span>
            </div>
            <div>
              <span>배송</span>
            </div>
            <div>
              <span>취소/교환</span>
            </div>
          </div>
          {RENDER_ORDER_LIST(this.state.userOrderList)}
          
        </div>
        <Footer />
      </React.Fragment>
    )
  }

}

const RENDER_ORDER_LIST = (OrderList) => {

  let OrderListNow = OrderList.reduce((acc,curr) => {

    if(curr.orderNum in acc){
      acc[curr.orderNum].push(curr) 
    }

    else{

      let newItemArray = []
      acc[curr.orderNum] = newItemArray.push(curr)
    }
  },{})

  console.log(OrderListNow)

  // return OrderList.map((el,index,array) => {



  //   return (

  //     <div className="OrderList-ListBody-Wrapper">
  //           <div>
  //               <span>{el.orderNum}</span>
  //             </div>
  //             <div>
  //               <span className="Order-Title">마스크 MK 101 외 3건</span>
  //             </div>
  //             <div>
  //               <span>111,700</span>
  //             </div>
  //             <div>
  //               <span>2019/06/11</span>
  //             </div>
  //             <div>
  //               <span className="Delivery-Number">123412341234</span>
  //             </div>
  //             <div>
  //               <span className="Delivery-Status --Before-Shipping">배송 전</span>
  //             </div>
  //             <div>
  //               <button className="Cancel-Btn">취소</button>
  //               {/* <button className="RollBack-Btn">반품</button> */}
  //             </div>
  //         </div>

  //   )


  // })


}

OrderList = withRouter(connect(null,null)(OrderList))

export default OrderList