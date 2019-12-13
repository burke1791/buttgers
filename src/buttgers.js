MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

let regexp = /rutgers/gi;
let buttgers = 'Buttgers';

let mutationMetrics = {
  prev: new Date(),
  count: 0
}

let main = document.body;

// getBodyAndReplace();

// let replace = setInterval(getBodyAndReplace, 1000);

let startReplace = new Timeout(getBodyAndReplace, 0);
let intervalReplace = new Interval(getBodyAndReplace, 1000);

// let startReplace = setTimeout(getBodyAndReplace, 0);
// clearTimeout(startReplace);

main.addEventListener('keydown', e => {
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

let mutationFlag = true;


function getBodyAndReplace() {
  console.log('replace');
  let body = document.body;
  replaceRutgers(body);

  if (mutationFlag) {
    // let body = document.getElementsByTagName('body');
    // let bodyLength = body.length;

    

    // if (bodyLength) {
    //   for (var i = 0; i < bodyLength; i++) {
    //     replaceRutgers(body.item(i));
    //   }
    // }

    // mutationFlag = false;
  }
}

function replaceRutgers(node) {
  updateMutationCount();

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

function updateMutationMetrics() {
  let now = new Date();

  if (now - mutationMetrics.prev >= 1000) {
    resetMutationCount();
  } else {
    updateMutationCount()
  }
}

function updateMutationCount() {
  let newCount = mutationMetrics.count++;
  mutationMetrics.count = newCount;
}

function resetMutationCount(timestamp) {
  console.log('mutations reset');
  mutationMetrics.prev = timestamp;
  mutationMetrics.count = 0;
}


var observer = new MutationObserver(function(mutations) {
  // fired when a mutation occurs
  mutations.forEach(mutation => {
    updateMutationMetrics();

    if (mutationMetrics.count < 5) {
      replaceRutgers(mutation.target);
      // getBodyAndReplace();
    } else {
      console.log('mutation limit reached');
    }
  });
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback

// might need to get rid of the mutation observer and just do it on an interval
// observer.observe(document.body, {
//   subtree: true,
//   attributes: true
// });

// in case some resources are slow to load, this should catch them
document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    getBodyAndReplace();
  }
}