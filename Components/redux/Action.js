/**
 * Action.js
 * 발생시키는 모든 액션을 반영하고 리덕스 스토어의 데이터를 변동시키기 위해서는 반드시 액션을 가해줘야 합니다.
 */

export const A_USER_CLICKED_BUTTON = "A_USER_CLICKED_BUTTON"

export const AC_USER_CLICKED_BUTTON = (input_text) => {

    return{
        type : A_USER_CLICKED_BUTTON,
        value : input_text
    }

}