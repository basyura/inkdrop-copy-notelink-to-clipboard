"use babel";

import { CompositeDisposable } from "event-kit";
import { clipboard } from "electron";

class CopyNotelinkToClipboard {
  subscriptions = new CompositeDisposable();
  /*
   *
   */
  activate() {
    const { commands } = inkdrop;
    this.subscriptions.add(
      commands.add(document.body, {
        "copy-notelink-to-clipboard:copy": this.copy,
      })
    );
  }
  /*
   *
   */
  deactivate() {
    this.subscriptions.dispose();
  }
  /*
   *
   */
  copy = () => {
    const id = inkdrop.getActiveEditor().props.noteId;
    const title = document.querySelector(".editor-title-input input").value;
    clipboard.writeText(`[${title}](${id})`);
  };
}

const plugin = new CopyNotelinkToClipboard();

module.exports = {
  activate() {
    plugin.activate();
  },
  deactivate() {
    plugin.deactivate();
  },
};
