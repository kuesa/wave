//instrument creation/management
const Tone = require('tone');

//instrument array storage
var instrumentsEnv = new Array();
var instrumentsOsc = new Array();
var instrumentList = document.getElementById('instrumentList');

function addInstrument() {
  //when user clicks "create instrument", default instrument is created and added to array, text is added to list
  var ampEnv = new Tone.AmplitudeEnvelope({
    attack: 0.1,
    decay: 0.2,
    sustain: 1.0,
    release: 0.8
  }).toMaster();

  var osc = new Tone.PulseOscillator({
    width: 0.5
  })
    .connect(ampEnv)
    .start();

  instrumentsEnv.push(ampEnv);
  instrumentsOsc.push(osc);

  var node = document.createElement('li');
  var textnode = document.createTextNode(
    'Instrument ' + (instrumentsEnv.indexOf(ampEnv) + 1)
  );

  node.appendChild(textnode);
  node.setAttribute('id', instrumentsEnv.indexOf(ampEnv));

  var current = instrumentList.getElementsByClassName('active');
  if (current[0] != null) {
    current[0].setAttribute('class', '');
  }

  node.setAttribute('class', 'active');
  node.onclick = function() {
    setActive(node.id);
  };

  instrumentList.appendChild(node);
}

function removeInstrument() {
  //TODO: Fix removal of instruments. How can you take it out and preserve the name? Something iterative?
  instRm = instrumentList.getElementsByClassName('active');
  instrumentsOsc.splice(instRm[0].id, 1);
  instrumentsEnv.splice(instRm[0].id, 1);
  instrumentList.removeChild(instRm[0]);
}

function setActive(insID) {
  instrument = document.getElementById(insID);
  var current = instrumentList.getElementsByClassName('active');
  if (current[0] != null) {
    current[0].setAttribute('class', '');
  }
  instrument.setAttribute('class', 'active');
}

function testPlay() {
  instruments[0].triggerAttackRelease('C4', '8n');
}
