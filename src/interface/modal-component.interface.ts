import {EventEmitter} from '@angular/core';

export interface IModalComponent {
    close: EventEmitter<any>;
}
