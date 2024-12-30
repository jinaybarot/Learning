let array = [];
let hide = $("#hidden");
let form = $("#form");
list();
$("#range").on('input', function () {
    return $("#agedis").text($(this).val());
});

function add() {
    clearError();
    if (validate()) {
        let gender = $('input[name="gender"]:checked').val();
        let language = $('input[name="lang"]:checked').map(function () {
            return $(this).val();
        }).get().join(", ")
        let age = $("#range").val();
        console.log("first", hide.val())
        if (hide.val() !== "") {

            let obj = {
                firstname: $("#fname").val(),
                lastname: $("#lname").val(),
                gmail: $("#gmail").val(),
                adress: $("#adress").val(),
                city: $("#city").val(),
                gender: gender,
                language: language,
                age: age
            }
            array[hide.val()] = obj;
            hide.val("");
        } else {
            let obj = {
                firstname: $("#fname").val(),
                lastname: $("#lname").val(),
                gmail: $("#gmail").val(),
                adress: $("#adress").val(),
                city: $("#city").val(),
                gender: gender,
                language: language,
                age: age
            }
            array.push(obj);
            console.log('array:', array)
            localStorage.setItem("jinay", JSON.stringify(array));

        }
        list();
        form[0].reset();
        $("#agedis").text("0");
    }
}

function edit(i) {
    hide.val(i);
    $("#fname").val(array[i].firstname);
    $("#lname").val(array[i].lastname);
    $("#gmail").val(array[i].gmail);
    $("#adress").val(array[i].adress);
    $("#city").val(array[i].city);
    $('input[name="gender"][value = ' + array[i].gender + ']').prop("checked", true);
    let langa = array[i].language.split(", ");
    langa.forEach((item) => {
        $('input[name="lang"][value = "' + item + '"]').prop("checked", true);
    });
    $("#range").val(array[i].age);
    $("#agedis").text(array[i].age);
}

function dele(i) {
    if (confirm("Are you sure you want to delete this data ?")) {
        array.splice(i, 1);
        localStorage.setItem('jinay', JSON.stringify(array));
        list();
    }
}

function list() {
    $("#table").html("");
    // let list = JSON.parse(localStorage.getItem("index"));
    console.log(list)
    array.forEach((item, index) => {
        $("#table").append(`
            <tr>
            <td>${index + 1}</td>
            <td>${item.firstname}</td>
            <td>${item.lastname}</td>
            <td>${item.gmail}</td>
            <td>${item.adress}</td>
            <td>${item.city}</td>
            <td>${item.gender}</td>
            <td>${item.language}</td>
            <td>${item.age}</td>
            <td>
            <button class="btn btn-danger" type="button" onclick="edit(${index})">Edit</button>
            <button class="btn btn-warning" type="button" onclick="dele(${index})">Remove</button>
            </td>
            </tr>`)
    })
}

function validate() {
    let isvalid = true;

    if ($("#fname").val() === "") {
        $("#fname-error").text("Please enter Firstname.");
        isvalid = false;
    }

    if ($("#lname").val() === "") {
        $("#lname-error").text("Please enter Lastname.");
        isvalid = false;
    }

    let gmail = /\S+@\S+\.\S+/;
    if (!gmail.test($("#gmail").val())) {
        $("#gmail-error").text("Please enter Gmail.");
        isvalid = false;
    }

    if ($("#adress").val() === "") {
        $("#adress-error").text("Please enter Adress.");
        isvalid = false;
    }

    if ($("#city").val() === "Choose..") {
        $("#city-error").text("Please select City.");
        isvalid = false;
    }

    if ($('input[name="gender"]:checked').length === 0) {
        $("#gender-error").text("Please check Gender.");
        isvalid = false;
    }

    if ($('input[name="lang"]:checked').length === 0) {
        $("#lang-error").text("Please check Language.");
        isvalid = false;
    }

    if ($("#range").val() <= 20) {
        $("#age-error").text("Age need to be greater than 20");
        isvalid = false;
    }
    return isvalid;
}

function clearError() {
    $(".error-msg").text("");
}

function rese() {
    form[0].reset();
    $("#agedis").text("");
}

$(document).ready(function () {
    if (localStorage.getItem("jinay")) {
        array = JSON.parse(localStorage.getItem("jinay"));
        list();
    }
});