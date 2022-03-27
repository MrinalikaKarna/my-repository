import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { FriendsDataInputComponent } from '../friends-data-input/friends-data-input.component';
import { FriendsDataVisualizationComponent } from '../friends-data-visualization/friends-data-visualization.component';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        FriendsDataInputComponent,
        FriendsDataVisualizationComponent,
      ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [FormBuilder, provideMockStore(), FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
