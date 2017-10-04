import { MessageStoreService } from './common/message-store.service';
import { MatToolbarModule, MatCardModule, MatInputModule, MatProgressBarModule, MatExpansionModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiKeyInputComponent } from './api-key-input/api-key-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageOutputComponent } from './message-output/message-output.component';
import { HttpModule } from '@angular/http';
import { MessageListComponent } from './message-list/message-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ApiKeyInputComponent,
    MessageOutputComponent,
    MessageListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatProgressBarModule,
    MatExpansionModule
  ],
  providers: [MessageStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
