import { createAction, props } from '@ngrx/store';
import { User } from '../model/app.model';

export const submitted = createAction(
  '[App] Data Submitted',
  props<{ userData: User }>()
);
