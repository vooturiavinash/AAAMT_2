/**
 * Shared helpers for View Role + application pages.
 * Job detail content comes from GetJobById.
 */
(function (global) {
  var STORE_KEY = "aaamtApply";

  var DEFAULT_ROLE = {
    jobOpeningId: null,
    jobTitle: "Product Designer",
    functionName: "Product",
    location: "Hyderabad",
    employmentTypeName: "Full-time",
    workModeName: "On-site",
    tagline: "Turn complex work into clear product experiences",
    whyThisRoleExists: "",
    whatYouWillOwn: "",
    whatYouBring: "",
    usefulNotEssential: "",
    whatYouWillLearn: "",
    questions: [],
  };

  function qs(name) {
    try {
      return new URLSearchParams(global.location.search).get(name);
    } catch (_) {
      return null;
    }
  }

  function readStore() {
    try {
      return JSON.parse(sessionStorage.getItem(STORE_KEY) || "{}") || {};
    } catch (_) {
      return {};
    }
  }

  function writeStore(next) {
    sessionStorage.setItem(STORE_KEY, JSON.stringify(next || {}));
  }

  function getRole() {
    var store = readStore();
    return Object.assign({}, DEFAULT_ROLE, store.role || {});
  }

  function setRole(role) {
    var store = readStore();
    store.role = Object.assign({}, DEFAULT_ROLE, role || {});
    writeStore(store);
  }

  function getStep(step) {
    var store = readStore();
    return (store.steps && store.steps[step]) || {};
  }

  function setStep(step, data) {
    var store = readStore();
    store.steps = store.steps || {};
    store.steps[step] = Object.assign({}, store.steps[step] || {}, data || {});
    writeStore(store);
  }

  function clearApplication() {
    sessionStorage.removeItem(STORE_KEY);
  }

  function roleMeta(role) {
    role = role || getRole();
    return [role.workModeName, role.location, role.employmentTypeName]
      .filter(Boolean)
      .join(" · ");
  }

  function appMeta(role) {
    role = role || getRole();
    return [role.functionName, role.location, role.employmentTypeName]
      .filter(Boolean)
      .join(" · ");
  }

  function fillRoleTexts(root) {
    root = root || document;
    var role = getRole();
    var title = role.jobTitle || role.roleName || "";
    var team = role.functionName || role.teamName || "";
    root.querySelectorAll("[data-role-title]").forEach(function (el) {
      el.textContent = title || "Role";
    });
    root.querySelectorAll("[data-role-badge]").forEach(function (el) {
      el.textContent = team || title || "Role";
    });
    root.querySelectorAll("[data-role-meta]").forEach(function (el) {
      el.textContent = roleMeta(role);
    });
    root.querySelectorAll("[data-role-app-meta]").forEach(function (el) {
      el.textContent = appMeta(role);
    });
    root.querySelectorAll("[data-role-tagline]").forEach(function (el) {
      el.textContent = role.tagline || "";
    });
    // Sidebar first row = role title (suitcase icon)
    root.querySelectorAll("[data-role-function]").forEach(function (el) {
      el.textContent = title || team || "";
    });
    root.querySelectorAll("[data-role-location]").forEach(function (el) {
      el.textContent = role.location || "";
    });
    root.querySelectorAll("[data-role-type]").forEach(function (el) {
      el.textContent = role.employmentTypeName || "";
    });
    document.title = (title || "Role") + " | AAAMT Careers";
  }

  /** Render API HTML into a section body (supports p / ul / ol / li). */
  function fillHtmlSection(selector, html) {
    var el = document.querySelector(selector);
    if (!el) return;
    var value = String(html || "").trim();
    if (!value) {
      el.innerHTML = "<p>Details will be shared soon.</p>";
      return;
    }
    el.innerHTML = value;
  }

  function fillRoleSections(role) {
    role = role || getRole();
    fillHtmlSection("[data-field=\"whyThisRoleExists\"]", role.whyThisRoleExists);
    fillHtmlSection("[data-field=\"whatYouWillOwn\"]", role.whatYouWillOwn);
    fillHtmlSection("[data-field=\"whatYouBring\"]", role.whatYouBring);
    fillHtmlSection("[data-field=\"usefulNotEssential\"]", role.usefulNotEssential);
    fillHtmlSection("[data-field=\"whatYouWillLearn\"]", role.whatYouWillLearn);
  }

  function roleFromJobDetail(detail) {
    detail = detail || {};
    return {
      jobOpeningId:
        detail.jobOpeningId != null ? detail.jobOpeningId : detail.jobId,
      jobTitle: detail.jobTitle || detail.roleName || "",
      functionName: detail.functionName || detail.teamName || "",
      location: detail.location,
      employmentTypeName: detail.employmentTypeName,
      workModeName: detail.workModeName,
      tagline: detail.tagline,
      whyThisRoleExists: detail.whyThisRoleExists,
      whatYouWillOwn: detail.whatYouWillOwn,
      whatYouBring: detail.whatYouBring,
      usefulNotEssential: detail.usefulNotEssential,
      whatYouWillLearn: detail.whatYouWillLearn,
      questions: detail.questions,
    };
  }

  /**
   * Application steps (viewrole2–4) use session role from viewrole1.
   * Do not call GetJobById again — only refresh UI from store / query.
   */
  function loadRoleFromStore() {
    applyQueryFallback();
    fillRoleTexts();
    fillRoleSections();
    return Promise.resolve(getRole());
  }

  /** @deprecated use loadRoleFromStore on apply steps; GetJobById only on viewrole1 */
  function loadRoleFromApiIfNeeded() {
    return loadRoleFromStore();
  }

  function applyQueryFallback() {
    var id = qs("id");
    var title = qs("title");
    var fn = qs("function");
    var loc = qs("location");
    var type = qs("type");
    var mode = qs("mode");
    var tagline = qs("tagline");
    if (!id && !title) return;
    setRole(
      Object.assign({}, getRole(), {
        jobOpeningId: id || getRole().jobOpeningId,
        jobTitle: title || getRole().jobTitle,
        functionName: fn || getRole().functionName,
        location: loc || getRole().location,
        employmentTypeName: type || getRole().employmentTypeName,
        workModeName: mode || getRole().workModeName,
        tagline: tagline || getRole().tagline,
      })
    );
  }

  global.AAAMTViewRole = {
    qs: qs,
    getRole: getRole,
    setRole: setRole,
    getStep: getStep,
    setStep: setStep,
    clearApplication: clearApplication,
    fillRoleTexts: fillRoleTexts,
    fillRoleSections: fillRoleSections,
    loadRoleFromStore: loadRoleFromStore,
    loadRoleFromApiIfNeeded: loadRoleFromApiIfNeeded,
    roleFromJobDetail: roleFromJobDetail,
    roleMeta: roleMeta,
    appMeta: appMeta,
  };
})(window);
