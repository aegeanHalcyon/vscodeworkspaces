
const electron = require('electron');

const { app,
        BrowserWindow,
        Menu,
        globalShortcut,
        Tray
        } = electron;

const path = require('path')

const url = require('url');

//const ipc = electron.ipcMain;
var  mainWin = null;
var  trayApp = null;

app.on('ready', ()=>{

    mainWin = new BrowserWindow();

    RegisterMainWindowEvents();

    LoadMainWindowLayout();

    LoadMainMenus();

    SetupTray();

});

function SetupTray()
{
    trayApp = new Tray(path.join(__dirname,'./Resources/Icons/application.ico'));

    let contextMenu = Menu.buildFromTemplate([
        {
            label: `Sample Tray Txt`,
            click: ()=>{
                    console.log('Tray Item Clicked');
            }
        },
        {
            label:`Second Tray Item`,
            click:()=>{
                console.log('Second tray item clicked');
            }
        }
    ]);

    trayApp.setContextMenu(contextMenu);
    trayApp.setToolTip("Menu Test Tray Item Tooltip");
}

function LoadMainWindowLayout()
{
    mainWin.loadURL(url.format({
        pathname: path.join(__dirname, './Layout/main.html'),
        protocol: 'file',
        slashes: true
    }));
}

function RegisterMainWindowEvents()
{
    mainWin.on('closed', () => {
        // console.log('mainWindow closed');
        mainWindow = null;
    });
}

function LoadMainMenus()
{
    const name = electron.app.getName();

    const template = [
        {
            label: name,
            submenu: [{
                label: `About ${name}`,
                click: ()=>{
                    console.log('About Clicked')
                }

            },
            {
                type:'separator'
            },
            {
                label:'Quit',
                click: ()=>{
                    app.quit();
                },
                accelerator: 'CommandOrControl+Q'
            }
           ]
        }
    ]

    const menu = Menu.buildFromTemplate(template);

    Menu.setApplicationMenu(menu);
}