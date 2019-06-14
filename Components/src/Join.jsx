import React from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _history from '../history/_history.js'

import '../stylesheets/Join.css'
import MenuBar from './menu-bar.jsx';


class Join extends React.Component{

    constructor(props){
        
        super(props)

        this.state = {

            EMAIL_INPUT_DISABLED : true,
            IS_VALID_ID : false,
            IS_VALID_PW : false,
            IS_PW2_EQAUL_TO_PW : false,
            IS_PW_ANSWER_TYPED : false,
            IS_USERNAME_TYPED : false,
            IS_VALID_EMAIL_DOMAIN : false,
            IS_ADDRESS_ZONECODE_TYPED : false,
            IS_ADDRESS_TYPED : false,
            IS_ADDRESS_SUB_TYPED : false,
            IS_PHONE_NUMBER_TYPED : false,
            IS_EMAIL_TYPED : false,
            ACCEPT_ALL : false,
            IS_CONTRACTION_1_CHECKED : false,
            IS_CONTRACTION_2_CHECKED : false

        }

        this.handleEmailDomainChange = this.handleEmailDomainChange.bind(this)
        this.handleContraction_1 = this.handleContraction_1.bind(this)
        this.handleContraction_2 = this.handleContraction_2.bind(this)
        this.handleAcceptAll = this.handleAcceptAll.bind(this)
        this.handleFindPostCode = this.handleFindPostCode.bind(this)
        this.handleIdChecker = this.handleIdChecker.bind(this)
        this.handlePWChecker = this.handlePWChecker.bind(this)
        this.handlePw2EqualToPw = this.handlePw2EqualToPw.bind(this)
        this.handlePwAnswer = this.handlePwAnswer.bind(this)
        this.handleAddressSub =  this.handleAddressSub.bind(this)
        this.handlePhoneChecker = this.handlePhoneChecker.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleNameChecker = this.handleNameChecker.bind(this)
        this.handleSubmitForm = this.handleSubmitForm.bind(this)

    }

	handleRouteToHome(){
		_history.push(`/`)
	}

    handleFindPostCode(that){

        new daum.Postcode({
            oncomplete: function(data) {
                
                // console.log(data)
                let zoneCodeInput = document.querySelector(`#ZONE_CODE_INPUT`)
                let addressInput = document.querySelector(`#ADDRESS`)

                zoneCodeInput.value = data.zonecode
                addressInput.value = data.address

                that.setState({
                    IS_ADDRESS_ZONECODE_TYPED : true,
                    IS_ADDRESS_TYPED : true,
                })

            }
        }).open();

    }
    handleIdChecker(event){

        const mesgBefore = document.querySelector(`.valid-id-mesg`)
       
        if(mesgBefore !== null){
            mesgBefore.remove()
        }
        
        const ID_REGEX = new RegExp(/^[a-zA-Z0-9]{4,16}$/)

        let $ID_FORM_ROW = document.querySelector(`#ID_FORM_ROW`)
        
        const $passMesg = document.createElement(`span`)
        $passMesg.classList.add(`valid-id-mesg`)

        if(ID_REGEX.test(event.target.value)){
            
            $passMesg.textContent = `올바른 아이디 입력입니다.`
            this.setState({
                IS_VALID_ID : true
            })
        }
        else{

            $passMesg.textContent = `올바르지 않은 아이디 입력입니다.`
            this.setState({
                IS_VALID_ID : false
            })
          
        }
        
        $ID_FORM_ROW.append($passMesg)

    }

    handleEmailDomainChange(event){

        let $EMAIL_DOMAIN_INPUT = document.querySelector('#EMAIL_DOMAIN')

        if(event.target.value !== '직접입력'){
            $EMAIL_DOMAIN_INPUT.value = event.target.value
            this.setState({
                IS_VALID_EMAIL_DOMAIN : true
            })
        }
        else{

            $EMAIL_DOMAIN_INPUT.value = ""

            this.setState({
                EMAIL_INPUT_DISABLED : false
            })

        }

    }

    handlePWChecker(event){

        const mesgBefore = document.querySelector(`.valid-pw-mesg`)
        const mesgBefore2 = document.querySelector(`.valid-pw2-mesg`)

        if(mesgBefore !== null){
            mesgBefore.remove()
        }
        if(mesgBefore2 !== null){
            mesgBefore2.remove()
        }
        
        const PW_REGEX = new RegExp(/(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}|(?=.*[A-Za-z])(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}/)

        let $PW_FORM_ROW = document.querySelector(`#PW_INPUT`).parentNode
        let $PW2_INPUT =  document.querySelector(`#PW2_INPUT`)
        const $PW2_FORM_ROW  = $PW2_INPUT.parentNode

        const $passMesg = document.createElement(`span`)
        $passMesg.classList.add(`valid-pw-mesg`)
        const $passMesg2 = document.createElement(`span`)
        $passMesg2.classList.add(`valid-pw2-mesg`)

        if(PW_REGEX.test(event.target.value)){
            
            $passMesg.textContent = `올바른 비밀번호 입력입니다.`
            this.setState({
                IS_VALID_PW : true
            })
        }
        else{

            $passMesg.textContent = `올바르지 않은 비밀번호 입력입니다.`
            this.setState({
                IS_VALID_PW : false
            })            
        }
        
        if(event.target.value !== $PW2_INPUT.value){

            $passMesg2.textContent = "비밀번호와 동일하지 않습니다."
           
        }
        else{

            $passMesg2.textContent = "비밀번호와 동일합니다."
           
        }

        $PW_FORM_ROW.append($passMesg)
        $PW2_FORM_ROW.append($passMesg2)
    }

    handlePw2EqualToPw(event){

        const mesgBefore2 = document.querySelector(`.valid-pw2-mesg`)
       
        if(mesgBefore2 !== null){
            mesgBefore2.remove()
        }
        
        let $PW_INPUT = document.querySelector(`#PW_INPUT`)
        let $PW2_INPUT =  document.querySelector(`#PW2_INPUT`)
        const $PW2_FORM_ROW  = $PW2_INPUT.parentNode

        const $passMesg = document.createElement(`span`)
        $passMesg.classList.add(`valid-pw2-mesg`)

        if($PW_INPUT.value === event.target.value){
            $passMesg.textContent = "비밀번호와 동일합니다."
            this.setState({
                IS_PW2_EQAUL_TO_PW : true
            })
        }
        else{
            $passMesg.textContent = "비밀번호와 동일하지 않습니다."
            this.setState({
                IS_PW2_EQAUL_TO_PW : false
            })
        }
        
        $PW2_FORM_ROW.append($passMesg)

    }

    handleEmailDomainDirect(event){

        let emailDomainRegex = new RegExp(/[a-z]+\.[a-z]/)
        
        if(emailDomainRegex.test(event.target.value)){
            this.setState({
                IS_VALID_EMAIL_DOMAIN : true,
            })
        }
        else{

        }

    }

    handleContraction_1(){

        const TOGGLE_VALUE = !(this.state.IS_CONTRACTION_1_CHECKED)

        this.setState({
            IS_CONTRACTION_1_CHECKED : TOGGLE_VALUE
        })

    }
    handleContraction_2(){

        const TOGGLE_VALUE = !(this.state.IS_CONTRACTION_2_CHECKED)

        this.setState({
            IS_CONTRACTION_2_CHECKED : TOGGLE_VALUE
        })

    }
    handleAcceptAll(event){
        
        let TOGGLE_VALUE = !(this.state.ACCEPT_ALL)
       
        this.setState({

            ACCEPT_ALL : TOGGLE_VALUE,
            IS_CONTRACTION_1_CHECKED : TOGGLE_VALUE,
            IS_CONTRACTION_2_CHECKED : TOGGLE_VALUE

        })

        // alert(TOGGLE_VALUE)
    }
    handleAddressSub(event){

        if(event.target.value.length > 0){
            this.setState({
                IS_ADDRESS_SUB_TYPED : true
            })
        }
        else{
            this.setState({
                IS_ADDRESS_SUB_TYPED : false
            })
        }

    }
    handlePwAnswer(event){

        if(event.target.value.length > 0){
            this.setState({
                IS_PW_ANSWER_TYPED : true
            })
        }
        else{
            this.setState({
                IS_PW_ANSWER_TYPED : false
            })
        }

    }
    handleEmailChange(event){

        if(event.target.value.length > 0){
            this.setState({
                IS_EMAIL_TYPED : true
                
            })
        }
        else{
            this.setState({
                IS_EMAIL_TYPED : false
            })
        }

    }
    handleNameChecker(event){

        if(event.target.value.length > 0){
            this.setState({
                IS_USERNAME_TYPED : true
            })
        }
        else{
            this.setState({
                IS_USERNAME_TYPED : false
            })
        }

    }
    handlePhoneChecker(event){

        let concatedPhoneNumber = new String();

        let $PHONE_INPUTS = document.querySelectorAll('.Phone-Input')
        console.log($PHONE_INPUTS)
        $PHONE_INPUTS.forEach((el,index) => {
            // alert(el.value)
            if(index !== 2){
                concatedPhoneNumber = concatedPhoneNumber.concat(`${el.value}-`)
            }
            else{
                concatedPhoneNumber = concatedPhoneNumber.concat(`${el.value}`)
            }

        })
        // alert(concatedPhoneNumber)
        let PhoneRegex =  new RegExp(/[0-9]{3}-[0-9]{3,4}-[0-9]{4}/)

        if(PhoneRegex.test(concatedPhoneNumber)){
            this.setState({
                IS_PHONE_NUMBER_TYPED : true
            })
        }
        else{
            this.setState({
                IS_PHONE_NUMBER_TYPED : false
            })
        }

    }
    handleSubmitForm(){

        let SubmitAvailable = true

        if(this.state.IS_VALID_ID === false){
            alert('아이디를 다시 확인하여 주세요!')
            SubmitAvailable = false
        }
        if(this.state.IS_VALID_PW === false){
            alert('아이디를 다시 확인하여 주세요!')
            SubmitAvailable = false
        }
        if(this.state.IS_PW2_EQAUL_TO_PW === false){
            alert('비밀번호와 비밀번호 확인이 동일하지 않습니다!')
            SubmitAvailable = false
        }
        if(this.state.IS_PW_ANSWER_TYPED === false){
            alert('비밀번호 확인 답변이 입력되지 않았습니다!')
            SubmitAvailable = false
        }
        if(this.state.IS_USERNAME_TYPED === false){
            alert('이름이 입력되지 않았습니다!')
            SubmitAvailable = false
        }
        if(this.state.IS_VALID_EMAIL_DOMAIN === false){
            alert('직접입력한 이메일 도메인이 유효하지 않습니다!')
            SubmitAvailable = false
        }
        if(this.state.IS_ADDRESS_ZONECODE_TYPED === false){
            alert('우편번호가 입력되지 않았습니다!')
            SubmitAvailable = false
        }
        if(this.state.IS_ADDRESS_TYPED === false){
            alert('기본 주소가 입력되지 않았습니다!')
            SubmitAvailable = false
        }
        if(this.state.IS_ADDRESS_SUB_TYPED === false){
            alert('상세 주소가 입력지 않았습니다!')
            SubmitAvailable = false
        }
        if(this.state.IS_PHONE_NUMBER_TYPED === false){
            alert('휴대 전화 번호가 올바르지 않습니다!')
            SubmitAvailable = false
        }
        if(this.state.IS_EMAIL_TYPED  === false){
            alert('이메일을 다시 확인해주세요!')
            SubmitAvailable = false
        }
        if(this.state.IS_CONTRACTION_1_CHECKED === false){
            alert('이용약관 동의를 확인해주세요!')
            SubmitAvailable = false
        }
        if(this.state.IS_CONTRACTION_2_CHECKED === false){
            alert('개인정보 수집 및 이용동의를 확인하여 주세요!')
            SubmitAvailable = false
        }

        if(SubmitAvailable){
            alert('서버로 폼 전송')
        }
        

    }   
	render(){
		return(
			<React.Fragment>
				<MenuBar/>
                <div className="Join-Wrapper">
                    <div className={`Flex-Nav-Monitor`}>
                        <span className={`Flex-Nav-Monitor__Text`}>{`Home`} > {`회원 가입`}</span>
                    </div>

                    <div className="Join-Header-Row">
                        <div className="Join-Header-Row__Item">
                            <span className="Join-Header-Row__Item-Text Main">회원 정보</span>
                        </div>
                        <div className="Join-Header-Row__Item"></div>
                        <div className="Join-Header-Row__Item">
                            <span className="--Color-Red Star">*</span>
                            <span className="Join-Header-Row__Item-Text Sub">필수입력사항</span>
                        </div>
                    </div>

                    <div className="Join-Form-Wrapper">

                        <div className="Join-Form-Row">
                            <div className="Join-Form-Row__Item Key-Box">
                                <span>아이디</span>
                                <span className="Star --Color-Red">*</span>
                            </div>
                            <div id="ID_FORM_ROW" className="Join-Form-Row__Item Value-Box">
                                <input onChange={this.handleIdChecker} className="Join-Form-Row__Item__Input" type="text"/>
                                <span className="Join-Form-Row__Item__Span">(영문소문자/숫자, 4~16자)</span>
                            </div>
                        </div>

                        <div className="Join-Form-Row">
                            <div className="Join-Form-Row__Item Key-Box">
                                <span>비밀번호</span>
                                <span className="Star --Color-Red">*</span>
                            </div>
                            <div className="Join-Form-Row__Item Value-Box">
                                <input id="PW_INPUT" onChange={this.handlePWChecker} className="Join-Form-Row__Item__Input" type="password"/>
                                <span className="Join-Form-Row__Item__Span">(영문 대소문자/숫자/특수문자를 모두 조합, 8자~16자)</span>
                            </div>
                        </div>

                        <div className="Join-Form-Row">
                            <div className="Join-Form-Row__Item Key-Box">
                                <span>비밀번호 확인</span>
                                <span className="Star --Color-Red">*</span>
                            </div>
                            <div className="Join-Form-Row__Item Value-Box">
                                <input id="PW2_INPUT" onChange={this.handlePw2EqualToPw} className="Join-Form-Row__Item__Input" type="password"/>
                                <span className="Join-Form-Row__Item__Span"></span>
                            </div>
                        </div>

                        <div className="Join-Form-Row">
                            <div className="Join-Form-Row__Item Key-Box">
                                <span>비밀번호 확인 질문</span>
                                <span className="Star --Color-Red">*</span>
                            </div>
                            <div className="Join-Form-Row__Item Value-Box">
                                <select className="Password-Find-Question">
                                    <option value="기억에 남는 추억의 장소는?">기억에 남는 추억의 장소는?</option>
                                    <option value="자신의 인생 좌우명은?">자신의 인생 좌우명은?</option>
                                    <option value="자신의 보물 제 1호는?">자신의 보물 제 1호는?</option>
                                    <option value="가장 기억에 남는 선생님 성함은?">가장 기억에 남는 선생님 성함은?</option>
                                    <option value="타인이 모르는 자신만의 신체비밀이 있다면?">타인이 모르는 자신만의 신체비밀이 있다면?</option>
                                    <option value="추억하고 싶은 날짜가 있다면?">추억하고 싶은 날짜가 있다면?</option>
                                    <option value="인상깊게 읽은 책 이름은?">인상깊게 읽은 책 이름은?</option>
                                </select>
                            </div>
                        </div>

                        <div className="Join-Form-Row">
                            <div className="Join-Form-Row__Item Key-Box">
                                <span>비밀번호 확인 답변</span>
                                <span className="Star --Color-Red">*</span>
                            </div>
                            <div className="Join-Form-Row__Item Value-Box">
                                <input onChange={this.handlePwAnswer} className="Password-Find-Question Join-Form-Row__Item__Input" type="text"/>
                                <span className="Join-Form-Row__Item__Span"></span>
                            </div>
                        </div>


                        <div className="Join-Form-Row">
                            <div className="Join-Form-Row__Item Key-Box">
                                <span>이름</span>
                                <span className="Star --Color-Red">*</span>
                            </div>
                            <div className="Join-Form-Row__Item Value-Box">
                                <input onChange={this.handleNameChecker} className="Join-Form-Row__Item__Input" type="text"/>
                                <span className="Join-Form-Row__Item__Span"></span>
                            </div>
                        </div>

                        <div className="Join-Form-Row --Height-Auto">
                            <div className="Join-Form-Row__Item Key-Box">
                                <span>주소</span>
                                <span className="Star --Color-Red">*</span>
                            </div>
                            <div className="Join-Form-Row__Item Value-Box Address-Box">
                                <div className="Address-Box__Item">
                                    <input disabled={'true'} id="ZONE_CODE_INPUT" className="Join-Form-Row__Item__Input" type="text"/>
                                    <button onClick={()=>{
                                        this.handleFindPostCode(this)
                                    }}>우편번호 찾기</button>
                                </div>
                                <div className="Address-Box__Item">
                                    <input disabled={'true'} id="ADDRESS" className="Password-Find-Question Join-Form-Row__Item__Input" type="text"/>
                                    <span className="Join-Form-Row__Item__Span">(기본주소)</span>
                                </div>
                                <div className="Address-Box__Item">
                                    <input onChange={this.handleAddressSub} id="ADDRESS_SUB" className="Password-Find-Question Join-Form-Row__Item__Input" type="text"/>
                                    <span className="Join-Form-Row__Item__Span">(나머지주소)</span>
                                </div>
                            </div>
                        </div>

                        <div className="Join-Form-Row">
                            <div className="Join-Form-Row__Item Key-Box">
                                <span>휴대전화</span>
                                <span className="Star --Color-Red">*</span>
                            </div>
                            <div className="Join-Form-Row__Item Value-Box">
                                <input onChange={this.handlePhoneChecker} className="Join-Form-Row__Item__Input Phone-Input" type="text"/>
                                <span className="Join-Form-Row__Item__Span">-</span>
                                <input onChange={this.handlePhoneChecker} className="Join-Form-Row__Item__Input Phone-Input" type="text"/>
                                <span className="Join-Form-Row__Item__Span">-</span>
                                <input onChange={this.handlePhoneChecker} className="Join-Form-Row__Item__Input Phone-Input" type="text"/>
                            </div>
                        </div>

                        <div className="Join-Form-Row">
                            <div className="Join-Form-Row__Item Key-Box">
                                <span>이메일</span>
                                <span className="Star --Color-Red">*</span>
                            </div>
                            <div className="Join-Form-Row__Item Value-Box">
                                <input onChange={this.handleEmailChange} className="Join-Form-Row__Item__Input" type="text"/>
                                <span className="Join-Form-Row__Item__Span">@</span>
                                <input id="EMAIL_DOMAIN" onChange={this.handleEmailDomainDirect} disabled={this.state.EMAIL_INPUT_DISABLED} className="Join-Form-Row__Item__Input" type="text"/>
                                <select onChange={this.handleEmailDomainChange} className="Email-Assist">
                                    <option selected value="None">이메일 선택</option>
                                    <option value="gmail.com">gmail.com</option>
                                    <option value="naver.com">naver.com</option>
                                    <option value="daum.net">daum.net</option>
                                    <option value="nate.com">nate.com</option>
                                    <option value="hotmail.com">hotmail.com</option>
                                    <option value="yahoo.com">yahoo.com</option>
                                    <option value="직접입력">직접입력</option>
                                </select>
                            </div>
                        </div>
                        
                    </div>

                    <div className="Join-Header-Row">
                        <div className="Join-Header-Row__Item">
                            <span className="Join-Header-Row__Item-Text Main">계약 동의</span>
                        </div>
                        <div className="Join-Header-Row__Item"></div>
                        <div className="Join-Header-Row__Item">
                           
                        </div>
                    </div>

                    <div className="Join-Contraction-Wrapper">
                        <div className="Join-Contraction-Row">
                            <input value={this.state.ACCEPT_ALL} onChange={this.handleAcceptAll} type="checkbox"/>
                            <span className="--Font-Bold">이용약관 및 개인정보수집 및 이용, 쇼핑정보 수신(선택)에 모두 동의합니다.</span>
                        </div>
                        <div className="Join-Contraction-Row">
                            <div>
                                <span className="--Font-Bold">[필수] 이용약관 동의</span>
                            </div>
                            <div>
                                <div className="Contraction-Content">
                                제1조(목적)
이 약관은 (주)헬스리아(전자상거래 사업자)가 운영하는 아에르 사이버 몰(이하 “몰”이라 한다)에서 제공하는 인터넷 관련 서비스(이하 “서비스”라 한다)를 이용함에 있어 사이버 몰과 이용자의 권리․의무 및 책임사항을 규정함을 목적으로 합니다.
※「PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다.」



제2조(정의)
① “몰”이란 (주)헬스리아가 재화 또는 용역(이하 “재화 등”이라 함)을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.
② “이용자”란 “몰”에 접속하여 이 약관에 따라 “몰”이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
③ ‘회원’이라 함은 “몰”에 (삭제) 회원등록을 한 자로서, 계속적으로 “몰”이 제공하는 서비스를 이용할 수 있는 자를 말합니다.
④ ‘비회원’이라 함은 회원에 가입하지 않고 “몰”이 제공하는 서비스를 이용하는 자를 말합니다.



제3조 (약관 등의 명시와 설명 및 개정) 
① “몰”은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호․모사전송번호․전자우편주소, 사업자등록번호, 통신판매업 신고번호, 개인정보보호책임자등을 이용자가 쉽게 알 수 있도록 아에르 사이버몰의 초기 서비스화면(전면)에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.
② “몰은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회․배송책임․환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다.
③ “몰”은 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의 규제에 관한 법률」, 「전자문서 및 전자거래기본법」, 「전자금융거래법」, 「전자서명법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」, 「방문판매 등에 관한 법률」, 「소비자기본법」 등 관련 법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
④ “몰”이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 몰의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 "몰“은 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다. 
⑤ “몰”이 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는 개정 전의 약관조항이 그대로 적용됩니다. 다만 이미 계약을 체결한 이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 제3항에 의한 개정약관의 공지기간 내에 “몰”에 송신하여 “몰”의 동의를 받은 경우에는 개정약관 조항이 적용됩니다.
⑥ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제 등에 관한 법률, 공정거래위원회가 정하는 전자상거래 등에서의 소비자 보호지침 및 관계법령 또는 상관례에 따릅니다.



제4조(서비스의 제공 및 변경) 
① “몰”은 다음과 같은 업무를 수행합니다.
  1. 재화 또는 용역에 대한 정보 제공 및 구매계약의 체결
  2. 구매계약이 체결된 재화 또는 용역의 배송
  3. 기타 “몰”이 정하는 업무
② “몰”은 재화 또는 용역의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 재화 또는 용역의 내용을 변경할 수 있습니다. 이 경우에는 변경된 재화 또는 용역의 내용 및 제공일자를 명시하여 현재의 재화 또는 용역의 내용을 게시한 곳에 즉시 공지합니다.
③ “몰”이 제공하기로 이용자와 계약을 체결한 서비스의 내용을 재화등의 품절 또는 기술적 사양의 변경 등의 사유로 변경할 경우에는 그 사유를 이용자에게 통지 가능한 주소로 즉시 통지합니다.
④ 전항의 경우 “몰”은 이로 인하여 이용자가 입은 손해를 배상합니다. 다만, “몰”이 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.



제5조(서비스의 중단) 
① “몰”은 컴퓨터 등 정보통신설비의 보수점검․교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
② “몰”은 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 단, “몰”이 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.
③ 사업종목의 전환, 사업의 포기, 업체 간의 통합 등의 이유로 서비스를 제공할 수 없게 되는 경우에는 “몰”은 제8조에 정한 방법으로 이용자에게 통지하고 당초 “몰”에서 제시한 조건에 따라 소비자에게 보상합니다. 다만, “몰”이 보상기준 등을 고지하지 아니한 경우에는 이용자들의 마일리지 또는 적립금 등을 “몰”에서 통용되는 통화가치에 상응하는 현물 또는 현금으로 이용자에게 지급합니다.



제6조(회원가입) 
① 이용자는 “몰”이 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.
② “몰”은 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.
  1. 가입신청자가 이 약관 제7조제3항에 의하여 이전에 회원자격을 상실한 적이 있는 경우, 다만 제7조제3항에 의한 회원자격 상실 후 3년이 경과한 자로서 “몰”의 회원재가입 승낙을 얻은 경우에는 예외로 한다.
  2. 등록 내용에 허위, 기재누락, 오기가 있는 경우
  3. 기타 회원으로 등록하는 것이 “몰”의 기술상 현저히 지장이 있다고 판단되는 경우
③ 회원가입계약의 성립 시기는 “몰”의 승낙이 회원에게 도달한 시점으로 합니다.
④ 회원은 회원가입 시 등록한 사항에 변경이 있는 경우, 상당한 기간 이내에 “몰”에 대하여 회원정보 수정 등의 방법으로 그 변경사항을 알려야 합니다.



제7조(회원 탈퇴 및 자격 상실 등) 
① 회원은 “몰”에 언제든지 탈퇴를 요청할 수 있으며 “몰”은 즉시 회원탈퇴를 처리합니다.
② 회원이 다음 각 호의 사유에 해당하는 경우, “몰”은 회원자격을 제한 및 정지시킬 수 있습니다.
  1. 가입 신청 시에 허위 내용을 등록한 경우
  2. “몰”을 이용하여 구입한 재화 등의 대금, 기타 “몰”이용에 관련하여 회원이 부담하는 채무를 기일에 지급하지 않는 경우
  3. 다른 사람의 “몰” 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우
  4. “몰”을 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우
③ “몰”이 회원 자격을 제한․정지 시킨 후, 동일한 행위가 2회 이상 반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우 “몰”은 회원자격을 상실시킬 수 있습니다.
④ “몰”이 회원자격을 상실시키는 경우에는 회원등록을 말소합니다. 이 경우 회원에게 이를 통지하고, 회원등록 말소 전에 최소한 30일 이상의 기간을 정하여 소명할 기회를 부여합니다.
                                </div>
                            </div>
                            <div>
                                <span>이용약관에 동의 하십니까?</span>
                                <input checked={this.state.IS_CONTRACTION_1_CHECKED} onChange={this.handleContraction_1} type="checkbox"/>동의함
                            </div>
                        </div>
                        <div className="Join-Contraction-Row">
                            <span className="--Font-Bold">[필수] 개인정보 수집 및 이용 동의</span>
                            <div>
                                <div className="Contraction-Content">
                                1. 개인정보 수집목적 및 이용목적

가. 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산

콘텐츠 제공 , 구매 및 요금 결제 , 물품배송 또는 청구지 등 발송 , 금융거래 본인 인증 및 금융 서비스

나. 회원 관리

회원제 서비스 이용에 따른 본인확인 , 개인 식별 , 불량회원의 부정 이용 방지와 비인가 사용 방지 , 가입 의사 확인 , 연령확인 , 만14세 미만 아동 개인정보 수집 시 법정 대리인 동의여부 확인, 불만처리 등 민원처리 , 고지사항 전달

2. 수집하는 개인정보 항목 : 이름 , 생년월일 , 성별 , 로그인ID , 비밀번호 , 자택 전화번호 , 휴대전화번호 , 이메일 , 14세미만 가입자의 경우 법정대리인의 정보

3. 개인정보의 보유기간 및 이용기간

원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.

가. 회사 내부 방침에 의한 정보 보유 사유

o 부정거래 방지 및 쇼핑몰 운영방침에 따른 보관 : 1년

나. 관련 법령에 의한 정보보유 사유

o 계약 또는 청약철회 등에 관한 기록

-보존이유 : 전자상거래등에서의소비자보호에관한법률

-보존기간 : 5년

o 대금 결제 및 재화 등의 공급에 관한 기록

-보존이유: 전자상거래등에서의소비자보호에관한법률

-보존기간 : 5년 

o 소비자 불만 또는 분쟁처리에 관한 기록

-보존이유 : 전자상거래등에서의소비자보호에관한법률

-보존기간 : 3년 

o 로그 기록 

-보존이유: 통신비밀보호법

-보존기간 : 3개월

※ 동의를 거부할 수 있으나 거부시 회원 가입이 불가능합니다.
                                </div>
                            </div>
                            <span>개인정보 수집 및 이용에 동의하십니까?</span>
                            <input checked={this.state.IS_CONTRACTION_2_CHECKED} onChange={this.handleContraction_2} type="checkbox"/>동의함
                        </div>

                       
                    </div>

                    <div className="Join-Btn-Wrapper">
                            <div onClick={this.handleSubmitForm} className="Join-Btn --Bg-Navy">회원가입</div>
                            <div onClick={()=>{
                                location.href = '/'
                            }} className="Join-Btn --Bg-Grey">회원가입 취소</div>
                    </div>
                </div>

			</React.Fragment>
		)
	}
}

Join = withRouter(connect(null, null)(Join))

export default Join
