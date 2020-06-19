import { NotificationManager } from './notification';

const ctors = [
  NotificationManager,
];

const ipcs = [];

export function initIpcs(): void {
  cleanupIpcs();
  for (const ctor of ctors) {
    ipcs.push(new ctor());
  }
}

export function cleanupIpcs(): void {
  for (const ipc of ipcs) {
    ipc.destroy();
  }
  ipcs.length = 0;
}