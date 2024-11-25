function verify_values(value: number, truevalue: number): boolean {
	if (truevalue == 0 && value == truevalue) {
		return true;
	}

	let calculated_value = Math.abs(((truevalue - value) / truevalue) * 100);

	if (calculated_value <= 4) {
		return true;
	} else {
		return false;
	}
}

function random(min: number, max: number): number {
	let num = (max - min) * Math.random() + min;
	return num;
}

function random1(min, max) {
	let num = (max - min) * Math.random() + min;
	return parseInt(num);
}

function std_deviation(num: number) {
	let std = num / 100.0;

	let dev = num - random(-std, std);

	return dev;
}

function regression_linear(x: number[], y: number[]): number[] {
	let sumx = 0;
	let sumy = 0;
	let sumxy = 0;
	let sumxx = 0;
	let n = x.length;
	for (let i = 0; i < n; i++) {
		sumx += x[i];
		sumy += y[i];
		sumxy += x[i] * y[i];
		sumxx += x[i] * x[i];
	}
	let pol = [];
	pol[0] = (sumx * sumy - n * sumxy) / (sumx ** 2 - n * sumxx);
	pol[1] = (sumy - pol[0] * sumx) / n;
	return pol;
}

function ascending_random_array() {
	let arr = new Array();

	while (true) {
		let x = random1(0, 40);
		let found = false;
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] == x) {
				found = true;
			}
		}
		if (!found) {
			arr.push(x);
			if (arr.length == 5) {
				arr.sort(function (a, b) {
					return a - b;
				});
				return arr;
			}
		}
	}
}

function regression_linear_2variable(
	x1: number[],
	x2: number[],
	y: number[]
): number[] {
	let sumx1 = 0;
	let sumx2 = 0;
	let sumx1sq = 0;
	let sumx1x2 = 0;
	let sumx2sq = 0;
	let sumy = 0;
	let sumx1y = 0;
	let sumx2y = 0;
	let n = x1.length;
	for (let i = 0; i < n; i++) {
		sumx1 += x1[i];
		sumx2 += x2[i];
		sumx1sq += x1[i] * x1[i];
		sumx1x2 += x1[i] * x2[i];
		sumx2sq += x2[i] * x2[i];
		sumy += y[i];
		sumx1y += x1[i] * y[i];
		sumx2y += x2[i] * y[i];
	}
	let pol = [];
	let a = [
		[n, sumx1, sumx2],
		[sumx1, sumx1sq, sumx1x2],
		[sumx2, sumx1x2, sumx2sq],
	];
	let c = [sumy, sumx1y, sumx2y];
	// console.log(a);
	// console.log(c);
	pol = gauss(a, c);
	return pol;
}

function gauss(a: number[][], c: number[]): number[] {
	let n = c.length;
	let x = [];
	for (let i = 0; i < n - 1; i++) {
		for (let k = i + 1; k < n; k++) {
			let m = a[k][i] / a[i][i];
			for (let j = 0; j < n; j++) {
				a[k][j] = a[k][j] - m * a[i][j];
			}
			c[k] = c[k] - m * c[i];
		}
		x[i] = 0;
	}
	for (let i = n - 1; i >= 0; i--) {
		let sum = c[i];
		for (let j = i + 1; j < n; j++) {
			sum = sum - x[j] * a[i][j];
		}
		x[i] = sum / a[i][i];
	}
	return x;
}

// x1 = 1/T
// x2 = ln(P)/T
//y = ln(P)

function show_panel(id) {
	try {
		var bsOffcanvas = new bootstrap.Offcanvas(
			document.getElementById(`offcanvasRight${id}`)
		);
		bsOffcanvas.show();
	} catch (error) {
		console.log(error);
	}
}

function hide_panel(id) {
	if (document.getElementById(`hide_panel${id}`)) {
		document.getElementById(`hide_panel${id}`).click();
	}
}
for (let i = 0; i < main_table_data.length; i++) {
	main_table_data[i][0] =
		main_table_data[i][0] + Math.round(2 * Math.random() - 1);
}

// data for activity 2

var all_labels: Chemistry.Text[] = [];

function create_labels() {
	all_labels = [];
	let text = new Chemistry.Text(
		'Vacuum Pump',
		new Chemistry.Point(980, 600),
		canvas
	);
	text.color = 'black';
	text.font = '22vw Arial';

	all_labels.push(text);

	let text1 = new Chemistry.Text(
		'Ballast Tank',
		new Chemistry.Point(1270, 750),
		canvas
	);
	text1.color = 'black';
	text1.font = '22vw Arial';

	all_labels.push(text1);

	let text2 = new Chemistry.Text(
		'Manometer',
		new Chemistry.Point(1040, 60),
		canvas
	);
	text2.color = 'black';
	text2.font = '22vw Arial';

	all_labels.push(text2);

	let text3 = new Chemistry.Text(
		'Heating Tap',
		new Chemistry.Point(1300, 170),
		canvas
	);
	text3.color = 'black';
	text3.font = '22vw Arial';

	all_labels.push(text3);

	let text4 = new Chemistry.Text(
		'Dimmer Stat',
		new Chemistry.Point(1200, 350),
		canvas
	);
	text4.color = 'black';
	text4.font = '22vw Arial';

	all_labels.push(text4);

	let text5 = new Chemistry.Text(
		'Condenser',
		new Chemistry.Point(1300, 550),
		canvas
	);
	text5.color = 'black';
	text5.font = '22vw Arial';

	all_labels.push(text5);

	let text6 = new Chemistry.Text(
		'N2 Tank',
		new Chemistry.Point(1550, 640),
		canvas
	);
	text6.color = 'black';
	text6.font = '22vw Arial';

	all_labels.push(text6);

	let text7 = new Chemistry.Text(
		'Temp Indicator',
		new Chemistry.Point(1680, 170),
		canvas
	);
	text7.color = 'black';
	text7.font = '22vw Arial';

	all_labels.push(text7);

	let text8 = new Chemistry.Text(
		'Temp_out_hot',
		new Chemistry.Point(1680, 40),
		canvas
	);
	text8.color = 'black';
	text8.font = '22vw Arial';

	all_labels.push(text8);

	let text9 = new Chemistry.Text(
		'Connector',
		new Chemistry.Point(1680, 450),
		canvas
	);
	text9.color = 'black';
	text9.font = '22vw Arial';

	all_labels.push(text9);

	let text10 = new Chemistry.Text(
		'Differential Ebulliometer',
		new Chemistry.Point(1680, 300),
		canvas
	);
	text10.color = 'black';
	text10.font = '22vw Arial';

	all_labels.push(text10);
}
// to display all labels in activity 2
function display_labels() {
	for (let i = 0; i < all_labels.length; i++) {
		all_labels[i].draw();
	}
}
