let array = ["item1", "item2", "item3", "item4"];
let array2 = [];

select1 = document.getElementById("leftList");
select2 = document.getElementById("rightList");

function select() {

    select1.innerHTML = "";
    select2.innerHTML = "";

    for (let x of array) {
        var opt = document.createElement('option');
        console.log("opt", opt);
        opt.value = x;
        opt.innerHTML = x;
        console.log(opt.innerHTML);
        select1.appendChild(opt);
    }

    for (let x of array2) {
        var opt = document.createElement('option');
        opt.value = x;
        opt.innerHTML = x;
        select2.appendChild(opt);
    }
}

function moveRight() {
    var selectedValue = [];
    for (i = 0; i < select1.options.length; i++) {
        if (select1.options[i].selected) {
            // array2.push(select1.options[i].text);
        //    array.splice(select1.options.selectedIndex, 1);
     selectedValue.push(select1.options[i].text);

        //    console.log("select1.options.selectedIndex", select1.options.selectedIndex)
        }
    }

    for (var i = 0; i < select1.options.length; i++){
        // console.log(" select1.options.length",  select1.options.length)
        let text = selectedValue[i];
       let name =  array.indexOf(text);
    //    console.log("newtext", text)
    //    console.log("kk", name)
    if (name > -1){
        console.log("name", name)
        array2.push(text);
        array.splice(name, 1);  
    }
    }
    select();
}


function moveLeft() {
    var selectedValue = [];
    for (i = 0; i < select2.options.length; i++) {
        if (select2.options[i].selected) {
            selectedValue.push(select2.options[i].text);
        }
    }

    for (var i = 0; i < select2.options.length; i++){
        // console.log(" select1.options.length",  select1.options.length)
        let text = selectedValue[i];
       let name =  array2.indexOf(text);
    //    console.log("newtext", text)
    //    console.log("kk", name)
    if (name > -1){
        array.push(text);
        array2.splice(name, 1);
    }
    }
    select();
}

select();
