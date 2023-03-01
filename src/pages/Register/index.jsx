import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  registerFields,
  registerInitValues,
} from './registerFields';
import CustomForm from '../../components/CustomForm';
import axiosInstance from '../../utils/axiosInstance';

function Register() {
  const navigate = useNavigate();

  const register = async (values, actions) => {
    try {
      const { confirmPassword, ...rest } = values;
      const res = await axiosInstance.post(
        'register',
        rest,
      );
      localStorage.setItem(
        'token',
        JSON.stringify(res.data),
      );
      actions.resetForm();
      navigate('/', { replace: true });
    } catch (error) {
      actions.setErrors({
        serverError: error.message,
      });
    }
  };

  return (
    // Consumer
    <CustomForm
      initialValues={registerInitValues}
      fields={registerFields}
      onSubmit={register}
      btnProps={{
        children: 'Sign up',
      }}
    />
  );
}

export default Register;
