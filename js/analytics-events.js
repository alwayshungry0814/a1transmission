(function () {
  function clickLocation(link) {
    if (link.closest(".mobile-call-bar")) return "tap-to-call";
    if (link.closest("#footer")) return "footer";
    if (link.closest("#header")) return "header";
    if (link.closest("#hero, .service-hero")) return "hero";
    if (link.closest(".service-sidebar")) return "sidebar";
    if (link.closest("#contact")) return "contact";
    return "content";
  }

  function isDirectionsLink(href) {
    var value = href.toLowerCase();
    return (
      value.indexOf("google.com/maps") !== -1 ||
      value.indexOf("maps.google.") !== -1 ||
      value.indexOf("maps.app.goo.gl") !== -1 ||
      value.indexOf("goo.gl/maps") !== -1
    );
  }

  function eventName(href) {
    var value = href.toLowerCase();
    if (value.indexOf("tel:") === 0) return "phone_call_click";
    if (value.indexOf("sms:") === 0) return "sms_click";
    if (isDirectionsLink(value)) return "directions_click";
    return "";
  }

  document.addEventListener("click", function (event) {
    var target = event.target;
    if (!target || !target.closest) return;
    var link = target.closest("a");
    if (!link) return;

    var href = link.getAttribute("href") || "";
    var name = eventName(href);
    if (!name) return;

    var params = {
      link_url: link.href,
      page_location: window.location.href,
      click_location: clickLocation(link)
    };

    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params);
    } else {
      window.dataLayer.push(["event", name, params]);
    }
  });

  // Iframe clicks do not bubble. A Google Maps embed takes focus, which
  // blurs the window; activeElement is then that iframe. Fire once per page view.
  var mapInteractionSent = false;

  window.addEventListener("blur", function () {
    if (mapInteractionSent) return;
    window.setTimeout(function () {
      if (mapInteractionSent) return;
      var frames = document.getElementsByTagName("iframe");
      var i;
      for (i = 0; i < frames.length; i++) {
        if (document.activeElement !== frames[i]) continue;
        var src = (frames[i].getAttribute("src") || "").toLowerCase();
        if (
          src.indexOf("google.com/maps") === -1 &&
          src.indexOf("maps.google.") === -1
        ) {
          return;
        }
        mapInteractionSent = true;
        var mapParams = {
          link_url: frames[i].src || "",
          page_location: window.location.href,
          click_location: "map"
        };
        window.dataLayer = window.dataLayer || [];
        if (typeof window.gtag === "function") {
          window.gtag("event", "map_interaction", mapParams);
        } else {
          window.dataLayer.push(["event", "map_interaction", mapParams]);
        }
        return;
      }
    }, 0);
  });
})();
