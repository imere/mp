const EVENTS = {
  notification: null
};

for (const k of Object.keys(EVENTS)) {
  EVENTS[k] = k;
}

export const IpcEvents: Readonly<{
  [K in keyof typeof EVENTS]: K
}> = Object.freeze(EVENTS);
