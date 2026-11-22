const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
let mainWin = null;
function createWindow() {
  const win = new BrowserWindow({
    width: 1366, height: 820, backgroundColor: '#ffffff', title: 'Hollywood POS',
    webPreferences: { contextIsolation: true, nodeIntegration: false, preload: path.join(__dirname, 'preload.js') }
  });
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, 'app', 'index.html'));
  mainWin = win;
  win.on('closed', () => { mainWin = null; });
}
// Silent customer-bill printing to the Windows default printer (80mm thermal roll)
ipcMain.handle('print-html', (ev, html) => new Promise((resolve) => {
  const w = new BrowserWindow({ show: false, webPreferences: { contextIsolation: true, nodeIntegration: false } });
  const done = (r) => { try { w.destroy(); } catch (e) {} resolve(r); };
  w.webContents.on('did-finish-load', () => {
    setTimeout(() => {
      w.webContents.print({ silent: true, printBackground: false, margins: { marginType: 'none' }, pageSize: { width: 80000, height: 297000 } },
        (ok, err) => done(ok ? { ok: true } : { ok: false, err: err || 'print failed' }));
    }, 300);
  });
  w.webContents.on('did-fail-load', () => done({ ok: false, err: 'load failed' }));
  w.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(String(html)));
}));
const lock = app.requestSingleInstanceLock();
if (!lock) { app.quit(); } else {
  // Opening the app again (double click, shortcut) brings the running window to the front instead of starting a second copy
  app.on('second-instance', () => {
    if (!mainWin) { createWindow(); return; }
    if (mainWin.isMinimized()) mainWin.restore();
    mainWin.show();
    mainWin.setAlwaysOnTop(true); mainWin.focus(); mainWin.setAlwaysOnTop(false);
  });
  app.whenReady().then(createWindow);
  app.on('window-all-closed', () => app.quit());
}
