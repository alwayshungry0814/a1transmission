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
})();
