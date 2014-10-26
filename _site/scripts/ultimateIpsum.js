Thorsent.UltimateIpsum = {

	LATIN: ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "vestibulum", "condimentum", "massa", "vitae", "cursus", "molestie", "cras", "eget", "tortor", "a", "dui", "mattis", "fringilla", "duis", "ut", "neque", "aliquam", "erat", "volutpat", "maecenas", "congue", "diam", "nec", "enim", "imperdiet", "at", "varius", "tristique", "fusce", "euismod", "blandit", "in", "hac", "habitasse", "platea", "dictumst", "ornare", "orci", "sed", "lacinia", "aliquet", "aenean", "mollis", "nulla", "sodales", "venenatis", "egestas", "convallis", "justo", "nisl", "felis", "maximus", "quis", "quam", "vel", "consequat", "donec", "ac", "accumsan", "velit", "curabitur", "eu", "ullamcorper", "nunc", "tempor", "augue", "mauris", "viverra", "fermentum", "efficitur", "pellentesque", "nibh", "luctus", "tellus", "phasellus", "leo", "purus", "commodo", "porttitor", "sem", "vivamus", "nullam", "lobortis", "bibendum", "metus", "tempus", "hendrerit", "finibus", "id", "odio", "ultricies", "lectus", "rutrum", "ante", "nam", "feugiat", "tincidunt", "dictum", "ultrices", "malesuada", "class", "aptent", "taciti", "sociosqu", "ad", "litora", "torquent", "per", "conubia", "nostra", "inceptos", "himenaeos", "turpis", "mi", "suspendisse", "potenti", "pulvinar", "dignissim", "et", "libero", "interdum", "nisi", "suscipit", "non", "est", "sapien", "quisque", "risus", "faucibus", "iaculis", "semper", "ligula", "laoreet", "arcu", "pretium", "praesent", "pharetra", "eros", "ex", "posuere", "vulputate", "magna", "auctor", "scelerisque", "porta", "facilisis", "lacus", "dapibus", "cum", "sociis", "natoque", "penatibus", "magnis", "dis", "parturient", "montes", "nascetur", "ridiculus", "mus", "integer", "urna"],
	PARAGRAPH_COUNT_DEFAULT: 3,
	PARAGRAPH_LENGTH_BASE: 4,
	PARAGRAPH_LENGTH_VARIANCE: 2,
	SENTENCE_LENGTH_BASE: 6,
	SENTENCE_LENGTH_VARIANCE: 12,
	ULTIMATE: ["7 Figures", "AMP", "American BBQ", "Blackbird", "Brute Squad", "Bucket", "CLX", "Callahan", "Capitals", "Chain Lightning", "Cosa Nostra", "D", "Doublewide", "Drag’n Thrust", "D’oh Abides", "FIRE", "Furious George", "Fury", "GOAT", "Green Means Go", "Heist", "Ironside", "Johnny Bravo", "Machine", "Mischief", "Molly Brown", "Nemesis", "Nightlock", "Ozone", "PoNY", "Polar Bears", "Praire Fire", "Revolver", "Rhino", "Ring of Fire", "Riot", "Santa Maria", "Scandal", "Schwa", "Seattle Mixed", "Showdown", "Slow White", "Sockeye", "Sub Zero", "Tabby Rosa", "Temper", "the Administrators", "Traffic", "Truck Stop", "Underground", "Wild Card", "air bounce", "around", "away", "backhand", "bid", "blade", "bladey", "bookends", "break", "brick", "callahan", "calling lines", "catch", "check feet", "chilly", "clearing out", "clogging", "conservation of greatness", "contact", "contest", "cup", "cut", "cutter", "cutting", "deep", "deep cut", "disc", "double team", "dump", "elite", "endzone", "fake", "fast count", "field", "flatball", "flick", "flick pull", "flip", "flip for color", "foot block", "force", "force middle", "forcing", "foul", "game to go", "goal", "gratuitous", "greatest", "hammer", "hand block", "handle", "handler", "hard cap", "heckle", "heckling", "high-release", "ho stack", "home", "horizontal", "hosptial pass", "huck", "hucking", "hucks", "inside", "inside-out", "intimi-d", "iso", "lay out", "layout", "lays out", "mac", "man", "mark", "mid", "mismatch", "natties", "offsides", "out", "outside-in", "pancake", "pick", "pick-up", "pivot", "pivoting", "poach", "poaching", "point", "popper", "popping", "pro", "pull", "puller", "pulling", "push pass", "regionals", "run", "run through", "running", "savage", "scoober", "score", "sectionals", "select", "skied", "sky", "soft cap", "spirit", "spirit circle", "spirit foul", "spirit of the game", "sprints", "stack", "stall", "stalling", "strike", "strip", "swing", "throw", "trap", "trapping line", "travel", "turn", "turnover", "under cut", "universe", "vert stack", "violation", "zone"],

	$ipsumContainer: null,
	$includeLatin: null,
	activeWordList: [],

	generateIpsum: function(paragraphCount, includeLatin, includeTags, beginWith) {

		if (!$.isNumeric(paragraphCount) || paragraphCount < 1) {
			paragraphCount = Thorsent.UltimateIpsum.PARAGRAPH_COUNT_DEFAULT;
			$("#ipsum-para-count").val("");
		}
		
		Thorsent.UltimateIpsum.activeWordList = $.merge([], Thorsent.UltimateIpsum.ULTIMATE);
		if (includeLatin) {
			$.merge(Thorsent.UltimateIpsum.activeWordList, Thorsent.UltimateIpsum.LATIN);
		}

		Thorsent.UltimateIpsum.$ipsumContainer.empty();
		for (var i = paragraphCount; i > 0; i--) {
			Thorsent.UltimateIpsum.$ipsumContainer.append($("<p></p>").addClass("card card-2").text(Thorsent.UltimateIpsum.generateParagraph(includeTags, i === paragraphCount && beginWith)));
		}
	},

	generateParagraph: function(includeTags, beginWith) {
		var paragraph = "";
		if (includeTags) {
			paragraph += "<p>";
		}
		var length = Math.floor(Math.random() * Thorsent.UltimateIpsum.PARAGRAPH_LENGTH_VARIANCE + Thorsent.UltimateIpsum.PARAGRAPH_LENGTH_BASE);
		for (var i = length; i > 0; i--) {
			paragraph += Thorsent.UltimateIpsum.generateSentence(i === length && beginWith) + " ";
		}
		if (includeTags) {
			paragraph = paragraph.trim() + "</p>";
		}
		return paragraph.trim();
	},

	generateSentence: function(beginWith) {
		var sentence = "";
		var length = Math.floor(Math.random() * Thorsent.UltimateIpsum.SENTENCE_LENGTH_VARIANCE + Thorsent.UltimateIpsum.SENTENCE_LENGTH_BASE);
		if (beginWith) {
			sentence = "Ulti ipsum dolor amet ";
		}
		for (var i = length; i > 0; i--) {
			var word = Thorsent.UltimateIpsum.getRandomWord();
			// Capitalize start of sentence
			if (i === length && !beginWith) {
				word = word.charAt(0).toUpperCase() + word.substring(1);
			}
			// Randomly add a comma
			if (i >= Thorsent.UltimateIpsum.SENTENCE_LENGTH_BASE && i <= length - Thorsent.UltimateIpsum.SENTENCE_LENGTH_BASE) {
				if (sentence.indexOf(",") < 0 && Math.floor(Math.random() * 100 + length) > 100) {
					word += ",";
				}
			}
			sentence += word + " ";
		}
		return sentence.trim()+".";
	},

	getRandomWord: function() {
		var wordIndex = Math.floor(Math.random() * Thorsent.UltimateIpsum.activeWordList.length);
		return Thorsent.UltimateIpsum.activeWordList[wordIndex];
	},

	Events: {
		
		generateClick: function(event) {
			var paragraphs = parseInt($("#ipsum-para-count").val(), 10);
			var includeLatin = $("#ipsum-include-latin").val() === "true";
			var includeTags = $("#ipsum-para-tags").is(":checked");
			var beginWith = $("#ipsum-begin-with").is(":checked");
			Thorsent.UltimateIpsum.generateIpsum(paragraphs, includeLatin, includeTags, beginWith);
		}
	},

	bindEvents: function() {

		$("#ipsum-controls").on("click", "#ipsum-generate", function(event) {
			Thorsent.UltimateIpsum.Events.generateClick(event);
		});

		$("#ipsum-controls").on("keypress", "#ipsum-para-count", function(event) {
			if (event.which === $.ui.keyCode.ENTER) {
    			$("#ipsum-generate").click();
    		}
		});

		$(window).on("scroll", function(event) {
			if ($(window).scrollTop() >= 0) {
				var top = ($(window).scrollTop() / 2).toString() + "px";
				$(".header-bg img").css({top: top});
				var opacity = ($(".header-bg").height() - $(window).scrollTop()) / $(".header-bg").height();
				if (opacity >= 0 && opacity <= 1) {
					$(".header-bg .shim").css({opacity: opacity});
				}
			}
		});
	},

	init: function() {
		Thorsent.UltimateIpsum.$ipsumContainer = $("#ipsum-container");
		Thorsent.UltimateIpsum.$includeLatin = $("#ipsum-include-latin").select().data("material-select");
		Thorsent.UltimateIpsum.bindEvents();
		Thorsent.UltimateIpsum.generateIpsum(3, true, false, false);
	}
};

$(document).ready(function() {
	Thorsent.UltimateIpsum.init();
});