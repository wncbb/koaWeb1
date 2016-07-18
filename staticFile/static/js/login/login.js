

$(document).ready(function(){
	$('#captcha-img').click(function(){
    $.ajax({
    	url: './refreshCaptcha',
    	type: 'POST',
    	success: function(data){
    		$('#captcha-img').attr('src', data.captcha);
    	}
    });
  });
  $('#submit').click(function(event){
    console.log('hello world');
    event.preventDefault();    
    $.ajax({
    	url: './login',
    	type: 'POST',
    	data: {
    		name: $('#name').val(),
    		password: $('#password').val(),
    		captcha: $('#captcha').val(),
    	},
    	success: function(data){
    		console.log(JSON.stringify(data));
    		if(data.errorCode!=0){
    			$('#captcha-img').attr('src', data.captcha);
    		}
    		switch(data.errorCode){
    			case 0:
    			   	console.log('login success');
    				//window.location.reload(true);
                    window.location.href=$.getUrlParam('go');
    				break;
    			case -2:
    				console.log('the captcha is wrong!');
    				break;
    			default:
    			    console.log('login fail');
    			    break;

    		}
    	},
    	error: function(err){
    		console.log('This is an error!');
    	}


    });
  });

});
