// var act6_ob_btn = `<button id="panel1_btn" class="btn btn-primary" onclick="complete_table_3();" style="position: absolute; bottom: 8vh; width: 85%;">Next</button>`;

// var act6_ob_btn_1 = `<button id="panel1_btn" class="btn btn-primary" onclick="draw_chart();" style="position: absolute; bottom: 8vh; width: 85%;">Plot Graph</button>`;

// var obs_table_2 = `
// <table class="table" style="height: 50%">
// <thead>
//   <tr>
//     <th scope="col">Sr No.</th>
//     <th scope="col">T (&#8451;)</th>
//     <th scope="col">K_avg W/m-K</th>
//     <th id="act6-check" scope="col">Ckeck</th>

//   </tr>
// </thead>
// <tbody id="obt3-body">
// <tr>
//     <td>1</td>
//     <td>${table_3[0][0]}</td>
//     <td><input  id="k-avg-input" type="number" name="" id=""></td>
//     <td><input id="act6-verify-btn" onclick="verify_avg_values();" class="btn btn-primary" value="Verify" type="button" name="" id=""></td>
// </tr>
// </tbody>
// </table>
// `;

// var k_values = '<p>K values = [<span id="k-values"></span>]</p>';

// function activity6() {
//     pp.clearleftpannel();
//     pp.clearrightpannel();

//     pp.addoffcanvas(3);

//     pp.showtitle("Table for Average Conductivity", 3);

//     pp.showdescription(' <p style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: calc(0.7vw + 12px);">Calculate and input the K_Avg value. <br>  K_avg = (K<sub>1</sub> + K<sub>2</sub> + K<sub>3</sub> + ..... K<sub>n</sub>) / n</p>', 3);

//     // var bsOffcanvas = new bootstrap.Offcanvas(
//     //     document.getElementById("offcanvasRight3")
//     //   );
//     //   bsOffcanvas.show();

//     pp.addtoleftpannel(k_values);
//     load_k_values();

//     pp.addtoleftpannel(obs_table_2);

// }

// function verify_avg_values() {

//     let val1: HTMLInputElement = <HTMLInputElement>document.getElementById("k-avg-input");

//     console.log(parseFloat(val1.value));

//     // console.log(Q.value, To.value, Ti.value, ti.value, to.value);

//     if (!verify_values(parseFloat(val1.value), table_3[0][1])) {
//       console.log("please input the correct K-avg value");
//       return;
//     }

//     pp.showdescription('<p style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: calc(0.7vw + 12px);">Click next to complete the table</p>', 3);

//     pp.addtorightpannel(act6_ob_btn, 3);

//     // var bsOffcanvas = new bootstrap.Offcanvas(
//     //   document.getElementById("offcanvasRight3")
//     // );
//     // bsOffcanvas.show();

//     complete_table_3();

// }

// function load_k_values() {
//     let ele = document.getElementById('k-values');

//     for(let i=0; i<main_table_data.length; i++) {
//         ele.innerText += `${main_table_data[i][8].toFixed(2) + ", "}`
//     }
// }

// function complete_table_3() {
//     let table_body = document.getElementById('obt3-body');

//     document.getElementById('act6-check').remove();
//     document.getElementById('act6-verify-btn').remove();

//     table_body.innerHTML = ``;

//     close_offcanvas();

//     document.getElementById('panel1_btn').remove();

//     pp.showdescription('<p style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: calc(0.7vw + 12px);">Now, we have K_avg to plot</p>', 3);

//     pp.addtorightpannel(act6_ob_btn_1, 3);

//     for(let i=0; i<table_3.length; i++) {
//         let row = document.createElement('tr');

//         let val1 = table_3[i][0].toString();

//         let val2 = std_deviation(table_3[i][1]);

//         if(i == 0) {
//         val2 = table_3[i][1];
//         }

//         table_3[i][1] = val2;

//         row.innerHTML = `
//         <td>${i+1}</td>
//         <td>${val1}</td>
//         <td>${val2}</td>
//         `;

//         table_body.append(row);
//     }

// }

declare var Chart;

var X1: number[] = [];
var X2: number[] = [];
var Y: number[] = [];
var pol;
var label = [];
var data = [];
var data1 = [];
var data2 = [];
var A1: number;
var B1: number;
var C1: number;

function activity6() {
	pp.clearleftpannel();
	pp.showdescription(
		`
	 <div class='discription_text'>
	     Experiment Completed!!
	 </div>
	 `,
		3
	);

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
		document.getElementById('panel1_btn').remove();
	}

	// pp.addButtonToRightPanel("hello", print_hello, 3);

	for (let i = 0; i < main_table_data.length; i++) {
		label.push(table3_precise[i][1]);
		data.push(table3_precise[i][2]);
	}

	calculate_y_datapoints();
	calculate_yy_datapoints();
	var ctx = document.getElementById('myChart');
	ctx.style.backgroundColor = 'white';
	ctx.style.marginTop = '5px';
	ctx.style.marginLeft = '10%';
	ctx.style.padding = '10px';
	ctx.style.borderRadius = '8px';
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
					label: `ln(p) = ${A1.toFixed(2)} - ${B1.toFixed(
						2
					)}/(${C1.toFixed(2)} + T)`,
					data: data1,
					fill: false,
					borderColor: 'red',
					tension: 0.5,
					showLine: true,
					// yAxisID: 'A',
					// borderWidth: 1,
					// borderColor: "red",
					// backgroundColor: "rgba(255, 0, 0, 0.5)",
				},

				{
					label: `ln10(P) = ${A.toFixed(2)} - ${B.toFixed(
						2
					)}/(T - 273.15 + ${C.toFixed(2)})`,
					data: data2,
					fill: false,
					borderColor: 'green',
					tension: 0.5,
					showLine: true,
					// yAxisID: 'A',
					// borderWidth: 1,
					// borderColor: "red",
					// backgroundColor: "rgba(255, 0, 0, 0.5)",
				},
			],
		},
		options: {
			maintainAspectRatio: true,
			scales: {
				y: {
					title: {
						display: true,
						text: 'P (kPa)',
						font: { size: 14, weight: 'bold' },
					},
				},
				x: {
					title: {
						display: true,
						text: 'T (K)',
						font: { size: 14, weight: 'bold' },
					},
				},
			},
			plugins: {
				title: {
					display: true,
					text: `P vs T`,
					font: { size: 18 },
				},
				legend: { labels: { font: { size: 14, weight: 'bold' } } },
			},
		},
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
		data2.push(
			0.133322 * 10 ** (A - B / (table3_precise[i][1] - 273.15 + C))
		);
	}
}
