const config = {
  enteringMessage: () => localStorage['enteringMessage'] || chrome.i18n.getMessage('defaultEnteringMessage'),
  setEnteringMessage: (enteringMessage) => localStorage['enteringMessage'] = enteringMessage,
  voiceName: () => localStorage['voiceName'],
  setVoiceName: (voiceName) => localStorage['voiceName'] = voiceName
};
