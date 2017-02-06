const App = function() {
    this.board = null
    this.hasConflicted = null
    this.lineNumber = 4
    this.documentWidth = window.screen.availWidth
    this.gridContainerWidth = this.documentWidth * 0.92
    this.cellSideWidth = this.documentWidth * 0.18
    this.spaceWidth = this.documentWidth * 0.04

    this.startx = 0
    this.starty = 0
    this.endx = 0
    this.endy = 0

    this.gridContainer = $('#grid-container')
    this.gridCell = $('.grid-cell')

    this.startNewGame()
}
const log = function() {
    console.log.apply(console, arguments)
}
//开始新游戏
App.prototype.startNewGame = function() {
    this.adaptWidhScreen()
    this.drawChessboard()
    this.initChessNumber()
    this.generateOneNumber()
    this.generateOneNumber()
    this.drawTable()
    this.drawChess()
    this.bindEvents()
}
//初始化棋盘 获取每个格子相对左上角的top 偏移量
App.prototype.getPosTop = function(i, j) {
    return this.spaceWidth + (this.spaceWidth + this.cellSideWidth) * i
}
//初始化棋盘 获取每个格子相对左上角的left 偏移量
App.prototype.getPosLeft = function(i, j) {
    return this.spaceWidth + (this.spaceWidth + this.cellSideWidth) * j
}
//根据设备是移动端还是pc端调整组件大小
App.prototype.adaptWidhScreen = function() {
    if (this.documentWidth > 500) {
        this.gridContainerWidth = 500
        this.cellSideWidth = 100
        this.spaceWidth = 20
    }
}
//画出棋盘
App.prototype.drawChessboard = function() {
    var width = this.gridContainerWidth - (2 * this.spaceWidth)
    var height = this.gridContainerWidth - (2 * this.spaceWidth)
    var padding = this.spaceWidth
    var borderRadius = this.gridContainerWidth * 0.02
    this.gridContainer.css({
        "width": width,
        "height": height,
        "padding": padding,
        "border-radius": borderRadius
    })
}
//画出格子
App.prototype.drawTable = function() {
    var width = this.cellSideWidth
    var border = this.cellSideWidth * 0.06
    for (let i = 0; i < this.lineNumber; i++) {
        for (let j = 0; j < this.lineNumber; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j)
            var offsetTop = this.getPosTop(i, j)
            var offsetLeft = this.getPosLeft(i, j)
            var cssObject = {
                'width': width,
                'height': width,
                'border': border,
                'top': this.getPosTop(i, j),
                'left': this.getPosLeft(i, j)
            }
            gridCell.css(cssObject)
        }
    }
}
//将每个格子的数字初始化为0
App.prototype.initChessNumber = function() {
    this.board = new Array(this.lineNumber)
    this.hasConflicted = new Array(this.lineNumber)
    for (var i = 0; i < this.board.length; i++) {
        this.board[i] = new Array(this.lineNumber)
        this.board[i].fill(0)
        this.hasConflicted[i] = new Array(this.lineNumber)
        this.hasConflicted[i].fill(false)
    }
}
//在随机位置产生一个数字
App.prototype.generateOneNumber = function() {
    if (!this.hasSpace) {
        log('no space')
        return false
    }
    while (true) {
        var randx = parseInt(Math.floor(Math.random() * 4))
        var randy = parseInt(Math.floor(Math.random() * 4))
        if (this.board[randx][randy] === 0) {
            break
        }
    }
    var randNumber = Math.random() > 0.5 ? 2 : 4
    this.board[randx][randy] = randNumber
    this.showNumberWithAnimation(randx, randy, randNumber)

    return true
}
//将产生的数字显示
App.prototype.showNumber = function(obj, number, width) {
    var lineHeight = width + 'px'
    var fontSize = (width * 0.6) + 'px'
    var cssObject = {
        'line-height': lineHeight,
        'font-size': fontSize
    }

    obj.text(number)
    obj.css(cssObject)
}
//画出棋子
App.prototype.drawChess = function() {
    $('.number-cell').remove()
    var width = this.cellSideWidth

    for (let i = 0; i < this.lineNumber; i++) {
        for (let j = 0; j < this.lineNumber; j++) {
            var nowNumber = this.board[i][j]
            var id = "number-cell-" + i + "-" + j
            var numberCell = "<div class='number-cell' id=" + id + "></div>"

            this.gridContainer.append(numberCell)

            var theNumberCell = $('#number-cell-' + i + '-' + j)
            var cssObject = null
            var offsetTop = this.getPosTop(i, j)
            var offsetLeft = this.getPosLeft(i, j)
            var borderRadius = width * 0.06
            var backgroundColor = this.getNumberBackgroundColor(this.board[i][j])
            var fontColor = this.getNumberColor(this.board[i][j])
            if (nowNumber == 0) {
                cssObject = {
                    'width': 0,
                    'height': 0,
                    'top': offsetTop,
                    'left': offsetLeft,
                    "border-radius": borderRadius
                }
            } else {
                cssObject = {
                    'width': width,
                    'height': width,
                    'top': offsetTop,
                    'left': offsetLeft,
                    "border-radius": borderRadius,
                    'backgroundColor': backgroundColor,
                    'color':fontColor
                }
                this.showNumber(theNumberCell, nowNumber, width)
            }
            theNumberCell.css(cssObject)

            this.hasConflicted[i][j] = false
        }
    }
}
//获得数字颜色
App.prototype.getNumberColor = function(number) {
    if (number <= 4) {
        return "#776a65"
    }
    return "white"
}
//获得数字背景颜色
App.prototype.getNumberBackgroundColor = function(number) {

    switch (number) {
        case 2:
            return "#eee4da"
            break
        case 4:
            return "#ede0c8"
            break
        case 8:
            return "#f2b179"
            break
        case 16:
            return "#f59563"
            break
        case 32:
            return "#f67c5f"
            break
        case 64:
            return "#f65e3b"
            break
        case 128:
            return "#edcf72"
            break
        case 256:
            return "#edcc61"
            break
        case 512:
            return "#9c0"
            break
        case 1024:
            return "#33b5e5"
            break
        case 2048:
            return "#09c"
            break
        case 4096:
            return "#a6c"
            break
        case 8192:
            return "#93e"
            break
    }

    return "black"
}
//判断两个水平格子之间是否有其他非零的格子
App.prototype.noBlockHorizontal = function(i, k, j) {
    for (k = k + 1; k < j; k++) {
        if (this.board[i][k] !== 0) {
            return false
        }
    }
    return true
}
//判断两个垂直格子之间是否有其他非零的格子
App.prototype.noBlockVertical = function(i, k, j) {
    for (k = k + 1; k < j; k++) {
        if (this.board[k][i] !== 0) {
            return false
        }
    }
    return true
}
//判断是否还有空格
App.prototype.hasSpace = function() {
    for (let i = 0; i < this.lineNumber; i++) {
        for (let j = 0; j < this.lineNumber; j++) {
            var now = this.board[i][j]
            if (now === 0) {
                return true
            }
        }
    }
    return false
}
//判断是否能移动
App.prototype.canMove = function() {
    return this.canMoveLeft() || this.canMoveRight() || this.canMoveUp() || this.canMoveDown()
}
//判断是否能左移动
App.prototype.canMoveLeft = function() {
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            var now = this.board[i][j]
            var before = this.board[i][j - 1]
            if (now !== 0) {
                if (before === 0 || before == now) {
                    return true
                }
            }
        }
    }
    return false
}
//判断是否能右移动
App.prototype.canMoveRight = function() {
    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {
            var now = this.board[i][j]
            var before = this.board[i][j + 1]
            if (now !== 0) {
                if (before === 0 || before == now) {
                    return true
                }
            }
        }
    }
    return false
}
//判断是否能上移动
App.prototype.canMoveUp = function() {
    for (let i = 1; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            var now = this.board[i][j]
            var before = this.board[i - 1][j]
            if (now !== 0) {
                if (before === 0 || before == now) {
                    return true
                }
            }
        }
    }
    return false
}
//判断是否能下移动
App.prototype.canMoveDown = function() {
    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            var now = this.board[i][j]
            var before = this.board[i + 1][j]
            if (now !== 0) {
                if (before === 0 || before == now) {
                    return true
                }
            }
        }
    }
    return false
}
//向左移动
App.prototype.moveLeft = function() {
    if (!this.canMoveLeft()) {
        return false
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            var now = this.board[i][j]
            if (now !== 0) {
                for (var k = 0; k < j; k++) {
                    var before = this.board[i][k]
                    if (before === 0 && this.noBlockHorizontal(i, k, j)) {
                        //move
                        this.showMoveAnimation(i, j, i, k)
                        this.board[i][k] = now
                        this.board[i][j] = 0
                        break
                    } else if (now == before && this.noBlockHorizontal(i, k, j) && !this.hasConflicted[i][k]) {
                        //move
                        this.showMoveAnimation(i, j, i, k)
                        //add
                        this.board[i][k] += this.board[i][j]
                        this.board[i][j] = 0
                        this.hasConflicted[i][k] = true
                        break
                    }
                }
            }
        }

    }
    var _this = this
    setTimeout(function() {
        _this.generateOneNumber.apply(_this)
        _this.drawChess.apply(_this)
    }, 250)
    return true
}
//向右移动
App.prototype.moveRight = function() {
    if (!this.canMoveRight()) {
        return false
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            var now = this.board[i][j]
            if (now !== 0) {
                for (var k = 3; k > j; k--) {
                    var before = this.board[i][k]
                    if (before === 0 && this.noBlockHorizontal(i, j, k)) {
                        this.showMoveAnimation(i, j, i, k)
                        this.board[i][k] = now
                        this.board[i][j] = 0
                        break

                    } else if (now == before && this.noBlockHorizontal(i, j, k) && !this.hasConflicted[i][k]) {
                        this.showMoveAnimation(i, j, i, k)
                        //add
                        this.board[i][k] += this.board[i][j]
                        this.board[i][j] = 0
                        this.hasConflicted[i][k] = true
                        break
                    }
                }
            }

        }
    }
    var _this = this
    setTimeout(function() {
        _this.generateOneNumber.apply(_this)
        _this.drawChess.apply(_this)
    }, 250)
    return true
}
//向上移动
App.prototype.moveUp = function() {
    if (!this.canMoveUp()) {
        return false
    }
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var now = this.board[i][j]
            if (now !== 0) {
                for (var k = 0; k < i; k++) {
                    var before = this.board[k][j]
                    if (before === 0 && this.noBlockVertical(j, k, i)) {
                        this.showMoveAnimation(i, j, k, j)
                        this.board[k][j] = now
                        this.board[i][j] = 0
                        break

                    } else if (now == before && this.noBlockVertical(j, k, i) && !this.hasConflicted[k][j]) {
                        this.showMoveAnimation(i, j, k, j)
                        //add
                        this.board[k][j] += this.board[i][j]
                        this.board[i][j] = 0
                        this.hasConflicted[k][j] = true
                        break
                    }
                }
            }

        }
    }
    var _this = this
    setTimeout(function() {
        _this.generateOneNumber.apply(_this)
        _this.drawChess.apply(_this)
    }, 250)
    return true
}
//向下移动
App.prototype.moveDown = function() {
    if (!this.canMoveDown()) {
        return false
    }
    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            var now = this.board[i][j]
            if (now !== 0) {
                for (var k = 3; k > i; k--) {
                    var before = this.board[k][j]
                    if (before === 0 && this.noBlockVertical(j, i, k)) {
                        this.showMoveAnimation(i, j, k, j)
                        this.board[k][j] = now
                        this.board[i][j] = 0
                        break

                    } else if (now == before && this.noBlockVertical(j, i, k) && !this.hasConflicted[k][j]) {
                        this.showMoveAnimation(i, j, k, j)
                        //add
                        this.board[k][j] += this.board[i][j]
                        this.board[i][j] = 0
                        this.hasConflicted[k][j] = true
                        break
                    }
                }
            }

        }
    }
    var _this = this
    setTimeout(function() {
        _this.generateOneNumber.apply(_this)
        _this.drawChess.apply(_this)
    }, 250)
    return true
}
//显示移动动画
App.prototype.showMoveAnimation = function(fromx, fromy, tox, toy) {
    var numberCell = $(`#number-cell-${fromx}-${fromy}`)
    var top = this.getPosTop(tox,toy)
    var left = this.getPosLeft(tox,toy)
    numberCell.animate({
      'top': top,
      'left': left
    },200)
}
//显示棋子出现动画
App.prototype.showNumberWithAnimation = function(i, j, randNum) {
    var numberCell = $(`#number-cell-${i}-${j}`)
    var backgroundColor = this.getNumberBackgroundColor(randNum)
    var fontColor = this.getNumberColor(randNum)
    var width = this.cellSideLength
    var left = this.getPosLeft(i, j)
    var top = this.getPosTop(i, j)
	numberCell.css({
		"background-color": backgroundColor,
		"color": fontColor
	})
	numberCell.text(randNum)
	numberCell.animate({
		width: width,
		height: width,
		left: left,
		top: top
	},50);
}
//判断游戏是否结束
App.prototype.isGameOver = function() {
    if (!this.hasSpace() && !this.canMove()) {
        this.showGameOver()
    }
}
//显示游戏结束
App.prototype.showGameOver = function() {
    var message = $("<div class='gameover'><div class='gameover-message'><p>胜败乃兵家常事，</p><p>少侠请重新来过~</p></div></div>")
    this.gridContainer.append(message)
}
//绑定所有事件
App.prototype.bindEvents = function() {
    this.bindKeyboardEvent()
    this.bindMouseClickEvent()
    this.bindTouchEvent()
}
//绑定鼠标点击开始新游戏
App.prototype.bindMouseClickEvent = function() {
    var startButton = $('#newganmebutton')
    var _this = this
    startButton.on('click', function(event) {
        _this.startNewGame()
    })
}
//绑定键盘事件
App.prototype.bindKeyboardEvent = function() {
    var _this = this
    $(document).on('keyup', function(event) {
        event.preventDefault()
        var code = event.keyCode
        var leftCode = 37
        var rightCode = 39
        var upCode = 38
        var downCode = 40
        switch (code) {
            case leftCode:
                if (_this.moveLeft()) {
                    setTimeout(_this.isGameOver.bind(_this), 300)
                }
                break
            case upCode:
                if (_this.moveUp()) {
                    setTimeout(_this.isGameOver.bind(_this), 300)
                }
                break
            case rightCode:
                if (_this.moveRight()) {
                    setTimeout(_this.isGameOver.bind(_this), 300)
                }
                break
            case downCode:
                if (_this.moveDown()) {
                    setTimeout(_this.isGameOver.bind(_this), 300)
                }
                break
            default:

        }
    })
}
//绑定触摸事件
App.prototype.bindTouchEvent = function() {
    var _this = this
    this.gridContainer.on('touchstart', function(event) {
        _this.startx = event.originalEvent.touches[0].pageX
        _this.starty = event.originalEvent.touches[0].pageY
    })

    this.gridContainer.on('touchmove', function(event) {
        event.preventDefault()
    })

    this.gridContainer.on('touchend', function(event) {
        _this.endx = event.originalEvent.changedTouches[0].pageX
        _this.endy = event.originalEvent.changedTouches[0].pageY

        var deltaX = _this.endx - _this.startx
        var deltaY = _this.endy - _this.starty

        if (Math.abs(deltaX) < 0.1 * _this.documentWidth && Math.abs(deltaY) < 0.1 * _this.documentWidth) {
            return
        }

        if (Math.abs(deltaX) >= Math.abs(deltaY)) {
            if (deltaX > 0) {
                if (_this.moveRight()) {
                    setTimeout(_this.isGameOver.bind(_this), 300)
                }
            } else {
                if (_this.moveLeft()) {
                    setTimeout(_this.isGameOver.bind(_this), 300)
                }
            }
        } else {
            if (deltaY > 0) {
                if (_this.moveDown()) {
                    setTimeout(_this.isGameOver.bind(_this), 300)
                }

            } else {
                //move up
                if (_this.moveUp()) {
                    setTimeout(_this.isGameOver.bind(_this), 300)
                }
            }

        }
    })
}
