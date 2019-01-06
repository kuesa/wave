// Pattern creation/management

var instrumentSelector = document.getElementById('instrumentSelector');

patternTable = document.getElementById('patternTable');

// Create table elements. 16(max pattern size) x 96(number of different notes)
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

function addOption(name) {
  let option = document.createElement("option");
  option.text = name;
  instrumentSelector.add(option);
}

function removeOption(index){
  instrumentSelector.remove(index);
}

function changeOption(index, newName){
  let options = instrumentSelector.options;
  options[index].text = newName;
}
