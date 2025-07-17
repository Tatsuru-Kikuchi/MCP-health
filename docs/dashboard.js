// Global variables for charts
let costChart, roiChart, productivityChart, timelineChart;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeControls();
    createCharts();
    updateAnalysis();
});

function initializeControls() {
    const controls = ['ai-adoption', 'admin-efficiency', 'error-reduction', 'implementation-cost'];
    
    controls.forEach(id => {
        const slider = document.getElementById(id);
        const display = document.getElementById(id + '-value');
        
        slider.addEventListener('input', function() {
            let value = this.value;
            if (id === 'implementation-cost') {
                display.textContent = `¥${value}B`;
            } else {
                display.textContent = `${value}%`;
            }
        });
    });
}

function createCharts() {
    // Cost Comparison Chart
    const costCtx = document.getElementById('costComparisonChart').getContext('2d');
    costChart = new Chart(costCtx, {
        type: 'bar',
        data: {
            labels: ['Administrative Costs', 'Clinical Operations', 'Error Handling', 'Total Healthcare'],
            datasets: [{
                label: 'Without AI (Trillion ¥)',
                data: [0.7, 35.2, 2.1, 45.0],
                backgroundColor: 'rgba(231, 76, 60, 0.7)',
                borderColor: 'rgba(231, 76, 60, 1)',
                borderWidth: 2
            }, {
                label: 'With AI (Trillion ¥)',
                data: [0.35, 32.8, 0.5, 41.8],
                backgroundColor: 'rgba(39, 174, 96, 0.7)',
                borderColor: 'rgba(39, 174, 96, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ¥' + context.parsed.y.toFixed(1) + 'T';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Cost (Trillion ¥)'
                    }
                }
            }
        }
    });

    // ROI Chart
    const roiCtx = document.getElementById('roiChart').getContext('2d');
    roiChart = new Chart(roiCtx, {
        type: 'line',
        data: {
            labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
            datasets: [{
                label: 'Cumulative Savings (Trillion ¥)',
                data: [-2.0, 1.2, 4.8, 8.9, 13.5],
                borderColor: 'rgba(102, 126, 234, 1)',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }, {
                label: 'Break-even Line',
                data: [0, 0, 0, 0, 0],
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                borderDash: [5, 5],
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Cumulative Value (Trillion ¥)'
                    }
                }
            }
        }
    });

    // Productivity Chart
    const productivityCtx = document.getElementById('productivityChart').getContext('2d');
    productivityChart = new Chart(productivityCtx, {
        type: 'radar',
        data: {
            labels: ['Administrative Efficiency', 'Error Reduction', 'Processing Speed', 'Patient Throughput', 'Quality Improvement', 'Cost Reduction'],
            datasets: [{
                label: 'Without AI',
                data: [100, 100, 100, 100, 100, 100],
                borderColor: 'rgba(231, 76, 60, 1)',
                backgroundColor: 'rgba(231, 76, 60, 0.2)',
                borderWidth: 2
            }, {
                label: 'With AI',
                data: [150, 175, 400, 125, 118, 115],
                borderColor: 'rgba(39, 174, 96, 1)',
                backgroundColor: 'rgba(39, 174, 96, 0.2)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 500
                }
            }
        }
    });

    // Timeline Chart
    const timelineCtx = document.getElementById('timelineChart').getContext('2d');
    timelineChart = new Chart(timelineCtx, {
        type: 'line',
        data: {
            labels: ['Month 0', 'Month 6', 'Month 12', 'Month 18', 'Month 24', 'Month 30', 'Month 36'],
            datasets: [{
                label: 'Implementation Progress (%)',
                data: [0, 15, 35, 60, 80, 95, 100],
                borderColor: 'rgba(102, 126, 234, 1)',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }, {
                label: 'Cost Savings Realization (%)',
                data: [0, 5, 20, 45, 70, 90, 100],
                borderColor: 'rgba(39, 174, 96, 1)',
                backgroundColor: 'rgba(39, 174, 96, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Progress (%)'
                    }
                }
            }
        }
    });
}

function updateAnalysis() {
    // Get current parameter values
    const aiAdoption = parseInt(document.getElementById('ai-adoption').value);
    const adminEfficiency = parseInt(document.getElementById('admin-efficiency').value);
    const errorReduction = parseInt(document.getElementById('error-reduction').value);
    const implementationCost = parseFloat(document.getElementById('implementation-cost').value);

    // Calculate impacts based on parameters
    const baselineCosts = {
        administrative: 0.7, // Trillion ¥
        clinical: 35.2,
        errors: 2.1,
        total: 45.0
    };

    // Apply AI improvements
    const aiImpact = aiAdoption / 100;
    const adminSavings = baselineCosts.administrative * (adminEfficiency / 100) * aiImpact;
    const errorSavings = baselineCosts.errors * (errorReduction / 100) * aiImpact;
    const clinicalSavings = baselineCosts.clinical * 0.08 * aiImpact; // 8% clinical efficiency gain

    const totalSavings = adminSavings + errorSavings + clinicalSavings;
    const newTotal = baselineCosts.total - totalSavings;

    // Update key metrics
    updateMetrics(totalSavings, implementationCost, adminEfficiency, aiImpact);

    // Update charts
    updateCharts(baselineCosts, adminSavings, errorSavings, clinicalSavings, newTotal, implementationCost);

    // Update comparison table
    updateComparisonTable(baselineCosts, adminSavings, errorSavings, clinicalSavings, aiImpact);
}