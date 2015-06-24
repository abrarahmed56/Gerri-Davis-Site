$(function()
  {
      $('.scroll-pane').jScrollPane({hideFocus:true});
  }
 );
var yearA;
var yearB;
var yearC;
var yearOther;
var randLoadImgs;
var menuLeft;
var menuMid;
var menuRight;
var slideshowOn;
var slideshowNum;
var slideshowTimer;
var init = function(yearA, yearB, yearC, yearOther, randLoadImgs) {
    this.yearA = yearA;
    this.yearB = yearB;
    this.yearC = yearC;
    this.yearOther = yearOther;
    this.randLoadImgs = randLoadImgs;
    this.menuLeft = menuLeft;
    this.menuMid = menuMid;
    this.menuRight = menuRight;
    checkUser();
    resize();
    slideshowOn = true;
    slideshowNum = 0;
    slideshow(0);
    var resizeAfterResized;
    window.onresize = function() {
	resize();
    };
    $(".title").on("mouseover", endSlideshow);
    document.getElementById("GerriDavis").addEventListener("mouseover", endSlideshow);
};
var endSlideshow = function(e) {
    //console.log("mouseover");
    slideshowOn = false;
    var painting = document.getElementsByClassName("title")[slideshowNum-1]
    console.log("painting src: " + painting.src);
    clearTimeout(slideshowTimer);
    $(".title").off();
    document.getElementById("GerriDavis").removeEventListener(e.type, arguments.callee);
    unbold(painting.id, painting.src);
    if (painting.src.includes("BoldText/")) {
	changeImg(painting.src);
    }
};
var resize = function() {
    console.log("resize");
    var wind = document.getElementById("styTwo");
    if (document.getElementById("imgLink").innerHTML.includes("div")) {
	//setTimeout is here because when resizing from fullscreen, sometimes width is slow to load
	setTimeout(function() {
	if (wind.clientWidth>450) {
	    var newW = wind.clientWidth * .9
	    document.getElementById("container").setAttribute("style", "width:" + newW + "px; text-align:center; background-color:red; font-size:0;");
	    console.log("here");
	}
	else {
	    document.getElementById("container").setAttribute("style", "width:405px; text-align:center; background-color:red; font-size:0;");
	    console.log($("#container").width());
	}
	}, 150);
    }
    else {
	var image = document.getElementById("bigImg");
	var imgProportion = image.naturalHeight/image.naturalWidth;
	var windowProportion = (wind.clientHeight*.85) / (wind.clientWidth*.9);
	if (imgProportion > windowProportion) {
	    var newH = wind.clientHeight*.85;
	    var newW = newH / imgProportion;
	    if (newH>300 || newW>300) {
		console.log(">200");
		image.setAttribute("style", "height:" + newH + "px; width:" + newW + "px;");
		var smallH = wind.clientHeight*.1;
		document.getElementById("smallImg").setAttribute("style", "height: " + smallH + "px;");
	    }
		else if (image.style.height==="0%" || image.style.height==="0%") {
		    newW = 300 / imgProportion;
		    image.setAttribute("style", "height:300px; width:" + newW + "px;");
		    var smallH = wind.clientHeight*.1;
		    document.getElementById("smallImg").setAttribute("style", "height: " + smallH + "px;");		    
		}
	}
	else {
	    //image width is width of sty2
	    var newW = wind.clientWidth*.9;
	    var newH = imgProportion * newW;
	    if (newH>300 || newW>300) {
		image.setAttribute("style", "height: " + newH + "px; width: " + newW + "px;");
		var smallH = newH/.85*.1;
		document.getElementById("smallImg").setAttribute("style", "height:" + smallH + "px;");
	    }
		else if (image.style.height==="0%" || image.style.height==="0%") {
		    newH = imgProportion * 300;
		image.setAttribute("style", "height:" + newH + "px; width:300px;");
		var smallH = newH/.85*.1;
		document.getElementById("smallImg").setAttribute("style", "height:" + smallH + "px;");
	    }
	}
    }
    var api = $('.scroll-pane').data('jsp');
    api.reinitialise();
}
var checkUser = function() {
    $(".detailslist").hide();
    if (navigator.userAgent.match(/iPad|iPhone|Android|Blackberry|Windows Phone|webOS/i)!=null ) {
	$("#webpage").hide();
    }
    else {
	$("#mobilepage").hide()
    }
}

var bold = function(id, src) {
	document.getElementById(id).setAttribute("src", src.replace("Text", "Text/BoldText"))
}

var unbold = function(id, src) {
    document.getElementById(id).setAttribute("src", src.replace("Text/BoldText", "Text"))
}

var myToggle = function(id) {
    if ($("#"+id+"Details").is(":visible")) {
	$("#"+id+"Details").hide();
    }
    else {
	$(".detailslist").hide();
	$("#"+id+"Details").show();
    }
    var api = $('.scroll-pane').data('jsp');
    api.reinitialise();
}
var showMenu = function(menuLeft, menuMid, menuRight) {
    var newW = document.getElementById("styTwo").width * .9;
    var s = "<div id='container' style='width:" + newW + "px; text-align:center; background-color:red; font-size:0;'>";
    var left = "<div id='menuLeft' style='width:42%; float:left;'><img id='" + menuLeft[0].replace(/ /g, '') + "' style='width:100%;' src='static/files/Text/" + menuLeft[0] + ".jpg'>";
    var mid = "<div id='menuMid' style='width:24%; float:left;'><img id='" + menuMid[0].replace(/ /g, '') + "' style='width:100%;' src='static/files/Text/" + menuMid[0] + ".jpg'>";
    var right = "<div id='menuRight' style='width:34%; float:left;'><img id='" + menuRight[0].replace(/ /g, '') + "' style='width:100%;' src='static/files/Text/" + menuRight[0] + ".jpg'>";
    for ( var i = 1 ; i < menuRight.length ; i++ ) {
	if ( i < menuLeft.length ) {
	    left = left + "<img id='" + menuLeft[i].replace(/ /g, '') + "' style='width:100%;' src='static/files/Text/" + menuLeft[i] + ".jpg' onmouseover='bold(this.id, this.src);' onmouseout='unbold(this.id, this.src);' onclick='clickMenu(&#34;" + menuLeft[i] + "&#34;);'>"
	}
	if ( i < menuMid.length ) {
	    mid = mid + "<img id='" + menuMid[i].replace(' ', '') + "' style='width:100%;' src='static/files/Text/" + menuMid[i] + ".jpg' onmouseover='bold(this.id, this.src);' onmouseout='unbold(this.id, this.src);' onclick='clickMenu(&#34;" + menuMid[i] + "&#34;);'>"
	}
	right = right + "<img id='" + menuRight[i].replace(' ', '') + "'  style='width:100%;' src='static/files/Text/" + menuRight[i] + ".jpg' onmouseover='bold(this.id, this.src);' onmouseout='unbold(this.id, this.src);' onclick='clickMenu(&#34;" + menuRight[i] + "&#34;);'>"
    }
    left = left + "</div>";
    mid = mid + "</div>";
    right = right + "</div>";
    s = s + left + mid + right + "</div>";
    //document.getElementById("imgLink").innerHTML=s + "<div style='background-color:blue; width: 0%; height: 0%;'>words<img id='bigImg'></div>";
    document.getElementById("imgLink").innerHTML = s + "<img id='bigImg'>"
    document.getElementById("imgLink").removeAttribute("href");
    document.getElementById("smallImg").setAttribute("style", "width: 0%; height: 0%");
};

var clickMenu = function(menuItem) {
    document.getElementById("imgLink").removeAttribute("href");
    if (menuItem == "02 exhibition calendar") {
	document.getElementById("imgLink").setAttribute("href", "http://gerridavis.net/new/files/UpcomingExhibitions.html");
    }
    else if (menuItem == "03 available editions") {
	document.getElementById("imgLink").setAttribute("href", "https://squareup.com/market/gerri-davis-studio");	
    }
    else if (menuItem == "04 cv") {
	document.getElementById("imgLink").setAttribute("href", "http://gerridavis.net/new/files/2013GerriDavisCV.pdf");
    }
    else if (menuItem == "06 fb") {
	document.getElementById("imgLink").setAttribute("href", "https://www.facebook.com/gerri.davis.94?fref=ts");
    }
    else if (menuItem == "07 instagram") {
	document.getElementById("imgLink").setAttribute("href", "https://instagram.com/gerridavis/");
    }
    else if (menuItem == "08 twitter") {
	document.getElementById("imgLink").setAttribute("href", "https://twitter.com/Pop_Rouge");
    }
    else if (menuItem == "09 email") {
	document.getElementById("imgLink").setAttribute("href", "mailto:email@gerridavis.net?body=To%3A%20GERRI%20DAVIS%0A340%20W%2039%20ST%0A6%20FL%20ART%20STUDIO%0ANEW%20YORK%20NY%2010018%0A(313)%20444-3774");
    }
    else if (menuItem == "11 ren weschler") {
	document.getElementById("imgLink").setAttribute("href", "http://www.gerridavis.net/new/files/Press/Problems%20with%20Authority%20-%20Lawrence%20Weschler_Gerri%20Davis.pdf");
    }
    else if (menuItem == "year a") {
	yearFunction('a');
    }
    if (menuItem == "year b") {
	yearFunction('b');
    }
    if (menuItem == "year c") {
	yearFunction('c');
    }
    if (menuItem == "year other") {
	yearFunction('other');
    }
    else {
	//alert(menuItem);
    }
    console.log(menuItem);
};

var yearFunction = function(year) {
    var s = "<div id='yearContainer' style='width:88%; text-align:center; background-color:gray;'>";
    if (year == 'a') {
	for (var i = 0; i < yearA.length; i++ ) {
	    var comma = yearA[i].indexOf(",");
	    var name = yearA[i].substring(0, comma);
	    var link = yearA[i].substring(comma+1);
	    s = s + "<a href='" + link + "'><img id='" + name.replace(/ /g, '') + "' style='width:100%;' src='static/files/Text/" + name + ".jpg' onmouseover='bold(this.id, this.src);' onmouseout='unbold(this.id, this.src);'></a>"
	}
    }
    else if (year == 'b') {
	for (var i = 0; i < yearB.length; i++ ) {
	    var comma = yearB[i].indexOf(",");
	    var name = yearB[i].substring(0, comma);
	    var link = yearB[i].substring(comma+1);
	    s = s + "<a href='" + link + "'><img id='" + name.replace(/ /g, '') + "' style='width:100%;' src='static/files/Text/" + name + ".jpg' onmouseover='bold(this.id, this.src);' onmouseout='unbold(this.id, this.src);'></a>"
	}
    }
    else if (year == 'c') {
	for (var i = 0; i < yearC.length; i++ ) {
	    var comma = yearC[i].indexOf(",");
	    var name = yearC[i].substring(0, comma);
	    var link = yearC[i].substring(comma+1);
	    s = s + "<a href='" + link + "'><img id='" + name.replace(/ /g, '') + "' style='width:100%;' src='static/files/Text/" + name + ".jpg' onmouseover='bold(this.id, this.src);' onmouseout='unbold(this.id, this.src);'></a>"
	}
    }
    else if (year == 'other') {
	for (var i = 0; i < yearOther.length; i++ ) {
	    var comma = yearOther[i].indexOf(",");
	    var name = yearOther[i].substring(0, comma);
	    var link = yearOther[i].substring(comma+1);
	    s = s + "<a href='" + link + "'><img id='" + name.replace(/ /g, '') + "' style='width:100%;' src='static/files/Text/" + name + ".jpg' onmouseover='bold(this.id, this.src);' onmouseout='unbold(this.id, this.src);'></a>"
	}
    }
    console.log(s);
    console.log("yearfunction");
    $('#container').hide();
    console.log(document.getElementById("imgLink").innerHTML);
    document.getElementById("imgLink").innerHTML = document.getElementById("imgLink").innerHTML + s + "<img id='Backbutton' src='static/files/Text/Back button.jpg' onmouseover='bold(this.id, this.src);' onmouseout='unbold(this.id, this.src);' onclick='$(&#34;#container&#34;).show(); console.log(&#34;back clicked&#34;);' width='20%'></div>";
    for (var i = 0 ; i < 10 ; i++ ) {
	console.log('break');
    }
    console.log(document.getElementById("imgLink").innerHTML);
};

var changeImg = function(src) {
    //better to reload image every time or only if necessary?
    if (src.replace("Text/BoldText", "Images/ImagesOfPaintings")!=document.getElementById("bigImg").src) {
	var href = src.substring(0, src.indexOf(".jpg"));
	href = href.substring(href.lastIndexOf("/")+1);
	document.getElementById("imgLink").setAttribute("href", "/image/"+href);
	document.getElementById("bigImg").setAttribute("style", "width:0%; height:0%");
	var imgLink = document.getElementById("imgLink").innerHTML;
	if ( imgLink.substring(0, 5) != "<img " ) {
	    imgLinkTwo = imgLink.substring(0, imgLink.indexOf("bigImg"));
	    imgLink = imgLink.substring(imgLinkTwo.lastIndexOf("<img"));
	    document.getElementById("imgLink").innerHTML = imgLink;
	}
	document.getElementById("smallImg").setAttribute("src", src.replace("Text/BoldText", "TextUnderImages"));
	$("#bigImg").attr("src", src.replace("Text/BoldText", "Images/ImagesOfPaintings")).load(function() {
	    resize();
	});
    }
    else {
	console.log("same image");
    }
};
var slideshow = function(num) {
    if (slideshowOn) {
	var painting = document.getElementsByClassName("title")[num]
	bold(painting.id, painting.src);
	changeImg(painting.src);
	slideshowTimer = setTimeout("unbold('" + painting.id + "', '" + painting.src + "')", 3000);
	if (num >= $(".title").length-1) {
	    slideshowNum = 0;
	    setTimeout("slideshow(0)", 3000);
	}
	else {
	    slideshowNum += 1;
	    setTimeout("slideshow(" + (num+1) + ")", 3000);
	}
    }
};
