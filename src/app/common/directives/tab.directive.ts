import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[blogTabDirective]'
})
export class TabDirective {
    constructor(
        private el: ElementRef,
    ) {}

    @Input() tabDirective;

    @HostListener('keyup', ['$event']) onInputChange(event) {
        const value = this.el.nativeElement.value;
        const cursorPosition = this.el.nativeElement.selectionStart;
        if (event.code === 'Space' && event.ctrlKey) {
            const tempString = value.substr(0, cursorPosition) + '\t' + value.substr(cursorPosition);
            this.el.nativeElement.value = tempString;
            this.el.nativeElement.selectionEnd = cursorPosition + 1;
          }
    }


}
