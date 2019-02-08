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
		chrome.storage.sync.get("showRomaji", function(settings) {
			var html = $.parseHTML(data);
			console.log(html);
			var kana = $(html).find(".reb-reading").last().text();
			console.log(kana);
			if (!settings.showRomaji) {
				kana = kana.replace(/(?<=\S)( |\n).*/g,''); // Remove romaji.
			}
			console.log(kana);
			kana = kana.replace(/ /g,'');
			console.log(kana);
			var kanahtml = "<span id='kanatext'>" + kana + "</span>";
			$("#kanabox").html(kanahtml);
		});

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