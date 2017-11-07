const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const knex = require('knex')({
  client: 'pg',
  version: '7.4.0',
  connection: {
    host : '127.0.0.1',
    user : 'gsluss',
    password : '',
    database : 'stocker'
  }
})


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win


const dummyData = [{
  id: 1,
  BuyDate: 12345,
  Symbol: "foo",
  Notes: "this is a great trade",
  Entry: 2,
  Support: 1.9,
  Target: 5,
  Share: 10,
  Price: 2,
  Commis: 0.1,
  SellDate: 54321,
  Shares: 10,
  NumSold: 10,
  SellPrice: 6,
  SellCommis: 0.4
},
{
  id: 2,
  BuyDate: 12345,
  Symbol: "foo",
  Notes: "this is a great trade",
  Entry: 20,
  Support: 19,
  Target: 25,
  Share: 10,
  Price: 2,
  Commis: 0.1,
  SellDate: '',
  Shares: 10,
  NumSold: 10,
  SellPrice: 6,
  SellCommis: 0.4
}]

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: '//localhost:5000/',
    protocol: 'http:',
    slashes: true
  }))

  // Open the DevTools.
  // win.webContents.openDevTools()

  ipcMain.on('data', (event, arg) => {
    console.log('got some data', arg)
    if(arg.method === 'get') {
      //get some data
      knex.select().from('stocks').on('query-response', (x) => {
        event.sender.send('data', x)        
      }).then(() => {})
    } else if(arg.method === 'increment') {
      const empty = {
        BuyDate: null,
        Symbol: null,
        Notes: null,
        Entry: null,
        Support: null,
        Target: null,
        Share: null,
        Price: null,
        Commis: null,
        SellDate: null,
       // Shares: null,
        NumSold: null,
        SellPrice: null,
        SellCommis: null
      }
      knex('stocks').insert(empty).then(() => {
        knex.select().from('stocks').on('query-response', (x) => {}).then((x) => event.sender.send('data', x))
      })
    } else if(arg.method === 'update') {
      //update the row at the column with the data
      knex('stocks')
        .where('id', '=', arg.row)
        .update(arg.data)
        .then((x) => {
          console.log(x)
          // event.sender.send()
        })
    }
  })


  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

function createDatabase () {
  knex.schema.createTableIfNotExists('stocks', function (table) {
    table.increments()
    table.integer('BuyDate')
    table.string('Symbol')
    table.string('Notes')
    table.decimal('Entry')
    table.decimal('Support')
    table.decimal('Target')
    table.integer('Share')
    table.decimal('Price')
    table.decimal('Commis')
    table.integer('SellDate')
 // table.decimal('Shares')
    table.integer('NumSold')
    table.decimal('SellPrice')
    table.decimal('SellCommis')
  }).then(() => {}) 
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createDatabase()
  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.