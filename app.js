var map;
var directionsDisplay;
var directionsService= new google.maps.DirectionsService();
var gmarkers=[]
var routess=[]
var directionsDisp=[]
function initialize() {

    
    var arequipa = new google.maps.LatLng(-16.393298, -71.535254);
    var mapOptions = {zoom: 15,
                      center: arequipa,
                      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    //directionsDisplay.setMap(map);
    var southWest = new google.maps.LatLng(-16.397509, -71.544802);
    var northEast = new google.maps.LatLng(-16.390704, -71.528967);
    //GetRandomPosition(southWest,northEast);
    for (var i = 0; i < 5; i++) {
      var location = GetRandomPosition(southWest,northEast)
      CreateMarker(location,(i+1).toString());
      /*var marker = new google.maps.Marker({ position: location,
                                            map: map,
                                            icon: "http://www.folsomzoofriends.org/images/stories/misc/car_icon.gif",                                     
      });
      var j = i + 1;
      //pos=[marker.position.A,marker.position.F]
      //gmarkers.push(marker);
      marker.setTitle(j.toString());
      attachMessage(marker, j);
      CalcRoute(marker);    */

    }

    for (var i=0;i<gmarkers.length;i++)
    {
      CalcRoute(gmarkers[i],i);
    }

    //console.log(gmarkers);
    
}

function CreateMarker(pos,id)
{
  var marker= new google.maps.Marker({  position: pos,
                                        map:map,
                                        icon:"http://www.folsomzoofriends.org/images/stories/misc/car_icon.gif",
                                        title: id,
                                        duration:5000,
                                        easing: "easeInOutSine"
  });

  gmarkers.push(marker);

}


function GetRandomPosition(swest,neast)
{
  var bounds = new google.maps.LatLngBounds(swest,neast);
  var lngSpan=neast.lng()- swest.lng();
  var latSpan= neast.lat() - swest.lat();

  return new google.maps.LatLng(swest.lat() + latSpan * Math.random(),
              swest.lng() + lngSpan * Math.random());

}


function CalcRoute(marker,id)
{
  var southWest = new google.maps.LatLng(-16.397509, -71.544802);
  var northEast = new google.maps.LatLng(-16.390704, -71.528967);
  

  var start= marker.position;
  var end =  GetRandomPosition(southWest,northEast);
  
  var rendererOptions = { map: map, suppressMarkers:false };
  directionsDisp.push(new google.maps.DirectionsRenderer(rendererOptions));

  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.DRIVING
  };

  directionsService.route(request,function(result,status)
  {
    if (status== google.maps.DirectionsStatus.OK )
    {
      routess.push(result);
      directionsDisp[id].setDirections(result);
      //console.log(result.routes[0].legs[0].steps)
      for (var x=0; x< result.routes[0].legs[0].steps.length;x++)
      {  

        MarkerMove(gmarkers[id],result.routes[0].legs[0].steps[x],gmarkers[id]);
        
      }
    
    }

  });
  

}

function MarkerMove(marker,route,id)
{
    
      var LatlLng2=new google.maps.LatLng(route.end_point.A,
                                          route.end_point.F);
      marker.setPosition(LatlLng2);
      return;
}



function attachMessage(marker, number) {
    var infowindow = new google.maps.InfoWindow(
                    { content: "car"+number,
                      size: new google.maps.Size(50,50)
                    });
    google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
    });

}


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
