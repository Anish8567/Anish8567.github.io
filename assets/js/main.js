$(document).ready(function(){
	resizeDiv();
	skrollrInit();
	 // AOS.init({
	 // 	disable: window.innerWidth > 600,
	 // });
	 AOS.init({});
});

window.onresize = function(event) {
	resizeDiv();
	skrollrInit();
}

function resizeDiv() {
	vpw = $(window).width();
	vph = $(window).height();
	navbar = $('.nav-outer').innerHeight();
	if ($('.navbar-main-index').css('position') == 'static')
	{
	  	videoheight= vph - navbar;
	  	$('.video-container').css({'margin-top' : 0 + 'px'});
	}
	else
	{
		$('.video-container').css({'margin-top' : navbar + 'px'});
		videoheight= vph  - navbar;
	}
	$('#myVideo').css({'height': videoheight + 'px'});
}

$(document).ready(function(){
	// $( ".video-cover-img"  ).last().addClass( "right-border-radius" );
	// $( ".video-cover-img"  ).first().addClass( "left-border-radius" );
});

// read data from google sheet
$(document).ready(function(){
	$.ajax("https://docs.google.com/spreadsheets/d/e/2PACX-1vQy7PRXMh6GB88jf-4uDGdSfyx8qwEmQJQ6IxvSc9tQHyBGd3VpVNi8OW6GuHizI8TdVj-otfdeHCPw/pub?gid=0&single=true&output=csv").done(function(result){
	    csvJSON(result);
	});
});

function csvJSON(csv){
  // console.log("inside csv to json function");
  var lines=csv.split("\n");
  var result = [];
  var headers=lines[0].split(",");
  for(var i=1;i<lines.length;i++){
	  var obj = {};
	  var currentline=lines[i].split(",");
	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }
	  result.push(obj);
  }
  var data = JSON.stringify(result); //JSON

  	var tempdata=result;
	var testing= tempdata.sort(sorted("date"));
	eventsAfterToday(testing);
}

function sorted(data){
	   return function(a, b) {  
        var dateA = new Date(a.date), dateB = new Date(b.date);
    	return dateA - dateB;
    }  
}
function eventsAfterToday(data1){
	var fullData = data1;
	var todayDate= new Date();
	var newData=[];
	var filterData=[];

	for(var i=0 ; i < fullData.length ;i++){

		if(new Date (fullData[i].date +" "+ fullData[i].time) >= todayDate){
			fullData[i].date = moment(new Date (fullData[i].date)).format("MMM Do YYYY"); 
			newData.push(fullData[i]);
		}
		else{
			// console.log("no");
		}
	}
	test(newData);

	$( "#selectArtist" ).change(function() {
		var temp= $( "#selectArtist" ).val();
		filterData=[];

		if(temp!='all'){
			for (var i = 0; i < newData.length; i++) {

				if(newData[i].artist.toLowerCase().includes(temp.toLowerCase())){
					// console.log("yes");

					filterData.push(newData[i]);

					}

			}
				test(filterData);
		}
		else
		{
			test(newData);
		}
		
	});

}

function test(data){
	
	$('.tickets-container').html("")
	if(data.length > 0){
		for (var i =0 ; i < data.length; i++) {
			var template = $('#tickets_template').html();
			if (template) {
				var html = Mustache.to_html(template, data[i]);

				$('.tickets-container').append(html);
			}
		}
		$('#tickets-outer-container h1').text("Upcoming Events");
	}
	else{
		$('#tickets-outer-container h1').text("No Upcoming Events");
	}
}

$(document).ready(function(){
	$('.team-dropdown').hover(function() {
	  $(this).find('.team-dropdown-content').stop(true, true).delay(200).fadeIn(500);
	}, function() {
	  $(this).find('.team-dropdown-content').stop(true, true).delay(200).fadeOut(500);
	});

});

//scroll to animation
$("a[href^='#']").click(function(e) {
	e.preventDefault();

	var position = $($(this).attr("href")).offset().top;

	$("body, html").animate({
		scrollTop: position
	},1000 );
});

//email function
$(document).ready(function() {
	var formUrl= "http://128.199.218.232:89/eic-contact/";
      $('form').submit(function(evt){
      	console.log("inside form");
      	var $this = $(this);
		var name = $('#name').val();
		var email = $('#email').val();
		var contact = $('#phone').val();
		var description = $('#description').val();
		var formdata = $this.serialize();
		console.log(formdata);
		console.log(name);
		if ($this.attr('id') == 'contact-us') {
			console.log("sending...");
			$('#contact-us .mail-button ').text("Sending...");
		}
		if (!name == '' && !email == '' && !contact == '' && !description == '') {
			console.log("1");
			$.ajax({
				type: 'POST',
				data: formdata,
				url: formUrl,
				success: function(data) {
					console.log("mail sent");
					clearForm();
					 // location.reload();
                },
				error: function(data) {
					console.log(data);
					alert('Sorry, something went wrong! Please try again ');
				}
			});
		}

        evt.preventDefault();
      });
 });
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("description").value = "";
    $('#contact-us .mail-button ').text("Send Mail");
}
var t;
//function Skrollr
function skrollrInit() {

    //initialize skrollr
	if($(window).width() > 600)
	{

		 skrollr.init({forceHeight: false});
		 t= 1;
	    // disable skrollr if using handheld device
	    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	        skrollr.init().destroy();
	    }
	    else{}
	}
	else {

		if( t == 1){
 				// disable skrollr if using handheld device
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

		        skrollr.init().destroy();
	    	}

			t=0;
			}

		else{} 

	}

}

//blur effects

window.addEventListener('load', function() {
	
	// setTimeout to simulate the delay from a real page load
	setTimeout(lazyLoad, 1);
	
});

function lazyLoad() {
	var card_images = document.querySelectorAll('.tempimg');
	
	// loop over each card image
	card_images.forEach(function(card_image) {

		if($(card_images).attr('data-image-full')) {
			// console.log("yes ");
			var image_url = card_image.getAttribute('data-image-full');
			var content_image = card_image.querySelector('img');
			content_image.src = image_url;

			content_image.addEventListener('load', function() {
			card_image.className = card_image.className + ' is-loaded';
		});
		}
		else{}

	});
	
}
//cta function to fill data in email
function addDescription(data){
	// console.log(data);
	document.getElementById("description").value = "Enquiry for " +data;
}

// to find scroll top position
var $window = $(window);
$window.on('scroll resize', check_scroll_top);

function check_scroll_top(){
	var checkScrollTop = $(window).scrollTop();
	// console.log("checkScrollTop:" +checkScrollTop);
}

