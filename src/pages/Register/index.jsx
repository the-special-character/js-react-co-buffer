import React from 'react';
import { Formik } from 'formik';

const wait = (time) =>
  new Promise((resolve) => setTimeout(resolve, time));

function Register() {
  return (
    // Consumer
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      onSubmit={async (values) => {
        await wait(3000);
        console.log(values);
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Required...';
        }
        if (!values.email) {
          errors.email = 'Required...';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
            values.email,
          )
        ) {
          errors.email = 'Invalid email';
        }
        if (!values.password) {
          errors.password = 'Required...';
        }
        if (!values.confirmPassword) {
          errors.confirmPassword = 'Required...';
        } else if (
          values.password !== values.confirmPassword
        ) {
          {
            errors.confirmPassword =
              'Confirm Password Should match with password';
          }
        }
        return errors;
      }}
    >
      {({
        values,
        errors,
        touched,
        isValid,
        dirty,
        isSubmitting,
        handleChange,
        handleSubmit,
        handleBlur,
      }) => (
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            type="hidden"
            name="remember"
            defaultValue="true"
          />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name && (
                <p className="text-sm text-red-500 my-1 font-semibold">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email-address"
                className="sr-only"
              >
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && (
                <p className="text-sm text-red-500 my-1 font-semibold">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && (
                <p className="text-sm text-red-500 my-1 font-semibold">
                  {errors.password}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="sr-only"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirmPassword &&
                touched.confirmPassword && (
                  <p className="text-sm text-red-500 my-1 font-semibold">
                    {errors.confirmPassword}
                  </p>
                )}
            </div>
          </div>

          <div>
            <button
              disabled={isSubmitting || !(dirty && isValid)}
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-slate-400 disabled:cursor-wait"
            >
              Sign in
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default Register;
