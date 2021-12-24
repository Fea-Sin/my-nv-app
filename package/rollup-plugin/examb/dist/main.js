(function () {
	'use strict';

	var logo = new URL('assets/hello-fbe69b11.svg', document.currentScript && document.currentScript.src || document.baseURI).href;

	const image = document.createElement("img");
	image.src = logo;

	const app = document.getElementById("root");

	app.appendChild(image);

})();
//# sourceMappingURL=main.js.map
