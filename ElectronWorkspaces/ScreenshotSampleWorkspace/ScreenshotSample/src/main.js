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

app.on('ready', ()=>{
    console.log('Electron Ready!!');
})