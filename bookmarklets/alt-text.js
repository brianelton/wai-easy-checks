document.querySelectorAll("#wai-styles,#wai-info-box,.image-span").forEach(el => {
  el.remove();  
});

document.querySelector("body").insertAdjacentHTML("afterbegin","<style id='wai-styles'>.image-span,#failure,#success {color:black;font-weight:bold;font-size:small;font-family:Noto Sans,Trebuchet MS,Helvetica Neue,Arial,sans-serif;background-color:#eed009;margin:0 2px;padding:2px;speak:literal-punctuation}#success{position:absolute;width:0;height:0;clip:rect(0,0,0,0);}#wai-info-box{z-index:1000;color:black;font-family:Noto Sans,Trebuchet MS,Helvetica Neue,Arial,sans-serif;border:solid 1px #ddd;background-color:#fff;box-shadow:0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);}#wai-info-box header{font-weight:700;background-color:#f2f2f2;color:#005a6a;padding:8px 16px;}#wai-info-box header a{float:right;text-decoration:none}#wai-info-box div{padding:8px 16px;}.wai-more-info{position:fixed;bottom:5em;right:5em}.wai-good{outline:5px solid #005A6A;padding:2px}.wai-bad{outline:5px solid #c0272d;padding:2px}.wai-note{outline:2px dashed #eed009}</style>");
document.querySelectorAll("img, [role=img]").forEach(function(el) {
  var message = "";
  if (el.hasAttribute('role')) {
    message += "Role=\"" + el.getAttribute('role') + "\"<br>";
  }
  if (el.hasAttribute('aria-label')) {
    message += "❓aria-label=\"" + el.getAttribute('aria-label') + "\"<br>";
  }
  if (el.hasAttribute('aria-describedby')) {
    message += "Described by ID(s)=";
    var describedbyValue = el.getAttribute('aria-describedby');
    var describedbyArray = describedbyValue.split(' ');
    for (i = 0; i < describedbyArray.length; i++) {
      var describedby = document.querySelector('[id="' + describedbyArray[i] + '"]');
      message+= "<a href=\"#" + describedbyArray[i] + "\">" + describedbyArray[i] + "</a>";
      if(i < describedbyArray.length - 1 ) {
        message += ", ";
      }
      if(describedby) {
        describedby.classList.add("wai-note");
        describedby.insertAdjacentHTML("afterbegin", "<span class=\"image-span\">id=\"" + describedbyArray[i] + "\"</span>");
      }
    }
  }
  if (el.hasAttribute('aria-labelledby')) {
    message += "Labelled by ID(s)=";
    var labelledbyValue = el.getAttribute('aria-labelledby');
    var labelledbyArray = labelledbyValue.split(' ');
    for (i = 0; i < labelledbyArray.length; i++) {
      var labelledby = document.querySelector('[id="' + labelledbyArray[i] + '"]');
      message+= "<a href=\"#" + labelledbyArray[i] + "\">" + labelledbyArray[i] + "</a>";
      if(i < labelledbyArray.length - 1 ) {
        message += ", ";
      }
      if(labelledby) {
        labelledby.classList.add("wai-note");
        labelledby.insertAdjacentHTML("afterbegin", "<span class=\"image-span\">id=\"" + labelledbyArray[i] + "\"</span>");
      }
    }
  }
  
  el.classList.add('wai-good');
  if (!el.hasAttribute('alt')) {
    if (el.parentNode.nodeName == "A") {
      if (!el.hasAttribute('aria-label')) {
        if (!el.hasAttribute('aria-labelledby')) {
          if (!el.hasAttribute('aria-describedby')) {
            if (!el.hasAttribute('title')) {
              el.classList.replace('wai-good','wai-bad');
              message += "<span style=\"border-bottom:2px solid #003366;\">❌ Link image missing alt text</span>";
            }
          }
        }
      }
    } else if (!el.hasAttribute('aria-label')) {
      if (!el.hasAttribute('aria-labelledby')) {
        if (!el.hasAttribute('aria-describedby')) {
          if (!el.hasAttribute('title')) {
            el.classList.replace('wai-good','wai-bad');
            message += "❌ Image missing alt text";
          }
        }
      }
    }
  } else {
    if (el.parentNode.nodeName == "A") {
      if (el.getAttribute('alt') == "") {
        message += "<span style=\"border-bottom:2px solid #003366;\">❓Empty link alt text. Ok?</span>";
      } else {
        message += "<span style=\"border-bottom:2px solid #003366;\">✓ Link alt text=\"" + el.getAttribute('alt') + "\". Suitable?</span>";
      }
    } else {
      message += "✓ Alt text=\"" + el.getAttribute('alt') + "\". Suitable?";
    }
  }
  if (el.hasAttribute('title')) {
    message += "❓Image has title=\"" + el.getAttribute('title') + "\"";
  }
  if (el.hasAttribute('longdesc')) {
    message += "❓Image linked to a long description=\"" + el.getAttribute('longdesc') + "\"";
  }

  if(message) {
    el.insertAdjacentHTML("afterend", "<span class=\"image-span\">" + message + "</span>");
  }
});

if (!document.querySelectorAll('img, [role=img]').length) {
  document.querySelector('body').insertAdjacentHTML('afterbegin','<strong id="failure" role="alert">No Images Found on Page: ' + document.title + '</strong>');
  setTimeout(function() {
    document.querySelector('#failure').remove();
  }, 6000);
} else {
  document.querySelector('body').insertAdjacentHTML('beforeend', '<div id="success" role="alert">Success! Images Found on Page: ' + document.title + '</div>');
  setTimeout(function() {
    document.querySelector('#success').remove();
  }, 3000);
}

document.querySelector('body').insertAdjacentHTML('beforeend', '<aside id="wai-info-box" class="wai-more-info"><header>Find out more<a href=javascript:document.querySelectorAll("#wai-styles,#wai-info-box,.image-span").forEach(function(el){el.remove()}); aria-label=dismiss>X</a></header><div><a href="https://w3.org/wai/easy-checks/image-alt/">Checking Image Alternative Text</a></div></aside>');