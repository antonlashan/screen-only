import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

export interface Config {
  mobile: number;
  tablet: number;
}

export enum ScreenResolution {
  MOBILE = 'MOBILE',
  TABLET = 'TABLET',
  DESKTOP = 'DESKTOP',
}

export const CONFIG = new InjectionToken<Config>('SCREEN_SIZE_CONFIG');

@Injectable()
export class ScreenSizeService {
  media$: BehaviorSubject<ScreenResolution>;

  constructor(@Inject(CONFIG) private config: Config) {
    this.media$ = new BehaviorSubject(this.getMatchedResolution());

    fromEvent(window, 'resize')
      .pipe(
        debounceTime(50),
        map(() => this.getMatchedResolution())
      )
      .subscribe((r) => {
        this.media$.next(r);
      });
  }

  private getMatchedResolution(): ScreenResolution {
    if (window.innerWidth <= this.config.mobile) {
      return ScreenResolution.MOBILE;
    } else if (
      this.config.mobile < window.innerWidth &&
      window.innerWidth <= this.config.tablet
    ) {
      return ScreenResolution.TABLET;
    } else {
      return ScreenResolution.DESKTOP;
    }
  }
}
