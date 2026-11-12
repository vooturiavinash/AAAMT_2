/**
 * Site API base URL + endpoints (browser calls baseUrl + endpoint directly).
 *
 *   local / dev → https://devcosapi.xmtopper.com
 *   live        → https://api.clearwu.com
 *
 * Exception (not using this base): Contact enquiry uses
 *   local → https://devcommunication.aaamt.in/api/Email/demo-survey
 *   live  → https://communication.aaamt.in/api/Email/demo-survey
 */
(function (global) {
  var BASE_URLS = {
    dev: "https://devcosapi.xmtopper.com",
    live: "https://api.clearwu.com",
  };

  var ENDPOINTS = {
    getActiveJobOpenings: "/api/HR/GetActiveJobOpenings",
    // Public careers detail (no auth). Prefer this over GetJobById for the website.
    getJobById: "/api/HR/GetWebsiteJobOpeningById",
    saveApplication: "/api/HR/SaveApplication",
    // API query uses the misspelled ProdcutId key
    uploadFiles:
      "/api/File/UploadFilesAsync?ProjectName=HR&ProdcutId=1&CustomerId=0",
  };

  // Dev HR Bearer token (GetJobById, UploadFilesAsync, etc.). Short-lived — refresh when 401.
  var HR_TOKENS = {
    dev: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNyIsImp0aSI6ImE0MDBmYTcyLWY2ZWItNDRiZi05YTY2LWZhNTdjNTYwZjY5NiIsIlVzZXJJZCI6IjE3IiwiVXNlclR5cGVJZCI6IjQiLCJVc2VyQ29kZSI6IkRFVjAxNyIsIkRlc2lnbmF0aW9uIjoiIiwiVGVhbUlkIjoiNCIsIm5iZiI6MTc5NDM4NTU1OCwiZXhwIjoxNzk0NDE0MzU4LCJpc3MiOiJodHRwczovL2RldmNvc2FwaS54bXRvcHBlci5jb20iLCJhdWQiOiJodHRwczovL2RldmNvc2FwaS54bXRvcHBlci5jb20ifQ.QszVYXb3XtjLLrHecnylknF1Fty2mpl1t3XwliB9gPE",
    live: "",
  };

  function detectEnv() {
    if (typeof global.AAAMT_APP_ENV === "string" && global.AAAMT_APP_ENV.trim()) {
      var forced = global.AAAMT_APP_ENV.trim().toLowerCase();
      if (forced === "live" || forced === "prod" || forced === "production") return "live";
      return "dev";
    }
    var host = String((global.location && global.location.hostname) || "").toLowerCase();
    if (!host || host === "localhost" || host === "127.0.0.1" || host === "::1") return "dev";
    return "live";
  }

  var env = detectEnv();
  var baseUrl = String(BASE_URLS[env] || "").replace(/\/$/, "");
  var hrToken = String(HR_TOKENS[env] || "");
  var host = String((global.location && global.location.hostname) || "").toLowerCase();
  var isLocalHost =
    !host || host === "localhost" || host === "127.0.0.1" || host === "::1";

  function authHeaders(extra) {
    var headers = { Accept: "application/json" };
    if (hrToken) headers.Authorization = "Bearer " + hrToken;
    if (extra && typeof extra === "object") {
      Object.keys(extra).forEach(function (key) {
        headers[key] = extra[key];
      });
    }
    return headers;
  }

  global.AAAMT_API = {
    env: env,
    baseUrl: baseUrl,
    endpoints: ENDPOINTS,
    fileSyncToken: hrToken,
    hrToken: hrToken,
    url: function (endpoint) {
      var path = String(endpoint || "");
      if (!path) return baseUrl || "";
      if (/^https?:\/\//i.test(path)) return path;
      if (path.charAt(0) !== "/") path = "/" + path;
      // Local serve.js proxies /api/HR/* (avoids CORS while developing)
      if (isLocalHost && path.indexOf("/api/HR/") === 0) return path;
      if (!baseUrl) return path;
      return baseUrl + path;
    },
    authHeaders: authHeaders,
    fileUploadHeaders: function () {
      return authHeaders();
    },
  };
})(window);
