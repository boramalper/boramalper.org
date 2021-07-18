// Use jQuery for every goddamn thing as if it's necessary!
$(document).ready(function() {
	$("pre code").each(function(i, block) {
		hljs.highlightBlock(block);
	});
});
