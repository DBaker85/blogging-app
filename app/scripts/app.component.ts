import {Component} from '@angular/core';

@Component({
    selector:'blogging-app',
    template:`
    <header></header>
    <div class="container">
        <div class="row">
            <div class="col-1 col-md-3">
                <side-panel></side-panel>
            </div>
            <div class="col-11 col-md-9">
                <posts></posts>
            </div>
            
        </div>
    </div>
    `
})
export class bloggingComponent {

   constructor(

   ){}

}
