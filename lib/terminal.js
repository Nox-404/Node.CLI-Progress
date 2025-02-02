const _readline = require('readline');

// low-level terminal interactions
class Terminal{

    constructor(outputStream){
        this.stream = outputStream;

        // default: line wrapping enabled
        this.linewrap = true;

        // current, relative y position
        this.dy = 0;
    }

    // save cursor position + settings
    cursorSave(){
        // save position
        this.stream.write('\x1B7');
    }

    // restore last cursor position + settings
    cursorRestore(){
        // restore cursor
        this.stream.write('\x1B8');
    }

    // show/hide cursor
    cursor(enabled){
        if (enabled){
            this.stream.write('\x1B[?25h');
        }else{
            this.stream.write('\x1B[?25l');
        }
    }

    // change cursor positionn
    cursorTo(x=null, y=null){
        // move cursor absolute
        _readline.cursorTo(this.stream, x, y);
    }

    // change relative cursor position
    cursorRelative(dx=null, dy=null){
        // store current position
        this.dy = this.dy + dy;
        
        // move cursor relative
        _readline.moveCursor(this.stream, dx, dy);
    }

    // relative reset
    cursorRelativeReset(){
        // move cursor to initial line
        _readline.moveCursor(this.stream, 0, -this.dy);

        // first char
        _readline.cursorTo(this.stream, 0, null);

        // reset counter
        this.dy = 0;
    }

    // clear to the right from cursor
    clearRight(){
        _readline.clearLine(this.stream, 1);
    }

    // clear the full line
    clearLine(){
        _readline.clearLine(this.stream, 0);
    }

    // clear everyting beyond the current line
    clearBottom(){
        _readline.clearScreenDown(this.stream);
    }

    // add new line; increment counter
    newline(){
        this.stream.write('\n');
        this.dy++;
    }

    // write content to output stream
    // @TODO use string-width to strip length
    write(s){
        // line wrapping enabled ? trim output
        if (this.linewrap === true){
            this.stream.write(s.substr(0, this.getWidth()));
        }else{
            this.stream.write(s);
        }
    }

    // control line wrapping
    lineWrapping(enabled){
        // store state
        this.linewrap = enabled;
        if (enabled){
            this.stream.write('\x1B[?7h');
        }else{
            this.stream.write('\x1B[?7l');
        }
    }

    // tty environment ?
    isTTY(){
        return (this.stream.isTTY === true);
    }

    // get terminal width
    getWidth(){
        return this.stream.columns || 80;
    }
}

module.exports = Terminal;
