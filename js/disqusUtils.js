Thorsent.disqusUtils = {

	shortname: "thorsent",
	apiKey: "cuWxmYM9HB2OlZanqsKfIa1R1kXIuLa9pv479c4KqfIIbwA2sSK5Ho1hIAHp6WiS",

	getThreadComments: function(threadId) {
		var comments = 0;
		this.getThreadDetails(threadId).then(function(data) {
			if (data.code === 0) {
				comments = data.response.posts;
			}
		}, function(data) {
			console.log("Error in thread details service for", threadId);
		});
		return comments;
	},

	getThreadDetails: function(threadId) {
		var endpoint = "http://disqus.com/api/3.0/threads/details.json?api_key=" + this.apiKey + "&forum=" + this.shortname + "&thread:ident=" + threadId;

		return $.ajax({
			url: endpoint
		});
	}
}