import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EditorModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ]
})
export class AppModule { }
