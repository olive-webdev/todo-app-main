import { Injectable } from '@angular/core'
import { Todo } from '../interfaces/todo'
import { BehaviorSubject, Observable, map } from 'rxjs'
import { NgForm } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class TodoService{
  mockup: Todo[] = [
    {
      id: 2,
      title: "Use Angular",
      status: "completed"
    },
    {
      id: 4,
      title: "Add toggle Active/Completed feature",
      status: "completed"
    },
    {
      id: 3,
      title: "Add Drag&Drop possibility",
      status: "completed"
    },
    {
      id: 5,
      title: "Complete Todo App on Frontend Mentor",
      status: "completed"
    },
    {
      id: 0,
      title: "Think about next project",
      status: "active"
    },
    {
      id: 1,
      title: "Pet the cat",
      status: "active"
    },
  ]

  constructor() {}

  list: BehaviorSubject<Todo[]> = new BehaviorSubject(this.mockup)

  active: Observable<number> = this.list.pipe(
    map(value => value.filter(value => value.status === "active").length)
  )

  completed: Observable<number> = this.list.pipe(
    map(value => value.filter(value => value.status === "completed").length)
  )

  changeStatus(item: Todo) {
    let newTodo: Todo[] = []
    this.list.value.map(
      todo => {
        if (todo.id === item.id) {
          item.status === "active" ? todo.status = "completed" : todo.status = "active"
          newTodo.push(todo)
        }
        else newTodo.push(todo)
      }
    )
    return newTodo
  }

  createTodo(item: NgForm): Todo[] {
    return [...this.list.value, {
      id: new Date().valueOf(),
      title: item.value.todo,
      status: "active"
    }]
  }

  deleteTodo(todo: Todo): Todo[]{
    return this.list.value.filter(
      item => item.id !== todo.id
    )
  }

  deleteCompletedTodos(): Todo[] {
    return this.list.value.filter(
      item=> item.status !== "completed"
    )
  }
}
