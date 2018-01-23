
const electron = require('electron');

const { app, BrowserWindow } = electron;

const path = require('path')

const url = require('url');

const countdown = require('./src/UtilClasses/countdown')

const ipc = electron.ipcMain;

//var mainWindow = null;

const windows = [];

app.on('ready', Main)

function Main() {

    [1, 2, 3].forEach(_ => {
        var win = new BrowserWindow({
                height: 400,
                width: 400
            })
             //console.log('Creating new window')
            // mainWindow = new BrowserWindow({
            //         height: 768,
            //         width: 1024
            //     })
            // console.log('mainWindow Created');


        //mainWindow.webContents.openDevTools();
        // countdown();

        // let p = path.join(__dirname, './src/HTML/countdown.html');

        // console.log(p);
        win.loadURL(url.format({
            pathname: path.join(__dirname, './src/HTML/countdown.html'),
            protocol: 'file',
            slashes: true
        }));

        win.on('closed', () => {
            // console.log('mainWindow closed');
            mainWindow = null;
        });

        windows.push(win);

        ipc.on('countdown-start', () => {

            countdown(count => {
                windows.forEach(win => {
                        console.log("loop ${count}")
                        if (win != null)
                            win.webContents.send('countdown', count);
                    })
                    //mainWindow.webContents.send('countdown', count);
            });
        });
    });

}