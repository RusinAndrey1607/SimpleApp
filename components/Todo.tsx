import React, { FormEvent, FormEventHandler, useEffect, useState } from 'react'
import styles from '../styles/todo.module.css'

type todoType = {
    id: string
    text: string
    done: boolean
}

const Todo = () => {
    const [value, setValue] = useState("")
    const [todos, setTodos] = useState<todoType[]>([] as todoType[])

    const submitHandler = (e: FormEvent) => {
        e.preventDefault()

        const newTodo = { id: 'id' + (new Date()).getTime(), text: value, done: false }
        setTodos([...todos, newTodo])
        setValue("")
    }

    const handleDelete = (id: string) => {
        setTodos(todos.filter(item => item.id !== id))
    }

    const handleDone = (id: string) => {
        setTodos(todos.map(n => n.id === id ? { ...n, done: !n.done } : n))
    }

    useEffect(() => {
        // @ts-ignore
        window.localStorage.getItem("Todos") && setTodos(JSON.parse(window.localStorage.getItem("Todos")))
    }, [])

    useEffect(() => {
        window.localStorage.setItem("Todos", JSON.stringify(todos))

    }, [todos])

    return (
        <div className={styles.todoWrapper}>
            <form className={styles.todoForm} onSubmit={submitHandler}>
                <input value={value} onChange={(e) => setValue(e.currentTarget.value)} className={styles.todoInput} type="text" placeholder="Task for day !" />
            </form>

            <ul className={styles.todoList}>
                {todos.map(item => {
                    return <li key={item.id} className={`${styles.todoList__item} ${item.done ? styles.done : ""}`}>
                        <button className={styles.doneBtn} onClick={() => handleDone(item.id)}>
                            ✔️
                        </button>
                        <span>

                            {item.text}
                        </span>
                        <button className={styles.delBtn} onClick={() => handleDelete(item.id)}>
                            ❌
                        </button>
                    </li>
                })}



            </ul>
        </div>)
}

export default Todo