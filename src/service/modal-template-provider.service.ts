import {
    ComponentFactoryResolver, ComponentRef, Inject, Injectable, InjectionToken, Injector,
    Type
} from '@angular/core';
import {IModalWrapper} from '../interface/modal-wrapper.interface';

export const MODAL_WRAPPER_COMPONENT = new InjectionToken('ModalWrapperComponent');

@Injectable()
export class ModalTemplateProviderService {

    protected hostSelector = 'body';

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private injector: Injector,
                @Inject(MODAL_WRAPPER_COMPONENT) private wrapperCompoment: Type<IModalWrapper>) {
    }

    get modalWrapper() {
        return this.wrapperCompoment;
    }

    createContainer() {
        // Create container
        const body = document.querySelector(this.hostSelector);
        const container = document.createElement('div');
        body.appendChild(container);
        return container;
    }

    createModalWrapper(): ComponentRef<any> {
        // Locate the component factory for the ModalWrapper
        const modalWrapperFactory = this.componentFactoryResolver.resolveComponentFactory<IModalWrapper>(this.modalWrapper);
        // Generate an instance of the ModalWrapper
        return modalWrapperFactory.create(this.injector, [], this.createContainer());
    }
}
