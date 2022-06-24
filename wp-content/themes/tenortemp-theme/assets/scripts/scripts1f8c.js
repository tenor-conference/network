jQuery(document).foundation();
/*
These functions make sure WordPress
and Foundation play nice together.
*/
jQuery(document).ready(function(){// Remove empty P tags created by WP inside of Accordion and Orbit
jQuery('.accordion p:empty, .orbit p:empty').remove();// Adds Flex Video to YouTube and Vimeo Embeds
jQuery('iframe[src*="youtube.com"], iframe[src*="vimeo.com"]').each(function(){if(jQuery(this).innerWidth()/jQuery(this).innerHeight()>1.5){jQuery(this).wrap("<div class='widescreen responsive-embed'/>");}else{jQuery(this).wrap("<div class='responsive-embed'/>");}});});

/*
Insert Custom JS Below
*/

jQuery(document).on('click', '.sign-closer', function(e) {
//  jQuery(this).closest('.cont-redbutton').removeClass('active');
jQuery('.cont-redbutton').removeClass('active');
});

jQuery('.cont-redbutton').on({
    click: function () {
				jQuery('.cont-redbutton').removeClass('active');
        jQuery(this).addClass("active");
    }
});

jQuery('.minus.active').on({
  click: function () {
    jQuery('#map').css( "transition", "all 150ms ease-in-out" );
		if (lev == 'lev2' ) {
      jQuery('.minus').removeClass('active');
      jQuery('#map').css({ "width": "100%", "left": 0, "top": 0 });      
			lev = 'lev1';
		} else if (lev == 'lev3' ) {
				jQuery('.plus').addClass('active');
      
jQuery('#map').css({  "width": "150%","left": -130, "top": -250 });      
			lev = 'lev2';
		}
		
//		console.log(lev);
  }
});

jQuery('.plus.active').on({
  click: function () {
    jQuery('#map').css( "transition", "all 150ms ease-in-out" );
		if (lev == 'lev1' ) {
			jQuery('.minus').addClass('active');
//	    jQuery('#map').css({ "width": "150%", "left": -130, "top": -250 });
      jQuery('#map').css({  "width": "150%","left": -130, "top": -250, "transition": "all 150ms ease-in-out" });

			lev = 'lev2';
		} else if (lev == 'lev2' ) {
			jQuery('.plus').removeClass('active');
      jQuery('#map').css({  "width": "250%","left": -750, "top": -900});      
			lev = 'lev3';
		}
		
			console.log(lev);
  }
});

// dragging the mapamundi
var mydragg = function(){
  return {
    move: function(mapa, xpos, ypos) {
      mapa.style.left = xpos + 'px';
      mapa.style.top = ypos + 'px';
    },

    startMoving: function(mapa, mapbox, evt) {
      evt = evt || window.event;    // define mouse object

      jQuery('#map').css( "transition", "" );

      var dmapa = mapa.getBoundingClientRect();  // initial data from map
      var dcontainer = document.getElementById(mapbox).getBoundingClientRect();  //  initial data of container
      var mouseX0 = evt.clientX,   //  keep x/y initial mouse position
          mouseY0 = evt.clientY,

          mapaTop0 = dmapa.top,  // x/y initial from svg (mapa)
          mapaLeft0 = dmapa.left,
          mapaLeft = dmapa.left,
          mapaTop = dmapa.top,            
          TopC = dcontainer.top,   //  x/y of container (never change)
          LeftC = dcontainer.left,
          cWi = dcontainer.width,   // size from container and svg (never change)
          cHe = dcontainer.height,
          mWi = dmapa.width,  // data of mapa
          mHe = dmapa.height;
          
      document.getElementById(mapbox).style.cursor = 'move';

      document.onmousemove = function(evt) {
        evt = evt || window.event;

        var mouseX = evt.clientX,   // new mouse x/y as moving
            mouseY = evt.clientY,
            DX = mouseX - mouseX0,    // delta X from mouse
            DY = mouseY - mouseY0,
            windowWidth = window.innerWidth;
            aX = mapaLeft0 + DX,  // new position of map
            aY = mapaTop0 + DY;

        if (aX > LeftC) aX = LeftC;   
        if ((aX + mWi) < (LeftC + cWi)) aX = LeftC + cWi - mWi;

        if (aY > TopC) aY = TopC;
        if ((aY + mHe) < (TopC + cHe)) aY = TopC + cHe - mHe;
        
        mydragg.move(mapa, aX-LeftC, aY-TopC);
      }
    },
    
    stopMoving : function(mapbox){
        // var a = document.createElement('script');
        document.getElementById(mapbox).style.cursor='default';
        document.onmousemove = function(){}
    },

  }
}();
  