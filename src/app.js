import { toSentenceCase } from 'js-convert-case';

const attemptDelay = 200;
const maxWaitForText = 3; //in seconds
const maxAttempTime = 30; //in seconds

const maxLoops = (maxWaitForText * 1000) / attemptDelay;
const maxAttempts = (maxAttempTime * 1000) / attemptDelay;

var loops = 0;
var attempts = 0;

function waitForCanvasReadyState() {
  attempts += 1;
  if (attempts > maxAttempts) {
    console.log('max attempts reached, exiting');
    return;
  }
  if (window.canvasReadyState === 'complete') {
    console.log('canvas loading is complete');
    sentenceCase();
  } else {
    setTimeout(waitForCanvasReadyState, attemptDelay);
  }
}

function sentenceCase() {
  const node = document.querySelector('#content');
  if (node) {
    const allNodes = node.querySelectorAll('*');
    console.log('allNodes length: ', allNodes.length);
    const textNodes = Array.from(allNodes).filter(
      (item) => !item.children.length && `${item.innerText}`.length !== 0
    );
    if (textNodes) {
      if (textNodes.length > 0) {
        loops += 1;
        attempts -= 1;
        textNodes.forEach((item) => {
          item.innerText = toSentenceCase(item.innerText);
        });
        if (loops < maxLoops) {
          console.log('Updated text %d times out of %d.', loops, maxLoops);
          setTimeout(waitForCanvasReadyState, attemptDelay);
          return;
        } else {
          console.log(
            'Updated text %d times out of %d. Exiting',
            loops,
            maxLoops
          );
          return;
        }
      }
    }
  }
  setTimeout(waitForCanvasReadyState, attemptDelay);
}

setTimeout(waitForCanvasReadyState, attemptDelay);
