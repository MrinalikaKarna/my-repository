import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { submitted } from '../store/app.actions';
import { Store } from '@ngrx/store';
import { IAppState } from '../model/app.model';
import { FriendsDataInputFormService } from './friends-data-input.form.service';

@Component({
  selector: 'app-friends-data-input',
  templateUrl: './friends-data-input.component.html',
  styleUrls: ['./friends-data-input.component.scss'],
})
export class FriendsDataInputComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formService: FriendsDataInputFormService,
    private store: Store<IAppState>
  ) {}

  ngOnInit(): void {
    this.form = this.formService.getForm();
  }

  onDataSubmit() {
    this.store.dispatch(submitted({ userData: this.form.value }));
    this.form.reset();
  }

  get friends() {
    return this.form.get('friends') as FormArray;
  }

  addNewFriend() {
    this.friends.push(this.formService.newFriend());
  }

  removeFriend(i: number) {
    this.friends.removeAt(i);
  }
}
