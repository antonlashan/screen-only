import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Config, CONFIG, ScreenSizeService } from './screen-size.service';
import { OnlyScreenDirective } from './only-screen.directive';

@NgModule({
  declarations: [OnlyScreenDirective],
  imports: [CommonModule],
  exports: [OnlyScreenDirective],
})
export class ScreenSizeModule {
  constructor(@Optional() @SkipSelf() parentModule?: ScreenSizeModule) {
    if (parentModule) {
      throw new Error(
        'ScreenSizeModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(config: Config): ModuleWithProviders<ScreenSizeModule> {
    return {
      ngModule: ScreenSizeModule,
      providers: [ScreenSizeService, { provide: CONFIG, useValue: config }],
    };
  }
}
