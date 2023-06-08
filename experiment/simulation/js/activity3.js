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
// var act3_btn = `<button id="panel1_btn" class="btn btn-primary" onclick="activity4();" style="position: absolute; bottom: 8vh; width: 85%;">Next</button>`;
function activity3() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    pp.showtitle("To determine the Boiling point of pure species under different pressures", 3);
    let first_inputs = `
      <div>
      <label for="compounds-dd">Select the Compound</label>
      <select onchange="get_values();" class="form-select" id="compounds-dd" name="">
          <option selected value="">---Select---</option>
      </select>

      <br>

      <label for="stat-dd">Set the Dimmer Stat reading</label>
      <input onchange="calculate_Q0();" oninput="calculate_Q0();" type="range" name="" min="1" max="100" step="1" id="stat-dd" value="0">
      <input disabled class="form-control" type="text" id="display-slider-value">

      <br>
      <input disabled class="form-control" type="text" id="display-n-value">

      <br>

      <button disabled id="act3-btn" class="btn btn-primary" onclick="calculate_rest_of_n();">Next</button>
    </div>
  `;
    pp.addtoleftpannel(first_inputs);
    load_options();
}
function load_options() {
    let ele = document.getElementById('compounds-dd');
    for (let i = 0; i < all_compounds.length; i++) {
        ele.innerHTML += `<option class='${all_compounds[i]['name']}'>${all_compounds[i]['name']}</option>`;
    }
}
function calculate_Q0() {
    let slider = document.getElementById('stat-dd');
    let display = document.getElementById('display-slider-value');
    let n_val = document.getElementById('display-n-value');
    display.disabled = false;
    display.value = "Dimmer stat reading => " + slider.value + "%";
    display.disabled = true;
    dimmer_stat_val = parseInt(slider.value);
    if (c_name == "water") {
        main_table_data[0][6] = 250 * dimmer_stat_val / 100;
    }
    else {
        main_table_data[0][6] = 50 * dimmer_stat_val / 100;
    }
    console.log("Q0 = " + main_table_data[0][6]);
    calculate_Q1();
    calculate_n0();
    n_val.disabled = false;
    n_val.value = "value of n = " + N;
    n_val.disabled = true;
    if (N >= 60 && N <= 72) {
        n_val.style.backgroundColor = "#56f218";
        let btn = document.getElementById('act3-btn');
        btn.disabled = false;
    }
    else if (N < 60 || N > 72) {
        n_val.style.backgroundColor = "red";
        let btn = document.getElementById('act3-btn');
        btn.disabled = true;
    }
}
function calculate_Q1() {
    main_table_data[0][7] = main_table_data[0][5] * main_table_data[0][4] * V / MW;
    console.log("Q1 = " + main_table_data[0][7]);
}
function calculate_n0() {
    main_table_data[0][8] = main_table_data[0][6] * 60 / main_table_data[0][7];
    N = Math.round(main_table_data[0][8]);
    main_table_data[0][8] = N;
    console.log(N);
}
function get_values() {
    let compound = document.getElementById('compounds-dd');
    let slider = document.getElementById('stat-dd');
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
        main_table_data[i][2] = main_table_data[i][1] - (ro_hg * g * main_table_data[i][0] / 100);
    }
    // console.log(main_table_data);
}
function calculate_tb() {
    for (let i = 0; i < main_table_data.length; i++) {
        main_table_data[i][3] = ((B / (A - Math.log10(main_table_data[i][2] * 1000 * 0.00750062))) - C) + 273.15;
        main_table_data[i][3] = std_deviation(main_table_data[i][3]);
    }
    // console.log(main_table_data);
}
function calculate_rho() {
    for (let i = 0; i < main_table_data.length; i++) {
        let a1 = 1 - (main_table_data[i][3] / ro_Tc);
        var a2 = Math.pow(a1, (ro_n));
        a2 = -a2;
        let a3 = Math.pow(ro_B, (a2));
        main_table_data[i][4] = ro_A * a3;
    }
    // console.log(main_table_data);
}
function calculate_lambda() {
    for (let i = 0; i < main_table_data.length; i++) {
        let a1 = 1 - (main_table_data[i][3] / H_Tc);
        a1 = Math.pow(a1, (H_n));
        main_table_data[i][5] = H_A * a1;
    }
    console.log(main_table_data);
}
function calculate_rest_of_n() {
    if (main_table_data.length <= 1) {
        return;
    }
    for (let i = 1; i < main_table_data.length; i++) {
        main_table_data[i][8] = Math.round((Math.random() * 12) + 60);
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
        main_table_data[i][7] = main_table_data[i][5] * main_table_data[i][4] * V / MW;
    }
    console.log(main_table_data);
}
function calculate_rest_of_Q() {
    if (main_table_data.length <= 1) {
        return;
    }
    for (let i = 1; i < main_table_data.length; i++) {
        main_table_data[i][6] = main_table_data[i][8] * main_table_data[i][7] / 60;
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
    activity4();
}
activity3();
//# sourceMappingURL=activity3.js.map