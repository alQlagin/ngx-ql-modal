import {
    ApplicationRef, ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    Injectable,
    InjectionToken,
    Injector,
    Type
} from '@angular/core';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/do';
import {ModalTemplateProviderService} from './modal-template-provider.service';
import {IModalComponent} from '../interface/modal-component.interface';
import {ModalInjector} from '../class/modal.injector';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';

export const MODAL_CONTAINER_DATA = new InjectionToken<any>('ModalContainerData');
export const MODAL_WRAPPER_REF = new InjectionToken<ComponentRef<any>>('ModalWrapperRef');
export const MODAL_WRAPPER = new InjectionToken<any>('ModalWrapper');

@Injectable()
export class ModalService {
    private modalWrapperRef: ComponentRef<any>;
    private wrapperCloseSubscription: Subscription;
    private componentCloseSubscription: Subscription;

    constructor(applicationRef: ApplicationRef,
                private componentFactoryResolver: ComponentFactoryResolver,
                private injector: Injector,
                modalTemplateProvider: ModalTemplateProviderService) {

        this.modalWrapperRef = modalTemplateProvider.createModalWrapper();
        // Attach to the component to Angular's component tree for dirty checking
        applicationRef.attachView(this.modalWrapperRef.hostView);
    }

    private get modalWrapperInstance() {
        return this.modalWrapperRef && this.modalWrapperRef.instance;
    }

    reveal(component: Type<IModalComponent>, config: { data?: any } = {}): Observable<any> {
        this.beforeReveal();

        // https://angular.io/guide/dynamic-component-loader
        // Locate the component factory for the modal component
        const componentFactory: ComponentFactory<IModalComponent> = this
            .componentFactoryResolver
            .resolveComponentFactory<IModalComponent>(component);

        const componentRef: ComponentRef<IModalComponent> = this
            .modalWrapperInstance.modalHost.viewContainerRef
            .createComponent(componentFactory, null, this.createInjector(config));
        this.modalWrapperInstance.show();
        const componentInstanceCloseShared = componentRef.instance.close.asObservable().share();

        this.afterReveal(componentRef, componentInstanceCloseShared);
        return componentInstanceCloseShared;
    }

    protected afterReveal(componentRef: ComponentRef<IModalComponent>,
                          componentInstanceCloseShared: Observable<any>) {
        this.componentCloseSubscription = componentInstanceCloseShared.subscribe(() => this.close());
        this.wrapperCloseSubscription = this.modalWrapperInstance.close.asObservable().subscribe(() => componentRef.instance.close.emit());
    }

    close(above = false) {
        if (!above) {
            this.modalWrapperInstance.hide();
        }
        this.modalWrapperInstance.modalHost.viewContainerRef.clear();
        if (this.wrapperCloseSubscription) {
            this.wrapperCloseSubscription.unsubscribe();
        }
        if (this.componentCloseSubscription) {
            this.componentCloseSubscription.unsubscribe();
        }
    }

    protected beforeReveal() {
        this.close();
    }

    private createInjector(config: any) {
        const injectionTokens = new WeakMap();
        injectionTokens.set(MODAL_CONTAINER_DATA, config && config.data);
        injectionTokens.set(MODAL_WRAPPER_REF, this.modalWrapperRef);
        injectionTokens.set(MODAL_WRAPPER, this.modalWrapperInstance);
        return new ModalInjector(this.injector, injectionTokens);
    }
}
