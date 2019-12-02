export default e => {
  if ('composedPath' in e) return e.composedPath();
  if ('path' in e) return e.path;
  //polyfill
  const path = [];
  let currentElem = e.target;
  while (currentElem) {
    path.push(currentElem);
    currentElem = currentElem.parentElement;
  }
  if (path.indexOf(window) === -1 && path.indexOf(document) === -1) path.push(document);
  if (path.indexOf(window) === -1) path.push(window);
  return path;
}
