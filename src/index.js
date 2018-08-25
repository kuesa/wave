//index file

sidebar = document.getElementById('sidebar');
content = document.getElementById('content');

//handles user clicking through different page tabs, and sets other tabs as inactive
function loadTab(linkName, tabName) {
  var currentLink = sidebar.getElementsByClassName('active');
  var currentTab = content.getElementsByClassName('active');
  var newLink = document.getElementById(linkName);
  var newTab = document.getElementById(tabName);

  currentLink[0].setAttribute('class', '');
  currentTab[0].setAttribute('hidden', '');
  currentTab[0].setAttribute('class', '');

  newLink.setAttribute('class', 'active');
  newTab.removeAttribute('hidden');
  newTab.setAttribute('class', 'active');
}
