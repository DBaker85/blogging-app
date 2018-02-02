import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class Logger {

  public log(...args) {
    if (!environment.production && window !== undefined) {
        window.console.log(args);
    }
}

}


