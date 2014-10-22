var Thorsent = {
		
	toTitleCase: function(str) {
		return str.replace(/\w*\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	},

	Events: {

		clickMobileNavToggle: function() {
			if ($(".site-container").is(".active-drawer")) {
				$(".site-container").removeClass("active-drawer");
			} else {
				$(".site-container").addClass("active-drawer");
			}
		}

	},

	init: function() {
		$(".ss-nav-toggle").on("click", function(event) {
			event.preventDefault();
			Thorsent.Events.clickMobileNavToggle();
		});
	}	
};

$(document).ready(function() {
	Thorsent.init();
});