import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ScreenSizeModule } from "./modules/screen-size/screen-size.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ScreenSizeModule.forRoot({ mobile: 414, tablet: 768 }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
