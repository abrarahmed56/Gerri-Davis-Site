$(document).ready(function()
  {
      const _C = document.querySelector('.mobile-images-container'), 
	  N = _C.children.length;
      
      _C.style.setProperty('--n', N);

      let menuOpen = false;

      function unify(e) { return e.changedTouches ? e.changedTouches[0] : e };

      let x0 = null;
      let y0 = null;

      function lock(e) {
	  x0 = unify(e).clientX;
	  y0 = unify(e).clientY;
      };
      
      let i = 0;
      let j = 0;
      
      function move(e) {
	  if(!menuOpen && (x0 || x0 === 0)) {
	      let x1 = unify(e).clientX;
	      let y1 = unify(e).clientY;
	      let dx = x1 - x0, s = Math.sign(dx);
	      let dy = y1 - y0, sy = Math.sign(dy);
	      if (Math.abs(dy) < Math.abs(dx)) {
		  if((i > 0 || s < 0) && (i < N - 1 || s > 0)) {
		      _C.style.setProperty('--i', i -= s);
		      window.scrollTo(0, 0);
		      j = 0;
		  }
		  
		  x0 = null;
		  y0 = null;
	      }
	      else {
		  let el = $(".mobile-images-subcontainer")[i];
		  if ((j > 0 || sy < 0) && (j < el.children.length - 1 || sy > 0)) {
		      console.log("change detail");
		      console.log("i: " + i);
		      el.style.setProperty('--j', j -= sy);
		      console.log("j: " + j);
		  }
	      }
	  }

      };
      
      _C.addEventListener('mousedown', lock, false);
      _C.addEventListener('touchstart', lock, false);
      _C.addEventListener('mouseup', move, false);
      _C.addEventListener('touchend', move, false);
      
      $("#pageTitle").on("click", function() {
	      menuOpen = !menuOpen;
	      if (menuOpen) {
		  $(".mobile-images-container").hide();
		  $("body").css("overflow-y", "visible");
		  $(".extraInfo").hide();
	      }
	      else {
		  $(".mobile-images-container").show();
		  $("body").css("overflow-y", "hidden");
		  $(".extraInfo").show();
	      }
	  });
  });