//index file

sidebar = document.getElementById('sidebar');
content = document.getElementById('content');

//handles user clicking through different page tabs, and sets other tabs as inactive
function loadTab(linkName, tabName) {
  var currentLink = sidebar.getElementsByClassName('activeNav');
  var currentTab = content.getElementsByClassName('activeNav');
  var newLink = document.getElementById(linkName);
  var newTab = document.getElementById(tabName);

  currentLink[0].setAttribute('class', '');
  currentTab[0].setAttribute('hidden', '');
  currentTab[0].setAttribute('class', '');

  newLink.setAttribute('class', 'activeNav');
  newTab.removeAttribute('hidden');
  newTab.setAttribute('class', 'activeNav');
}
