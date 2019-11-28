MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

let regexp = /rutgers/gi;
let buttgers = 'Buttgers';

getBodyAndReplace();

function getBodyAndReplace() {
  let body = document.getElementsByTagName('body');
  let bodyLength = body.length;

  if (bodyLength) {
    for (var i = 0; i < bodyLength; i++) {
      replaceRutgers(body.item(i));
    }
  }
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

var observer = new MutationObserver(function(mutations, observer) {
  // fired when a mutation occurs
  getBodyAndReplace();
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  attributes: true
});

// in case some resources are slow to load, this should catch them
document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    getBodyAndReplace();
  }
}