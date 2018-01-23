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

//const ipc = electron.ipcMain;

const STACK_SIZE = 5;
const ITEM_MAX_LENGTH = 20;

var  trayApp = null;

app.on('ready', ()=>{

    var stack = [];
    SetupTray();

    checkClipboardForChange(clipboard, text =>{
       stack = addToStack(text,stack);

      trayApp.setContextMenu(Menu.buildFromTemplate(formatMenuTemplateForStack(clipboard,stack)))
      registerShortcuts(globalShortcut, clipboard, stack)
    });

});

app.on('will-quit', ()=>{
    globalShortcut.unregisterAll();
})

function registerShortcuts(globalShortcut,clipboard,stack){

    globalShortcut.unregisterAll();

    for(let i = 0; i < stack.length-1; ++i){
        
        console.log("i:",i);
        console.log("stack[index]",stack[i]);

        globalShortcut.register(`Ctrl+Alt+${i+1}`, _ =>{
           
            clipboard.writeText(stack[i]);
        })
    }
}

function formatItem(item){

    return item && item.length > ITEM_MAX_LENGTH 
    ? item.substr(0, ITEM_MAX_LENGTH) + '...'
    : item;

}

function formatMenuTemplateForStack(clipboard, stack){
    return stack.map((item,i) =>{
        return {
               label: `Copy: ${formatItem(item)}`,
               click: ()=>clipboard.writeText(item),
               accelerator:`Ctrl+Alt+${i+1}`
        }
    });
}

function checkClipboardForChange(clipboard, onChange){

    let cache = clipboard.readText();
    let latest;

    setInterval(()=>{
        latest = clipboard.readText();
        
        if(latest !== cache){
            cache = latest;
            onChange(cache);
        };
    },1000);
};

function SetupTray()
{
    trayApp = new Tray(path.join(__dirname,'./Resources/Icons/application.ico'));

    let contextMenu = Menu.buildFromTemplate([
        {
            label: `<<Empty>>`,
            enabled:false,
            click: ()=>{
                    console.log('Tray Item Clicked');
            }
        }
    ]);

    trayApp.setContextMenu(contextMenu);
    trayApp.setToolTip("Menu Test Tray Item Tooltip");
}

function addToStack(item,stack){
    return [item].concat(stack.length >= STACK_SIZE ? stack.slice(0,stack.length - 1) : stack);
}

