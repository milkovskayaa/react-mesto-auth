export const BASE_URL = "https://auth.nomoreparties.co/";

// запрос для регистрации
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((response) => {
    return response.json();
  })
  .then((res) => {
    return res;
  })
  .catch((err) => {
    console.log(err);
  })
}

// запрос для авторизации
export const authorize = (identifier, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({identifier, password})
  })
  .then((response => response.json()))
  .then((data) => {
    if (data.jwt){
      localStorage.setItem('jwt', data.jwt);
      return data;
    }
  })
  .catch(err => console.log(err))
}

// запрос для проверки валидности токена
export const getToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Athorization': `Bearer ${token}`
        }
  })
  .then(res => res.json())
  .then(data => data)
}
  