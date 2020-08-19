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
  function CalcDistance(lat1, lng1, lat2, lng2, radius) { 
    return radius * 2 * Math.asin( Math.min(1, Math.sqrt( ( Math.pow(Math.sin( (lat2 - lat1) / 2.0), 2.0) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((lng2 - lng1) / 2.0), 2.0) ) ) ) );
  }; //end function CalcDistance()


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

      let vec1 = [          //vector with the coordanate points of the Emergency Vehicle (black) running the 'Via Vittorio Veneto' in Viareggio
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
      ];                    //end vec1 with Emergencial Vehicle positions

      let vec2 = [          //green car vector
        {
          "lat": 43.87197261319359,
          "lon": 10.250802040100098
        },
        {
          "lat": 43.87191460581819,
          "lon": 10.250598192214966
        },
        {
          "lat": 43.87185659838636,
          "lon": 10.250405073165894
        },
        {
          "lat": 43.871802458065694,
          "lon": 10.250217318534851
        },
        {
          "lat": 43.87174445052467,
          "lon": 10.250024199485779
        },
        {
          "lat": 43.87168644292722,
          "lon": 10.249825716018677
        },
        {
          "lat": 43.87162843527328,
          "lon": 10.249637961387634
        },
        {
          "lat": 43.8715704275629,
          "lon": 10.249460935592651
        },
        {
          "lat": 43.87151241979606,
          "lon": 10.24926245212555
        },
        {
          "lat": 43.87145441197276,
          "lon": 10.249069333076477
        },
        {
          "lat": 43.87140413848023,
          "lon": 10.248886942863464
        },
        {
          "lat": 43.871342263354286,
          "lon": 10.248709917068481
        },
        {
          "lat": 43.87129198976715,
          "lon": 10.24850606918335
        },
        {
          "lat": 43.87123784893358,
          "lon": 10.248323678970337
        },
        {
          "lat": 43.871175973635,
          "lon": 10.248130559921265
        },
        {
          "lat": 43.871114098272166,
          "lon": 10.247937440872192
        },
        {
          "lat": 43.871067691707886,
          "lon": 10.24774432182312
        },
        {
          "lat": 43.871001949013305,
          "lon": 10.247540473937988
        },
        {
          "lat": 43.87094780791625,
          "lon": 10.247347354888916
        },
        {
          "lat": 43.87089366677002,
          "lon": 10.247170329093933
        },
        {
          "lat": 43.8708395255746,
          "lon": 10.24697721004486
        },
        {
          "lat": 43.87078151709639,
          "lon": 10.246794819831848
        },
        {
          "lat": 43.87072737579909,
          "lon": 10.246607065200806
        },
        {
          "lat": 43.8706693672117,
          "lon": 10.246424674987793
        },
        {
          "lat": 43.87060362407774,
          "lon": 10.246210098266602
        },
        {
          "lat": 43.87053788087124,
          "lon": 10.24601697921753
        },
        {
          "lat": 43.870445066809225,
          "lon": 10.245673656463623
        },
        {
          "lat": 43.87046053582961,
          "lon": 10.24574339389801
        },
        {
          "lat": 43.870387057947084,
          "lon": 10.24548053741455
        },
        {
          "lat": 43.87032131450171,
          "lon": 10.24526059627533
        },
        {
          "lat": 43.87027104005338,
          "lon": 10.245094299316406
        },
        {
          "lat": 43.87022463283267,
          "lon": 10.244922637939453
        },
        {
          "lat": 43.8703367835542,
          "lon": 10.244879722595215
        },
        {
          "lat": 43.87037932342785,
          "lon": 10.244858264923096
        },
        {
          "lat": 43.8703947924653,
          "lon": 10.244852900505066
        },
        {
          "lat": 43.87043733229755,
          "lon": 10.244842171669006
        },
        {
          "lat": 43.8705417481207,
          "lon": 10.244793891906738
        }
      ];                    //end vec2 with Green Vehicle positions



      var i = 0;                                          //initialize pointer of the vector vec1
      var j = 0;                                          //initialize pointer of the vector vec2

      console.log("vec1:" + Object.keys(vec1).length);    //log can be seen in the browser by Ctrl+Shift+C in the tab Console
      console.log("vec2:" + Object.keys(vec2).length);    //log can be seen in the browser by Ctrl+Shift+C in the tab Console


      ///Function to treat the json with the coordenates
      function updateMap() {         
        setTimeout(function() {
          var angle=0, delta_x=0, delta_y=0, ddist=0;

          //if the vector vec1 wasn't entirely read:
          if(i<Object.keys(vec1).length){
              //calculating distance between the car and the pedestrian [useless! just an e.g.]
              var abs_dist = CalcDistance(vec1[i].lat, vec1[i].lon, lat_pedestrian, lng_pedestrian, EarthRadiusInKilometers);

              //evaluating difference between next and last position (angle and instantaneus velocity)
              if(i!=0){
                  delta_x = vec1[i].lat - current_position[id_black][1];
                  delta_y = vec1[i].lon - current_position[id_black][2];
                  angle = Math.atan2(delta_x,delta_y) * 180 / Math.PI;  //0 = east; 90 = north; 180 = west; -90 = south; -135 = south_west; -45 = south_east; 45 = north_east; 135 = north_west
                  ddist = CalcDistance(current_position[id_black][1], current_position[id_black][2], vec1[i].lat, vec1[i].lon, EarthRadiusInKilometers);
                  console.log("BLACK: dx="+delta_x+";  dy="+delta_y+";  angle="+angle+" degrees;  dist="+ddist+" km");
              }

              //parsing json (w/ latitude and longitude info) and building the msg to be handle in the function updateMarker()
              msg1 = id_black + ";" + vec1[i].lat + ";" + vec1[i].lon + ";NORTH_WEST;"+ abs_dist;   //change: instead of "NORTH_WEST" inform the 'angle'

              //calling function updateMarker()
              updateMarker(msg1);

              //update the current position saved in the matrix
              current_position[id_black][1] = vec1[i].lat;
              current_position[id_black][2] = vec1[i].lon;

              //walk to the next position in the vector in json (w/ latitude and longitude info)
              i++;
          }//end if vec1

          //the same as for the IF above, but for vec2
          if(j<Object.keys(vec2).length){
            var abs_dist = CalcDistance(vec1[i-1].lat, vec1[i-1].lon, vec2[j].lat, vec2[j].lon, EarthRadiusInKilometers); // just an e.g. (calculating the absolute distance between the car and the Emergency Vehicle)
            if(j!=0){
                delta_x = vec2[j].lat - current_position[id_green][1]; delta_y = vec2[j].lon - current_position[id_green][2]; angle = Math.atan2(delta_x,delta_y) * 180 / Math.PI;
                ddist = CalcDistance(current_position[id_green][1], current_position[id_green][2], vec2[j].lat, vec2[j].lon, EarthRadiusInKilometers);
                console.log("GREEN: dx="+delta_x+";  dy="+delta_y+";  angle="+angle+" degrees;  dist="+ddist+" km");
            }
            msg2 = id_green + ";" + vec2[j].lat + ";" + vec2[j].lon + ";WEST;"+ abs_dist;
            updateMarker(msg2);
            current_position[id_green][1] = vec2[j].lat;
            current_position[id_green][2] = vec2[j].lon;
            j++;
          }//end if vec2

          console.log("vec1: "+i+" of "+Object.keys(vec1).length);
          console.log("vec2: "+j+" of "+Object.keys(vec2).length);
          
          //if it didn't reach the end of the vector return to beggin of the function for the next iteration
          if (i < Object.keys(vec1).length || j < Object.keys(vec2).length) {          
              updateMap();
              console.log('Distance between the cars: ' + CalcDistance(vec1[i-1].lat, vec1[i-1].lon, vec2[j-1].lat, vec2[j-1].lon, EarthRadiusInKilometers) + " km");            
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
