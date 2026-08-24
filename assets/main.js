(function () {
  var KEY = "cg_cookie_consent";
  var banner = document.getElementById("cookie-banner");
  if (!banner) return;

  function getStored() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  function setStored(value) {
    try {
      localStorage.setItem(KEY, value);
    } catch (e) {
      /* localStorage unavailable, ignore */
    }
  }

  var existing = getStored();
  if (!existing) {
    banner.hidden = false;
  }

  var acceptBtn = document.getElementById("cookie-accept");
  var declineBtn = document.getElementById("cookie-decline");

  if (acceptBtn) {
    acceptBtn.addEventListener("click", function () {
      setStored("accepted");
      banner.hidden = true;
    });
  }
  if (declineBtn) {
    declineBtn.addEventListener("click", function () {
      setStored("declined");
      banner.hidden = true;
    });
  }
})();
