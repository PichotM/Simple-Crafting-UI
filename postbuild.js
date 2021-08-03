const fs = require('fs-extra')
const path = require('path')
const folder = "E://Users//Pichot//Desktop//GTA//Prod//resources//crafting//ui"
fs.removeSync(folder)
fs.mkdirSync(folder)

function copyFileSync( source, target ) {

    var targetFile = target;

    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync( source, target, first ) {
    var files = [];

    var targetFolder = path.join( target, first ? "" : path.basename( source ) );
    if ( !fs.existsSync( targetFolder ) && !first ) {
        fs.mkdirSync( targetFolder );
    }

    if ( fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source );
        files.forEach( function ( file ) {
            var curSource = path.join( source, file );
            if ( fs.lstatSync( curSource ).isDirectory() ) {
                copyFolderRecursiveSync( curSource, targetFolder );
            } else {
                copyFileSync( curSource, targetFolder );
            }
        })
    }
}  

copyFolderRecursiveSync('..\\dist\\', folder, true)