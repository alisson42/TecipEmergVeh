/*----Global variabels----*/
  var bounds = null;
  var markers_objs = Array();

  lat_pedestrian=43.875437;    //before: 43.71822;
  lng_pedestrian=10.246500;    //before: 10.42504;

  var map = L.map(
          'map', {
          center: [43.87043, 10.249689],
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
  function setObjCardinality(id, cardinality, style) {        //id:= which car      cardinality:= cardinal direction      style:= right now: NOTHING
      switch (cardinality) {
          case 'NORTH':
            if (id == id_green) markers_objs[id].setIcon(green_N);
            else if (id == id_red)  markers_objs[id].setIcon(red_N);
            else if (id == id_blue)  markers_objs[id].setIcon(blue_N);
            else if (id == id_yellow)  markers_objs[id].setIcon(yellow_N);
            else markers_objs[id].setIcon(black_N);
          break;

          case 'NORTH_EAST':
            if (id == id_green) markers_objs[id].setIcon(green_N_E);
            else if (id == id_red)  markers_objs[id].setIcon(red_N_E);
            else if (id == id_blue)  markers_objs[id].setIcon(blue_N_E);
            else if (id == id_yellow)  markers_objs[id].setIcon(yellow_N_E);
            else markers_objs[id].setIcon(black_N_E);
          break;

          case 'EAST':
            if (id == id_green) markers_objs[id].setIcon(green_E);
            else if (id == id_red)  markers_objs[id].setIcon(red_E);
            else if (id == id_blue)  markers_objs[id].setIcon(blue_E);
            else if (id == id_yellow)  markers_objs[id].setIcon(yellow_E);
            else markers_objs[id].setIcon(black_E);
          break;

          case 'SOUTH_EAST':
            if (id == id_green) markers_objs[id].setIcon(green_S_E);
            else if (id == id_red)  markers_objs[id].setIcon(red_S_E);
            else if (id == id_blue)  markers_objs[id].setIcon(blue_S_E);
            else if (id == id_yellow)  markers_objs[id].setIcon(yellow_S_E);
            else markers_objs[id].setIcon(black_S_E);
          break;

          case 'SOUTH':
            if (id == id_green) markers_objs[id].setIcon(green_S);
            else if (id == id_red)  markers_objs[id].setIcon(red_S);
            else if (id == id_blue)  markers_objs[id].setIcon(blue_S);
            else if (id == id_yellow)  markers_objs[id].setIcon(yellow_S);
            else markers_objs[id].setIcon(black_S);
          break;

          case 'SOUTH_WEST':
            if (id == id_green) markers_objs[id].setIcon(green_S_O);
            else if (id == id_red)  markers_objs[id].setIcon(red_S_O);
            else if (id == id_blue)  markers_objs[id].setIcon(blue_S_O);
            else if (id == id_yellow)  markers_objs[id].setIcon(yellow_S_O);
            else markers_objs[id].setIcon(black_S_O);
          break;

          case 'WEST':
            if (id == id_green) markers_objs[id].setIcon(green_O);
            else if (id == id_red)  markers_objs[id].setIcon(red_O);
            else if (id == id_blue)  markers_objs[id].setIcon(blue_O);
            else if (id == id_yellow)  markers_objs[id].setIcon(yellow_O);
            else markers_objs[id].setIcon(black_O);
          break;

          case 'NORTH_WEST':
            if (id == id_green) markers_objs[id].setIcon(green_N_O);
            else if (id == id_red)  markers_objs[id].setIcon(red_N_O);
            else if (id == id_blue)  markers_objs[id].setIcon(blue_N_O);
            else if (id == id_yellow)  markers_objs[id].setIcon(yellow_N_O);
            else markers_objs[id].setIcon(black_N_O);
          break;
      } //end switch (cardinality)
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
              console.log('Vehicle['+ id +']: ' + lat + ',' + lng + ',' + cardinality + ' at ' + distance + 'm');
              if (distance > 25) {
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
                  .setLatLng([lat_pedestrian, lng_pedestrian]) 
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

      let vec5 = [          //vector with the coordanate points of the Emergency Vehicle (black) running the 'Via Vittorio Veneto' in Viareggio
        {
          "lat": 43.86643845535094,
          "lon": 10.252121686935425
        },
        {
          "lat": 43.86720035104697,
          "lon": 10.251654982566833
        },
        {
          "lat": 43.867749528707016,
          "lon": 10.251333117485046
        },
        {
          "lat": 43.86827162953711,
          "lon": 10.25101125240326
        },
        {
          "lat": 43.869041236495654,
          "lon": 10.250560641288757
        },
        {
          "lat": 43.869567193323974,
          "lon": 10.25022804737091
        },
        {
          "lat": 43.87001579989231,
          "lon": 10.249943733215332
        },
        {
          "lat": 43.8703947924653,
          "lon": 10.249707698822021
        },
        {
          "lat": 43.87092073734928,
          "lon": 10.249391198158264
        },
        {
          "lat": 43.87144667759205,
          "lon": 10.249047875404358
        },
        {
          "lat": 43.87219304070516,
          "lon": 10.248618721961975
        },
        {
          "lat": 43.87305154008436,
          "lon": 10.248087644577026
        },
        {
          "lat": 43.87401056981158,
          "lon": 10.24751901626587
        },
        {
          "lat": 43.87449781287341,
          "lon": 10.247170329093933
        },
        {
          "lat": 43.87486904300849,
          "lon": 10.246891379356384
        },
        {
          "lat": 43.87543748467105,
          "lon": 10.24649977684021
        }
      ];                    //end vec5 with Emergencial Vehicle positions

      let vec4 = [          //yellow car vector
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
        },
        {
          "lat": 43.86718101371322,
          "lon": 10.251676440238953
        }
      ];                    //end vec4 with Yellow Vehicle positions

      let vec3 = [          //blue car vector
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
      ];                    //end vec3 with Blue Vehicle positions

      let vec2 = [          //red car vector
        {
          "lat": 43.87348078513635,
          "lon": 10.249450206756592
        },
        {
          "lat": 43.87306314134262,
          "lon": 10.248098373413086
        },
        {
          "lat": 43.87038319068759,
          "lon": 10.249707698822021
        },
        {
          "lat": 43.873415045103684,
          "lon": 10.24925172328949
        },
        {
          "lat": 43.873399576850154,
          "lon": 10.249208807945251
        },
        {
          "lat": 43.87339184272187,
          "lon": 10.249160528182983
        },
        {
          "lat": 43.8733841085926,
          "lon": 10.249117612838745
        },
        {
          "lat": 43.87337637446231,
          "lon": 10.249074697494507
        },
        {
          "lat": 43.873360906198755,
          "lon": 10.249026417732239
        },
        {
          "lat": 43.8733377037959,
          "lon": 10.24900496006012
        },
        {
          "lat": 43.87332610259107,
          "lon": 10.248962044715881
        },
        {
          "lat": 43.873306767244685,
          "lon": 10.248908400535583
        },
        {
          "lat": 43.87328356482071,
          "lon": 10.248854756355286
        },
        {
          "lat": 43.87328356482071,
          "lon": 10.248822569847107
        },
        {
          "lat": 43.873260362387754,
          "lon": 10.24872601032257
        },
        {
          "lat": 43.87324489409407,
          "lon": 10.248661637306213
        },
        {
          "lat": 43.87321395749466,
          "lon": 10.248607993125916
        },
        {
          "lat": 43.87320235626574,
          "lon": 10.248565077781677
        },
        {
          "lat": 43.873186887957026,
          "lon": 10.248522162437439
        },
        {
          "lat": 43.873175286722834,
          "lon": 10.248463153839111
        },
        {
          "lat": 43.87316368548641,
          "lon": 10.248420238494873
        },
        {
          "lat": 43.87314821716764,
          "lon": 10.248345136642456
        },
        {
          "lat": 43.87312501468196,
          "lon": 10.248275399208069
        },
        {
          "lat": 43.87310567927031,
          "lon": 10.24823784828186
        },
        {
          "lat": 43.873090210936496,
          "lon": 10.248189568519592
        },
        {
          "lat": 43.87307087551355,
          "lon": 10.248162746429443
        },
        {
          "lat": 43.873039938823844,
          "lon": 10.248109102249146
        },
        {
          "lat": 43.873016736296,
          "lon": 10.248130559921265
        },
        {
          "lat": 43.872958729936876,
          "lon": 10.248141288757324
        },
        {
          "lat": 43.87293939447128,
          "lon": 10.248168110847473
        },
        {
          "lat": 43.87288525513428,
          "lon": 10.248211026191711
        },
        {
          "lat": 43.87280791313895,
          "lon": 10.24824321269989
        },
        {
          "lat": 43.8727731092083,
          "lon": 10.24826467037201
        },
        {
          "lat": 43.87271510261206,
          "lon": 10.248312950134277
        },
        {
          "lat": 43.872664830182956,
          "lon": 10.248345136642456
        },
        {
          "lat": 43.872626159054825,
          "lon": 10.248361229896545
        },
        {
          "lat": 43.87257588655071,
          "lon": 10.248393416404724
        },
        {
          "lat": 43.872541082484574,
          "lon": 10.248414874076843
        },
        {
          "lat": 43.87249854415387,
          "lon": 10.248430967330933
        },
        {
          "lat": 43.87246374004257,
          "lon": 10.248463153839111
        },
        {
          "lat": 43.87241346740146,
          "lon": 10.24848997592926
        },
        {
          "lat": 43.872382530370444,
          "lon": 10.24850606918335
        },
        {
          "lat": 43.872351593323394,
          "lon": 10.24851679801941
        },
        {
          "lat": 43.87233225766081,
          "lon": 10.248543620109558
        },
        {
          "lat": 43.87231292199199,
          "lon": 10.248565077781677
        },
        {
          "lat": 43.87228198490879,
          "lon": 10.248597264289856
        },
        {
          "lat": 43.872258782085844,
          "lon": 10.248591899871826
        },
        {
          "lat": 43.872208509271836,
          "lon": 10.248629450798035
        },
        {
          "lat": 43.87217757213446,
          "lon": 10.248640179634094
        },
        {
          "lat": 43.87215436927088,
          "lon": 10.248645544052124
        },
        {
          "lat": 43.87207702632702,
          "lon": 10.248699188232422
        },
        {
          "lat": 43.87205382342428,
          "lon": 10.248704552650452
        },
        {
          "lat": 43.87201901905324,
          "lon": 10.24873673915863
        },
        {
          "lat": 43.87199194897284,
          "lon": 10.24874746799469
        },
        {
          "lat": 43.87192620729779,
          "lon": 10.248768925666809
        },
        {
          "lat": 43.87189527001386,
          "lon": 10.248801112174988
        },
        {
          "lat": 43.87187206704036,
          "lon": 10.248827934265137
        },
        {
          "lat": 43.871806325233074,
          "lon": 10.248860120773315
        },
        {
          "lat": 43.8717869893936,
          "lon": 10.248876214027405
        },
        {
          "lat": 43.87175991920781,
          "lon": 10.248897671699524
        },
        {
          "lat": 43.871725114665125,
          "lon": 10.248924493789673
        },
        {
          "lat": 43.87165550551881,
          "lon": 10.248972773551941
        },
        {
          "lat": 43.8715665603802,
          "lon": 10.24899959564209
        },
        {
          "lat": 43.8715278885394,
          "lon": 10.24901568889618
        },
        {
          "lat": 43.87150081823591,
          "lon": 10.249026417732239
        },
        {
          "lat": 43.87146601354193,
          "lon": 10.249058604240417
        },
        {
          "lat": 43.87141574005919,
          "lon": 10.249085426330566
        },
        {
          "lat": 43.871396404093,
          "lon": 10.249112248420715
        },
        {
          "lat": 43.87136933372979,
          "lon": 10.249122977256775
        },
        {
          "lat": 43.87134613055154,
          "lon": 10.249144434928894
        },
        {
          "lat": 43.87131519296647,
          "lon": 10.249160528182983
        },
        {
          "lat": 43.87126491935651,
          "lon": 10.249192714691162
        },
        {
          "lat": 43.871214645704136,
          "lon": 10.249208807945251
        },
        {
          "lat": 43.87119144246566,
          "lon": 10.249208807945251
        },
        {
          "lat": 43.871160504800315,
          "lon": 10.24924635887146
        },
        {
          "lat": 43.87112183269603,
          "lon": 10.24926245212555
        },
        {
          "lat": 43.871098629421425,
          "lon": 10.249289274215698
        },
        {
          "lat": 43.87107155892295,
          "lon": 10.249310731887817
        },
        {
          "lat": 43.87102901954338,
          "lon": 10.249342918395996
        },
        {
          "lat": 43.87099808179371,
          "lon": 10.249359011650085
        },
        {
          "lat": 43.87096327680615,
          "lon": 10.249380469322205
        },
        {
          "lat": 43.870916870124425,
          "lon": 10.249407291412354
        },
        {
          "lat": 43.87089366677002,
          "lon": 10.249418020248413
        },
        {
          "lat": 43.870851127263485,
          "lon": 10.249428749084473
        },
        {
          "lat": 43.870804720494455,
          "lon": 10.249466300010681
        },
        {
          "lat": 43.870750579218225,
          "lon": 10.24950385093689
        },
        {
          "lat": 43.870692570653425,
          "lon": 10.249546766281128
        },
        {
          "lat": 43.87059975683229,
          "lon": 10.249584317207336
        },
        {
          "lat": 43.870557217115994,
          "lon": 10.249605774879456
        },
        {
          "lat": 43.8705301463716,
          "lon": 10.249637961387634
        },
        {
          "lat": 43.87050694286664,
          "lon": 10.249648690223694
        },
        {
          "lat": 43.8704876066056,
          "lon": 10.249664783477783
        },
        {
          "lat": 43.8704489340647,
          "lon": 10.249702334403992
        },
        {
          "lat": 43.870363854386405,
          "lon": 10.24972379207611
        },
        {
          "lat": 43.87032131450171,
          "lon": 10.249777436256409
        },
        {
          "lat": 43.87026717278636,
          "lon": 10.249788165092468
        },
        {
          "lat": 43.870228500102435,
          "lon": 10.249809622764587
        },
        {
          "lat": 43.87015115465931,
          "lon": 10.249841809272766
        },
        {
          "lat": 43.870120216453934,
          "lon": 10.249868631362915
        },
        {
          "lat": 43.870081543674665,
          "lon": 10.249895453453064
        },
        {
          "lat": 43.87004287087028,
          "lon": 10.249916911125183
        },
        {
          "lat": 43.87000419804081,
          "lon": 10.249954462051392
        },
        {
          "lat": 43.869953923324985,
          "lon": 10.24999737739563
        },
        {
          "lat": 43.86991138314771,
          "lon": 10.250018835067749
        },
        {
          "lat": 43.86987657752554,
          "lon": 10.250029563903809
        },
        {
          "lat": 43.86981470081369,
          "lon": 10.250067114830017
        },
        {
          "lat": 43.86977216053705,
          "lon": 10.250088572502136
        },
        {
          "lat": 43.86974122213496,
          "lon": 10.250120759010315
        },
        {
          "lat": 43.86967934528259,
          "lon": 10.250158309936523
        },
        {
          "lat": 43.86965614144643,
          "lon": 10.250163674354553
        },
        {
          "lat": 43.86960973374692,
          "lon": 10.250195860862732
        },
        {
          "lat": 43.86956332601128,
          "lon": 10.250217318534851
        },
        {
          "lat": 43.86952078555523,
          "lon": 10.25023877620697
        },
        {
          "lat": 43.86948984702266,
          "lon": 10.25024950504303
        },
        {
          "lat": 43.86943957187298,
          "lon": 10.250303149223328
        },
        {
          "lat": 43.86938542935667,
          "lon": 10.250313878059387
        },
        {
          "lat": 43.86935449075382,
          "lon": 10.250346064567566
        },
        {
          "lat": 43.86929261349999,
          "lon": 10.250372886657715
        },
        {
          "lat": 43.86926167484897,
          "lon": 10.250399708747864
        },
        {
          "lat": 43.86920753217106,
          "lon": 10.250442624092102
        },
        {
          "lat": 43.86917659347587,
          "lon": 10.250464081764221
        },
        {
          "lat": 43.86913405274378,
          "lon": 10.25049090385437
        },
        {
          "lat": 43.86901416506274,
          "lon": 10.250566005706787
        },
        {
          "lat": 43.8689213486279,
          "lon": 10.250608921051025
        },
        {
          "lat": 43.86889427714053,
          "lon": 10.250651836395264
        },
        {
          "lat": 43.868813062604595,
          "lon": 10.250694751739502
        },
        {
          "lat": 43.86876278688405,
          "lon": 10.25072693824768
        },
        {
          "lat": 43.86871251112108,
          "lon": 10.25075376033783
        },
        {
          "lat": 43.86861582684238,
          "lon": 10.250785946846008
        },
        {
          "lat": 43.868592622592125,
          "lon": 10.250834226608276
        },
        {
          "lat": 43.868495938118926,
          "lon": 10.250844955444336
        },
        {
          "lat": 43.868565550955445,
          "lon": 10.250834226608276
        },
        {
          "lat": 43.86846499905439,
          "lon": 10.250898599624634
        },
        {
          "lat": 43.868434059973794,
          "lon": 10.250887870788574
        },
        {
          "lat": 43.86839151871172,
          "lon": 10.250941514968872
        },
        {
          "lat": 43.868306436096525,
          "lon": 10.25098979473114
        },
        {
          "lat": 43.86823682295739,
          "lon": 10.251021981239319
        },
        {
          "lat": 43.868159474929676,
          "lon": 10.251091718673706
        },
        {
          "lat": 43.8680898616189,
          "lon": 10.251118540763855
        },
        {
          "lat": 43.86805118752224,
          "lon": 10.251123905181885
        },
        {
          "lat": 43.86802024822683,
          "lon": 10.251161456108093
        },
        {
          "lat": 43.867962237004654,
          "lon": 10.251193642616272
        },
        {
          "lat": 43.867911960566445,
          "lon": 10.2512526512146
        },
        {
          "lat": 43.86786941893176,
          "lon": 10.25125801563263
        },
        {
          "lat": 43.87342277922894,
          "lon": 10.249283909797668
        },
        {
          "lat": 43.87343051335317,
          "lon": 10.249332189559937
        },
        {
          "lat": 43.87344984865943,
          "lon": 10.249396562576294
        },
        {
          "lat": 43.873461449840164,
          "lon": 10.249439477920532
        }
      ];                    //end vec2 with Red Vehicle positions

      let vec1 =[          //green car vector
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
      ];                    //end vec1 with Green Vehicle positions



      let i=[0,0,0,0,0,0];                                //initialize pointer of the vector vec5
      

      console.log("vec5:" + Object.keys(vec5).length);    //log can be seen in the browser by Ctrl+Shift+C in the tab Console
      console.log("vec4:" + Object.keys(vec4).length);    //log can be seen in the browser by Ctrl+Shift+C in the tab Console
      console.log("vec3:" + Object.keys(vec3).length);    //log can be seen in the browser by Ctrl+Shift+C in the tab Console
      console.log("vec2:" + Object.keys(vec2).length);    //log can be seen in the browser by Ctrl+Shift+C in the tab Console
      console.log("vec1:" + Object.keys(vec1).length);    //log can be seen in the browser by Ctrl+Shift+C in the tab Console


      ///Function to treat the json with the coordenates
      function updateMap() {         
        setTimeout(function() {
          var angle=0, delta_x=0, delta_y=0, ddist=0;

          //if the vector vec5 wasn't entirely read:
          if(i[id_black]<Object.keys(vec5).length){
              //calculating distance between the car and the pedestrian [useless! just an e.g.]
              var abs_dist = CalcDistance(vec5[i[id_black]].lat, vec5[i[id_black]].lon, lat_pedestrian, lng_pedestrian, EarthRadiusInKilometers);

              //evaluating difference between next and last position (angle and instantaneus velocity)
              if(i[id_black]!=0){
                  delta_x = vec5[i[id_black]].lat - current_position[id_black][1];
                  delta_y = vec5[i[id_black]].lon - current_position[id_black][2];
                  angle = Math.atan2(delta_x,delta_y) * 180 / Math.PI;  //0 = east; 90 = north; 180 = west; -90 = south; -135 = south_west; -45 = south_east; 45 = north_east; 135 = north_west
                  ddist = CalcDistance(current_position[id_black][1], current_position[id_black][2], vec5[i[id_black]].lat, vec5[i[id_black]].lon, EarthRadiusInKilometers);
                  console.log("BLACK: dx="+delta_x+";  dy="+delta_y+";  angle="+angle+" degrees;  dist="+ddist+" km");
              }

              //parsing json (w/ latitude and longitude info) and building the msg to be handle in the function updateMarker()
              msg1 = id_black + ";" + vec5[i[id_black]].lat + ";" + vec5[i[id_black]].lon + ";NORTH_WEST;"+ abs_dist;   //change: instead of "NORTH_WEST" inform the 'angle'

              //calling function updateMarker()
              updateMarker(msg1);

              //update the current position saved in the matrix
              current_position[id_black][1] = vec5[i[id_black]].lat;
              current_position[id_black][2] = vec5[i[id_black]].lon;

              //walk to the next position in the vector in json (w/ latitude and longitude info)
              i[id_black]++;
          }//end if vec5

          //the same as for the IF above, but for vec4
          if(i[id_yellow]<Object.keys(vec4).length){
            var abs_dist = CalcDistance(vec5[i[id_black]-1].lat, vec5[i[id_black]-1].lon, vec4[i[id_yellow]].lat, vec4[i[id_yellow]].lon, EarthRadiusInKilometers); // just an e.g. (calculating the absolute distance between the car and the Emergency Vehicle)
            if(i[id_yellow]!=0){
                delta_x = vec4[i[id_yellow]].lat - current_position[id_yellow][1]; delta_y = vec4[i[id_yellow]].lon - current_position[id_yellow][2]; angle = Math.atan2(delta_x,delta_y) * 180 / Math.PI;
                ddist = CalcDistance(current_position[id_yellow][1], current_position[id_yellow][2], vec4[i[id_yellow]].lat, vec4[i[id_yellow]].lon, EarthRadiusInKilometers);
                console.log("YELLOW: dx="+delta_x+";  dy="+delta_y+";  angle="+angle+" degrees;  dist="+ddist+" km");
            }
            msg2 = id_yellow + ";" + vec4[i[id_yellow]].lat + ";" + vec4[i[id_yellow]].lon + ";SOUTH_EAST;"+ abs_dist;
            updateMarker(msg2);
            current_position[id_yellow][1] = vec4[i[id_yellow]].lat;
            current_position[id_yellow][2] = vec4[i[id_yellow]].lon;
            i[id_yellow]++;
          }//end if vec4

          //the same as for the IF above, but for vec3
          if(i[id_blue]<Object.keys(vec3).length){
            var abs_dist = CalcDistance(vec5[i[id_black]-1].lat, vec5[i[id_black]-1].lon, vec3[i[id_blue]].lat, vec3[i[id_blue]].lon, EarthRadiusInKilometers); // just an e.g. (calculating the absolute distance between the car and the Emergency Vehicle)
            if(i[id_blue]!=0){
                delta_x = vec3[i[id_blue]].lat - current_position[id_blue][1]; delta_y = vec3[i[id_blue]].lon - current_position[id_blue][2]; angle = Math.atan2(delta_x,delta_y) * 180 / Math.PI;
                ddist = CalcDistance(current_position[id_blue][1], current_position[id_blue][2], vec3[i[id_blue]].lat, vec3[i[id_blue]].lon, EarthRadiusInKilometers);
                console.log("BLUE: dx="+delta_x+";  dy="+delta_y+";  angle="+angle+" degrees;  dist="+ddist+" km");
            }
            msg2 = id_blue + ";" + vec3[i[id_blue]].lat + ";" + vec3[i[id_blue]].lon + ";WEST;"+ abs_dist;
            updateMarker(msg2);
            current_position[id_blue][1] = vec3[i[id_blue]].lat;
            current_position[id_blue][2] = vec3[i[id_blue]].lon;
            i[id_blue]++;
          }//end if vec3

          //the same as for the IF above, but for vec2
          if(i[id_red]<Object.keys(vec2).length){
            var abs_dist = CalcDistance(vec5[i[id_black]-1].lat, vec5[i[id_black]-1].lon, vec2[i[id_red]].lat, vec2[i[id_red]].lon, EarthRadiusInKilometers); // just an e.g. (calculating the absolute distance between the car and the Emergency Vehicle)
            if(i[id_red]!=0){
                delta_x = vec2[i[id_red]].lat - current_position[id_red][1]; delta_y = vec2[i[id_red]].lon - current_position[id_red][2]; angle = Math.atan2(delta_x,delta_y) * 180 / Math.PI;
                ddist = CalcDistance(current_position[id_red][1], current_position[id_red][2], vec2[i[id_red]].lat, vec2[i[id_red]].lon, EarthRadiusInKilometers);
                console.log("RED: dx="+delta_x+";  dy="+delta_y+";  angle="+angle+" degrees;  dist="+ddist+" km");
            }
            msg2 = id_red + ";" + vec2[i[id_red]].lat + ";" + vec2[i[id_red]].lon + ";NORTH_WEST;"+ abs_dist;
            updateMarker(msg2);
            current_position[id_red][1] = vec2[i[id_red]].lat;
            current_position[id_red][2] = vec2[i[id_red]].lon;
            i[id_red]++;
          }//end if vec2

          //the same as for the IF above, but for vec1
          if(i[id_green]<Object.keys(vec1).length){
            var abs_dist = CalcDistance(vec5[i[id_black]-1].lat, vec5[i[id_black]-1].lon, vec1[i[id_green]].lat, vec1[i[id_green]].lon, EarthRadiusInKilometers); // just an e.g. (calculating the absolute distance between the car and the Emergency Vehicle)
            if(i[id_green]!=0){
                delta_x = vec1[i[id_green]].lat - current_position[id_green][1]; delta_y = vec1[i[id_green]].lon - current_position[id_green][2]; angle = Math.atan2(delta_x,delta_y) * 180 / Math.PI;
                ddist = CalcDistance(current_position[id_green][1], current_position[id_green][2], vec1[i[id_green]].lat, vec1[i[id_green]].lon, EarthRadiusInKilometers);
                console.log("GREEN: dx="+delta_x+";  dy="+delta_y+";  angle="+angle+" degrees;  dist="+ddist+" km");
            }
            msg2 = id_green + ";" + vec1[i[id_green]].lat + ";" + vec1[i[id_green]].lon + ";EAST;"+ abs_dist;
            updateMarker(msg2);
            current_position[id_green][1] = vec1[i[id_green]].lat;
            current_position[id_green][2] = vec1[i[id_green]].lon;
            i[id_green]++;
          }//end if vec1

          console.log("vec5: "+i[id_black]+" of "+Object.keys(vec5).length);
          console.log("vec4: "+i[id_yellow]+" of "+Object.keys(vec4).length);
          console.log("vec3: "+i[id_blue]+" of "+Object.keys(vec3).length);
          console.log("vec2: "+i[id_red]+" of "+Object.keys(vec2).length);
          console.log("vec1: "+i[id_green]+" of "+Object.keys(vec1).length);
          
          //if it didn't reach the end of the vector return to beggin of the function for the next iteration
          if (i[id_black] < Object.keys(vec5).length || i[id_yellow] < Object.keys(vec4).length || i[id_blue] < Object.keys(vec3).length || i[id_red] < Object.keys(vec2).length || i[id_green] < Object.keys(vec1).length) {          
              updateMap();
              console.log('Distance between green and black: ' + CalcDistance(vec5[i[id_black]-1].lat, vec5[i[id_black]-1].lon, vec1[i[id_green]-1].lat, vec1[i[id_green]-1].lon, EarthRadiusInKilometers) + " km");
              console.log('Distance between red and black: ' + CalcDistance(vec5[i[id_black]-1].lat, vec5[i[id_black]-1].lon, vec2[i[id_red]-1].lat, vec2[i[id_red]-1].lon, EarthRadiusInKilometers) + " km");
              console.log('Distance between blue and black: ' + CalcDistance(vec5[i[id_black]-1].lat, vec5[i[id_black]-1].lon, vec3[i[id_blue]-1].lat, vec3[i[id_blue]-1].lon, EarthRadiusInKilometers) + " km");
              console.log('Distance between yellow and black: ' + CalcDistance(vec5[i[id_black]-1].lat, vec5[i[id_black]-1].lon, vec4[i[id_yellow]-1].lat, vec4[i[id_yellow]-1].lon, EarthRadiusInKilometers) + " km");
              console.log(' ');
          }
        }, 150) //execute the loop every 150ms

      } //end function updateMap()

      updateMap(); //not so sure why to call the function here again (ask Farid)

  } //end function track()



  ///(if I remember well... the function started with $ will be auto-called, which means that is the) Main function
  $(function() {
    //wsConnect();    //handle the socket [communication with the basestation]
    track();          //handle the positions of the devices [vehicles and pedestrian]
  }); //end of $function()