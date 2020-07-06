'use babel';

import Fernan68View from './fernan68-view';
import { CompositeDisposable } from 'atom';

export default {

  fernan68View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.fernan68View = new Fernan68View(state.fernan68ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.fernan68View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'fernan68:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.fernan68View.destroy();
  },

  serialize() {
    return {
      fernan68ViewState: this.fernan68View.serialize()
    };
  },

  toggle() {
    console.log('Fernan68 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
