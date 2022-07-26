let tracks = {};

let utmQuery = decodeURIComponent(window.location.search.substring(1)),
	utmVariables = utmQuery.split("&"),
	ParameterName,
	i;

// store utm values in object
const storeUTMValuesObject = () => {
	for (i = 0; i < utmVariables.length; i++) {
		ParameterName = utmVariables[i].split("=")[0];
		if (ParameterName == "utm_source") {
			tracks["utm_source"] = utmVariables[i].split("=")[1];
		}
		if (ParameterName == "utm_medium") {
			tracks["utm_medium"] = utmVariables[i].split("=")[1];
		}
		if (ParameterName == "utm_campaign") {
			tracks["utm_campaign"] = utmVariables[i].split("=")[1];
		}
		if (ParameterName == "utm_term") {
			tracks["utm_term"] = utmVariables[i].split("=")[1];
		}
		if (ParameterName == "utm_content") {
			tracks["utm_content"] = utmVariables[i].split("=")[1];
		}
	}
};

storeUTMValuesObject();

// store tracks in local storage
const storeTracks = () => {
	localStorage.setItem("tracks", JSON.stringify(tracks));
};

storeTracks();

// retrieve utm values from local storage
const retrieveUTMValues = () => {
	let utmValues = JSON.parse(localStorage.getItem("tracks"));
	console.log(utmValues);
	return utmValues;
};

retrieveUTMValues();

// map tracks in form
//by adding hidden inputs dynamically depending on the number of utm values we have in the url
const mapTracks = () => {
	let utmValues = retrieveUTMValues();
	let form = document.getElementById("form");
	for (let key in utmValues) {
		let input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("name", key);
		input.setAttribute("value", utmValues[key]);
		form.appendChild(input);
	}
};
mapTracks();
