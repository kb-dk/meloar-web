// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

// automatically uses dev Server port from /config.index.js
// default: http://localhost:8080
// see nightwatch.conf.js

module.exports = {
  "the app is displayed": function(browser) {
    const devServer = browser.globals.devServerURL;

    browser
      .url(devServer)
      .waitForElementVisible("#app", 5000)
      .assert.elementPresent(".navbar")
      .assert.elementPresent(".loginInfo")
      .assert.elementPresent(".units")
      .assert.elementPresent(".searchbox")
      .assert.elementPresent("#onlyin")
      .assert.elementPresent(".content")
      .end();
  },

  "unit container toggles on button click": function(browser) {
    const devServer = browser.globals.devServerURL;

    browser
      .url(devServer)
      .waitForElementVisible("#app", 5000)
      .assert.elementNotPresent(".unitsContainer")
      .click("div#unitDropDownToggle")
      .assert.elementPresent(".unitsContainer")
      .assert.visible(".unitsContainer")
      .assert.containsText(".unitsContainer", "Administration Aarhus")
      .click("div#unitDropDownToggle")
      .assert.elementNotPresent(".unitsContainer")
      .end();
  }
};
