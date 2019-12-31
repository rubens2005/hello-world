const gridLayout = () => {
	
	var gridSize = [0,10];
	var gridXScale = d3.scaleLinear();
	var gridYScale = d3.scaleLinear();
	
  function processGrid(data) {
	var rows = Math.ceil(Math.sqrt(data.length));
	var columns = rows;
	var cell = 0;
	
	gridXScale.domain([1,columns]).range([0,gridSize[0]])
	gridYScale.domain([1,rows]).range([0,gridSize[1]])

    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < columns; j++) {
        if (data[cell]) {
          data[cell].x = gridXScale(j+1);
          data[cell].y = gridYScale(i+1);
          cell++;
        }
        else {
          break;
        }
      }
    }
	return data	
  }
  
  processGrid.size = function(newSize)  {
	  if (!arguments.length) 
		  return gridSize;
	  
	  gridSize = newSize
	  return this;
  }
  
  return processGrid;
  
}
