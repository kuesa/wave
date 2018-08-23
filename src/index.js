//index file
function loadInstrumentsTab() {
  //change menu highlights
  document.getElementById('instrumentLink').className = 'active';
  document.getElementById('patternLink').className = 'inactive';
  document.getElementById('sequencerLink').className = 'inactive';
  document.getElementById('fileLink').className = 'inactive';

  //load sub-page content
  document.getElementById('instrumentTab').removeAttribute('hidden');
  document.getElementById('patternTab').setAttribute('hidden', '');
  document.getElementById('sequenceTab').setAttribute('hidden', '');
  document.getElementById('fileTab').setAttribute('hidden', '');
}

function loadPatternsTab() {
  //change menu highlights
  document.getElementById('instrumentLink').className = 'inactive';
  document.getElementById('patternLink').className = 'active';
  document.getElementById('sequencerLink').className = 'inactive';
  document.getElementById('fileLink').className = 'inactive';

  //load sub-page content
  document.getElementById('instrumentTab').setAttribute('hidden', '');
  document.getElementById('patternTab').removeAttribute('hidden');
  document.getElementById('sequenceTab').setAttribute('hidden', '');
  document.getElementById('fileTab').setAttribute('hidden', '');
}

function loadSequencerTab() {
  //change menu highlights
  document.getElementById('instrumentLink').className = 'inactive';
  document.getElementById('patternLink').className = 'inactive';
  document.getElementById('sequencerLink').className = 'active';
  document.getElementById('fileLink').className = 'inactive';

  //load sub-page content
  document.getElementById('instrumentTab').setAttribute('hidden', '');
  document.getElementById('patternTab').setAttribute('hidden', '');
  document.getElementById('sequenceTab').removeAttribute('hidden');
  document.getElementById('fileTab').setAttribute('hidden', '');
}

function loadFileTab() {
  //change menu highlights
  document.getElementById('instrumentLink').className = 'inactive';
  document.getElementById('patternLink').className = 'inactive';
  document.getElementById('sequencerLink').className = 'inactive';
  document.getElementById('fileLink').className = 'active';

  //load sub-page content
  document.getElementById('instrumentTab').setAttribute('hidden', '');
  document.getElementById('patternTab').setAttribute('hidden', '');
  document.getElementById('sequenceTab').setAttribute('hidden', '');
  document.getElementById('fileTab').removeAttribute('hidden');
}
