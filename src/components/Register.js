import React from "react";
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  return(
    <section className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form">
        <input
          type="text"
          className="login__input login__input_type_email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          className="login__input login__input_type_password"
          name="password"
          placeholder="Пароль"
          required
        />
        <button type="submit" className="login__button">Зарегистрироваться</button>
      </form>
      <span className="login__subtitle">Уже зарегистрированы? <Link to="/sign-in" className='login__link'>Войти</Link></span>
    </section>
  )
}

export default Register;