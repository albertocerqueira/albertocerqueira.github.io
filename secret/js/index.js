var form = $('.form');
var btn = $('#submit');
var topbar = $('.topbar');
var secretWord = $('#secretWord');
var password = $('#password');
var article = $('.article');
var p = $('.article p');
var tries = 0;
var h = password.height();
var words = ['google', 'facebook', 'linkedin', 'github', 'bitbucket'];

function isBlank(value) {
	return value == "" || value == "null" || value == "undefined" || typeof value == undefined || value == undefined || typeof value == null || value == null;
}

$('.spanColor').height(h + 23);

$('#go-albertocerqueira').on('click', function() {
	document.location = 'https://albertocerqueira.github.io';
});

password.on('focus', function() {
	topbar.removeClass('error success');
	password.text('');
});

btn.on('click', function() {
	if (tries <= 2) {
		var word = secretWord.val();
		console.log(word);
		
		var isPass = false;
		for (var i = 0, l = words.length; i < l; i++) {
			if (word == words[i]) {
				isPass = true;
			}
		}
		
		if (isPass && !isBlank(password.val())) {
			setTimeout(function() {
				btn.text('Success!');
			}, 250);
			
			var passwordGenerated = generatePassword(word, password);
			console.log(passwordGenerated);
			
			p.text(passwordGenerated);
			topbar.addClass('success');
			form.addClass('goAway');
			article.addClass('active');
			
			tries = 0;
		} else {
			topbar.addClass('error');
			
			tries++;
			switch (tries) {
				case 0:
					btn.text('generate');
					break;
				case 1:
					setTimeout(function() {
						btn.text('you have 2 tries left');
					}, 300);
					break;
				case 2:
					setTimeout(function() {
						btn.text('only 1 more');
					}, 300);
					break;
				case 3:
					setTimeout(function() {
						btn.text('recover password?');
					}, 300);
					password.prop('disabled', true);
					topbar.removeClass('error');
					password.addClass('disabled');
					btn.addClass('recover');
					break;
				default:
					defaut: btn.text('generate');
					break;
			}
		}
	} else {
		topbar.addClass('disabled');
	}
});

$('.form').keypress(function(e) {
	if (e.keyCode == 13) {
		submit.click();
	}
});

password.keypress(function() {
	topbar.removeClass('success error');
});

var generatePassword = (function(word, password) {
	var passowrd = [''];
	
	function replaceChar(c) {
		if (c == "a" || c == "A") {
			return "@";
		} else if (c == "e" || c == "E") {
			return "&";
		} else if (c == "i" || c == "I") {
			return "1";
		} else if (c == "s" || c == "S") {
			return "$";
		} else if (c == "x" || c == "x") {
			return "%";
		} else if (c == "b" || c == "B") {
			return "#";
		} else if (c == "o" || c == "O") {
			return "0";
		} else {
			return c;
		}
	};
	
	var passwordGenerated = calcMD5((word + password + word));
	console.log(passwordGenerated);
	
	for (var i = 0, l = passwordGenerated.length; i < l; i++) {
		if (word == 'github' || word == 'bitbucket') { // alphanumeric and special character every 3
            if (i % 3 == 0) {
        		passowrd.push(replaceChar(passwordGenerated.charAt(i)));
            }else {
            	passowrd.push(passwordGenerated.charAt(i));
            }
		} else if (word == 'google' || word == 'facebook' || word == 'linkedin') { // alphanumeric and special character every 2
            if (i % 2 == 0) {
        		passowrd.push(replaceChar(passwordGenerated.charAt(i)));
            }else {
            	passowrd.push(passwordGenerated.charAt(i));
            }
		} else {
			passowrd.push(passwordGenerated.charAt(i));
		}
    };
    
    return passowrd.join('');
});