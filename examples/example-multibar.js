const _progress = require('../cli-progress');

const files = {
    'eta.js        ': 187,
    'generic-bar.js': 589,
    'multi-bar.js  ': 5342,
    'options.js    ': 42,
    'single-bar.js ': 2123,
    'terminal.js   ': 4123
};
const bars = [];

// create new container
const multibar = new _progress.MultiBar({
    format: ' {bar} | "{file}" | {value}/{total}',
    hideCursor: true,
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591'

});

console.log("Downloading files..\n");

// add bars
for (const filename in files){
    const size = files[filename];

    bars.push(multibar.create(size, 0, {file: filename}));
}

const timer = setInterval(function(){

    // flag
    let downloadPending = false;

    // increment
    for (let i=0; i<bars.length;i++){
        const bar = bars[i];

        // download complete ?
        if (bar.value < bar.total){
            downloadPending = true;
            bar.increment();
        }
    }

    // stop progress bar ?
    if (downloadPending === false){
        clearInterval(timer);

        multibar.stop();
    }
}, 10);