// Save the current preferences
var startRulerUnits = app.preferences.rulerUnits;
var startTypeUnits = app.preferences.typeUnits;
var startDisplayDialogs = app.displayDialogs;

// Set Photoshop to use pixels and display no dialogs
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;
app.displayDialogs = DialogModes.NO;

var layerNum = app.activeDocument.layers.length;
var layerCount = 0; // Active layer counter
var docWidth = app.activeDocument.width;
var docHeight = app.activeDocument.height;
var rows;
var columns;
var title = "SpritePlane 1.1";

// faster translate
//
// function translateActiveLayer( deltaX, deltaY )
//     {
//         var desc = new ActionDescriptor();
//         var ref = new ActionReference();
//         ref.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
//         desc.putReference( charIDToTypeID('null'), ref );
//         var coords = new ActionDescriptor();
//         coords.putUnitDouble( charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), deltaX );
//         coords.putUnitDouble( charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), deltaY );
//         desc.putObject( charIDToTypeID('T   '), charIDToTypeID('Ofst'), coords );
//         executeAction( charIDToTypeID('move'), desc, DialogModes.NO );
// };

// Snapshot functionality for reverting the document to the original state if aborted
function takeSnapshot () 
{ 
  var desc = new ActionDescriptor();
  var sref = new ActionReference();
  sref.putClass(charIDToTypeID("SnpS")); 
  desc.putReference(charIDToTypeID("null"), sref); 
  var fref = new ActionReference(); 
  fref.putProperty(charIDToTypeID("HstS"), charIDToTypeID("CrnH")); 
  desc.putReference(charIDToTypeID("From"), fref ); 
  executeAction(charIDToTypeID("Mk  "), desc, DialogModes.NO ); 
} 
function revertToLastSnapshot() 
{
  var docRef = app.activeDocument; 
  var hsObj = docRef.historyStates; 
  var hsLength = hsObj.length; 
  for (var i=hsLength - 1;i>-1;i--) 
  {
    if (hsObj[i].snapshot) 
    { 
      docRef.activeHistoryState = docRef.historyStates.getByName('Snapshot ' + i); 
      break; 
     } 
   } 
}

takeSnapshot();

var inp = confirm("Welcome to SpritePlane v1.1!\r\rSelect layout mode:\rYes - automatic mode (optimal number of rows/columns).\rNo - manual mode (user-specified number of rows/columns).",false,title);
if (inp==true)
{
    rows = Math.round (Math.sqrt (layerNum));
    columns = Math.ceil (layerNum / rows);
};

else
{
    columns = prompt("Enter the number of columns (1 or more):","1",title);
    rows = prompt("Enter the number of rows ("+Math.ceil (layerNum / columns)+" or more recommended):",""+Math.ceil (layerNum / columns)+"",title);
};
var inp = confirm("The sprite frames will be arranged in "+columns+" columns and "+rows+" rows.\rThe sprite sheet will be "+columns*docWidth+" wide and "+rows*docHeight+" tall. \r\rContinue?",false,title);
if (inp==true)
{
    app.activeDocument.resizeCanvas(docWidth*columns, docHeight*rows, AnchorPosition.TOPLEFT);

    for (var rowCount = 1; rowCount<=rows; rowCount++) 
    {
        for (var colCount =1; colCount<=columns; colCount++)
        {
            layerCount++;
            if (layerNum >= layerCount)
            {
                activeDocument.activeLayer = activeDocument.artLayers[layerNum-layerCount];
                if (activeDocument.activeLayer.allLocked == true)
                {
                    inp = confirm ("Layer \""+activeDocument.activeLayer.name+"\" is locked, unlock/abort?", false, title);
                    if (inp==true)
                    {
                        activeDocument.activeLayer.allLocked = false;
                        }
                    else
                    {
                        //revertToLastSnapshot, not working as intended. Be sure to delete the snapshot before continuing
                        app.activeDocument.activeHistoryState =app.activeDocument.historyStates.getByName('Snapshot 1');
                        app.preferences.rulerUnits = startRulerUnits;
                        app.preferences.typeUnits = startTypeUnits;
                        app.displayDialogs = startDisplayDialogs;
                        // Temporary crude abort
                        alert ("Aborted!", title)
                        throw "Aborted!";
                        }
                    }
                activeDocument.activeLayer.translate(docWidth * (colCount-1), docHeight * (rowCount-1)) ;
            };
        };
    };
    alert("Completed!",title);
};

else
{
    alert("Cancelled!",title);
}

// Reset the application preferences
app.preferences.rulerUnits = startRulerUnits;
app.preferences.typeUnits = startTypeUnits;
app.displayDialogs = startDisplayDialogs;
//alert ("Finished!","SpritePlane")