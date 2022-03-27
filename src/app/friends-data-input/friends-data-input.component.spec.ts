import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { submitted } from '../store/app.actions';
import {
  mockUserDatawithOneFriend,
  mockUserDatawithThreeFriends,
} from '../testing/helpers';

import { FriendsDataInputComponent } from './friends-data-input.component';
import { FriendsDataInputFormService } from './friends-data-input.form.service';

describe('FriendsDataInputComponent', () => {
  let component: FriendsDataInputComponent;
  let fixture: ComponentFixture<FriendsDataInputComponent>;
  let formBuilder: FormBuilder;
  let store: MockStore;
  let dispatchSpy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FriendsDataInputComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        FormBuilder,
        FriendsDataInputFormService,
        provideMockStore({
          initialState: {
            UserData: [
              {
                name: '',
                friends: [],
                age: 0,
                weight: 0,
              },
            ],
          },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsDataInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should dispactch submitted action when Submit button is called', () => {
    it('when user has one friend', () => () => {
      const { name, friends, age, weight } = mockUserDatawithOneFriend.userData;
      component.form = formBuilder.group({
        name,
        friends: formBuilder.array([
          formBuilder.group({
            name: friends[0].name,
          }),
        ]),
        age,
        weight,
      });

      dispatchSpy = spyOn(store, 'dispatch');
      let expectedAction = submitted(mockUserDatawithOneFriend);
      component.onDataSubmit();
      expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
    });

    it('when user has more than one friends', () => () => {
      const { name, friends, age, weight } = mockUserDatawithOneFriend.userData;
      component.form = formBuilder.group({
        name,
        friends: formBuilder.array([
          formBuilder.group({
            name: friends[0].name,
          }),
          formBuilder.group({
            name: friends[1].name,
          }),
          formBuilder.group({
            name: friends[2].name,
          }),
        ]),
        age,
        weight,
      });

      dispatchSpy = spyOn(store, 'dispatch');
      let expectedAction = submitted(mockUserDatawithThreeFriends);
      component.onDataSubmit();
      expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
    });
  });
});
