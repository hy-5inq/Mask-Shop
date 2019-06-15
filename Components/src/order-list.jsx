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
      selectedOrderStatus : "전체주문",
      userOrderList : [],
      filteredUserOrderList : [],
    }

    this.handleChangeOrderListType = this.handleChangeOrderListType.bind(this)
    this.handleStartDateSelectionChange = this.handleStartDateSelectionChange.bind(this)
    this.handleEndDateSelectionChange = this.handleEndDateSelectionChange.bind(this)
    this.handleSearchQueryButtonClick = this.handleSearchQueryButtonClick.bind(this)
    this.handleOrderStatusChange = this.handleOrderStatusChange.bind(this)

  }

  componentDidMount(){

    fetch(`https://mask-shop.kro.kr/v1/api/order/admin`,{
      method : 'GET',
      mode : 'cors'
    }).then(response=>(response.json())).then((Jres)=>{
      this.setState({
        userOrderList : Jres
      })
    })

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

  handleOrderStatusChange(event){
    this.setState({
      selectedOrderStatus : event.target.value
    })
  }

  handleSearchQueryButtonClick(){

    if(this.state.userOrderList.length > 0){

      const QueryStartDateStamp = new Date(this.state.selectedStartDate).getTime()
     
      const QueryEndDateStamp = new Date(this.state.selectedEndDate).getTime()
    
      const QueryDeliveryStatus = this.state.selectedOrderStatus

    
      let filteredUserOrderList = this.state.userOrderList.reduce((acc,curr) => {
 
        const PaymentDateStamp = new Date(parseInt(curr.time)).getTime()

        if(QueryDeliveryStatus === "전체주문"){
          
          if((QueryStartDateStamp <= PaymentDateStamp) && (PaymentDateStamp) <= (QueryEndDateStamp)){
            acc = acc.concat([curr])
          }
  
        }
        else{
          
          
          if((QueryDeliveryStatus === curr.deliver)){
            acc = acc.concat([curr])
            // if((QueryStartDateStamp <= PaymentDateStamp) && (PaymentDateStamp) <= (QueryEndDateStamp)){
            //   acc = acc.concat([curr])
            // }

          }

        }

        return acc
  
      },[])

      console.log(`*****${JSON.stringify(filteredUserOrderList)}*****`)

      this.setState({
        filteredUserOrderList : filteredUserOrderList
      },console.log(this.state))

     

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
            <div className={`OrderList-Body-Function__Item ${this.state.orderListType? ('--Selected') : ('')}`}>
              <span className="OrderList-Body-Function__Item-Text">주문목록조회</span>
            </div>
            {/* <div onClick={()=>{
              this.handleChangeOrderListType(false)
            }} className={`OrderList-Body-Function__Item ${this.state.orderListType? ('') : ('--Selected')}`}>
              <span className="OrderList-Body-Function__Item-Text">취소/반품 내역</span>
            </div> */}
          </div>
          
          <div className="OrderList-Body-Config-Wrapper">
            {
              this.state.orderListType? ( <div className="OrderList-Body-Config__Item">

              <select onChange={this.handleOrderStatusChange}>
                <option value="전체주문">전체 주문</option>
                <option value="배송준비">배송 전 주문</option>
                <option value="배송시작">배송 시작 주문</option>
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
              <button onClick={this.handleSearchQueryButtonClick} id="QUERY_BUTTON">조회</button>
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
          {RENDER_ORDER_LIST(this.state)}
          
        </div>
        <Footer />
      </React.Fragment>
    )
  }

}

const RENDER_ORDER_LIST = (state) => {

  console.log(state.OrderList)

  let OrderListNow;

  if(state.selectedOrderStatus === "전체주문"){

    OrderListNow = state.userOrderList.reverse().reduce((acc,curr) => {

      if(curr.orderNum in acc){
        acc[curr.orderNum] = acc[curr.orderNum].concat([curr]) 
      }
      else{
  
        acc[curr.orderNum] = [curr]

      }

      return acc
    },{})

  }
  else{

    OrderListNow = state.filteredUserOrderList.reverse().reduce((acc,curr) => {

      if(curr.orderNum in acc){
        acc[curr.orderNum] = acc[curr.orderNum].concat([curr]) 
      }
      else{
  
        acc[curr.orderNum] = [curr]

      }

      return acc
    },{})

  }

  if(state.userOrderList.length > 0 || state.filteredUserOrderList.length > 0){
    
    console.log(OrderListNow)

    let OrderListToDOM = []

    for(let key in OrderListNow){

      let Order = OrderListNow[key]

      OrderListToDOM.push(
        (
          <div key={`${Order[0].orderNum}`} className="OrderList-ListBody-Wrapper">
            <div>
              <span>{Order[0].orderNum}</span>
            </div>
            <div>
              <span className="Order-Title">{`${Order[0].productName} 외 ${Order.length}건`}</span>
            </div>
            <div>
              <span>{`${parseInt(GET_SUM_ORDER_PRICE(Order))}`}</span>
            </div>
            <div>
              <span>{`${Order[0].time}`}</span>
            </div>
            <div>
              <span className="Delivery-Number">{`${Order[0].invoiceNum}`}</span>
            </div>
            <div>
              <span className="Delivery-Status --Before-Shipping">{`${Order[0].deliver}`}</span>
            </div>
            <div>
              <button onClick={(event)=>{
                ACTIVATE_DELETE_API_THIS_ORDER(event,Order[0].orderNum)
              }} className="Cancel-Btn">{`${GET_BUTTON_BY_DELIVERY_STATUS(Order[0].deliver)}`}</button>
            </div>
          </div>
        )
      )

    }

    return OrderListToDOM

  }
 
}

const ACTIVATE_DELETE_API_THIS_ORDER = (event,orderNum) => {

  event.target.closest('.OrderList-ListBody-Wrapper').remove()

  // fetch(`https://mask-shop.kro.kr/v1/api/order/list/${orderNum}`,{
  //   method : 'DELETE',
  // }).then(response => (response.json())).then((Jres) => {
  //   if(Jres.status === 'success'){
      
  //     alert('취소/반품 신청되었습니다.')
      
      
  //   }
  // }) 

}

const GET_BUTTON_BY_DELIVERY_STATUS = (deliveryStatus) =>{

  if(deliveryStatus !== "배송준비"){
    return "반품"
  }

  return "취소"

}

const GET_SUM_ORDER_PRICE = (Order) => {

  let result = Order.reduce((acc,curr) => {
    return acc = acc + (parseInt(curr.price) * parseInt(curr.cycle))
  },0)

  return result
}

OrderList = withRouter(connect(null,null)(OrderList))

export default OrderList