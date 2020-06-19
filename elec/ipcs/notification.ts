import { ipcMain, IpcMainEvent, Notification, NotificationConstructorOptions } from 'electron';

import { IpcEvents } from '../../shared/events';
import { IpcImpl } from './impl';
import { MP_APP_NAME } from '../../shared/constants';

class NotificationManager implements IpcImpl {
  constructor() {
    ipcMain.on(IpcEvents.notification, this._notify);
  }

  private _notify = (_: IpcMainEvent, { title, body }: NotificationConstructorOptions) => {
    const notification = new Notification({
      title: title ? `${MP_APP_NAME} ${String(title)}` : title,
      body,
      silent: false,
    });
    notification.show();
    setTimeout(() => {
      notification.close();
    }, 1000);
  };

  destroy(): void {
    ipcMain.off(IpcEvents.notification, this._notify);
  }

}

export { NotificationManager };