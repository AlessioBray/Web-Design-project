//************************
//****** Tetramino *******
//************************

function Tetramino()
{
    //Caratteristiche di base di un tetramino
    this.row = 0;
    this.col = 0;
    this.orientation = 0;

    //Tipologie di movimento di un tetramino
    this.rotate = function(delta)
    {
        this.orientation = mod(this.orientation + delta, this.symmetry);
    }

    this.drop = function()
    {
        this.row++;
    }

    this.translate = function(delta)
    {
        this.col = this.col + delta;
    }

    //Posizione successiva ad uno dei tipi di movimento
    this.rested = function()
    {
        return this.configuration(this.row, this.col, this.orientation);
    }

    this.rotated = function(delta)
    {
        return this.configuration(this.row, this.col, mod(this.orientation + delta, this.symmetry));
    }

    this.dropped = function()
    {
        return this.configuration(this.row + 1, this.col, this.orientation);
    }

    this.translated = function(delta)
    {
        return this.configuration(this.row, this.col + delta, this.orientation);
    }
}

//*********************************
//******* Tipi di Tetramino *******
//*********************************

// "O"

function Tetramino_O()
{
    this.col = 4;
    this.character = "tetramino_O";
    this.symmetry = 1;
    this.configuration = function(row, col, orientation)
    {
        return [[row, col], [row, col+1], [row+1, col], [row+1, col+1]];
    }
}
Tetramino_O.prototype = new Tetramino();

// "I"

function Tetramino_I()
{
    this.col = 3;
    this.character = "tetramino_I";
    this.symmetry = 2;
    this.configuration = function(row, col, orientation)
    {
        if (orientation == 0)
        {
            return [[row, col],[row, col+1], [row, col+2], [row, col+3]];
        }
        else
        {
            return [[row, col], [row+1, col], [row+2, col], [row+3, col]];
        }
    }
}
Tetramino_I.prototype = new Tetramino();

// "J"

function Tetramino_J()
{
    this.col = 3;
    this.character = "tetramino_J";
    this.symmetry = 4;
    this.configuration = function(row, col, orientation)
    {
        if (orientation == 0)
        {
            return [[row, col], [row, col+1], [row, col+2], [row+1, col+2]];
        }
        else if (orientation == 1)
        {
            return [[row, col+1], [row+1, col+1], [row+2, col], [row+2, col+1]];
        }
        else if (orientation == 2)
        {
            return [[row, col], [row+1, col], [row+1, col+1], [row+1, col+2]];
        }
        else
        {
            return [[row, col], [row, col+1], [row+1, col], [row+2, col]];
        }
    }
}
Tetramino_J.prototype = new Tetramino();

// "L"

function Tetramino_L()
{
    this.col = 3;
    this.character = "tetramino_L";
    this.symmetry = 4;
    this.configuration = function(row, col, orientation)
    {
        if (orientation == 0)
        {
            return [[row, col], [row, col+1], [row, col+2], [row+1, col]];
        }
        else if (orientation == 1)
        {
            return [[row, col], [row, col+1], [row+1, col+1], [row+2, col+1]];
        }
        else if (orientation == 2)
        {
            return [[row+1, col], [row+1, col+1], [row+1, col+2], [row, col+2]];
        }
        else
        {
            return [[row, col], [row+1, col], [row+2, col], [row+2, col+1]];
        }
    }
}
Tetramino_L.prototype = new Tetramino();

// "T"

function Tetramino_T()
{
    this.col = 3;
    this.character = "tetramino_T";
    this.symmetry = 4;
    this.configuration = function(row, col, orientation)
    {
        if (orientation == 0)
        {
            return [[row,col], [row, col+1], [row, col+2], [row+1, col+1]];
        }
        else if (orientation == 1)
        {
            return [[row, col+1], [row+1, col], [row+1, col+1], [row+2, col+1]];
        }
        else if (orientation == 2)
        {
            return [[row, col+1], [row+1, col], [row+1, col+1], [row+1, col+2]];
        }
        else
        {
            return [[row, col], [row+1, col], [row+2, col], [row+1, col+1]];
        }
    }
}
Tetramino_T.prototype = new Tetramino();

// "S"

function Tetramino_S()
{
    this.col = 3;
    this.character = "tetramino_S";
    this.symmetry = 2;
    this.configuration = function(row, col, orientation)
    {
        if (orientation == 0)
        {
            return [[row, col+1], [row, col+2], [row+1, col], [row+1, col+1]];
        }
        else
        {
            return [[row, col], [row+1, col], [row+1, col+1], [row+2, col+1]];
        }
    }
}
Tetramino_S.prototype = new Tetramino();

// "Z"

function Tetramino_Z()
{
    this.col = 3;
    this.character = "tetramino_Z";
    this.symmetry = 2;
    this.configuration = function(row, col, orientation)
    {
        if (orientation == 0)
        {
            return [[row, col], [row, col+1], [row+1, col+1], [row+1, col+2]];
        }
        else
        {
            return [[row, col+1], [row+1, col], [row+1, col+1], [row+2, col]];
        }
    }
}
Tetramino_Z.prototype = new Tetramino();