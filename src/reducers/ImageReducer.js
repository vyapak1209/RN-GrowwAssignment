import {IMAGES_FETCHED, NEXT_URL, QUERY_CHANGED, NOT_FOUND, SPELL_CHECK} from '../actions/ActionsTypes'
const INITIAL_STATE = { data: null, next: null, error: null, spellCheck: null }

export default (state = INITIAL_STATE, action) => {
  console.log(action)
  switch (action.type) {
    case SPELL_CHECK: 
      return { ...state, spellCheck: action.payload}
    case NOT_FOUND: 
      return { ...state, data: null, error: action.payload}
    case IMAGES_FETCHED:
      if (state.data === null ){
        return { ...state, data: action.payload, error: null }
      }else if(action.text === QUERY_CHANGED){
        return {...state, data: action.payload, error: null}
      }else{
        return {...state, data: state.data.concat(action.payload), error: null}
      }
    default:
      return state;
  }
}