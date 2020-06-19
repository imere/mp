import { Menu } from 'electron';

function setMenu(menu: Menu) {
  Menu.setApplicationMenu(menu);
}

function removeMenu() {
  setMenu(null);
}

export { setMenu, removeMenu };
