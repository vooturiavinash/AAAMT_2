/**
 * API environment config — full URL = baseUrl + endpoint.
 *
 *   local / dev → https://devcosapi.xmtopper.com
 *   live        → (fill in after deploy)
 *
 * The HR API does not send CORS headers, so the browser cannot call
 * devcosapi.xmtopper.com directly. The page calls the same endpoint path on
 * its own origin (/api/HR/GetActiveJobOpenings) and serve.js forwards it to
 * baseUrl + endpoint. Set callDirect = true once the API enables CORS.
 */
(function (global) {
  var BASE_URLS = {
    dev: "https://devcosapi.xmtopper.com",
    live: "",
  };

  var ENDPOINTS = {
    getActiveJobOpenings: "/api/HR/GetActiveJobOpenings",
    getJobById: "/api/HR/GetJobById",
    saveApplication: "/api/HR/SaveApplication",
  };

  function detectEnv() {
    var host = String((global.location && global.location.hostname) || "").toLowerCase();
    if (!host || host === "localhost" || host === "127.0.0.1") return "dev";
    return "live";
  }

  var env = detectEnv();
  var baseUrl = BASE_URLS[env] || "";
  var callDirect = false;

  global.AAAMT_API = {
    env: env,
    baseUrl: baseUrl,
    endpoints: ENDPOINTS,
    url: function (endpoint) {
      return callDirect ? baseUrl + endpoint : endpoint;
    },
  };
})(window);
