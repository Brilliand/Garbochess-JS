var g_allMoves = [];
var g_playerWhite = true;

var g_uiBoard;
var g_cellSize = 45;

function RedrawPieces() {
    for (y = 0; y < 8; ++y) {
        for (x = 0; x < 8; ++x) {
            var td = g_uiBoard[y * 8 + x];
            var pieceY = g_playerWhite ? y : 7 - y;
            var piece = g_board[((pieceY + 2) * 0x10) + (g_playerWhite ? x : 7 - x) + 4];
            var pieceName = null;
            switch (piece & 0x7) {
                case piecePawn: pieceName = "pawn"; break;
                case pieceKnight: pieceName = "knight"; break;
                case pieceBishop: pieceName = "bishop"; break;
                case pieceRook: pieceName = "rook"; break;
                case pieceQueen: pieceName = "queen"; break;
                case pieceKing: pieceName = "king"; break;
            }
            if (pieceName != null) {
                pieceName += "_";
                pieceName += (piece & 0x8) ? "white" : "black";
            }

            if (pieceName != null) {
                var img = document.createElement("div");
                $(img).addClass('sprite').addClass(pieceName);
                img.width = g_cellSize;
                img.height = g_cellSize;
                var divimg = document.createElement("div");
                divimg.appendChild(img);

                $(td).empty().append(divimg);
            } else {
                $(td).empty();
            }
        }
    }
}

function RedrawBoard() {
    var div = $("#board")[0];

    var table = document.createElement("table");
    table.cellPadding = "0px";
    table.cellSpacing = "0px";

    var tbody = document.createElement("tbody");

    g_uiBoard = [];

    for (y = 0; y < 8; ++y) {
        var tr = document.createElement("tr");

        for (x = 0; x < 8; ++x) {
            var td = document.createElement("td");
            td.style.width = g_cellSize + "px";
            td.style.height = g_cellSize + "px";
            td.style.backgroundColor = ((y ^ x) & 1) ? "#D18947" : "#FFCE9E";
            tr.appendChild(td);
            g_uiBoard[y * 8 + x] = td;
        }

        tbody.appendChild(tr);
    }

    table.appendChild(tbody);

    RedrawPieces();

    $(div).empty();
    div.appendChild(table);
}
