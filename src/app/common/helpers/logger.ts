import { Injectable } from '@angular/core';
import { WindowRef } from './windowref';

@Injectable()
export class Logger {
    private readonly logPrefix: string = 'blogging-app :';

    public constructor(
        private windowRef: WindowRef
    ) { }

    public write(text: string) {
        if (this.windowRef.nativeWindow.console !== undefined) {
            this.windowRef.nativeWindow.console.log(this.logPrefix, text);
        }
    }

    public debug(...args) {
        if (this.windowRef.nativeWindow.console !== undefined) {
            this.windowRef.nativeWindow.console.debug(this.logPrefix, args);
        }
    }

    public info(...args) {
        if (this.windowRef.nativeWindow.console !== undefined) {
            this.windowRef.nativeWindow.console.info(this.logPrefix, args);
        }
    }

    public warn(...args) {
        if (this.windowRef.nativeWindow.console !== undefined) {
            this.windowRef.nativeWindow.console.warn(this.logPrefix, args);
        }
    }

    public log(...args) {
        if (this.windowRef.nativeWindow.console !== undefined) {
            this.windowRef.nativeWindow.console.log(this.logPrefix, args);
        }
    }

    // only use if you are really stuck for a debug on an external device. wil not show in production mode
    // public alert(...args) {
    //     if (!PRODMODE) {
    //         this.windowRef.nativeWindow.alert(`${this.logPrefix}, ${args}`);
    //     }
    // }
}