! function(e) {
  var t = {};

  function n(r) {
      if (t[r]) return t[r].exports;
      var o = t[r] = {
          i: r,
          l: !1,
          exports: {}
      };
      return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
  }
  n.m = e, n.c = t, n.d = function(e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, {
          enumerable: !0,
          get: r
      })
  }, n.r = function(e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
          value: "Module"
      }), Object.defineProperty(e, "__esModule", {
          value: !0
      })
  }, n.t = function(e, t) {
      if (1 & t && (e = n(e)), 8 & t) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (n.r(r), Object.defineProperty(r, "default", {
              enumerable: !0,
              value: e
          }), 2 & t && "string" != typeof e)
          for (var o in e) n.d(r, o, function(t) {
              return e[t]
          }.bind(null, o));
      return r
  }, n.n = function(e) {
      var t = e && e.__esModule ? function() {
          return e.default
      } : function() {
          return e
      };
      return n.d(t, "a", t), t
  }, n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
  }, n.p = "", n(n.s = 1)
}([function(e, t, n) {}, function(e, t, n) {
  "use strict";
  n.r(t);
  n(0);

  function r(e, t) {
      for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
      }
  }
  var o = function() {
      function e(t, n) {
          ! function(e, t) {
              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
          }(this, e), this._inputSelector = t.inputSelector, this._submitButtonSelector = t.submitButtonSelector, this._inactiveButtonClass = t.inactiveButtonClass, this._inputErrorClass = t.inputErrorClass, this._errorClass = t.errorClass, this._formElement = n
      }
      var t, n, o;
      return t = e, (n = [{
          key: "_showInputError",
          value: function(e) {
              var t = this._formElement.querySelector("#".concat(e.name, "-error"));
              e.classList.add(this._inputErrorClass), t.textContent = e.validationMessage, t.classList.add(this._errorClass)
          }
      }, {
          key: "_hideInputError",
          value: function(e) {
              var t = this._formElement.querySelector("#".concat(e.name, "-error"));
              e.classList.remove(this._inputErrorClass), t.classList.remove(this._errorClass), t.textContent = ""
          }
      }, {
          key: "_checkInputValidity",
          value: function(e) {
              e.validity.valid ? this._hideInputError(e) : this._showInputError(e)
          }
      }, {
          key: "_hasInvalidInput",
          value: function() {
              return this._inputList.some((function(e) {
                  return !e.validity.valid
              }))
          }
      }, {
          key: "_toggleButtonState",
          value: function(e) {
              (void 0 === e ? !this._hasInvalidInput() : e) ? (this._buttonElement.classList.remove(this._inactiveButtonClass), this._buttonElement.removeAttribute("disabled", "")) : (this._buttonElement.classList.add(this._inactiveButtonClass), this._buttonElement.setAttribute("disabled", ""))
          }
      }, {
          key: "_setEventListeners",
          value: function() {
              var e = this;
              this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)), this._buttonElement = this._formElement.querySelector(this._submitButtonSelector), this._inputList.forEach((function(t) {
                  t.addEventListener("input", (function() {
                      e._checkInputValidity(t), e._toggleButtonState()
                  }))
              }))
          }
      }, {
          key: "enableValidation",
          value: function() {
              this._setEventListeners()
          }
      }, {
          key: "setDefault",
          value: function(e) {
              var t = this;
              this._toggleButtonState(e), this._inputList.forEach((function(e) {
                  t._hideInputError(e)
              }))
          }
      }]) && r(t.prototype, n), o && r(t, o), e
  }();

  function i(e, t) {
      for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
      }
  }
  var a = function() {
      function e(t) {
          ! function(e, t) {
              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
          }(this, e), this._popupElement = document.querySelector(t)
      }
      var t, n, r;
      return t = e, (n = [{
          key: "open",
          value: function() {
              this._popupElement.classList.add("popup_display_opened"), this._setEventListeners()
          }
      }, {
          key: "close",
          value: function() {
              this._popupElement.classList.remove("popup_display_opened"), this._removeEventListeners()
          }
      }, {
          key: "_handleEscClose",
          value: function(e) {
              "Escape" === e.key && this.close()
          }
      }, {
          key: "_setEventListeners",
          value: function() {
              var e = this;
              this._closeButton = this._popupElement.querySelector(".popup__exit-button"), this._overlay = this._popupElement.querySelector(".popup__overlay"), this._escHandler = function(t) {
                  e._handleEscClose(t)
              }, this._overlayHandler = function() {
                  e.close()
              }, this._closeHandler = function() {
                  e.close()
              }, document.addEventListener("keydown", this._escHandler), this._overlay.addEventListener("click", this._overlayHandler), this._closeButton.addEventListener("click", this._closeHandler)
          }
      }, {
          key: "_removeEventListeners",
          value: function() {
              document.removeEventListener("keydown", this._escHandler), this._overlay.removeEventListener("click", this._overlayHandler), this._closeButton.removeEventListener("click", this._closeHandler)
          }
      }]) && i(t.prototype, n), r && i(t, r), e
  }();

  function u(e) {
      return (u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      })(e)
  }

  function s(e, t) {
      for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
      }
  }

  function c(e, t, n) {
      return (c = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, n) {
          var r = function(e, t) {
              for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = p(e)););
              return e
          }(e, t);
          if (r) {
              var o = Object.getOwnPropertyDescriptor(r, t);
              return o.get ? o.get.call(n) : o.value
          }
      })(e, t, n || e)
  }

  function l(e, t) {
      return (l = Object.setPrototypeOf || function(e, t) {
          return e.__proto__ = t, e
      })(e, t)
  }

  function f(e) {
      var t = function() {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
              return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))), !0
          } catch (e) {
              return !1
          }
      }();
      return function() {
          var n, r = p(e);
          if (t) {
              var o = p(this).constructor;
              n = Reflect.construct(r, arguments, o)
          } else n = r.apply(this, arguments);
          return h(this, n)
      }
  }

  function h(e, t) {
      return !t || "object" !== u(t) && "function" != typeof t ? function(e) {
          if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e
      }(e) : t
  }

  function p(e) {
      return (p = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
          return e.__proto__ || Object.getPrototypeOf(e)
      })(e)
  }
  var _ = function(e) {
          ! function(e, t) {
              if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
              e.prototype = Object.create(t && t.prototype, {
                  constructor: {
                      value: e,
                      writable: !0,
                      configurable: !0
                  }
              }), t && l(e, t)
          }(i, e);
          var t, n, r, o = f(i);

          function i(e, t) {
              var n;
              return function(e, t) {
                  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
              }(this, i), (n = o.call(this, e))._formSubmitHandler = t, n
          }
          return t = i, (n = [{
              key: "open",
              value: function() {
                  c(p(i.prototype), "open", this).call(this), this._form.reset(), this.hideError()
              }
          }, {
              key: "_getInputValues",
              value: function() {
                  var e = {};
                  return Array.from(this._popupElement.querySelectorAll("input")).forEach((function(t) {
                      e[t.getAttribute("name")] = t.value
                  })), e
              }
          }, {
              key: "_setEventListeners",
              value: function() {
                  var e = this;
                  c(p(i.prototype), "_setEventListeners", this).call(this), this._errorElement = this._popupElement.querySelector(".popup__form-error"), this._form = this._popupElement.querySelector("form"), this._formHandler = function(t) {
                      e._formSubmitHandler(t, e._getInputValues())
                  }, this._form.addEventListener("submit", this._formHandler)
              }
          }, {
              key: "_removeEventListeners",
              value: function() {
                  c(p(i.prototype), "_removeEventListeners", this).call(this), this._form.removeEventListener("submit", this._formHandler)
              }
          }, {
              key: "showError",
              value: function(e) {
                  this._errorElement.textContent = e, this._errorElement.classList.add("popup__form-error_display_visible")
              }
          }, {
              key: "hideError",
              value: function() {
                  this._errorElement.textContent = "", this._errorElement.classList.remove("popup__form-error_display_visible")
              }
          }]) && s(t.prototype, n), r && s(t, r), i
      }(a),
      d = {
          inputSelector: ".popup__input",
          submitButtonSelector: ".popup__save",
          inactiveButtonClass: "popup__save_display_error",
          inputErrorClass: "popup__input_display_error",
          errorClass: "popup__input-error_display_show"
      };

  function m(e, t) {
      for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
      }
  }
  var y = function() {
      function e(t, n, r, o, i, a) {
          ! function(e, t) {
              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
          }(this, e), this._name = t.name, this._link = t.link, this._cardSelector = r, this._handleCardClick = o, this._likeConunt = t.likes.length, this._cardId = t._id, this._likeRenderer = i, this._likes = t.likes, this._cardOwner = t.owner._id, this._deleteRenderer = a, this._userId = n
      }
      var t, n, r;
      return t = e, (n = [{
          key: "_setAttributes",
          value: function() {
              var e = this;
              this._templateElement = document.querySelector(this._cardSelector).content.cloneNode(!0), this._element = this._templateElement.firstElementChild, this._cardImage = this._templateElement.querySelector(".card__image"), this._cardTitle = this._templateElement.querySelector(".card__title"), this._cardLike = this._templateElement.querySelector(".card__like"), this._cardLikeCount = this._templateElement.querySelector(".card__like-count"), this._cardDelete = this._templateElement.querySelector(".card__delete"), this._cardImage.src = this._link, this._cardTitle.textContent = this._name, this._cardImage.alt = this._name, this._cardLikeCount.textContent = this._likeConunt, this._likes.some((function(t) {
                  return t._id === e._userId
              })) && this._cardLike.classList.add("card__like_mode_active"), this._cardOwner !== this._userId && this._cardDelete.remove()
          }
      }, {
          key: "_openCard",
          value: function() {
              this._handleCardClick(this._link, this._name)
          }
      }, {
          key: "updateLikes",
          value: function(e, t) {
              this._cardLikeCount.textContent = e, this._cardLike.classList.toggle("card__like_mode_active"), this._likes = t
          }
      }, {
          key: "deleteElement",
          value: function() {
              this._element.remove()
          }
      }, {
          key: "getId",
          value: function() {
              return this._cardId
          }
      }, {
          key: "_setEventListeners",
          value: function() {
              var e = this;
              this._cardImage.addEventListener("click", (function() {
                  e._openCard()
              })), this._cardLike.addEventListener("click", (function() {
                  e._likeRenderer(e)
              })), this._cardDelete && this._cardDelete.addEventListener("click", (function() {
                  e._deleteRenderer(e)
              }))
          }
      }, {
          key: "_generateCard",
          value: function() {
              this._setAttributes(), this._setEventListeners()
          }
      }, {
          key: "getCard",
          value: function() {
              return this._generateCard(), this._templateElement
          }
      }]) && m(t.prototype, n), r && m(t, r), e
  }();

  function v(e, t) {
      for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
      }
  }
  var b = function() {
      function e(t, n) {
          var r = t.items,
              o = t.renderer;
          ! function(e, t) {
              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
          }(this, e), this._items = r, this._renderer = o, this._containerSelector = n, this._container = document.querySelector(this._containerSelector)
      }
      var t, n, r;
      return t = e, (n = [{
          key: "addItem",
          value: function(e) {
              this._container.prepend(e)
          }
      }, {
          key: "addInitialItem",
          value: function(e) {
              this._container.append(e)
          }
      }, {
          key: "renderItems",
          value: function() {
              var e = this;
              this._items.forEach((function(t) {
                  e._renderer(t)
              }))
          }
      }]) && v(t.prototype, n), r && v(t, r), e
  }();

  function E(e, t) {
      for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
      }
  }
  var k = function() {
      function e(t) {
          var n = t.nameSelector,
              r = t.jobSelector,
              o = t.avatarSelector;
          ! function(e, t) {
              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
          }(this, e), this._nameElement = document.querySelector(n), this._jobElement = document.querySelector(r), this._avatarElement = document.querySelector(o)
      }
      var t, n, r;
      return t = e, (n = [{
          key: "getUserInfo",
          value: function() {
              return {
                  name: this._nameElement.textContent,
                  job: this._jobElement.textContent
              }
          }
      }, {
          key: "setUserInfo",
          value: function(e) {
              var t = e.name,
                  n = e.job;
              this._nameElement.textContent = t, this._jobElement.textContent = n
          }
      }, {
          key: "setUserAvatar",
          value: function(e) {
              this._avatarElement.src = e
          }
      }]) && E(t.prototype, n), r && E(t, r), e
  }();

  function g(e) {
      return (g = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      })(e)
  }

  function S(e, t) {
      for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
      }
  }

  function C(e, t, n) {
      return (C = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, n) {
          var r = function(e, t) {
              for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = j(e)););
              return e
          }(e, t);
          if (r) {
              var o = Object.getOwnPropertyDescriptor(r, t);
              return o.get ? o.get.call(n) : o.value
          }
      })(e, t, n || e)
  }

  function w(e, t) {
      return (w = Object.setPrototypeOf || function(e, t) {
          return e.__proto__ = t, e
      })(e, t)
  }

  function L(e) {
      var t = function() {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
              return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))), !0
          } catch (e) {
              return !1
          }
      }();
      return function() {
          var n, r = j(e);
          if (t) {
              var o = j(this).constructor;
              n = Reflect.construct(r, arguments, o)
          } else n = r.apply(this, arguments);
          return O(this, n)
      }
  }

  function O(e, t) {
      return !t || "object" !== g(t) && "function" != typeof t ? function(e) {
          if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e
      }(e) : t
  }

  function j(e) {
      return (j = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
          return e.__proto__ || Object.getPrototypeOf(e)
      })(e)
  }
  var I = function(e) {
      ! function(e, t) {
          if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, {
              constructor: {
                  value: e,
                  writable: !0,
                  configurable: !0
              }
          }), t && w(e, t)
      }(i, e);
      var t, n, r, o = L(i);

      function i(e) {
          var t;
          return function(e, t) {
              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
          }(this, i), (t = o.call(this, e))._popupImage = t._popupElement.querySelector(".popup__image"), t._popupTitle = t._popupElement.querySelector(".popup__image-title"), t
      }
      return t = i, (n = [{
          key: "open",
          value: function(e, t) {
              this._popupImage.src = e, this._popupTitle.textContent = t, this._popupImage.alt = t, C(j(i.prototype), "open", this).call(this)
          }
      }]) && S(t.prototype, n), r && S(t, r), i
  }(a);

  function P(e) {
      return (P = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      })(e)
  }

  function x(e, t) {
      for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
      }
  }

  function q(e, t) {
      return (q = Object.setPrototypeOf || function(e, t) {
          return e.__proto__ = t, e
      })(e, t)
  }

  function R(e) {
      var t = function() {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
              return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))), !0
          } catch (e) {
              return !1
          }
      }();
      return function() {
          var n, r = T(e);
          if (t) {
              var o = T(this).constructor;
              n = Reflect.construct(r, arguments, o)
          } else n = r.apply(this, arguments);
          return U(this, n)
      }
  }

  function U(e, t) {
      return !t || "object" !== P(t) && "function" != typeof t ? function(e) {
          if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e
      }(e) : t
  }

  function T(e) {
      return (T = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
          return e.__proto__ || Object.getPrototypeOf(e)
      })(e)
  }
  var D = function(e) {
      ! function(e, t) {
          if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(t && t.prototype, {
              constructor: {
                  value: e,
                  writable: !0,
                  configurable: !0
              }
          }), t && q(e, t)
      }(i, e);
      var t, n, r, o = R(i);

      function i(e, t) {
          return function(e, t) {
              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
          }(this, i), o.call(this, e, t)
      }
      return t = i, (n = [{
          key: "setItem",
          value: function(e) {
              this._item = e, this._itemId = e.getId()
          }
      }]) && x(t.prototype, n), r && x(t, r), i
  }(_);

  function A(e, t) {
      for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
      }
  }
  var H, B, V = function() {
          function e(t) {
              var n = t.baseUrl,
                  r = t.headers;
              ! function(e, t) {
                  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
              }(this, e), this._baseUrl = n, this._headers = r, this._defaultCheck = function(e) {
                  return e.ok ? e.json() : Promise.reject("Ошибка: ".concat(e.status))
              }
          }
          var t, n, r;
          return t = e, (n = [{
              key: "getInitialCards",
              value: function() {
                  return fetch("".concat(this._baseUrl, "/cards"), {
                      headers: this._headers
                  }).then(this._defaultCheck)
              }
          }, {
              key: "getUserInformation",
              value: function() {
                  return fetch("".concat(this._baseUrl, "/users/me"), {
                      headers: this._headers
                  }).then(this._defaultCheck)
              }
          }, {
              key: "setLike",
              value: function(e) {
                  return fetch("".concat(this._baseUrl, "/cards/likes/").concat(e), {
                      method: "PUT",
                      headers: this._headers
                  }).then(this._defaultCheck)
              }
          }, {
              key: "deleteLike",
              value: function(e) {
                  return fetch("".concat(this._baseUrl, "/cards/likes/").concat(e), {
                      method: "DELETE",
                      headers: this._headers
                  }).then(this._defaultCheck)
              }
          }, {
              key: "setUserInfo",
              value: function(e) {
                  return fetch("".concat(this._baseUrl, "/users/me"), {
                      method: "PATCH",
                      headers: this._headers,
                      body: JSON.stringify(e)
                  }).then(this._defaultCheck)
              }
          }, {
              key: "setUserAvatar",
              value: function(e) {
                  return fetch("".concat(this._baseUrl, "/users/me/avatar"), {
                      method: "PATCH",
                      headers: this._headers,
                      body: JSON.stringify(e)
                  }).then(this._defaultCheck)
              }
          }, {
              key: "createCard",
              value: function(e) {
                  return fetch("".concat(this._baseUrl, "/cards"), {
                      method: "POST",
                      headers: this._headers,
                      body: JSON.stringify(e)
                  }).then(this._defaultCheck)
              }
          }, {
              key: "deleteCard",
              value: function(e) {
                  return fetch("".concat(this._baseUrl, "/cards/").concat(e), {
                      method: "DELETE",
                      headers: this._headers
                  }).then(this._defaultCheck)
              }
          }]) && A(t.prototype, n), r && A(t, r), e
      }(),
      M = new I(".popup_target_img"),
      N = new V({
          baseUrl: "https://mesto.nomoreparties.co/v1/cohort-12",
          headers: {
              authorization: "10d0cab2-3de3-42ea-80c8-2e15574d2bdb",
              "Content-Type": "application/json"
          }
      }),
      J = document.forms.add,
      z = document.forms.edit,
      F = document.forms.avatar,
      G = document.querySelector('input[name="forename"]'),
      K = document.querySelector('input[name="job"]'),
      Q = new k({
          nameSelector: ".profile__name",
          jobSelector: ".profile__subtitle",
          avatarSelector: ".profile__avatar"
      }),
      W = function(e) {
          return new y(e, H, "#card", (function(e, t) {
              M.open(e, t)
          }), (function(e) {
              var t = this,
                  n = e.getId();
              return (this._likes.some((function(e) {
                  return e._id === t._userId
              })) ? N.deleteLike(n) : N.setLike(n)).then((function(t) {
                  e.updateLikes(t.likes.length, t.likes)
              })).catch((function(e) {
                  console.log(e)
              }))
          }), (function(e) {
              $.setItem(e), $.open()
          })).getCard()
      },
      X = new _(".popup_target_add", (function(e, t) {
          var n = this;
          e.preventDefault(), this._buttonElement = this._popupElement.querySelector(".popup__save"), this._buttonElement.textContent = "Создание...";
          var r = t.title,
              o = t.url,
              i = document.createElement("img");
          i.src = o, i.onload = function() {
              N.createCard({
                  name: r,
                  link: o
              }).then((function(e) {
                  B.addItem(W(e)), n.close()
              })).catch((function(e) {
                  e.toString().includes("Ошибка:", 0) ? n.showError(e) : n.showError("Невозможно загрузить карточку, попробуйте снова")
              })).finally((function() {
                  n._buttonElement.textContent = "Создать"
              }))
          }, i.onerror = function() {
              n.showError("Невозможно загрузить ваше изображение, попробуйте снова"), n._buttonElement.textContent = "Создать"
          }
      })),
      Y = new _(".popup_target_edit", (function(e, t) {
          var n = this;
          e.preventDefault(), this._buttonElement = this._popupElement.querySelector(".popup__save"), this._buttonElement.textContent = "Сохранение...", N.setUserInfo({
              name: t.forename,
              about: t.job
          }).then((function(e) {
              Q.setUserInfo({
                  name: e.name,
                  job: e.about
              }), n.close()
          })).catch((function(e) {
              e.toString().includes("Ошибка:", 0) ? n.showError(e) : n.showError("Невозможно загрузить данные, попробуйте снова")
          })).finally((function() {
              n._buttonElement.textContent = "Сохранить"
          }))
      })),
      Z = new _(".popup_target_avatar", (function(e, t) {
          var n = this;
          e.preventDefault(), this._buttonElement = this._popupElement.querySelector(".popup__save"), this._buttonElement.textContent = "Сохранение...", N.setUserAvatar({
              avatar: t.avatar
          }).then((function(e) {
              if (e.errors) return Promise.reject("Ошибка: невозможно загрузить данные, ".concat(e.errors.avatar.message, ", попробуйте снова"));
              Q.setUserAvatar(e.avatar), n.close()
          })).catch((function(e) {
              e.toString().includes("Ошибка:", 0) ? n.showError(e) : n.showError("Невозможно загрузить данные, попробуйте снова")
          })).finally((function() {
              n._buttonElement.textContent = "Сохранить"
          }))
      })),
      $ = new D(".popup_target_delete", (function(e) {
          var t = this;
          e.preventDefault(), this._buttonElement = this._popupElement.querySelector(".popup__save"), this._buttonElement.textContent = "Удаление...", N.deleteCard(this._itemId).then((function() {
              t._item.deleteElement(), t.close()
          })).catch((function(e) {
              e.toString().includes("Ошибка:", 0) ? t.showError(e) : t.showError("Невозможно удалить карточку, попробуйте снова")
          })).finally((function() {
              t._buttonElement.textContent = "Да"
          }))
      })),
      ee = document.querySelector(".profile__edit-button"),
      te = document.querySelector(".profile__add-button"),
      ne = document.querySelector(".profile__avatar-overlay"),
      re = new o(d, J),
      oe = new o(d, z),
      ie = new o(d, F);
  Promise.all([N.getInitialCards(), N.getUserInformation()]).then((function(e) {
      var t;
      t = e[1], Q.setUserInfo({
              name: t.name,
              job: t.about
          }), Q.setUserAvatar(t.avatar), H = t._id,
          function(e) {
              (B = new b({
                  items: e,
                  renderer: function(e) {
                      var t = W(e);
                      this.addInitialItem(t)
                  }
              }, ".card__container")).renderItems()
          }(e[0])
  })).catch((function(e) {
      e.toString().includes("Ошибка:", 0) ? console.log(e) : console.log("Не удалось загрузить карточки")
  })), oe.enableValidation(), re.enableValidation(), ie.enableValidation(), ee.addEventListener("click", (function() {
      var e = Q.getUserInfo();
      oe.setDefault(!0), Y.open(), G.value = e.name, K.value = e.job
  })), te.addEventListener("click", (function() {
      re.setDefault(!1), X.open()
  })), ne.addEventListener("click", (function() {
      ie.setDefault(!1), Z.open()
  }))
}]);
