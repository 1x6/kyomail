browser.contextMenus.create({
  id: "new-alias",
  title: "New alias",
  contexts: ["editable"],
});

browser.contextMenus.create({
  id: "new-alias2",
  title: "New alias (secondary)",
  contexts: ["editable"],
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "new-alias":
      //console.log("new-alias clicked");
      let aliasDomainPromise = browser.storage.sync.get("alias_domain");
      aliasDomainPromise.then((res) => {
        //console.log("alias_domain: " + res.alias_domain);
        browser.tabs.sendMessage(tab.id, {
          request: "domain",
          alias_domain: res.alias_domain,
        });
        //console.log("sent message to tab", {
        //  request: "domain",
        //  alias_domain: res.alias_domain,
        //});
      });
      break;
    case "new-alias2":
      //console.log("new-alias2 clicked");
      let aliasDomainPromise2 = browser.storage.sync.get("alias_domain2");
      aliasDomainPromise2.then((res) => {
        //console.log("alias_domain: " + res.alias_domain2);
        browser.tabs.sendMessage(tab.id, {
          request: "domain",
          alias_domain: res.alias_domain2,
        });
        //console.log("sent message to tab", {
        //  request: "domain",
        //  alias_domain: res.alias_domain2,
        //});
      });
      break;
  }
});

browser.browserAction.onClicked.addListener(() => {
  browser.runtime.openOptionsPage();
});
