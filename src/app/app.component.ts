import { Component } from '@angular/core'
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
export class AppComponent {
  todoList: BehaviorSubject<Todo[]> = this.todo.list
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi'
  ];
  active: Observable<number> = this.todo.active

  completed: Observable<number> = this.todo.completed

  filter = "all"

  constructor(private todo: TodoService) { }

  toggleStatus(item: Todo):void {
    this.todo.list.next(this.todo.changeStatus(item))
  }

  submit(todo: NgForm):void {
    this.todo.list.next(this.todo.createTodo(todo))
    todo.reset()
  }

  clearCompleted():void {
    this.todo.list.next(this.todo.deleteCompletedTodo())
  }

  deleteTodo(item: Todo):void {
    this.todo.list.next(this.todo.deleteTodo(item))
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todoList.value, event.previousIndex, event.currentIndex)
  }
}
