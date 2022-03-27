import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { FriendsDataInputComponent } from './friends-data-input/friends-data-input.component';
import { FriendsDataVisualizationComponent } from './friends-data-visualization/friends-data-visualization.component';
import { HomeComponent } from './home/home.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatFormFieldModule, MatToolbarModule],
      declarations: [
        AppComponent,
        HomeComponent,
        FriendsDataVisualizationComponent,
        FriendsDataInputComponent,
      ],
      providers: [FormBuilder, provideMockStore()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'friends-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('friends-app');
  });
});
