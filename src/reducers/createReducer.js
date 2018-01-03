/**
 * @param {object} initialState
 * @param {function} handlers
 */
export default function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        console.log('reducer function')
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        } else {
            return state
        }
    }
}