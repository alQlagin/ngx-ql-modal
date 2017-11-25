import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalHostDirective} from '../modal-host.directive';
import {IModalWrapper} from '../../interface/modal-wrapper.interface';

@Component({
    templateUrl: './modal-mfp-wrapper.component.html',
    styleUrls: ['./modal-mfp-wrapper.component.scss']
})
export class ModalMfpWrapperComponent implements IModalWrapper{
    @ViewChild(ModalHostDirective) modalHost: ModalHostDirective;
    @Output() close = new EventEmitter();

    public active = false;

    show() {
        this.active = true;
    }

    hide() {
        this.active = false;
    }
}
