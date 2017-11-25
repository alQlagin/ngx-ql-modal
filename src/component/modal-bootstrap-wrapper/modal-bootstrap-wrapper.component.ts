import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {IModalWrapper} from '../../interface/modal-wrapper.interface';
import {ModalHostDirective} from '../modal-host.directive';

@Component({
    selector: 'app-modal-bootstrap-wrapper',
    templateUrl: './modal-bootstrap-wrapper.component.html',
    styles: [`
        .modal {
            display: block;
        }

        .modal.hidden {
            display: none
        }

    `]
})
export class ModalBootstrapWrapperComponent implements IModalWrapper {

    @ViewChild(ModalHostDirective) modalHost: ModalHostDirective;
    @Output() close = new EventEmitter();
    private body: Element;
    public active = false;

    constructor() {
        this.body = document.getElementsByTagName('body')[0]
    }

    show() {
        this.body.classList.add('modal-open');
        this.active = true;
    }

    hide() {
        this.body.classList.remove('modal-open');
        this.active = false;
    }

    closeHandler() {
        this.close.emit();
    }
}
