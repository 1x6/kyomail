function saveOptions(e) {
  browser.storage.sync.set({
    forwardto: document.querySelector("#forwardto").value,
    mailcow_api: document.querySelector("#mailcow_api").value,
    alias_domain: document.querySelector("#alias_domain").value,
    alias_domain2: document.querySelector("#alias_domain2").value,
  });
  e.preventDefault();
}

function restoreOptions() {
  let forwardto = browser.storage.sync.get("forwardto");
  forwardto.then((res) => {
    document.querySelector("#forwardto").value = res.forwardto;
  });
  let mailcow_api = browser.storage.sync.get("mailcow_api");
  mailcow_api.then((res) => {
    document.querySelector("#mailcow_api").value = res.mailcow_api;
  });
  let alias_domain = browser.storage.sync.get("alias_domain");
  alias_domain.then((res) => {
    document.querySelector("#alias_domain").value = res.alias_domain;
  });
  let alias_domain2 = browser.storage.sync.get("alias_domain2");
  alias_domain2.then((res) => {
    document.querySelector("#alias_domain2").value = res.alias_domain2;
  });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
