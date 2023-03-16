let alias_domain;
let main_email;
let alias_endpoint;

browser.runtime.onMessage.addListener((message) => {
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then((tabs) => {
      let tab = tabs[0];
      if (message.domain && message.alias_domain) {
        console.log("Background script received domain: " + message.domain);
        let forwardto = browser.storage.sync.get("forwardto");
        forwardto.then((res) => {
          main_email = res.forwardto;
        });

        let mailcow_api = browser.storage.sync.get("mailcow_api");
        mailcow_api.then((res) => {
          alias_endpoint = res.mailcow_api;
        });

        alias_domain = message.alias_domain;
        let alias = get_alias(message.domain);
        console.log("Alias generated: " + alias);
        browser.tabs.sendMessage(tab.id, { new_alias: alias });
        create_alias(alias);
        console.log("Alias created: " + alias);
        browser.tabs.sendMessage(tab.id, { fill_alias: alias });
        console.log("Alias filled: " + alias);
      }
    })
    .catch((error) => {
      console.log(`Error getting active tab: ${error}`);
    });
});

function get_alias(domain) {
  // generate random hex string of length 5
  var hex = Math.random().toString(16).substr(2, 5);
  // append domain to alias
  var alias = `${domain}_${hex}@${alias_domain}`;
  // return alias
  return alias;
}

function create_alias(alias) {
  console.log("main email: " + main_email);
  fetch(`${alias_endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      active: "1",
      address: alias,
      goto: `${main_email}`,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        console.log(`HTTP error ${response.status}`);
      }
      console.log(response.json());
    })
    .catch((error) => {
      console.log(`Error creating alias: ${error}`);
    });
}
