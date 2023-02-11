import { Injectable, OnInit } from '@angular/core'
import { Todo } from '../interfaces/todo'
import { BehaviorSubject } from 'rxjs'

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
}
