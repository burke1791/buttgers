let regexp = /rutgers/gi;
let buttgers = 'Buttgers';

let startReplace = new Timeout(getBodyAndReplace, 0);
let intervalReplace = new Interval(getBodyAndReplace, 1000);

document.body.addEventListener('keydown', e => {
  intervalReplace.clear();
  startReplace.clear();
  startReplace.set(function() {
    intervalReplace.set(getBodyAndReplace, 1000);
  }, 5000);
});

function Timeout(handler, interval) {
  this.id = setTimeout(handler, interval);
  this.cleared = false;

  this.set = function(handler, interval) {
    if (this.cleared) {
      this.id = setTimeout(handler, interval);
      this.cleared = false;
    }
  }

  this.clear = function() {
    clearTimeout(this.id);
    this.cleared = true;
  }
}

function Interval(handler, interval) {
  this.id = setInterval(handler, interval);
  this.cleared = false;

  this.set = function(handler, interval) {
    if (this.cleared) {
      this.id = setInterval(handler, interval);
      this.cleared = false;
    }
  }

  this.clear = function() {
    clearInterval(this.id);
    this.cleared = true;
  }
}


function getBodyAndReplace() {
  console.log('replace');
  let body = document.body;
  replaceRutgers(body);
}

function replaceRutgers(node) {
  if (!node.hasChildNodes()) {
    if (node.nodeType == 3) {
      node.textContent = node.textContent.replace(regexp, buttgers);
    }
    return;
  } else if (node.nodeName.toLowerCase() != 'script' && node.nodeName.toLowerCase() != 'style') {
    let childCount = node.childNodes.length;
    for (var i = 0; i < childCount; i++) {
      replaceRutgers(node.childNodes[i]);
    }
  }
}