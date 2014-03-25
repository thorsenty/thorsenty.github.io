//Add global thorsent js code here.
var Thorsent = {
		
	events: {

		clickMobileNavToggle: function(event) {
			event.preventDefault();
			if ($('body').hasClass("active-drawer")) {
				$('body').removeClass("active-drawer");
			} else {
				$('body').addClass("active-drawer");
			}
		}

	},

	init: function() {
		$(".ss-nav-toggle").on("click", function(event) {
			Thorsent.events.clickMobileNavToggle(event);
		});
	}	
};

$(document).ready(function() {
	Thorsent.init();
});