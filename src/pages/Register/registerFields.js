import Input from '../../components/Input';

export const registerFields = [
  {
    component: Input,
    id: 'name',
    name: 'name',
    autoComplete: 'name',
    placeholder: 'Name',
    value: '',
    className: 'rounded-t-md',
    validate: (value) => {
      if (!value) {
        return 'Required...';
      }
      return null;
    },
  },
  {
    component: Input,
    id: 'email-address',
    name: 'email',
    type: 'email',
    autoComplete: 'email',
    placeholder: 'Email address',
    value: '',
    validate: (value) => {
      if (!value) {
        return 'Required...';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
          value,
        )
      ) {
        return 'Invalid email';
      }
      return null;
    },
  },
  {
    component: Input,
    id: 'password',
    name: 'password',
    type: 'password',
    autoComplete: 'new-password',
    placeholder: 'Password',
    value: '',
    validate: (value) => {
      if (!value) {
        return 'Required...';
      }
      return null;
    },
  },
  {
    component: Input,
    id: 'confirmPassword',
    name: 'confirmPassword',
    type: 'password',
    autoComplete: 'new-password',
    placeholder: 'Confirm Password',
    value: '',
    className: 'rounded-b-md',
    validate: (value) => {
      if (!value) {
        return 'Required...';
      }
      if (value !== password.value) {
        return 'Confirm Password should match with password';
      }
      return null;
    },
  },
];

export const registerInitValues = registerFields.reduce(
  (p, c) => ({ ...p, [c.name]: c.value }),
  {},
);
