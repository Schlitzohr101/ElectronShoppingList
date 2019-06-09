const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;

//listener for app ready
app.on("ready", WindowInit); //plant reference for init funciton

function WindowInit() {
    //instatiate main appilcation window
    mainWindow = new BrowserWindow({});

    //load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    //Construct menu from the template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    //Set the menu
    Menu.setApplicationMenu(mainMenu);
}

const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item',
            },
            {
                label: 'Clear List',
            },
            {
                label: 'Quit',
                click() {
                    app.quit();
                }
            }
        ]
    }
];