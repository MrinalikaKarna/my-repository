import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FriendsDataInputFormService {
  constructor(private fb: FormBuilder) {}

  getForm() {
    const form = this.fb.group({
      name: ['', Validators.required],
      friends: this.fb.array([this.newFriend()], [Validators.required]),
      age: ['', Validators.required],
      weight: ['', Validators.required],
    });
    return form;
  }

  newFriend(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
    });
  }
}
