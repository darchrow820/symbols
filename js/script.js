// import chars from "./chars.js";
import { chars } from "./chars.js";
import { russianAdjectives } from "./russianAdjectives.js";
import { russianNouns } from "./russianNouns.js";

console.log(russianAdjectives.length);

const input = document.getElementById("input");
const output = document.getElementById("output");
const button = document.getElementById("button");
const randomButton = document.getElementById("random-button");
const copyButton = document.getElementById("copy");

button.addEventListener("click", mainFunction);
randomButton.addEventListener("click", randomNick);

// Get random integer in given range

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Trigger button click on enter press

$("#form")
  .find("input")
  .keypress(function (e) {
    // Enter pressed?
    if (e.which == 10 || e.which == 13) {
      // this.form.submit();
      $("#button").trigger("click");
    }
  });

// Copy input value to clipboard

copyButton.addEventListener("click", function (event) {
  output.focus();
  output.select();

  try {
    let successful = document.execCommand("copy");
    let msg = successful ? "successful" : "unsuccessful";

    let parent = document.getElementById("output-wrap");
    let messageElement = document.createElement("div");
    messageElement.classList.add("copied-message");
    messageElement.innerHTML = "Скопировано!";
    parent.append(messageElement);

    setTimeout(() => {
      messageElement.remove();
    }, 1700);

    // console.log("Copying text command was " + msg);
  } catch (err) {
    console.log("Oops, unable to copy");
  }
});

// Set color to the heading

document.addEventListener("DOMContentLoaded", function () {
  let initialColor1 = 137;
  let initialColor2 = 51;
  let initialColor3 = 129;
  let colorRange = 100;

  let heading = document.getElementById("heading");
  let text = heading.innerText || heading.textContent;
  let lettersArray = text.split("");
  heading.innerHTML = "";

  lettersArray.forEach((element) => {
    let elementTag = document.createElement("span");
    elementTag.innerHTML = element;
    elementTag.style.color =
      "rgb(" +
      getRandomInt(
        initialColor1 - colorRange / 2,
        initialColor1 + colorRange / 2
      ) +
      ", " +
      (initialColor2 - colorRange / 2, initialColor2 + colorRange / 2) +
      ", " +
      (initialColor3 - colorRange / 2, initialColor3 + colorRange / 2);

    // console.log(
    //   "rgb(" +
    //     getRandomInt(
    //       initialColor1 - colorRange / 2,
    //       initialColor1 + colorRange / 2
    //     ) +
    //     ", " +
    //     (initialColor2 - colorRange / 2, initialColor2 + colorRange / 2) +
    //     ", " +
    //     (initialColor3 - colorRange / 2, initialColor3 + colorRange / 2)
    // );

    heading.append(elementTag);
  });
});

// MAIN FUCKING FUNCTION

function mainFunction() {
  let inputValue = input.value;
  let inputArray = [...inputValue];
  let finalArray = [];

  inputArray.forEach((element) => {
    let formattedElement = element.toLowerCase();
    let index = chars[formattedElement];

    if (index) {
      let letter = chars[formattedElement];
      let letterLength = Object.values(letter).length;
      // console.log(letterLength);

      let randomLetter = letter[getRandomInt(0, letterLength - 1)];

      finalArray.push(randomLetter);
    } else {
      finalArray.push(element);
    }
  });

  // console.log(finalArray.join(""));
  output.value = finalArray.join("");
  handleHistory(output.value);
}

// Add generated nicknames to history

function handleHistory(element) {
  if (output.value.length > 0) {
    let history = document.getElementById("history");
    let historyParent = document.getElementById("history-wrap");
    let historyElement = document.createElement("div");
    let historyElementNumber = document.createElement("p");
    let historyElementInput = document.createElement("input");

    historyElement.classList.add("history__item");
    historyElementInput.value = output.value;

    historyElement.append(historyElementNumber);
    historyElement.append(historyElementInput);
    history.append(historyElement);

    let historyLength = history.children.length;
    console.log(historyLength);

    if (historyLength > 0) {
      let buttonCheck = historyParent.querySelector("button");

      if (!buttonCheck) {
        let historyClear = document.createElement("button");
        historyClear.innerHTML = "Очистить историю";
        historyClear.classList.add("clear-history");
        historyParent.prepend(historyClear);

        historyClear.addEventListener("click", function () {
          history.innerHTML = "";
        });
      }
    }

    for (let i = 0; i < historyLength; i++) {
      let element = history.children[i].querySelector("p");
      element.innerHTML = i + 1;
    }

    historyElementInput.addEventListener("click", function () {
      historyElementInput.focus();
      historyElementInput.select();
    });
  }
}

function randomNick() {
  let nounsLength = russianNouns.length;
  let adjectivesLength = russianAdjectives.length;

  let randomNoun = russianNouns[getRandomInt(0, nounsLength)];
  let randomAdjective = russianAdjectives[getRandomInt(0, adjectivesLength)];
  console.log(randomNoun);
  console.log(randomAdjective);

  input.value = randomAdjective + " " + randomNoun;
  mainFunction();
}
