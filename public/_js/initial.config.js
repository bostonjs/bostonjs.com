/*
	this file:
		* determines whether a browser is qualified for enhancements at all, and if so,
		* finds available CSS and JS assets that may be loaded
		* check the template via meta[name='template']
		* test features and device conditions and environment to determine which files to load
		* load files as needed
*/
(function( win, undefined ){
	"use strict";

	// Are we allowing web fonts?
	var allowType = true;

	// test for font-face version to load via Data URI'd CSS
	var fontSrcRef = null, ua;

	if ( allowType ) {
		fontSrcRef = win.document.getElementById( "fontsProximaWOFF" );
	}


	var initialJS = win.document.getElementById( "initialjs" ),
		docClasses = [ "enhancing enhanced" ],
		grunticonPath = win.document.getElementsByName( "grunticon" )[ 0 ],
		iconsDataSVG = "icons.data.svg.css",
		iconsDataPNG = "icons.data.png.css",
		iconsPNG = "icons.fallback.css";

	// simple load CSS function
	function loadCSS( href ){
		if( initialJS && initialJS.parentNode ) {
			var link = win.document.createElement( "link" );
			link.rel = "stylesheet";
			link.href= href;
			initialJS.parentNode.insertBefore( link, initialJS );
		} else {
			win.setTimeout(function() {
				loadCSS( href );
			}, 15);
		}
	}

	if( fontSrcRef ) {
		// if fontSrcRef defined, grab its content attr for the font url
		loadCSS( fontSrcRef.content );
	}


	// simple load JS function
	function loadJS( src ){
		if( initialJS && initialJS.parentNode ) {
			var script = win.document.createElement( "script" );
			script.src= src;
			initialJS.parentNode.insertBefore( script, initialJS );
		} else {
			win.setTimeout(function() {
				loadJS( src );
			}, 15);
		}
	}

	// modified grunticon loader -
	// use yepnope's loader to fetch our backgrounds and icons css
	function grunticon( css ){

		var svg = !!win.document.createElementNS && !!win.document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect && !!win.document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1") && !(win.opera && win.navigator.userAgent.indexOf('Chrome') === -1),
			load = function( data ){
				loadCSS( css[ data && svg ? 0 : data ? 1 : 2 ] );
			},

			// Thanks Modernizr
			img = new win.Image();

		img.onerror = function(){
			load( false );
		};

		img.onload = function(){
			load( img.width === 1 && img.height === 1 );
		};

		img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
	}


	// NOTE: Load grunticon icons without any broad qualification

	// get Grunticon icon paths, if defined
	if( grunticonPath && grunticonPath.content){
		var path = grunticonPath.content;

		// load 'em
		grunticon([ path + iconsDataSVG, path + iconsDataPNG, path + iconsPNG ]);
	}


	// Broad qualification starts here.


	// Add your qualifications for major browser experience divisions here.
	// For example, you might choose to only enhance browsers that support document.querySelector (IE8+, etc).
	// Use case will vary, but basic browsers: last stop here!
	if( !( "querySelector" in win.document ) ){
		return;
	}

	// Add scoping classes to HTML element
	win.document.documentElement.className += " " + docClasses.join(" ");

	// Get scripts to load, if defined
	if( initialJS ){
		var enhancedScripting = initialJS.getAttribute( "data-fulljs" );
		// Load JS files

		if( enhancedScripting ){
			loadJS( enhancedScripting );
		}
	}

}( this ));
