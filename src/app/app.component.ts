import { Component } from '@angular/core';
import { Firestore, collectionData, collection, setDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  todos$: Observable<any>;  //Observable ist eine Veriable, die sich updated
  todos: Array<any>;
  todotext = '';

  constructor(private firestore: Firestore) {
    const coll = collection(firestore, 'Todos');
    this.todos$ = collectionData(coll);

    this.todos$.subscribe((newTodos) => {
      console.log('Neue Todos sind:', newTodos);
      this.todos = newTodos;
    });

  }

  addTodo() {

    const coll = collection(this.firestore, 'Todos');
    setDoc(doc(coll), { name: this.todotext });

  }

}
