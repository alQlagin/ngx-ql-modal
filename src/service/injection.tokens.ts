import {ComponentRef, InjectionToken} from '@angular/core';


export class InjectionTokens {
    public static readonly MODAL_WRAPPER = new InjectionToken<any>('ModalWrapper');
    public static readonly MODAL_WRAPPER_COMPONENT = new InjectionToken('ModalWrapperComponent');
    public static readonly MODAL_WRAPPER_REF = new InjectionToken<ComponentRef<any>>('ModalWrapperRef');
    public static readonly MODAL_CONTAINER_DATA = new InjectionToken<any>('ModalContainerData');
}