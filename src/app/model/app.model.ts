export interface User {
  name: string;
  friends: { name: string }[];
  age: number;
  weight: number;
}

export interface IAppState {
  AppState: { UserData: User[] };
}

export interface IHierarchyTreeData {
  name: string;
  friends: User[];
}

export const initialAppState: { UserData: User[] } = {
  UserData: [
    {
      name: '',
      friends: [],
      age: 0,
      weight: 0,
    },
  ],
};
