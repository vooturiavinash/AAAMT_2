/**
 * Careers page — load openings from the API and render them.
 */
(function () {
  var list = document.getElementById("opening-list");
  var form = document.querySelector(".openings-filters");
  if (!list || !form) return;

  var jobs = [];

  function esc(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function tagClass(type) {
    var key = String(type || "").toLowerCase();
    if (key.indexOf("intern") !== -1) return "is-internship";
    if (key.indexOf("apprentice") !== -1) return "is-apprenticeship";
    return "is-fulltime";
  }

  function showStatus(text, isError) {
    list.innerHTML =
      '<p class="openings-status' + (isError ? " is-error" : "") + '">' + esc(text) + "</p>";
  }

  function emptyHtml() {
    return (
      '<div class="roles-empty" role="status">' +
        '<span class="roles-empty-icon" aria-hidden="true">' +
          '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<circle cx="10.5" cy="10.5" r="6.25" stroke="#475467" stroke-width="1.5"/>' +
            '<path d="m15.2 15.2 4.3 4.3" stroke="#475467" stroke-width="1.5" stroke-linecap="round"/>' +
            '<path d="m8.4 8.4 4.2 4.2M12.6 8.4 8.4 12.6" stroke="#475467" stroke-width="1.5" stroke-linecap="round"/>' +
          "</svg>" +
        "</span>" +
        '<p class="roles-empty-title">No roles match your search</p>' +
        '<p class="roles-empty-lede">Try adjusting your filters or explore our Talent Network for future opportunities.</p>' +
        '<a class="roles-empty-cta" href="#talent">Join Talent Network</a>' +
      "</div>"
    );
  }

  function showEmptyState() {
    list.innerHTML = emptyHtml();
  }

  function syncEmptyState() {
    var cards = list.querySelectorAll(".opening-card");
    var empty = list.querySelector(".roles-empty");
    if (!cards.length) {
      if (!empty) showEmptyState();
      return;
    }
    var visible = 0;
    cards.forEach(function (card) {
      if (!card.classList.contains("is-hidden")) visible += 1;
    });
    if (visible === 0) {
      if (!empty) list.insertAdjacentHTML("beforeend", emptyHtml());
    } else if (empty) {
      empty.remove();
    }
  }

  function cardHtml(job) {
    return (
      '<article class="opening-card" data-function="' + esc(job.functionSlug) +
      '" data-type="' + esc(job.employmentTypeSlug) +
      '" data-location="' + esc(job.locationSlug) + '">' +
        '<div class="opening-main">' +
          '<div class="opening-title-row">' +
            "<h4>" + esc(job.jobTitle) + "</h4>" +
            '<span class="opening-tag ' + tagClass(job.employmentTypeName) + '">' +
              esc(job.employmentTypeName) +
            "</span>" +
          "</div>" +
          '<p class="opening-meta">' + esc(job.functionName) + " · " + esc(job.location) + "</p>" +
          (job.tagline ? '<p class="opening-desc">' + esc(job.tagline) + "</p>" : "") +
        "</div>" +
        '<a class="opening-cta" href="/viewrole1?id=' + esc(job.jobOpeningId) +
          '&title=' + encodeURIComponent(job.jobTitle || "") +
          '&function=' + encodeURIComponent(job.functionName || "") +
          '&location=' + encodeURIComponent(job.location || "") +
          '&type=' + encodeURIComponent(job.employmentTypeName || "") +
          '&mode=' + encodeURIComponent(job.workModeName || "") +
          '&tagline=' + encodeURIComponent(job.tagline || "") +
          '">View Role ' +
          '<img src="assets/icons/arrow-orange.svg" alt="" width="24" height="24"></a>' +
      "</article>"
    );
  }

  function fillSelect(select, placeholder, items) {
    var seen = {};
    select.innerHTML = '<option value="">' + esc(placeholder) + "</option>";
    items.forEach(function (item) {
      if (!item.value || seen[item.value]) return;
      seen[item.value] = true;
      select.innerHTML += '<option value="' + esc(item.value) + '">' + esc(item.label) + "</option>";
    });
    if (typeof select._paint === "function") select._paint();
  }

  function fillFilters() {
    fillSelect(form.function, "Function", jobs.map(function (j) {
      return { value: j.functionSlug, label: j.functionName };
    }));
    fillSelect(form.type, "Employment Type", jobs.map(function (j) {
      return { value: j.employmentTypeSlug, label: j.employmentTypeName };
    }));
    fillSelect(form.location, "Location", jobs.map(function (j) {
      return { value: j.locationSlug, label: j.location };
    }));
  }

  function applyFilters() {
    var q = (form.q.value || "").trim().toLowerCase();
    var fn = form.function.value;
    var type = form.type.value;
    var loc = form.location.value;

    list.querySelectorAll(".opening-card").forEach(function (card) {
      var title = (card.querySelector("h4").textContent || "").toLowerCase();
      var show =
        (!q || title.indexOf(q) !== -1) &&
        (!fn || card.dataset.function === fn) &&
        (!type || card.dataset.type === type) &&
        (!loc || card.dataset.location === loc);
      card.classList.toggle("is-hidden", !show);
    });
    syncEmptyState();
  }

  function render() {
    if (!jobs.length) {
      showEmptyState();
      return;
    }
    list.innerHTML = jobs.map(cardHtml).join("");
    fillFilters();
    applyFilters();
  }

  // Custom dropdown UI for the three <select> filters.
  function enhanceSelect(field) {
    var select = field.querySelector("select");
    var trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "filter-trigger";
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.setAttribute("aria-expanded", "false");
    trigger.innerHTML =
      "<span></span>" +
      "<svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' aria-hidden='true'>" +
      "<path d='m6 9 6 6 6-6' stroke-linecap='round' stroke-linejoin='round'/></svg>";
    var label = trigger.querySelector("span");

    var menu = document.createElement("ul");
    menu.className = "filter-menu";
    menu.hidden = true;
    menu.setAttribute("role", "listbox");

    select.setAttribute("aria-hidden", "true");
    select.tabIndex = -1;

    function close() {
      field.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
      menu.hidden = true;
    }

    function paint() {
      var current = select.options[select.selectedIndex];
      label.textContent = current ? current.textContent : "";
      trigger.classList.toggle("is-placeholder", !select.value);
      menu.innerHTML = "";
      Array.prototype.forEach.call(select.options, function (option) {
        var li = document.createElement("li");
        var btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = option.textContent;
        btn.setAttribute("role", "option");
        if (option.value === select.value) btn.setAttribute("aria-selected", "true");
        btn.addEventListener("click", function () {
          select.value = option.value;
          select.dispatchEvent(new Event("change", { bubbles: true }));
          paint();
          close();
        });
        li.appendChild(btn);
        menu.appendChild(li);
      });
    }

    trigger.addEventListener("click", function () {
      var open = menu.hidden;
      document.querySelectorAll(".filter-select.is-open").forEach(function (other) {
        other.classList.remove("is-open");
        other.querySelector(".filter-menu").hidden = true;
        other.querySelector(".filter-trigger").setAttribute("aria-expanded", "false");
      });
      menu.hidden = !open;
      field.classList.toggle("is-open", open);
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
    });

    select._paint = paint;
    field.appendChild(trigger);
    field.appendChild(menu);
    paint();
  }

  document.querySelectorAll(".openings-filters .filter-select").forEach(enhanceSelect);

  document.addEventListener("click", function (event) {
    if (event.target.closest(".filter-select")) return;
    document.querySelectorAll(".filter-select.is-open").forEach(function (field) {
      field.classList.remove("is-open");
      field.querySelector(".filter-menu").hidden = true;
      field.querySelector(".filter-trigger").setAttribute("aria-expanded", "false");
    });
  });

  form.addEventListener("input", applyFilters);
  form.addEventListener("change", applyFilters);

  // Load from API
  showStatus("Loading open roles…", false);
  JobOpeningsService.getActiveJobOpenings()
    .then(function (result) {
      jobs = Array.isArray(result) ? result : [];
      render();
    })
    .catch(function () {
      // Keep the openings section looking designed when the API is down.
      jobs = [];
      showEmptyState();
    });
})();
