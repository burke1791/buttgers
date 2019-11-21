// need to defensively declare variables because the code runs more than once without cleaning up

if (typeof regexp == undefined) {
  let regexp = /rutgers/gi;
}
regexp = /rutgers/gi;

if (typeof buttgers == undefined) {
  let buttgers = 'Buttgers';
}
buttgers = 'Buttgers';

if (typeof body == undefined) {
  let body = document.getElementsByTagName('body');
}
body = document.getElementsByTagName('body');

if (typeof bodyLength == undefined) {
  let bodyLength = body.length;
}
bodyLength = body.length;

if (bodyLength) {
  for (var i = 0; i < bodyLength; i++) {
    replaceRutgers(body.item(i));
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

// in case some resources are slow to load, this should catch them
document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    if (bodyLength) {
      for (var i = 0; i < bodyLength; i++) {
        replaceRutgers(body.item(i));
      }
    }
  }
}