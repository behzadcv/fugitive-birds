$(document).ready(function () {
    
    isBird = false;
    mousePressed = false;
    
    gateredStars = 0;
    finalGateredStars = 0;
    level = 1;
    lives = 3;
    score=2; //2--->2lives 1--->1live 0--->0lives
    piggyHeight = 397;
    piggyWidth = 422;
    birdWidth = 316;
    birdHeight = 1385;
    starHeight = 256;
    starWidth = 236;
    nextHeight = 1381;
    nextWidth = 935;
    retryHeight=1167;
    retryWidth=669;
    playWidth=1155;
    playHeight=1381;
    /*-----------------------------Loading Bitmaps-----------------------------*/
    gameState = 0; // >0 loading ==-1 play  ==-2 pause
    
     gameState++;
    starEmptyImage = new Image();
    starEmptyImage.addEventListener("load", function () {
        gameState--;
    });
        starEmptyImage.src = "images/starempty.png";

    
    
    gameState++;
    playImage = new Image();
    playImage.addEventListener("load", function () {
        gameState--;
    });
        playImage.src = "images/play.png";
    
    
    gameState++;
    birdImage = new Image();
    birdImage.addEventListener("load", function () {
        gameState--;
    });
    birdImage.src = "images/bird.png";
    
    gameState++;
    retryImage = new Image();
    retryImage.addEventListener("load", function () {
        gameState--;
    });
    retryImage.src = "images/retry.png";
    
    
    gameState++;
    nextImage = new Image();
    nextImage.addEventListener("load", function () {
        gameState--;
    });
    nextImage.src = "images/next.png";
    gameState++;
    piggyImage = new Image();
    piggyImage.addEventListener("load", function () {
        gameState--;
    });
    piggyImage.src = "images/piggies.png";
    gameState++;
    backImage = new Image();
    backImage.addEventListener("load", function () {
        gameState--;
    });
    backImage.src = "images/back.png";
    gameState++;
    starImage = new Image();
    starImage.addEventListener("load", function () {
        gameState--;
    });
    starImage.src = "images/star.png";
    /*-----------------------------Status Class-----------------------------*/
    function StatusGame() {
        this.canvasElement = $("<canvas width='" + $('#game-container').width() + "' height='" + $('#game-container').height() + "'></canvas>");
        this.canvas = this.canvasElement.get(0).getContext("2d");
        
    
        $("#game-container").append(this.canvasElement);
        
        
        
        this.updateStatus = function () {
            this.canvas.clearRect(0, 0, this.canvasElement.width(), this.canvasElement.height());
            for (i = 0; i < lives; i++) {
                this.canvas.drawImage(birdImage, 0, 0, 316, 579, (i * 316 / 5) + 0, $('#game-container').height() - 70, 316 / 4.5, 579 / 4.5);
            }
            for (i = 0; i < 4; i++) {
                this.canvas.drawImage(starEmptyImage, 0, 0, starWidth, starHeight, ($('#game-container').width()) - ((i + 1) * (starWidth / 8))-30, 0, starWidth / 5, starHeight / 5);
            }
            
            for (i = 0; i < finalGateredStars; i++) {
                this.canvas.drawImage(starImage, 0, 0, starWidth, starHeight, ($('#game-container').width()) - ((i + 1) * (starWidth / 8))-30, 0, starWidth / 5, starHeight / 5);
            }
            this.canvas.font = "bold 25px Hammersmith One";
            this.canvas.strokeStyle = "#000000";
            this.canvas.lineWidth = 3;
            this.canvas.strokeText("Level: " + level, 22, 32);
            this.canvas.fillStyle = "#c8de3b";
            this.canvas.strokeText("Level: " + level, 20, 30);
            this.canvas.fillText("Level: " + level, 20, 30);
        }
        this.nextLevel = function (resultScore) {
            
            this.canvas.clearRect(0, 0, this.canvasElement.width(), this.canvasElement.height());
            this.canvas.drawImage(nextImage, nextWidth*(2-resultScore), 0, nextWidth, nextHeight, ($('#game-container').width()) / 2 - ((nextWidth / 3) / 2), 30, nextWidth / 3, nextHeight / 3);
        }
        
        
         this.resetLevel = function () {
            
            this.canvas.clearRect(0, 0, this.canvasElement.width(), this.canvasElement.height());
            this.canvas.drawImage(retryImage, 0, 0, retryWidth, retryHeight, ($('#game-container').width()) / 2 - ((retryWidth / 3) / 2),70, retryWidth / 3, retryHeight / 3);
        }
         
        this.menuLevel= function () {
            console.log("here");
            this.canvas.clearRect(0, 0, this.canvasElement.width(), this.canvasElement.height());
            this.canvas.drawImage(playImage, 0, 0, playWidth, playHeight, ($('#game-container').width()) / 2 - ((playWidth / 3) / 2),52, playWidth / 3, playHeight / 3);
        }
    }
    /*-----------------------------Background Class-----------------------------*/
    function Background() {
        BackClass = this;
        this.backSpreadSheetIndex = 0;
        this.canvasElement = $("<canvas width='" + $('#game-container').width() + "' height='" + $('#game-container').height() + "'></canvas>");
        this.canvas = this.canvasElement.get(0).getContext("2d");
        $("#game-container").append(this.canvasElement);
        this.backUpdate = function () {
            this.backSpreadSheetIndex = ((this.backSpreadSheetIndex + 2) % 800);
        }
        this.backDraw = function () {
            this.canvas.clearRect(0, 0, this.canvasElement.width(), this.canvasElement.height());
            for (i = 0; i < ($('#game-container').width() / 800) + 1; i++) {
                this.canvas.drawImage(backImage, 0, 0, 800, 379, (i - 1) * 800 + this.backSpreadSheetIndex, 0, 800, 379);
            }
        }
    }
    /*-----------------------------Path Class-----------------------------*/
    function Path() {
        this.realPath = new Array();
        this.path = new Array();
        this.canvasElement = $("<canvas width='" + $('#game-container').width() + "' height='" + $('#game-container').height() + "'></canvas>");
        this.canvas = this.canvasElement.get(0).getContext("2d");
        $("#game-container").append(this.canvasElement);
        this.updatePath = function (x, y) {
            this.path.push([x, y]);
            this.canvas.beginPath();
            //console.log(this.path.length);
            if (this.path.length > 1) {
                this.canvas.moveTo(this.path[this.path.length - 2][0], this.path[this.path.length - 2][1]);
            }
            this.canvas.lineTo(this.path[this.path.length - 1][0], this.path[this.path.length - 1][1]);
            this.canvas.lineWidth = 7;
            this.canvas.strokeStyle = 'cyan';
            this.canvas.stroke();
            // line color
        }
        this.smooth = function () {
            
            this.realPath = [];
            if (this.path[0][1] > 0) {
                this.path.splice(0, 0, [0, this.path[0][1]]);
            }
            if (this.path[this.path.length - 1][0] != $('#game-container').width()) {
                this.path.push([$('#game-container').width(), this.path[this.path.length - 1][1]]);
            }
            this.canvas.clearRect(0, 0, this.canvasElement.width(), this.canvasElement.height());
            var tension = 0.01;
            var numOfSegments = this.path.length * 2;
            var ptsa = new Array();
            for (i in this.path) {
                ptsa.push(this.path[i][0]);
                ptsa.push(this.path[i][1]);
            }
            // use input value if provided, or use a default value	 
            tension = (tension != 'undefined') ? tension : 0.5;
            numOfSegments = numOfSegments ? numOfSegments : 16;
            var _pts = [], // clone array
                x, y, // our x,y coords
                t1x, t2x, t1y, t2y, // tension vectors
                c1, c2, c3, c4, // cardinal points
                st, t, i; // steps based on num. of segments
            // clone array so we don't change the original
            _pts = ptsa.slice(0);
            _pts.unshift(ptsa[1]); //copy 1. point and insert at beginning
            _pts.unshift(ptsa[0]);
            _pts.push(ptsa[ptsa.length - 2]); //copy last point and append
            _pts.push(ptsa[ptsa.length - 1]);
            for (i = 2; i < (_pts.length - 4); i += 2) {
                // calc tension vectors
                t1x = (_pts[i + 2] - _pts[i - 2]) * tension;
                t2x = (_pts[i + 4] - _pts[i]) * tension;
                t1y = (_pts[i + 3] - _pts[i - 1]) * tension;
                t2y = (_pts[i + 5] - _pts[i + 1]) * tension;
                for (t = 0; t <= numOfSegments; t++) {
                    // calc step
                    st = t / numOfSegments;
                    // calc cardinals
                    c1 = 2 * Math.pow(st, 3) - 3 * Math.pow(st, 2) + 1;
                    c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2);
                    c3 = Math.pow(st, 3) - 2 * Math.pow(st, 2) + st;
                    c4 = Math.pow(st, 3) - Math.pow(st, 2);
                    // calc x and y cords with common control vectors
                    x = c1 * _pts[i] + c2 * _pts[i + 2] + c3 * t1x + c4 * t2x;
                    y = c1 * _pts[i + 1] + c2 * _pts[i + 3] + c3 * t1y + c4 * t2y;
                    //store points in array
                    this.realPath.push([x, y]);
                }
            }
            /*remove close dots in the path*/
            for (var j = 0; j < this.realPath.length; j++) {
                if ((j + 1 < this.realPath.length - 1)) {
                    while (Math.abs(this.realPath[j][0] - this.realPath[j + 1][0]) < 10) {
                        // console.log(this.realPath[j][0],"--->",this.realPath[j+1][0]);
                        this.realPath.splice(j + 1, 1);
                        if ((j + 1 > this.realPath.length - 1)) {
                            break;
                        }
                    }
                }
            }
            /*draw smooth path*/
            this.canvas.moveTo(this.path[0][0], this.path[0][1]);
            for (i = 1; i < this.path.length - 2; i++) {
                var xc = (this.path[i][0] + this.path[i + 1][0]) / 2;
                var yc = (this.path[i][1] + this.path[i + 1][1]) / 2;
                this.canvas.quadraticCurveTo(this.path[i][0], this.path[i][1], xc, yc);
            }
            // curve through the last two points
            this.canvas.quadraticCurveTo(this.path[i][0], this.path[i][1], this.path[i + 1][0], this.path[i + 1][1]);
            this.canvas.setLineDash([5, 15]);
            this.canvas.lineCap = 'round';
            this.canvas.stroke();
        }
        this.pathClean = function () {
            this.realPath = [];
            this.path = [];
            this.canvas.clearRect(0, 0, this.canvasElement.width(), this.canvasElement.height());
        }
        this.getPath = function () {
            return this.realPath;
        }
    }
    /*-----------------------------Context Class-----------------------------*/
    function Context() {
        this.piggy = new Array();
        this.star = new Array();
        this.update = function (element, index, rangeX0, rangeX1, rangeY0, rangeY1,isUp) {
            
            
            if (element === 'star') {
                if (this.star.length - 1 < index) {
                    this.star.push([rangeX0, rangeX1, rangeY0, rangeY1,isUp]);
                } else {
                    this.star[index] = [rangeX0, rangeX1, rangeY0, rangeY1,isUp];
                }
            }
            if (element === 'piggy') {
                if (this.piggy.length - 1 < index) {
                    this.piggy.push([rangeX0, rangeX1, rangeY0, rangeY1],isUp);
                } else {
                    this.piggy[index] = [rangeX0, rangeX1, rangeY0, rangeY1,isUp];
                }
            }
        }
        this.remove = function (element, index) {
            console.log("remove context",element,index);
            if (element === 'star') {
                this.star.splice(index, 1);
            }
            if (element == 'piggy') {
                this.piggy.splice(index, 1);
            }
        }
        this.checkCollision = function (birdRangeX0, birdRangeX1, birdRangeY0, birdRangeY1) {
            for (i in this.star) {
                // console.log("go--------------",this.star[0][0][1]);
                if ((this.star[i][4]===false) && (this.isRange(this.star[i][0], this.star[i][1], this.star[i][2], this.star[i][3], birdRangeX0, birdRangeX1, birdRangeY0, birdRangeY1) === true)) {
                    starCollision();
                    //console.log(">>>>>>>>>>>>>>>>collision in star number:",i);
                }
            }
            for (i in this.piggy) {
                if (this.piggy[i]) {
                    if (this.isRange(this.piggy[i][0], this.piggy[i][1], this.piggy[i][2], this.piggy[i][3], birdRangeX0, birdRangeX1, birdRangeY0, birdRangeY1) === true) {
                        piggy.collision(i);
                        piggyCollision();
                        //console.log(">>>>>>>>>>>>>collision in piggy number:",i);
                    }
                }
            }
        }
        this.isRange = function (eX0, eX1, eY0, eY1, birdRangeX0, birdRangeX1, birdRangeY0, birdRangeY1) {
            //            console.log("bird 0",birdRangeX0,"element 1",eX1);
            if (birdRangeX0 > eX1 || birdRangeX1 < eX0) {
                return false;
            } else {
                if (birdRangeY0 > eY1 || birdRangeY1 < eY0) {
                    return false;
                }
            }
            return true;
        }
        this.resetLevel = function () {
            this.piggy = [];
            this.star = [];
        }
    }
    gameContex = new Context();
    /*-----------------------------Bird Class-----------------------------*/
    function Bird() {
        this.path = new Array();
        this.pathIndex = 0;
        this.speed = 1;
        this.birdSpreadSheetIndex = 0;
        this.canvasElement = $("<canvas width='" + $('#game-container').width() + "' height='" + $('#game-container').height() + "'></canvas>");
        this.canvas = this.canvasElement.get(0).getContext("2d");
        $("#game-container").append(this.canvasElement);
        this.birdFail = function () {
            isBird = false;
            this.canvas.clearRect(0, 0, this.canvasElement.width(), this.canvasElement.height());
            this.pathIndex = 0;
        }
        this.birdUpdate = function () {
            this.birdSpreadSheetIndex = ((this.birdSpreadSheetIndex + 1) % 4);
            if (this.pathIndex + this.speed < this.path.length) {
                this.pathIndex += this.speed;
            } else {
                isBird = false;
                this.canvas.clearRect(0, 0, this.canvasElement.width(), this.canvasElement.height());
                this.pathIndex = 0;
                finalGateredStars += gateredStars;
                if (finalGateredStars > 4) {
                    finalGateredStars = 4;
                }
                console.log("Final Gatered:", finalGateredStars);
                successFunction();
            }
        }
        this.birdDraw = function () {
            this.canvas.clearRect(0, 0, this.canvasElement.width(), this.canvasElement.height());
            this.canvas.drawImage(birdImage, this.birdSpreadSheetIndex * 316, 0, birdWidth, birdHeight, this.path[this.pathIndex][0] - 50, this.path[this.pathIndex][1] - 40, birdWidth / 3, birdHeight / 3);
            gameContex.checkCollision(this.path[this.pathIndex][0] - 10, this.path[this.pathIndex][0] + 10, this.path[this.pathIndex][1] - 10, this.path[this.pathIndex][1] + 10);
        }
        this.setPath = function (rePath) {
            this.path = null;
            this.path = rePath;
            if (this.path === []) {
                return false;
            }
            return true;
            //console.log(this.path.length);
        }
    }
    
    function Entity(type,x,y,size,speed,imageIndex,spreadsheetIndex,isUp){
        this.size;
        this.type=type;
        this.speed=speed;
        this.x=x;
        this.y=y;
        this.imageIndex=imageIndex;
        this.spreadsheetIndex=spreadsheetIndex;
        this.isUp=isUp;

    }
    /*-----------------------------Star Class-----------------------------*/
    function Star() {
        
        this.maxStars = 5;
        this.distance = $('#game-container').width() / (this.maxStars * 2);
        this.position = new Array();
        this.starProb = 0.01;

        
        function Posistion() {
            this.speed = (Math.random() * 2 + 0.5);
            this.size=(Math.random()%0.2)+0.2;
            this.imageIndex = Math.round(Math.random() * 10) % 2 + 1;
            this.x = $('#game-container').width() + 100;
            this.y = Math.random() * 250;
            this.starSpreadSheetIndex = 0;
            this.isUp=false;
        }
        this.canvasElement = $("<canvas width='" + $('#game-container').width() + "' height='" + $('#game-container').height() + "'></canvas>");
        this.canvas = this.canvasElement.get(0).getContext("2d");
        $("#game-container").append(this.canvasElement);
        this.starUpdate = function () {
            //add new atar
            if ((Math.random() < this.starProb) && (this.position.length < this.maxStars + 1)) {
                if ((this.position.length == 0) || this.position[this.position.length - 1].x < $('#game-container').width() - this.distance) {
                    this.position.push(new Posistion());
                    console.log("New star:", this.position.length);
                    //console.log(this.position.length);
                }
            }

            //update the pisition of stars and pass them to the context
            for (i in this.position) {
                this.position[i].starSpreadSheetIndex = ((this.position[i].starSpreadSheetIndex + 1) % 12);
                //star is in the range of game container
                if ((this.position[i].x + (starWidth/2) > 0) && (this.position[i].y + (starHeight/2) > 0)) {
                    
                    if(this.position[i].isUp===true){// hitted star move up
                    this.position[i].y -= this.position[i].speed*4;
                    
                    }
                    
                    this.position[i].x -= this.position[i].speed; // all in range starts move ahead
                    
                    
                    gameContex.update('star', i, this.position[i].x, this.position[i].x +starWidth *( this.position[i].size ), this.position[i].y, this.position[i].y + starHeight *  ( this.position[i].size),this.position[i].isUp);
                    
                } else { //remove out of scene stars
                    console.log("remove from star class index of: <out of screen>",i);
                    this.position.splice(i, 1);
                    gameContex.remove('star', i);
                }
            }
        }
        this.starDraw = function () {
            this.canvas.clearRect(0, 0, this.canvasElement.width(), this.canvasElement.height());
            for (i in this.position) {
                this.canvas.drawImage(starImage, this.position[i].starSpreadSheetIndex * (starWidth), 0, starWidth, starHeight, this.position[i].x, this.position[i].y, starWidth * ( this.position[i].size), starHeight *  ( this.position[i].size));
            }
        }
        this.collision = function (index) {
            console.log("is up true for:",index);
            this.position[index].isUp=true;
             gameContex.update('star', i, this.position[i].x, this.position[i].x + starWidth * 0.5, this.position[i].y, this.position[i].y + starHeight * 0.5,this.position[i].isUp);
            
        }
        this.nextLevel = function () {
            this.position = [];
            if (this.maxStars < 7) {
                this.maxStars + 0.05;
            }
        }
        this.resetLevel = function () {
            this.position = [];
        }
    }
    /*-----------------------------Piggy Class-----------------------------*/
    function Piggy() {
        this.dificulty = 0.02;
        this.maxPiggies = 35 * this.dificulty;
        this.position = new Array();
        this.distance = $('#game-container').width() / (this.maxPiggies + 3);
        this.piggyProb = 1 * this.dificulty;
        this.sppedOffset = 0.2 + (3 * this.dificulty);
        PiggyClass = this;

        function Posistion() {
            this.speed = Math.random() + PiggyClass.sppedOffset;
            this.imageIndex = Math.round(Math.random());
            this.x = $('#game-container').width() + 200;
            this.y = Math.random() * 250;
            this.piggySpreadSheetIndex = 0;
        }
        this.canvasElement = $("<canvas width='" + $('#game-container').width() + "' height='" + $('#game-container').height() + "'></canvas>");
        this.canvas = this.canvasElement.get(0).getContext("2d");
        $("#game-container").append(this.canvasElement);
        this.piggyUpdate = function () {
            
            //add new piggy
            if ((this.position.length === 0) || (Math.random() < this.piggyProb && this.position.length < this.maxPiggies && this.position[this.position.length - 1].x < $('#game-container').width() - this.distance)) {
                this.position.push(new Posistion());
                console.log("Piggy new:", this.position.length);
            }
            
            //update piggy positions and spreadsheet             
            for (i in this.position) {

                if (this.position[i].x > (-1) * piggyWidth) {//in game container range
                    
                    
                       
                        this.position[i].x -= this.position[i].speed;
                        this.position[i].piggySpreadSheetIndex = ((this.position[i].piggySpreadSheetIndex + 1) % 6); 

                      

                    gameContex.update('piggy', i, this.position[i].x+ (piggyWidth /6), this.position[i].x + (piggyWidth /2) - (piggyWidth /6), this.position[i].y+(piggyHeight /10), this.position[i].y + (piggyHeight /2)-(piggyHeight /6));
                } 
                else //out of game-container range
                {
                    this.position.splice(i, 1);
                    gameContex.remove('piggy', i);
                }
            }
        }
        
        
        this.piggyDraw = function () {
            this.canvas.clearRect(0, 0, this.canvasElement.width(), this.canvasElement.height());
            for (i in this.position) {
                //console.log(this.position[i].piggySpreadSheetIndex);
                this.canvas.drawImage(piggyImage, this.position[i].piggySpreadSheetIndex * (piggyWidth), this.position[i].imageIndex * (piggyHeight ), piggyWidth , piggyHeight , this.position[i].x, this.position[i].y, piggyWidth / 3, piggyHeight / 3);
            }
        }
        this.collision = function (index) {
            if (this.position[i].imageIndex<2)
                {
                    this.position[i].imageIndex+=2;
                }
                
                            this.position[i].speed=this.position[i].speed/3;

        }
        this.nextLevel = function () {
            this.position = [];
            if (this.dificulty < 1) {
                this.dificulty += 0.04;
            }
            if (this.dificulty === 0.06) {
                this.dificulty = 0.1;
            }
            this.maxPiggies = 35 * this.dificulty;
            this.position = new Array();
            this.distance = $('#game-container').width() / (this.maxPiggies + 3);
            this.piggyProb = 1 * this.dificulty;
            this.sppedOffset = 0.2 + (3 * this.dificulty);
            console.log("Piggy difficulty", this.dificulty);
            console.log("max Piggies: ",this.maxPiggies);
        }
        this.resetLevel = function () {
            this.position = [];
        }
    }
    /*-----------------------------Global Functions-----------------------------*/
    function successFunction() {
        console.log(">>>>Successs with<<<<", gateredStars);
        lives--;
        gateredStars = 0;
        path.pathClean();
        if (finalGateredStars === 4) {
            console.log("nextLevel");
            gameContex.resetLevel();
            star.nextLevel();
            piggy.nextLevel();
            finalGateredStars = 0;
            score=lives;
            lives = 3;
            level++;
            gameState = -2;
        }
        if (lives === 0 && finalGateredStars < 4) {
            console.log("level failed");
            gameContex.resetLevel();
            star.resetLevel();
            piggy.resetLevel();
            finalGateredStars = 0;
            lives = 3;
            gameState = -3;
            console.log("level restareted by success");
           
        }
    }

    function piggyCollision() {
        bird.birdFail();
        path.pathClean();
        lives--;
        console.log("Bird crash!!");
        if (lives == 0) {
            console.log("level failed");
            gameContex.resetLevel();
            star.resetLevel();
            piggy.resetLevel();
            finalGateredStars = 0;
            lives = 3;
            gameState = -3;
            console.log("level restareted by crash");
        }
        gateredStars = 0;
    }

    function starCollision() {
        star.collision(i);
        gateredStars++;
    }

    function updateScene() {
        back.backUpdate();
        piggy.piggyUpdate();
        star.starUpdate();
        if (isBird === true) {
            bird.birdUpdate();
        }
    }

    function drawScene() {
        back.backDraw();
        if (isBird === true) {
            bird.birdDraw();
        }
        star.starDraw();
        piggy.piggyDraw();
    }
    /*-----------------------------Desktop Event Listeners-----------------------------*/
    
    $("#game-container").mousedown(function (evt) {
        if (isBird === false && gameState === -1) {
            path.pathClean();
            mousePressed = true;
            
        }
    });
    $("#game-container").mousemove(function (ev) {
        if (mousePressed === true && isBird === false && gameState === -1) {
            path.updatePath(ev.clientX, ev.clientY);
           
        }
    });
    $("html").mouseup(function (ev) {
        if (mousePressed === true && isBird === false && gameState === -1) {
            mousePressed = false;
            path.smooth();
            if (lives > 0) {
                if ((bird.setPath(path.getPath()) === true) && (gameState === -1)) {
                    isBird = true;
                    console.log("Bingo");
                } else {
                    console.log("path empty");
                }
            } else {
                console.log("no lives");
            }
        }
        
        
    });
    
    /*-----------------------------Mobile Event Listeners-----------------------------*/

    $("#game-container").bind('touchstart',function(e) {
        if (isBird === false && gameState === -1) {
            path.pathClean();
            mousePressed = true; 
        }
    });
    
     $("#game-container").bind('touchmove',function(e) {
         e.preventDefault();
        if (mousePressed === true && isBird === false && gameState === -1) {
            path.updatePath(e.touches[0].pageX , e.touches[0].pageY);
           
        }
    });
    
    $("html").bind('touchend',function(e) {
        if (mousePressed === true && isBird === false && gameState === -1) {
            mousePressed = false;
            path.smooth();
            if (lives > 0) {
                if ((bird.setPath(path.getPath()) === true) && (gameState === -1)) {
                    isBird = true;
                    console.log("Bingo");
                } else {
                    console.log("path empty");
                }
            } else {
                console.log("no lives");
            }
        }
        
        
    });
    
    
       $("#game-container").click(function (ev) {
        if(gameState < -1){
            gameState=-1;
        }
    });
    
    var FPS = 30;
    setInterval(function () {
        if (gameState == 0) {
            back = new Background();
            path = new Path();
            piggy = new Piggy();
            star = new Star();
            bird = new Bird();
            statusGame = new StatusGame();
            gameState = -4;
        }
        if (gameState > 0) {
            console.log(">>>>>>>loading<<<<<<");
        }
    }, 1000 / FPS);
    setInterval(function () {
        if (gameState === -1) {// during the level
            updateScene();
            drawScene();
            statusGame.updateStatus();

        }
        if (gameState === -2) { // between levels to next level
             back.backUpdate();
            back.backDraw();
            statusGame.nextLevel(score);
        }
        if (gameState === -3) {// between levels to this level (level failed)
            back.backUpdate();
            back.backDraw();
            statusGame.resetLevel();
           
        }
        
        
        if (gameState === -4) {// fist menu page
            back.backUpdate();
            
            star.starUpdate();

            star.starDraw();
            back.backDraw();
            statusGame.menuLevel();
           
        }
    }, 1000 / FPS);
});
/**/