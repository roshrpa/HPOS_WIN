const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('hposPrint', (html) => ipcRenderer.invoke('print-html', html));
