/**
 * JobOpeningsService
 * - GET GetActiveJobOpenings
 * - GET GetWebsiteJobOpeningById?jobOpeningId=  (public website detail)
 */
(function (global) {
  function publicHeaders() {
    return { Accept: "application/json" };
  }

  function getJson(url) {
    return fetch(url, { method: "GET", headers: publicHeaders() }).then(
      function (response) {
        if (!response.ok) throw new Error("Request failed (" + response.status + ")");
        return response.json();
      }
    );
  }

  function getActiveJobOpenings() {
    var url = global.AAAMT_API.url(global.AAAMT_API.endpoints.getActiveJobOpenings);
    return getJson(url).then(function (body) {
      if (!body || body.success !== true) {
        throw new Error((body && body.message) || "Could not load openings");
      }
      return global.JobOpening.fromList(body.data);
    });
  }

  function getJobById(jobOpeningId) {
    var endpoint =
      global.AAAMT_API.endpoints.getJobById +
      "?jobOpeningId=" +
      encodeURIComponent(String(jobOpeningId == null ? "" : jobOpeningId));
    var url = global.AAAMT_API.url(endpoint);
    return getJson(url).then(function (body) {
      if (!body || body.success !== true) {
        throw new Error((body && body.message) || "Could not load job");
      }
      var detail = global.JobDetail.fromResponse(body);
      if (!detail) throw new Error("Job data missing");
      return detail;
    });
  }

  global.JobOpeningsService = {
    getActiveJobOpenings: getActiveJobOpenings,
    getJobById: getJobById,
  };
})(window);
