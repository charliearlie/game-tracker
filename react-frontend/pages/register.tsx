import * as React from "react";
import { useMeQuery, useRegisterMutation } from "../generated/graphql";

export function Register(): JSX.Element {
  const [register, r] = useRegisterMutation();
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (evt: any) => {
    console.log(evt);
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const onSubmit = async (evt: any) => {
    evt.preventDefault();
    const result = await register({ variables: formData });
    console.log(result);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={handleChange}
          value={formData.username}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={handleChange}
          value={formData.email}
        />
      </div>
      <div>
        <label htmlFor="username">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          value={formData.password}
        />
      </div>
      <div>
        <label htmlFor="username">Confirm password:</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          onChange={handleChange}
          value={formData.confirmPassword}
        />
      </div>
      <button>Submit</button>
    </form>
  );
}

export default Register;
