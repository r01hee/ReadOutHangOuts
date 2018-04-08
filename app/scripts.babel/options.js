'use strict';

let voices = null;

function setupVoices()
{
  voices = speechSynthesis.getVoices();
  if (voices.length == 0) {
    setTimeout(()=>setupVoices(), 250);
    return;
  }
  const $select = $('#voice');
  voices.forEach((v) => {
    const isSelected = v.name == config.voiceName();
    const opt = $('<option>').val(v.name).text(v.name).prop('selected', isSelected);
    $select.append(opt);
  });
}

$(() => {
  setupVoices();
  $('#entering_message').val(config.enteringMessage());
  const $saveButton = $('#save');
  $saveButton.on('click', ()=> {
    config.setVoiceName($('#voice').val());
    config.setEnteringMessage($('#entering_message').val());
    $saveButton.prop('disabled', true);
    setTimeout(() => {
      $saveButton.prop('disabled', false);
    }, 300);
  });
});
