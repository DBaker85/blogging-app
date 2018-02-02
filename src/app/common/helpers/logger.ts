import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class Logger {

  public log(...args) {
    // if (this.windowRef.nativeWindow.console !== undefined) {
    //     this.windowRef.nativeWindow.console.log(this.logPrefix, args);
    // }
    if (!environment.production) {
        window.console.log(args);
    }
}

}


