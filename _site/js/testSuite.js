Thorsent.testSuite = {
	
	/*
	* Tests for the Thorsent JS namespace go here.  Tests for
	* any other namespaces should go in their own test modules.
	*/
	execute: function() {

		QUnit.module("thorsent global", {
			setup: function() {
				QUnit.stop();
				$.ajax({
					url: "/"
				}).then(function(data, textStatus, jqXHR) {
					$("#qunit-fixture").html(data);
					QUnit.start();
				});
			}
		});

		QUnit.test("mobile navigation toggle", function() {
			Thorsent.events.clickMobileNavToggle();
			QUnit.ok($(".site-container").hasClass("active-drawer"), "toggle on");

			Thorsent.events.clickMobileNavToggle();
			QUnit.ok(!$(".site-container").hasClass("active-drawer"), "toggle off");
		});
	},

	init: function() {
		QUnit.config.autostart = false;
		Thorsent.testSuite.execute();
	}	
};

$(document).ready(function() {
	if ($("#qunit").length) {
		Thorsent.testSuite.init();
	}
});