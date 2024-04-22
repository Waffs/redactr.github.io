const originalText = document.getElementById("originalText");
const wordsToScrambleInput = document.getElementById("wordsToScramble");
const replacementInput = document.getElementById("replacement");
const redactButton = document.getElementById("redactButton");
const scrambledTextOutput = document.getElementById("scrambledText");
const statsOutput = document.getElementById("stats");

redactButton.addEventListener("click", function() {
  const originalTextValue = originalText.value;
  const wordsToScramble = wordsToScrambleInput.value.split(" ");
  const replacement = replacementInput.value || "*";
  const startTime = performance.now();

  let scrambledText = originalTextValue;
  let wordsScanned = 0;
  let wordsMatched = 0;
  let charactersScrambled = 0;

  for (const word of wordsToScramble) {
    const regex = new RegExp("\\b" + word + "\\b", "gi");
    wordsScanned += originalTextValue.split(/\W+/).length;
    const matches = scrambledText.match(regex);
    if (matches) {
      wordsMatched += matches.length;
      charactersScrambled += matches[0].length * replacement.length;
      scrambledText = scrambledText.replace(regex, replacement.repeat(word.length));
    }
  }

  const endTime = performance.now();
  const timeTaken = (endTime - startTime) / 1000;

  scrambledTextOutput.innerText = scrambledText;
  statsOutput.innerHTML = `
    <p>Words Scanned: ${wordsScanned}</p>
    <p>Words Matched: ${wordsMatched}</p>
    <p>Characters Scrambled: ${charactersScrambled}</p>
    <p>Time Taken: ${timeTaken.toFixed(2)} seconds</p>
  `;
});
