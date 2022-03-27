import { initialAppState } from '../model/app.model';
import { mockOutputData, mockUserDatawithOneFriend } from '../testing/helpers';
import { submitted } from './app.actions';
import { reducer } from './app.reducer';

describe('AppReducer', () => {
  describe('actions', () => {
    it('unknown action should return initial state', () => {
      const result = reducer(initialAppState, { type: '' });
      expect(result).toBe(initialAppState);
    });

    describe('submitted action', () => {
      it('should return expected values', () => {
        const action = submitted(mockUserDatawithOneFriend);
        const result = reducer(initialAppState, action);
        expect(result).toEqual(mockOutputData);
      });
    });
  });
});
