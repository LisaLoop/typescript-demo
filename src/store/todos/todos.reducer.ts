import { AnyAction } from 'redux'
import { TOGGLE_TODO } from './todos.actions'
import { Todo } from '../../core/types'

type TodoState = {
    list: Todo[]
}

const initialState: TodoState = {
    list: []
}
export const todosReducer = (state: TodoState = initialState, action: AnyAction) => {
    switch (action.type) {
        case TOGGLE_TODO:
            return {
                ...state,
                list: state.list.map((todo) => action.payload.id === todo.id ? { ...todo, isDone: !todo.isDone } : todo)
            }
        default: return state
    }
}