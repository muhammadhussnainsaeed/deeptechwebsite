/* DeepTech error pages: small helpers. Theme, menu, modals, cookies come from /script.js */
(function () {
	/* show the URL that triggered the error */
	var path = location.pathname + location.search;
	document.querySelectorAll("[data-path]").forEach(function (el) {
		el.textContent = path.length > 90 ? path.slice(0, 90) + "…" : path;
	});

	/* "Report this" mailto with the failing URL prefilled */
	document.querySelectorAll("[data-report]").forEach(function (a) {
		var code = a.getAttribute("data-report");
		var subject = encodeURIComponent("Website error " + code);
		var body = encodeURIComponent(
			"Hi DeepTech,\n\nI hit a " + code + " error.\nPage: " + location.href + "\nTime: " + new Date().toString() + "\n\n"
		);
		a.href = "mailto:info@deeptechtechnologies.com?subject=" + subject + "&body=" + body;
	});

	/* action buttons */
	document.querySelectorAll("[data-action]").forEach(function (btn) {
		btn.addEventListener("click", function () {
			var a = btn.getAttribute("data-action");
			if (a === "reload") location.reload();
			if (a === "back") {
				if (history.length > 1) history.back();
				else location.href = "/";
			}
		});
	});

	/* auto-retry countdown (503 + maintenance) */
	var c = document.getElementById("countdown");
	if (c) {
		var s = parseInt(c.getAttribute("data-seconds"), 10) || 30;
		c.textContent = s;
		var timer = setInterval(function () {
			s--;
			c.textContent = s;
			if (s <= 0) {
				clearInterval(timer);
				location.reload();
			}
		}, 1000);
	}
})();
