var inputWord = document.querySelector(".input-word");
var header = document.querySelector(".header");
var btnSubmit = document.querySelector(".btn-submit");
var phonetics = document.querySelector(".phonetics");
var partsOfspeech = document.querySelector(".parts-of-speech");
var meaning1 = document.querySelector(".meaning1");
var meaning2 = document.querySelector(".meaning2");
var meaning3 = document.querySelector(".meaning3");
var meaningHeader = document.querySelector(".meaning-header");
var synonyms = document.querySelector(".synonyms");
var antonyms = document.querySelector(".antonyms");
var partOfSpeech2 = document.querySelector(".parts-of-speech2");
var second_meaning1 = document.querySelector(".second-meaning1");
var source = document.querySelector(".source");
var titleWarning = document.querySelector(".title-warning");
var messageWarning = document.querySelector(".message-warning");
var resolutionWarning = document.querySelector(".resolution-warning");
var link = document.querySelector("#link");
btnSubmit.addEventListener("click", dictionary);

function dictionary() {
  const word = inputWord.value;
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        const obj = data[0];

        header.innerHTML = obj.word;
        phonetics.innerHTML = obj.phonetics[0]?.text || "";
        partsOfspeech.innerHTML = obj.meanings[0]?.partOfSpeech || "";
        meaningHeader.innerHTML =
          obj.meanings[0]?.definitions[0]?.definition || "";
        meaningHeader.style.fontWeight = "bold";
        meaning2.innerHTML = obj.meanings[0]?.definitions[1]?.definition || "";
        meaning3.innerHTML = obj.meanings[0]?.definitions[2]?.definition || "";

        const synonymsList = obj.meanings[0]?.synonyms || "";
        if (synonymsList.length > 0) {
          synonyms.innerHTML = "Synonyms: " + synonymsList.join(", ");
        } else {
          synonyms.innerHTML = "No synonyms found.";
        }

        const antonymsList = obj.meanings[0]?.antonyms || "";
        if (antonymsList.length > 0) {
          antonyms.innerHTML = "Antonyms: " + antonymsList.join(", ");
        } else {
          antonyms.innerHTML = "No amtonyms found.";
        }

        if (obj.meanings[1]) {
          partOfSpeech2.innerHTML = obj.meanings[1]?.partOfSpeech || "";
          partOfSpeech2.style.fontWeight = "bold";
          second_meaning1.innerHTML =
            obj.meanings[1]?.definitions[0].definition || "";
          second_meaning1.style.display = "block";
        } else {
          partOfSpeech2.innerHTML = "";
          partOfSpeech2.style.fontWeight = "normal";
          second_meaning1.innerHTML = "";
          second_meaning1.style.display = "none";
        }

        source.innerHTML = obj.sourceUrls;
        link.style.display = "block";

        source.style.textDecoration = "underline";
        source.style.cursor = "pointer";

        titleWarning.innerHTML = "";
        messageWarning.innerHTML = "";
        resolutionWarning.innerHTML = "";
      } else {
        resetElements();
        titleWarning.innerHTML = "No Definitions Found";
        messageWarning.innerHTML =
          "Sorry pal, we couldn't find definitions for the word you were looking for.";
        resolutionWarning.innerHTML =
          "You can try the search again at later time or head to the web instead.";
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
    antonyms,
    partOfSpeech2,
    second_meaning1,
    source,
    link,
  ];

  elementsToReset.forEach(element => {
    element.innerHTML = "";
  });
}
