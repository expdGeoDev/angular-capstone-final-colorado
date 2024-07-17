import { ApplicationConfig, importProvidersFrom } from '@angular/core';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { UIRouterModule } from '@uirouter/angular';
import { appRouting } from './app.routing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
	providers: [
		provideHttpClient(withFetch()),
		importProvidersFrom(UIRouterModule.forRoot({ states: appRouting })),
		provideAnimations(),
		provideToastr(),
		NgxSpinnerModule,
	],

};
