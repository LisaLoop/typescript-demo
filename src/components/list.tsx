/*
- list container (this file)
- define CRUD actions in Redux
- Make some types - annotate (bullet points)
- TBD
*/

import { FC } from "react";
import {Todo} from '../core/types'
// the colon next to List tells you what type List is
// type of List: FC = function component
// FC wants to know a type that defines the shape of the prop object

type TodoListProps = {
    todos: Todo[]
}

// TS wants to know what the keys of the props object are and also their types
export const TodoList: FC<TodoListProps> = ({ todos }) => {
    return (
        <ul>{todos.map((todo) =>
            <li key={todo.id}>
                <input type="checkbox" />
                <span>{todo.name} - {todo.description}</span>
            </li>
        )}</ul>
    )
}




