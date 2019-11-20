console.log('test');

let regexp = /rutgers/gi;
let butgers = 'Butgers';

let body = document.getElementsByTagName('body');
let bodyLength = body.length;

if (bodyLength) {
  for (var i = 0; i < bodyLength; i++) {
    replaceRutgers(body.item(i));
  }
}

function replaceRutgers(parent) {
  if (parent.tagName != 'SCRIPT') {
    if (parent.childElementCount) {
      let childCount = parent.childElementCount;
      if (checkChildrenForContentTags(parent)) {
        for (var j = 0; j < childCount; j++) {
          replaceRutgers(parent.children[j]);
        }
      } else {
        if (parent.textContent.toLowerCase().includes('rutgers')) {
          console.log('replacing: ' + parent.textContent);
          parent.textContent = parent.textContent.replace(regexp, butgers);
        }
        return;
      }
    } else {
      if (parent.textContent.toLowerCase().includes('rutgers')) {
        console.log('replacing: ' + parent.textContent);
        parent.textContent = parent.textContent.replace(regexp, butgers);
      }
      return;
    }
  }
  return;
}

function checkChildrenForContentTags(parent) {
  let contentFlag = false;
  let childCount = parent.childElementCount;

  for (var i = 0; i < childCount; i++) {
    let tag = parent.children[i].tagName;
    if (tag == 'DIV' || tag == 'SECTION' || tag == 'FOOTER' || tag == 'P' || tag == 'UL' || tag == 'OL' || tag == 'LI' || tag.includes('H')) {
      contentFlag = true;
    }
  }

  return contentFlag;
}