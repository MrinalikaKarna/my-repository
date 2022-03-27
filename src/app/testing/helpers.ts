export const mockUserDatawithOneFriend = {
  userData: {
    name: 'abc',
    friends: [{ name: 'def' }],
    age: 20,
    weight: 20,
  },
};

export const mockUserDatawithThreeFriends = {
  userData: {
    name: 'abc',
    friends: [{ name: 'def' }, { name: 'ghi' }, { name: 'jkl' }],
    age: 20,
    weight: 20,
  },
};

export const mockOutputData = {
  UserData: [
    {
      name: '',
      friends: [],
      age: 0,
      weight: 0,
    },
    {
      name: 'abc',
      friends: [{ name: 'def' }],
      age: 20,
      weight: 20,
    },
  ],
};
