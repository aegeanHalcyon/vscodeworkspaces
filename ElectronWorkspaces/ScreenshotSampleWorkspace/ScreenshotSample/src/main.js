const electron = require('electron');

const { app,
        BrowserWindow,
        Menu,
        globalShortcut,
        Tray,
        clipboard
        } = electron;

const path = require('path')

const url = require('url');

var mainWindow;

app.on('ready', ()=>{
    
   mainWindow = new BrowserWindow({
       width:0,
       height:0,
       resizable:false,
       frame:false
       
   });

   //mainWindow.openDevTools();

   mainWindow.loadURL(`file://${__dirname}/html/capture.html`)

   mainWindow.on('close',()=>{
       mainWindow=null;
   });

   globalShortcut.register('Ctrl+Alt+D',()=>{
      // console.log('Got shortcut');
      mainWindow.webContents.send('capture',app.getPath('desktop'));

   });

});

