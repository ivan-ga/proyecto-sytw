"use strict";

$(document).ready(function() {

    var squares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    var used = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var X_token = "<i class='fa fa-times'></i>";
    var O_token = "<i class='fa fa-circle-o'></i>";
    var humanPlayer = X_token;
    var aiPlayer = O_token;
    var empty = 0;
    var human = 1;
    var ai = 2;
    var hasMoved = false;
    var gameOver = false;
    var how = [];
    var score = [0, 0, 0];
    var delay;
    var move = {};
    var moveCounter = 0;
    var score_TIE = 1;
    var score_HUMAN = 0;
    var score_AI = 2;
    var outcome = null;


    var board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    var win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];



    var humanSound = new Audio('audio/water_droplet_3.mp3');
    var aiSound = new Audio('audio/water_droplet.mp3');



    function setNewGame() {
        squares.forEach(function(v) {
            $('#' + v).empty();
            $('#' + v).css('background-color', 'rgba(0,0,0,0.0)');
        });

        board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        hasMoved = false;
        outcome = null;
        moveCounter = 0;
        gameOver = false;
        how = [];
        move = {};
    }


    function playSound(sound) {
        sound.play();
    }


    function moveHUMAN(here) {
        if (!(board[here.x][here.y])) {
            board[here.x][here.y] = human;
            // playSound(humanSound);
            drawMove(here, humanPlayer, 100);
            hasMoved = true;
        }
    }


    function moveAI_Rnd() {
        var min = Math.min.apply(null, board.reduce(function(a, b) {
            return a.concat(b);
        }, []));

        var whereMove = {};

        if (min === 0) {
            while (!(hasMoved)) {
                whereMove.x = Math.floor(Math.random() * 3);
                whereMove.y = Math.floor(Math.random() * 3);
                if (!(board[whereMove.x][whereMove.y])) {
                    board[whereMove.x][whereMove.y] = ai;
                    drawMove(whereMove, aiPlayer, 300);
                  //   playSound(aiSound);
                    hasMoved = true;
                }
            }
        }
    }




    function moveAI_Wiki() {

        // transfer board to used
        used = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        var corner = [0, 2, 6, 8];
        var side = [1, 3, 5, 7];
        var count = 0;
        var theMove = null;
        for (var row = 0; row <= 2; row++) {
            for (var col = 0; col <= 2; col++) {
                used[count] = board[row][col];
                count++;
            }
        }

        function move() {
            var whereMove = {};
            whereMove.x = parseInt(theMove / 3);
            whereMove.y = theMove % 3;
            board[whereMove.x][whereMove.y] = ai;
            drawMove(whereMove, aiPlayer, 300);
            hasMoved = true;
            moveCounter++;
        }


        // opening move
        function opening() {
            if (theMove === null && (used[1] === human || used[3] === human)) {
                theMove = 0;
                move();
            }

            if (theMove === null && (used[5] === human || used[7] === human)) {
                theMove = 8;
                move();
            }

            if (used[4] === human && theMove === null) {
                emptyCorner();
                return;
            }

            if (used[4] === empty && theMove === null && moveCounter === 0 && aiPlayer === X_token) {
                theMove = corner[Math.floor(Math.random() * 4)];
                move();
            }

            if (used[4] === empty && theMove === null) {
                playCenter();
                return;
            }
        }


        // look for a win
        function aWin() {
            win.forEach(function(solution) {
                if ((used[solution[0]] === ai && used[solution[1]] === ai && used[solution[2]] == empty) ||
                    (used[solution[0]] === ai && used[solution[1]] === empty && used[solution[2]] == ai) ||
                    (used[solution[0]] === empty && used[solution[1]] === ai && used[solution[2]] == ai)) {

                    solution.forEach(function(pos) {
                        if (used[pos] === empty && theMove === null) {
                            theMove = pos;
                        }
                    });
                    move();
                }
            });
        }


        // look for a block
        function block() {
            if (used[4] === empty && theMove === null) {
                playCenter();
                return;
            }

            win.forEach(function(solution) {
                if ((used[solution[0]] === human && used[solution[1]] === human && used[solution[2]] == empty) ||
                    (used[solution[0]] === human && used[solution[1]] === empty && used[solution[2]] == human) ||
                    (used[solution[0]] === empty && used[solution[1]] === human && used[solution[2]] == human)) {

                    solution.forEach(function(pos) {
                        if (used[pos] === empty && theMove === null) {
                            theMove = pos;
                        }
                    });
                    move();
                }
            });
        }


        // make fork
        function fork() {
            win.forEach(function(solution) {
                if ((used[solution[0]] === ai && used[solution[1]] === empty && used[solution[2]] == empty) ||
                    (used[solution[0]] === empty && used[solution[1]] === empty && used[solution[2]] == ai) ||
                    (used[solution[0]] === empty && used[solution[1]] === ai && used[solution[2]] == empty)) {

                    if (used[4] === ai &&
                        (([used[0] === human] && used[8] === human) || ([used[2] === human] && used[6] === human))) {
                        side.forEach(function(pos) {
                            if (used[pos] === empty && theMove === null) {
                                theMove = pos;
                            }
                        });
                    } else {
                        corner.forEach(function(pos) {
                            if (used[pos] === empty && theMove === null) {
                                theMove = pos;
                            }
                        });
                    }
                    move();
                }
            });
        }


        // block fork
        function blockFork() {
            if (moveCounter > 1 && used[4] !== empty && theMove === null) {
                emptySide();
                return;
            }

            win.forEach(function(solution) {
                if ((used[solution[0]] === human && used[solution[1]] === empty && used[solution[2]] == empty) ||
                    (used[solution[0]] === empty && used[solution[1]] === empty && used[solution[2]] == human) ||
                    (used[solution[0]] === empty && used[solution[1]] === human && used[solution[2]] == empty)) {

                    side.forEach(function(pos) {
                        if (used[pos] === empty && theMove === null) {
                            theMove = pos;
                        }
                    });
                    move();
                }
            });
        }


        // play center
        function playCenter() {
            if (used[4] === empty && theMove === null) {
                theMove = 4;
                move();
            }
        }


        // opposite corner
        function oppositeCorner() {
            if (used[0] === human && used[8] === empty && theMove === null) {
                theMove = 8;
                move();
            } else if (used[0] === empty && used[8] === human && theMove === null) {
                theMove = 0;
                move();
            } else if (used[2] === human && used[6] === empty && theMove === null) {
                theMove = 6;
                move();
            } else if (used[2] === empty && used[6] === human && theMove === null) {
                theMove = 2;
                move();
            }
        }


        // empty corner
        function emptyCorner() {
            corner.forEach(function(pos) {
                if (used[pos] === empty && theMove === null) {
                    theMove = pos;
                    move();
                }
            });
        }


        //empty side
        function emptySide() {
            side.forEach(function(pos) {
                if (used[pos] === empty && theMove === null) {
                    theMove = pos;
                    move();
                }
            });
        }


        //based on wikipedia solution
        // https://en.wikipedia.org/wiki/Tic-tac-toe

        //0. opening move
        if (theMove === null && moveCounter === 0) {
            opening();
        }

        //1. Win
        if (theMove === null) {
            aWin();
        }

        //2. Block
        if (theMove === null) {
            block();
        }

        //3. Fork
        if (theMove === null) {
            fork();
        }

        //4. Block Fork
        if (theMove === null) {
            blockFork();
        }

        //5. Center
        if (theMove === null) {
            playCenter();
        }

        //6. Opposite corner
        if (theMove === null) {
            oppositeCorner();
        }

        //7. Empty corner
        if (theMove === null) {
            emptyCorner();
        }

        //8. Empty side
        if (theMove === null) {
            emptySide();
        }
    }



    function drawMove(location, who, delay) {
        setTimeout(function() {
            $('#' + (location.x * 3 + location.y)).html("<span class='who valign center-align animated fadeIn'>" + who + "</span>");
        }, delay);
    }


    function checkStatus() {

        var min = Math.min.apply(null, board.reduce(function(a, b) {
            return a.concat(b);
        }, []));

        [ai, human].forEach(function(player) {
            win.forEach(function(solution) {
                var check = 0;
                solution.forEach(function(pos) {
                    if (board[parseInt(pos / 3)][pos % 3] === player) {
                        check++;
                    }
                });
                if (check === 3) {
                    if (player === ai) {
                        outcome = score_AI;
                        gameOver = true;
                        how = solution;
                        score[score_AI]++;
                    } else {
                        outcome = score_HUMAN;
                        gameOver = true;
                        how = solution;
                        score[score_HUMAN]++;
                    }
                }
            });
        });

        // if no moves left to make it's a draw
        if (min !== 0 && !gameOver) {
            hasMoved = true;
            gameOver = true;
            outcome = score_TIE;
            score[score_TIE]++;
            return;
        }
    }



    function showWin() {
        console.log(gameOver, outcome, how);
        how.forEach(function(v) {
            $('#' + v).css('background-color', 'rgba(0,0,0,0.2)');
        });
    }


    function updateScore() {
        score.forEach(function(count, i) {
            $('#score' + i).text(count);
        });

        $('#score' + outcome).addClass('animated flash');
        $('#score' + outcome).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $('#score' + outcome).removeClass('animated flash');
        });
    }


    function control() {

        if (aiPlayer === X_token && moveCounter === 0) {
            hasMoved = false;
            moveAI_Wiki();
            checkStatus();
        }

        $('#board').on('click', '.square', (function() {

            hasMoved = false;

            if (!hasMoved && !gameOver) {
                move.x = parseInt($(this).attr('id') / 3);
                move.y = $(this).attr('id') % 3;
                moveHUMAN(move);
                checkStatus();
            }

            if (hasMoved && !gameOver) {
                hasMoved = false;
                //moveAI_Rnd();
                moveAI_Wiki();
                checkStatus();
            }

            if (hasMoved && gameOver) {
                showWin();
                updateScore();
            }
        }));

    }



    $('#X').click(function() {
        humanPlayer = X_token;
        aiPlayer = O_token;
        $('#chooseModal').closeModal();
        control();
    });

    $('#O').click(function() {
        humanPlayer = O_token;
        aiPlayer = X_token;
        $('#chooseModal').closeModal();
        control();
    });

    $('#new-game').click(function() {
        setNewGame();
        control();
    });


    $(".button-collapse").sideNav();

    setNewGame();
    $('#chooseModal').openModal();


});
