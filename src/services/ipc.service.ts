import { Injectable } from '@angular/core';
import { IpcRenderer, NotificationConstructorOptions } from 'electron';
import { IpcEvents } from 'shared/events';

export interface IpcRendererFunction {
  (event: Electron.IpcRendererEvent, ...args: any[]): void;
}

@Injectable({
  providedIn: 'root'
})
export class IpcService {
  ipcRenderer: IpcRenderer;

  constructor() {
    if (!window.require) throw Error('electron load failed');
    this.ipcRenderer = window.require('electron').ipcRenderer;
  }

  _getListeners = (event: string) => {
    return this.ipcRenderer.listeners(event);
  };

  _emit = (event: string, ...args: any[]) => {
    this.ipcRenderer.emit(event, ...args);
  };

  _on = (channel: string, fn: IpcRendererFunction) => {
    this.ipcRenderer.on(channel, fn);
  };

  _off = (channel: string, fn: IpcRendererFunction) => {
    this.ipcRenderer.off(channel, fn);
  };

  _removeListeners = (channel: string) => {
    this.ipcRenderer.removeAllListeners(channel);
  };

  notify(p: NotificationConstructorOptions) {
    this.ipcRenderer.send(IpcEvents.notification, p);
  }
}
