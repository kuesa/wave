// Instrument creation/management
const Tone = require('tone');

// Instrument array storage
var instruments = new Array();
var instrumentList = document.getElementById('instrumentList');

// Instrument count, a cheap fix to prevent duplicate default names.
var insCount = 1;

// Instrument settings container, and other stuff
var instrumentSettingsContainer = document.getElementById('instrumentSettings');

// Pulse width and pwm sliders, hidden based on what instrument is selected.
var pWidthContainer = document.getElementById('pulseWidth');
var modFreqContainer = document.getElementById('modFreq');
var pWidthSlider = document.getElementById('pWidthSlider');
var modFreqSlider = document.getElementById('modFreqSlider');
var pWidthText = document.getElementById('pWidthText');
var modFreqTest = document.getElementById('modFreqText');

// TODO: Make the settings pretty.

function addInstrument(noise = false) {
  // When user clicks "create instrument", default instrument is created and added to array, text is added to list. It will also add noise synths, if you tell it to.
  if (noise == false) {
    var synth = new Tone.Synth({
      oscillator: {
        type: 'pulse',
        width: 0
      },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 0.1
      }
    }).toMaster();
  } else {
    var synth = new Tone.NoiseSynth({
      noise: {
        type: 'white'
      },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0
      }
    }).toMaster();
  }

  instruments.push(synth);

  // Refresh instrument list on pattern tab
  // TODO: Make this more robust, have all of the changes happen here.
  addOption("Instrument" + insCount);

  // Creates list element with text name in field.
  // TODO: Low Priority, fix adding instrument numbers that adds based on numbers missing instead of just increasing every new addition.
  var node = document.createElement('li');
  var textnode = document.createTextNode('Instrument ' + insCount);
  insCount++;

  node.appendChild(textnode);

  // Setting instrument to "active" so that when it is created it is highlighted
  var current = instrumentList.getElementsByClassName('active');
  if (current[0] != null) {
    current[0].setAttribute('class', '');
  }

  node.setAttribute('class', 'active');
  node.onclick = function() {
    setActive(node);
  };

  instrumentList.appendChild(node);
  changeDisplay(node);
}

function removeInstrument() {
  // TODO: Fix removal of instruments. How can you take it out and preserve the name? Something iterative?
  instRm = instrumentList.getElementsByClassName('active');
  instruments.splice(nodeIndex(instRm[0]), 1);
  instrumentList.removeChild(instRm[0]);
  
  // Removes instrument from Pattern menu
  removeOption(nodeIndex(instRm));

  changeDisplay();
}

// Onclick callback for when an instrument is clicked, it will be highlighted on the list
function setActive(insID) {
  let current = instrumentList.getElementsByClassName('active');
  if (current[0] != null) {
    current[0].setAttribute('class', '');
  }
  insID.setAttribute('class', 'active');
  changeDisplay(insID);
}

// Choses whether or not to display pulse/pwm info, and auto-fills other info.
function changeDisplay(inst = null) {
  let waveformSelector = document.getElementById('waveformSelector');
  let instrumentNameContainer = document.getElementById('instName');

  if (inst !== null) {
    let actualInst = instruments[nodeIndex(inst)];
    // Unhides all settings
    instrumentSettingsContainer.removeAttribute('hidden');
    instrumentNameContainer.value = inst.innerHTML;

    // Determines what slider to display, and noise vs regular
    if (typeof actualInst.oscillator !== 'undefined') {
      switch (actualInst.oscillator.type) {
        case 'pulse':
          pWidthContainer.removeAttribute('hidden');
          pWidthSlider.value = actualInst.oscillator.width.value;
          modFreqContainer.setAttribute('hidden', '');
          waveformSelector.selectedIndex = 0;
          break;
        case 'pwm':
          pWidthContainer.setAttribute('hidden', '');
          modFreqContainer.removeAttribute('hidden');
          modFreqSlider.value = actualInst.oscillator.modulationFrequency.value;
          waveformSelector.selectedIndex = 3;
          break;
        case 'triangle':
          pWidthContainer.setAttribute('hidden', '');
          modFreqContainer.setAttribute('hidden', '');
          waveformSelector.selectedIndex = 2;
          break;
        case 'sawtooth':
          pWidthContainer.setAttribute('hidden', '');
          modFreqContainer.setAttribute('hidden', '');
          waveformSelector.selectedIndex = 1;
          break;
        default:
          pWidthContainer.setAttribute('hidden', '');
          modFreqContainer.setAttribute('hidden', '');
          break;
      }
    } else if (typeof actualInst.noise !== 'undefined') {
      pWidthContainer.setAttribute('hidden', '');
      modFreqContainer.setAttribute('hidden', '');
      waveformSelector.selectedIndex = 4;
    }
  } else {
    // Hides all settings
    pWidthContainer.setAttribute('hidden', '');
    modFreqContainer.setAttribute('hidden', '');
    instrumentSettingsContainer.setAttribute('hidden', '');
  }
}

// Changes instrument name and list name
function changeInstName(instrumentName) {
  let instCh = instrumentList.getElementsByClassName('active');
  instCh[0].innerHTML = instrumentName;

  // Changes instrument name in pattern menu
  changeOption(nodeIndex(instCh[0]), instrumentName);
}

// Callback when user changes waveform on drop-down box
function changeWaveform(waveform) {
  let instCh = instrumentList.getElementsByClassName('active');
  if (typeof instruments[nodeIndex(instCh[0])].oscillator !== 'undefined') {
    if (waveform != 'noise') {
      instruments[nodeIndex(instCh[0])].oscillator.type = waveform;
    } else {
      instruments[nodeIndex(instCh[0])] = new Tone.NoiseSynth({
        noise: {
          type: 'white'
        },
        envelope: {
          attack: instruments[nodeIndex(instCh[0])].envelope.attack.value,
          decay: instruments[nodeIndex(instCh[0])].envelope.decay.value,
          sustain: instruments[nodeIndex(instCh[0])].envelope.sustain.value,
          release: instruments[nodeIndex(instCh[0])].envelope.release.value
        }
      }).toMaster();
    }
  } else if (typeof instruments[nodeIndex(instCh[0])].noise !== 'undefined') {
    instruments[nodeIndex(instCh[0])] = new Tone.Synth({
      oscillator: {
        type: waveform
      },
      envelope: {
        attack: instruments[nodeIndex(instCh[0])].envelope.attack.value,
        decay: instruments[nodeIndex(instCh[0])].envelope.decay.value,
        sustain: instruments[nodeIndex(instCh[0])].envelope.sustain.value,
        release: instruments[nodeIndex(instCh[0])].envelope.release.value
      }
    }).toMaster();
  }
  changeDisplay(instCh[0]);
}

// Callback when user moves pulse width slider
function changePulseWidth(pulseWidthValue) {
  let instCh = instrumentList.getElementsByClassName('active');
  let pulseInst = instruments[nodeIndex(instCh[0])];
  pulseInst.oscillator.width.value = pulseWidthValue;
  pWidthText.innerHTML = pulseWidthValue;
}

// Callback when user moves mod freq slider
function changeModulationFrequency(modulationFrequency) {
  let instCh = instrumentList.getElementsByClassName('active');
  let pwmInst = instruments[nodeIndex(instCh[0])];
  pwmInst.oscillator.modulationFrequency.value = modulationFrequency;
  modFreqTest.innerHTML = modulationFrequency;
}

// Callback for changing attack
function changeAttack(attack) {
  let instCh = instrumentList.getElementsByClassName('active');
  let inst = instruments[nodeIndex(instCh[0])];
  inst.envelope.attack.value = attack;
}

// Callback for changing decay
function changeDecay(decay) {
  let instCh = instrumentList.getElementsByClassName('active');
  let inst = instruments[nodeIndex(instCh[0])];
  inst.envelope.decay.value = decay;
}

// Callback for changing sustain
function changeSustain(sustain) {
  let instCh = instrumentList.getElementsByClassName('active');
  let inst = instruments[nodeIndex(instCh[0])];
  inst.envelope.sustain.value = sustain;
}

// Callback for changing release
function changeRelease(release) {
  let instCh = instrumentList.getElementsByClassName('active');
  let inst = instruments[nodeIndex(instCh[0])];
  inst.envelope.release.value = release;
}

// Indexing a NodeList, which is needed in the removeInstrument() function because "instrument" is not an array
function nodeIndex(el) {
  let children = el.parentNode.childNodes,
    i = 0;
  for (; i < children.length; i++) {
    if (children[i] == el) {
      return i;
    }
  }
  return -1;
}
