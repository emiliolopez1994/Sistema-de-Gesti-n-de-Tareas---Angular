import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NuevaTarea, Prioridad } from '../../models/tarea.model';

@Component({
  selector: 'app-buscador-tarea',
  standalone: true,
  templateUrl: './buscador-tarea.component.html',
  styleUrls: ['./buscador-tarea.component.css']
})
export class BuscadorTareaComponent {
  // Un dato del padre actualiza el valor visible del campo al pulsar ESC.
  @Input() filtroActual = '';

  // Eventos personalizados: comunicación desde el hijo hasta el padre.
  @Output() nuevaTareaEvent = new EventEmitter<NuevaTarea>();
  @Output() filtrarEvent = new EventEmitter<string>();

  prioridadSeleccionada: Prioridad = 'Media';
  mensajeValidacion = '';

  // Lee $event del selector nativo.
  onSeleccionarPrioridad(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.prioridadSeleccionada = select.value as Prioridad;
  }

  // #inputTitulo es una variable de referencia de plantilla.
  emitirNuevaTarea(inputElement: HTMLInputElement): void {
    const titulo = inputElement.value.trim();
    if (!titulo) {
      this.mensajeValidacion = 'Escribe el nombre de una tarea antes de agregarla.';
      inputElement.focus();
      return;
    }

    this.nuevaTareaEvent.emit({ titulo, prioridad: this.prioridadSeleccionada });
    this.mensajeValidacion = '';
    inputElement.value = '';
    inputElement.focus();
  }

  // Se emite una actualización por cada carácter del campo de búsqueda.
  onInputFiltrar(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filtrarEvent.emit(input.value);
  }

  limpiarBusqueda(inputElement: HTMLInputElement): void {
    inputElement.value = '';
    this.filtrarEvent.emit('');
    inputElement.focus();
  }
}
