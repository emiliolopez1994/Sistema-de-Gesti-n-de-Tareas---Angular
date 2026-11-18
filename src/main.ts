import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent).catch(error => {
  console.error('No fue posible iniciar la aplicación Angular:', error);
});
