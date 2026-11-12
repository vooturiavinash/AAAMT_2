/**
 * JobDetail model — payload from GetWebsiteJobOpeningById (public careers detail).
 * API fields (no spaces): whyThisRoleExists, whatYouWillOwn, whatYouBring,
 * usefulNotEssential, whatYouWillLearn.
 */
(function (global) {
  function pick(raw, keys) {
    for (var i = 0; i < keys.length; i++) {
      var v = raw[keys[i]];
      if (v != null && String(v).trim() !== "") return v;
    }
    return "";
  }

  function JobDetail(raw) {
    raw = raw || {};
    this.jobOpeningId =
      raw.jobOpeningId != null ? raw.jobOpeningId : raw.jobId != null ? raw.jobId : null;
    this.jobId = raw.jobId != null ? raw.jobId : this.jobOpeningId;
    this.teamId = raw.teamId;
    this.teamName = pick(raw, ["teamName", "TeamName", "functionName", "FunctionName"]);
    this.functionName = this.teamName;
    this.roleName = pick(raw, ["roleName", "RoleName", "jobTitle", "JobTitle"]);
    this.jobTitle = this.roleName;
    this.employmentTypeId = raw.employmentTypeId;
    this.employmentTypeName = pick(raw, ["employmentTypeName", "EmploymentTypeName"]);
    this.workModeId = raw.workModeId;
    this.workModeName = pick(raw, ["workModeName", "WorkModeName"]);
    this.location = pick(raw, ["location", "Location"]);
    this.tagline = pick(raw, ["tagline", "Tagline"]);
    this.projectUrl = pick(raw, ["projectUrl", "ProjectUrl"]);
    this.submissionDeadlineDays = raw.submissionDeadlineDays;
    this.questions = Array.isArray(raw.questions) ? raw.questions : [];

    this.whyThisRoleExists = pick(raw, ["whyThisRoleExists", "WhyThisRoleExists"]);
    this.whatYouWillOwn = pick(raw, ["whatYouWillOwn", "WhatYouWillOwn"]);
    this.whatYouBring = pick(raw, ["whatYouBring", "WhatYouBring"]);
    this.usefulNotEssential = pick(raw, ["usefulNotEssential", "UsefulNotEssential"]);
    this.whatYouWillLearn = pick(raw, ["whatYouWillLearn", "WhatYouWillLearn"]);
  }

  JobDetail.fromResponse = function (body) {
    if (!body || body.success !== true || !body.data) {
      throw new Error((body && body.message) || "Could not load job details");
    }
    return new JobDetail(body.data);
  };

  global.JobDetail = JobDetail;
})(window);
