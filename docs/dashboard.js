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

function updateMetrics(totalSavings, implementationCost, adminEfficiency, aiImpact) {
    // Annual savings
    document.getElementById('annual-savings').textContent = `¥${totalSavings.toFixed(1)}T`;
    document.getElementById('savings-change').textContent = `+${(totalSavings/45*100).toFixed(0)}% vs baseline`;

    // ROI calculation
    const annualNetSavings = totalSavings - (implementationCost * 0.1); // 10% annual maintenance
    const fiveYearRoi = ((annualNetSavings * 5 - implementationCost) / implementationCost * 100);
    const paybackPeriod = implementationCost / annualNetSavings;

    document.getElementById('roi-value').textContent = `${fiveYearRoi.toFixed(0)}%`;
    document.getElementById('roi-change').textContent = `Payback: ${paybackPeriod.toFixed(1)} years`;

    // Administrative reduction
    document.getElementById('admin-reduction').textContent = `-${adminEfficiency}%`;

    // Patient throughput
    const throughputIncrease = Math.round(22 * aiImpact);
    document.getElementById('patient-increase').textContent = `+${throughputIncrease}%`;
    document.getElementById('throughput-change').textContent = 'Capacity improvement';
}

function updateCharts(baselineCosts, adminSavings, errorSavings, clinicalSavings, newTotal, implementationCost) {
    // Update cost comparison chart
    costChart.data.datasets[1].data = [
        baselineCosts.administrative - adminSavings,
        baselineCosts.clinical - clinicalSavings,
        baselineCosts.errors - errorSavings,
        newTotal
    ];
    costChart.update();

    // Update ROI chart with new implementation cost
    const cumulativeSavings = [];
    const annualSavings = adminSavings + errorSavings + clinicalSavings;
    const maintenanceCost = implementationCost * 0.1;
    
    for (let year = 1; year <= 5; year++) {
        const cumulative = (annualSavings - maintenanceCost) * year - implementationCost;
        cumulativeSavings.push(cumulative);
    }
    
    roiChart.data.datasets[0].data = cumulativeSavings;
    roiChart.update();

    // Update productivity chart based on parameters
    const aiAdoption = parseInt(document.getElementById('ai-adoption').value);
    const adminEfficiency = parseInt(document.getElementById('admin-efficiency').value);
    const errorReduction = parseInt(document.getElementById('error-reduction').value);
    
    productivityChart.data.datasets[1].data = [
        100 + (adminEfficiency * aiAdoption / 100),
        100 + (errorReduction * aiAdoption / 100),
        100 + (300 * aiAdoption / 100), // Processing speed
        100 + (25 * aiAdoption / 100),  // Patient throughput
        100 + (18 * aiAdoption / 100),  // Quality improvement
        100 + (15 * aiAdoption / 100)   // Cost reduction
    ];
    productivityChart.update();
}

function updateComparisonTable(baselineCosts, adminSavings, errorSavings, clinicalSavings, aiImpact) {
    const tableData = [
        {
            metric: 'Administrative Costs',
            baseline: '¥0.70T',
            withAI: `¥${(baselineCosts.administrative - adminSavings).toFixed(2)}T`,
            improvement: `-${(adminSavings/baselineCosts.administrative*100).toFixed(1)}%`,
            annualImpact: `¥${(adminSavings*1000).toFixed(0)}B`
        },
        {
            metric: 'Error-Related Costs',
            baseline: '¥2.10T',
            withAI: `¥${(baselineCosts.errors - errorSavings).toFixed(2)}T`,
            improvement: `-${(errorSavings/baselineCosts.errors*100).toFixed(1)}%`,
            annualImpact: `¥${(errorSavings*1000).toFixed(0)}B`
        },
        {
            metric: 'Clinical Operation Costs',
            baseline: '¥35.20T',
            withAI: `¥${(baselineCosts.clinical - clinicalSavings).toFixed(2)}T`,
            improvement: `-${(clinicalSavings/baselineCosts.clinical*100).toFixed(1)}%`,
            annualImpact: `¥${(clinicalSavings*1000).toFixed(0)}B`
        },
        {
            metric: 'Processing Time',
            baseline: '4.0 hours',
            withAI: `${(4.0 * (1 - 0.75 * aiImpact)).toFixed(1)} hours`,
            improvement: `-${(75 * aiImpact).toFixed(0)}%`,
            annualImpact: 'Efficiency gain'
        },
        {
            metric: 'Error Rate',
            baseline: '2.5%',
            withAI: `${(2.5 * (1 - 0.75 * aiImpact)).toFixed(1)}%`,
            improvement: `-${(75 * aiImpact).toFixed(0)}%`,
            annualImpact: 'Quality improvement'
        },
        {
            metric: 'Patient Throughput',
            baseline: '20 patients/worker/day',
            withAI: `${(20 * (1 + 0.22 * aiImpact)).toFixed(1)} patients/worker/day`,
            improvement: `+${(22 * aiImpact).toFixed(0)}%`,
            annualImpact: 'Capacity increase'
        }
    ];

    const tbody = document.getElementById('comparison-table-body');
    tbody.innerHTML = '';
    
    tableData.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${row.metric}</strong></td>
            <td>${row.baseline}</td>
            <td>${row.withAI}</td>
            <td class="${row.improvement.includes('-') ? 'positive' : 'positive'}">${row.improvement}</td>
            <td><strong>${row.annualImpact}</strong></td>
        `;
        tbody.appendChild(tr);
    });
}

// Add interactive features
document.querySelectorAll('.metric-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Export functionality
function exportData() {
    const data = {
        parameters: {
            aiAdoption: document.getElementById('ai-adoption').value,
            adminEfficiency: document.getElementById('admin-efficiency').value,
            errorReduction: document.getElementById('error-reduction').value,
            implementationCost: document.getElementById('implementation-cost').value
        },
        results: {
            annualSavings: document.getElementById('annual-savings').textContent,
            roi: document.getElementById('roi-value').textContent,
            adminReduction: document.getElementById('admin-reduction').textContent,
            patientIncrease: document.getElementById('patient-increase').textContent
        },
        timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'medical-ai-analysis.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Add export button after page loads
window.addEventListener('load', function() {
    const exportBtn = document.createElement('button');
    exportBtn.textContent = '📊 Export Analysis';
    exportBtn.className = 'update-button';
    exportBtn.style.marginLeft = '10px';
    exportBtn.onclick = exportData;
    document.querySelector('.update-button').parentNode.appendChild(exportBtn);
});