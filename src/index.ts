import {CommonModule} from '@angular/common';
import {NgModule, ModuleWithProviders} from '@angular/core';
import {ModalTemplateProviderService, MODAL_WRAPPER_COMPONENT} from './service/modal-template-provider.service';
import {ModalHostDirective} from './component/modal-host.directive';
import {ModalMfpWrapperComponent} from './component/modal-mfp-wrapper/modal-mfp-wrapper.component';
import {ModalService} from './service/modal.service';
import {ModalBootstrapWrapperComponent} from './component/modal-bootstrap-wrapper/modal-bootstrap-wrapper.component';

export * from './component';
export * from './service';
export * from './interface';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [ModalMfpWrapperComponent, ModalBootstrapWrapperComponent, ModalHostDirective],
    exports: [ModalHostDirective],
    entryComponents: [ModalMfpWrapperComponent, ModalBootstrapWrapperComponent],
    providers: [ModalService, ModalTemplateProviderService, {
        provide: MODAL_WRAPPER_COMPONENT,
        useValue: ModalBootstrapWrapperComponent
    }]
})
export class NgxQlModalModule {
}
