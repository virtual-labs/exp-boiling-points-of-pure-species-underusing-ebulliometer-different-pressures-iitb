var drag = false;
var geo;
var scene1;
var current_msg_i = 0;
var all_labels: Chemistry.Text[] = [];
var dx: number;
var dy: number;
var a2_total_score: number = 0;
var allow_labels = false;
var show_sections: boolean = false;

//instruction for which component to drag
var a2_msg = [
	'Drag the pump to the assembly area',
	'Drag the pipe1 to the assembly area',
	'Drag the pipe2 to the assembly area',
	'Drag the condenser to the assembly area',
	'Drag the differential ebulliometer to the assembly area',
	'Drag the temperature indicator to the assembly area',
	'Drag the dimmer stat to the assembly area',
	'Drag the pipe3 to the assembly area',
	'Drag the pipe4 to the assembly area',
	'Drag the manometer to the assembly area',
	'Drag the ballast tank to the assembly area',
	'Drag the pipe5 to the assembly area',
	'Drag the pipe6 to the assembly area',
	'Drag the pressure pump to the assembly area',
];

//names of components
var obj_names = [
	'pump',
	'pipe1',
	'pipe2',
	'condenser',
	'diff_ebulliometer',
	'temp_indicator',
	'dimmerstat',
	'pipe3',
	'pipe4',
	'manometer',
	'ballasttank',
	'pipe5',
	'pipe6',
	'pressurepump',
];

//coordinates of hint rectangle
var adj = [];

//hint rectangle
var fixed_hint: Chemistry.Rectangle;
var movable_hint: Chemistry.Rectangle;

function activity2() {
	pp.clearleftpannel();
	pp.clearrightpannel();
	pp.addcanvas('mycanvas');
	pp.addoffcanvas(3);
	pp.showtitle(
		`<p id="exp-title">Figure shows the experimental setup. The assembled setup will be used to carry out the experimentation to determine the boiling point of pure species under different pressure.</p>`,
		3
	);

	pp.showdescription(
		`<p class='discription_text'>Observe the assembly. Next task is to <span style="color:#018fc3">Assemble it yourself.</span></p>`,
		3
	);

	show_panel(3);
	canvas = pp.canvas;
	context = canvas.getContext('2d');
	canvas.style.cursor = 'crosshair';
	rect = canvas.getBoundingClientRect();
	scene = new Scene();

	pp.addtorightpannel(
		`<button id="panel2_btn" class="btn btn-primary" onclick="a2_first()" style="position: absolute; font-size:1.1vw; left:2.5vh; bottom: 12vh;  width: 90%;">Next</button>`,
		3
	);
	var assm = new Chemistry.Custome_image(
		assembly,
		new Chemistry.Point(900, 450),
		594,
		701,
		canvas
	);
	scene.add(assm);

	// add canvas sizing
	window.onload = a2_windowresize;
	window.onresize = a2_windowresize;
	a2_windowresize();
}

function a2_windowresize() {
	//canvas size
	a2_canvas_size();
	//canvas mapping
	a2_canvas_mapping();

	scene.draw();

	if (show_sections) {
		scene1.draw();
		scene.draw();

		//line to divide canvas in two sections
		draw_half_line();
	}

	if (allow_labels) {
		a2_display_msg();
		display_labels();
	}
}

function a2_canvas_size() {
	canvas.width = window.innerWidth * 0.91;
	canvas.height = ((canvas.width * 1080.0) / 1920) * 0.85;
	lscale = canvas.width / 1920.0;

	document.getElementById('leftpannel').style.height =
		canvas.height + 5 + 'px';
	document.getElementById('leftpannel').style.margin = '0';
}

function a2_canvas_mapping() {
	context.translate(0, canvas.height);
	context.scale(1, -1);
}

function a2_first() {
	pp.clearleftpannel();
	two_section();
	pp.addcanvas('mycanvas');

	pp.showtitle(
		`<p id='exp-title'>Drag and assemble the components from the Component Library to the Assembly Area.</p>`,
		3
	);

	pp.showdescription(
		` <p class='discription_text'>Click <span class="text-color-blue"> Start</span> to assemble</p>`,
		3
	);

	show_sections = true;

	canvas = pp.canvas;
	context = canvas.getContext('2d');
	canvas.style.cursor = 'crosshair';
	rect = canvas.getBoundingClientRect();

	pp.addtorightpannel(
		`<button id="panel2_btn" class="btn btn-primary" onclick="a2_second()" style="position: absolute; font-size:1.1vw; left:2.5vh; bottom: 12vh;  width: 90%;">Start</button>`,
		3
	);

	scene = new Scene();
	scene1 = new Scene();

	fixed_container();
	a2_draw_all_components();
	a2_windowresize();
}

function a2_second() {
	pp.showtitle(
		`<p id='exp-title'>Drag and assemble the components from the Component Library to the Assembly Area. </p>`,
		3
	);

	// canvas.addEventListener('mousemove', mousemove1);
	// canvas.addEventListener('mousedown', mousedown1);
	// canvas.addEventListener('mouseup', mouseup1);
	// canvas.addEventListener('touchmove', touchmove1);

	allow_labels = true;

	current_msg_i = 0;
	all_labels = [];
	drag = false;
	geo = 'Drag';

	// a2_display_msg();
	// create_labels();
	// display_labels();
	a2_windowresize();
}

function two_section() {
	let assm_area = `<div style="position:absolute; font-size:2vw; left:12vw; top:1.5vw; border:0.13vw solid black; width:20vw; text-align:center; background-color:#fbd4b4;">Assembly Area</div>`;
	let com_lib = `<div style="position:absolute; font-size:2vw; left:57vw; top:1.5vw; border:0.13vw solid black; width:25vw; text-align:center; background-color:#fbd4b4;">Component Library</div>`;

	pp.addtoleftpannel(assm_area);
	pp.addtoleftpannel(com_lib);
}

//draw components on components library
function a2_draw_all_components() {
	var sq = new Chemistry.Custome_image(
		base,
		new Chemistry.Point(400, 375),
		594,
		701,
		canvas
	);
	sq.name = 'stand';
	sq.lock();
	scene.add(sq);

	var sq = new Chemistry.Custome_image(
		pump_small,
		new Chemistry.Point(347, 85.5),
		87,
		106,
		canvas
	);
	sq.name = 'pump';
	scene.add(sq);

	var sq = new Chemistry.Custome_image(
		pipe1_small,
		new Chemistry.Point(270, 350),
		97,
		486,
		canvas
	);
	sq.name = 'pipe1';
	scene.add(sq);

	var sq = new Chemistry.Custome_image(
		pipe2_small,
		new Chemistry.Point(298, 350),
		73,
		458,
		canvas
	);
	sq.name = 'pipe2';
	scene.add(sq);

	var sq = new Chemistry.Custome_image(
		condenser_small,
		new Chemistry.Point(340, 535),
		64,
		232,
		canvas
	);
	sq.name = 'condenser';
	scene.add(sq);

	var sq = new Chemistry.Custome_image(
		connector_small,
		new Chemistry.Point(340, 410),
		44,
		35,
		canvas
	);
	sq.name = 'connector';
	scene.add(sq);

	var sq = new Chemistry.Custome_image(
		ebulliometer_small,
		new Chemistry.Point(385, 280),
		113,
		336,
		canvas
	);
	sq.name = 'ebulliometer';
	scene.add(sq);

	var sq = new Chemistry.Custome_image(
		temp_indicator_small,
		new Chemistry.Point(440, 370),
		77,
		92,
		canvas
	);
	sq.name = 'temp_indicator';
	scene.add(sq);

	var sq = new Chemistry.Custome_image(
		heating_tap_small,
		new Chemistry.Point(405, 225),
		35,
		66,
		canvas
	);
	sq.name = 'heating_tap';
	scene.add(sq);

	var sq = new Chemistry.Custome_image(
		dimmer_stat_small,
		new Chemistry.Point(500, 180),
		59,
		59,
		canvas
	);
	sq.name = 'dimmer_stat';
	scene.add(sq);
}

//assembly area fixed coordinates for components
function fixed_container() {
	let c1 = new Chemistry.Geometry();
	c1.stpt = new Chemistry.Point(181, 149);
	c1.name = 'pump';
	scene1.add(c1);

	let c2 = new Chemistry.Geometry();
	c2.stpt = new Chemistry.Point(216, 430);
	c2.name = 'heat_exchanger';
	scene1.add(c2);

	let c3 = new Chemistry.Geometry();
	c3.stpt = new Chemistry.Point(356, 650);
	c3.name = 'pipe_h';
	scene1.add(c3);

	let c4 = new Chemistry.Geometry();
	c4.stpt = new Chemistry.Point(521, 511);
	c4.name = 'glass_section';
	scene1.add(c4);

	let c5 = new Chemistry.Geometry();
	c5.stpt = new Chemistry.Point(521, 306);
	c5.name = 'pipe_v';
	scene1.add(c5);

	let c6 = new Chemistry.Geometry();
	c6.stpt = new Chemistry.Point(598, 153);
	c6.name = 'heater';
	scene1.add(c6);

	let c7 = new Chemistry.Geometry();
	c7.stpt = new Chemistry.Point(655, 231);
	c7.name = 'temp_con';
	scene1.add(c7);

	let c8 = new Chemistry.Geometry();
	c8.stpt = new Chemistry.Point(285, 337);
	c8.name = 'temp_in_cold';
	scene1.add(c8);

	let c9 = new Chemistry.Geometry();
	c9.stpt = new Chemistry.Point(96, 549);
	c9.name = 'temp_out_cold';
	scene1.add(c9);

	let c10 = new Chemistry.Geometry();
	c10.stpt = new Chemistry.Point(240, 240);
	c10.name = 'temp_in_hot';
	scene1.add(c10);

	let c11 = new Chemistry.Geometry();
	c11.stpt = new Chemistry.Point(240, 613);
	c11.name = 'temp_out_hot';
	scene1.add(c11);
}

function a2_display_msg() {
	if (current_msg_i >= a2_msg.length) {
		a2_remove_event();
	} else {
		pp.showdescription(
			`<p class='discription_text' > ${a2_msg[current_msg_i]} </p>`,
			3
		);
	}
}

function draw_half_line() {
	context.beginPath();
	context.moveTo(canvas.width / 2.25, 0);
	context.lineTo(canvas.width / 2.25, canvas.height);
	context.lineWidth = 2;
	context.stroke();
}

function a2_remove_event() {
	// canvas.addEventListener('mousemove', mousemove1);
	// canvas.addEventListener('mousedown', mousedown1);
	// canvas.addEventListener('mouseup', mouseup1);
	// canvas.addEventListener('touchmove', touchmove1);
	// window.removeEventListener('load', a3_windowresize);
	// window.removeEventListener('resize', a3_windowresize);
}

// activity2();
// a2_first();
