import React from "react"

function Login() {
  return(
    <section className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form">
        <input type="text" className="login__input login__input_type_email" name="email" placeholder="Email" />
        <input type="text" className="login__input login__input_type_password" name="password" placeholder="Пароль" />
        <button type="submit" className="login__button"></button>
      </form>
    </section>
  )
}

export default Login;