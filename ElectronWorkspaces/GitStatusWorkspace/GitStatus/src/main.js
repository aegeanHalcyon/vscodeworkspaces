
const electron = require('electron');
const {app, BrowserWindow} = electron;

var mainWindow;

app.on('ready',()=>{
    
    mainWindow = new BrowserWindow({
        width:400,
        height:400
    })

    mainWindow.webContents.openDevTools();
    mainWindow.loadURL(`file://${__dirname}/html/status.html`);

    mainWindow.on('close', ()=>{
        mainWindow=null;
    })
})