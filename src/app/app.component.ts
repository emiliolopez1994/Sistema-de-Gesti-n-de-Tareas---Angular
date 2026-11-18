import { Component } from '@angular/core';
import { ListaTareasComponent } from './componentes/lista-tareas/lista-tareas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaTareasComponent],
  template: '<app-lista-tareas></app-lista-tareas>'
})
export class AppComponent {}
