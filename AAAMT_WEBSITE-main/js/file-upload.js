/**
 * Upload resume/CV via POST /api/File/UploadFilesAsync
 * Query: ProjectName=HR&ProdcutId=1&CustomerId=0
 * Response: [{ fileId, name }]
 *
 * Allowed: PDF or DOCX only, max 5 MB.
 */
(function (global) {
  var MAX_RESUME_BYTES = 5 * 1024 * 1024;
  var ALLOWED_EXT = /\.(pdf|docx)$/i;
  var ALLOWED_MIME = {
    "application/pdf": true,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": true,
  };

  function isAllowedResumeFile(file) {
    if (!file || !file.name) return false;
    var nameOk = ALLOWED_EXT.test(file.name);
    var type = String(file.type || "").toLowerCase();
    // Empty MIME is common on some browsers — rely on extension then.
    var typeOk = !type || ALLOWED_MIME[type];
    return nameOk && typeOk;
  }

  function validateResumeFile(file) {
    if (!file) {
      return { ok: false, message: "Please upload your resume (PDF or DOCX, max 5 MB)." };
    }
    if (!isAllowedResumeFile(file)) {
      return { ok: false, message: "Resume must be a PDF or DOCX file." };
    }
    if (file.size > MAX_RESUME_BYTES) {
      return { ok: false, message: "Resume must be 5 MB or smaller." };
    }
    return { ok: true, message: "" };
  }

  function uploadFiles(fileOrFiles) {
    if (!global.AAAMT_API || !global.AAAMT_API.endpoints) {
      return Promise.reject(new Error("AAAMT_API is not configured"));
    }
    var files = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles];
    files = files.filter(Boolean);
    if (!files.length) return Promise.reject(new Error("No file selected"));

    for (var i = 0; i < files.length; i++) {
      var check = validateResumeFile(files[i]);
      if (!check.ok) return Promise.reject(new Error(check.message));
    }

    var formData = new FormData();
    files.forEach(function (file) {
      formData.append("files", file, file.name);
    });

    var url = global.AAAMT_API.url(global.AAAMT_API.endpoints.uploadFiles);
    var headers =
      typeof global.AAAMT_API.fileUploadHeaders === "function"
        ? global.AAAMT_API.fileUploadHeaders()
        : { Accept: "application/json" };
    return fetch(url, {
      method: "POST",
      headers: headers,
      body: formData,
    }).then(function (response) {
      return response
        .json()
        .then(function (body) {
          return { ok: response.ok, status: response.status, body: body };
        })
        .catch(function () {
          return { ok: response.ok, status: response.status, body: null };
        });
    }).then(function (result) {
      if (!result.ok) {
        var message =
          (result.body && (result.body.message || result.body.title)) ||
          "Upload failed (" + result.status + ")";
        throw new Error(message);
      }
      var list = Array.isArray(result.body)
        ? result.body
        : result.body && Array.isArray(result.body.data)
          ? result.body.data
          : [];
      if (!list.length || !list[0] || !list[0].fileId) {
        throw new Error("Upload succeeded but no fileId was returned");
      }
      return {
        fileId: String(list[0].fileId),
        name: String(list[0].name || files[0].name || ""),
        originalName: files[0].name || "",
        raw: list[0],
      };
    });
  }

  global.AAAMTFileUpload = {
    uploadFiles: uploadFiles,
    validateResumeFile: validateResumeFile,
    isAllowedResumeFile: isAllowedResumeFile,
    MAX_RESUME_BYTES: MAX_RESUME_BYTES,
  };
})(window);
