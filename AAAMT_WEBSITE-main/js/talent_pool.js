/**
 * Careers Talent Network — POST /api/HR/SaveApplication
 * entryChannelId 2 = Talent Pool
 */
(function (global) {
  var ENTRY_CHANNEL_TALENT_POOL = 2;
  var RESUME_TYPE_PDF = 1;
  var RESUME_TYPE_DOCX = 2;

  function noteEl(form) {
    return form.querySelector("[data-form-note]");
  }

  function setNote(form, message, isError) {
    var note = noteEl(form);
    if (!note) return;
    note.textContent = message || "";
    note.classList.toggle("is-error", !!isError);
    note.classList.toggle("is-success", !isError && !!message);
  }

  function setSubmitting(form, busy) {
    var btn = form.querySelector('.talent-submit, button[type="submit"]');
    if (!btn) return;
    btn.disabled = !!busy;
    btn.setAttribute("aria-busy", busy ? "true" : "false");
  }

  function digitsOnly(value) {
    return String(value || "").replace(/\D+/g, "");
  }

  function resumeTypeFromName(fileName) {
    var lower = String(fileName || "").toLowerCase();
    if (lower.endsWith(".docx")) return RESUME_TYPE_DOCX;
    return RESUME_TYPE_PDF;
  }

  function validate(form) {
    var required = Array.from(form.querySelectorAll("[required]")).filter(function (field) {
      return !field.closest("[hidden]");
    });
    var missing = required.filter(function (field) {
      if (field.type === "checkbox") return !field.checked;
      if (field.type === "file") return !(field.files && field.files[0]);
      return !String(field.value || "").trim();
    });
    required.forEach(function (field) {
      field.removeAttribute("aria-invalid");
    });
    if (!missing.length) return true;
    missing.forEach(function (field) {
      field.setAttribute("aria-invalid", "true");
    });
    missing[0].focus();
    setNote(form, "Complete the required fields before joining.", true);
    return false;
  }

  function buildPayload(form, uploaded) {
    uploaded = uploaded || {};
    var phone = digitsOnly(form.elements.phone && form.elements.phone.value);
    if (phone.length > 10) phone = phone.slice(-10);
    var resumeFileName = uploaded.name || uploaded.originalName || "";

    // API expects List<SaveApplicationRequest> — top-level JSON array.
    return [
      {
        entryChannelId: ENTRY_CHANNEL_TALENT_POOL,
        firstName: String((form.elements.firstName && form.elements.firstName.value) || "").trim(),
        lastName: String((form.elements.lastName && form.elements.lastName.value) || "").trim(),
        email: String((form.elements.email && form.elements.email.value) || "").trim(),
        phoneNumber: phone,
        teamId: Number(form.elements.function && form.elements.function.value),
        candidateSourceId: Number(form.elements.source && form.elements.source.value),
        employmentTypeId: Number(form.elements.employmentType && form.elements.employmentType.value),
        currentLocation: String((form.elements.location && form.elements.location.value) || "").trim(),
        linkedInUrl: String((form.elements.linkedin && form.elements.linkedin.value) || "").trim(),
        resumeType: resumeTypeFromName(resumeFileName || uploaded.originalName || ""),
        resumeFileId: uploaded.fileId || null,
        resumeFileName: resumeFileName,
      },
    ];
  }

  function saveApplication(payload) {
    var endpoint = global.AAAMT_API.endpoints.saveApplication;
    var url = global.AAAMT_API.url(endpoint);
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
      body: JSON.stringify(payload),
    }).then(function (response) {
      return response.json().then(function (body) {
        return { ok: response.ok, status: response.status, body: body };
      }).catch(function () {
        return { ok: response.ok, status: response.status, body: null };
      });
    });
  }

  function wireUpload(form) {
    var fileInput = form.querySelector("#cv");
    var chip = form.querySelector("#cv-chip");
    var nameEl = form.querySelector("#cv-name");
    var sizeEl = form.querySelector("#cv-size");
    var statusEl = form.querySelector("#cv-status");
    var clearBtn = form.querySelector("#cv-clear");
    if (!fileInput || !chip || !nameEl || !statusEl || !clearBtn) return { getUploaded: function () { return null; } };

    var uploaded = null;
    var uploading = false;

    function formatSize(bytes) {
      if (!bytes && bytes !== 0) return "";
      if (bytes < 1024) return bytes + "B";
      return (bytes / 1024).toFixed(2) + "KB";
    }

    function showFile(name, sizeLabel, statusText, isError) {
      nameEl.textContent = name;
      if (sizeEl) sizeEl.textContent = sizeLabel || "";
      statusEl.textContent = statusText || "Successfully uploaded";
      statusEl.style.color = isError ? "#d14343" : statusText === "Uploading…" ? "#64748b" : "#16a34a";
      chip.hidden = false;
    }

    function clearFile() {
      fileInput.value = "";
      nameEl.textContent = "";
      if (sizeEl) sizeEl.textContent = "";
      statusEl.textContent = "";
      chip.hidden = true;
      uploaded = null;
      uploading = false;
    }

    fileInput.addEventListener("change", function () {
      if (!(fileInput.files && fileInput.files[0])) {
        clearFile();
        return;
      }
      if (!global.AAAMTFileUpload) {
        setNote(form, "Upload service is not available.", true);
        return;
      }
      var file = fileInput.files[0];
      var sizeLabel = formatSize(file.size);
      var check =
        typeof global.AAAMTFileUpload.validateResumeFile === "function"
          ? global.AAAMTFileUpload.validateResumeFile(file)
          : { ok: true };
      if (!check.ok) {
        uploaded = null;
        uploading = false;
        fileInput.value = "";
        showFile(file.name, sizeLabel, check.message || "Invalid file", true);
        setNote(form, check.message || "Resume must be PDF or DOCX, max 5 MB.", true);
        return;
      }
      uploaded = null;
      uploading = true;
      setSubmitting(form, true);
      showFile(file.name, sizeLabel, "Uploading…");
      setNote(form, "Uploading resume…");

      global.AAAMTFileUpload.uploadFiles(file)
        .then(function (result) {
          uploaded = result;
          uploading = false;
          setSubmitting(form, false);
          showFile(file.name, sizeLabel, "Successfully uploaded");
          setNote(form, "");
        })
        .catch(function (err) {
          uploaded = null;
          uploading = false;
          setSubmitting(form, false);
          showFile(file.name, sizeLabel, (err && err.message) || "Upload failed", true);
          setNote(form, (err && err.message) || "Resume upload failed. Please try again.", true);
        });
    });

    clearBtn.addEventListener("click", function () {
      clearFile();
      setNote(form, "");
    });

    form.addEventListener("reset", function () {
      clearFile();
    });

    return {
      getUploaded: function () {
        return uploaded;
      },
      isUploading: function () {
        return uploading;
      },
    };
  }

  function init() {
    var form = document.getElementById("talent-form");
    if (!form || !global.AAAMT_API) return;

    var uploadState = wireUpload(form);

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!validate(form)) return;
      if (uploadState.isUploading()) {
        setNote(form, "Please wait for the resume upload to finish.", true);
        return;
      }
      var uploaded = uploadState.getUploaded();
      if (!uploaded || !uploaded.fileId) {
        setNote(form, "Please upload your resume (PDF or DOCX, max 5 MB) before submitting.", true);
        return;
      }

      var payload = buildPayload(form, uploaded);
      var app = payload[0] || {};
      if (!app.teamId || !app.candidateSourceId || !app.employmentTypeId) {
        setNote(form, "Complete the required fields before joining.", true);
        return;
      }

      setSubmitting(form, true);
      setNote(form, "Submitting…");

      saveApplication(payload)
        .then(function (result) {
          setSubmitting(form, false);
          var body = result.body || {};
          if (result.ok && body.success === true) {
            setNote(
              form,
              body.message || "You’re on the Talent Network. We’ll reach out when a matching role opens.",
              false
            );
            form.reset();
            return;
          }
          setNote(
            form,
            (body && body.message) || "Could not join the Talent Network right now. Please try again.",
            true
          );
        })
        .catch(function () {
          setSubmitting(form, false);
          setNote(form, "Could not join the Talent Network right now. Please try again.", true);
        });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window);
