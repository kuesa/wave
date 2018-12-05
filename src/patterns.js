//pattern creation/management

patternTable = document.getElementById('patternTable');

// create table elements. 16(max pattern size) x 96(number of different notes)
for (let i = 0; i < 96; i++) {
  var tr = patternTable.insertRow();
  for (let j = 0; j < 16; j++) {
    var td = tr.insertCell();
    td.innerHTML = '*';
    td.onclick = function() {
      this.innerHTML = 'x';
    };
  }
}
