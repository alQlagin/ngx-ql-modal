import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[ngxQlModalHost]'
})
export class ModalHostDirective {

    constructor(public viewContainerRef: ViewContainerRef) { }

}
