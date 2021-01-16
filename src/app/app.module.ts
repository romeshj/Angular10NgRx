import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import * as $ from 'jquery';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { ShoppingModule } from './shopping/shopping/shopping.module';
import { CustomerModule } from './customers/customer/customer.module';

import { CoreModule } from './core.module';
import { SharedModule } from './shared.module';
import * as fromApp from './store/app.reducer';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,	
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
	BrowserAnimationsModule,
	FormsModule,
	ReactiveFormsModule,
	HttpClientModule,
    AppRoutingModule,
	StoreModule.forRoot(fromApp.appReducer),
	EffectsModule.forRoot([AuthEffects]),
	ShoppingModule,
	SharedModule,
	CoreModule,
	CustomerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
