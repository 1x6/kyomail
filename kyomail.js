browser.runtime.onMessage.addListener((message) => {
  if (message.request === "domain" && message.alias_domain) {
    var d = document.domain.split(".").reverse()[1];
    if (
      d === "co" ||
      d === "com" ||
      d === "net" ||
      d === "org" ||
      d === "edu" ||
      d === "gov" ||
      d === "mil" ||
      d === "int" ||
      d === "ne"
    ) {
      browser.runtime.sendMessage({
        domain: document.domain.split(".").reverse()[2],
        alias_domain: message.alias_domain,
      });
      console.log(
        "Detected domain with 2 dots, using " +
          document.domain.split(".").reverse()[2] +
          " as domain"
      );
    } else {
      browser.runtime.sendMessage({
        domain: document.domain.split(".").reverse()[1],
        alias_domain: message.alias_domain,
      });
    }
  } else if (message.fill_alias) {
    var inputField = document.activeElement;
    var final_alias = message.fill_alias;
    inputField.value = final_alias;
    inputField.dispatchEvent(new Event("input", { bubbles: true }));
    console.log("Alias filled: " + final_alias);
  } else {
    console.log("kyomail.js recieved unnecesary message:");
    console.log(message);
  }
});
