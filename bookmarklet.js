if (jQuery) { // TBF
  var removeGridDisplayer = function() {  
    $("#grid-displayer-tools").remove();
    $("#grid-displayer").remove();
  };
  
  if ($("#grid-displayer").length) {
    removeGridDisplayer();
    
  } else {
    var gridHtml, gridToolsHtml;

    gridHtml = "<div id=\"grid-displayer\" class=\"container\"><div class=\"row\">";
    for(var i = 0; i < 12; i++) {
      gridHtml += "<div class=\"one columns\">&nbsp;</div>";
    }
    gridHtml += "</div></div>";
    
    gridToolsHtml  = "<div id=\"grid-displayer-tools\">";
    gridToolsHtml += "  <div>Foundation grid displayer</div>";
    gridToolsHtml += "  <div><label for=\"gdt-color\">Columns colour:</label> <input type=\"text\" id=\"gdt-color\" value=\"black\" /></div>";
    gridToolsHtml += "  <div><label for=\"gdt-opacity\">and opacity:</label> <input type=\"text\" id=\"gdt-opacity\" value=\"0.3\" /></div>";
    gridToolsHtml += "  <div><label for=\"gdt-index\">z-index:</label> <input type=\"text\" id=\"gdt-index\" value=\"0\" /></div>";
    gridToolsHtml += "  <div><label for=\"gdt-container\">With container:</label> <input type=\"checkbox\" id=\"gdt-container\" checked /></div>";
    gridToolsHtml += "  <div>update on blur</div>";
    gridToolsHtml += "  <div><a href=\"#\" id=\"gdt-close\">Close</a></div>";
    gridToolsHtml += "</div>";
    
    $("head").append("<link rel='stylesheet' type='text/css' href='file:///C:/Documents%20and%20Settings/Antu/Mes%20documents/Dropbox/Con%20Vero/foundation-grid-displayer/bookmarklet-style.css'>");
    $("body").prepend(gridHtml).prepend(gridToolsHtml);  
    $("#grid-displayer-tools").delay(1200).fadeTo("slow",0.1);
    
    $("#grid-displayer-tools #gdt-color").change(function() {
      $("#grid-displayer .one").css("background-color", $(this).val());
    });
    
    $("#grid-displayer-tools #gdt-opacity").change(function() {
      $("#grid-displayer .one").css("opacity", $(this).val());
    });
    
    $("#grid-displayer-tools #gdt-index").change(function() {
      $("#grid-displayer").css("z-index", $(this).val());
    });
    
    $("#grid-displayer-tools #gdt-container").change(function() {
    
      $("#grid-displayer").toggleClass("container");
      /*if ($(this).is(":checked")) {
      } else {
      }*/
    });
    
    $("#grid-displayer-tools #gdt-close").click(function() {
      alert("Click the bookmarklet to re-open");      
      removeGridDisplayer();
    });
  }
  
} else {
  alert("Sorry, jQuery has to be installed on this site first.");
} 