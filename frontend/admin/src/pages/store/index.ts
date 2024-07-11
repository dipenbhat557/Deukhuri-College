import { atom, selector } from 'recoil';

const loadUserData = () => {
  const userData = localStorage.getItem('currentUser');
  return userData ? JSON.parse(userData) : null;
};

export const isLoggedIn = selector({
  key: 'isLoggedIn',
  get: ({ get }) => {
    const currentUser = get(currUser);
    return !!currentUser.email;
  },
});

export const currUser = atom({
  key: 'currUser',
  default: loadUserData() || {
    id:null,
    email: null,
    name: null,
    pimg: null,
    phone: null,
    role: null,
  },
});
