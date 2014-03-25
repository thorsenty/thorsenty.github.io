Thorsent.testSuite = {
	
	init: function() {
		
		test("Sample Passing Test", function() {
			equal(1,"1");
		});

		test("Sample Failing Test", function() {
			strictEqual(1,"1");
		});
	}	
};

$(document).ready(function() {
	if ($("#qunit").length) {
		Thorsent.testSuite.init();
	}
});