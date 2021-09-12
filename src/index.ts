// 参考：https://qiita.com/professor/items/1861ff80e689a377899a
// Thanks　@professor

// import sourceMapSupport from 'source-map-support';
// sourceMapSupport.install();

import { BrowserWindow, app, App } from 'electron';
import path from 'path';

class ElectronFrame {
  private mainWindow: BrowserWindow | null = null;
  private app: App;
  private mainURL: string = `file://${__dirname}/index.html`;

  constructor(app: App) {
    this.app = app;
    this.app.on('window-all-closed', this.onWindowAllClosed.bind(this));
    this.app.on('ready', this.create.bind(this));
    this.app.on('activate', this.onActivated.bind(this));
  }

  private onWindowAllClosed() {
    this.app.quit();
  }

  private create() {
    this.mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      minWidth: 500,
      minHeight: 200,
      acceptFirstMouse: true,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },

      // titleBarStyle: 'hidden'
    });

    this.mainWindow.loadURL(this.mainURL);

    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });

    // this.mainWindow.webContents.openDevTools();
  }

  private onReady() {
    this.create();
  }

  private onActivated() {
    if (this.mainWindow === null) {
      this.create();
    }
  }
}

const MyApp: ElectronFrame = new ElectronFrame(app);
