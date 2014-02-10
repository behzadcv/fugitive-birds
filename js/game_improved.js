$(document)
    .ready(function () {
        isBird = false;
        mousePressed = false;
        theGoalLevel = 4;
        gateredStars = 0;
        finalGateredStars = 0;
        level = 1;
        lives = 3;
        score = 2; //2--->2lives 1--->1live 0--->0lives
        piggyHeight = 397;
        piggyWidth = 422;
        birdWidth = 316;
        birdHeight = 1385;
        starHeight = 256;
        starWidth = 236;
        nextHeight = 1381;
        nextWidth = 935;
        retryHeight = 1297;
        retryWidth = 679;
        playWidth = 1155;
        playHeight = 1381; 
     
        /*-----------------------------Loading Bitmaps-----------------------------*/
        gameState = 0; // >0 loading ==-1 play  ==-2 pause
        
        gameState++; 
        starEmptyImage = new Image();
        starEmptyImage.addEventListener("load", function () {
          
            gameState--;
              $('progress').attr('value',$('progress').attr('max')-gameState);
        });
        starEmptyImage.src = "images/starempty.png";
        
        
       
        
        
        
        gameState++;
        tempback = new Image();
        tempback.addEventListener("load", function () {
          
            gameState--;
              $('progress').attr('value',$('progress').attr('max')-gameState);
        });
        tempback.src = "images/backback.png";
        
        
        
        
        
        gameState++;
        playImage = new Image();
        playImage.addEventListener("load", function () {
            gameState--;
              $('progress').attr('value',$('progress').attr('max')-gameState);
        });
        playImage.src = "images/play.png";
        gameState++;
        birdImage = new Image();
        birdImage.addEventListener("load", function () {
            gameState--;
              $('progress').attr('value',$('progress').attr('max')-gameState);
        });
        birdImage.src = "images/bird.png";
        gameState++;
        retryImage = new Image();
        retryImage.addEventListener("load", function () {
            gameState--;
              $('progress').attr('value',$('progress').attr('max')-gameState);
        });
        retryImage.src = "images/retry.png";
        gameState++;
        nextImage = new Image();
        nextImage.addEventListener("load", function () {
            gameState--;
              $('progress').attr('value',$('progress').attr('max')-gameState);
        });
        nextImage.src = "images/next.png";
        gameState++;
        piggyImage = new Image();
        piggyImage.addEventListener("load", function () {
            gameState--;
              $('progress').attr('value',$('progress').attr('max')-gameState);
        });
        piggyImage.src = "images/piggies.png";
        gameState++;
        backImage = new Image();
        backImage.addEventListener("load", function () {
            gameState--;
              $('progress').attr('value',$('progress').attr('max')-gameState);
        });
        backImage.src = "images/back.png";
        gameState++;
        starImage = new Image();
        starImage.addEventListener("load", function () {
            gameState--;
              $('progress').attr('value',$('progress').attr('max')-gameState);
        });
        
        starImage.src = "images/star.png"; /*-----------------------------Status Class-----------------------------*/
        function StatusGame() {
            this.canvasElement = $("<canvas width='" +screen.width + "' height='" + $('#game-container').height() + "'></canvas>");
            this.canvas = this.canvasElement.get(0).getContext("2d");
            $("#game-container").append(this.canvasElement);
            this.updateStatus = function () {
                this.canvas.clearRect(0, 0, this.canvasElement.width(), this.canvasElement.height());

                for (i = 0; i < lives; i++) {
                    this.canvas.drawImage(birdImage, 0, 0, 316, 579, (i * 316 / 5) + 0, $('#game-container')
                        .height() - 70, 316 / 4.5, 579 / 4.5);
                }
                for (i = 0; i < theGoalLevel; i++) {
                    this.canvas.drawImage(starEmptyImage, 0, 0, starWidth, starHeight, ($('#game-container')
                        .width()) - ((i + 1) * (starWidth / 8)) - 30, 0, starWidth / 5, starHeight / 5);
                }
                for (i = 0; i < finalGateredStars; i++) {
                    this.canvas.drawImage(starImage, 0, 0, starWidth, starHeight, ($('#game-container')
                        .width()) - ((i + 1) * (starWidth / 8)) - 30, 0, starWidth / 5, starHeight / 5);
                }
                this.canvas.font = "bold 25px Hammersmith One";
                this.canvas.strokeStyle = "#000000";
                this.canvas.lineWidth = 3;
                this.canvas.strokeText("Level: " + level, 22, 32);
                this.canvas.fillStyle = "#c8de3b";
                this.canvas.strokeText("Level: " + level, 20, 30);
                this.canvas.fillText("Level: " + level, 20, 30);
                if(level===1){
                this.canvas.fillStyle = "white";
                
                    this.canvas.font = "15px Hammersmith One";
                this.canvas.fillText("Tip: Draw a line from left to right to hit the stars!",($('#game-container').width())-380,($('#game-container').height())-10);}
            }
            this.nextLevel = function (resultScore) {
                this.canvas.clearRect(0, 0, this.canvasElement.width(), this.canvasElement.height());
                this.canvas.drawImage(nextImage, nextWidth * (2 - resultScore), 0, nextWidth, nextHeight, ($('#game-container')
                    .width()) / 2 - ((nextWidth / 3) / 2), 30, nextWidth / 3, nextHeight / 3);
            }
            this.resetLevel = function () {
                this.canvas.clearRect(0, 0, this.canvasElement.width(), this.canvasElement.height());
                this.canvas.drawImage(retryImage, 0, 0, retryWidth, retryHeight, ($('#game-container')
                    .width()) / 2 - ((retryWidth / 3) / 2), 70, retryWidth / 3, retryHeight / 3);
            }
            this.menuLevel = function () {
                console.log("here");
                this.canvas.clearRect(0, 0, this.canvasElement.width(), this.canvasElement.height());
                this.canvas.drawImage(playImage, 0, 0, playWidth, playHeight, ($('#game-container')
                    .width()) / 2 - ((playWidth / 3) / 2), 52, playWidth / 3, playHeight / 3);

            }
        } /*-----------------------------Background Class-----------------------------*/
        function Background() {
            BackClass = this;
            this.backSpreadSheetIndex = 0;
            this.canvasElement = $("<canvas width='" + screen.width + "' height='" + $('#game-container')
                .height() + "'></canvas>");
            this.canvas = this.canvasElement.get(0)
                .getContext("2d");
            $("#game-container")
                .append(this.canvasElement);
            this.backUpdate = function () {
                this.backSpreadSheetIndex = ((this.backSpreadSheetIndex + 2) % 800);
            }
            this.backDraw = function () {
                this.canvas.clearRect(0, 0, this.canvasElement.width(), this.canvasElement.height());
                for (i = 0; i < ($('#game-container')
                    .width() / 800) + 1; i++) {
                    this.canvas.drawImage(backImage, 0, 0, 800, 379, (i - 1) * 800 + this.backSpreadSheetIndex, 0, 800, 379);
                }
            }
        } /*-----------------------------Path Class-----------------------------*/
        function Path() {
            this.realPath = new Array();
            this.path = new Array();
            this.canvasElement = $("<canvas width='" + screen.width + "' height='" + $('#game-container')
                .height() + "'></canvas>");
            this.canvas = this.canvasElement.get(0)
                .getContext("2d");
            $("#game-container")
                .append(this.canvasElement);
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
                if (this.path[this.path.length - 1][0] != $('#game-container')
                    .width()) {
                    this.path.push([$('#game-container')
                        .width(), this.path[this.path.length - 1][1]
                    ]);
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
                var _pts = [],
                    // clone array
                    x, y, // our x,y coords
                    t1x, t2x, t1y, t2y, // tension vectors
                    c1, c2, c3, c4, // cardinal points
                    st, t, i; // steps based on num. of segments
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
                } /*remove close dots in the path*/
                for (var j = 0; j < this.realPath.length; j++) {
                    if ((j + 1 < this.realPath.length - 1)) {
                        while (Math.abs(this.realPath[j][0] - this.realPath[j + 1][0]) < 10) {
                            this.realPath.splice(j + 1, 1);
                            if ((j + 1 > this.realPath.length - 1)) {
                                break;
                            }
                        }
                    }
                } /*draw smooth path*/
                this.canvas.moveTo(this.path[0][0], this.path[0][1]);
                for (i = 1; i < this.path.length - 2; i++) {
                    var xc = (this.path[i][0] + this.path[i + 1][0]) / 2;
                    var yc = (this.path[i][1] + this.path[i + 1][1]) / 2;
                    this.canvas.quadraticCurveTo(this.path[i][0], this.path[i][1], xc, yc);
                }
                // curve through the last two points
                this.canvas.quadraticCurveTo(this.path[i][0], this.path[i][1], this.path[i + 1][0], this.path[i + 1][1]);
                
               if (!this.canvas.setLineDash) {
                    this.canvas.mozDash = [10,15];
                }else{
                
                this.canvas.setLineDash([5,25]);
                
                }
                         
             
                
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
        /*-----------------------------Bird Class-----------------------------*/
        function Bird() {
            this.path = new Array();
            this.pathIndex = 0;
            this.speed = 1;
            this.birdSpreadSheetIndex = 0;
            this.canvasElement = $("<canvas width='" + screen.width + "' height='" + $('#game-container')
                .height() + "'></canvas>");
            this.canvas = this.canvasElement.get(0)
                .getContext("2d");
            $("#game-container")
                .append(this.canvasElement);
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
                    if (finalGateredStars > theGoalLevel) {
                        finalGateredStars = theGoalLevel;
                    }
                    console.log("Final Gatered:", finalGateredStars);
                    successFunction();
                }
                checkCollision(this.path[this.pathIndex][0] - 10, this.path[this.pathIndex][0] + 10, this.path[this.pathIndex][1] - 10, this.path[this.pathIndex][1] + 10);
            }
            var isRange = function (eX0, eX1, eY0, eY1, birdRangeX0, birdRangeX1, birdRangeY0, birdRangeY1) {
                var rangeDec=(eX1-eX0)*0.2;
                eX0=eX0+rangeDec;
                eX1=eX1-rangeDec;
                
                rangeDec=(eY1-eY0)*0.2;
                eY0=eY0+rangeDec;
                eY1=eY1-rangeDec;
                
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
            var checkCollision = function (birdRangeX0, birdRangeX1, birdRangeY0, birdRangeY1) {
                for (i in stars) {
                    // console.log("go--------------",this.star[0][0][1]);
                    if ((stars[i].isUp === false) && (isRange(stars[i].x, stars[i].x + (starWidth * stars[i].sizeRatio), stars[i].y, stars[i].y + (starHeight * stars[i].sizeRatio), birdRangeX0, birdRangeX1, birdRangeY0, birdRangeY1) === true)) {
                        starCollision();
                        //console.log(">>>>>>>>>>>>>>>>collision in star number:",i);
                    }
                }
                for (i in piggies) {
                    if (piggies[i]) {
                        if (isRange(piggies[i].x, piggies[i].x + (piggyWidth * piggies[i].sizeRatio), piggies[i].y, piggies[i].y + (piggyHeight * piggies[i].sizeRatio), birdRangeX0, birdRangeX1, birdRangeY0, birdRangeY1) === true) {
                            piggy.collision(i);
                            piggyCollision();
                            //console.log(">>>>>>>>>>>>>collision in piggy number:",i);
                        }
                    }
                }
            }
            this.birdDraw = function () {
                this.canvas.clearRect(0, 0, this.canvasElement.width(), this.canvasElement.height());
                this.canvas.drawImage(birdImage, this.birdSpreadSheetIndex * 316, 0, birdWidth, birdHeight, this.path[this.pathIndex][0] - 50, this.path[this.pathIndex][1] - 40, birdWidth / 3, birdHeight / 3);
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

        function Entity(x, y, sizeRatio, speed, imageIndex, spreadsheetIndex, isUp) {
            this.sizeRatio = sizeRatio;
            this.speed = speed;
            this.xOffset=0;
            this.x = x;
            this.y = y;
            this.imageIndex = imageIndex;
            this.spreadsheetIndex = spreadsheetIndex;
            this.isUp = isUp;
        } /*-----------------------------Star Class-----------------------------*/
        stars = new Array();

        function Star() {
            //enhancing levels parameters
            this.maxStars = Math.round(theGoalLevel + (theGoalLevel / 3));
            this.distanceStar = $('#game-container')
                .width() / (this.maxStars * 2);
            this.starProb = 0.01;
            this.speedOffset = 1.5;
            this.canvasElement = $("<canvas width='" +screen.width + "' height='" + $('#game-container').height() + "'></canvas>");
            this.canvas = this.canvasElement.get(0)
                .getContext("2d");
            $("#game-container")
                .append(this.canvasElement);
            this.starUpdate = function () {
                //add new atar
                if ((Math.random() < this.starProb) && (stars.length < this.maxStars)) {
                    if ((stars.length == 0) || stars[stars.length - 1].x < $('#game-container')
                        .width() - this.distanceStar) {
                        var tempRatio = (Math.random() % 0.2) + 0.2;
                        stars.push(new Entity($('#game-container')
                            .width() + (starWidth * tempRatio), this.y = Math.random() * ($('#game-container')
                                .height() / 1.5), tempRatio, (Math.random() * this.speedOffset + 0.5), Math.round(Math.random() * 10) % 2 + 1, 0, false));
                        console.log("New star from star:", stars.length);
                    }
                }
                //update the pisition of stars and pass them to the context
                for (i in stars) {
                    stars[i].spreadsheetIndex = ((stars[i].spreadsheetIndex + 1) % 12);
                    //star is in the range of game container
                    if ((stars[i].x + (starWidth * stars[i].sizeRatio) > 0) && (stars[i].y + (starHeight * stars[i].sizeRatio) > 0)) {
                        if (stars[i].isUp === true) { // hitted star move up
                            stars[i].y -= stars[i].speed * 4;
                        }
                        stars[i].x= $("#game-container").width()-(stars[i].xOffset);
                        stars[i].xOffset+=stars[i].speed;
                        //stars[i].x -= stars[i].speed; // all in range stars move ahead
                    } else { //remove out of scene stars
                        console.log("remove from star class index of: <out of screen>", i);
                        stars.splice(i, 1);
                    }
                }
            }
            this.starDraw = function () {
                this.canvas.clearRect(0, 0, this.canvasElement.width(), this.canvasElement.height());
                for (i in stars) {
                    this.canvas.drawImage(starImage, stars[i].spreadsheetIndex * (starWidth), 0, starWidth, starHeight, stars[i].x, stars[i].y, starWidth * (stars[i].sizeRatio), starHeight * (stars[i].sizeRatio));
                }
            }
            this.collision = function (index) {
                console.log("is up true for:", index);
                stars[index].isUp = true;
            }
            this.nextLevel = function () {
                stars = [];
                if (this.maxStars < 7) {
                    this.maxStars + 0.05;
                    console.log("Max Star:", this.maxStars);
                }
            }
            this.resetLevel = function () {
                stars = [];
            }
        }
        piggies = new Array(); /*-----------------------------Piggy Class-----------------------------*/
        function Piggy() {
            this.dificulty = 0.02;
            this.maxPiggies = 25 * this.dificulty;
            this.distance = $('#game-container')
                .width() / (this.maxPiggies + 3);
            this.piggyProb = 1 * this.dificulty;
            this.sppedOffset = 0.2 + (3 * this.dificulty);
            PiggyClass = this;
            this.sizeRatio = 0.3;
            this.canvasElement = $("<canvas width='" + screen.width + "' height='" + $('#game-container')
                .height() + "'></canvas>");
            this.canvas = this.canvasElement.get(0)
                .getContext("2d");
            $("#game-container")
                .append(this.canvasElement);
            this.piggyUpdate = function () {
                

                //add new piggy
                if ((piggies.length === 0) || (Math.random() < this.piggyProb && piggies.length < this.maxPiggies && piggies[piggies.length - 1].x < $('#game-container').width() - this.distance)) {
                    piggies.push(new Entity($('#game-container')
                        .width() + (this.sizeRatio * piggyWidth), Math.random() * ($('#game-container')
                            .height() / 1.5), this.sizeRatio, Math.random() + this.sppedOffset, Math.round(Math.random()), 0, false));
                }
                //update piggy piggiess and spreadsheet             
                for (i in piggies) {
                    if (piggies[i].x > (-1) * piggyWidth) { //in game container range
                        piggies[i].x=$('#game-container').width()-piggies[i].xOffset;
                        piggies[i].xOffset+=piggies[i].speed;
                       // piggies[i].x -= piggies[i].speed;
                        piggies[i].spreadsheetIndex = ((piggies[i].spreadsheetIndex + 1) % 6);
                    } else //out of game-container range
                    {
                        piggies.splice(i, 1);
                    }
                }
            }
            this.piggyDraw = function () {
                this.canvas.clearRect(0, 0, this.canvasElement.width(), this.canvasElement.height());
                for (i in piggies) {
                    //console.log(piggies[i].piggySpreadSheetIndex);
                    this.canvas.drawImage(piggyImage, piggies[i].spreadsheetIndex * (piggyWidth), piggies[i].imageIndex * (piggyHeight), piggyWidth, piggyHeight, piggies[i].x, piggies[i].y, piggyWidth * piggies[i].sizeRatio, piggyHeight * piggies[i].sizeRatio);
                }
            }
            this.collision = function (index) {
                if (piggies[i].imageIndex < 2) {
                    piggies[i].imageIndex += 2;
                }
                piggies[i].speed = piggies[i].speed / 3;
            }
            this.nextLevel = function () {
                piggies = [];
                if (this.dificulty < 1) {
                    this.dificulty += 0.04;
                }
                if (this.dificulty === 0.06) {
                    this.dificulty = 0.1;
                }
                this.maxPiggies = 25 * this.dificulty;
                piggies = new Array();
                this.distance = $('#game-container')
                    .width() / (this.maxPiggies + 3);
                this.piggyProb = 1 * this.dificulty;
                this.sppedOffset = 0.2 + (3 * this.dificulty);
                console.log("Piggy difficulty", this.dificulty);
                console.log("max Piggies: ", this.maxPiggies);
            }
            this.resetLevel = function () {
                piggies = [];
            }
        } /*-----------------------------Global Functions-----------------------------*/
        function successFunction() {
            console.log(">>>>Successs with<<<<", gateredStars);
            lives--;
            gateredStars = 0;
            path.pathClean();
            if (finalGateredStars === theGoalLevel) {
                console.log("nextLevel");
                star.nextLevel();
                piggy.nextLevel();
                finalGateredStars = 0;
                score = lives;
                lives = 3;
                level++;
                gameState = -2;
            }
            if (lives === 0 && finalGateredStars < theGoalLevel) {
                console.log("level failed");
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
        } /*-----------------------------Desktop Event Listeners-----------------------------*/
        $("#game-container")
            .mousedown(function (evt) {
                evt.preventDefault();
                if (isBird === false && gameState === -1) {
                    path.pathClean();
                    mousePressed = true;
                }
            });
        $("#game-container")
            .mousemove(function (ev) {
                if (mousePressed === true && isBird === false && gameState === -1) {
                    path.updatePath(ev.clientX, ev.clientY);
                }
            });
        $("html")
            .mouseup(function (ev) {
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
        /*-----------------------------Mobile Event Listeners-----------------------------
        $("#game-container")
            .bind('touchstart', function (e) {
                if (isBird === false && gameState === -1) {
                    path.pathClean();
                    mousePressed = true;
                }
            });
        $("#game-container")
            .bind('touchmove', function (e) {
                e.preventDefault();
                if (mousePressed === true && isBird === false && gameState === -1) {
                    path.updatePath(e.touches[0].pageX, e.touches[0].pageY);
                }
            });
        $("html")
            .bind('touchend', function (e) {
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
            });*/
        $("#game-container")
            .click(function (ev) {
                if (gameState < -1) {
                    gameState = -1;
                }
            });
        var FPS = 30;
        setInterval(function () {
            if (gameState == 0) {
                 $('#game-container').css('background-image','url("images/backback.png")');

                back = new Background();
                path = new Path();
                piggy = new Piggy();
                star = new Star();
                bird = new Bird();
                statusGame = new StatusGame();
                $('progress').hide();
                gameState = -4;
            }
            if (gameState > 0) {
                console.log(">>>>>>>loading<<<<<<");
            }
        }, 1000 / FPS);
        setInterval(function () {
            if (gameState === -1) { // during the level
                updateScene();
                drawScene();
                statusGame.updateStatus();
            }
            if (gameState === -2) { // between levels to next level
                back.backUpdate();
                back.backDraw();
                statusGame.nextLevel(score);
            }
            if (gameState === -3) { // between levels to this level (level failed)
                back.backUpdate();
                back.backDraw();
                statusGame.resetLevel();
            }
            if (gameState === -4) { // fist menu page
                back.backUpdate();
                star.starUpdate();
                star.starDraw();
                back.backDraw();
                statusGame.menuLevel();
            }
        }, 1000 / FPS);
        
        
        
        /*page functions*/
        function isScrolledIntoView(elem)
        {
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();
        
            var elemTop = $(elem).offset().top;
            var elemBottom = elemTop + $(elem).height();
        
            return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)
              && (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop) );
        }
        
        
       /* $( window ).resize(function() {
           $('canvas').left($(window).width()-($('canvas')).width()/2);
        });*/
            
         $(window).scroll(function(){
             if(isScrolledIntoView('#a1')===true)
             {
                

                $("#b1").show("slow").delay(400);
                $("#b2").delay(600).show("slow").delay(400);
                 $("#b3").delay(1200).show("slow").delay(400);
                 $("#b4").delay(1800).show("slow").delay(400);
                 $("#b5").delay(2400).show("slow").delay(400);
                 
                 $("#b6").delay(3000).show("slow").delay(400);

            

             }
              
                                     });
        
    }); /**/