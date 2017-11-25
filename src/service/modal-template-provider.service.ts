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
        try {
            // @TODO разобраться с this.hostSelector
            const body = document.querySelector('body');
            const container = document.createElement('div');
            body.appendChild(container);
            return container;
        } catch (err) {
            console.error(err);
        }
    }

    createModalWrapper(container: Element): ComponentRef<any> {
        // Locate the component factory for the ModalWrapper
        const modalWrapperFactory = this.componentFactoryResolver.resolveComponentFactory<IModalWrapper>(this.modalWrapper);
        // Generate an instance of the ModalWrapper
        return modalWrapperFactory.create(this.injector, [], container);
    }
}
