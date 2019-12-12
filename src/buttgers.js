MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

let regexp = /rutgers/gi;
let buttgers = 'Buttgers';

let mutationMetrics = {
  prev: new Date(),
  count: 0
}

let mutationFlag = true;

getBodyAndReplace();

setInterval(getBodyAndReplace, 5000);

function getBodyAndReplace() {
  if (mutationFlag) {
    let body = document.getElementsByTagName('body');
    let bodyLength = body.length;

    if (bodyLength) {
      for (var i = 0; i < bodyLength; i++) {
        replaceRutgers(body.item(i));
      }
    }

    mutationFlag = false;
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