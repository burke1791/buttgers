let regexp = /rutgers/gi;
let buttgers = 'Buttgers';

let startReplace = new Timer(getBodyAndReplace, 0, setTimeout, clearTimeout);
let intervalReplace = new Timer(getBodyAndReplace, 1000, setInterval, clearInterval);

startReplace.set();
intervalReplace.set();

document.body.addEventListener('keydown', e => {
  intervalReplace.clear();
  startReplace.clear();
  startReplace.set(function() {
    intervalReplace.set(getBodyAndReplace, 1000);
  }, 5000);
});

function Timer(handler, interval, timerFunc, clearTimer) {
  this.id = null;
  this.cleared = true;
  this.handler = handler;
  this.interval = interval;
  this.timerFunc = timerFunc;
  this.clearTimer = clearTimer;

  this.set = function() {
    if (this.cleared) {
      this.id = this.timerFunc(this.handler, this.interval);
      this.cleared = false;
    }
  }

  this.clear = function() {
    this.clearTimer(this.id);
    this.cleared = true;
  }
}

function getBodyAndReplace() {
  let body = document.body;
  replaceRutgers(body);
}

function replaceRutgers(node) {
  let childFlag = node.hasChildNodes();

  if (!childFlag) {
    return;
  } else if (!childFlag && node.nodeType == 3) {
    node.textContent = node.textContent.replace(regexp, buttgers);
  } else if (node.nodeName.toLowerCase() != 'script' && node.nodeName.toLowerCase() != 'style') {
    let childCount = node.childNodes.length;
    for (var i = 0; i < childCount; i++) {
      replaceRutgers(node.childNodes[i]);
    }
  }
}