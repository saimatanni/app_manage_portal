import Cookies from 'js-cookie';

const CookieService = (function () {
  function _getCookie(key) {
    return Cookies.get(key);
  }

  function _setCookie(key, value, options) {
    Cookies.set(key, value, options);
  }

  function _removeCookie(key) {
    Cookies.remove(key);
  }

  return {
    getCookie: _getCookie,
    setCookie: _setCookie,
    removeCookie: _removeCookie,
  };
})();

export default CookieService;
