import { ElementRef } from '@angular/core';
import { TabDirective } from './tab.directive';

describe('TabDirective', () => {
  it('should create an instance', () => {
    const input = `<input type="text">`;
    const elementRef = new ElementRef(input);
    const directive = new TabDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
