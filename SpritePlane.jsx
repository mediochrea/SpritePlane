// Save the current preferences
var startRulerUnits = app.preferences.rulerUnits;
var startTypeUnits = app.preferences.typeUnits;
var startDisplayDialogs = app.displayDialogs;

// Set Photoshop to use pixels and display no dialogs
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;
app.displayDialogs = DialogModes.NO;

var layerNum = app.activeDocument.layers.length;
var docWidth = app.activeDocument.width;
var docHeight = app.activeDocument.height;
var rows;
var columns;
var i = 0; // Active layer counter

// layer.Translate is broken, that asshole. Here's the improvised one
function translateActiveLayer( deltaX, deltaY )
    {
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
        desc.putReference( charIDToTypeID('null'), ref );
        var coords = new ActionDescriptor();
        coords.putUnitDouble( charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), deltaX );
        coords.putUnitDouble( charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), deltaY );
        desc.putObject( charIDToTypeID('T   '), charIDToTypeID('Ofst'), coords );
        executeAction( charIDToTypeID('move'), desc, DialogModes.NO );
};

var inp = confirm("Welcome to SpritePlane v1.0!\r\rSelect layout mode:\rYes - automatic mode (optimal number of rows/columns).\rNo - manual mode (user-specified number of rows/columns).");
if (inp==true)
{
    rows = Math.round (Math.sqrt (layerNum));
    columns = Math.ceil (layerNum / rows);
};

else
{
    columns = prompt ("Enter the number of columns (1 or more):","1");
    rows = prompt ("Enter the number of rows ("+Math.ceil (layerNum / columns)+" or more recommended):",""+Math.ceil (layerNum / columns)+"");
};
var inp = confirm("The sprite frames will be arranged in "+columns+" columns and "+rows+" rows.\rThe sprite sheet will be "+columns*docWidth+" wide and "+rows*docHeight+" tall. \r\rContinue?");
if (inp==true)
{
    app.activeDocument.resizeCanvas(docWidth*columns, docHeight*rows, AnchorPosition.TOPLEFT);

    for (var rowCount = 1; rowCount<=rows; rowCount++) 
    {
        for (var colCount =1; colCount<=columns; colCount++)
        {
            i++;
            if (layerNum >= i)
            {
                app.activeDocument.activeLayer = activeDocument.layers[layerNum-i];
                translateActiveLayer(docWidth * (colCount-1), docHeight * (rowCount-1)) ;
            };
        };
    };
    alert("Completed!");
};

else
{
    alert("Cancelled!");
}

// Reset the application preferences
app.preferences.rulerUnits = startRulerUnits;
app.preferences.typeUnits = startTypeUnits;
app.displayDialogs = startDisplayDialogs;