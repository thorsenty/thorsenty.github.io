(function(window, document, $) {

	$.widget( "material.select", {
 
	    options: {},

	    _bindEvents: function($container) {

	    	var that = this;

	    	$container.on("click.material-select", function(event) {
	    		event.stopPropagation();
	    	});

	    	$container.find(".select").on("click", function(event) {
	    		$(event.currentTarget).closest(".material-select").toggleClass("open");
	    	});

	    	$container.find(".select > div").on("keypress", function(event) {
	    		if (event.which === $.ui.keyCode.ENTER) {
	    			$(event.currentTarget).closest(".select").click();
	    		}
	    	});

	    	$container.find("ul li span").on("click", function(event) {
	    		that.element.val($(event.currentTarget).attr("value"));
	    		var container = $(event.currentTarget).closest(".material-select");
	    		$container.find(".selected-text").text($(event.currentTarget).text());
	    		$container.removeClass("open");
	    		$container.find(".select div").focus();
	    	});

	    	$container.find("ul li").on("keypress", function(event) { 
	    		if (event.which === $.ui.keyCode.ENTER) {
	    			$(event.currentTarget).find("span").click();
	    		}
	    	});
	    },

	    _create: function() {
	    	var element = this.element;
	        element.wrap($("<div></div>").addClass("material-select"));
	        element.closest(".material-select").append($("<div></div>").addClass("select"));
	        var $select = element.closest(".material-select").find(".select");
	        $select.append("<div tabindex=0><span class='selected-text'>Initial Value</span><span class='caret'><i class='fa fa-caret-down'></i></span></div>");
	        element.closest(".material-select").append($("<ul></ul>").addClass("options card card-2"));
	        var $options = element.closest(".material-select").find(".options");
	        element.find('option').each(function() {
	        	var option = $(this);
	        	$options.append($("<li></li>").attr("tabindex",0).append($("<span></span>")
	        			.attr("value", option.attr("value"))
	        			.text(option.text())));
	        });
	        this._setMinWidth($select.find(".selected-text"));
	        $select.find(".selected-text").text(element.find("option:selected").text());
	        if (this.element.is(".full-width")) {
	        	element.closest(".material-select").addClass("full-width");
	        }
	        this._bindEvents(element.closest(".material-select"));
	        this.element.hide();
	    },

	    _setMinWidth: function($selectedText) {
			var minWidth = -1;
	    	this.element.find('option').each(function() {
	        	$selectedText.text($(this).text());
	        	minWidth = Math.max(minWidth, $selectedText.width());
	        });
	        $selectedText.css({minWidth:minWidth});
	    },

	    val: function( value ) {

	    	if ( value === undefined ) {
	            return this.element.val();
	        }
	 
	        this.element.val(value);
	    }
	});

	$('body').on("click.material-select", function(event) {
		$(".material-select.open").removeClass("open");
	});

})(window, document, window.jQuery); 