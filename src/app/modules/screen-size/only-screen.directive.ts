import {
  Directive,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { ScreenResolution, ScreenSizeService } from './screen-size.service';

@Directive({
  selector: '[appOnlyScreen]',
})
export class OnlyScreenDirective implements OnDestroy {
  private sub: Subscription;
  @Input() appOnlyScreen: ScreenResolution;

  constructor(
    private screenSize: ScreenSizeService,
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}

  ngAfterViewInit() {
    this.sub = this.screenSize.media$.subscribe((media) => {
      this.toggleView(media);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private toggleView(media: ScreenResolution) {
    if (media === this.appOnlyScreen) {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
