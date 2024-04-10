const tree = document.getElementById('tree');
tree.addEventListener('click', function(event) {
  if (event.target.tagName !== 'SPAN') {
    return;
  }

  const parentDiv = event.target.closest('div');
  const childrenContainer = parentDiv.querySelector('.sub-tree');
  if (!childrenContainer) {
    return;
  }

  childrenContainer.hidden = !childrenContainer.hidden;
});