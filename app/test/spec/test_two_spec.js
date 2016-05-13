var scripts = require('../../../public/scripts/all.js')

describe("local script test", function() {
  describe("open search bar", function() {
    it("should open search bar", function(done) {
      scripts.search.openSearchBar();
    });
  });
});
