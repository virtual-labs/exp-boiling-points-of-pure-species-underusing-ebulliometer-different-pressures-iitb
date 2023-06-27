var obs_table = [];
var act4_table_headings;
var verify_row;
var act4_btn = `<button id="panel1_btn" class="btn btn-primary" onclick="activity5();" style="position: absolute; bottom: 8vh; width: 85%;">Next</button>`;
function activity4() {
    pp.clearleftpannel();
    pp.showtitle("To determine the Boiling point of pure species under different pressures", 3);
    obs_table = [];
    for (let i = 0; i < main_table_data.length; i++) {
        obs_table[i] = [];
        obs_table[i][0] = (i + 1).toString();
        obs_table[i][1] = main_table_data[i][0].toFixed(0);
        obs_table[i][2] = main_table_data[i][1].toFixed(3);
        obs_table[i][3] = main_table_data[i][2].toFixed(3);
    }
    act4_table_headings = ["Sr No.", "&Delta;H (mm)", "P<sub>1</sub> (kPa)", "P<sub>2</sub> (kPa)", "check"];
    verify_row = [["1", `${obs_table[0][1]}`, `${obs_table[0][2]}`, `<input type="text"  id="inp-1">`, `<input type="submit" class="btn btn-primary" onclick="verify_act4();">`]];
    let act4_table = new Table(act4_table_headings, verify_row);
    pp.addtoleftpannel(act4_table.template);
    act4_table.draw();
    pp.showdescription(`
    <div>
        <p>P<sub>2</sub> =  P<sub>1</sub> -  (&rho; x g x &Delta;H / 100)</p>
        <p>&rho; = ${ro_hg}</p>
        <p>g = ${g} m/s<sup>2</sup></p>
    </div>
    `, 3);
    show_panel(3);
}
function verify_act4() {
    let val1 = document.getElementById(`inp-1`);
    if (!verify_values(parseFloat(val1.value), main_table_data[0][2])) {
        alert(`please correct P2 value!!`);
        return;
    }
    alert("Calculation is right!!");
    act4_table_headings.pop();
    act4_table_headings = ["Sr No.", "&Delta;H (mm)", "P<sub>1</sub> (kPa)", "P<sub>2</sub> (kPa)", "T<sub>B</sub> (K)", "&lambda; (KJ/mol)", "Q (KJ)", "n", "T (&#8451;)", "check"];
    let v2_row = [["1", `${obs_table[0][1]}`, `${obs_table[0][2]}`, `${main_table_data[0][2].toFixed(3)}`, `${main_table_data[0][3].toFixed(2)}`, `${main_table_data[0][5].toFixed(4)}`, `${main_table_data[0][6].toFixed(2)}`, `${main_table_data[0][8]}`, `<input type="text"  id="inp-1">`, `<input type="submit" class="btn btn-primary" onclick="verify_act4_2();">`]];
    pp.showdescription("<p>T = T<sub>B</sub> - 273.15</p>", 3);
    let act4_table = new Table(act4_table_headings, v2_row);
    pp.addtoleftpannel(act4_table.template);
    pp.addtoleftpannel(act4_table.template);
    act4_table.draw();
}
function verify_act4_2() {
    let val1 = document.getElementById(`inp-1`);
    if (!verify_values(parseFloat(val1.value), main_table_data[0][9])) {
        alert(`please correct T value!!`);
        return;
    }
    alert("Calculation is right!!");
    act4_table_headings.pop();
    let obs_table_2 = filter_columns(main_table_data);
    pp.clearleftpannel();
    let act4_table = new Table(act4_table_headings, obs_table_2);
    pp.addtoleftpannel(act4_table.template);
    act4_table.draw();
    pp.showdescription("", 3);
    pp.addtorightpannel(act4_btn, 3);
}
function filter_columns(t_data) {
    let arr = [];
    for (let i = 0; i < t_data.length; i++) {
        arr.push([(i + 1).toString(), t_data[i][0].toString(), t_data[i][1].toFixed(3), t_data[i][2].toFixed(3), t_data[i][3].toFixed(2), t_data[i][5].toFixed(2), t_data[i][6].toFixed(4), t_data[i][8].toFixed(2), t_data[i][9].toFixed(2)]);
    }
    return arr;
}
//# sourceMappingURL=activity4.js.map