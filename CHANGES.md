## Branch 3.x ##

### 3.0.0 ###

* Added: multi-progressbar support - feature requested [on GitHub](https://github.com/AndiDittrich/Node.CLI-Progress/issues/26)
* Added: option `synchronousUpdate` to control the synchronized redraw during `update()` call (default=`true`)
* Changed: project split into multiple classes
* Changed: default cli progress output is written to `stdout` instead of `stderr`

## Branch 2.x ##

### 2.1.1 ###

* Bugifx: preset object got altered by options - thanks to [rvalitov on GitHub](https://github.com/AndiDittrich/Node.CLI-Progress/issues/27) #27

### 2.1.0 ###

* Added: `align` option to change the position of the progress bar (left, center, right) - thanks to [sidneys on GitHub](https://github.com/AndiDittrich/Node.CLI-Progress/pull/22) #22
* Changed: ETA value of type `Infinity` is displayed as **INF**, `NaN` as **NULL** - feature requested by [AxelTerizaki on GitHub](https://github.com/AndiDittrich/Node.CLI-Progress/issues/21) #21
* Changed: Limited the maximum ETA value to `100000s` (**INF** is displayed in this case)
* Changed: ETA calculation moved to own scope
* Bugfix: example `example-notty.php` was broken

### 2.0.0 ###

Upgrade is possible without any code modifications! requires **node.js 4**

* Added: option `linewrap` to disable terminal line wrapping (default)
* Changed: requires **node.js >= 4**
* Changed: Native ES2015 class syntax
* Changed: renamed application entry file to `cli-progress.js`
* Changed: low-level terminal interactions are encapsulated within `Terminal` class
* Changed: terminal/cursor settings are restored after progress bar stopped
* Bugfix: used hex ascii escape sequences instaed of octals to avoid javascript errors in recent nodejs version
* Bugfix: disabled line wrapping by default to avoid multiple line breaks on small terminals (cut on the right) - reported by [puppeteer701 on GitHub](https://github.com/AndiDittrich/Node.CLI-Progress/issues/20) #20

## Branch 1.x ##

### 1.8.0 ###
* Added: method `setTotal()` to manipulate the total value within running progress-bar - feature requested by [ReggaePanda on GitHub](https://github.com/AndiDittrich/Node.CLI-Progress/issues/19) #19
* Changed: moved example file to `examples/` directory

### 1.7.0 ###
* Added: payload argument to `increment()` - feature requested by [dsego on GitHub](https://github.com/AndiDittrich/Node.CLI-Progress/issues/18) #18

### 1.6.1 ###
* Bugfix: `roundTo` parameter was not set for `elapsedTime` calculation which caused raw float values within formatted time strings - thanks to [rekinyz on GitHub](https://github.com/AndiDittrich/Node.CLI-Progress/pull/16) #16

### 1.6.0 ###
* Added: Additional payload data which can be used as **custom-tokens** within the bar - thanks to [tobiasps on GitHub](https://github.com/AndiDittrich/Node.CLI-Progress/pull/15) #15

### 1.5.1 ###
* Bugfix: Progressbar cannot be initialized to 0% - thanks to [erikkallen on GitHub](https://github.com/AndiDittrich/Node.CLI-Progress/pull/14) #13
* Bugfix: ETA was **NULL** in case the progress bar is initialized with (0/0)

### 1.5.0 ###
* Added: **0** values for total/progress initialization are allowed - feature requested by [jfmmm on GitHub](https://github.com/AndiDittrich/Node.CLI-Progress/issues/11) #11

### 1.4.0 ###
* Added: **Preset/Theme support**. Different bar-styles can be loaded from internal library (in addition to full customization)
* Added: Dependency **colors** for colorized progress bars 
* Added: Preset `legacy`
* Added: Preset `shades-classic`
* Added: Preset `shades-grey`
* Added: Preset `rect`

### 1.3.1 ###
* Added: `example-notty` to test the behaviour of progress bar in non-interactive environments (input streams closed)
* Bugfix: `update()` throws an error in **non-tty** environments - reported by [Ognian on GitHub](https://github.com/AndiDittrich/Node.CLI-Progress/issues/9) #9

### 1.3.0 ###
* Added: `stopOnComplete` option to automatically call `stop()` when the value reaches the total - thanks to [lennym on GitHub](https://github.com/lennym) #7

### 1.2.0 ###
* Added: `increment()` method to increase the current progress relatively - thanks to [lennym on GitHub](https://github.com/lennym) #6
* Added: ETA time formatting options (mm:ss, hh:mm, ss) - thanks to [lennym on GitHub](https://github.com/lennym) #5
* Improvement: More accurate ETA calculation using linear estimation of last N values - thanks to [lennym on GitHub](https://github.com/lennym) #4
* Bugfix: FPS calculation error which caused performance issues - thanks to [lennym on GitHub](https://github.com/lennym) #7

### 1.1.2 ###
* Bugfix: stdout.cursorTo/stdout.clearLine is not a function; replaced by `readline` - thanks to [remcoder on GitHub](https://github.com/AndiDittrich/Node.CLI-Progress/pull/2)

### 1.1.1 ###
* Bugfix: Hide cursor options was enabled by default

### 1.1.0 ###
* Added: Support for synchronous operations (interval has been replaced by timeout and throttle time) - feature requested [GitHub](https://github.com/AndiDittrich/Node.CLI-Progress/issues/1)
* Added: Synchronous Operation Example `example-synchronous.js`
* Added: Option to hide the cursor `options.hideCursor` - default set to false
* Changed: Improved ETA calculation

### 1.0.1 ###
* Bugfix: the bar-size is limited to `options.barsize` - in some (numerical) situations it can be too long (n+1)

### 1.0.0 ###
* Initial public release