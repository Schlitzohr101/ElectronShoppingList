const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

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


function addItemWindow() {
    addWindow = new BrowserWindow({
        height: 200,
        width: 300,
    });

    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true,
    }));
}

//Top bar navigation menu template
const mainMenuTemplate = [
    {
        //first lable on bar
        label: 'File',
        submenu: [
            {
                label: 'Add Item',
                //construct item creation window upon click
                click() {
                    addItemWindow();
                }
            },
            {
                label: 'Clear List',
            },
            {
                label: 'Quit',
                //adding shortcut for quit requires knowledge of platform the application is running on

                accelerator: (process.platform.includes('darwin') ? "Command+Q" :  "Ctrl+Q"),
                click() {
                    app.quit();
                }
            }
        ]
    }
];