import { Component, OnInit } from '@angular/core'
import { Todo } from './interfaces/todo'
import { TodoService } from './services/todo.service'
import { BehaviorSubject, Observable } from 'rxjs'
import { NgForm } from '@angular/forms'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  todoList: BehaviorSubject<Todo[]> = this.todo.list

  theme: "light" | "dark" = "light"

  active: Observable<number> = this.todo.active

  completed: Observable<number> = this.todo.completed

  filter = "all"

  constructor(private todo: TodoService) { }

  ngOnInit(): void {
    document.body.classList.add(this.theme)
  }
  toggleTheme() {
    document.body.classList.remove(this.theme)
    this.theme = this.theme === "light" ? "dark" : "light"
    document.body.classList.add(this.theme)
  }

  toggleStatus(item: Todo): void {
    this.todo.list.next(this.todo.changeStatus(item))
  }

  submit(todo: NgForm): void {
    this.todo.list.next(this.todo.createTodo(todo))
    todo.reset()
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
