/** Definición de los datos que representa cada tarea. */
export type Prioridad = 'Baja' | 'Media' | 'Alta';

export interface Tarea {
  id: number;
  titulo: string;
  prioridad: Prioridad;
  completada: boolean;
}

export type NuevaTarea = Pick<Tarea, 'titulo' | 'prioridad'>;
export type FiltroEstado = 'Todas' | 'Pendientes' | 'Completadas';
export type FiltroPrioridad = 'Todas' | Prioridad;
