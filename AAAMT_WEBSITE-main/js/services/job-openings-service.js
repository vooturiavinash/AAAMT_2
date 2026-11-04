/**
 * JobOpeningsService
 * - GET GetActiveJobOpenings
 * - GET GetJobById?jobId=
 */
(function (global) {
  function getJson(url) {
    return fetch(url, { method: "GET", headers: { Accept: "application/json" } }).then(
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

  function getJobById(jobId) {
    var endpoint =
      global.AAAMT_API.endpoints.getJobById +
      "?jobId=" +
      encodeURIComponent(String(jobId == null ? "" : jobId));
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
