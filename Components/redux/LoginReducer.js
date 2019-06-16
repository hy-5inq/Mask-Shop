import * as LoginActions from './LoginAction.js'

const loginInitialState = {

    IS_DEFAULT_LOGGED_IN : false,
    
}

const loginReducer = (state = loginInitialState , action) => {

    switch(action){
        case LoginActions.SUCCESS_DEFAULT_LOGIN :
            return Object.assign({},state,{
                IS_DEFAULT_LOGGED_IN : true
            })
        default :
            return state
    }

}

export default loginReducer