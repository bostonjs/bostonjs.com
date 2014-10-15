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
  var fontSrcRef;

  if ( allowType ) {
    fontSrcRef = win.document.getElementsByName( "fonts" )[ 0 ];
  }

  var initialJS = win.document.getElementById( "initialjs" ),
    docClasses = [ "enhancing enhanced" ];

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
