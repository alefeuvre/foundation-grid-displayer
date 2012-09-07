if (typeof jQuery === "undefined") {
  alert("Sorry, jQuery and Foundation have to be installed on this site first.");
  
} else {
  // Close grid displayer
  var removeGridDisplayer = function() {  
    $("#grid-displayer-tools").remove();
    $("#grid-displayer").remove();
  };
  
  // Setters
  var setGridColor = function(gridColor) {  
    $("#grid-displayer .one:even").css("background-color", gridColor); // 0-based indexing means that, counter-intuitively, :odd selects the 2th element, 4th element, ...
    setBorderStyle();
  },
  setGridOpacity = function(gridOpacity) {  
    $("#grid-displayer .one").css("opacity", gridOpacity);
    setBorderStyle();
  },
  setGridZindex = function(gridZindex) {  
    $("#grid-displayer").css("z-index", gridZindex);
  },
  setBorderStyle = function() { // I wish border-opacity existed  
    var currentOpacity = $("#grid-displayer .one").css("opacity"),
        rgbaColor = $("#grid-displayer .one:even").css("background-color").replace('rgb', 'rgba').replace(')',', ' + currentOpacity + ')');
    $("#grid-displayer .row").css("border-right", "2px solid " + rgbaColor);
  };
  
  // Removes grid displayer when the bookmarklet is clicked for a second time
  if ($("#grid-displayer").length) {
    removeGridDisplayer();
    
  } else {
    var gridHtml, gridToolsHtml,
      dataGridColor   = $("body").data("grid-color"),
      gdtColor        = (typeof dataGridColor === "undefined") ? "black" : dataGridColor,
      dataGridOpacity = $("body").data("grid-opacity"),
      gdtOpacity      = (typeof dataGridOpacity === "undefined") ? "0.3" : dataGridOpacity,
      dataGridZindex  = $("body").data("grid-zindex"),
      gdtZindex       = (typeof dataGridZindex === "undefined") ? "0" : dataGridZindex;
    
    // Grid and toolbar HTML
    gridHtml  = "<div id=\"grid-displayer\"><div class=\"row\">";
    for(var i = 0; i < 12; i++) {
      gridHtml += "<div class=\"one columns\">&nbsp;</div>";
    }
    gridHtml += "</div></div>";
    
    gridToolsHtml  = "<div id=\"grid-displayer-tools\">";
    gridToolsHtml += "  <div>Foundation grid displayer</div>";
    gridToolsHtml += "  <div><label for=\"gdt-color\">Columns colour</label> <input type=\"text\" id=\"gdt-color\" value=\"" + gdtColor + "\" /></div>";
    gridToolsHtml += "  <div><label for=\"gdt-opacity\">Opacity</label> <input type=\"text\" id=\"gdt-opacity\" value=\"" + gdtOpacity + "\" /></div>";
    gridToolsHtml += "  <div><label for=\"gdt-zindex\">z-index</label> <input type=\"text\" id=\"gdt-zindex\" value=\"" + gdtZindex + "\" /></div>";
    gridToolsHtml += "  <div>update on blur</div>";
    gridToolsHtml += "  <div><a href=\"#\" id=\"gdt-close\">Close</a></div>";
    gridToolsHtml += "</div>";
    
    // Init - http://alefeuvre.github.com/foundation-grid-displayer/stylesheets/
    $("head").append("<link rel='stylesheet' type='text/css' href='http://s311709191.onlinehome.fr/perso/bookmarklet-style-3.css'>");
    $("body").prepend(gridHtml).prepend(gridToolsHtml);  
    $("#grid-displayer-tools").delay(1200).fadeTo("slow",0.1);  
        
    // Custom default parameters
    if (typeof dataGridColor !== "undefined") {
      setGridColor(gdtColor);
    }
    if (typeof dataGridOpacity !== "undefined") {
      setGridOpacity(gdtOpacity);
    }
    if (typeof dataGridZindex !== "undefined") {
      setGridZindex(gdtZindex);
    }   
    
    // Updates
    $("#grid-displayer-tools #gdt-color").change(function() {
      setGridColor($(this).val());
    });    
    $("#grid-displayer-tools #gdt-opacity").change(function() {
      setGridOpacity($(this).val());
    });    
    $("#grid-displayer-tools #gdt-zindex").change(function() {
      setGridZindex($(this).val());
    });    
    
    $("#grid-displayer-tools #gdt-close").click(function() {
      removeGridDisplayer();
    });
  } 
}