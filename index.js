var inputWord = document.querySelector(".input-word");
var header = document.querySelector(".header");
var btnSubmit = document.querySelector(".btn-submit");
var phonetics = document.querySelector(".phonetics");
var partsOfspeech = document.querySelector(".parts-of-speech");
var meaning1 = document.querySelector(".meaning1");
var meaning2 = document.querySelector(".meaning2");
var meaning3 = document.querySelector(".meaning3");
var meaningHeader = document.querySelector(".meaning-header");
var synonyms = document.querySelector(".words");
var partOfSpeech2 = document.querySelector(".parts-of-speech2");
var second_meaning1 = document.querySelector(".second-meaning");
var source = document.querySelector(".source");
var titleWarning = document.querySelector(".title-warning");
var messageWarning = document.querySelector(".message-warning");
var resolutionWarning = document.querySelector(".resolution-warning");
var link = document.querySelector(".linkPota");
var main = document.querySelector(".container");
const hamsterLoader = document.querySelector("#hamster");
const sound = document.querySelector(".toggleSwitch");

inputWord.addEventListener("input", handleInputDelay);

function handleInputDelay() {
  setTimeout(() => {
    dictionary();
  }, 300);
}

function dictionary() {
  const word = inputWord.value;
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        const obj = data[0];
        if (inputWord.value === "" || inputWord.value === null) {
          main.style.visibility = "hidden";
        } else {
          main.style.visibility = "visible";
        }

        header.innerHTML = obj.word;
        phonetics.innerHTML = obj.phonetics[0]?.text || "";
        meaningHeader.innerHTML = "Meaning";
        partsOfspeech.innerHTML = obj.meanings[0]?.partOfSpeech || "";

        // meanings
        meaning1.innerHTML =
          "&#x2022;  " + obj.meanings[0]?.definitions[0]?.definition || "";
        meaningHeader.style.fontWeight = "bold";
        if (
          obj.meanings[0]?.definitions[1]?.definition === null ||
          obj.meanings[0]?.definitions[2]?.definition === undefined
        ) {
          meaning2.innerHTML =
            "&#x2022;  " + (obj.meanings[1]?.definitions[0]?.definition || "");
          meaning3.innerHTML =
            "&#x2022;  " + (obj.meanings[1]?.definitions[1]?.definition || "");
        } else {
          meaning2.innerHTML =
            "&#x2022;  " + (obj.meanings[0]?.definitions[1]?.definition || "");
          meaning3.innerHTML =
            "&#x2022;  " + (obj.meanings[0]?.definitions[2]?.definition || "");
        }

        // synonyms
        const synonymsList = obj.meanings[0]?.synonyms || "";
        if (synonymsList.length > 0) {
          (synonyms.innerHTML = synonymsList.join(", ")) &&
            ((synonyms.style.color = "blue"),
            (synonyms.style.fontWeight = "bold"));
        } else {
          synonyms.innerHTML = "No synonyms found.";
        }

        if (obj.meanings[1]) {
          partOfSpeech2.innerHTML = obj.meanings[1]?.partOfSpeech || "";
          partOfSpeech2.style.fontWeight = "bold";
          second_meaning1.innerHTML =
            "&#x2022;  " + obj.meanings[1]?.definitions[0].definition || "";
          second_meaning1.style.display = "block";
        } else {
          partOfSpeech2.innerHTML = "";
          partOfSpeech2.style.fontWeight = "normal";
          second_meaning1.innerHTML = "";
          second_meaning1.style.display = "none";
        }
        source.innerHTML =
          '<span style="color: grey; margin-right: 1rem;">Source </span><span style="color: red;">' +
          obj.sourceUrls +
          "</span>";

        source.style.color = "red";
        titleWarning.innerHTML = "";
        messageWarning.innerHTML = "";
        resolutionWarning.innerHTML = "";
      } else {
        errorMessage();
        resetElements();
      }
    })
    .catch(error => {
      console.log("Something went wrong", error);
    });
}
function resetElements() {
  const elementsToReset = [
    header,
    phonetics,
    partsOfspeech,
    meaning1,
    meaning2,
    meaning3,
    meaningHeader,
    synonyms,
    partOfSpeech2,
    second_meaning1,
    source,
    link,
  ];

  elementsToReset.forEach(element => {
    element.innerHTML = "";
  });
}

inputWord.addEventListener("keyup", function (event) {
  if (inputWord.value === "" || inputWord.value === null) {
    main.style.visibility = "hidden";
    hamsterLoader.style.visibility = "visible";
  } else {
    main.style.visibility = "visible";

    hamsterLoader.style.visibility = "hidden";
  }
});

function errorMessage() {
  main.style.visibility = "hidden";
  titleWarning.innerHTML = "No Definitions Found";
  messageWarning.innerHTML =
    "Sorry pal, we couldn't find definitions for the word you were looking for.";
  resolutionWarning.innerHTML =
    "You can try the search again at later time or head to the web instead.";
}

function soundClick() {
  var soundPlayer = document.getElementById("sound");
  var sourceElement = soundPlayer.querySelector("source");

  sourceElement.src = `https://api.dictionaryapi.dev/media/pronunciations/en/${inputWord.value}-us.mp3`;
  soundPlayer.load();
  soundPlayer.play();
}
sound.addEventListener("click", soundClick);

const body = document.querySelector("body");
const toggleMode = document.querySelector(".toggle-mode");

toggleMode.addEventListener("click", function () {
  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    toggleMode.style.left = "";
    toggleMode.style.backgroundColor = "white";
    body.style.color = "black";
  } else {
    body.classList.add("dark-mode");
    toggleMode.style.left = "30px";
    toggleMode.style.backgroundColor = "black";
    body.style.color = "#e1e1e1";
  }
});
