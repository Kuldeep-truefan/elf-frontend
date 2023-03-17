export function filterReducer(state,action){
    switch(action.type){
        case 'CHANGE_VAS':
            return {
                ...state,
                vas:action.payload.vas
            }
        default:
            return state
    }
}