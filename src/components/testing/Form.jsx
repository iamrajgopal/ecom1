import React from "react";
import { useForm, Controller } from "react-hook-form";

const FormComponent = () => {
  const { control, handleSubmit, formState, setError } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Handle form submission with the data
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div>
          <label htmlFor="name">Name</label>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field, fieldState }) => (
              <>
                <input type="text" id="name" {...field} />
                {fieldState.error && <p>{fieldState.error.message}</p>}
              </>
            )}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email">Email</label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <input type="text" id="email" {...field} />
                {fieldState.error && <p>{fieldState.error.message}</p>}
              </>
            )}
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone">Phone</label>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "Phone is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid phone number",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <input type="text" id="phone" {...field} />
                {fieldState.error && <p>{fieldState.error.message}</p>}
              </>
            )}
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password">Password</label>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <input type="password" id="password" {...field} />
                {fieldState.error && <p>{fieldState.error.message}</p>}
              </>
            )}
          />
        </div>

        <button type="submit" disabled={formState.isSubmitting}>
        {formState.isSubmitting?'....Submitting':'Submit'}
        </button>
      </form>
    </div>
  );
};

export default FormComponent;