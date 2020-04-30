let countries = [
    {
        "name": "India",
        "states": [
            { 
                "name": "Tamil Nadu",
                "cities": ["Chennai", "Madurai"]
            },
            { 
                "name": "Maharashtra",
                "cities": ["Mumbai", "Pune"]
            },
            { 
                "name": "West Bengal",
                "cities": ["Kolkata", "Siliguri"]
            }
        ]
    },
    {
        "name": "USA",
        "states": [
            { 
                "name": "California",
                "cities": ["Los Angeles", "San Francisco"]
            },
            { 
                "name": "New York",
                "cities": ["Rochester", "Geneva"]
            }
        ]
    }
];
let colorKeys = ["color-red", "color-green", "color-blue"];
let tableHeaderSeq = ['username', 'email', 'age', 'country', 'state', 'city', 'gender', 'colors', 'message'];
$(document).ready(function(){
    let countrySelect = $("#select-country");
    $("#select-country").empty();
    $("#select-country").append("<option value=\"\" selected disabled hidden>Country</option>");
    $("#select-state").empty();
    $("#select-state").append("<option value=\"\" selected disabled hidden>State</option>");
    $("#select-city").empty();
    $("#select-city").append("<option value=\"\" selected disabled hidden>City</option>");
    $("#reset").trigger("click");
    getCountries().forEach(element => {
        countrySelect.append(element);
    });
    countrySelect.change(function() {
        let countryName = $("#select-country option:selected").text();
        $("#select-state").empty();
        $("#select-state").append("<option value=\"\" selected disabled hidden>State</option>");
        $("#select-city").empty();
        $("#select-city").append("<option value=\"\" selected disabled hidden>City</option>");
        getStates(countryName).forEach(element => {
            $("#select-state").append(element);
        });
    });
    
    $("#select-state").change(function() {
        let countryName = $("#select-country option:selected").text();
        let stateName = $("#select-state option:selected").text();
        $("#select-city").empty();
        $("#select-city").append("<option value=\"\" selected disabled hidden>City</option>");
        getCities(countryName, stateName).forEach(element => {
            $("#select-city").append(element);
        });
    });

    $("form").submit(function(event){
        event.preventDefault();
        let data = $(this).serializeArray();
        console.log(data);
        data = data.reduce((obj, d) => {
            obj[d.name] = d.value;
            return obj;
        }, {});
        let colors = '';
        console.log(data);
        colorKeys.forEach((cKey, index) => {
            if (cKey in data) {
                colors += cKey.split('-')[1] + ', ' ;
                delete data[cKey];
            }
        });
        colors = colors.slice(0, colors.length - 2);
        data["colors"] = colors;
        console.log(data);
        addEntryIntoTable(data);
    });

});

function addEntryIntoTable(obj) {
    html = '';
    tableHeaderSeq.forEach((heaerName) => {
        html += `<td scope="col">${obj[heaerName] ? obj[heaerName] : ''}</td>`;
    });
    html += `<td scope="col">
                <i class="fa fa-times" aria-hidden="true" title="Delete" 
                    data-toggle="modal" data-target="#delete-modal">
                </i>
            </td>`;
    $("#entries tbody").append(`<tr>${html}</tr>`);
    $('.toast').slideDown().delay(1500).fadeOut();

    $(".fa-times").click(function() {
        let parentTr = $(this).parent().parent();
        $("#delete-delete").click(function() {
            parentTr.remove();
        });
    });
}

function getCountries() {
    return countries.map((element) => `<option value="${element.name}">${element.name}</options>`);
}

function getStates(countryName) {
    for (let i in countries) {
        let country = countries[i];
        if (country.name.toLowerCase() == countryName.toLowerCase()) {
            return country.states.map(element => `<option value="${element.name}">${element.name}</options>`);
        }
    }   
}

function getCities(countryName, stateName) {
    for (let i in countries) {
        let country = countries[i];
        if (country.name.toLowerCase() == countryName.toLowerCase()) {
            let states = country.states;
            for (let j in states) {
                let state = states[j];
                if (state.name.toLowerCase() == stateName.toLowerCase()) {
                    return state.cities.map(element => `<option value="${element}">${element}</options>`);
                }
            }
        }
    }
}




