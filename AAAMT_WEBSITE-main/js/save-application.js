/**
 * Shared POST /api/HR/SaveApplication helper.
 * Body must be a top-level array of SaveApplicationRequest.
 *
 * entryChannelId:
 *   1 = Job application (viewrole flow)
 *   2 = Talent pool (careers Stay Connected form)
 */
(function (global) {
  var RESUME_TYPE_PDF = 1;
  var RESUME_TYPE_DOCX = 2;

  function resumeTypeFromName(fileName) {
    var lower = String(fileName || "").toLowerCase();
    if (lower.endsWith(".docx")) return RESUME_TYPE_DOCX;
    return RESUME_TYPE_PDF;
  }

  function saveApplication(payload) {
    if (!global.AAAMT_API || !global.AAAMT_API.endpoints) {
      return Promise.reject(new Error("AAAMT_API is not configured"));
    }
    var list = Array.isArray(payload) ? payload : [payload];
    var url = global.AAAMT_API.url(global.AAAMT_API.endpoints.saveApplication);
    var headers =
      global.AAAMT_API && typeof global.AAAMT_API.authHeaders === "function"
        ? global.AAAMT_API.authHeaders({ "Content-Type": "application/json" })
        : {
            Accept: "application/json",
            "Content-Type": "application/json",
          };
    return fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(list),
    }).then(function (response) {
      return response
        .json()
        .then(function (body) {
          return { ok: response.ok, status: response.status, body: body };
        })
        .catch(function () {
          return { ok: response.ok, status: response.status, body: null };
        });
    });
  }

  function buildJobApplicationPayload(role, step1, step2) {
    role = role || {};
    step1 = step1 || {};
    step2 = step2 || {};
    var resumeFileName = step1.resumeFileName || step1.resumeName || "";
    var answers = Array.isArray(step2.answers) ? step2.answers : [];

    return {
      entryChannelId: 1,
      jobOpeningId: role.jobOpeningId != null ? Number(role.jobOpeningId) : null,
      firstName: String(step1.firstName || "").trim(),
      lastName: String(step1.lastName || "").trim(),
      email: String(step1.email || "").trim(),
      phoneNumber: String(step1.phone || "").trim(),
      candidateSourceId: Number(step1.candidateSourceId || 0) || null,
      currentLocation: String(step1.location || "").trim(),
      resumeType: resumeTypeFromName(resumeFileName || step1.resumeOriginalName || ""),
      resumeFileId: step1.resumeFileId || null,
      resumeFileName: resumeFileName,
      resumeUrl: step1.resumeUrl || null,
      linkedInUrl: String(step1.linkedin || "").trim(),
      portfolioUrl: String(step2.portfolio || "").trim() || null,
      answers: answers,
    };
  }

  global.AAAMTSaveApplication = {
    saveApplication: saveApplication,
    buildJobApplicationPayload: buildJobApplicationPayload,
    resumeTypeFromName: resumeTypeFromName,
    ENTRY_CHANNEL_JOB: 1,
    ENTRY_CHANNEL_TALENT_POOL: 2,
  };
})(window);
