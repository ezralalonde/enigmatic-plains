var menu = {
    'Asian Garden Salad': "",
    'Burmese Fried Noodle': meat(),
    'Burmese Noodle Bowl': meat(shrimp()),
    'Burmese Pizza': "",
    'Burmese Samosas': chickenveggie(),
    'Burmese Spring Rolls': porkveggie(),
    'Coconut Noodle Bowl': shrimp(chicken()),
    'Ginger Chicken Salad':"",
    'Ginger Mandarin Salad': chicken(),
    'Mandalay Noodle Salad': "",
    'Pat Thai': {},
    'Pickled Green Tea Leaf Salad': "",
    'Soup of the Day': "",
    'Spicy Rice Bowl': beefchicken(spice()),
    'Stir Fry Dish': base(meat()),
    'Tempura Mushrooms': "",
    'Tempura Onion': "",
    'Tempura Squash': "",
    'Thai Pizza': "",
    'Thousand Layer Bread': "",
    'Two Curry Special': base(curry(curry(spice()))),
};

function porkveggie(e) {
    return {
        "Pork": e,
        "Vegetarian": e,
    };
};

function chickenveggie(e) {
    return {
        "Chicken": e,
        "Vegetarian": e,
    };
};

function meat(e) {
    return {
        "Chicken": e,
        "Pork": e,
        "Vegetarian": e,
    };
};

function shrimp(e) {
    return {
        "Shrimp": e,
    };
};

function beefchicken(e) {
    return {
        "Beef": e,
        "Chicken": e,
    };
};

function chicken(e) {
    return {
        "Chicken": e,
    };
};

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
    };
};

function curry(e) {
    return {
        "Beef": e,
        "Beef and Potato": e,
        "Chicken": e,
        "Chicken and Potato": e,
        "Vegetable Stir-fry": e,
    };
};

function base(e) {
    return {
        "Egg Noodle": e,
        "Rice": e,
        "Rice Noodle": e,
        "Spicy Rice": e,
    };
};

// tokenize a path string into an array
function split(val) {
    return val.split(/,\s+/);
};

// find the longest common start in an array of strings
function sharedStart(A) {
    var tem1, tem2, s;
    var res = "";

    if (A.length == 0) {
        return res;
    };

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
        };
        --s;
    };

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
    };

    // build a regex with the last directory entry being typed
    var last = path.pop();
    var re = new RegExp("^" + last + ".*", "i");

    // filter suggestions by matching with the regex
    for (var k in node) {
        if (k.match(re)) avail.push(k);
    };

    // build a new suggestion
    path.push(sharedStart(avail));
    if (avail.length == 1) {
        path.push("");
    };

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
    this.value = terms.join(", ");
    $(".pathInput").trigger("keyup");
    return false;
};

function acSearch() {
    $(this).autocomplete("search");
};

var acPathOptions = {
    minLength: 0,
    delay: 0,

    source: acSource,
    select: acSelect,

    focus: function () {
        // prevent value inserted on focus
        return false;
    }
};

function initPathAC(what) {
    $(what)
        .focus(acSearch)
        .click(acSearch)
        .change(acSearch)
        .autocomplete(acPathOptions)
        .autocomplete("enable")
        // strip duplicate spaces
        .keyup(stripSpaces)
        .keypress(stripSpaces)
        .click(stripSpaces)
        .each(stripSpaces)
        // resize input to fit text
        .keyup(resizeInput)
        .keypress(resizeInput)
        .click(resizeInput)
        .each(resizeInput);
};

initPathAC($(".pathInput"));

// scale textboxes with the length of input
function resizeInput() {
    $(this).attr('size', $(this).val().length);
};

function stripSpaces() {
    str = $(this).val();
    out = '' + str.replace(/ +(?= )/g,'');
    $(this).val(out);
    if (str != out) {
        $(this).autocomplete("search");
    };
};

// add a new input upon clicking "plus"
$(".plus").click(function() {
    $('<input>').attr('type','text').attr("class", "pathInput").appendTo('form');
    initPathAC($(".pathInput"));
});


