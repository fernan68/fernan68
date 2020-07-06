'use babel';

import Fernan68 from '../lib/fernan68';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Fernan68', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('fernan68');
  });

  describe('when the fernan68:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.fernan68')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'fernan68:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.fernan68')).toExist();

        let fernan68Element = workspaceElement.querySelector('.fernan68');
        expect(fernan68Element).toExist();

        let fernan68Panel = atom.workspace.panelForItem(fernan68Element);
        expect(fernan68Panel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'fernan68:toggle');
        expect(fernan68Panel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.fernan68')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'fernan68:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let fernan68Element = workspaceElement.querySelector('.fernan68');
        expect(fernan68Element).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'fernan68:toggle');
        expect(fernan68Element).not.toBeVisible();
      });
    });
  });
});
