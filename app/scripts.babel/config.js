const config = {
  enteringMessage: () => localStorage['enteringMessage'] || '%name% is joined',
  setEnteringMessage: (enteringMessage) => localStorage['enteringMessage'] = enteringMessage,
  voiceName: () => localStorage['voiceName'],
  setVoiceName: (voiceName) => localStorage['voiceName'] = voiceName
};
