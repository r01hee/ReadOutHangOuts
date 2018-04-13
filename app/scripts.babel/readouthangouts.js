'use strict';

class ReadOutHangOuts {

  onAddIcon(mutations)
  {
    const div = $(mutations[0].addedNodes[0]).children('div:nth-child(2)');
    if (div.length == 1) {
      const message =  config.enteringMessage().replace(/%name%/g, $(div).text());
      this.say(message);
    }
  }

  setupIconObserver() {
    const $div = $('div');
    let observer = null;

    $div.each((i, ele) => {
      const $ele = $(ele);
      if( (!$ele.attr('jscontroller')) &&
        $ele.children('div:first') &&
        $ele.children('div:first').children('div:nth-child(1)') &&
        $($ele.children('div:first').children('div:nth-child(1)')).attr('role') == 'button' // mute button
      ) {
        observer = new MutationObserver((t,o) => {this.onAddIcon(t,o);});
        observer.observe(ele, {
          childList: true,
          subtree: true
        });
        return false;
      }
    });

    if (observer === null) {
      setTimeout(() => {this.setupIconObserver()}, 500);
      return;
    }
  }

  onAddMessage(mutations) {
    mutations[0].addedNodes.forEach((n) => {
      const spans = $(n).find('span');
      this.say($(spans.get(0)).text() + ' ' + $(spans.get(1)).text());
    });
  }

  setupMessageObserver() {
    const $input = $('input');

    let observer = null;
    $input.each((i, ele) => {
      let target = $(ele);
      while (true) {
        const p = target.parent();
        if (p.length == 0) {
          break;
        }

        const jsmodel = p.attr('jsmodel');

        if (jsmodel) {
          let messageArea = null;
          target.children('div').each((_i, e) => {
            if ($(e).attr('jscontroller')) {
              messageArea = e;
              return false;
            }
          });
          if (messageArea) {
            observer = new MutationObserver((t,o) => {this.onAddMessage(t,o);});
            observer.observe($(messageArea).get(0), {
                childList: true,
            });
            return false;
          }
        }

        if (observer) {
          return false;
        }
        target = p;
      }
    });

    if (observer === null) {
      setTimeout(() => {this.setupMessageObserver()}, 500);
      return;
    }
  }

  setupSynth(isSecondTime = false) {
    if (!isSecondTime) {
      this.synth = new SpeechSynthesisUtterance();
    }
    this.voices = speechSynthesis.getVoices();
    if (!this.synth || this.voices.length == 0) {
      setTimeout(() => this.setupSynth(true), 250);
      return;
    }
    this.synth.voice = this.voices.find((v) => v.name == config.voiceName);
    speechSynthesis.cancel();
  }

  say(message) {
    if (!this.synth) {
      return;
    }
    this.synth.text  = message;
    speechSynthesis.speak(this.synth);
  }

  setup() {
    this.setupMessageObserver();
    this.setupIconObserver();
    this.setupSynth();
  }
}
