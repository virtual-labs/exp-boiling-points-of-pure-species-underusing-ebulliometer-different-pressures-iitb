var table3: string[][] = [];
var table3_precise: number[][] = [];
var table3_col_headings;

var sigma_1_by_Tb: number = 0;
var sigma_ln_p2: number = 0;
var sigma_ln_p2_by_tb: number = 0;

var act5_btn = `<button id="panel1_btn" class="btn btn-primary" onclick="activity6();" style="position: absolute; bottom: 8vh; width: 85%;">Next</button>`;

function activity5() {
	pp.clearleftpannel();
	pp.clearrightpannel();
	pp.addoffcanvas(3);

	pp.showtitle(
		`<div id='exp-title'>To determine the Boiling point of pure species under different pressures</div>`,
		3
	);

	calculate_table3();

	console.log(table3);

	table3_col_headings = [
		'Sr No.',
		'T<sub>B</sub> (K)',
		'P<sub>2</sub> (kPa)',
		`1/T<sub>B</sub> (K<sup>-1</sup>)`,
		`ln(P<sub>2</sub>)`,
		`ln(P<sub>2</sub>)/T<sub>B</sub>`,
		`Check`,
	];

	let table3_verify_row = [
		[
			'1',
			`${table3[0][1]}`,
			`${table3[0][2]}`,
			`<input type="text"  id="inp-1">`,
			`<input type="text"  id="inp-2">`,
			`<input type="text"  id="inp-3">`,
			`<input type="submit" class="btn btn-primary" onclick="verify_table3();">`,
		],
	];

	let table_3 = new Table(table3_col_headings, table3_verify_row);

	pp.addtoleftpannel(table_3.template);

	table_3.draw();
}

function calculate_table3() {
	for (let i = 0; i < main_table_data.length; i++) {
		table3.push([
			(i + 1).toString(),
			main_table_data[i][3].toFixed(2),
			main_table_data[i][2].toFixed(3),
			(1 / main_table_data[i][3]).toFixed(5),
			Math.log(main_table_data[i][2]).toFixed(4),
			(Math.log(main_table_data[i][2]) / main_table_data[i][3]).toFixed(
				5
			),
		]);

		table3_precise.push([
			i + 1,
			main_table_data[i][3],
			main_table_data[i][2],
			1 / main_table_data[i][3],
			Math.log(main_table_data[i][2]),
			Math.log(main_table_data[i][2]) / main_table_data[i][3],
		]);
	}
}

function verify_table3() {
	let val1: HTMLInputElement = <HTMLInputElement>(
		document.getElementById(`inp-1`)
	);
	let val2: HTMLInputElement = <HTMLInputElement>(
		document.getElementById(`inp-2`)
	);
	let val3: HTMLInputElement = <HTMLInputElement>(
		document.getElementById(`inp-3`)
	);

	console.log(parseFloat(val1.value), parseFloat(table3[0][2]));
	console.log('1/Tb- ', parseFloat(table3[0][3]));
	console.log('ln(P2)- ', parseFloat(table3[0][4]));
	console.log('ln(P2)/Tb - ', parseFloat(table3[0][5]));

	if (!verify_values(parseFloat(val1.value), parseFloat(table3[0][3]))) {
		alert(`please correct 1/Tb value!!`);
		return;
	}

	if (!verify_values(parseFloat(val2.value), parseFloat(table3[0][4]))) {
		alert(`please correct ln(P2) value!!`);
		return;
	}

	if (!verify_values(parseFloat(val3.value), parseFloat(table3[0][5]))) {
		alert(`please correct ln(p2)/Tb value!!`);
		return;
	}

	alert('Congrats!! Calculations are right.');

	table3_col_headings.pop();

	complete_table3(table3_col_headings);
}

function complete_table3(headings) {
	let act5_table = new Table(headings, table3);

	pp.addtoleftpannel(act5_table.template);

	pp.addtoleftpannel(act5_table.template);

	act5_table.draw();

	calculate_summation();

	let sigma_text = `
    <div>
        <label for="">&Sigma; 1/T<sub>B</sub></label>
        <input class="form-control" type="number" name="" id="sigma-1">
        <br>
        <label for="">&Sigma; ln(P<sub>2</sub>)</label>
        <input class="form-control" type="number" name="" id="sigma-2">
        <br>
        <label for="">&Sigma; ln(P<sub>2</sub>)/T<sub>B</sub></label>
        <input class="form-control" type="number" name="" id="sigma-3">

        <br><br>

        <input type="button" onclick="verify_sigma();" value="verify" class='btn btn-primary'>

    </div>
    `;

	pp.showdescription(sigma_text, 3);
}

function calculate_summation() {
	sigma_1_by_Tb = 0;
	sigma_ln_p2 = 0;
	sigma_ln_p2_by_tb = 0;

	for (let i = 0; i < table3.length; i++) {
		sigma_1_by_Tb += table3_precise[i][3];
		sigma_ln_p2 += table3_precise[i][4];
		sigma_ln_p2_by_tb += table3_precise[i][5];
	}

	// console.log(sigma_1_by_Tb, sigma_ln_p2, sigma_ln_p2_by_tb);
}

function verify_sigma() {
	let val1: HTMLInputElement = <HTMLInputElement>(
		document.getElementById(`sigma-1`)
	);
	let val2: HTMLInputElement = <HTMLInputElement>(
		document.getElementById(`sigma-2`)
	);
	let val3: HTMLInputElement = <HTMLInputElement>(
		document.getElementById(`sigma-3`)
	);

	// console.log(parseFloat(val1.value), parseFloat(table3[0][2]));
	console.log('sigma 1/Tb- ', sigma_1_by_Tb);
	console.log('Sigma ln(P2)', sigma_ln_p2);
	console.log('Sigma ln(p2)/Tb', sigma_ln_p2_by_tb);

	if (!verify_values(parseFloat(val1.value), sigma_1_by_Tb)) {
		alert(`please correct Sigma 1/Tb value!!`);
		return;
	}

	if (!verify_values(parseFloat(val2.value), sigma_ln_p2)) {
		alert(`please correct Sigma ln(P2) value!!`);
		return;
	}

	if (!verify_values(parseFloat(val3.value), sigma_ln_p2_by_tb)) {
		alert(`please correct Sigma ln(p2)/Tb value!!`);
		return;
	}

	pp.showdescription(
		`<div class='discription_text'>Your Values are Correct!!</div>`,
		3
	);

	pp.addtorightpannel(act5_btn, 3);
}
