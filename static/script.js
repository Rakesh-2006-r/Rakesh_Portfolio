let globalLayoutConfig = null;
let globalCmData = null;

document.getElementById('prediction-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button');
    const resultContent = document.getElementById('result-content');
    const loader = document.getElementById('loader');
    const resultBox = document.getElementById('result-box');
    
    // UI Loading State
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    resultContent.style.display = 'none';
    document.getElementById('gauge-chart').style.display = 'none';
    loader.style.display = 'block';
    resultBox.className = 'card result-card glass'; // reset classes
    
    // Gather Data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            const percentage = (result.probability * 100).toFixed(1);
            resultContent.innerHTML = `
                <h3>${result.message}</h3>
                <p>Confidence: <strong>${percentage}%</strong></p>
            `;
            
            // Show Gauge Chart
            document.getElementById('gauge-chart').style.display = 'block';
            const gaugeColor = result.prediction === 1 ? '#00e676' : '#ff3d00';
            
            const gaugeData = [
              {
                type: "indicator",
                mode: "gauge+number",
                value: result.probability * 100,
                title: { text: "Engagement Probability", font: { color: "#b0b0c0", size: 14 } },
                number: { suffix: "%", font: { color: "white" } },
                gauge: {
                  axis: { range: [0, 100], tickwidth: 1, tickcolor: "#b0b0c0" },
                  bar: { color: gaugeColor },
                  bgcolor: "rgba(0,0,0,0)",
                  borderwidth: 0,
                  steps: [
                    { range: [0, 50], color: "rgba(255, 61, 0, 0.2)" },
                    { range: [50, 100], color: "rgba(0, 230, 118, 0.2)" }
                  ]
                }
              }
            ];
            
            const gaugeLayout = {
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)',
                margin: { t: 50, b: 25, l: 40, r: 40 },
                font: { family: 'Outfit' }
            };
            
            Plotly.newPlot('gauge-chart', gaugeData, gaugeLayout, {displayModeBar: false});
            
            if (result.prediction === 1) {
                resultBox.classList.add('success');
            } else {
                resultBox.classList.add('failure');
            }
            
            // Highlight Confusion Matrix
            if (globalCmData) {
                const x0 = result.prediction === 1 ? 0.5 : -0.5;
                const x1 = result.prediction === 1 ? 1.5 : 0.5;
                const highlightColor = result.prediction === 1 ? 'rgba(0, 210, 255, 0.3)' : 'rgba(255, 61, 0, 0.3)';
                
                const updatedLayout = {
                    ...globalLayoutConfig,
                    title: { text: 'Confusion Matrix (Highlighting Predicted Class)', font: { size: 12 } },
                    annotations: globalCmData.annotations,
                    shapes: [
                        {
                            type: 'rect',
                            x0: x0,
                            x1: x1,
                            y0: -0.5,
                            y1: 1.5,
                            fillcolor: highlightColor,
                            opacity: 0.5,
                            line: { width: 2, color: 'white' }
                        }
                    ]
                };
                Plotly.react('cm-chart', [globalCmData.trace], updatedLayout, {displayModeBar: false});
            }
        } else {
            resultContent.innerHTML = `
                <h3 style="color: #ff3d00;">Error</h3>
                <p>${result.error}</p>
            `;
        }
    } catch (error) {
        resultContent.innerHTML = `
            <h3 style="color: #ff3d00;">Connection Error</h3>
            <p>Could not connect to the model API.</p>
        `;
    } finally {
        loader.style.display = 'none';
        resultContent.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }
});

// Load Dynamic Charts on Page Load
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/metrics');
        const data = await response.json();
        
        if (response.ok) {
            // Plotly layout configuration for Dark Mode aesthetics
            globalLayoutConfig = {
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)',
                font: { color: '#b0b0c0', family: 'Outfit' },
                margin: { l: 80, r: 20, t: 50, b: 50 },
                xaxis: { gridcolor: 'rgba(255,255,255,0.1)' },
                yaxis: { gridcolor: 'rgba(255,255,255,0.1)' }
            };

            // 1. Render ROC Curve
            const rocTrace = {
                x: data.roc.fpr,
                y: data.roc.tpr,
                type: 'scatter',
                mode: 'lines',
                line: { color: '#ff007f', width: 3 },
                name: 'Random Forest'
            };
            
            const randomGuess = {
                x: [0, 1],
                y: [0, 1],
                type: 'scatter',
                mode: 'lines',
                line: { color: '#8a2be2', width: 2, dash: 'dash' },
                name: 'Random Guess'
            };
            
            const rocLayout = {
                ...globalLayoutConfig,
                title: { text: 'ROC Curve', font: { size: 14 } },
                showlegend: false
            };
            
            Plotly.newPlot('roc-chart', [rocTrace, randomGuess], rocLayout, {displayModeBar: false});

            // 2. Render Confusion Matrix Heatmap
            const cmData = data.confusion_matrix;
            // Reverse y-axis to match standard confusion matrix plotting
            const zValues = [[cmData[1][0], cmData[1][1]], [cmData[0][0], cmData[0][1]]];
            const yLabels = ['1 (High)', '0 (Normal)'];
            const xLabels = ['0 (Normal)', '1 (High)'];

            const cmTrace = {
                z: zValues,
                x: xLabels,
                y: yLabels,
                type: 'heatmap',
                colorscale: [[0, '#24243e'], [1, '#00d2ff']],
                showscale: false
            };
            
            // Add annotations for numbers in cells
            const annotations = [];
            for ( let i = 0; i < yLabels.length; i++ ) {
                for ( let j = 0; j < xLabels.length; j++ ) {
                    annotations.push({
                        x: xLabels[j],
                        y: yLabels[i],
                        text: String(zValues[i][j]),
                        font: { color: 'white', size: 16, weight: 'bold' },
                        showarrow: false
                    });
                }
            }

            const cmLayout = {
                ...globalLayoutConfig,
                title: { text: 'Confusion Matrix', font: { size: 14 } },
                annotations: annotations
            };

            globalCmData = {
                trace: cmTrace,
                annotations: annotations
            };

            Plotly.newPlot('cm-chart', [cmTrace], cmLayout, {displayModeBar: false});
            
            // Add click-to-zoom (lightbox) feature
            document.querySelectorAll('.chart-container').forEach(container => {
                container.addEventListener('click', function(e) {
                    // Ignore clicks on Plotly's internal modebar buttons if they were enabled
                    if (e.target.closest('.modebar')) return;
                    
                    this.classList.toggle('zoomed');
                    // Force Plotly to recalculate size to fit the new fullscreen dimensions
                    // Wait 350ms for the CSS 'transition: all 0.3s ease' to complete
                    setTimeout(() => {
                        Plotly.Plots.resize(this);
                    }, 350);
                });
            });
        }
    } catch (error) {
        console.error("Error loading charts:", error);
    }
});
