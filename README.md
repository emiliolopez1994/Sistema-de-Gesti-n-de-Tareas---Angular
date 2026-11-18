# Sistema de Gestión de Tareas - Angular

## Descripción

Aplicación web desarrollada con Angular y TypeScript que permite gestionar tareas mediante una interfaz interactiva, incorporando funcionalidades de creación, búsqueda, actualización y eliminación de registros.

El sistema implementa el manejo de eventos en Angular, la comunicación entre componentes y la gestión reactiva de información mediante Angular Signals, permitiendo que los cambios realizados se reflejen automáticamente en la interfaz.

## Tecnologías utilizadas

- Angular 20
- TypeScript
- HTML5
- CSS3
- Angular Signals
- Componentes Standalone
- Event Binding y Event Handling
- EventEmitter y @Output
- @HostListener
- Node.js y npm

## Funcionalidades principales

### Gestión de tareas

El sistema permite registrar nuevas tareas, asignarles niveles de prioridad y administrar su estado de cumplimiento.

Cada tarea contiene un identificador, título, prioridad y estado, permitiendo organizar las actividades dentro del panel.

Las acciones disponibles incluyen:

- Registrar nuevas tareas mediante un botón o la tecla Enter.
- Establecer niveles de prioridad Alta, Media y Baja.
- Marcar tareas como completadas o pendientes.
- Eliminar tareas del listado.
- Restaurar la información inicial.

### Búsqueda y filtros

La aplicación incorpora un buscador dinámico que permite localizar tareas mediante coincidencias de texto.

También dispone de filtros que facilitan la visualización de información según:

- Estado de cumplimiento.
- Nivel de prioridad.
- Texto de búsqueda.

Los resultados se actualizan automáticamente conforme el usuario interactúa con los controles.

### Panel de estadísticas

El sistema presenta indicadores calculados a partir de las tareas registradas:

- Total de tareas.
- Tareas completadas.
- Tareas pendientes.
- Tareas de prioridad alta pendientes.
- Porcentaje de avance.

Estas estadísticas se actualizan mediante Angular Signals y propiedades calculadas con `computed()`.

### Manejo de eventos

La aplicación implementa distintos mecanismos de interacción:

- `(click)`: ejecución de acciones mediante botones y elementos seleccionables.
- `(keyup.enter)`: registro de tareas utilizando el teclado.
- `(input)`: búsqueda dinámica.
- `(change)`: selección de prioridades.
- `$event`: captura de información de eventos.
- `@Output()` y `EventEmitter`: comunicación entre componentes.
- `@HostListener`: detección de eventos globales del navegador.
- `stopPropagation()`: control de la propagación de eventos.

## Estructura del proyecto

El sistema está organizado mediante componentes independientes y modelos de datos.

**Modelos**

`src/app/models/tarea.model.ts`

Contiene las interfaces y tipos utilizados para representar las tareas, prioridades y filtros.

**Componente de búsqueda y registro**

`src/app/componentes/buscador-tarea/`

Administra el formulario para registrar nuevas tareas y ejecutar búsquedas. Emite información al componente principal mediante eventos personalizados.

**Componente de gestión de tareas**

`src/app/componentes/lista-tareas/`

Contiene la lógica de administración del listado, los filtros, las estadísticas y los eventos globales del navegador.

**Componente principal**

`src/app/app.component.ts`

Integra el componente de gestión de tareas dentro de la aplicación Angular.

## Instalación

### Requisitos

Para ejecutar el proyecto se necesita:

- Node.js
- npm
- Visual Studio Code o un editor compatible
- Navegador web actualizado

### Configuración

**1.** Abrir la carpeta principal del proyecto en Visual Studio Code.

**2.** Abrir una terminal e instalar las dependencias:

```bash
npm install
```

**3.** Ejecutar el servidor de desarrollo:

```bash
npm start
```

**4.** Acceder a la aplicación desde el navegador:

http://localhost:4200

Para detener el servidor, utilizar `Ctrl + C` en la terminal.

## Funcionamiento del sistema

Al iniciar la aplicación se presenta un listado de tareas con diferentes prioridades y estados de cumplimiento.

El usuario puede registrar nuevas actividades mediante el formulario y visualizar inmediatamente los cambios en el listado.

La información se administra utilizando Angular Signals, que permiten actualizar el estado de las tareas y recalcular automáticamente los indicadores.

La comunicación entre el formulario y el listado se realiza mediante `@Output()` y `EventEmitter`, mientras que los eventos globales permiten detectar acciones del teclado y desplazamientos de la ventana.

## Pruebas funcionales

Para verificar el funcionamiento de la aplicación se contemplan las siguientes pruebas:

1. Registrar tareas mediante el botón de agregar.
2. Registrar tareas presionando Enter.
3. Asignar distintos niveles de prioridad.
4. Buscar tareas mediante el filtro de texto.
5. Cambiar el estado de cumplimiento de una tarea.
6. Eliminar una tarea del listado.
7. Aplicar filtros por prioridad y estado.
8. Presionar ESC para limpiar la búsqueda.
9. Verificar la actualización de estadísticas.
10. Restaurar las tareas iniciales.

## Arquitectura de la aplicación

El proyecto utiliza una arquitectura basada en componentes Standalone de Angular.

La gestión del estado se realiza mediante Signals, mientras que las interfaces TypeScript establecen la estructura de la información y permiten mantener un tipado consistente.

La separación entre el componente de registro y el componente de gestión facilita la organización del código y la reutilización de funcionalidades.

## Compilación

Para generar una compilación de producción, ejecutar:

```bash
npm run build
```

Angular generará los archivos de distribución dentro del directorio `dist/`.

## Almacenamiento de información

El proyecto utiliza almacenamiento temporal en memoria mediante Angular Signals.

Los cambios se mantienen mientras la aplicación permanece cargada. Al actualizar la página se restablecen las tareas iniciales.

La aplicación funciona de manera independiente y no requiere una base de datos ni un servidor backend.