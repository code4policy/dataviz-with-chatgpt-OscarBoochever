// Assuming you have D3.js loaded

// Fetch the data
d3.csv("boston_311_2023_by_reason.csv").then(function(data) {
    // Process the data and create the bar chart

    // Extract the top 10 reasons and their counts, ordered from biggest to smallest
    const topReasons = data
        .sort((a, b) => b.Count - a.Count)
        .slice(0, 10)
        .map(d => ({ reason: d.reason, count: +d.Count }));

    // Set up SVG dimensions with margin
    const margin = { top: 50, right: 500, bottom: 100, left: 0 };
    const width = 1000 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3.select("#chart-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Set up scales
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(topReasons, d => d.count)])
        .range([0, width]);

    const yScale = d3.scaleBand()
        .domain(topReasons.map(d => d.reason))
        .range([0, height])
        .padding(0.1);

    // Create bars
    svg.selectAll("rect")
        .data(topReasons)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", d => yScale(d.reason) + 10)
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "steelblue");

    // Add labels for reason and Count
    svg.selectAll("text")
        .data(topReasons)
        .enter()
        .append("text")
        .attr("x", d => xScale(d.count) + 10)
        .attr("y", d => yScale(d.reason) + yScale.bandwidth() / 2 + 10)
        .style("font-size", "12px")
        .style("fill", "black")
        .text(d => `${d.reason} (${d.count})`);

    // Add headline and subheadline
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -20)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text("Streets and Sanitation Give Reason to Dial");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 0)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Top 10 Reasons for 311 Calls in Boston (2023)");

    // Add citation
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + 20)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("fill", "gray")
        .text("Data Source: boston.gov");

    // Add authorship credit in footnotes
    svg.append("text")
        .attr("x", -margin.left)
        .attr("y", height + margin.bottom - 10)
        .style("font-size", "12px")
        .style("fill", "gray")
        .text("Chart Author: Oscar Boochever");
});
