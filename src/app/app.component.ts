import { Component, OnInit } from '@angular/core'
import { Todo } from './interfaces/todo'
import { TodoService } from './services/todo.service'
import { BehaviorSubject, Observable } from 'rxjs'
import { NgForm } from '@angular/forms'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { UiService } from './services/ui.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  todoList: BehaviorSubject<Todo[]> = this.todo.list

  theme!: "light" | "dark"
  mobile!: boolean

  active: Observable<number> = this.todo.active

  completed: Observable<number> = this.todo.completed

  filter = "all"
  filterList = ["all", "active", "completed"]

  constructor(
    private todo: TodoService,
    private ui: UiService) { }

  ngOnInit(): void {
    this.theme = this.ui.setTheme()
    this.mobile = this.ui.isMobile()
  }
  toggleTheme() {
    this.theme = this.ui.toggleTheme(this.theme)
  }

  toggleStatus(item: Todo): void {
    this.todo.list.next(this.todo.changeStatus(item))
  }

  submit(todo: NgForm): void {
    this.todo.list.next(this.todo.createTodo(todo))
  }

  clearCompleted(): void {
    this.todo.list.next(this.todo.deleteCompletedTodos())
  }

  deleteTodo(item: Todo): void {
    this.todo.list.next(this.todo.deleteTodo(item))
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todoList.value, event.previousIndex, event.currentIndex)
  }
}
