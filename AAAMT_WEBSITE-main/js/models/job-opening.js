/**
 * Job models:
 * - JobOpening  → GetActiveJobOpenings list row
 * - JobDetail   → GetJobById payload (whyThisRoleExists, whatYouWillOwn, …)
 */
(function (global) {
  function slug(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
  }

  function JobOpening(raw) {
    raw = raw || {};
    this.jobOpeningId = raw.jobOpeningId;
    this.jobCode = raw.jobCode || "";
    this.jobTitle = raw.jobTitle || "";
    this.employmentTypeId = raw.employmentTypeId;
    this.employmentTypeName = raw.employmentTypeName || "";
    this.functionName = raw.functionName || "";
    this.location = raw.location || "";
    this.tagline = raw.tagline || "";
    this.workModeId = raw.workModeId;
    this.workModeName = raw.workModeName || "";

    this.functionSlug = slug(this.functionName);
    this.employmentTypeSlug = slug(this.employmentTypeName);
    this.locationSlug = slug(this.location);
  }

  JobOpening.fromList = function (rows) {
    return (Array.isArray(rows) ? rows : []).map(function (row) {
      return new JobOpening(row);
    });
  };

  // API keys are camelCase with no spaces, e.g. whyThisRoleExists
  function pick(raw, keys) {
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (raw[key] != null && String(raw[key]).trim() !== "") return raw[key];
    }
    return "";
  }

  function JobDetail(raw) {
    raw = raw || {};
    this.jobId = raw.jobId;
    this.teamId = raw.teamId;
    this.teamName = raw.teamName || "";
    this.roleName = raw.roleName || "";
    this.employmentTypeId = raw.employmentTypeId;
    this.employmentTypeName = raw.employmentTypeName || "";
    this.workModeId = raw.workModeId;
    this.workModeName = raw.workModeName || "";
    this.location = raw.location || "";
    this.tagline = raw.tagline || "";
    this.whyThisRoleExists = pick(raw, ["whyThisRoleExists"]);
    this.whatYouWillOwn = pick(raw, ["whatYouWillOwn"]);
    this.whatYouBring = pick(raw, ["whatYouBring"]);
    this.usefulNotEssential = pick(raw, ["usefulNotEssential"]);
    this.whatYouWillLearn = pick(raw, ["whatYouWillLearn"]);
    this.questions = Array.isArray(raw.questions) ? raw.questions : [];
  }

  JobDetail.fromResponse = function (body) {
    if (!body || !body.data) return null;
    return new JobDetail(body.data);
  };

  global.JobOpening = JobOpening;
  global.JobDetail = JobDetail;
})(window);
