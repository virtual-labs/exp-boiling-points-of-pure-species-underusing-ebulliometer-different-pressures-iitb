var seq;
var seq_container = [];
var show_table_0 = false;
var control_panel_text;
var show_once = true;
let ob_data = [];
let ob_table_verified = false;
var temp_con = [];
let interval_id;
let frameIndex = 0;
let text_draw = false;
var panel;
var ebu_in;
var ebu_out;
var water_pump;
var n2_gas;
var heating_coil;
var drops;
var time;
var point;
var video;
var c_name;
var H_A;
var H_Tc;
var H_n;
var ro_A;
var ro_B;
var ro_Tc;
var ro_n;
var A;
var B;
var C;
var MW;
var V;
var g;
var ro_hg;
var dimmer_stat_val;
var Q;
var Q1;
var N;
var a3_btn = `<button id="panel2_btn" class="btn btn-primary" onclick="activity4()" style="position: absolute; font-size:1.1vw; left:2.5vh; bottom: 12vh;  width: 90%;">Next</button>`;
var drop_ar = [];
drop_ar.push(drop1);
drop_ar.push(drop2);
drop_ar.push(drop3);
let all_canvas = `
<canvas id="mycanvas">

</canvas>`;
var left_content = `
   <label for="" style="position:absolute; font-size:1.1vw; left:74.5vw; width:10vw; top:7vw">Select System</label>
   <select disabled onchange='on_system_select();' class="form-select" style="position:absolute; font-size:1.1vw; left:69.8vw; top:8.7vw; width:16.5vw; height:2.5vw; text-align:center;" id="compounds-dd">
      <option value="" >--Select--</option>
   </select>
<p style="position:absolute; font-size:1.1vw; left:69vw; top:12vw; ">Inlet of Ebulliometer</p>
<p style="position:absolute; font-size:1.1vw; left:69vw; top:15vw;">Outlet of Ebulliometer</p>
<p style="position:absolute; font-size:1.1vw; left:69vw; top:18.2vw;">Cold Water Pump</p>
<p style="position:absolute; font-size:1.1vw; left:69vw; top:21vw;">N<sub>2</sub> gas</p>
<p style="position:absolute; font-size:1.1vw; left:69vw; top:24.3vw;">Heating Coil</p>
<label style="position:absolute; font-size:1.1vw; left:69vw; top:26.5vw;"  for="">Heating Rate</label>
<input style="position:absolute; font-size:1.1vw; left:70vw; top:28.5vw; width:15vw;" onchange="calculate_Q0();" oninput="calculate_Q0();" type="range" name="" min="0" max="100" step="1" id="stat-dd" value="0" disabled>
<input style="display: none; position:absolute; width:12vw; left:40vw; top:40vw;" disabled class="form-control" type="text" id="display-n-value">
<input style="display: none; position:absolute; width:19vw; left:42.5vw; top:29vw;" disabled class="form-control" type="text" id="display-slider-value">
<input style="display: none; position:absolute; width:7vw; left:22vw; top:4.5vw;" disabled class="form-control" type="text" id="display-dh-value">
`;
function activity3() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    // pp.addcanvas('mycanvas');
    pp.addtoleftpannel(all_canvas);
    pp.addtoleftpannel(left_content);
    canvas = document.getElementById('mycanvas');
    pp.showtitle(`<p id='exp-title'> Perform task to simulate the experiment </p>`, 3);
    canvas.style.cursor = 'crosshair';
    context = canvas.getContext('2d');
    rect = canvas.getBoundingClientRect();
    seq = 0;
    seq_container = [];
    control_panel_text = new Chemistry.Geo_Text('Control Panel', new Chemistry.Point(1500, 820), canvas);
    control_panel_text.font = '30vw Arial';
    canvas.addEventListener('click', a3_mouseclick_ebu_out);
    scene = new Scene();
    window.onload = a3_windowresize;
    window.onresize = a3_windowresize;
    a3_windowresize();
    control_panel();
    var first_geo = new Chemistry.Custome_image(seq1_img, new Chemistry.Point(470, 440), 594, 701, canvas);
    first_geo.name = 'first';
    seq_container.push(first_geo);
    // scene.add(first_geo);
    scene.add(control_panel_text);
    draw_seq_all();
    show_panel(3);
}
function a3_windowresize() {
    canvas_box_scale = 1.1;
    //canvas size
    a3_canvas_size();
    //canvas mapping
    a3_canvas_mapping();
    //draw border or rectangle
    scene.draw();
    draw_seq_all();
    // draw_pump_con();
    // if (show_table_0) {
    // 	let table = document.getElementById('table_0');
    // 	table.style.right = `${rect.x + 100 * lscale}px`;
    // 	table.style.top = `${rect.y + canvas.height - 550 * lscale}px`;
    // 	table.style.height = `${(canvas.height * 2.8) / 4}px`;
    // 	table.style.fontSize = '0.85vw';
    // }
}
function a3_canvas_size() {
    canvas.width = window.innerWidth * 0.91;
    canvas.height = ((canvas.width * 1080.0) / 1920) * 0.85;
    lscale = canvas.width / 1920.0;
    document.getElementById('leftpannel').style.height =
        canvas.height + 5 + 'px';
    document.getElementById('leftpannel').style.margin = '0';
}
function a3_canvas_mapping() {
    context.translate(0, canvas.height);
    context.scale(1, -1);
}
function control_panel() {
    panel = new Chemistry.Rectangle(400, 500, new Chemistry.Point(1400, 300), canvas);
    panel.color = '#ADC4CE';
    // red - #D21312, green - #557A46 , grey - #D8D8D8
    ebu_in = new Chemistry.Circle(new Chemistry.Point(1720, 670), 18, canvas);
    ebu_in.color = 'grey';
    ebu_out = new Chemistry.Circle(new Chemistry.Point(1720, 605), 18, canvas);
    ebu_out.color = 'red';
    water_pump = new Chemistry.Circle(new Chemistry.Point(1720, 540), 18, canvas);
    water_pump.color = 'grey';
    n2_gas = new Chemistry.Circle(new Chemistry.Point(1720, 475), 18, canvas);
    n2_gas.color = 'grey';
    heating_coil = new Chemistry.Circle(new Chemistry.Point(1720, 410), 18, canvas);
    heating_coil.color = 'grey';
    scene.add(panel);
    scene.add(ebu_in);
    scene.add(ebu_out);
    scene.add(water_pump);
    scene.add(n2_gas);
    scene.add(heating_coil);
}
function draw_seq_all() {
    scene.draw();
    if (seq == 0) {
        console.log('Open outlet of ebulliometer');
        pp.showdescription(`<p class='discription_text'>Open outlet of ebulliometer.</p>`, 3);
    }
    for (let i = 0; i < seq_container.length; i++) {
        console.log('seq draw');
        seq_container[i].draw();
    }
    if (seq == 1 && seq_container[1].l < seq_container[1].l_last) {
        window.requestAnimationFrame(draw_seq_all);
    }
    else if (seq == 1) {
        if ((seq_container[3].name = 'second')) {
            console.log('len', seq_container.length);
            seq_container.splice(3, 1);
            seq_container[0].img = seq2_img;
            seq = 2;
            draw_seq_all();
        }
    }
    else if (seq == 4 && seq_container[1].l < seq_container[1].l_last) {
        window.requestAnimationFrame(draw_seq_all);
    }
    else if (seq == 4) {
        if ((seq_container[1].name = 'third')) {
            seq_container.splice(1, 1);
            seq_container[0].img = seq4_img;
            seq = 6;
            console.log('ebulliometer down animation complete');
            var second_geo = new Chemistry.anim_image(seq5_img, new Chemistry.Point(470, 440), 594, 701, canvas);
            seq_container.push(second_geo);
            second_geo.name = 'fourth';
            second_geo.startx = 0;
            second_geo.l = 170;
            second_geo.l_last = 270;
            second_geo.width = 100;
            canvas.addEventListener('click', a3_mouseclick_ebu_in);
            draw_seq_all();
        }
    }
    else if (seq == 6 && seq_container[1].l < seq_container[1].l_last) {
        window.requestAnimationFrame(draw_seq_all);
    }
    else if (seq == 6) {
        if ((seq_container[1].name = 'fourth')) {
            seq_container.splice(1, 1);
            seq_container[0].img = seq6_img;
            seq = 7;
            console.log('ebulliometer animation complete');
            console.log('Close inlet of ebulliometer');
            draw_seq_all();
            pp.showdescription(`<p class='discription_text'>Close inlet of ebulliometer.</p>`, 3);
            show_panel(3);
        }
    }
    else if (seq == 8 && seq_container[1].l < seq_container[1].l_last) {
        window.requestAnimationFrame(draw_seq_all);
    }
    else if (seq == 8) {
        if ((seq_container[1].name = 'fifth')) {
            seq_container.splice(1, 1);
            seq_container[0].img = seq7_img;
            seq = 9;
            console.log('Vertical pipe1 animation complete');
            var second_geo_y = new Chemistry.anim_image_y_dir_down(seq8_img, new Chemistry.Point(470, 440), 594, 701, canvas);
            second_geo_y.name = 'sixth';
            second_geo_y.startx = 0;
            second_geo_y.l = 157;
            second_geo_y.l_last = 284;
            second_geo_y.width = 100;
            seq_container.push(second_geo_y);
            draw_seq_all();
        }
    }
    else if (seq == 9 && seq_container[1].l < seq_container[1].l_last) {
        window.requestAnimationFrame(draw_seq_all);
    }
    else if (seq == 9) {
        if ((seq_container[1].name = 'sixth')) {
            seq_container.splice(1, 1);
            seq_container[0].img = seq8_img;
            seq = 10;
            console.log('condenser down animation complete');
            var second_geo = new Chemistry.anim_image(seq9_img, new Chemistry.Point(470, 440), 594, 701, canvas);
            second_geo.name = 'seventh';
            second_geo.startx = 0;
            second_geo.l = 420;
            second_geo.l_last = 560;
            second_geo.width = 100;
            seq_container.push(second_geo);
            draw_seq_all();
        }
    }
    else if (seq == 10 && seq_container[1].l < seq_container[1].l_last) {
        window.requestAnimationFrame(draw_seq_all);
    }
    else if (seq == 10) {
        if ((seq_container[1].name = 'seventh')) {
            seq_container.splice(1, 1);
            seq_container[0].img = seq9_img;
            seq = 11;
            console.log('Condenser up animation complete');
            var second_geo_y = new Chemistry.anim_image_y_dir_down(seq10_img, new Chemistry.Point(470, 440), 594, 701, canvas);
            second_geo_y.name = 'eighth';
            second_geo_y.startx = 0;
            second_geo_y.l = 150;
            second_geo_y.l_last = 640;
            second_geo_y.width = 100;
            seq_container.push(second_geo_y);
            draw_seq_all();
        }
    }
    else if (seq == 11 && seq_container[1].l < seq_container[1].l_last) {
        window.requestAnimationFrame(draw_seq_all);
    }
    else if (seq == 11) {
        if ((seq_container[1].name = 'eighth')) {
            seq_container.splice(1, 1);
            seq_container[0].img = seq10_img;
            seq = 12;
            console.log('Vertical pipe2 down animation complete');
            pp.showdescription(`<p class='discription_text'>Turn on heating coil.</p>`, 3);
            heating_coil.color = 'red';
            canvas.addEventListener('click', a3_mouseclick_coil);
            show_panel(3);
            draw_seq_all();
        }
    }
}
function a3_mouseclick_ebu_out(e) {
    let x = Math.round((e.clientX - rect.x) / lscale);
    let y = Math.round((canvas.height - (e.clientY - rect.y)) / lscale);
    console.log(x, y);
    if (ebu_out.isinside(new Chemistry.Point(x, y))) {
        console.log('inside ebu_out button');
        if (ebu_out.color == 'red') {
            ebu_out.color = 'green';
            n2_gas.color = 'red';
            draw_seq_all();
            pp.showdescription(`<p class='discription_text'>Turn on n2 gas.</p>`, 3);
            show_panel(3);
            canvas.addEventListener('click', a3_mouseclick_n2);
        }
        else {
            ebu_out.color = 'red';
            ebu_in.color = 'red';
            draw_seq_all();
            pp.showdescription(`<p class='discription_text'>Open inlet of ebulliometer.</p>`, 3);
            show_panel(3);
            canvas.addEventListener('click', a3_mouseclick_ebu_in);
        }
        canvas.removeEventListener('click', a3_mouseclick_ebu_out);
    }
}
function a3_mouseclick_n2(e) {
    let x = Math.round((e.clientX - rect.x) / lscale);
    let y = Math.round((canvas.height - (e.clientY - rect.y)) / lscale);
    console.log(x, y);
    var settime = 10;
    var timeoutID;
    let sys = (document.getElementById('compounds-dd'));
    if (n2_gas.isinside(new Chemistry.Point(x, y))) {
        console.log('inside n2 gas');
        if (n2_gas.color != 'red') {
            n2_gas.color = 'red';
            canvas.removeEventListener('click', a3_mouseclick_n2);
            sys.disabled = false;
            load_system();
            pp.showdescription(`<p class='discription_text'>Select the system.</p>`, 3);
            show_panel(3);
            seq_container.splice(1, 2);
            seq_container[0].img = seq1_img;
            draw_seq_all();
            return;
        }
        canvas.removeEventListener('click', a3_mouseclick_n2);
        n2_gas.color = 'green';
        time = new Chemistry.anim_image(timer, new Chemistry.Point(1050, 700), 290, 210, canvas);
        seq_container.push(time);
        time.name = 'timer';
        time.l = 210;
        time.l_last = 210;
        time.width = 0;
        var time_text = new Chemistry.Geo_Text(`${settime == 10 ? settime.toString() : 0 + settime.toString()} sec`, new Chemistry.Point(1045, 710), canvas);
        seq_container.push(time_text);
        time_text.name = 'timer text';
        time_text.font = '30vw Arial';
        time_text.textalingment = 'center';
        var second_geo = new Chemistry.anim_image(seq2_img, new Chemistry.Point(470, 440), 594, 701, canvas);
        second_geo.name = 'second';
        second_geo.l = 200;
        second_geo.l_last = 210;
        second_geo.width = 50;
        seq_container.push(second_geo);
        seq = 1;
        anim_timer();
    }
    function anim_timer() {
        if (settime == 10) {
            time_text.text = `10 sec`;
            draw_seq_all();
            settime--;
            window.requestAnimationFrame(anim_timer);
        }
        else {
            timeoutID = setTimeout(() => {
                time_text.text = `${settime == 10 ? settime.toString() : 0 + settime.toString()} sec`;
                draw_seq_all();
                settime--;
                if (settime >= 0) {
                    window.requestAnimationFrame(anim_timer);
                }
                else {
                    console.log('Turn off n2 gas');
                    clearTimeout(timeoutID);
                    canvas.addEventListener('click', a3_mouseclick_n2);
                    pp.showdescription(`<p class='discription_text'>Purging is successfully completed. Turn Off n2 gas.</p>`, 3);
                    show_panel(3);
                }
            }, 1000);
        }
    }
}
function load_system() {
    let sys = (document.getElementById('compounds-dd'));
    for (let i = 0; i < all_compounds.length; i++) {
        sys.innerHTML += `<option value='${all_compounds[i].name}'>${all_compounds[i].name.toUpperCase()}</option>`;
    }
}
function on_system_select() {
    get_values();
    canvas.addEventListener('click', a3_mouseclick_ebu_out);
    pp.showdescription(`<p class='discription_text'>Close outlet of ebulliometer.</p>`, 3);
    show_panel(3);
}
function a3_mouseclick_ebu_in(e) {
    let x = Math.round((e.clientX - rect.x) / lscale);
    let y = Math.round((canvas.height - (e.clientY - rect.y)) / lscale);
    console.log(x, y);
    if (ebu_in.isinside(new Chemistry.Point(x, y))) {
        console.log('inside ebu in');
        canvas.removeEventListener('click', a3_mouseclick_ebu_in);
        if (ebu_in.color != 'red') {
            ebu_in.color = 'red';
            water_pump.color = 'red';
            canvas.addEventListener('click', a3_mouseclick_pump);
            pp.showdescription(`<p class='discription_text'>Turn on cold water pump.</p>`, 3);
            show_panel(3);
            draw_seq_all();
            return;
        }
        ebu_in.color = 'green';
        seq_container[0].img = seq3_img;
        var second_geo = new Chemistry.anim_image_y_dir_down(seq4_img, new Chemistry.Point(470, 440), 594, 701, canvas);
        second_geo.name = 'third';
        second_geo.startx = 0;
        second_geo.l = 248;
        second_geo.l_last = 555;
        second_geo.width = 100;
        seq_container.push(second_geo);
        seq = 4;
        draw_seq_all();
    }
}
function a3_mouseclick_pump(e) {
    let x = Math.round((e.clientX - rect.x) / lscale);
    let y = Math.round((canvas.height - (e.clientY - rect.y)) / lscale);
    console.log(x, y);
    if (water_pump.isinside(new Chemistry.Point(x, y))) {
        console.log('inside water pump btn');
        if (water_pump.color != 'red') {
            return;
        }
        console.log('pump initiated', seq_container.length);
        water_pump.color = 'green';
        var second_geo = new Chemistry.anim_image(seq7_img, new Chemistry.Point(470, 440), 594, 701, canvas);
        second_geo.name = 'fifth';
        second_geo.startx = 0;
        second_geo.l = 100;
        second_geo.l_last = 555;
        second_geo.width = 100;
        seq_container.push(second_geo);
        seq = 8;
        draw_seq_all();
    }
}
function a3_mouseclick_coil(e) {
    let x = Math.round((e.clientX - rect.x) / lscale);
    let y = Math.round((canvas.height - (e.clientY - rect.y)) / lscale);
    console.log(x, y);
    let slider = (document.getElementById('stat-dd'));
    if (heating_coil.isinside(new Chemistry.Point(x, y))) {
        canvas.removeEventListener('click', a3_mouseclick_coil);
        if (heating_coil.color != 'red') {
            heating_coil.color = 'red';
            return;
        }
        document.getElementById('display-n-value').style.display = 'block';
        document.getElementById('display-slider-value').style.display = 'block';
        document.getElementById('display-dh-value').style.display = 'block';
        drops = new Chemistry.Custome_image(drop1, new Chemistry.Point(600, 80), 288 * 0.6, 360 * 0.6, canvas);
        var indicator = new Chemistry.Custome_image(temp_indi, new Chemistry.Point(150, 400), 92 * 1.2, 60 * 1.2, canvas);
        var dim = new Chemistry.Custome_image(dimmer, new Chemistry.Point(1050, 500), 421, 422, canvas);
        let temp = new Chemistry.Geo_Text('Temp', new Chemistry.Point(113, 450), canvas);
        temp.font = '25vw Arial';
        point = new Chemistry.Custome_image(dial, new Chemistry.Point(1050, 500), 178, 236, canvas);
        seq_container.push(dim);
        seq_container.push(point);
        seq_container.push(drops);
        seq_container.push(indicator);
        seq_container.push(temp);
        heating_coil.color = 'green';
        slider.disabled = false;
        calculate_rest_of_n();
        draw_seq_all();
        // drops.draw();
        pp.showdescription(`<p class='discription_text'>Move slider to increase or decrease heating rate.</p>`, 3);
        show_panel(3);
    }
}
function get_values() {
    let compound = (document.getElementById('compounds-dd'));
    let slider = (document.getElementById('stat-dd'));
    c_name = compound.value;
    dimmer_stat_val = parseInt(slider.value);
    for (let i = 0; i < all_compounds.length; i++) {
        if (all_compounds[i]['name'] == c_name) {
            H_A = all_compounds[i]['H_A'];
            H_Tc = all_compounds[i]['H_Tc'];
            H_n = all_compounds[i]['H_n'];
            ro_A = all_compounds[i]['ro_A'];
            ro_B = all_compounds[i]['ro_B'];
            ro_Tc = all_compounds[i]['ro_Tc'];
            ro_n = all_compounds[i]['ro_n'];
            A = all_compounds[i]['A'];
            B = all_compounds[i]['B'];
            C = all_compounds[i]['C'];
            MW = all_compounds[i]['MW'];
            V = all_compounds[i]['V'];
            g = all_compounds[i]['g'];
            ro_hg = all_compounds[i]['ro_hg'];
        }
    }
    console.log(c_name, H_A, H_Tc, H_n, ro_A, ro_B, ro_Tc, ro_n, A, B, C, MW, V, g, ro_hg, dimmer_stat_val);
    console.log(main_table_data);
    calculate_p1();
    calculate_p2();
    calculate_tb();
    calculate_rho();
    calculate_lambda();
}
function calculate_p1() {
    for (let i = 0; i < main_table_data.length; i++) {
        main_table_data[i][1] = random(99.98, 101.325);
    }
    // console.log(main_table_data);
}
function calculate_p2() {
    for (let i = 0; i < main_table_data.length; i++) {
        main_table_data[i][2] =
            main_table_data[i][1] - (ro_hg * g * main_table_data[i][0]) / 100;
    }
    // console.log(main_table_data);
}
function calculate_tb() {
    for (let i = 0; i < main_table_data.length; i++) {
        main_table_data[i][3] =
            B / (A - Math.log10(main_table_data[i][2] * 1000 * 0.00750062)) -
                C +
                273.15;
        main_table_data[i][3] = std_deviation(main_table_data[i][3]);
    }
    // console.log(main_table_data);
}
function calculate_rho() {
    for (let i = 0; i < main_table_data.length; i++) {
        let a1 = 1 - main_table_data[i][3] / ro_Tc;
        var a2 = Math.pow(a1, ro_n);
        a2 = -a2;
        let a3 = Math.pow(ro_B, a2);
        main_table_data[i][4] = ro_A * a3;
    }
    // console.log(main_table_data);
}
function calculate_lambda() {
    for (let i = 0; i < main_table_data.length; i++) {
        let a1 = 1 - main_table_data[i][3] / H_Tc;
        a1 = Math.pow(a1, H_n);
        main_table_data[i][5] = H_A * a1;
    }
    console.log(main_table_data);
}
function calculate_Q0() {
    let slider = (document.getElementById('stat-dd'));
    let display = (document.getElementById('display-slider-value'));
    let n_val = (document.getElementById('display-n-value'));
    let h_val = (document.getElementById('display-dh-value'));
    display.disabled = false;
    display.value = 'Dimmer stat reading => ' + slider.value + '%';
    display.disabled = true;
    dimmer_stat_val = parseInt(slider.value);
    if (c_name == 'water') {
        main_table_data[0][6] = (250 * dimmer_stat_val) / 100;
    }
    else {
        main_table_data[0][6] = (50 * dimmer_stat_val) / 100;
    }
    console.log('Q0 = ' + main_table_data[0][6]);
    calculate_Q1();
    calculate_n0();
    n_val.disabled = false;
    n_val.value = 'value of n = ' + N;
    n_val.disabled = true;
    h_val.value = `\u0394H = ${main_table_data[0][0]}`;
    if (N < 60 || N > 72) {
        n_val.style.backgroundColor = 'red';
        pp.clearrightpannel();
        pp.addoffcanvas(3);
        pp.showtitle(`<p id='exp-title'> Perform task to simulate the experiment </p>`, 3);
        pp.showdescription(`<p class='discription_text'>Move slider to increase or decrease heating rate.</p>`, 3);
    }
    else if (N >= 60 && N <= 72) {
        n_val.style.backgroundColor = '#56f218';
        pp.showdescription(`<div>
         <p class='discription_text'>Congratulations Equilibrium Achieved.</p>
         <p class='discription_text'>Note the readings then click on next.</p>
         </div>`, 3);
        setTimeout(() => pp.addtorightpannel(a3_btn, 3), 5000);
        show_panel(3);
    }
    point.stang = parseInt(slider.value) * 2.85;
    let temp_text = new Chemistry.Geo_Text(main_table_data[0][9].toFixed(2).toString(), new Chemistry.Point(113, 390), canvas);
    temp_text.font = '25vw Arial';
    animate();
    function animate() {
        clearInterval(interval_id);
        let sliderValue = parseInt(slider.value);
        if (sliderValue == 0) {
            drops.img = drop_ar[0];
            return;
        }
        if (sliderValue > 0) {
            drops.img = drop_ar[frameIndex % 3];
            frameIndex++;
        }
        let interval = 6000 / N;
        interval_id = setInterval(animate, interval);
        draw_seq_all();
        temp_text.draw();
    }
    draw_seq_all();
    temp_text.draw();
}
function calculate_Q1() {
    main_table_data[0][7] =
        (main_table_data[0][5] * main_table_data[0][4] * V) / MW;
    console.log('Q1 = ' + main_table_data[0][7]);
}
function calculate_n0() {
    main_table_data[0][8] =
        (main_table_data[0][6] * 60) / main_table_data[0][7];
    N = Math.round(main_table_data[0][8]);
    main_table_data[0][8] = N;
    console.log(N);
}
function calculate_rest_of_n() {
    if (main_table_data.length <= 1) {
        return;
    }
    for (let i = 1; i < main_table_data.length; i++) {
        main_table_data[i][8] = Math.round(Math.random() * 12 + 60);
    }
    console.log(main_table_data);
    calculate_rest_of_Q1();
    calculate_rest_of_Q();
    calculate_T();
}
function calculate_rest_of_Q1() {
    if (main_table_data.length <= 1) {
        return;
    }
    for (let i = 1; i < main_table_data.length; i++) {
        main_table_data[i][7] =
            (main_table_data[i][5] * main_table_data[i][4] * V) / MW;
    }
    console.log(main_table_data);
}
function calculate_rest_of_Q() {
    if (main_table_data.length <= 1) {
        return;
    }
    for (let i = 1; i < main_table_data.length; i++) {
        main_table_data[i][6] =
            (main_table_data[i][8] * main_table_data[i][7]) / 60;
    }
    console.log(main_table_data);
}
function calculate_T() {
    if (main_table_data.length <= 1) {
        return;
    }
    for (let i = 0; i < main_table_data.length; i++) {
        // main_table_data[i][9] = main_table_data[i][3] - 273.15 - (main_table_data[i][5] * main_table_data[i][3])/(main_table_data[i][6] * 100);
        main_table_data[i][9] = main_table_data[i][3] - 273.15;
    }
    console.log(main_table_data);
    show_panel(3);
}
// activity3();
//# sourceMappingURL=activity3.js.map