import {ModalHostDirective} from '../component/modal-host.directive';
import {EventEmitter} from '@angular/core';

export interface IModalWrapper {
    modalHost: ModalHostDirective
    close: EventEmitter<any>
    show(): void
    hide(): void
}