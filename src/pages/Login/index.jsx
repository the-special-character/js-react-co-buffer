import React, { useContext } from 'react';
import { Field } from 'formik';
import CustomForm from '../../components/CustomForm';
import {
  loginFields,
  loginInitValues,
} from './loginFields';
import Checkbox from '../../components/Checkbox';
import { AuthContext } from '../../context/authContext';

function Login() {
  const { login } = useContext(AuthContext);

  return (
    <CustomForm
      initialValues={loginInitValues}
      fields={loginFields}
      onSubmit={login}
      btnProps={{
        children: 'Sign up',
      }}
    >
      <div className="flex items-center justify-between">
        <Field
          component={Checkbox}
          id="rememberMe"
          name="rememberMe"
          label="Remember Me"
        />
        <div className="text-sm">
          <a
            href="/"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Forgot your password?
          </a>
        </div>
      </div>
    </CustomForm>
  );
}

export default Login;
