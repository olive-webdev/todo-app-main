import { Injectable, OnInit } from '@angular/core'
import { Todo } from '../interfaces/todo'
import { BehaviorSubject, Observable, map } from 'rxjs'
import { NgForm } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class TodoService{

  constructor() {}

  list: BehaviorSubject<Todo[]> = new BehaviorSubject(
    [
      {
        id: 0,
        title: "Complete online Javascript course",
        status: "completed"
      },
      {
        id: 1,
        title: "Jog around the park 3x",
        status: "active"
      },
      {
        id: 2,
        title: "10 minutes meditation",
        status: "active"
      },
      {
        id: 3,
        title: "read for 1 hour",
        status: "active"
      },
      {
        id: 4,
        title: "Pick up groceries",
        status: "active"
      },
      {
        id: 5,
        title: "Complete Todo App on Frontend Mentor",
        status: "active"
      }
    ]
  )

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
    let id = new Date().valueOf()
    console.log([...this.list.value, {
      id: id,
      title: item.value.todo,
      status: "active"
    }])
    return [...this.list.value, {
      id: id,
      title: item.value.todo,
      status: "active"
    }]
  }

  deleteCompletedTodo(): Todo[] {
    return this.list.value.filter(
      item=> item.status !== "completed"
    )
  }

  deleteTodo(todo: Todo): Todo[]{
    return this.list.value.filter(
      item => item.id !== todo.id
    )
  }
}
