let alias_domain;


browser.runtime.onMessage.addListener((message) => {
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then((tabs) => {
      let tab = tabs[0];
      if (message.domain && message.alias_domain) {
        //console.log("Background script received domain: " + message.domain);
        alias_domain = message.alias_domain;
        let alias = get_alias(message.domain);
        //console.log("Alias generated: " + alias);
        browser.tabs.sendMessage(tab.id, { new_alias: alias });
        browser.tabs.sendMessage(tab.id, { fill_alias: alias });
        //console.log("Alias filled: " + alias);
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

