let alias_domain;

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.domain && message.alias_domain) {
    //console.log("Background script received domain: " + message.domain);
    alias_domain = message.alias_domain;
    let alias = get_alias(message.domain);
    //console.log("Alias generated: " + alias);
    chrome.tabs.sendMessage(sender.tab.id, { new_alias: alias });
    //console.log("Alias created: " + alias);
    chrome.tabs.sendMessage(sender.tab.id, { fill_alias: alias });
    //console.log("Alias filled: " + alias);
  }
});

function get_alias(domain) {
  // generate random hex string of length 5
  var hex = Math.random().toString(16).substr(2, 5);
  // append domain to alias
  var alias = `${domain}_${hex}@${alias_domain}`;
  // return alias
  return alias;
}
