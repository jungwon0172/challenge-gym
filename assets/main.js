// ---------- 쿠키 동의 배너 ----------
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

  if (!getStored()) {
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

// ---------- 챌린지 목록 필터 / 정렬 ----------
(function () {
  var grid = document.getElementById("challenge-grid");
  if (!grid) return;

  var filterBtns = document.querySelectorAll(".filter-btn");
  var sortSelect = document.getElementById("sort-select");
  var emptyMsg = document.getElementById("filter-empty");
  var currentGenre = "all";

  function applyFilterAndSort() {
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".challenge-card"));

    // 정렬 (날짜 기준)
    var sortValue = sortSelect ? sortSelect.value : "newest";
    cards.sort(function (a, b) {
      var da = a.getAttribute("data-date") || "";
      var db = b.getAttribute("data-date") || "";
      if (da === db) return 0;
      if (sortValue === "oldest") {
        return da < db ? -1 : 1;
      }
      return da > db ? -1 : 1;
    });
    cards.forEach(function (card) {
      grid.appendChild(card);
    });

    // 필터 (장르 기준)
    var visibleCount = 0;
    cards.forEach(function (card) {
      var genre = card.getAttribute("data-genre");
      var show = currentGenre === "all" || genre === currentGenre;
      card.style.display = show ? "" : "none";
      if (show) visibleCount++;
    });

    if (emptyMsg) {
      emptyMsg.hidden = visibleCount !== 0;
    }
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      currentGenre = btn.getAttribute("data-filter-genre");
      applyFilterAndSort();
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener("change", applyFilterAndSort);
  }

  applyFilterAndSort();
})();
