let data;
(function () {
  'use strict';

     const makeAGrid = (data) => {
    	  
        const rows = Math.ceil(Math.sqrt(data.length));
        var scale = d3.scaleLinear().domain([0,rows]).range([100,400]);
		
        var salaryScale = d3.scaleLinear().domain(d3.extent(data, d => d.salary)).range([3,27]).clamp(true);
        
  const grid = gridLayout();	
  grid.size([400, 400]);
        var griddedData = grid(data);

		var g = d3.select("svg").selectAll('g').data([null]).enter().append('g')
		  .attr('transform', 'translate(50,50)');
		g = d3.select("svg").select('g');
        var circles = g.selectAll("circle")
          .data(griddedData);
		  
		circles
          .enter()
          .append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 0)
            .style("fill", "red")
		  .merge(circles)
           .transition()
	       .duration(1000)
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", d => salaryScale(d.salary))
            .style("fill", "#41A368")
		  ;
      }

  const N = 33;
  const v = d3.range(N).map(d => d3.randomExponential(1/150)());
  data = v.map(d => {return {salary: d * 987};});
  
  makeAGrid(data);
  
  
  
  
  var newEmployees = d3.range(34).map(d => {
  var newPerson = {id: "New Person " + d, salary: d3.randomExponential(1/150)() * 897}
    return newPerson
  });
  
  var doubledArray = data.concat(newEmployees);
  const grid = gridLayout();	
  grid.size([400, 400]);
  var newGriddedData = grid(doubledArray);
  
d3.interval(function() {
  makeAGrid(newGriddedData);
}, 2000);

  
  
	
}());
