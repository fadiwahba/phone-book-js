'use strict';

// to be moved to an API
// var data = [];
var data = [
    { "name": "Yorke", "phone": "20-908-5007", "email": "yhargess0@moonfruit.com" },
    { "name": "Lila", "phone": "40-086-0452", "email": "lalbrook1@wikia.com" },
    { "name": "Audrey", "phone": "17-818-2184", "email": "adonisi2@yellowpages.com" },
    { "name": "Hugues", "phone": "65-735-8610", "email": "hjustun3@npr.org" },
    { "name": "Ophelie", "phone": "67-241-9782", "email": "ominor4@sfgate.com" }
];

// instantiate an object from our PhoneBook class
var phoneBook = new PhoneBook(data);

var APP = (function (window, undefined) {
    
    // cache the DOM
    var appElement = document.getElementById('app');
    
    
    function render() {
        var contacts = phoneBook.list(2,2);
        appElement.innerHTML = JSON.stringify(contacts);
    }

    function init() {
        console.log('App initialized');
        // get data by ajax, then render
        render();
    }

    // explicitly return public methods when this object is instantiated
    return {
        init: init,
        render: render
    };

})(window);

try {
    APP.init();    
} catch (error) {
    console.log(error.name + ': ' + error.message);
    console.log(error.stack);
}
