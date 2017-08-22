import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {Logger} from '../'

@Directive({
  selector: '[tabDirective]'
})
export class TabDirective {
    constructor(
        private el: ElementRef,
        private logger:Logger
    ){};

    @Input() tabDirective

    @HostListener('keyup', ['$event']) onInputChange(event) {
        this.logger.log(this.el.nativeElement)
        let value = this.el.nativeElement.value;
        let cursorPosition = this.el.nativeElement.selectionStart
        if(event.code =='Space' && event.ctrlKey){
            let tempString = value.substr(0, cursorPosition) + '\t' + value.substr(cursorPosition);
            this.el.nativeElement.value = tempString;
            this.el.nativeElement.selectionEnd = cursorPosition+1
          } 
    }


}
