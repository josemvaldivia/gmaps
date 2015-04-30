var map;
      function initialize() {
          var myLatlng = new google.maps.LatLng(-16.393298, -71.535254);
          var mapOptions = {zoom: 15,
                            center: myLatlng,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
          }

          map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
          var southWest = new google.maps.LatLng(-16.397509, -71.544802);
          var northEast = new google.maps.LatLng(-16.390704, -71.528967);
          var bounds = new google.maps.LatLngBounds(southWest,northEast);
          map.fitBounds(bounds);
          var lngSpan = northEast.lng() - southWest.lng();
          var latSpan = northEast.lat() - southWest.lat();
          for (var i = 0; i < 5; i++) {
            var location = new google.maps.LatLng(southWest.lat() + latSpan * Math.random(),
            southWest.lng() + lngSpan * Math.random());
            var marker = new google.maps.Marker({ position: location,
                                                  map: map,
                                                  icon: "http://www.folsomzoofriends.org/images/stories/misc/car_icon.gif",                                     
            });
            var j = i + 1;
            marker.setTitle(j.toString());
            attachMessage(marker, j);


            function attachMessage(marker, number) {
                var infowindow = new google.maps.InfoWindow(
                                { content: "car"+number,
                                  size: new google.maps.Size(50,50)
                                });
                google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map,marker);
                });
            }
  
          }
      
      }