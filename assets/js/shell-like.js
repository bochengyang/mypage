var prompt;
const consoleMsg =
'% cat example.c \n\
#include <stdio.h>\n\
int main()\n\
{\n\
printf(\"Goodbye Cruel World!\n\");\n\
return 0;\n\
}\n\
% make example.c -o example\n\
% ./example\n\
Goodbye Cruel World!';

function setPrompt(usr, domain) {
    prompt = usr + '@' + domain + ' %';
}

function addOutput(s) {
    $('<div>').text(s).appendTo(wnd);
    return Q.delay(100);
    //  return addPrompt();
}

function addInput(s) {
    var l = $('.prompt:last');
    var e = $('<span>').addClass('cmd').appendTo(l);

    return addLettersRecursive(e, s);
}

function addPrompt() {
    var l = $('<div>').text(prompt).addClass('prompt').appendTo(wnd);
    return Q.delay(900);
}

function addLettersRecursive(container, s) {
    container.append(s.charAt(0)); // dangerous :(
    var row_complete = Q.defer();
    Q.delay(100).then(function() {
        if (s.length <= 1) {
            row_complete.resolve();
        }
        addLettersRecursive(container, s.substr(1)).then(function() {
            row_complete.resolve();
        })
    });
    return row_complete.promise;
}

jQuery(document).ready(function($){
    setPrompt('root', 'bochengyang');

    var lines = $("#consolemsg").val().split('\n');

    var promise = new Q();

    promise = promise.then(function() {
      for (const item of lines) {
        if (item[0] == '%') {
            promise = promise.then(function() 
            { return addPrompt(); })
            promise = promise.then(function() 
            { return addInput(item.substr(1)); })
        } else {
            promise = promise.then(function() 
            { return addOutput(item); })
        }
      }
    })
    promise.done();
});
