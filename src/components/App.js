import React, { useEffect } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import successRegisterIcon from "../images/successRegister.png";
import failRegisterIcon from "../images/failRegister.png";
import InfoTooltip from "./InfoTooltip.js";
import * as Auth from "../utils/Auth.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = React.useState(false);
  const [registerIconStatus, setRegisterIconStatus] =
    React.useState(successRegisterIcon);
  const [registerTextStatus, setRegisterTextStatus] = React.useState("");
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const navigate = useNavigate();

  useEffect(() => {
    tokenCheck();
  }, []);

  // функция проверки токена пользователя
  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      Auth.getContent(jwt).then((res) => {
        if (res) {
          setUserData({
            email: res.email,
          });
          setLoggedIn(true);
          navigate("/my-profile", { replace: true });
        }
      });
    }
  };

  // получение карточек с сервера
  React.useEffect(() => {
    api
      .getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch(console.error);
  }, []);

  // получение данных о пользователе с сервера
  React.useEffect(() => {
    api
      .getInfoProfile()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(console.error);
  }, []);

  // лайки карточек
  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    if (!isLiked) {
      api
        .onLikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch(console.error);
    } else {
      api
        .deleteLikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch(console.error);
    }
  }

  // удаление карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => {
          return state.filter((c) => c._id !== card._id);
        });
      })
      .catch(console.error);
  }
  // обновление информации о пользователе
  function handleUpdateUser(data) {
    api
      .updateUserInfo(data.name, data.description)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error);
  }

  // обновление аватара
  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error);
  }

  // добавление карточки
  function handleAddPlaceSubmit(data) {
    api
      .postNewCard(data.cardName, data.cardImageLink)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error);
  }

  // открытие попапа с картинкой
  function handleCardClick(cardData) {
    setImagePopupOpen(true);
    setSelectedCard(cardData);
  }

  // открытие попапа редактирования профиля
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  // открытие попапа добавления карточки
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  // открытие попапа редактирования аватара
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  // функция изменения попапа регистрации
  function handleRegistration(iconStatus) {
    if (iconStatus === "success") {
      setRegisterIconStatus(successRegisterIcon);
      setRegisterTextStatus("Вы успешно зарегистрировались!");
    } else {
      setRegisterIconStatus(failRegisterIcon);
      setRegisterTextStatus("Что-то пошло не так! Попробуйте ещё раз.");
    }
    setRegisterPopupOpen(true);
  }

  // закрытие всех попапов
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setRegisterPopupOpen(false);
    setSelectedCard({});
  }

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <BrowserRouter>
            <Header loggedIn={loggedIn} />
            <Routes>
              <Route
                path="/"
                element={
                  loggedIn ? (
                    <Navigate to="my-profile" replace />
                  ) : (
                    <Navigate to="/sign-in" replace />
                  )
                }
              />
              <Route
                path="/sign-up"
                element={<Register handleRegistration={handleRegistration} />}
              />
              <Route
                path="/sign-in"
                element={<Login handleLogin={handleLogin} />}
              />
              <Route
                path="my-profile"
                element={
                  <ProtectedRoute
                    element={Main}
                    loggedIn={loggedIn}
                    userData={userData}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    cards={cards}
                    onCardDelete={handleCardDelete}
                  />
                }
              />
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>
        <InfoTooltip
          isOpen={isRegisterPopupOpen}
          onClose={closeAllPopups}
          statusImage={registerIconStatus}
          statusText={registerTextStatus}
        />
        <ImagePopup
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
          card={selectedCard}
        />
        {/* попап редактирования профиля */}
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        {/* попап добавления карточки */}
        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />
        {/* попап обновления аватара */}
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
