const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addWindow;

app.on('ready', function(){
    // creates new window
    mainWindow = new BrowserWindow({
        width: 600,
        height: 600,	      
        minWidth: 1000,
        minHeight: 600,
        frame: false
    });

    mainWindow.openDevTools({detach: true});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file',
        slashes: true
    }));

    mainWindow.once('ready-to-show', function(){
        mainWindow.show();
    });

    // stop app when closed
    mainWindow.on('closed', function(){
        app.quit();
    });

    // build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    Menu.setApplicationMenu(mainMenu);
});

function createAddWindow(){
     // creates new window
     addWindow = new BrowserWindow({
         width: 300,
         height: 200,
         title: 'add to do list item'
     });

     addWindow.loadURL(url.format({
         pathname: path.join(__dirname, 'addWindow.html'),
         protocol: 'file',
         slashes: true
     }));

     // garbage collection
     addWindow.on('close', function(){
        addWindow = null;
     });
     
}

function createMessageWindow(){
    // creates new window
    messageWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Messages'
    });

    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'messageWindow.html'),
        protocol: 'file',
        slashes: true
    }));

    // garbage collection
    addWindow.on('close', function(){
       addWindow = null;
    });
}


// menu template 
const mainMenuTemplate = [
    {
        label: 'file',
        submenu: [
            {
                label: 'Add Games',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'Remove Games'
            },
            {
                label: 'Sign Out',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

// if mac, add empty object to menu
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

// add dev tools item if not in prod
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}