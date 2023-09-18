import React from "react";

function Register() {
  return(
    <section className="register">
      <h2 className="register__title">Вход</h2>
      <form className="register__form">
        <input
          type="text"
          className="register__input register__input_type_email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          className="register__input register__input_type_password"
          name="password"
          placeholder="Пароль"
          required
        />
        <button type="submit" className="register__button">Зарегистрироваться</button>
        <p className="register__link-to-login">
          <a href="#" className="link" /> Уже зарегистрированы? Войти
        </p>
      </form>
    </section>
  )
}

export default Register;