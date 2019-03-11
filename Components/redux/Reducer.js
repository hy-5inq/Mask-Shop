/**
 * Reducer.js
 * 리듀서는 받은 액션의 Type를 조사하여 어느 JSON 키의 데이터를 변동시킬지 결정해요.
 */

import * as Actions from './Action.js'

const reducerInitialState = {
    TEXT_STATE : "Change Me!"
}

const Reducer = (state = reducerInitialState , action) => {

    switch(action.type){
        
        case Actions.A_USER_CLICKED_BUTTON : 
            return Object.assign({},state,{
                TEXT_STATE : action.value
            })

        default :
            return state
    }

}

export default Reducer