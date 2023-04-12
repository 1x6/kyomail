function saveOptions(e) {
  browser.storage.sync.set({
    alias_domain: document.querySelector("#alias_domain").value,
    alias_domain2: document.querySelector("#alias_domain2").value,
  });
  e.preventDefault();
}

function restoreOptions() {

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
