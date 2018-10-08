var previousPaintingEl;
var previousPaintingElDetail;
var previousMenuEl;
var previousRandomImage;
var timeStart = Date.now();
var numRandomImages;
var slideshowOn = true;

var paintingBold = function(el) {
    if (previousPaintingEl) {
	unbold(previousPaintingEl);
    }
    if (previousPaintingElDetail) {
	unbold(previousPaintingElDetail);
    }
    el.children().eq(0).attr("class", "bold-writing");
    previousPaintingEl = el;
};

var paintingDetailBold = function(el) {
    if (previousPaintingEl) {
	unbold(previousPaintingEl);
    }
    if (previousPaintingElDetail) {
	unbold(previousPaintingElDetail);
    }
    let parentName = el.parent().attr("data-parent");
    el.children().eq(0).attr("class", "bold-writing");
    console.log(el);
    console.log(el.parent());
    console.log("parent name: " + parentName);
    previousPaintingEl = $(parentName);
    previousPaintingEl.children().eq(0).attr("class", "bold-writing");
    previousPaintingElDetail = el;
};

var menuItemBold = function(el) {
    el.attr("class", "bold-writing");
};

var unbold = function(el) {
    el.children().eq(0).attr("class", "font-weight-normal");
};

var openMenuSubitem = function(el) {
    $("#" + el.text().replace(/ /g, "_")).show();
};

var showRandomImage = function() {
    if (previousPaintingEl) {
	$("#" + previousPaintingEl.attr("data-painting-number")).hide()
    }
    if (previousPaintingElDetail) {
	$("#" + previousPaintingElDetail.attr("data-painting-number")).hide()
    }
    if (previousRandomImage) {
	previousRandomImage.hide();
    }
    previousRandomImage = $($(".random-subcontainer")[Math.floor(Math.random()*numRandomImages)]);
    previousRandomImage.show();
};

var changeImageMain = function(el) {
    console.log("calling change image main");
    $("#menu").hide();
    //_C.style.setProperty('--i', el.attr("data-painting-number"));
    if (previousPaintingEl) {
	$("#" + previousPaintingEl.attr("data-painting-number")).hide();
    }
    if (previousPaintingElDetail) {
	$("#" + previousPaintingElDetail.attr("data-painting-number")).hide()
    }
    if (previousRandomImage) {
	previousRandomImage.hide();
    }
    $("#" + el.attr("data-painting-number")).show();
    paintingBold(el);
};

var changeImageSlideshow = function(el) {
    //_C.style.setProperty('--i', el.attr("data-painting-number"));
    if (previousPaintingEl) {
	$("#" + previousPaintingEl.attr("data-painting-number")).hide()
    }
    $("#" + el.attr("data-painting-number")).show();
    paintingBold(el);
};

var changeImageToDetail = function(el) {
    $("#menu").hide();
    //_C.style.setProperty('--i', el.attr("data-painting-number"));
    if (previousPaintingEl) {
	$("#" + previousPaintingEl.attr("data-painting-number")).hide();
    }
    if (previousPaintingElDetail) {
	$("#" + previousPaintingElDetail.attr("data-painting-number")).hide()
    }
    if (previousRandomImage) {
	previousRandomImage.hide();
    }
    
    $("#" + el.attr("data-painting-number")).show();
    paintingDetailBold(el);
};

var slideshow = function() {
    /*if (slideshowOn) {
	var num = (parseInt(previousPaintingEl.attr("data-painting-number")) + 1) % $(".painting-name").length;
	console.log(parseInt(previousPaintingEl.attr("data-painting-number")));
	changeImageMain($(".painting-list-group-item").eq(num));
	setTimeout("slideshow()", 3000);
	}*/   
};

$(document).ready(function()
  {
      $("#menu").hide();
      $('.scroll-pane').jScrollPane();

      const _C = document.querySelector('.paintings-container'), 
	  N = _C.children.length;
      
      _C.style.setProperty('--n', N);

      $(".header").on("mouseover", function() {
	      slideshowOn = false;
	      showRandomImage();
	      $("#menu").show();
	      paintingBold($(this));
	  });
      $(".menu-item").on("click", function() {
	      openMenuSubitem($(this));
	      });
      $(".painting-list-group-item").on("mouseover", function() {
	      slideshowOn = false;
	      changeImageMain($(this));
	  });
      $(".painting-list-group-item-detail").on("mouseover", function() {
	      changeImageToDetail($(this));
	  });
      $(".details-group").on("hidden.bs.collapse", function() {
	      var api = $('.scroll-pane').data('jsp');
	      api.reinitialise();
	  });
      $(".details-group").on("shown.bs.collapse", function() {
	      var api = $('.scroll-pane').data('jsp');
	      api.reinitialise();
	  });
      $(".paintings-subcontainer").hide();
      $(".random-subcontainer").hide();
      numRandomImages = $(".random-subcontainer").length;
      //previousPaintingEl = $(".painting-list-group-item").eq(0);
      changeImageMain($(".painting-list-group-item").eq(0));
      slideshow();
      console.log("DOM ready in " + (Date.now() - timeStart) + " ms");

  });

$(window).on("load", function() {
	console.log("Entire page loaded in " + (Date.now() - timeStart) + " ms");
    });