// var act6_ob_btn = `<button id="panel1_btn" class="btn btn-primary" onclick="complete_table_3();" style="position: absolute; bottom: 8vh; width: 85%;">Next</button>`;
var X1 = [];
var X2 = [];
var Y = [];
var pol;
var label = [];
var data = [];
var data1 = [];
var data2 = [];
var A1;
var B1;
var C1;
function activity6() {
    pp.clearleftpannel();
    get_plot_values();
}
function get_plot_values() {
    X1 = [];
    X2 = [];
    Y = [];
    for (let i = 0; i < table3_precise.length; i++) {
        X1.push(table3_precise[i][3]);
        X2.push(table3_precise[i][5]);
        Y.push(table3_precise[i][4]);
    }
    pol = regression_linear_2variable(X1, X2, Y);
    A1 = pol[0];
    C1 = -pol[2];
    B1 = A1 * C1 - pol[1];
    // A = pol[0];
    // C = -pol[2];
    // B = A * C - pol[1];
    draw_chart();
}
function draw_chart() {
    document.getElementById('hide_panel3').click();
    pp.clearleftpannel();
    pp.addcanvas('myChart');
    if (document.getElementById('panel1_btn')) {
        document.getElementById("panel1_btn").remove();
    }
    // pp.addButtonToRightPanel("hello", print_hello, 3);
    for (let i = 0; i < main_table_data.length; i++) {
        label.push(table3_precise[i][1]);
        data.push(table3_precise[i][2]);
    }
    calculate_y_datapoints();
    calculate_yy_datapoints();
    var ctx = document.getElementById('myChart');
    ctx.style.backgroundColor = "white";
    ctx.style.marginTop = "5px";
    ctx.style.marginLeft = "10%";
    ctx.style.padding = "10px";
    ctx.style.borderRadius = "8px";
    if (typeof chart != 'undefined') {
        chart.destroy();
    }
    // let labels = [0.004, 0.007, 0.010, 0.014, 0.020, 0.029, 0.039];
    // let data1=[82.28,96.86,104.07,108.28,112.48,117.68,125.35];//hi_expt
    // let data2=[146.90,183.50,204.11,230.09,256.89,290.83,323.49];//hi_st
    var chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: label,
            datasets: [
                {
                    label: 'Experimental',
                    data: data,
                    fill: false,
                    borderColor: 'blue',
                    tension: 0.5,
                    showLine: false,
                    // yAxisID: 'A',
                    // borderWidth: 1,
                    // borderColor: "green",
                    // backgroundColor: "rgba(34, 139, 34, 0.5)",
                },
                {
                    label: 'ln(p) = A - B/(C + T)',
                    data: data1,
                    fill: false,
                    borderColor: 'red',
                    tension: 0.5,
                    showLine: true
                    // yAxisID: 'A',
                    // borderWidth: 1,
                    // borderColor: "red",
                    // backgroundColor: "rgba(255, 0, 0, 0.5)",
                },
                {
                    label: 'ln10(P) = A - B/(T - 273.15 + C)',
                    data: data2,
                    fill: false,
                    borderColor: 'green',
                    tension: 0.5,
                    showLine: true
                    // yAxisID: 'A',
                    // borderWidth: 1,
                    // borderColor: "red",
                    // backgroundColor: "rgba(255, 0, 0, 0.5)",
                },
            ]
        },
        options: {
            maintainAspectRatio: true,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'P (kPa)',
                        font: { size: 14, weight: 'bold' }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'T (K)',
                        font: { size: 14, weight: 'bold' }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `P vs T`,
                    font: { size: 18 },
                },
                legend: { labels: { font: { size: 14, weight: 'bold' } } }
            },
        }
    });
}
function calculate_y_datapoints() {
    // pol = regression_linear(label, data);
    // console.log(pol);
    for (let i = 0; i < label.length; i++) {
        data1.push(Math.exp(A1 - B1 / (C1 + table3_precise[i][1])));
    }
}
function calculate_yy_datapoints() {
    // pol = regression_linear(label, data);
    // console.log(pol);
    for (let i = 0; i < label.length; i++) {
        data2.push(0.133322 * Math.pow(10, (A - B / (table3_precise[i][1] - 273.15 + C))));
    }
}
//# sourceMappingURL=activity6.js.map