function saveOptions(e) {
  chrome.storage.sync.set({
    alias_domain: document.querySelector("#alias_domain").value,
    alias_domain2: document.querySelector("#alias_domain2").value,
  });
  e.preventDefault();
}

function restoreOptions() {
  chrome.storage.sync.get({
    alias_domain: "",
    alias_domain2: "",
  }, function(items) {
    document.querySelector("#alias_domain").value = items.alias_domain;
    document.querySelector("#alias_domain2").value = items.alias_domain2;
  });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
