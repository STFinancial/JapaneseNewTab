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

// TODO(stfinancial): Add options for getting random words from other levels.
// TODO(stfinancial): Add example sentences.
// TODO(stfinancial): Add hover tooltips to the part of speech section
function getWord() {
	chrome.storage.sync.get(["showRomaji", "n5", "n4", "n3", "n2", "n1"], function(settings) {
		var url = "";
		if (!(settings.n5 || settings.n4 || settings.n3 || settings.n2 || settings.n1)) {
			// If they unchecked all levels, default to N5
			url = "https://jlearn.net/JLPT-N5/Vocabulary-List/Random";
		} else {
			var level = Math.floor(Math.random() * 5);
			var levels = [settings.n1, settings.n2, settings.n3, settings.n4, settings.n5];
			while (!levels[level]) {
				level = Math.floor(Math.random() * 5);
			}
			url = "https://jlearn.net/JLPT-N" + (level + 1) + "/Vocabulary-List/Random";
		}

		$.get(url, function(data) {
			html = $.parseHTML(data);
			// Get Kanji Data
			var kanjis = $(html).find(".keb-reading").first().children()[0];
			var kanjiReading = $(kanjis).text().replace(/\s/g,'');
			var kanjihtml = "<span id='kanjitext'>" + kanjiReading + "</span>";
			$("#kanjibox").html(kanjihtml);

			// Get Hiragana Data
			var kana = $(html).find(".reb-reading").first().children(":first").text();
			if (!settings.showRomaji) {
				kana = kana.replace(/(?<=\S)( |\n).*/g,''); // Remove romaji.
			}
			kana = kana.replace(/ /g,'');
			var kanahtml = "<span id='kanatext'>" + kana + "</span>";
			$("#kanabox").html(kanahtml);
			

			// Get word definitions
			var definitions = $(html).find(".sensegloss");
			var definitionhtml = "<ol>"
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
	});
};