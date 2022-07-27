let tracks = {};

let idoa = {};

let trackHistory = JSON.parse(localStorage.getItem("trackHistory")) || [];

let utmQuery = decodeURIComponent(window.location.search.substring(1)),
	utmVariables = utmQuery.split("&"),
	ParameterName,
	i;

//Create UUID
function uuidv4() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

// retrieve utm values from local storage
const retrieveUTMValues = () => {
	let utmValues = JSON.parse(localStorage.getItem("tracks"));

	return utmValues;
};

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

// check for uuid
const id = localStorage.getItem("idoa");
let input = document.createElement("input");
if (id) {
	const Storedtracks = retrieveUTMValues();
	if (Storedtracks.utm_campaign != tracks.utm_campaign) {
		trackHistory.push(Storedtracks);
		localStorage.setItem("trackHistory", JSON.stringify(trackHistory));
		storeTracks();
		retrieveUTMValues();
		mapTracks();
	}
} else {
	idoa = { uuid: uuidv4() };
	localStorage.setItem("idoa", JSON.stringify(idoa));
	storeTracks();
	retrieveUTMValues();
	mapTracks();
}

input.setAttribute("type", "hidden");
input.setAttribute("name", "tracksHistory");
input.setAttribute("value", JSON.stringify(trackHistory));
form.appendChild(input);
