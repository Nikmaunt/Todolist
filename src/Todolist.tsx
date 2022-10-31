import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}


export function Todolist(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle('')
        }
    }

    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle('')
    }

    const onALLClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')



    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}/>
            <button onClick={addTask}> +</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onRemoveHandler = () => {props.removeTask(t.id)}
                    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                        console.log( t.id  + 'want to change')}

                    return <li key={t.id}><input type="checkbox"
                                                 checked={t.isDone}
                    onChange={onChangeHandler}
                    /><span>{t.title}</span>
                        <button onClick={onRemoveHandler}>x
                        </button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={onALLClickHandler}>ALL</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}