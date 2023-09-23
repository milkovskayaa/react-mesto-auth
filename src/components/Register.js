import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Auth from '../utils/Auth.js';

function Register() {

  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    Auth.register(formValue.email, formValue.password)
    .then(() => {
      navigate('/sign-in', {replace: true})
    })
  }

  return (
    <section className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={formValue.email}
          type="text"
          className="login__input login__input_type_email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          onChange={handleChange}
          value={formValue.password}
          type="password"
          className="login__input login__input_type_password"
          name="password"
          placeholder="Пароль"
          required
        />
        <button type="submit" className="login__button">
          Зарегистрироваться
        </button>
      </form>
      <span className="login__subtitle">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="login__link">
          Войти
        </Link>
      </span>
    </section>
  );
}

export default Register;
