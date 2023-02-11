import { Pipe, PipeTransform } from '@angular/core'
import { Todo } from '../interfaces/todo'
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { filter } from 'rxjs/operators'

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(todoList: Todo[] | null, filter: string): Todo[] {
    return filter === "all"
      ? todoList!
      : filter === "active"
        ? todoList!.filter(todo => todo.status === "active")
        : todoList!.filter(todo => todo.status === "completed")
  }
}