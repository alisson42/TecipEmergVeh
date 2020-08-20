/*----Global variabels----*/
  var bounds = null;
  var markers_objs = Array();

  lat_pedestrian=43.875437;    //before: 43.71822;
  lng_pedestrian=10.246500;    //before: 10.42504;

  var map = L.map(
          'map', {
          center: [43.87097, 10.249689],
          zoom: 14.6,
          maxBounds: bounds,
          layers: [],
          worldCopyJump: false,
          crs: L.CRS.EPSG3857,
          zoomControl: true,
          });

  var tile_layer = L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
            "attribution": null,
            "detectRetina": false,
            "maxNativeZoom": 18,
            "maxZoom": 18,
            "minZoom": 0,
            "noWrap": false,
            "opacity": 1,
            "subdomains": "abc",
            "tms": false
            }
          ).addTo(map);

  var basestationIcon = L.icon({
          iconUrl: 'icons/basestation.png',
          iconSize:     [50, 50], // size of the icon
          popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
  L.marker([43.71830, 10.42472], {icon: basestationIcon}).addTo(map);

  var pedestrianIcon = L.icon({
          iconUrl: 'icons/pedestrian.png',
          iconSize:     [20, 40], // size of the icon
          popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
  L.marker([lat_pedestrian, lng_pedestrian], {icon: pedestrianIcon}).addTo(map);

  var carIcon = L.Icon.extend({
      options: {
                  iconSize:     [40, 40], // size of the icon
                  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      }
  });

  var green_N   = new carIcon({ iconUrl: 'icons/green_N.png' });
  var green_N_E = new carIcon({ iconUrl: 'icons/green_N_E.png' });
  var green_E   = new carIcon({ iconUrl: 'icons/green_E.png' });
  var green_S_E = new carIcon({ iconUrl: 'icons/green_S_E.png'});
  var green_S   = new carIcon({ iconUrl: 'icons/green_S.png' });
  var green_S_O = new carIcon({ iconUrl: 'icons/green_S_O.png' });
  var green_O   = new carIcon({ iconUrl: 'icons/green_O.png' });
  var green_N_O = new carIcon({ iconUrl: 'icons/green_N_O.png' });

  var red_N   = new carIcon({ iconUrl: 'icons/red_N.png' });
  var red_N_E = new carIcon({ iconUrl: 'icons/red_N_E.png' });
  var red_E   = new carIcon({ iconUrl: 'icons/red_E.png' });
  var red_S_E = new carIcon({ iconUrl: 'icons/red_S_E.png'});
  var red_S   = new carIcon({ iconUrl: 'icons/red_S.png' });
  var red_S_O = new carIcon({ iconUrl: 'icons/red_S_O.png' });
  var red_O   = new carIcon({ iconUrl: 'icons/red_O.png' });
  var red_N_O = new carIcon({ iconUrl: 'icons/red_N_O.png' });

  var blue_N   = new carIcon({ iconUrl: 'icons/blue_N.png' });
  var blue_N_E = new carIcon({ iconUrl: 'icons/blue_N_E.png' });
  var blue_E   = new carIcon({ iconUrl: 'icons/blue_E.png' });
  var blue_S_E = new carIcon({ iconUrl: 'icons/blue_S_E.png'});
  var blue_S   = new carIcon({ iconUrl: 'icons/blue_S.png' });
  var blue_S_O = new carIcon({ iconUrl: 'icons/blue_S_O.png' });
  var blue_O   = new carIcon({ iconUrl: 'icons/blue_O.png' });
  var blue_N_O = new carIcon({ iconUrl: 'icons/blue_N_O.png' });

  var yellow_N   = new carIcon({ iconUrl: 'icons/yellow_N.png' });
  var yellow_N_E = new carIcon({ iconUrl: 'icons/yellow_N_E.png' });
  var yellow_E   = new carIcon({ iconUrl: 'icons/yellow_E.png' });
  var yellow_S_E = new carIcon({ iconUrl: 'icons/yellow_S_E.png'});
  var yellow_S   = new carIcon({ iconUrl: 'icons/yellow_S.png' });
  var yellow_S_O = new carIcon({ iconUrl: 'icons/yellow_S_O.png' });
  var yellow_O   = new carIcon({ iconUrl: 'icons/yellow_O.png' });
  var yellow_N_O = new carIcon({ iconUrl: 'icons/yellow_N_O.png' });

  var black_N   = new carIcon({ iconUrl: 'icons/black_N.png' });
  var black_N_E = new carIcon({ iconUrl: 'icons/black_N_E.png' });
  var black_E   = new carIcon({ iconUrl: 'icons/black_E.png' });
  var black_S_E = new carIcon({ iconUrl: 'icons/black_S_E.png'});
  var black_S   = new carIcon({ iconUrl: 'icons/black_S.png' });
  var black_S_O = new carIcon({ iconUrl: 'icons/black_S_O.png' });
  var black_O   = new carIcon({ iconUrl: 'icons/black_O.png' });
  var black_N_O = new carIcon({ iconUrl: 'icons/black_N_O.png' });

  const id_pedest = 0;
  const id_green = 1;
  const id_red = 2;
  const id_blue = 3;
  const id_yellow = 4;
  const id_black = 5;

  const EarthRadiusInMiles = 3956.0;
  const EarthRadiusInKilometers = 6367.0;
  const kmToMiles = 0.621371192;

  var current_position = [];
/*----end global variabels----*/



  ///Function to select (by id) 'arrow icon' to represent the car in the map
  function setObjCardinality(id, cardinality, style) {          //id:= which car      cardinality:= angle      style:= (right now: NOTHING)
      if(cardinality >= 67.5 && cardinality < 112.5) {          //90 degrees = NORTH
          if (id == id_green) markers_objs[id].setIcon(green_N);
          else if (id == id_red)  markers_objs[id].setIcon(red_N);
          else if (id == id_blue)  markers_objs[id].setIcon(blue_N);
          else if (id == id_yellow)  markers_objs[id].setIcon(yellow_N);
          else markers_objs[id].setIcon(black_N);
      }
      else if(cardinality >= 22.5 && cardinality < 67.5) {      //45 degrees = NORTH_EAST
          if (id == id_green) markers_objs[id].setIcon(green_N_E);
          else if (id == id_red)  markers_objs[id].setIcon(red_N_E);
          else if (id == id_blue)  markers_objs[id].setIcon(blue_N_E);
          else if (id == id_yellow)  markers_objs[id].setIcon(yellow_N_E);
          else markers_objs[id].setIcon(black_N_E);
      }
      else if(cardinality >= -22.5 && cardinality < 22.5) {     //0 degrees = EAST
          if (id == id_green) markers_objs[id].setIcon(green_E);
          else if (id == id_red)  markers_objs[id].setIcon(red_E);
          else if (id == id_blue)  markers_objs[id].setIcon(blue_E);
          else if (id == id_yellow)  markers_objs[id].setIcon(yellow_E);
          else markers_objs[id].setIcon(black_E);
      }
      else if(cardinality >= -67.5 && cardinality < -22.5) {    //-45 degrees = SOUTH_EAST
          if (id == id_green) markers_objs[id].setIcon(green_S_E);
          else if (id == id_red)  markers_objs[id].setIcon(red_S_E);
          else if (id == id_blue)  markers_objs[id].setIcon(blue_S_E);
          else if (id == id_yellow)  markers_objs[id].setIcon(yellow_S_E);
          else markers_objs[id].setIcon(black_S_E);
      }
      else if(cardinality >= -112.5 && cardinality < -67.5) {   //-90 degrees = SOUTH
          if (id == id_green) markers_objs[id].setIcon(green_S);
          else if (id == id_red)  markers_objs[id].setIcon(red_S);
          else if (id == id_blue)  markers_objs[id].setIcon(blue_S);
          else if (id == id_yellow)  markers_objs[id].setIcon(yellow_S);
          else markers_objs[id].setIcon(black_S);
      }
      else if(cardinality >= -157.5 && cardinality < -112.5) {  //-135 degrees = SOUTH_WEST
          if (id == id_green) markers_objs[id].setIcon(green_S_O);
          else if (id == id_red)  markers_objs[id].setIcon(red_S_O);
          else if (id == id_blue)  markers_objs[id].setIcon(blue_S_O);
          else if (id == id_yellow)  markers_objs[id].setIcon(yellow_S_O);
          else markers_objs[id].setIcon(black_S_O);
      }
      else if(cardinality >= 112.5 && cardinality < 157.5) {    //135 degrees = NORTH_WEST
            if (id == id_green) markers_objs[id].setIcon(green_N_O);
            else if (id == id_red)  markers_objs[id].setIcon(red_N_O);
            else if (id == id_blue)  markers_objs[id].setIcon(blue_N_O);
            else if (id == id_yellow)  markers_objs[id].setIcon(yellow_N_O);
            else markers_objs[id].setIcon(black_N_O);
      }
      else if(cardinality >= 157.5 && cardinality <= 180
          || cardinality >= -180 && cardinality <= -157.5) {    //180 degrees = WEST
          if (id == id_green) markers_objs[id].setIcon(green_O);
          else if (id == id_red)  markers_objs[id].setIcon(red_O);
          else if (id == id_blue)  markers_objs[id].setIcon(blue_O);
          else if (id == id_yellow)  markers_objs[id].setIcon(yellow_O);
          else markers_objs[id].setIcon(black_O);
      }

  } //end function setObjCardinality()



  ///Function that treats 'data' to allocate the icons in the map    [data_format = id; latitude; longitude; cardinality; distance;]
  function updateMarker(data) {
      values = data.toString().split(";");
      id = parseInt(values[0]);
      lat = parseFloat(values[1]);
      lng = parseFloat(values[2]);
      cardinality = values[3];
      distance = parseInt(values[4]);
      
      if (markers_objs[id]) {
          markers_objs[id].setLatLng([lat, lng]);
          if (id == id_pedest) {                              // Pedestrian
              console.log("Pedestrian: "+ lat + "," + lng);
              lat_pedestrian=lat;
              lng_pedestrian=lng;
              markers_objs[id].setIcon(pedestrianIcon);
          } else {                                            // Vehicles
              console.log('Vehicle['+ id +']: ' + lat + ',' + lng + ',' + cardinality + 'o at ' + distance + 'm');
              if (distance > 25 || id == id_black) {
                  setObjCardinality(id,  cardinality, 0);     //if far: style = 0 [not treated yet, in the function setObjCardinality()]
              } else {
                  setObjCardinality(id, cardinality, 1);      //if close: style = 1 [not treated yet, in the function setObjCardinality()]
                  var popup = L.popup({
                    closeButton: false,
                    autoclose: false,
                    maxWidth: 100,
                    maxHeight: 40,
                    offset: [0,-20]
                    })
                  .setLatLng([current_position[id_black][1], current_position[id_black][2]]) 
                  .setContent("<b>WARNING</br>" + distance + 'm</b>')
                  .openOn(map)
                  setTimeout(function() {
                    map.closePopup();
                    }, 2000)
              }
          }
      } else {                                                // Not existing objects
          var marker_obj = L.marker([lat, lng], {icon: ((id == id_pedest) ? pedestrianIcon : green_N)});
          markers_objs[id] = marker_obj;
          if (id == id_pedest) {
              lat_pedestrian=lat;
              lng_pedestrian=lng;
              console.log('New Pedestrian: id='+ id + ' at ' + lat + "," + lng);
              current_position[id][1] = lat_pedestrian;
              current_position[id][2] = lng_pedestrian;
          } else {
              setObjCardinality(id,  cardinality, 0);
              console.log('New Vehicle: id=' + id + ' at ' + lat + "," + lng + ',' + cardinality + ' at ' + distance);
              current_position[id][1] = lat;
              current_position[id][2] = lng;
          }
          markers_objs[id].addTo(map);
      } // end if/else id
  } //end function updateMarker()



  ///Function to calculate the absolute distance between two coordenate points
  
  // function CalcDistance(lat1, lng1, lat2, lng2, radius) { 
  //   return radius * 2 * Math.asin( Math.min(1, Math.sqrt( ( Math.pow(Math.sin( (lat2 - lat1) / 2.0), 2.0) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((lng2 - lng1) / 2.0), 2.0) ) ) ) );
  // } //end function CalcDistance()

  function CalcDistance(lat1, lon1, lat2, lon2) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344; //km
        return Math.round(dist * 1000) / 1000;
    }
  } //end function CalcDistance()



  /*
  ///Function to handle the socket
  function wsConnect() {
      //var ws = new WebSocket('ws://10.30.3.2:4999');
          var ws = new WebSocket('ws://10.9.9.7:4999');

      ws.onmessage = function (message) {
          //console.log(message);
          updateMarker(message.data);
      };

      ws.onclose = function(e) {
          console.log("WebSocket error (retry in 1 second...): " + e.reason);
          setTimeout(function() {
              wsConnect();
          }, 1000);
      };

      ws.onerror = function(err) {
          console.log("Websocket error: " + err);
          ws.close();
      };
  }
  */


  
  ///Function to track the devices (pedestrian and vehicle)
  function track(){

      //creating a matrix 6x3 to hold the current position of the devices
      for(var k=0; k<6; k++){
          current_position[k] = new Array(3);
          current_position[k][0] = k;
      }
      console.log("matrix: " + current_position);

      let vec = [{},{},{},{},{},{}];
      let i=[0,0,0,0,0,0];  //initialize pointer of the vector vec[]

      vec[id_black] = [     //vector with the coordanate points of the Emergency Vehicle (black) running the 'Via Vittorio Veneto' in Viareggio
        {
          "lat": 43.866013027121255,
          "lon": 10.252352356910706
        },
        {
          "lat": 43.866071040240456,
          "lon": 10.252336263656616
        },
        {
          "lat": 43.86613678837397,
          "lon": 10.252304077148438
        },
        {
          "lat": 43.866183198777485,
          "lon": 10.252271890640259
        },
        {
          "lat": 43.86626054936972,
          "lon": 10.25222897529602
        },
        {
          "lat": 43.866357237468854,
          "lon": 10.252191424369812
        },
        {
          "lat": 43.86642685280313,
          "lon": 10.252132415771484
        },
        {
          "lat": 43.86653127565208,
          "lon": 10.252089500427246
        },
        {
          "lat": 43.86661636080118,
          "lon": 10.252035856246948
        },
        {
          "lat": 43.866685975832816,
          "lon": 10.25199294090271
        },
        {
          "lat": 43.866755590783185,
          "lon": 10.251960754394531
        },
        {
          "lat": 43.86680200070491,
          "lon": 10.251896381378174
        },
        {
          "lat": 43.86685227807934,
          "lon": 10.251864194869995
        },
        {
          "lat": 43.86692189283547,
          "lon": 10.251821279525757
        },
        {
          "lat": 43.86698377255045,
          "lon": 10.251778364181519
        },
        {
          "lat": 43.8670417847249,
          "lon": 10.2517569065094
        },
        {
          "lat": 43.867099796842886,
          "lon": 10.251713991165161
        },
        {
          "lat": 43.86720808597874,
          "lon": 10.251671075820923
        },
        {
          "lat": 43.86730090508144,
          "lon": 10.251606702804565
        },
        {
          "lat": 43.8673782542233,
          "lon": 10.251563787460327
        },
        {
          "lat": 43.86745173581508,
          "lon": 10.25149941444397
        },
        {
          "lat": 43.867502012641495,
          "lon": 10.25147795677185
        },
        {
          "lat": 43.86756389175423,
          "lon": 10.251445770263672
        },
        {
          "lat": 43.86762577080274,
          "lon": 10.251408219337463
        },
        {
          "lat": 43.86773019155142,
          "lon": 10.251338481903076
        },
        {
          "lat": 43.86785008181505,
          "lon": 10.251295566558838
        },
        {
          "lat": 43.867908093146376,
          "lon": 10.2512526512146
        },
        {
          "lat": 43.86798930891535,
          "lon": 10.251177549362183
        },
        {
          "lat": 43.86809372902719,
          "lon": 10.251113176345825
        },
        {
          "lat": 43.86818654675078,
          "lon": 10.251059532165527
        },
        {
          "lat": 43.86827549693362,
          "lon": 10.25101125240326
        },
        {
          "lat": 43.86834124263561,
          "lon": 10.25098443031311
        },
        {
          "lat": 43.868441794745436,
          "lon": 10.250930786132812
        },
        {
          "lat": 43.86855781619983,
          "lon": 10.250855684280396
        },
        {
          "lat": 43.86869317427787,
          "lon": 10.250785946846008
        },
        {
          "lat": 43.868758919519166,
          "lon": 10.25073766708374
        },
        {
          "lat": 43.868832399408895,
          "lon": 10.250662565231323
        },
        {
          "lat": 43.86890587920805,
          "lon": 10.250635743141174
        },
        {
          "lat": 43.86899482831739,
          "lon": 10.250576734542847
        },
        {
          "lat": 43.86910311401048,
          "lon": 10.250523090362549
        },
        {
          "lat": 43.869184328151185,
          "lon": 10.250437259674072
        },
        {
          "lat": 43.86926167484897,
          "lon": 10.250410437583923
        },
        {
          "lat": 43.869323552134944,
          "lon": 10.250383615493774
        },
        {
          "lat": 43.869393164004855,
          "lon": 10.250340700149536
        },
        {
          "lat": 43.869443439193695,
          "lon": 10.250324606895447
        },
        {
          "lat": 43.86951691823953,
          "lon": 10.250244140625
        },
        {
          "lat": 43.86958652988363,
          "lon": 10.250195860862732
        },
        {
          "lat": 43.869698681805886,
          "lon": 10.250147581100464
        },
        {
          "lat": 43.86978762973208,
          "lon": 10.250067114830017
        },
        {
          "lat": 43.86986110835361,
          "lon": 10.250045657157898
        },
        {
          "lat": 43.86993845417314,
          "lon": 10.250018835067749
        },
        {
          "lat": 43.870062207275616,
          "lon": 10.249911546707153
        },
        {
          "lat": 43.87015502193384,
          "lon": 10.249884724617004
        },
        {
          "lat": 43.87025170371581,
          "lon": 10.249793529510498
        },
        {
          "lat": 43.870363854386405,
          "lon": 10.24974524974823
        },
        {
          "lat": 43.87047213759225,
          "lon": 10.249680876731873
        },
        {
          "lat": 43.87055334986752,
          "lon": 10.249627232551575
        },
        {
          "lat": 43.87062296030115,
          "lon": 10.249605774879456
        },
        {
          "lat": 43.870700305132,
          "lon": 10.24951457977295
        },
        {
          "lat": 43.87076991539395,
          "lon": 10.24950921535492
        },
        {
          "lat": 43.87085886172147,
          "lon": 10.249407291412354
        },
        {
          "lat": 43.87102901954338,
          "lon": 10.249321460723877
        },
        {
          "lat": 43.87117210642668,
          "lon": 10.24924099445343
        },
        {
          "lat": 43.871280388164095,
          "lon": 10.249181985855103
        },
        {
          "lat": 43.87141187286647,
          "lon": 10.249117612838745
        },
        {
          "lat": 43.871524021353956,
          "lon": 10.249037146568298
        },
        {
          "lat": 43.871636169630406,
          "lon": 10.248956680297852
        },
        {
          "lat": 43.87174058335327,
          "lon": 10.248881578445435
        },
        {
          "lat": 43.87181792673374,
          "lon": 10.248833298683167
        },
        {
          "lat": 43.871899137175234,
          "lon": 10.248785018920898
        },
        {
          "lat": 43.8720112847458,
          "lon": 10.24874746799469
        },
        {
          "lat": 43.87210022922069,
          "lon": 10.248672366142273
        },
        {
          "lat": 43.87220464213056,
          "lon": 10.248634815216064
        },
        {
          "lat": 43.87229745345241,
          "lon": 10.248559713363647
        },
        {
          "lat": 43.87243667016418,
          "lon": 10.2484792470932
        },
        {
          "lat": 43.87254881672323,
          "lon": 10.248398780822754
        },
        {
          "lat": 43.87264936173472,
          "lon": 10.248334407806396
        },
        {
          "lat": 43.8727344381504,
          "lon": 10.248302221298218
        },
        {
          "lat": 43.87282724864719,
          "lon": 10.248216390609741
        },
        {
          "lat": 43.872931660283314,
          "lon": 10.248173475265503
        },
        {
          "lat": 43.873005135028684,
          "lon": 10.248130559921265
        },
        {
          "lat": 43.87307860968348,
          "lon": 10.248082280158997
        },
        {
          "lat": 43.87315208424769,
          "lon": 10.248039364814758
        },
        {
          "lat": 43.873248761167865,
          "lon": 10.247969627380371
        },
        {
          "lat": 43.87332223552229,
          "lon": 10.247942805290222
        },
        {
          "lat": 43.8734034439139,
          "lon": 10.247889161109924
        },
        {
          "lat": 43.873484652194854,
          "lon": 10.247835516929626
        },
        {
          "lat": 43.87356586036515,
          "lon": 10.247787237167358
        },
        {
          "lat": 43.87366640366074,
          "lon": 10.24773895740509
        },
        {
          "lat": 43.87377854790573,
          "lon": 10.247669219970703
        },
        {
          "lat": 43.87386748974308,
          "lon": 10.247642397880554
        },
        {
          "lat": 43.873991234687274,
          "lon": 10.247540473937988
        },
        {
          "lat": 43.87408017620718,
          "lon": 10.24749755859375
        },
        {
          "lat": 43.874176851621755,
          "lon": 10.247406363487244
        },
        {
          "lat": 43.874238723804766,
          "lon": 10.247363448143005
        },
        {
          "lat": 43.874308329933854,
          "lon": 10.247299075126648
        },
        {
          "lat": 43.87439727098051,
          "lon": 10.24723470211029
        },
        {
          "lat": 43.87450941385015,
          "lon": 10.247181057929993
        },
        {
          "lat": 43.874586753637274,
          "lon": 10.247095227241516
        },
        {
          "lat": 43.87467182728717,
          "lon": 10.247052311897278
        },
        {
          "lat": 43.874764634766734,
          "lon": 10.24698793888092
        },
        {
          "lat": 43.8748574421018,
          "lon": 10.246912837028503
        },
        {
          "lat": 43.87498891891232,
          "lon": 10.246837735176086
        },
        {
          "lat": 43.87509719371496,
          "lon": 10.24676263332367
        },
        {
          "lat": 43.87519000053207,
          "lon": 10.246666073799133
        },
        {
          "lat": 43.87529054108749,
          "lon": 10.246601700782776
        },
        {
          "lat": 43.87536787986085,
          "lon": 10.246558785438538
        },
        {
          "lat": 43.87543361773929,
          "lon": 10.2465158700943
        }
      ];                    //end vec[id_black] with Emergencial Vehicle positions

      vec[id_yellow] = [    //yellow car vector
        {
          "lat": 43.87401443683569,
          "lon": 10.24751901626587
        },
        {
          "lat": 43.87393709630581,
          "lon": 10.247561931610107
        },
        {
          "lat": 43.87387522380963,
          "lon": 10.247604846954346
        },
        {
          "lat": 43.8738133512492,
          "lon": 10.247637033462524
        },
        {
          "lat": 43.87375147862454,
          "lon": 10.247669219970703
        },
        {
          "lat": 43.873697340025274,
          "lon": 10.247712135314941
        },
        {
          "lat": 43.873643201376815,
          "lon": 10.24774432182312
        },
        {
          "lat": 43.87360839793399,
          "lon": 10.24776041507721
        },
        {
          "lat": 43.87356972741811,
          "lon": 10.247781872749329
        },
        {
          "lat": 43.87352718982166,
          "lon": 10.247808694839478
        },
        {
          "lat": 43.87348851925308,
          "lon": 10.247830152511597
        },
        {
          "lat": 43.87344984865943,
          "lon": 10.247851610183716
        },
        {
          "lat": 43.873411178040676,
          "lon": 10.247873067855835
        },
        {
          "lat": 43.873364773265045,
          "lon": 10.247894525527954
        },
        {
          "lat": 43.87332610259107,
          "lon": 10.247921347618103
        },
        {
          "lat": 43.87329129896303,
          "lon": 10.247937440872192
        },
        {
          "lat": 43.87325262824141,
          "lon": 10.247964262962341
        },
        {
          "lat": 43.87321395749466,
          "lon": 10.24798572063446
        },
        {
          "lat": 43.87316755256545,
          "lon": 10.24801254272461
        },
        {
          "lat": 43.87311728051806,
          "lon": 10.248044729232788
        },
        {
          "lat": 43.87307087551355,
          "lon": 10.248066186904907
        },
        {
          "lat": 43.87302060338461,
          "lon": 10.248098373413086
        },
        {
          "lat": 43.87298966666877,
          "lon": 10.248125195503235
        },
        {
          "lat": 43.87293939447128,
          "lon": 10.248146653175354
        },
        {
          "lat": 43.87289685642492,
          "lon": 10.248173475265503
        },
        {
          "lat": 43.87285818544733,
          "lon": 10.248205661773682
        },
        {
          "lat": 43.87282338154604,
          "lon": 10.2482271194458
        },
        {
          "lat": 43.872788577624426,
          "lon": 10.24824321269989
        },
        {
          "lat": 43.87274990657658,
          "lon": 10.248270034790039
        },
        {
          "lat": 43.872707368394956,
          "lon": 10.248291492462158
        },
        {
          "lat": 43.872664830182956,
          "lon": 10.248318314552307
        },
        {
          "lat": 43.872614557711486,
          "lon": 10.248345136642456
        },
        {
          "lat": 43.87257201943325,
          "lon": 10.248371958732605
        },
        {
          "lat": 43.8725256140042,
          "lon": 10.248393416404724
        },
        {
          "lat": 43.87248307566249,
          "lon": 10.248436331748962
        },
        {
          "lat": 43.872448271542126,
          "lon": 10.248457789421082
        },
        {
          "lat": 43.87241346740146,
          "lon": 10.24848461151123
        },
        {
          "lat": 43.87237479611018,
          "lon": 10.24850606918335
        },
        {
          "lat": 43.872339991926594,
          "lon": 10.248532891273499
        },
        {
          "lat": 43.87230132058768,
          "lon": 10.248548984527588
        },
        {
          "lat": 43.87226264922363,
          "lon": 10.248570442199707
        },
        {
          "lat": 43.87222397783452,
          "lon": 10.248591899871826
        },
        {
          "lat": 43.87218530642029,
          "lon": 10.248613357543945
        },
        {
          "lat": 43.87215050212605,
          "lon": 10.248640179634094
        },
        {
          "lat": 43.872107963516605,
          "lon": 10.248672366142273
        },
        {
          "lat": 43.87206542487678,
          "lon": 10.248688459396362
        },
        {
          "lat": 43.87202288620657,
          "lon": 10.248715281486511
        },
        {
          "lat": 43.87198034750604,
          "lon": 10.24873673915863
        },
        {
          "lat": 43.87193780877513,
          "lon": 10.24875819683075
        },
        {
          "lat": 43.87190300433635,
          "lon": 10.248785018920898
        },
        {
          "lat": 43.871868199877255,
          "lon": 10.248811841011047
        },
        {
          "lat": 43.87182566106627,
          "lon": 10.248833298683167
        },
        {
          "lat": 43.87177925505606,
          "lon": 10.248860120773315
        },
        {
          "lat": 43.87173284900971,
          "lon": 10.248886942863464
        },
        {
          "lat": 43.87169804445122,
          "lon": 10.248913764953613
        },
        {
          "lat": 43.87165163834163,
          "lon": 10.248929858207703
        },
        {
          "lat": 43.87160523219592,
          "lon": 10.248956680297852
        },
        {
          "lat": 43.8715665603802,
          "lon": 10.24897813796997
        },
        {
          "lat": 43.87151628698227,
          "lon": 10.24900496006012
        },
        {
          "lat": 43.87146601354193,
          "lon": 10.249031782150269
        },
        {
          "lat": 43.87141960725168,
          "lon": 10.249063968658447
        },
        {
          "lat": 43.871373200925284,
          "lon": 10.249090790748596
        },
        {
          "lat": 43.87133452895902,
          "lon": 10.249122977256775
        },
        {
          "lat": 43.87128425536537,
          "lon": 10.249149799346924
        },
        {
          "lat": 43.87123784893358,
          "lon": 10.249171257019043
        },
        {
          "lat": 43.8711991768795,
          "lon": 10.249208807945251
        },
        {
          "lat": 43.87114890317166,
          "lon": 10.24924099445343
        },
        {
          "lat": 43.87110249663448,
          "lon": 10.249267816543579
        },
        {
          "lat": 43.87105222284509,
          "lon": 10.249294638633728
        },
        {
          "lat": 43.87099421457389,
          "lon": 10.249326825141907
        },
        {
          "lat": 43.87094394069315,
          "lon": 10.249364376068115
        },
        {
          "lat": 43.87090913567396,
          "lon": 10.249391198158264
        },
        {
          "lat": 43.87088206508944,
          "lon": 10.249407291412354
        },
        {
          "lat": 43.870851127263485,
          "lon": 10.249428749084473
        },
        {
          "lat": 43.87080085326206,
          "lon": 10.249455571174622
        },
        {
          "lat": 43.87076604815932,
          "lon": 10.24948239326477
        },
        {
          "lat": 43.87071964132403,
          "lon": 10.24950385093689
        },
        {
          "lat": 43.87068483617386,
          "lon": 10.249525308609009
        },
        {
          "lat": 43.87063069478873,
          "lon": 10.249546766281128
        },
        {
          "lat": 43.870584287848075,
          "lon": 10.249584317207336
        },
        {
          "lat": 43.8705417481207,
          "lon": 10.249611139297485
        },
        {
          "lat": 43.87049920836298,
          "lon": 10.249632596969604
        },
        {
          "lat": 43.870456668574874,
          "lon": 10.249659419059753
        },
        {
          "lat": 43.870410261498705,
          "lon": 10.249686241149902
        },
        {
          "lat": 43.87036772164714,
          "lon": 10.249713063240051
        },
        {
          "lat": 43.87031744723797,
          "lon": 10.2497398853302
        },
        {
          "lat": 43.87027104005338,
          "lon": 10.249772071838379
        },
        {
          "lat": 43.87022463283267,
          "lon": 10.249804258346558
        },
        {
          "lat": 43.87018209284859,
          "lon": 10.249831080436707
        },
        {
          "lat": 43.87013568555863,
          "lon": 10.249857902526855
        },
        {
          "lat": 43.87008541095372,
          "lon": 10.249890089035034
        },
        {
          "lat": 43.87004287087028,
          "lon": 10.249922275543213
        },
        {
          "lat": 43.87000419804081,
          "lon": 10.249943733215332
        },
        {
          "lat": 43.86995779061233,
          "lon": 10.24997591972351
        },
        {
          "lat": 43.86991138314771,
          "lon": 10.24999737739563
        },
        {
          "lat": 43.86986884294007,
          "lon": 10.250018835067749
        },
        {
          "lat": 43.869822435406185,
          "lon": 10.250045657157898
        },
        {
          "lat": 43.86977602783619,
          "lon": 10.250083208084106
        },
        {
          "lat": 43.86973348753194,
          "lon": 10.250104665756226
        },
        {
          "lat": 43.86969481450171,
          "lon": 10.250136852264404
        },
        {
          "lat": 43.869644539524934,
          "lon": 10.250169038772583
        },
        {
          "lat": 43.86959813181639,
          "lon": 10.250195860862732
        },
        {
          "lat": 43.86954785675806,
          "lon": 10.25022268295288
        },
        {
          "lat": 43.869501448974255,
          "lon": 10.25024950504303
        },
        {
          "lat": 43.86948984702266,
          "lon": 10.250281691551208
        },
        {
          "lat": 43.86945504115432,
          "lon": 10.250287055969238
        },
        {
          "lat": 43.86941636794344,
          "lon": 10.250308513641357
        },
        {
          "lat": 43.869381562032196,
          "lon": 10.250324606895447
        },
        {
          "lat": 43.86934675610062,
          "lon": 10.250346064567566
        },
        {
          "lat": 43.86930808281946,
          "lon": 10.250367522239685
        },
        {
          "lat": 43.86926554218123,
          "lon": 10.250388979911804
        },
        {
          "lat": 43.869230736181905,
          "lon": 10.250415802001953
        },
        {
          "lat": 43.869188195488455,
          "lon": 10.250442624092102
        },
        {
          "lat": 43.86915725678325,
          "lon": 10.25047481060028
        },
        {
          "lat": 43.86912245072069,
          "lon": 10.25050163269043
        },
        {
          "lat": 43.869079909949946,
          "lon": 10.250528454780579
        },
        {
          "lat": 43.86903736914884,
          "lon": 10.250560641288757
        },
        {
          "lat": 43.86899869566695,
          "lon": 10.250592827796936
        },
        {
          "lat": 43.86895228745558,
          "lon": 10.250608921051025
        },
        {
          "lat": 43.86890587920805,
          "lon": 10.250635743141174
        },
        {
          "lat": 43.868859470924384,
          "lon": 10.250662565231323
        },
        {
          "lat": 43.86880532788112,
          "lon": 10.250689387321472
        },
        {
          "lat": 43.868758919519166,
          "lon": 10.250716209411621
        },
        {
          "lat": 43.86871251112108,
          "lon": 10.25074303150177
        },
        {
          "lat": 43.86866997005777,
          "lon": 10.25076448917389
        },
        {
          "lat": 43.86862742896409,
          "lon": 10.250785946846008
        },
        {
          "lat": 43.868581020463616,
          "lon": 10.250812768936157
        },
        {
          "lat": 43.86853461192704,
          "lon": 10.250844955444336
        },
        {
          "lat": 43.86849207073674,
          "lon": 10.250871777534485
        },
        {
          "lat": 43.86844566213088,
          "lon": 10.250898599624634
        },
        {
          "lat": 43.86839538610044,
          "lon": 10.250925421714783
        },
        {
          "lat": 43.86835284481079,
          "lon": 10.250957608222961
        },
        {
          "lat": 43.868306436096525,
          "lon": 10.25097906589508
        },
        {
          "lat": 43.86826002734614,
          "lon": 10.2510005235672
        },
        {
          "lat": 43.868209751159114,
          "lon": 10.251027345657349
        },
        {
          "lat": 43.86816720973697,
          "lon": 10.251054167747498
        },
        {
          "lat": 43.86812853569047,
          "lon": 10.251080989837646
        },
        {
          "lat": 43.86807825939253,
          "lon": 10.251107811927795
        },
        {
          "lat": 43.86802411563964,
          "lon": 10.251139998435974
        },
        {
          "lat": 43.86797383925362,
          "lon": 10.251172184944153
        },
        {
          "lat": 43.867935165081676,
          "lon": 10.251204371452332
        },
        {
          "lat": 43.867892623463554,
          "lon": 10.25123119354248
        },
        {
          "lat": 43.867846214390966,
          "lon": 10.2512526512146
        },
        {
          "lat": 43.867803672709336,
          "lon": 10.251284837722778
        },
        {
          "lat": 43.86776886585634,
          "lon": 10.251311659812927
        },
        {
          "lat": 43.86772632411955,
          "lon": 10.251338481903076
        },
        {
          "lat": 43.867679914917474,
          "lon": 10.251365303993225
        },
        {
          "lat": 43.86764124055482,
          "lon": 10.251392126083374
        },
        {
          "lat": 43.86760256616706,
          "lon": 10.251413583755493
        },
        {
          "lat": 43.867560024311565,
          "lon": 10.251435041427612
        },
        {
          "lat": 43.86751748242569,
          "lon": 10.251467227935791
        },
        {
          "lat": 43.86747880795765,
          "lon": 10.25149405002594
        },
        {
          "lat": 43.86742853111167,
          "lon": 10.251526236534119
        },
        {
          "lat": 43.8673782542233,
          "lon": 10.251553058624268
        },
        {
          "lat": 43.867327977292504,
          "lon": 10.251574516296387
        },
        {
          "lat": 43.867289302701494,
          "lon": 10.251601338386536
        },
        {
          "lat": 43.867250628085415,
          "lon": 10.251628160476685
        },
        {
          "lat": 43.86721582090946,
          "lon": 10.251654982566833
        }
      ];                    //end vec[id_yellow] with Yellow Vehicle positions

      vec[id_blue] = [      //blue car vector
        {
          "lat": 43.87087046340659,
          "lon": 10.25247573852539
        },
        {
          "lat": 43.86897935891662,
          "lon": 10.246939659118652
        },
        {
          "lat": 43.87085886172147,
          "lon": 10.252432823181152
        },
        {
          "lat": 43.870843392804474,
          "lon": 10.252384543418884
        },
        {
          "lat": 43.8708163221901,
          "lon": 10.252314805984497
        },
        {
          "lat": 43.87079698602942,
          "lon": 10.252282619476318
        },
        {
          "lat": 43.87077378262835,
          "lon": 10.252207517623901
        },
        {
          "lat": 43.870758313689265,
          "lon": 10.252143144607544
        },
        {
          "lat": 43.87073897750978,
          "lon": 10.252105593681335
        },
        {
          "lat": 43.87071190684797,
          "lon": 10.25199830532074
        },
        {
          "lat": 43.8707041723709,
          "lon": 10.251966118812561
        },
        {
          "lat": 43.87067323445261,
          "lon": 10.251864194869995
        },
        {
          "lat": 43.87065003100335,
          "lon": 10.251842737197876
        },
        {
          "lat": 43.87063456203216,
          "lon": 10.251794457435608
        },
        {
          "lat": 43.87062296030115,
          "lon": 10.25173008441925
        },
        {
          "lat": 43.87058815509451,
          "lon": 10.251687169075012
        },
        {
          "lat": 43.870584287848075,
          "lon": 10.251628160476685
        },
        {
          "lat": 43.870564951612124,
          "lon": 10.251563787460327
        },
        {
          "lat": 43.8705417481207,
          "lon": 10.25151014328003
        },
        {
          "lat": 43.87052627912139,
          "lon": 10.251451134681702
        },
        {
          "lat": 43.87048373935265,
          "lon": 10.251386761665344
        },
        {
          "lat": 43.87047600484596,
          "lon": 10.251354575157166
        },
        {
          "lat": 43.87047213759225,
          "lon": 10.251322388648987
        },
        {
          "lat": 43.870452801319914,
          "lon": 10.251268744468689
        },
        {
          "lat": 43.870441199553504,
          "lon": 10.251204371452332
        },
        {
          "lat": 43.87042573052811,
          "lon": 10.251166820526123
        },
        {
          "lat": 43.870390925206294,
          "lon": 10.251054167747498
        },
        {
          "lat": 43.870371588907624,
          "lon": 10.25097370147705
        },
        {
          "lat": 43.87035611986417,
          "lon": 10.250936150550842
        },
        {
          "lat": 43.87031744723797,
          "lon": 10.250861048698425
        },
        {
          "lat": 43.87030197818044,
          "lon": 10.250823497772217
        },
        {
          "lat": 43.87029424365017,
          "lon": 10.250769853591919
        },
        {
          "lat": 43.87026717278636,
          "lon": 10.2507483959198
        },
        {
          "lat": 43.87026330551911,
          "lon": 10.250684022903442
        },
        {
          "lat": 43.870243969179015,
          "lon": 10.250608921051025
        },
        {
          "lat": 43.87023236737195,
          "lon": 10.250571370124817
        },
        {
          "lat": 43.87019756193723,
          "lon": 10.25051236152649
        },
        {
          "lat": 43.87018982739342,
          "lon": 10.250458717346191
        },
        {
          "lat": 43.87016662375594,
          "lon": 10.250415802001953
        },
        {
          "lat": 43.87015502193384,
          "lon": 10.250346064567566
        },
        {
          "lat": 43.87009314551107,
          "lon": 10.25023877620697
        },
        {
          "lat": 43.87008541095372,
          "lon": 10.250174403190613
        },
        {
          "lat": 43.870062207275616,
          "lon": 10.250126123428345
        },
        {
          "lat": 43.87005060543318,
          "lon": 10.250077843666077
        },
        {
          "lat": 43.87002740174151,
          "lon": 10.25001347064972
        },
        {
          "lat": 43.87001966717561,
          "lon": 10.249954462051392
        },
        {
          "lat": 43.87000033075648,
          "lon": 10.249895453453064
        },
        {
          "lat": 43.86997712704525,
          "lon": 10.249857902526855
        },
        {
          "lat": 43.86996165789941,
          "lon": 10.249804258346558
        },
        {
          "lat": 43.869946188749566,
          "lon": 10.24975597858429
        },
        {
          "lat": 43.86990751585735,
          "lon": 10.249627232551575
        },
        {
          "lat": 43.869892046693444,
          "lon": 10.249536037445068
        },
        {
          "lat": 43.8698804448179,
          "lon": 10.249568223953247
        },
        {
          "lat": 43.86983790458816,
          "lon": 10.249423384666443
        },
        {
          "lat": 43.86981856811008,
          "lon": 10.249359011650085
        },
        {
          "lat": 43.8697914970302,
          "lon": 10.249278545379639
        },
        {
          "lat": 43.86976829323767,
          "lon": 10.2492356300354
        },
        {
          "lat": 43.86974122213496,
          "lon": 10.249139070510864
        },
        {
          "lat": 43.869698681805886,
          "lon": 10.249047875404358
        },
        {
          "lat": 43.869687079892664,
          "lon": 10.24900496006012
        },
        {
          "lat": 43.869652274139504,
          "lon": 10.248945951461792
        },
        {
          "lat": 43.8696329376012,
          "lon": 10.248897671699524
        },
        {
          "lat": 43.86960199912682,
          "lon": 10.24875283241272
        },
        {
          "lat": 43.8695749279486,
          "lon": 10.248683094978333
        },
        {
          "lat": 43.8695749279486,
          "lon": 10.248629450798035
        },
        {
          "lat": 43.8695362548155,
          "lon": 10.248554348945618
        },
        {
          "lat": 43.86951305092358,
          "lon": 10.248473882675171
        },
        {
          "lat": 43.86948211238702,
          "lon": 10.248409509658813
        },
        {
          "lat": 43.86945117383437,
          "lon": 10.248329043388367
        },
        {
          "lat": 43.8694318372308,
          "lon": 10.24825930595398
        },
        {
          "lat": 43.869400898652046,
          "lon": 10.248200297355652
        },
        {
          "lat": 43.869393164004855,
          "lon": 10.248141288757324
        },
        {
          "lat": 43.86937382738248,
          "lon": 10.248098373413086
        },
        {
          "lat": 43.869366092731774,
          "lon": 10.248055458068848
        },
        {
          "lat": 43.86935062342734,
          "lon": 10.24801254272461
        },
        {
          "lat": 43.8693351541189,
          "lon": 10.247969627380371
        },
        {
          "lat": 43.8693158174777,
          "lon": 10.247905254364014
        },
        {
          "lat": 43.86930034816021,
          "lon": 10.247856974601746
        },
        {
          "lat": 43.86928101150773,
          "lon": 10.247814059257507
        },
        {
          "lat": 43.86926167484897,
          "lon": 10.24776577949524
        },
        {
          "lat": 43.86923847085016,
          "lon": 10.247690677642822
        },
        {
          "lat": 43.86922686884738,
          "lon": 10.247637033462524
        },
        {
          "lat": 43.86919593016224,
          "lon": 10.247588753700256
        },
        {
          "lat": 43.86917659347587,
          "lon": 10.247524380683899
        },
        {
          "lat": 43.86916112412228,
          "lon": 10.247465372085571
        },
        {
          "lat": 43.86914565476466,
          "lon": 10.247427821159363
        },
        {
          "lat": 43.869130185402994,
          "lon": 10.247379541397095
        },
        {
          "lat": 43.869095379324634,
          "lon": 10.247309803962708
        },
        {
          "lat": 43.869087644637794,
          "lon": 10.247272253036499
        },
        {
          "lat": 43.86907604260565,
          "lon": 10.24723470211029
        },
        {
          "lat": 43.869072175261095,
          "lon": 10.247181057929993
        },
        {
          "lat": 43.86905283853458,
          "lon": 10.247132778167725
        },
        {
          "lat": 43.86902963445448,
          "lon": 10.247095227241516
        },
        {
          "lat": 43.86901416506274,
          "lon": 10.247052311897278
        },
        {
          "lat": 43.86900643036534,
          "lon": 10.2470201253891
        },
        {
          "lat": 43.86899869566695,
          "lon": 10.24697721004486
        }
      ];                    //end vec[id_blue] with Blue Vehicle positions

      vec[id_red] = [       //red car vector
        {
          "lat": 43.86776113099737,
          "lon": 10.251322388648987
        },
        {
          "lat": 43.86779980528224,
          "lon": 10.251306295394897
        },
        {
          "lat": 43.867846214390966,
          "lon": 10.251268744468689
        },
        {
          "lat": 43.867892623463554,
          "lon": 10.25123119354248
        },
        {
          "lat": 43.867931297663084,
          "lon": 10.251209735870361
        },
        {
          "lat": 43.867969971837546,
          "lon": 10.251177549362183
        },
        {
          "lat": 43.86801638081378,
          "lon": 10.251156091690063
        },
        {
          "lat": 43.86805892234358,
          "lon": 10.251129269599915
        },
        {
          "lat": 43.868101463843004,
          "lon": 10.251113176345825
        },
        {
          "lat": 43.8681517401214,
          "lon": 10.251075625419617
        },
        {
          "lat": 43.86818654675078,
          "lon": 10.251064896583557
        },
        {
          "lat": 43.86821361855962,
          "lon": 10.251016616821289
        },
        {
          "lat": 43.868287099121595,
          "lon": 10.2510005235672
        },
        {
          "lat": 43.868321905671976,
          "lon": 10.25097906589508
        },
        {
          "lat": 43.86836831437417,
          "lon": 10.250952243804932
        },
        {
          "lat": 43.86839538610044,
          "lon": 10.250914692878723
        },
        {
          "lat": 43.86844952951609,
          "lon": 10.250877141952515
        },
        {
          "lat": 43.868503672882554,
          "lon": 10.250839591026306
        },
        {
          "lat": 43.86855781619983,
          "lon": 10.250823497772217
        },
        {
          "lat": 43.868611959467955,
          "lon": 10.250812768936157
        },
        {
          "lat": 43.86864676582862,
          "lon": 10.250812768936157
        },
        {
          "lat": 43.86866997005777,
          "lon": 10.250775218009949
        },
        {
          "lat": 43.868708643752946,
          "lon": 10.25073766708374
        },
        {
          "lat": 43.86876278688405,
          "lon": 10.250673294067383
        },
        {
          "lat": 43.86883626676902,
          "lon": 10.250651836395264
        },
        {
          "lat": 43.86888654242759,
          "lon": 10.250625014305115
        },
        {
          "lat": 43.86894842010299,
          "lon": 10.250587463378906
        },
        {
          "lat": 43.86899869566695,
          "lon": 10.250571370124817
        },
        {
          "lat": 43.869048971188526,
          "lon": 10.250533819198608
        },
        {
          "lat": 43.86910698135302,
          "lon": 10.25050163269043
        },
        {
          "lat": 43.86916112412228,
          "lon": 10.250469446182251
        },
        {
          "lat": 43.869230736181905,
          "lon": 10.250442624092102
        },
        {
          "lat": 43.869257807516455,
          "lon": 10.250421166419983
        },
        {
          "lat": 43.869304215489976,
          "lon": 10.250383615493774
        },
        {
          "lat": 43.86933902144638,
          "lon": 10.250319242477417
        },
        {
          "lat": 43.86938542935667,
          "lon": 10.250324606895447
        },
        {
          "lat": 43.86942023526564,
          "lon": 10.250287055969238
        },
        {
          "lat": 43.86945890847404,
          "lon": 10.250270962715149
        },
        {
          "lat": 43.869485979704955,
          "lon": 10.25024950504303
        },
        {
          "lat": 43.86952078555523,
          "lon": 10.250217318534851
        },
        {
          "lat": 43.869567193323974,
          "lon": 10.250217318534851
        },
        {
          "lat": 43.86960973374692,
          "lon": 10.250195860862732
        },
        {
          "lat": 43.869652274139504,
          "lon": 10.250174403190613
        },
        {
          "lat": 43.86971415101997,
          "lon": 10.250131487846375
        },
        {
          "lat": 43.869760558638156,
          "lon": 10.250104665756226
        },
        {
          "lat": 43.8697914970302,
          "lon": 10.250072479248047
        },
        {
          "lat": 43.86981856811008,
          "lon": 10.250061750411987
        },
        {
          "lat": 43.86984563917765,
          "lon": 10.250051021575928
        },
        {
          "lat": 43.86989591398481,
          "lon": 10.250018835067749
        },
        {
          "lat": 43.86997325975917,
          "lon": 10.249959826469421
        },
        {
          "lat": 43.87000033075648,
          "lon": 10.249943733215332
        },
        {
          "lat": 43.870039003588474,
          "lon": 10.249916911125183
        },
        {
          "lat": 43.870077676395354,
          "lon": 10.249906182289124
        },
        {
          "lat": 43.870112481900094,
          "lon": 10.249884724617004
        },
        {
          "lat": 43.87016662375594,
          "lon": 10.249873995780945
        },
        {
          "lat": 43.87019369466545,
          "lon": 10.249814987182617
        },
        {
          "lat": 43.87023236737195,
          "lon": 10.249798893928528
        },
        {
          "lat": 43.87026330551911,
          "lon": 10.249788165092468
        },
        {
          "lat": 43.87029424365017,
          "lon": 10.249788165092468
        },
        {
          "lat": 43.87031744723797,
          "lon": 10.24975597858429
        },
        {
          "lat": 43.87035611986417,
          "lon": 10.24972379207611
        },
        {
          "lat": 43.8703947924653,
          "lon": 10.249691605567932
        },
        {
          "lat": 43.87046053582961,
          "lon": 10.249675512313843
        },
        {
          "lat": 43.87049534111077,
          "lon": 10.249664783477783
        },
        {
          "lat": 43.87052627912139,
          "lon": 10.249648690223694
        },
        {
          "lat": 43.870557217115994,
          "lon": 10.249637961387634
        },
        {
          "lat": 43.870595889586625,
          "lon": 10.249616503715515
        },
        {
          "lat": 43.87063842927534,
          "lon": 10.249562859535217
        },
        {
          "lat": 43.870688703413755,
          "lon": 10.249519944190979
        },
        {
          "lat": 43.87073124303624,
          "lon": 10.24949848651886
        },
        {
          "lat": 43.87077764986247,
          "lon": 10.2494877576828
        },
        {
          "lat": 43.87082792388348,
          "lon": 10.249450206756592
        },
        {
          "lat": 43.87088206508944,
          "lon": 10.249423384666443
        },
        {
          "lat": 43.87092847179824,
          "lon": 10.249391198158264
        },
        {
          "lat": 43.870967144027986,
          "lon": 10.249364376068115
        },
        {
          "lat": 43.87100581623264,
          "lon": 10.249342918395996
        },
        {
          "lat": 43.87104448841219,
          "lon": 10.249316096305847
        },
        {
          "lat": 43.87107155892295,
          "lon": 10.249294638633728
        },
        {
          "lat": 43.871114098272166,
          "lon": 10.249273180961609
        },
        {
          "lat": 43.871156637591,
          "lon": 10.24925172328949
        },
        {
          "lat": 43.87119144246566,
          "lon": 10.2492356300354
        },
        {
          "lat": 43.87121851290966,
          "lon": 10.249219536781311
        },
        {
          "lat": 43.87126491935651,
          "lon": 10.249192714691162
        },
        {
          "lat": 43.87129585696766,
          "lon": 10.249155163764954
        },
        {
          "lat": 43.871330661761,
          "lon": 10.249106884002686
        },
        {
          "lat": 43.871380935315514,
          "lon": 10.249085426330566
        },
        {
          "lat": 43.871442810401334,
          "lon": 10.249063968658447
        },
        {
          "lat": 43.87148148229733,
          "lon": 10.249037146568298
        },
        {
          "lat": 43.87151241979606,
          "lon": 10.249021053314209
        },
        {
          "lat": 43.871547224462944,
          "lon": 10.24900496006012
        },
        {
          "lat": 43.87161296655604,
          "lon": 10.248972773551941
        },
        {
          "lat": 43.871663239872426,
          "lon": 10.248929858207703
        },
        {
          "lat": 43.87171351314639,
          "lon": 10.248903036117554
        },
        {
          "lat": 43.871752184866736,
          "lon": 10.248881578445435
        },
        {
          "lat": 43.871806325233074,
          "lon": 10.248870849609375
        },
        {
          "lat": 43.87185659838636,
          "lon": 10.248801112174988
        },
        {
          "lat": 43.87188753569037,
          "lon": 10.248779654502869
        },
        {
          "lat": 43.87191460581819,
          "lon": 10.24875819683075
        },
        {
          "lat": 43.87197261319359,
          "lon": 10.24874746799469
        },
        {
          "lat": 43.87200741759173,
          "lon": 10.24872601032257
        },
        {
          "lat": 43.87204222196954,
          "lon": 10.248704552650452
        },
        {
          "lat": 43.872084760625924,
          "lon": 10.248683094978333
        },
        {
          "lat": 43.872127299251936,
          "lon": 10.248650908470154
        },
        {
          "lat": 43.87217757213446,
          "lon": 10.248607993125916
        },
        {
          "lat": 43.872220110694236,
          "lon": 10.248597264289856
        },
        {
          "lat": 43.872251047809556,
          "lon": 10.248565077781677
        },
        {
          "lat": 43.87230905485746,
          "lon": 10.248538255691528
        },
        {
          "lat": 43.872363194717934,
          "lon": 10.24849534034729
        },
        {
          "lat": 43.87243280303766,
          "lon": 10.248463153839111
        },
        {
          "lat": 43.87248694278569,
          "lon": 10.248436331748962
        },
        {
          "lat": 43.87254494960401,
          "lon": 10.248393416404724
        },
        {
          "lat": 43.87258748790158,
          "lon": 10.248366594314575
        },
        {
          "lat": 43.872664830182956,
          "lon": 10.248329043388367
        },
        {
          "lat": 43.87269576706741,
          "lon": 10.248296856880188
        },
        {
          "lat": 43.8727344381504,
          "lon": 10.248286128044128
        },
        {
          "lat": 43.87280017893391,
          "lon": 10.24824321269989
        },
        {
          "lat": 43.872865919644866,
          "lon": 10.248211026191711
        },
        {
          "lat": 43.87294326156493,
          "lon": 10.248157382011414
        },
        {
          "lat": 43.87298579957815,
          "lon": 10.248146653175354
        },
        {
          "lat": 43.873039938823844,
          "lon": 10.248093008995056
        },
        {
          "lat": 43.87307474259867,
          "lon": 10.248114466667175
        },
        {
          "lat": 43.87308634385242,
          "lon": 10.248178839683533
        },
        {
          "lat": 43.873109546353135,
          "lon": 10.248275399208069
        },
        {
          "lat": 43.87312501468196,
          "lon": 10.248318314552307
        },
        {
          "lat": 43.873140483006736,
          "lon": 10.248366594314575
        },
        {
          "lat": 43.87314821716764,
          "lon": 10.248420238494873
        },
        {
          "lat": 43.87317915380116,
          "lon": 10.2484792470932
        },
        {
          "lat": 43.873190755034585,
          "lon": 10.248522162437439
        },
        {
          "lat": 43.873190755034585,
          "lon": 10.248575806617737
        },
        {
          "lat": 43.87321395749466,
          "lon": 10.248640179634094
        },
        {
          "lat": 43.87324489409407,
          "lon": 10.248693823814392
        },
        {
          "lat": 43.87326809653308,
          "lon": 10.248774290084839
        },
        {
          "lat": 43.87328356482071,
          "lon": 10.248827934265137
        },
        {
          "lat": 43.87329129896303,
          "lon": 10.248940587043762
        },
        {
          "lat": 43.8733377037959,
          "lon": 10.24900496006012
        },
        {
          "lat": 43.873364773265045,
          "lon": 10.249069333076477
        },
        {
          "lat": 43.873387975657366,
          "lon": 10.249117612838745
        },
        {
          "lat": 43.8734034439139,
          "lon": 10.249155163764954
        },
        {
          "lat": 43.87340731097741,
          "lon": 10.249192714691162
        },
        {
          "lat": 43.87342277922894,
          "lon": 10.24924635887146
        },
        {
          "lat": 43.873434380414935,
          "lon": 10.249278545379639
        },
        {
          "lat": 43.87344984865943,
          "lon": 10.249321460723877
        },
        {
          "lat": 43.87346531689989,
          "lon": 10.249385833740234
        },
        {
          "lat": 43.87346531689989,
          "lon": 10.249418020248413
        },
        {
          "lat": 43.873469183959386,
          "lon": 10.249412655830383
        },
        {
          "lat": 43.873476918077614,
          "lon": 10.249466300010681
        }
      ];                    //end vec[id_red] with Red Vehicle positions

      vec[id_green] =[      //green car vector
        {
          "lat": 43.870201429208755,
          "lon": 10.243710279464722
        },
        {
          "lat": 43.87011634917714,
          "lon": 10.24375319480896
        },
        {
          "lat": 43.870039003588474,
          "lon": 10.243785381317139
        },
        {
          "lat": 43.869946188749566,
          "lon": 10.243839025497437
        },
        {
          "lat": 43.86996165789941,
          "lon": 10.243967771530151
        },
        {
          "lat": 43.869992596187075,
          "lon": 10.244085788726807
        },
        {
          "lat": 43.870031269024075,
          "lon": 10.244203805923462
        },
        {
          "lat": 43.870062207275616,
          "lon": 10.244332551956177
        },
        {
          "lat": 43.870100880067426,
          "lon": 10.244450569152832
        },
        {
          "lat": 43.87013181828283,
          "lon": 10.244557857513428
        },
        {
          "lat": 43.87016275648216,
          "lon": 10.244686603546143
        },
        {
          "lat": 43.870201429208755,
          "lon": 10.24476170539856
        },
        {
          "lat": 43.87020916375107,
          "lon": 10.244879722595215
        },
        {
          "lat": 43.87024010191024,
          "lon": 10.24500846862793
        },
        {
          "lat": 43.87028650911893,
          "lon": 10.245115756988525
        },
        {
          "lat": 43.87031744723797,
          "lon": 10.24523377418518
        },
        {
          "lat": 43.87034065081669,
          "lon": 10.245351791381836
        },
        {
          "lat": 43.870371588907624,
          "lon": 10.245469808578491
        },
        {
          "lat": 43.87041799601392,
          "lon": 10.245609283447266
        },
        {
          "lat": 43.8704489340647,
          "lon": 10.245705842971802
        },
        {
          "lat": 43.87047213759225,
          "lon": 10.245780944824219
        },
        {
          "lat": 43.87051081011809,
          "lon": 10.245909690856934
        },
        {
          "lat": 43.870557217115994,
          "lon": 10.246027708053589
        },
        {
          "lat": 43.870580420601385,
          "lon": 10.246145725250244
        },
        {
          "lat": 43.87060362407774,
          "lon": 10.24625301361084
        },
        {
          "lat": 43.87064229651827,
          "lon": 10.246381759643555
        },
        {
          "lat": 43.87068096893368,
          "lon": 10.24647831916809
        },
        {
          "lat": 43.87071964132403,
          "lon": 10.246574878692627
        },
        {
          "lat": 43.87076604815929,
          "lon": 10.246692895889282
        },
        {
          "lat": 43.87078925156341,
          "lon": 10.246810913085938
        },
        {
          "lat": 43.87082018942147,
          "lon": 10.246928930282593
        },
        {
          "lat": 43.87085886172147,
          "lon": 10.247057676315308
        },
        {
          "lat": 43.870897533996384,
          "lon": 10.247164964675903
        },
        {
          "lat": 43.87092847179824,
          "lon": 10.247282981872559
        },
        {
          "lat": 43.870967144027986,
          "lon": 10.247400999069214
        },
        {
          "lat": 43.87099808179371,
          "lon": 10.24751901626587
        },
        {
          "lat": 43.87104448841221,
          "lon": 10.247626304626465
        },
        {
          "lat": 43.87107542613776,
          "lon": 10.24775505065918
        },
        {
          "lat": 43.871106363847275,
          "lon": 10.247862339019775
        },
        {
          "lat": 43.871129567118885,
          "lon": 10.247969627380371
        },
        {
          "lat": 43.871160504800315,
          "lon": 10.248066186904907
        },
        {
          "lat": 43.871206911292305,
          "lon": 10.248205661773682
        },
        {
          "lat": 43.87123784893358,
          "lon": 10.248312950134277
        },
        {
          "lat": 43.87127652096257,
          "lon": 10.248430967330933
        },
        {
          "lat": 43.87130745856771,
          "lon": 10.248559713363647
        },
        {
          "lat": 43.87134613055154,
          "lon": 10.248667001724243
        },
        {
          "lat": 43.871400271286745,
          "lon": 10.248827934265137
        },
        {
          "lat": 43.87142347444392,
          "lon": 10.248935222625732
        },
        {
          "lat": 43.87146214635246,
          "lon": 10.249031782150269
        },
        {
          "lat": 43.871493083861246,
          "lon": 10.249149799346924
        },
        {
          "lat": 43.871524021353956,
          "lon": 10.249267816543579
        },
        {
          "lat": 43.87156269319725,
          "lon": 10.249396562576294
        },
        {
          "lat": 43.87159363065385,
          "lon": 10.24951457977295
        },
        {
          "lat": 43.8716400368086,
          "lon": 10.249621868133545
        },
        {
          "lat": 43.87165550551881,
          "lon": 10.24975061416626
        },
        {
          "lat": 43.87170964597298,
          "lon": 10.249857902526855
        },
        {
          "lat": 43.87174831769585,
          "lon": 10.24998664855957
        },
        {
          "lat": 43.87176378637794,
          "lon": 10.250083208084106
        },
        {
          "lat": 43.87179472373014,
          "lon": 10.250201225280762
        },
        {
          "lat": 43.87184112972831,
          "lon": 10.250319242477417
        },
        {
          "lat": 43.87187980136586,
          "lon": 10.250458717346191
        },
        {
          "lat": 43.87191847297832,
          "lon": 10.250555276870728
        },
        {
          "lat": 43.87193394161627,
          "lon": 10.250641107559204
        },
        {
          "lat": 43.87197261319359,
          "lon": 10.2507483959198
        },
        {
          "lat": 43.87200355043738,
          "lon": 10.250887870788574
        },
        {
          "lat": 43.87205769057535,
          "lon": 10.251059532165527
        },
        {
          "lat": 43.872080893476586,
          "lon": 10.251145362854004
        }
      ];                    //end vec[id_green] with Green Vehicle positions


      console.log("vec[id_black]:" + Object.keys(vec[id_black]).length);    //log can be seen in the browser by Ctrl+Shift+C in the tab Console
      console.log("vec[id_yellow]:" + Object.keys(vec[id_yellow]).length);  //log can be seen in the browser by Ctrl+Shift+C in the tab Console
      console.log("vec[id_blue]:" + Object.keys(vec[id_blue]).length);      //log can be seen in the browser by Ctrl+Shift+C in the tab Console
      console.log("vec[id_red]:" + Object.keys(vec[id_red]).length);        //log can be seen in the browser by Ctrl+Shift+C in the tab Console
      console.log("vec[id_green]:" + Object.keys(vec[id_green]).length);    //log can be seen in the browser by Ctrl+Shift+C in the tab Console


      var update_time = 150;//ms

      ///Function to treat the json with the coordenates
      function updateMap() {         
        setTimeout(function() {
          var angle=0, delta_x=0, delta_y=0, ddist=0;

          //Loop to update vehicles from 1 to 5 [green, red, blue, yellow and black, respectively]
          for(var k=1; k<6; k++){
              //if the vector vec[k] wasn't entirely read:
              if(i[k]<Object.keys(vec[k]).length){
                  //calculating distance between the car and the emergency vehicle
                  var abs_dist = CalcDistance(vec[k][i[k]].lat, vec[k][i[k]].lon, current_position[id_black][1], current_position[id_black][2], EarthRadiusInKilometers);

                  //write this distance from the emergency vehicle in the page
                  if(k!=id_black)
                      document.getElementById("car"+k).innerHTML = (abs_dist*1000);

                  //evaluating difference between next and last position (angle and instantaneus velocity)
                  if(i[k]!=0){
                      delta_x = vec[k][i[k]].lat - current_position[k][1];
                      delta_y = vec[k][i[k]].lon - current_position[k][2];
                      angle = Math.atan2(delta_x,delta_y) * 180 / Math.PI;  //0 = east; 90 = north; 180 = west; -90 = south; -135 = south_west; -45 = south_east; 45 = north_east; 135 = north_west
                      ddist = CalcDistance(current_position[k][1], current_position[k][2], vec[k][i[k]].lat, vec[k][i[k]].lon, EarthRadiusInKilometers);
                      console.log("Vehicle["+k+"]: angle = "+angle.toFixed(2)+" degrees;  dist = "+(ddist*1000).toFixed(2)+" m;  velocity = "+((ddist/update_time)*1e6).toFixed(2)+" m/s = "+((ddist/update_time)*3.6e6).toFixed(2)+" km/h");
                  }

                  //parsing json (w/ latitude and longitude info) and building the msg to be handle in the function updateMarker()
                  msg = k + ";" + vec[k][i[k]].lat + ";" + vec[k][i[k]].lon + ";"+angle+";"+ (abs_dist*1000);

                  //calling function updateMarker()
                  updateMarker(msg);

                  //update the current position saved in the matrix
                  current_position[k][1] = vec[k][i[k]].lat;
                  current_position[k][2] = vec[k][i[k]].lon;

                  //walk to the next position in the vector in json (w/ latitude and longitude info)
                  i[k]++;
              } //end if vec[k]
              console.log("vec["+k+"]: "+i[k]+" of "+Object.keys(vec[k]).length);
          } //end for()
          
          //if it didn't reach the end of the vector return to beggin of the function for the next iteration
          if (i[id_black] < Object.keys(vec[id_black]).length || i[id_yellow] < Object.keys(vec[id_yellow]).length || i[id_blue] < Object.keys(vec[id_blue]).length || i[id_red] < Object.keys(vec[id_red]).length || i[id_green] < Object.keys(vec[id_green]).length) {          
              updateMap();
              console.log('Distance between green and black: ' + CalcDistance(vec[id_black][i[id_black]-1].lat, vec[id_black][i[id_black]-1].lon, vec[id_green][i[id_green]-1].lat, vec[id_green][i[id_green]-1].lon, EarthRadiusInKilometers) + " km");
              console.log('Distance between red and black: ' + CalcDistance(vec[id_black][i[id_black]-1].lat, vec[id_black][i[id_black]-1].lon, vec[id_red][i[id_red]-1].lat, vec[id_red][i[id_red]-1].lon, EarthRadiusInKilometers) + " km");
              console.log('Distance between blue and black: ' + CalcDistance(vec[id_black][i[id_black]-1].lat, vec[id_black][i[id_black]-1].lon, vec[id_blue][i[id_blue]-1].lat, vec[id_blue][i[id_blue]-1].lon, EarthRadiusInKilometers) + " km");
              console.log('Distance between yellow and black: ' + CalcDistance(vec[id_black][i[id_black]-1].lat, vec[id_black][i[id_black]-1].lon, vec[id_yellow][i[id_yellow]-1].lat, vec[id_yellow][i[id_yellow]-1].lon, EarthRadiusInKilometers) + " km");
              console.log(' ');
              //if one vehicle ended, but the others didn't, so repeat the last (to update the distances)
              if(i[id_green]==Object.keys(vec[id_green]).length) i[id_green]--;
              if(i[id_red]==Object.keys(vec[id_red]).length) i[id_red]--;
              if(i[id_blue]==Object.keys(vec[id_blue]).length) i[id_blue]--;
              if(i[id_yellow]==Object.keys(vec[id_yellow]).length) i[id_yellow]--;
              if(i[id_black]==Object.keys(vec[id_black]).length) i[id_black]--;
          }
        }, update_time) //execute the loop every 'update_time' = 150ms

      } //end function updateMap()

      updateMap(); //not so sure why to call the function here again (ask Farid)

  } //end function track()



  ///(if I remember well... the function started with $ will be auto-called, which means that is the) Main function
  $(function() {
    //wsConnect();    //handle the socket [communication with the basestation]
    track();          //handle the positions of the devices [vehicles and pedestrian]
  }); //end of $function()