import { Component, OnInit } from '@angular/core'
import { Todo } from './interfaces/todo'
import { TodoService } from './services/todo.service'
import { filter, map, tap } from 'rxjs/operators'
import { BehaviorSubject, Observable } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  todoList: BehaviorSubject<Todo[]> = this.todo.list

  active: Observable<number> = this.todo.list.pipe(
    map(value => value.filter(value => value.status === "active").length)
  )

  completed: Observable<number> = this.todo.list.pipe(
    map(value => value.filter(value => value.status === "completed").length)
  )


  filter = "all"
  
  constructor(private todo: TodoService) { }
  
  ngOnInit(): void {
    
  }


  toggleStatus(item: Todo) {
    let newTodo: Todo[] =[]
    this.todo.list.value.map(
      todo => {
        if (todo.id === item.id) {
          item.status === "active" ? todo.status = "completed" : todo.status = "active"
          newTodo.push(todo)
        }
        else newTodo.push(todo)
      }
    )
    this.todo.list.next(newTodo)
  }
}
