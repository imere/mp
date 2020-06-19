import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
} else {
  window.onerror = window.onunhandledrejection = function (err) {
    window.onerror = window.onunhandledrejection = undefined;
    alert(JSON.stringify(err));
  };
}

platformBrowserDynamic().bootstrapModule(AppModule).
  catch(console.error);
