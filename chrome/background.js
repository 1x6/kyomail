chrome.contextMenus.create({
  id: "new-alias",
  title: "New alias",
  contexts: ["editable"],
});

chrome.contextMenus.create({
  id: "new-alias2",
  title: "New alias (secondary)",
  contexts: ["editable"],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "new-alias":
      //console.log("new-alias clicked");
      chrome.storage.sync.get("alias_domain", (res) => {
        //console.log("alias_domain: " + res.alias_domain);
        chrome.tabs.sendMessage(tab.id, {
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
      chrome.storage.sync.get("alias_domain2", (res) => {
        //console.log("alias_domain: " + res.alias_domain2);
        chrome.tabs.sendMessage(tab.id, {
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

chrome.browserAction.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});
