// Function to create the enhanced bar chart with modern font and label on hover
function createModernBarChart(data) {
    // Convert 'Count' to numbers
    data.forEach(d => {
        d.Count = +d.Count;
    });

    // Sort the data by count
    data.sort((a, b) => b.Count - a.Count);

    // Select the top 10 entries
    const top10Data = data.slice(0, 10);

    // Calculate maxCount for yScale domain
    const maxCount = d3.max(top10Data, d => d.Count);

    // Set up SVG container
    const svg = d3.select("body").append("svg").attr("width", 800).attr("height", 400);

    // Create yScale
    const yScale = d3.scaleLinear()
        .domain([0, maxCount])
        .range([400, 0]);

    // Create bars with hover effect
    svg.selectAll("rect")
        .data(top10Data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 80)
        .attr("y", d => yScale(d.Count))
        .attr("width", 75)
        .attr("height", d => 400 - yScale(d.Count))
        .attr("fill", "lightblue")  // Set all bars to light blue
        .on("mouseover", function (event, d) {
            d3.select(this).attr("fill", "orange");  // Change color on hover to orange

            // Add label on hover
            svg.append("text")
                .attr("id", "hoverLabel")
                .attr("x", (d, i) => event.x)
                .attr("y", event.y - 10)
                .attr("font-family", "Roboto")
                .attr("font-weight", "bold")
                .attr("font-size", "12px")
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .text(d.reason);
        })
        .on("mouseout", function () {
            d3.select(this).attr("fill", "lightblue");  // Revert to original color on mouseout

            // Remove label on mouseout
            svg.select("#hoverLabel").remove();
        });

    // Add values at the top of the bars
    svg.selectAll("text.value")
        .data(top10Data)
        .enter()
        .append("text")
        .text(d => d.Count)
        .attr("x", (d, i) => i * 80 + 38)
        .attr("y", d => yScale(d.Count) - 5)  // Adjusted y-coordinate for better positioning
        .attr("font-size", "14px")  // Larger text labels
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .attr("class", "value");  // Added a class for easier selection

    // Add a title
    svg.append("text")
        .attr("x", 400)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Top 10 Reasons in 311 Boston Data");

    // Add x-axis label
    svg.append("text")
        .attr("x", 400)
        .attr("y", 380)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text("Reasons");

    // Add y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -200)
        .attr("y", 10)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text("Count");
}

// Load your dataset and call the createModernBarChart function
d3.csv("311_boston_data.csv").then(createModernBarChart);
