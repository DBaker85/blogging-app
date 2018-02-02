import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class Logger {

  public log(...args) {
    if (!environment.production && window !== undefined && !environment.test) {
        window.console.log(args);
    }
}

}


