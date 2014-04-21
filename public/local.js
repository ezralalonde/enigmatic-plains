var separator = ", ";
var menu = {
    'Burmese Samosas': chickenveggie(),
    'Burmese Spring Rolls': porkveggie(),
    'Thousand Layer Bread': "",
    'Tempura Onion': "",
    'Tempura Squash': "",
    'Tempura Mushrooms': "",
    'Soup of the Day': "",

    // Salads
    'Mandalay Noodle Salad': "",
    'Asian Garden Salad': "",
    'Ginger Chicken Salad':"",
    'Pickled Green Tea Leaf Salad': "",
    'Ginger Mandarin Salad': chicken(),

    // Lunch
    'Burmese Pizza': "",
    'Thai Pizza': "",
    'Spicy Rice Bowl': beefchicken(spice()),
    'Burmese Fried Noodle': meat(),
    'Stir Fry Dish': base(meat()),
    'Pat Thai': {},
    'Burmese Noodle Bowl': meat(shrimp()),
    'Coconut Noodle Bowl': shrimp(chicken()),
    'Two Curry Special': base(curry(curry(spice()))),
    // Drinks?
};

function porkveggie(e) {
    return {
        "Pork": e,
        "Vegetarian": e,
    };
}
function chickenveggie(e) {
    return {
        "Chicken": e,
        "Vegetarian": e,
    };
}

function meat(e) {
    return {
        "Chicken": e,
        "Pork": e,
        "Vegetarian": e,
    };
}

function shrimp(e) {
    return {
        "plus Shrimp": e,
    };
}

function beefchicken(e) {
    return {
        "with Beef": e,
        "with Chicken": e,
    };
}

function chicken(e) {
    return {
        "with Chicken": e,
    };
}

function spice(e) {
    return {
        "Level 2": e,
        "Level 3": e,
        "Level 4": e,
        "Level 5": e,
        "Level 6": e,
        "Level 7": e,
        "Level 8": e,
        "Level 9": e,
        "Level 10": e,
        "Level 11": e,
        "Level 12": e,
    }
}

function curry(e) {
    return {
        "Beef": e,
        "Beef and Potato": e,
        "Chicken": e,
        "Chicken and Potato": e,
        "Vegetable Stir-fry": e,
    };
}

function base(e) {
    return {
        "Rice": e,
        "Rice Noodle": e,
        "Egg Noodle": e,
        "Spicy Rice": e,
    };
}

// tokenize a path string into an array
function split(val) {
    return val.split(separator);
}

// find the longest common start in an array of strings
function sharedStart(A) {
    var tem1, tem2, s;
    var res = "";

    if (A.length == 0) return res;

    A = A.slice(0).sort();
    tem1 = A[0];
    tem2 = A.pop();

    s = tem1.length;

    console.log(tem1);
    console.log(tem2);

    while (s > 0) {
        var m = tem1.substring(0, s);
        var re = new RegExp("^" + m + ".*", "i");

        if (tem2.match(re)) {
            res = m;
            break;
        }
        --s;
    }

    return res;
}

function acSource(request, response) {
    var path = split(request.term);
    var depth = path.length;
    var node = menu;
    var avail = new Array();

    // descent into the path tree to get a list of suggestions
    for (var n = 1; n < depth && typeof node !== "undefined"; n++) {
        var cur = path[n - 1];
        node = node[cur];
    }

    // build a regex with the last directory entry being typed
    var last = path.pop();
    var re = new RegExp("^" + last + ".*", "i");

    // filter suggestions by matching with the regex
    for (var k in node) {
        if (k.match(re)) avail.push(k);
    }

    // build a new suggestion
    path.push(sharedStart(avail));
    if (avail.length == 1) path.push("");

    // delegate back to autocomplete, but extract the last term
    response($.ui.autocomplete.filter(avail, last));
}

function acSelect(event, ui) {
    var terms = split(this.value);

    // remove the current input
    terms.pop();

    // add the selected item
    terms.push(ui.item.value);
    terms.push("");

    // build path
    this.value = terms.join(separator);
    return false;
}

function acSearch() {
    $(this).autocomplete("search");
}

var acPathOptions = {
    minLength: 0,
    delay: 0,

    source: acSource,
    select: acSelect,

    focus: function () {
        // prevent value inserted on focus
        return false;
    }
}

function initPathAC(what) {
    $(what)
        .bind("focus", acSearch)
        .bind("click", acSearch)
        .autocomplete(acPathOptions)
        .autocomplete("enable");
    $('input[type="text"]')
        // event handler
        .keyup(resizeInput)
        .keypress(resizeInput)
        .click(resizeInput)
        // resize on page load
        .each(resizeInput);
    $('input[type="text"]')
        .keyup(stripSpaces)
        .keypress(stripSpaces)
        .click(stripSpaces)
        .bind("change", stripSpaces);
}

initPathAC($(".pathInput"));

// scale textboxes with the length of input
function resizeInput() {
    $(this).attr('size', $(this).val().length);
}

function stripSpaces() {
    str = $(this).val();
    str = '' + str.replace(/ +(?= )/g,'');
    $(this).val(str);
}

// add a new input upon clicking "plus"
$(".plus").click(function() {
    $('<input>').attr('type','text')
    .attr("class", "pathInput").appendTo('form');
initPathAC($(".pathInput"));
});


