Thorsent.UltimateIpsum = {

	LATIN: ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "vestibulum", "condimentum", "massa", "vitae", "cursus", "molestie", "cras", "eget", "tortor", "a", "dui", "mattis", "fringilla", "duis", "ut", "neque", "aliquam", "erat", "volutpat", "maecenas", "congue", "diam", "nec", "enim", "imperdiet", "at", "varius", "tristique", "fusce", "euismod", "blandit", "in", "hac", "habitasse", "platea", "dictumst", "ornare", "orci", "sed", "lacinia", "aliquet", "aenean", "mollis", "nulla", "sodales", "venenatis", "egestas", "convallis", "justo", "nisl", "felis", "maximus", "quis", "quam", "vel", "consequat", "donec", "ac", "accumsan", "velit", "curabitur", "eu", "ullamcorper", "nunc", "tempor", "augue", "mauris", "viverra", "fermentum", "efficitur", "pellentesque", "nibh", "luctus", "tellus", "phasellus", "leo", "purus", "commodo", "porttitor", "sem", "vivamus", "nullam", "lobortis", "bibendum", "metus", "tempus", "hendrerit", "finibus", "id", "odio", "ultricies", "lectus", "rutrum", "ante", "nam", "feugiat", "tincidunt", "dictum", "ultrices", "malesuada", "class", "aptent", "taciti", "sociosqu", "ad", "litora", "torquent", "per", "conubia", "nostra", "inceptos", "himenaeos", "turpis", "mi", "suspendisse", "potenti", "pulvinar", "dignissim", "et", "libero", "interdum", "nisi", "suscipit", "non", "est", "sapien", "quisque", "risus", "faucibus", "iaculis", "semper", "ligula", "laoreet", "arcu", "pretium", "praesent", "pharetra", "eros", "ex", "posuere", "vulputate", "magna", "auctor", "scelerisque", "porta", "facilisis", "lacus", "dapibus", "cum", "sociis", "natoque", "penatibus", "magnis", "dis", "parturient", "montes", "nascetur", "ridiculus", "mus", "integer", "urna"],
	PARAGRAPH_COUNT_DEFAULT: 3,
	PARAGRAPH_LENGTH_BASE: 4,
	PARAGRAPH_LENGTH_VARIANCE: 2,
	SENTENCE_LENGTH_BASE: 6,
	SENTENCE_LENGTH_VARIANCE: 12,
	ULTIMATE: ["Revolver", "Doublewide", "PoNY", "Praire Fire", "Machine", "Rhino", "Sub Zero", "Truck Stop", "Sockeye", "Ring of Fire", "GOAT", "Temper", "Ironside", "Johnny Bravo", "Chain Lightning", "Furious George", "Brute Squad", "Ozone", "Schwa", "Capitals", "Riot", "Nightlock", "Heist", "Green Means Go", "Fury", "Traffic", "Showdown", "Underground", "Scandal", "Molly Brown", "Nemesis", "Tabby Rosa", "Polar Bears", "Bucket", "Seattle Mixed", "American BBQ", "Drag’n Thrust", "Slow White", "D’oh Abides", "Santa Maria", "CLX", "7 Figures", "AMP", "Cosa Nostra", "Blackbird", "Mischief", "Wild Card", "The Administrators"],

	$ipsumContainer: null,
	$includeLatin: null,
	activeWordList: [],

	generateIpsum: function(paragraphCount, includeLatin) {

		if (!$.isNumeric(paragraphCount) || paragraphCount < 1) {
			paragraphCount = Thorsent.UltimateIpsum.PARAGRAPH_COUNT_DEFAULT;
		}
		
		Thorsent.UltimateIpsum.activeWordList = $.merge([], Thorsent.UltimateIpsum.ULTIMATE);
		if (includeLatin) {
			$.merge(Thorsent.UltimateIpsum.activeWordList, Thorsent.UltimateIpsum.LATIN);
		}

		Thorsent.UltimateIpsum.$ipsumContainer.empty();
		for (var i = paragraphCount; i > 0; i--) {
			Thorsent.UltimateIpsum.$ipsumContainer.append($("<p></p>").addClass("card card-2").text(Thorsent.UltimateIpsum.generateParagraph()));
		}
	},

	generateParagraph: function() {
		var paragraph = "";
		var length = Math.floor(Math.random() * Thorsent.UltimateIpsum.PARAGRAPH_LENGTH_VARIANCE + Thorsent.UltimateIpsum.PARAGRAPH_LENGTH_BASE);
		for (var i = length; i > 0; i--) {
			paragraph += Thorsent.UltimateIpsum.generateSentence() + " ";
		}
		return paragraph.trim();
	},

	generateSentence: function() {
		var sentence = "";
		var length = Math.floor(Math.random() * Thorsent.UltimateIpsum.SENTENCE_LENGTH_VARIANCE + Thorsent.UltimateIpsum.SENTENCE_LENGTH_BASE);
		for (var i = length; i > 0; i--) {
			var word = Thorsent.UltimateIpsum.getRandomWord();
			// Capitalize start of sentence
			if (i === length) {
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
			Thorsent.UltimateIpsum.generateIpsum(paragraphs, includeLatin);
		}
	},

	bindEvents: function() {

		$("#ipsum-controls").on("click", "#ipsum-generate", function(event) {
			Thorsent.UltimateIpsum.Events.generateClick(event);
		});
	},

	init: function() {
		Thorsent.UltimateIpsum.$ipsumContainer = $("#ipsum-container");
		Thorsent.UltimateIpsum.$includeLatin = $("#ipsum-include-latin").select().data("material-select");
		Thorsent.UltimateIpsum.bindEvents();
		Thorsent.UltimateIpsum.generateIpsum(3, false);
	}
};

$(document).ready(function() {
	Thorsent.UltimateIpsum.init();
});