import { app, BrowserWindow } from 'electron';
import { posix } from 'path';
import { format } from 'url';

import { cleanupIpcs, initIpcs } from './elec/ipcs';
import { removeMenu } from './elec/util';

const args = process.argv.slice(1);
const serve = args.some((v) => v === '--serve');

let win: BrowserWindow = null;

function createWindow() {
  win = new BrowserWindow({
    width: 800 || 400,
    height: 600 || 300,
    minWidth: 500,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
}

function clean() {
  win = null;
  cleanupIpcs();
}

function onReady() {
  createWindow();

  removeMenu();

  initIpcs();

  if (serve) {
    // win.webContents.openDevTools();
  }

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require('electron')
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(
      format({
        pathname: posix.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
  }

  win.on('close', () => clean());
}

app.whenReady().then(onReady);

app.on('window-all-closed', () => {
  if (process.platform === 'darwin') {
    return;
  }
  app.quit();
});

app.on('activate', () => {
  if (!win) {
    createWindow();
  }
});
