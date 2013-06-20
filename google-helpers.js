
var markersmap = [];
var windows = [];
var sidebar_htmlmap = '';
var marker_htmlmap = [];

var to_htmlsmap = [];
var from_htmlsmap = [];
var mapmap = null;

function createMarker(map, point, title, html, icon, icon_shadow, sidebar_id, openers) {
    var marker_options = {
        position: point,
        map: map,
        title: title
    };
    if (icon != '') {
        marker_options.icon =  icon;
    }

    if (icon_shadow != '') {
        marker_options.icon_shadow = icon_shadow;
    }
    //create marker
    var new_marker = new google.maps.Marker(marker_options);
    markersmap.push(new_marker);
    if (html != '') {

        var infowindow = new google.maps.InfoWindow({
            content: '<div class="overflow-content">' + html + '</div>'
        });

        // push all the infowindow
        windows.push(infowindow);

        google.maps.event.addListener(new_marker, 'click', function () {

            // Close all the infowindow
            for(var i in windows) {
                windows[i].close();
            }

            // center to the marker
            map.panTo(new_marker.getPosition());

            // open the new window
            infowindow.open(map, new_marker);
        });
        if (openers != '' && !isEmpty(openers)) {
            for (var i in openers) {
                var opener = document.getElementById(openers[i]);
                opener.onclick = function () {
                    infowindow.open(map, new_marker);
                    return false
                };
            }
        }

        if (sidebar_id != '') {
            var sidebar = document.getElementById(sidebar_id);
            if (sidebar != null && sidebar != undefined && title != null && title != '') {
                var newlink = document.createElement('a');

                newlink.onclick = function () {
                    infowindow.open(map, this);
                    return false
                };

                newlink.innerHTML = title;
                sidebar.appendChild(newlink);
            }
        }
    }
    return new_marker;
}

function isArray(a) {
    return isObject(a) && a.constructor == Array;
}

function isObject(a) {
    return (a && typeof a == 'object') || isFunction(a);
}

function isFunction(a) {
    return typeof a == 'function';
}

function isEmpty(obj) {
    for (var i in obj) {
        return false;
    }
    return true;
}

function onLoadmap() {
var mapObjmap = document.getElementById("map");
if (mapObjmap != 'undefined' && mapObjmap != null) {
        
    var mapOptionsmap = {
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DEFAULT}
    };

        mapOptionsmap.center = new google.maps.LatLng(
            -14.235004,
            -51.925280
        );

    mapmap = new google.maps.Map(mapObjmap,mapOptionsmap);

}