(function() {
  var startBookmarklet = function($) {      
    
    // Set bookmarklet framework
    var scriptSrc  = $("script[src*='gd-bookmarklet.min.js']").attr("src"),
    bmletFramework = scriptSrc.substr(scriptSrc.length - 1, 1);
    if (bmletFramework != "b" && bmletFramework != "f") {
      bmletFramework = "both";
    }

    // Close grid displayer
    var removeGridDisplayer = function() {
      $("#grid-displayer-tools").remove();
      $("#grid-displayer").remove();
    },      

    // Build grid displayer
    gdIsBuilt = false,
    buildGridDisplayer = function(gridFramework) {

      var $gdContainer = $("#grid-displayer .gd-container"),
      $gdRow           = $("#grid-displayer .gd-row"),
      $gdTools         = $("#grid-displayer-tools"),
      colsHtml         = "",
      gridNbcols       = parseInt($gdTools.find("#gdt-nbcols").val());

      if (gdIsBuilt) {
        $gdContainer.removeClass().addClass("gd-container");
        $gdRow.removeClass().addClass("gd-row").css("border-right", 0).empty();
        $gdTools.find(".framework-specific").hide();
      }

      for(var i = 0; i < gridNbcols; i++) {
        colsHtml += "<div class=\"gd-column\">&nbsp;</div>";
      }
      $gdRow.append(colsHtml);
      var $gdColumn = $gdRow.find(".gd-column"),
      gutterless = false,
      isBootstrap = false;

      switch(gridFramework) {

        case 'b3':
          $gdContainer.addClass("container");
          $gdRow.addClass("row");
          $gdColumn.addClass("col-xs-1"); // Mobile first, stupid!
          gutterless = true,
          isBootstrap = true;
        break;

        case 'b3f':
          $gdContainer.addClass("container-fluid");
          $gdRow.addClass("row");
          $gdColumn.addClass("col-xs-1");
          gutterless = true,
          isBootstrap = true;
        break;

        case 'bo':
          $gdContainer.addClass("container");
          $gdRow.addClass("row");
          $gdColumn.addClass("span1");
          isBootstrap = true;
        break;

        case 'bf':
          $gdContainer.addClass("container-fluid");
          $gdRow.addClass("row-fluid");
          $gdColumn.addClass("span1");
          isBootstrap = true;
        break;

        case 'f4':
          $gdContainer.addClass("container");
          $gdRow.addClass("row");
          $gdColumn.addClass("small-1 columns"); // Mobile first, stupid!
          gutterless = true;
        break;

        case 'f3':
          $gdContainer.addClass("container");
          $gdRow.addClass("row");
          $gdColumn.addClass("one columns");
          gutterless = true;
        break;

        case 'f2':
          $gdContainer.addClass("container");
          $gdRow.addClass("row");
          $gdColumn.addClass("one columns");
        break;
      }

      if (gutterless) {
        $gdTools.find(".gutterless").css("display", "inline-block");
        setGridGutters($gdTools.find("#gdt-gutterwidth").val());
      } else {
        $gdColumn.css({"border": "0"}); // Border reset, might not needed
      }

      if (isBootstrap) {
        $gdTools.find(".twb").css("display", "inline-block");
      }

      setGridColor($gdTools.find("#gdt-color").val(), gutterless);
      setGridOpacity($gdTools.find("#gdt-opacity").val());

      if (!gdIsBuilt) {
        $gdTools.find("#gdt-options").css("display", "block"); // as the CSS is loaded after the JS, show() is overwritten by display: none
        $gdTools.find("#gdt-ok").css("display", "block");
        setGridZindex($gdTools.find("#gdt-zindex").val());
        $("#grid-displayer").show();
        gdIsBuilt = true;
      }
    },

    // Setters
    setGridColor = function(gridColor, gutterless) {
      $("#grid-displayer .gd-column").css("background-color", gridColor);
      if (gutterless) {
        $("#grid-displayer .gd-column").css("outline", "1px solid " + gridColor);
      }
    },
    setGridOpacity = function(gridOpacity) {
      $("#grid-displayer .gd-column").css("opacity", gridOpacity);
    },
    setGridGutters = function(gridGutterwidth) {
      var borderWidth = parseInt(gridGutterwidth.replace( /^\D+/g, '')) / 2,
      unit = gridGutterwidth.substr(gridGutterwidth.length - 2, 2);
      $("#grid-displayer .gd-column").css({"border-width": "0 " + borderWidth + unit, "border-style": "solid", "border-color": "#FFF", "padding": 0}); // Remove padding for small 12 column view - fluid display forces padded columns down
    },
    setGridZindex = function(gridZindex) {
      $("#grid-displayer").css("z-index", gridZindex);
    };

    if ($("#grid-displayer").length) { // Close grid displayer when the bookmarklet is clicked for a second time
      removeGridDisplayer();
    } else {

      // Default parameters
      var dataGridFramework = $("body").data("grid-framework"),
      dataGridNbcols        = $("body").data("grid-nbcols"),
      dataGridGutterwidth   = $("body").data("grid-gutterwidth"),
      dataGridColor         = $("body").data("grid-color"),
      dataGridOpacity       = $("body").data("grid-opacity"),
      dataGridZindex        = $("body").data("grid-zindex"),

      gdFramework           = (typeof dataGridFramework === "undefined") ?   "" : dataGridFramework,
      gdNbcols              = (typeof dataGridNbcols === "undefined") ?      "12" : dataGridNbcols,
      gdGutterwidth         = (typeof dataGridGutterwidth === "undefined") ? "30px" : dataGridGutterwidth,
      gdColor               = (typeof dataGridColor === "undefined") ?       "black" : dataGridColor,
      gdOpacity             = (typeof dataGridOpacity === "undefined") ?     "0.3" : dataGridOpacity,
      gdZindex              = (typeof dataGridZindex === "undefined") ?      "999" : dataGridZindex;

      // Frameworks list      
      bootstraps  = [["b3", "Bootstrap 3"],
                     ["b3f", "Bootstrap 3 (fluid)"],
                     ["bo", "Bootstrap 2"],
                     ["bf", "Bootstrap 2 (fluid)"]],
      foundations = [["f4", "Foundation 4 & 5"],
                     ["f3", "Foundation 3"],
                     ["f2", "Foundation 2"]];
      switch(bmletFramework) {               
        case "b":
          frameworks = bootstraps;           
          if (gdFramework == "") {
            gdFramework = "b3";
          }
        break;
        
        case "f":
          frameworks = foundations;           
          if (gdFramework == "") {
            gdFramework = "f4";
          }
        break;
        
        case "both":
          frameworks = bootstraps.concat(foundations);
        break;
      }
      
      // HTML
      var gridHtml = "<div id=\"grid-displayer\" style=\"display: none;\"><div class=\"gd-container\"><div class=\"gd-row\"></div></div></div>",
      gridToolsHtml = "<div id=\"grid-displayer-tools\">"
                    + "  <div class=\"gdt-field\"><select id=\"gdt-framework\">"
                    + "    <option>&darr; Choose your framework</option>"; 
      $.each(frameworks, function(index, value) {
        gridToolsHtml += "<option value=\"" + value[0] + "\"";
        gridToolsHtml += (value[0] == gdFramework) ? " selected" : "";
        gridToolsHtml += ">" + value[1] + "</option>";
      });
      gridToolsHtml += "    <option value=\"tired\">I'm tired of choosing my framework</option>"
                    + "  </select></div>"
                    + "  <div id=\"gdt-options\" class=\"gdt-field\">"
                    + "    <div><label for=\"gdt-color\">Columns colour</label><input type=\"text\" id=\"gdt-color\" value=\"" + gdColor + "\" /></div>"
                    +     "<div><label for=\"gdt-opacity\">Opacity</label><input type=\"text\" id=\"gdt-opacity\" value=\"" + gdOpacity + "\" /></div>"
                    +     "<div class=\"framework-specific gutterless\"><label for=\"gdt-gutterwidth\">Gutter width</label><input type=\"text\" id=\"gdt-gutterwidth\" value=\"" + gdGutterwidth + "\" /></div>"
                    +     "<div class=\"framework-specific twb\"><label for=\"gdt-nbcols\">Nb cols</label><input type=\"text\" id=\"gdt-nbcols\" value=\"" + gdNbcols + "\" /></div>"
                    +     "<div><label for=\"gdt-zindex\">z-index</label><input type=\"text\" id=\"gdt-zindex\" value=\"" + gdZindex + "\" /></div>"
                    + "  </div>"
                    + "  <div class=\"gdt-button\" id=\"gdt-ok\"><a href=\"javascript:;\">OK</a></div>"
                    + "  <div class=\"gdt-button\"><a href=\"#null\" id=\"gdt-close\">Close</a></div>"
                    + "</div>";

      $("head").append("<link rel='stylesheet' type='text/css' href='//alefeuvre.github.com/foundation-grid-displayer/stylesheets/gd-bookmarklet.min.css'>");
      $("body").prepend(gridHtml).prepend(gridToolsHtml);
      $("#grid-displayer-tools").delay(1200).fadeTo("slow",0.1);

      if (gdFramework != "") {
        buildGridDisplayer(gdFramework);
      }

      // Actions
      $("#grid-displayer-tools #gdt-framework").change(function() {
        if ($(this).val() == "tired") {
          window.open("http://snipt.net/jiraisurfer/custom-parameters-for-foundation-grid-displayer/");
        } else {
          gdFramework = $(this).val();
          gdIsGutterless = (gdFramework == "b3" || gdFramework == "b3f" || gdFramework == "f4" || gdFramework == "f3") ? true : false;
          if (gdFramework == "f4" || gdFramework == "f3" || gdFramework == "f2") { // Reset to 12 cols when switching from Bootstrap to Foundation, in case nb cols has been changed
            $("#grid-displayer-tools #gdt-nbcols").val(12);
          }
          buildGridDisplayer(gdFramework);
        }
      });
      $("#grid-displayer-tools #gdt-nbcols").change(function() {
        buildGridDisplayer(gdFramework);
      });
      $("#grid-displayer-tools #gdt-color").change(function() {
        setGridColor($(this).val(), gdIsGutterless);
      });
      $("#grid-displayer-tools #gdt-opacity").change(function() {
        setGridOpacity($(this).val());
      });
      $("#grid-displayer-tools #gdt-gutterwidth").change(function() {
        setGridGutters($(this).val());
      });
      $("#grid-displayer-tools #gdt-zindex").change(function() {
        setGridZindex($(this).val());
      });

      $("#grid-displayer-tools #gdt-close").click(function() {
        removeGridDisplayer();
      });
    }
  };

  // Load jQuery from CDN if needed
  if (!window.jQuery) {
    var head = document.getElementsByTagName("head")[0],
        jQueryScript = document.createElement("script");
    jQueryScript.type = "text/javascript";
    jQueryScript.src  = "//code.jquery.com/jquery-1.10.0.min.js";
    jQueryScript.onload = function() { startBookmarklet(window.jQuery); };
    head.appendChild(jQueryScript);
  } else {
    startBookmarklet(window.jQuery);
  }

  /**
   * Google Analytics JS v1
   * http://code.google.com/p/google-analytics-js/
   * Copyright (c) 2009 Remy Sharp remysharp.com / MIT License
   * $Date: 2009-02-25 14:25:01 +0000 (Wed, 25 Feb 2009) $
   */
  (function(urchinCode, domain, url) {

    function rand(min, max) {
        return min + Math.floor(Math.random() * (max - min));
    }

    var i=1000000000,
        utmn=rand(i,9999999999), //random request number
        cookie=rand(10000000,99999999), //random cookie number
        random=rand(i,2147483647), //number under 2147483647
        today=(new Date()).getTime(),
        win = window.location,
        img = new Image(),
        urchinUrl = 'http://www.google-analytics.com/__utm.gif?utmwv=1.3&utmn='
            +utmn+'&utmsr=-&utmsc=-&utmul=-&utmje=0&utmfl=-&utmdt=-&utmhn='
            +domain+'&utmr='+win+'&utmp='
            +url+'&utmac='
            +urchinCode+'&utmcc=__utma%3D'
            +cookie+'.'+random+'.'+today+'.'+today+'.'
            +today+'.2%3B%2B__utmb%3D'
            +cookie+'%3B%2B__utmc%3D'
            +cookie+'%3B%2B__utmz%3D'
            +cookie+'.'+today
            +'.2.2.utmccn%3D(referral)%7Cutmcsr%3D' + win.host + '%7Cutmcct%3D' + win.pathname + '%7Cutmcmd%3Dreferral%3B%2B__utmv%3D'
            +cookie+'.-%3B';

    // trigger the tracking
    img.src = urchinUrl;
  })("UA-30567117-1","alefeuvre.github.io","gd-bookmarklet.js");
})();
