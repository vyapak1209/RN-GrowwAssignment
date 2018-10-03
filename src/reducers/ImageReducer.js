import {IMAGES_FETCHED, NEXT_URL, QUERY_CHANGED, NOT_FOUND, SPELL_CHECK} from '../actions/ActionsTypes'
const INITIAL_STATE = { data: null, next: null, error: null, spellCheck: null }

export default (state = INITIAL_STATE, action) => {
  console.log(action)
  switch (action.type) {
    case SPELL_CHECK: 
      return { ...state, spellCheck: action.payload} // Spell check prompt if spellcheck_info object is not null
    case NOT_FOUND: 
      return { ...state, data: null, error: action.payload}  // Data object is on 0 length since query not understood
    case IMAGES_FETCHED:
      if (state.data === null ){
        return { ...state, data: action.payload, error: null }  // First time data is loaded. data is initially null
      }else if(action.text === QUERY_CHANGED){
        return {...state, data: action.payload, error: null}  // Refresh the array object with new data since query changed
      }else{
        return {...state, data: state.data.concat(action.payload), error: null}     // Concat lazy loaded data if query is unchanged
      }
    default:
      return state;
  }
}
