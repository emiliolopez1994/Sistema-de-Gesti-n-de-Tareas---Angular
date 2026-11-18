
import { Component, HostListener, computed, signal } from '@angular/core';
import { BuscadorTareaComponent } from '../buscador-tarea/buscador-tarea.component';
import { FiltroEstado, FiltroPrioridad, NuevaTarea, Tarea } from '../../models/tarea.model';

const TAREAS_INICIALES: Tarea[] = [
  { id: 1, titulo: 'Aprender Event Binding en Angular', prioridad: 'Alta', completada: false },
  { id: 2, titulo: 'Practicar @Output() e EventEmitter', prioridad: 'Media', completada: true },
  { id: 3, titulo: 'Implementar filtros con (input)', prioridad: 'Media', completada: false },
  { id: 4, titulo: 'Probar eventos globales con @HostListener', prioridad: 'Baja', completada: false },
  { id: 5, titulo: 'Actualizar tareas usando Angular Signals', prioridad: 'Alta', completada: true }
];

@Component({
  selector: 'app-lista-tareas',
  standalone: true,
  imports: [BuscadorTareaComponent],
  templateUrl: './lista-tareas.component.html',
  styleUrls: ['./lista-tareas.component.css']
})
export class ListaTareasComponent {

  tareas = signal<Tarea[]>(
    TAREAS_INICIALES.map(tarea => ({ ...tarea }))
  );

  filtroTexto = signal<string>('');
  filtroEstado = signal<FiltroEstado>('Todas');
  filtroPrioridad = signal<FiltroPrioridad>('Todas');

  ultimoMensajeGlobal = signal<string>('Sin eventos globales registrados');
  ultimoMovimiento = signal<string>('Aún no se ha interactuado con la lista.');

  private siguienteId = 6;

  // Valores derivados mediante Angular Signals
  total = computed(() => this.tareas().length);

  completadas = computed(() =>
    this.tareas().filter(t => t.completada).length
  );

  pendientes = computed(() =>
    this.total() - this.completadas()
  );

  porcentajeAvance = computed(() =>
    this.total()
      ? Math.round(this.completadas() / this.total() * 100)
      : 0
  );

  tareasAlta = computed(() =>
    this.tareas().filter(
      t => t.prioridad === 'Alta' && !t.completada
    ).length
  );

  tareasFiltradas = computed(() => {
    const texto = this.filtroTexto().toLocaleLowerCase().trim();
    const estado = this.filtroEstado();
    const prioridad = this.filtroPrioridad();

    return this.tareas().filter(t =>
      t.titulo.toLocaleLowerCase().includes(texto) &&
      (
        estado === 'Todas' ||
        (estado === 'Completadas' ? t.completada : !t.completada)
      ) &&
      (
        prioridad === 'Todas' ||
        prioridad === t.prioridad
      )
    );
  });

  // Recibir tarea desde el componente hijo mediante @Output
  onAgregarTarea(nueva: NuevaTarea): void {
    const titulo = nueva.titulo.trim();

    if (!titulo) return;

    this.tareas.update(lista => [
      {
        id: this.siguienteId++,
        titulo,
        prioridad: nueva.prioridad,
        completada: false
      },
      ...lista
    ]);

    this.ultimoMovimiento.set(
      `Se agregó la tarea «${titulo}» mediante EventEmitter.`
    );
  }

  // Filtrar tareas en tiempo real
  onFiltrar(texto: string): void {
    this.filtroTexto.set(texto);
  }

  // Completar o reabrir una tarea
  toggleCompletada(id: number): void {
    const tarea = this.tareas().find(t => t.id === id);

    if (!tarea) return;

    this.tareas.update(lista =>
      lista.map(t =>
        t.id === id
          ? { ...t, completada: !t.completada }
          : t
      )
    );

    this.ultimoMovimiento.set(
      tarea.completada
        ? `Se volvió a abrir «${tarea.titulo}».`
        : `Se completó «${tarea.titulo}».`
    );
  }

  // Eliminar tarea sin activar el evento del contenedor
  eliminarTarea(id: number, event: Event): void {
    event.stopPropagation();

    const tarea = this.tareas().find(t => t.id === id);

    if (!tarea) return;

    this.tareas.update(lista =>
      lista.filter(t => t.id !== id)
    );

    this.ultimoMovimiento.set(
      `Se eliminó la tarea «${tarea.titulo}» sin alternar su estado.`
    );
  }

  // CORRECCIÓN TS2345:
  // Angular reconoce $event como Event en esta plantilla.
  // Funciona con Enter y barra espaciadora.
  onTeclaTarea(event: Event, id: number): void {
    if (event.target !== event.currentTarget) return;

    event.preventDefault();
    this.toggleCompletada(id);
  }

  // Filtro por estado
  seleccionarEstado(estado: FiltroEstado): void {
    this.filtroEstado.set(estado);
  }

  // Filtro por prioridad
  seleccionarPrioridad(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.filtroPrioridad.set(
      select.value as FiltroPrioridad
    );
  }

  // Restaurar todas las tareas iniciales
  restaurarTareas(): void {
    this.tareas.set(
      TAREAS_INICIALES.map(tarea => ({ ...tarea }))
    );

    this.filtroTexto.set('');
    this.filtroEstado.set('Todas');
    this.filtroPrioridad.set('Todas');

    this.siguienteId = 6;

    this.ultimoMovimiento.set(
      'Se restauró la lista inicial de la práctica con set().'
    );
  }

  // Evento global: detectar tecla ESC
  @HostListener('window:keydown.escape')
  onEscapeGlobal(): void {
    this.filtroTexto.set('');

    this.ultimoMensajeGlobal.set(
      'Tecla ESC: búsqueda limpiada globalmente.'
    );
  }

  // Evento global: detectar desplazamiento de ventana
  @HostListener('window:scroll')
  onScrollGlobal(): void {
    const pixeles = Math.round(window.scrollY);

    this.ultimoMensajeGlobal.set(
      `Desplazamiento detectado: ${pixeles} px desde el inicio.`
    );
  }
}
