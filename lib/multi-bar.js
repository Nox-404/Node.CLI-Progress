const _Terminal = require('./terminal');
const _BarElement = require('./generic-bar');
const _options = require('./options');

// Progress-Bar constructor
module.exports = class MultiBar{

    constructor(options, preset){
        // list of bars
        this.bars = [];

        // parse+store options
        this.options = _options.parse(options, preset);

        // disable synchronous updates
        this.options.synchronousUpdate = false;

        // store terminal instance
        this.terminal = (this.options.terminal) ? this.options.terminal : new _Terminal(this.options.stream);

        // the update timer
        this.timer = null;

        // progress bar active ?
        this.isActive = false;
    }

    // add a new bar to the stack
    create(total, startValue, payload){
        // create new bar element
        const bar = new _BarElement(this.options);

        // store bar
        this.bars.push(bar);

        // multiprogress already active ?
        if (!this.isActive){
            // save current cursor settings
            this.terminal.cursorSave();

            // hide the cursor ?
            if (this.options.hideCursor === true){
                this.terminal.cursor(false);
            }

            // disable line wrpaping ?
            if (this.options.linewrap === false){
                this.terminal.lineWrapping(false);
            }
    
            // initialize update timer
            this.timer = setTimeout(this.update.bind(this), 500);
        }

        // set flag
        this.isActive = true;

        // start progress bar
        bar.start(total, startValue, payload);

        // return new instance
        return bar;
    }

    // remove a bar from the stack
    remove(bar){
        // find element
        const index = this.bars.indexOf(bar);

        // element found ?
        if (index < 0){
            return false;
        }

        // remove element
        this.bars.splice(index, 1);

        // force update
        this.update();

        // clear bottom
        this.terminal.newline();
        this.terminal.clearBottom();

        return true;
    }

    // internal update routine
    update(){
        // stop timer
        if (this.timer){
            clearTimeout(this.timer);
            this.timer = null;
        }
        
        // reset cursor
        this.terminal.cursorRelativeReset();

        // update each bar
        for (let i=0; i< this.bars.length; i++){
            // add new line ?
            if (i > 0){
                this.terminal.newline();
            }

            // render
            this.bars[i].render();
        }

        // next update
        this.timer = setTimeout(this.update.bind(this), this.options.throttleTime);
    }

    stop(){

        // stop timer
        clearTimeout(this.timer);
        this.timer = null;

        // set flag
        this.isActive = false;

        // cursor hidden ?
        if (this.options.hideCursor === true){
            this.terminal.cursor(true);
        }

        // re-enable line wrpaping ?
        if (this.options.linewrap === false){
            this.terminal.lineWrapping(true);
        }

        // reset cursor
        this.terminal.cursorRelativeReset();

        // clear line on complete ?
        if (this.options.clearOnComplete){
            // clear all bars
            this.terminal.clearBottom();

            // restore cursor on complete (position + settings)
            this.terminal.cursorRestore();

        // or show final progress ?
        }else{
            // update each bar
            for (let i=0; i< this.bars.length; i++){
                // add new line ?
                if (i > 0){
                    this.terminal.newline();
                }

                // trigger final rendering
                this.bars[i].render();

                // stop
                this.bars[i].stop();
            }

            // new line on complete
            this.terminal.newline();
        }
    }
}