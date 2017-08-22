import './polyfill'

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { appModule }              from './app/app.module';

platformBrowserDynamic().bootstrapModule(appModule);
