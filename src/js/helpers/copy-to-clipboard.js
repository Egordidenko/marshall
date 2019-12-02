export default el => {
  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    const oldContentEditable = el.contentEditable,
        oldReadOnly = el.readOnly,
        range = document.createRange();
    // for ios
    el.contentEditable = true;
    el.readOnly = false;
    range.selectNodeContents(el);

    const s = window.getSelection();
    s.removeAllRanges();
    s.addRange(range);

    el.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.

    el.contentEditable = oldContentEditable;
    el.readOnly = oldReadOnly;
  } else {
    // for windows
    el.select();
  }

  document.execCommand('copy');
}
