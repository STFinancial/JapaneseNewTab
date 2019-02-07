document.addEventListener("DOMContentLoaded", function() {
	getWord();
});

function buildDefLine(lineElement) {
	html = "<li class='def'>";
	var first = true;
	$(lineElement).children().each(function() {
		if ($(this).prop('nodeName') == "A") {
			html += "<a class='pos'>" + $(this).text() + "</a>";
		} else {
			if (first) {
				html += "<span>";
				first = false;
			} else {
				html += ", ";
			}
			html += $(this).text();
		}
	});
	html += "</span></li>";
	return html;
}

// TODO(stfinancial): Add options for romaji and getting random words from other levels.
// TODO(stfinancial): Add example sentences.
// TODO(stfinancial): Add hover tooltips to the part of speech section
function getWord() {
	$.get("https://jlearn.net/JLPT-N5/Vocabulary-List/Random", function(data) {
		html = $.parseHTML(data);
		// Get Kanji Data
		var kanjis = $(html).find(".keb-reading").first().children()[0];
		var kanjiReading = $(kanjis).text().replace(/\s/g,'');
		var kanjihtml = "<span id='kanjitext'>" + kanjiReading + "</span>";
		$("#kanjibox").html(kanjihtml);


		// Get Hiragana Data
		var hiragana = $(html).find(".reb-reading").last().text();
		var firstWord = hiragana.replace(/(?<=\S)( |\n).*/g,''); // Remove romaji. This should be part of extension options.
		firstWord = firstWord.replace(/\s/g,'');
		var kanahtml = "<span id='kanatext'>" + firstWord + "</span>";
		$("#kanabox").html(kanahtml);

		// Get word definitions
		var definitions = $(html).find(".sensegloss");
		var definitionhtml = "<ol>"
		// var prevParent = "";
		if (definitions[0].parentNode.nodeName == "DIV") {
			definitionhtml += buildDefLine(definitions[0].parentNode);
		} else if (definitions[0].parentNode.nodeName == "LI") {
			console.log("Multi Def");
			$(definitions[0].parentNode.parentNode).children().each(function() {
				definitionhtml += buildDefLine($(this));
			});
		}
		definitionhtml += "</ol>";
		console.log(definitionhtml);
		$("#definitionbox").html(definitionhtml);

		// TODO(stfinancial): Add example sentences
	});
};