/*----Global variabels----*/
  var bounds = null;
  var markers_objs = Array();

  var map = L.map(
          'map', {
          center: [45.63770222435542, 8.79731297492981],
          zoom: 19,
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

  var emergencyIcon = new carIcon({ iconUrl: 'icons/RedSirenFlashing.png' });

  const id_green = 1;
  const id_red = 2;
  const id_blue = 3;
  const id_yellow = 4;
  const id_emergency = 5;

  const EarthRadiusInMiles = 3956.0;
  const EarthRadiusInKilometers = 6367.0;
  const kmToMiles = 0.621371192;

  var current_position = [];
/*----end global variabels----*/

  // Function to select (by id) 'arrow icon' to represent the car in the map
  function setObjCardinality(id, cardinality, style) {          //id:= which car      cardinality:= angle      style:= (right now: NOTHING)
      if(cardinality >= 67.5 && cardinality < 112.5) {          //90 degrees = NORTH
          if (id == id_green) markers_objs[id].setIcon(green_N);
          else if (id == id_red)  markers_objs[id].setIcon(red_N);
          else if (id == id_blue)  markers_objs[id].setIcon(blue_N);
          else if (id == id_yellow)  markers_objs[id].setIcon(yellow_N);
          else markers_objs[id].setIcon(emergency_N);
      }
      else if(cardinality >= 22.5 && cardinality < 67.5) {      //45 degrees = NORTH_EAST
          if (id == id_green) markers_objs[id].setIcon(green_N_E);
          else if (id == id_red)  markers_objs[id].setIcon(red_N_E);
          else if (id == id_blue)  markers_objs[id].setIcon(blue_N_E);
          else if (id == id_yellow)  markers_objs[id].setIcon(yellow_N_E);
          else markers_objs[id].setIcon(emergency_N_E);
      }
      else if(cardinality >= -22.5 && cardinality < 22.5) {     //0 degrees = EAST
          if (id == id_green) markers_objs[id].setIcon(green_E);
          else if (id == id_red)  markers_objs[id].setIcon(red_E);
          else if (id == id_blue)  markers_objs[id].setIcon(blue_E);
          else if (id == id_yellow)  markers_objs[id].setIcon(yellow_E);
          else markers_objs[id].setIcon(emergency_E);
      }
      else if(cardinality >= -67.5 && cardinality < -22.5) {    //-45 degrees = SOUTH_EAST
          if (id == id_green) markers_objs[id].setIcon(green_S_E);
          else if (id == id_red)  markers_objs[id].setIcon(red_S_E);
          else if (id == id_blue)  markers_objs[id].setIcon(blue_S_E);
          else if (id == id_yellow)  markers_objs[id].setIcon(yellow_S_E);
          else markers_objs[id].setIcon(emergency_S_E);
      }
      else if(cardinality >= -112.5 && cardinality < -67.5) {   //-90 degrees = SOUTH
          if (id == id_green) markers_objs[id].setIcon(green_S);
          else if (id == id_red)  markers_objs[id].setIcon(red_S);
          else if (id == id_blue)  markers_objs[id].setIcon(blue_S);
          else if (id == id_yellow)  markers_objs[id].setIcon(yellow_S);
          else markers_objs[id].setIcon(emergency_S);
      }
      else if(cardinality >= -157.5 && cardinality < -112.5) {  //-135 degrees = SOUTH_WEST
          if (id == id_green) markers_objs[id].setIcon(green_S_O);
          else if (id == id_red)  markers_objs[id].setIcon(red_S_O);
          else if (id == id_blue)  markers_objs[id].setIcon(blue_S_O);
          else if (id == id_yellow)  markers_objs[id].setIcon(yellow_S_O);
          else markers_objs[id].setIcon(emergency_S_O);
      }
      else if(cardinality >= 112.5 && cardinality < 157.5) {    //135 degrees = NORTH_WEST
            if (id == id_green) markers_objs[id].setIcon(green_N_O);
            else if (id == id_red)  markers_objs[id].setIcon(red_N_O);
            else if (id == id_blue)  markers_objs[id].setIcon(blue_N_O);
            else if (id == id_yellow)  markers_objs[id].setIcon(yellow_N_O);
            else markers_objs[id].setIcon(emergency_N_O);
      }
      else if(cardinality >= 157.5 && cardinality <= 180
          || cardinality >= -180 && cardinality <= -157.5) {    //180 degrees = WEST
          if (id == id_green) markers_objs[id].setIcon(green_O);
          else if (id == id_red)  markers_objs[id].setIcon(red_O);
          else if (id == id_blue)  markers_objs[id].setIcon(blue_O);
          else if (id == id_yellow)  markers_objs[id].setIcon(yellow_O);
          else markers_objs[id].setIcon(emergency_O);
      }

  } //end function setObjCardinality()

  // Function that treats 'data' to allocate the icons in the map    [data_format = id; latitude; longitude; cardinality; distance;]
  function updateMarker(data) {
      values = data.toString().split(";");
      id = parseInt(values[0]);
      lat = parseFloat(values[1]);
      lng = parseFloat(values[2]);
      cardinality = parseFloat(values[3]);
      distance = parseInt(values[4]);
      
      if (markers_objs[id]) {
          markers_objs[id].setLatLng([lat, lng]);
          if (id == id_emergency) {                              // id_emergency
              console.log("Emergency: "+ lat + "," + lng);
              markers_objs[id].setIcon(emergencyIcon);
          } else {                                            // Vehicles
              console.log('Car['+ id +']: ' + lat + ',' + lng + ',' + cardinality + 'o at ' + distance + 'm');
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
                  .setLatLng([current_position[id_emergency][1], current_position[id_emergency][2]]) 
                  .setContent("<b>WARNING</br>" + distance + 'm</b>')
                  .openOn(map)
                  setTimeout(function() {
                    map.closePopup();
                    }, 2000)
              }
          }
      } else {                                                // Not existing objects
          var marker_obj = L.marker([lat, lng], {icon: ((id == id_emergency) ? emergencyIcon : green_N)});
          markers_objs[id] = marker_obj;
          if (id == id_emergency) {
              current_position[id][1] = lat;
              current_position[id][2] = lng;
              console.log('New Emergency: id='+ id + ' at ' + lat + "," + lng);
          } else {
              setObjCardinality(id,  cardinality, 0);
              current_position[id][1] = lat;
              current_position[id][2] = lng;
              console.log('New Car: id=' + id + ' at ' + lat + "," + lng + ',' + cardinality + ' at ' + distance);
          }
          markers_objs[id].addTo(map);
      } // end if/else id
  } //end function updateMarker()



  // Function to calculate the absolute distance between two coordenate points
  
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

  // Function to track the devices (emergency and cars)
  async function track(){

      //creating a matrix 6x3 to hold the current position of the devices
      for(var k=0; k<6; k++){
          current_position[k] = new Array(3);
          current_position[k][0] = k;
      }
      // console.log("matrix: " + current_position);

      let vec = [{},{},{},{},{},{}];
      let i=[0,0,0,0,0,0];  //initialize pointer of the vector vec[]

      vec[id_emergency] = [     //vector with the coordanate points of the Emergency Vehicle (emergency) running the 'Via Vittorio Veneto' in Viareggio
        {
          "lat": 45.63640444505842,
          "lon": 8.800338506698608
        },
        {
          "lat": 45.636524472150676,
          "lon": 8.800381422042847
        },
        {
          "lat": 45.63660699062749,
          "lon": 8.800424337387085
        },
        {
          "lat": 45.63668950898281,
          "lon": 8.800445795059204
        },
        {
          "lat": 45.63673451894358,
          "lon": 8.80029559135437
        },
        {
          "lat": 45.636779528868175,
          "lon": 8.800166845321655
        },
        {
          "lat": 45.63680953546451,
          "lon": 8.80003809928894
        },
        {
          "lat": 45.636869548608935,
          "lon": 8.799866437911987
        },
        {
          "lat": 45.6369145584251,
          "lon": 8.799684047698975
        },
        {
          "lat": 45.63697457145706,
          "lon": 8.7995445728302
        },
        {
          "lat": 45.63703458442475,
          "lon": 8.799405097961426
        },
        {
          "lat": 45.63706459088447,
          "lon": 8.799265623092651
        },
        {
          "lat": 45.637109600543965,
          "lon": 8.799136877059937
        },
        {
          "lat": 45.63716961336706,
          "lon": 8.798986673355103
        },
        {
          "lat": 45.637192118159135,
          "lon": 8.798836469650269
        },
        {
          "lat": 45.637259632481175,
          "lon": 8.798686265945435
        },
        {
          "lat": 45.637319645143556,
          "lon": 8.7985360622406
        },
        {
          "lat": 45.63733464829913,
          "lon": 8.798396587371826
        },
        {
          "lat": 45.637387159311935,
          "lon": 8.798257112503052
        },
        {
          "lat": 45.63742466714809,
          "lon": 8.798085451126099
        },
        {
          "lat": 45.637499682745116,
          "lon": 8.797924518585205
        },
        {
          "lat": 45.637529688955816,
          "lon": 8.79778504371643
        },
        {
          "lat": 45.63756719669655,
          "lon": 8.797667026519775
        },
        {
          "lat": 45.637619707491446,
          "lon": 8.797484636306763
        },
        {
          "lat": 45.63770222435542,
          "lon": 8.79731297492981
        },
        {
          "lat": 45.63775473502378,
          "lon": 8.797141313552856
        },
        {
          "lat": 45.63781474715592,
          "lon": 8.796948194503784
        },
        {
          "lat": 45.63786725771882,
          "lon": 8.796776533126831
        },
        {
          "lat": 45.6379347712274,
          "lon": 8.7965726852417
        },
        {
          "lat": 45.637994783166725,
          "lon": 8.796358108520508
        },
        {
          "lat": 45.6380547950418,
          "lon": 8.796175718307495
        },
        {
          "lat": 45.638114806852585,
          "lon": 8.795918226242065
        },
        {
          "lat": 45.63818232006288,
          "lon": 8.795768022537231
        },
        {
          "lat": 45.63822732882457,
          "lon": 8.79557490348816
        },
        {
          "lat": 45.638287340450574,
          "lon": 8.795371055603027
        },
        {
          "lat": 45.6383473520123,
          "lon": 8.795220851898193
        },
        {
          "lat": 45.63839986207608,
          "lon": 8.795027732849121
        },
        {
          "lat": 45.638444870663015,
          "lon": 8.794877529144287
        },
        {
          "lat": 45.638527386311864,
          "lon": 8.794748783111572
        },
        {
          "lat": 45.63856489338479,
          "lon": 8.794523477554321
        },
        {
          "lat": 45.63865491025738,
          "lon": 8.794373273849487
        },
        {
          "lat": 45.63869991863946,
          "lon": 8.794223070144653
        },
        {
          "lat": 45.63875242837284,
          "lon": 8.7940514087677
        },
        {
          "lat": 45.638789935295165,
          "lon": 8.793901205062866
        },
        {
          "lat": 45.638842444944196,
          "lon": 8.793751001358032
        },
        {
          "lat": 45.638894954544014,
          "lon": 8.793611526489258
        },
        {
          "lat": 45.63894746409463,
          "lon": 8.793450593948364
        },
        {
          "lat": 45.63899247224168,
          "lon": 8.79331111907959
        },
        {
          "lat": 45.63905248304822,
          "lon": 8.793150186538696
        },
        {
          "lat": 45.6391049924512,
          "lon": 8.792978525161743
        },
        {
          "lat": 45.63915000047175,
          "lon": 8.79279613494873
        }
      ];                    //end vec[id_emergency] with Emergencial Vehicle positions

      vec[id_yellow] = [    //yellow car vector
        {
          "lat": 45.63900747494936,
          "lon": 8.793278932571411
        },
        {
          "lat": 45.63899247224168,
          "lon": 8.79332184791565
        },
        {
          "lat": 45.63897746953003,
          "lon": 8.793354034423828
        },
        {
          "lat": 45.63897746953003,
          "lon": 8.793386220932007
        },
        {
          "lat": 45.63895121477493,
          "lon": 8.793450593948364
        },
        {
          "lat": 45.63893621205219,
          "lon": 8.793493509292603
        },
        {
          "lat": 45.638921209325474,
          "lon": 8.793531060218811
        },
        {
          "lat": 45.6389062065947,
          "lon": 8.79356324672699
        },
        {
          "lat": 45.638894954544014,
          "lon": 8.793611526489258
        },
        {
          "lat": 45.638872450435834,
          "lon": 8.793649077415466
        },
        {
          "lat": 45.63886494906441,
          "lon": 8.793691992759705
        },
        {
          "lat": 45.638857447692025,
          "lon": 8.793756365776062
        },
        {
          "lat": 45.63884619563152,
          "lon": 8.7937992811203
        },
        {
          "lat": 45.638823691503745,
          "lon": 8.793847560882568
        },
        {
          "lat": 45.638804938057035,
          "lon": 8.793901205062866
        },
        {
          "lat": 45.638789935295165,
          "lon": 8.793944120407104
        },
        {
          "lat": 45.638774932529245,
          "lon": 8.793987035751343
        },
        {
          "lat": 45.63876368045217,
          "lon": 8.794019222259521
        },
        {
          "lat": 45.63875617906622,
          "lon": 8.7940514087677
        },
        {
          "lat": 45.63873742559692,
          "lon": 8.794094324111938
        },
        {
          "lat": 45.63872992420743,
          "lon": 8.794126510620117
        },
        {
          "lat": 45.63871867212131,
          "lon": 8.794158697128296
        },
        {
          "lat": 45.63870742003297,
          "lon": 8.794206976890564
        },
        {
          "lat": 45.63868866654733,
          "lon": 8.794244527816772
        },
        {
          "lat": 45.63867366375431,
          "lon": 8.794282078742981
        },
        {
          "lat": 45.63866991305544,
          "lon": 8.79430890083313
        },
        {
          "lat": 45.638651159557256,
          "lon": 8.794357180595398
        },
        {
          "lat": 45.63863990745535,
          "lon": 8.794394731521606
        },
        {
          "lat": 45.638632406052814,
          "lon": 8.794421553611755
        },
        {
          "lat": 45.63860615113601,
          "lon": 8.794480562210083
        },
        {
          "lat": 45.638602400432625,
          "lon": 8.794518113136292
        },
        {
          "lat": 45.638587397616504,
          "lon": 8.79456102848053
        },
        {
          "lat": 45.63857239479636,
          "lon": 8.794609308242798
        },
        {
          "lat": 45.63854238914404,
          "lon": 8.794668316841125
        },
        {
          "lat": 45.63852363560319,
          "lon": 8.794716596603394
        },
        {
          "lat": 45.638504882056054,
          "lon": 8.794759511947632
        },
        {
          "lat": 45.63848987921382,
          "lon": 8.7948077917099
        },
        {
          "lat": 45.63847862707951,
          "lon": 8.794850707054138
        },
        {
          "lat": 45.638463624230255,
          "lon": 8.794893622398376
        },
        {
          "lat": 45.63844111994882,
          "lon": 8.794957995414734
        },
        {
          "lat": 45.63842611708952,
          "lon": 8.794995546340942
        },
        {
          "lat": 45.638407363509764,
          "lon": 8.79503846168518
        },
        {
          "lat": 45.63840361279305,
          "lon": 8.79507064819336
        },
        {
          "lat": 45.638384859205736,
          "lon": 8.795113563537598
        },
        {
          "lat": 45.63837735776907,
          "lon": 8.795145750045776
        },
        {
          "lat": 45.6383623548927,
          "lon": 8.795204758644104
        },
        {
          "lat": 45.63833985057061,
          "lon": 8.795258402824402
        },
        {
          "lat": 45.638313595516735,
          "lon": 8.79531741142273
        },
        {
          "lat": 45.63830234334702,
          "lon": 8.795371055603027
        },
        {
          "lat": 45.638294841899295,
          "lon": 8.795430064201355
        },
        {
          "lat": 45.638276088275596,
          "lon": 8.795456886291504
        },
        {
          "lat": 45.638257334645616,
          "lon": 8.795499801635742
        },
        {
          "lat": 45.638242331737075,
          "lon": 8.79554271697998
        },
        {
          "lat": 45.638234830281334,
          "lon": 8.795585632324219
        },
        {
          "lat": 45.638231079553066,
          "lon": 8.795623183250427
        },
        {
          "lat": 45.638216076637555,
          "lon": 8.795660734176636
        },
        {
          "lat": 45.63820857517825,
          "lon": 8.795698285102844
        },
        {
          "lat": 45.63819357225671,
          "lon": 8.795741200447083
        },
        {
          "lat": 45.638178569331124,
          "lon": 8.79578411579132
        },
        {
          "lat": 45.63816356640152,
          "lon": 8.795827031135559
        },
        {
          "lat": 45.6381485634679,
          "lon": 8.795864582061768
        },
        {
          "lat": 45.63814106199958,
          "lon": 8.795902132987976
        },
        {
          "lat": 45.63812605905996,
          "lon": 8.795934319496155
        },
        {
          "lat": 45.63811855758864,
          "lon": 8.795971870422363
        },
        {
          "lat": 45.63809980390591,
          "lon": 8.796014785766602
        },
        {
          "lat": 45.63809605316861,
          "lon": 8.79604160785675
        },
        {
          "lat": 45.63807354873957,
          "lon": 8.796089887619019
        },
        {
          "lat": 45.63804354282011,
          "lon": 8.796132802963257
        },
        {
          "lat": 45.63803979207905,
          "lon": 8.796175718307495
        },
        {
          "lat": 45.63802103836998,
          "lon": 8.796218633651733
        },
        {
          "lat": 45.63800603539821,
          "lon": 8.796272277832031
        },
        {
          "lat": 45.63800228465463,
          "lon": 8.7963205575943
        },
        {
          "lat": 45.637994783166725,
          "lon": 8.796363472938538
        },
        {
          "lat": 45.63797978018793,
          "lon": 8.796395659446716
        },
        {
          "lat": 45.63797227869703,
          "lon": 8.796427845954895
        },
        {
          "lat": 45.63796102645877,
          "lon": 8.796460032463074
        },
        {
          "lat": 45.6379347712274,
          "lon": 8.796519041061401
        },
        {
          "lat": 45.63792726973046,
          "lon": 8.79656732082367
        },
        {
          "lat": 45.63790851598374,
          "lon": 8.796626329421997
        },
        {
          "lat": 45.637897263732675,
          "lon": 8.796674609184265
        },
        {
          "lat": 45.6378747592238,
          "lon": 8.796717524528503
        },
        {
          "lat": 45.63786350696597,
          "lon": 8.796771168708801
        },
        {
          "lat": 45.637852254705884,
          "lon": 8.79680335521698
        },
        {
          "lat": 45.63783725168893,
          "lon": 8.796846270561218
        },
        {
          "lat": 45.63782599942355,
          "lon": 8.796889185905457
        },
        {
          "lat": 45.63780724564293,
          "lon": 8.796948194503784
        },
        {
          "lat": 45.63779599337155,
          "lon": 8.797007203102112
        },
        {
          "lat": 45.637777239580856,
          "lon": 8.79706621170044
        },
        {
          "lat": 45.63775473502378,
          "lon": 8.797125220298767
        },
        {
          "lat": 45.637739731980695,
          "lon": 8.797162771224976
        },
        {
          "lat": 45.637728479695745,
          "lon": 8.797189593315125
        },
        {
          "lat": 45.637679719768194,
          "lon": 8.797184228897095
        },
        {
          "lat": 45.63764971363785,
          "lon": 8.797173500061035
        },
        {
          "lat": 45.63760095364178,
          "lon": 8.797162771224976
        },
        {
          "lat": 45.63755969515043,
          "lon": 8.797146677970886
        },
        {
          "lat": 45.637529688955816,
          "lon": 8.797119855880737
        },
        {
          "lat": 45.637492181189934,
          "lon": 8.797093033790588
        },
        {
          "lat": 45.637473427297564,
          "lon": 8.797087669372559
        },
        {
          "lat": 45.637443421056766,
          "lon": 8.79707157611847
        },
        {
          "lat": 45.63742466714809,
          "lon": 8.79706084728241
        },
        {
          "lat": 45.63736840538443,
          "lon": 8.797028660774231
        },
        {
          "lat": 45.637345900663135,
          "lon": 8.797007203102112
        },
        {
          "lat": 45.637319645143556,
          "lon": 8.796991109848022
        },
        {
          "lat": 45.637293389611656,
          "lon": 8.796975016593933
        },
        {
          "lat": 45.63727088486024,
          "lon": 8.796964287757874
        },
        {
          "lat": 45.63724838009981,
          "lon": 8.796948194503784
        },
        {
          "lat": 45.63722587533033,
          "lon": 8.796937465667725
        },
        {
          "lat": 45.63718836736108,
          "lon": 8.796926736831665
        },
        {
          "lat": 45.63715461016731,
          "lon": 8.796916007995605
        },
        {
          "lat": 45.63712460375578,
          "lon": 8.796899914741516
        },
        {
          "lat": 45.63709084652359,
          "lon": 8.796883821487427
        },
        {
          "lat": 45.637060840077915,
          "lon": 8.796862363815308
        },
        {
          "lat": 45.6370233319982,
          "lon": 8.796851634979248
        }
      ];                    //end vec[id_yellow] with Yellow Vehicle positions

      vec[id_blue] = [      //blue car vector
        {
          "lat": 45.63951756461961,
          "lon": 8.798670172691345
        },
        {
          "lat": 45.63948755947343,
          "lon": 8.798654079437256
        },
        {
          "lat": 45.63946130495732,
          "lon": 8.798648715019226
        },
        {
          "lat": 45.63943505042893,
          "lon": 8.798637986183167
        },
        {
          "lat": 45.63941629718685,
          "lon": 8.798627257347107
        },
        {
          "lat": 45.63939754393848,
          "lon": 8.798616528511047
        },
        {
          "lat": 45.63937879068385,
          "lon": 8.798605799674988
        },
        {
          "lat": 45.63934503480966,
          "lon": 8.798584342002869
        },
        {
          "lat": 45.63930377760249,
          "lon": 8.79856824874878
        },
        {
          "lat": 45.639281273658504,
          "lon": 8.79856288433075
        },
        {
          "lat": 45.63925126838576,
          "lon": 8.79853069782257
        },
        {
          "lat": 45.63921001110957,
          "lon": 8.798509240150452
        },
        {
          "lat": 45.639180005798686,
          "lon": 8.798498511314392
        },
        {
          "lat": 45.639153751138515,
          "lon": 8.798487782478333
        },
        {
          "lat": 45.639127496466,
          "lon": 8.798477053642273
        },
        {
          "lat": 45.63909749111095,
          "lon": 8.798455595970154
        },
        {
          "lat": 45.63907123641208,
          "lon": 8.798439502716064
        },
        {
          "lat": 45.63905248304822,
          "lon": 8.798428773880005
        },
        {
          "lat": 45.639033729678104,
          "lon": 8.798423409461975
        },
        {
          "lat": 45.639014976301674,
          "lon": 8.798418045043945
        },
        {
          "lat": 45.63899247224168,
          "lon": 8.798396587371826
        },
        {
          "lat": 45.638966217493625,
          "lon": 8.798385858535767
        },
        {
          "lat": 45.638943713414065,
          "lon": 8.798380494117737
        },
        {
          "lat": 45.6389137079606,
          "lon": 8.798364400863647
        },
        {
          "lat": 45.63888745317562,
          "lon": 8.798353672027588
        },
        {
          "lat": 45.63886494906441,
          "lon": 8.798348307609558
        },
        {
          "lat": 45.63883494356875,
          "lon": 8.798332214355469
        },
        {
          "lat": 45.638804938057035,
          "lon": 8.79831075668335
        },
        {
          "lat": 45.638782433912695,
          "lon": 8.79830002784729
        },
        {
          "lat": 45.638759929759324,
          "lon": 8.79828929901123
        },
        {
          "lat": 45.63873742559692,
          "lon": 8.798278570175171
        },
        {
          "lat": 45.63871117072935,
          "lon": 8.798273205757141
        },
        {
          "lat": 45.63868866654733,
          "lon": 8.798246383666992
        },
        {
          "lat": 45.63866991305544,
          "lon": 8.798224925994873
        },
        {
          "lat": 45.63864365815621,
          "lon": 8.798214197158813
        },
        {
          "lat": 45.638613652542084,
          "lon": 8.798203468322754
        },
        {
          "lat": 45.63856864409069,
          "lon": 8.798182010650635
        },
        {
          "lat": 45.63853863843636,
          "lon": 8.798165917396545
        },
        {
          "lat": 45.63851238347564,
          "lon": 8.798139095306396
        },
        {
          "lat": 45.638486128502635,
          "lon": 8.798128366470337
        },
        {
          "lat": 45.63845612280413,
          "lon": 8.798117637634277
        },
        {
          "lat": 45.63842236637408,
          "lon": 8.798106908798218
        },
        {
          "lat": 45.638384859205736,
          "lon": 8.798085451126099
        },
        {
          "lat": 45.63835110273276,
          "lon": 8.798074722290039
        },
        {
          "lat": 45.63833234912789,
          "lon": 8.798074722290039
        },
        {
          "lat": 45.63829109117505,
          "lon": 8.79805326461792
        },
        {
          "lat": 45.63826483609835,
          "lon": 8.79804253578186
        },
        {
          "lat": 45.638242331737075,
          "lon": 8.7980318069458
        },
        {
          "lat": 45.63821232590804,
          "lon": 8.7980318069458
        },
        {
          "lat": 45.638186070794404,
          "lon": 8.798010349273682
        },
        {
          "lat": 45.63816731713429,
          "lon": 8.797978162765503
        },
        {
          "lat": 45.63813356053028,
          "lon": 8.797967433929443
        },
        {
          "lat": 45.63809605316861,
          "lon": 8.797956705093384
        },
        {
          "lat": 45.63805854578185,
          "lon": 8.797924518585205
        },
        {
          "lat": 45.63800978614152,
          "lon": 8.797913789749146
        },
        {
          "lat": 45.63797227869703,
          "lon": 8.797881603240967
        },
        {
          "lat": 45.63794977421827,
          "lon": 8.797865509986877
        },
        {
          "lat": 45.637904765233635,
          "lon": 8.797854781150818
        },
        {
          "lat": 45.63786725771882,
          "lon": 8.797844052314758
        },
        {
          "lat": 45.63784100244353,
          "lon": 8.79780650138855
        },
        {
          "lat": 45.63781474715592,
          "lon": 8.79779577255249
        },
        {
          "lat": 45.637784741097896,
          "lon": 8.79778504371643
        },
        {
          "lat": 45.63776223654382,
          "lon": 8.797774314880371
        },
        {
          "lat": 45.637739731980695,
          "lon": 8.797763586044312
        },
        {
          "lat": 45.63770972588249,
          "lon": 8.797742128372192
        },
        {
          "lat": 45.637687221298286,
          "lon": 8.797731399536133
        },
        {
          "lat": 45.63765346440502,
          "lon": 8.797720670700073
        },
        {
          "lat": 45.63762345826063,
          "lon": 8.797709941864014
        },
        {
          "lat": 45.63760095364178,
          "lon": 8.797699213027954
        },
        {
          "lat": 45.63757469824171,
          "lon": 8.797688484191895
        },
        {
          "lat": 45.63755594437698,
          "lon": 8.797667026519775
        },
        {
          "lat": 45.63752218740463,
          "lon": 8.797645568847656
        },
        {
          "lat": 45.637492181189934,
          "lon": 8.797634840011597
        },
        {
          "lat": 45.63746967651836,
          "lon": 8.797624111175537
        },
        {
          "lat": 45.637447171837756,
          "lon": 8.797613382339478
        },
        {
          "lat": 45.63741716558286,
          "lon": 8.797597289085388
        },
        {
          "lat": 45.637394660881185,
          "lon": 8.797581195831299
        },
        {
          "lat": 45.63736465459817,
          "lon": 8.797581195831299
        },
        {
          "lat": 45.63733464829913,
          "lon": 8.79755973815918
        },
        {
          "lat": 45.63731214356428,
          "lon": 8.79754364490509
        },
        {
          "lat": 45.637293389611656,
          "lon": 8.797527551651001
        },
        {
          "lat": 45.63726713406747,
          "lon": 8.797516822814941
        },
        {
          "lat": 45.637229626125844,
          "lon": 8.797506093978882
        },
        {
          "lat": 45.637192118159135,
          "lon": 8.797490000724792
        },
        {
          "lat": 45.63714710856592,
          "lon": 8.797452449798584
        },
        {
          "lat": 45.63712085295319,
          "lon": 8.797447085380554
        },
        {
          "lat": 45.63709834813251,
          "lon": 8.797447085380554
        },
        {
          "lat": 45.63707209249693,
          "lon": 8.797430992126465
        },
        {
          "lat": 45.6370420860412,
          "lon": 8.797414898872375
        },
        {
          "lat": 45.63700457794894,
          "lon": 8.797393441200256
        },
        {
          "lat": 45.63697082064444,
          "lon": 8.797371983528137
        },
        {
          "lat": 45.636929561689115,
          "lon": 8.797350525856018
        },
        {
          "lat": 45.636895804339424,
          "lon": 8.797339797019958
        },
        {
          "lat": 45.63683204040119,
          "lon": 8.79731833934784
        },
        {
          "lat": 45.63676077473732,
          "lon": 8.79728615283966
        },
        {
          "lat": 45.63673826977202,
          "lon": 8.797264695167542
        },
        {
          "lat": 45.63671951562734,
          "lon": 8.797253966331482
        },
        {
          "lat": 45.63668950898281,
          "lon": 8.797243237495422
        },
        {
          "lat": 45.63667075482183,
          "lon": 8.797232508659363
        },
        {
          "lat": 45.63663699731622,
          "lon": 8.797216415405273
        },
        {
          "lat": 45.6366144923012,
          "lon": 8.797205686569214
        },
        {
          "lat": 45.636580734761694,
          "lon": 8.797184228897095
        }
      ];                    //end vec[id_blue] with Blue Vehicle positions

      vec[id_red] = [       //red car vector
        {
          "lat": 45.63714710856592,
          "lon": 8.79906713962555
        },
        {
          "lat": 45.63715836096761,
          "lon": 8.799018859863281
        },
        {
          "lat": 45.63716586256749,
          "lon": 8.798970580101013
        },
        {
          "lat": 45.637192118159135,
          "lon": 8.798927664756775
        },
        {
          "lat": 45.637195868956944,
          "lon": 8.798879384994507
        },
        {
          "lat": 45.63720337055179,
          "lon": 8.798831105232239
        },
        {
          "lat": 45.63722587533033,
          "lon": 8.798788189888
        },
        {
          "lat": 45.63724462930552,
          "lon": 8.798734545707703
        },
        {
          "lat": 45.63726338327445,
          "lon": 8.798680901527405
        },
        {
          "lat": 45.63728588802887,
          "lon": 8.798621892929077
        },
        {
          "lat": 45.637297140402694,
          "lon": 8.79856824874878
        },
        {
          "lat": 45.637319645143556,
          "lon": 8.798525333404541
        },
        {
          "lat": 45.63733464829913,
          "lon": 8.798471689224243
        },
        {
          "lat": 45.63734214987538,
          "lon": 8.798423409461975
        },
        {
          "lat": 45.63736465459817,
          "lon": 8.798385858535767
        },
        {
          "lat": 45.63737965774166,
          "lon": 8.798326849937439
        },
        {
          "lat": 45.6373984116654,
          "lon": 8.798278570175171
        },
        {
          "lat": 45.63740216244942,
          "lon": 8.798235654830933
        },
        {
          "lat": 45.63741716558286,
          "lon": 8.798176646232605
        },
        {
          "lat": 45.63742466714809,
          "lon": 8.798133730888367
        },
        {
          "lat": 45.63745092261846,
          "lon": 8.798074722290039
        },
        {
          "lat": 45.63746967651836,
          "lon": 8.7980318069458
        },
        {
          "lat": 45.63746967651836,
          "lon": 8.797983527183533
        },
        {
          "lat": 45.637492181189934,
          "lon": 8.797935247421265
        },
        {
          "lat": 45.637514685852445,
          "lon": 8.797886967658997
        },
        {
          "lat": 45.637529688955816,
          "lon": 8.797838687896729
        },
        {
          "lat": 45.63754469205511,
          "lon": 8.79780113697052
        },
        {
          "lat": 45.63755219360326,
          "lon": 8.797758221626282
        },
        {
          "lat": 45.637563445923604,
          "lon": 8.797704577445984
        },
        {
          "lat": 45.63758595055752,
          "lon": 8.797661662101746
        },
        {
          "lat": 45.637593452100155,
          "lon": 8.797602653503418
        },
        {
          "lat": 45.637604704412205,
          "lon": 8.79755973815918
        },
        {
          "lat": 45.63763095979823,
          "lon": 8.797522187232971
        },
        {
          "lat": 45.63765346440502,
          "lon": 8.797473907470703
        },
        {
          "lat": 45.63766471670506,
          "lon": 8.797420263290405
        },
        {
          "lat": 45.637672218237135,
          "lon": 8.797371983528137
        },
        {
          "lat": 45.637698473591534,
          "lon": 8.797334432601929
        },
        {
          "lat": 45.63771722740856,
          "lon": 8.79728615283966
        },
        {
          "lat": 45.637720978171195,
          "lon": 8.797237873077393
        },
        {
          "lat": 45.6377359812193,
          "lon": 8.797189593315125
        },
        {
          "lat": 45.63774723350274,
          "lon": 8.797146677970886
        },
        {
          "lat": 45.63775473502378,
          "lon": 8.797103762626648
        },
        {
          "lat": 45.63776973806284,
          "lon": 8.79706621170044
        },
        {
          "lat": 45.637784741097896,
          "lon": 8.797017931938171
        },
        {
          "lat": 45.637803494886036,
          "lon": 8.796958923339844
        },
        {
          "lat": 45.63782224866792,
          "lon": 8.796916007995605
        },
        {
          "lat": 45.63782975017891,
          "lon": 8.796856999397278
        },
        {
          "lat": 45.637852254705884,
          "lon": 8.79679799079895
        },
        {
          "lat": 45.637871008471436,
          "lon": 8.796744346618652
        },
        {
          "lat": 45.63788601147938,
          "lon": 8.796701431274414
        },
        {
          "lat": 45.63790851598374,
          "lon": 8.796647787094116
        },
        {
          "lat": 45.63792351898163,
          "lon": 8.796594142913818
        },
        {
          "lat": 45.637938521975485,
          "lon": 8.79655122756958
        },
        {
          "lat": 45.63794977421827,
          "lon": 8.796508312225342
        },
        {
          "lat": 45.63796852795118,
          "lon": 8.796449303627014
        },
        {
          "lat": 45.63798353093299,
          "lon": 8.796395659446716
        },
        {
          "lat": 45.637991032422406,
          "lon": 8.796352744102478
        },
        {
          "lat": 45.63800228465463,
          "lon": 8.79630446434021
        },
        {
          "lat": 45.638028539854375,
          "lon": 8.796250820159912
        },
        {
          "lat": 45.63806229652167,
          "lon": 8.796234726905823
        },
        {
          "lat": 45.63811105611628,
          "lon": 8.796261548995972
        },
        {
          "lat": 45.6381485634679,
          "lon": 8.796272277832031
        },
        {
          "lat": 45.638178569331124,
          "lon": 8.79628837108612
        },
        {
          "lat": 45.638216076637555,
          "lon": 8.79629909992218
        },
        {
          "lat": 45.638246082464605,
          "lon": 8.7963205575943
        },
        {
          "lat": 45.63827983900084,
          "lon": 8.796352744102478
        },
        {
          "lat": 45.638313595516735,
          "lon": 8.796368837356567
        },
        {
          "lat": 45.63835110273276,
          "lon": 8.796384930610657
        },
        {
          "lat": 45.63838860992372,
          "lon": 8.796401023864746
        },
        {
          "lat": 45.63843361851969,
          "lon": 8.796411752700806
        },
        {
          "lat": 45.63847112565539,
          "lon": 8.796449303627014
        },
        {
          "lat": 45.638504882056054,
          "lon": 8.796460032463074
        },
        {
          "lat": 45.63853113702029,
          "lon": 8.796481490135193
        },
        {
          "lat": 45.63857239479636,
          "lon": 8.796502947807312
        },
        {
          "lat": 45.638613652542084,
          "lon": 8.796524405479431
        },
        {
          "lat": 45.638651159557256,
          "lon": 8.79654586315155
        },
        {
          "lat": 45.638677414452935,
          "lon": 8.79655659198761
        },
        {
          "lat": 45.63871867212131,
          "lon": 8.796578049659729
        },
        {
          "lat": 45.63874867767925,
          "lon": 8.796594142913818
        },
        {
          "lat": 45.638786184604044,
          "lon": 8.796610236167908
        },
        {
          "lat": 45.63881994081489,
          "lon": 8.796642422676086
        },
        {
          "lat": 45.63886119837833,
          "lon": 8.796658515930176
        }
      ];                    //end vec[id_red] with Red Vehicle positions

      vec[id_green] =[      //green car vector
        {
          "lat": 45.63623565652492,
          "lon": 8.796401023864746
        },
        {
          "lat": 45.63627316513186,
          "lon": 8.796438574790955
        },
        {
          "lat": 45.636321926283316,
          "lon": 8.796465396881104
        },
        {
          "lat": 45.63636693653935,
          "lon": 8.796486854553223
        },
        {
          "lat": 45.63640444505842,
          "lon": 8.796508312225342
        },
        {
          "lat": 45.636441953552364,
          "lon": 8.796519041061401
        },
        {
          "lat": 45.63648321286671,
          "lon": 8.79654586315155
        },
        {
          "lat": 45.636524472150676,
          "lon": 8.7965726852417
        },
        {
          "lat": 45.63655822972407,
          "lon": 8.796594142913818
        },
        {
          "lat": 45.63659198727714,
          "lon": 8.796615600585938
        },
        {
          "lat": 45.63663324648101,
          "lon": 8.796637058258057
        },
        {
          "lat": 45.63667075482183,
          "lon": 8.796658515930176
        },
        {
          "lat": 45.63671576479763,
          "lon": 8.796674609184265
        },
        {
          "lat": 45.63675702391038,
          "lon": 8.796701431274414
        },
        {
          "lat": 45.63680203381691,
          "lon": 8.796733617782593
        },
        {
          "lat": 45.636847043687325,
          "lon": 8.796749711036682
        },
        {
          "lat": 45.63688830270338,
          "lon": 8.796765804290771
        },
        {
          "lat": 45.636929561689115,
          "lon": 8.79678726196289
        },
        {
          "lat": 45.63697082064444,
          "lon": 8.79680871963501
        },
        {
          "lat": 45.63701207956939,
          "lon": 8.796840906143188
        },
        {
          "lat": 45.63706459088447,
          "lon": 8.796856999397278
        },
        {
          "lat": 45.637094597328165,
          "lon": 8.796873092651367
        },
        {
          "lat": 45.63712085295319,
          "lon": 8.796889185905457
        },
        {
          "lat": 45.63715836096761,
          "lon": 8.796905279159546
        },
        {
          "lat": 45.637192118159135,
          "lon": 8.796916007995605
        },
        {
          "lat": 45.637229626125844,
          "lon": 8.796932101249695
        },
        {
          "lat": 45.63727088486024,
          "lon": 8.796969652175903
        },
        {
          "lat": 45.63730464198398,
          "lon": 8.796975016593933
        },
        {
          "lat": 45.63734214987538,
          "lon": 8.796996474266052
        },
        {
          "lat": 45.63737965774166,
          "lon": 8.797012567520142
        },
        {
          "lat": 45.63741341479989,
          "lon": 8.79703938961029
        },
        {
          "lat": 45.637447171837756,
          "lon": 8.79705011844635
        },
        {
          "lat": 45.637477178076544,
          "lon": 8.79706621170044
        },
        {
          "lat": 45.63750343352231,
          "lon": 8.797093033790588
        },
        {
          "lat": 45.63753719050595,
          "lon": 8.797103762626648
        },
        {
          "lat": 45.63757469824171,
          "lon": 8.797109127044678
        },
        {
          "lat": 45.63761220595235,
          "lon": 8.797125220298767
        },
        {
          "lat": 45.63764221210277,
          "lon": 8.797146677970886
        },
        {
          "lat": 45.637672218237135,
          "lon": 8.797173500061035
        },
        {
          "lat": 45.63770972588249,
          "lon": 8.797194957733154
        },
        {
          "lat": 45.63773223045765,
          "lon": 8.797227144241333
        },
        {
          "lat": 45.63776223654382,
          "lon": 8.797264695167542
        },
        {
          "lat": 45.637803494886036,
          "lon": 8.79729151725769
        },
        {
          "lat": 45.63783725168893,
          "lon": 8.79732370376587
        },
        {
          "lat": 45.63788976223073,
          "lon": 8.797339797019958
        },
        {
          "lat": 45.63793102047906,
          "lon": 8.797361254692078
        },
        {
          "lat": 45.63797227869703,
          "lon": 8.797382712364197
        },
        {
          "lat": 45.63802478911229,
          "lon": 8.797393441200256
        },
        {
          "lat": 45.638069798000515,
          "lon": 8.797414898872375
        },
        {
          "lat": 45.638114806852585,
          "lon": 8.797441720962524
        },
        {
          "lat": 45.6381485634679,
          "lon": 8.797457814216614
        },
        {
          "lat": 45.63819357225671,
          "lon": 8.797490000724792
        },
        {
          "lat": 45.638234830281334,
          "lon": 8.797490000724792
        },
        {
          "lat": 45.638276088275596,
          "lon": 8.797511458396912
        },
        {
          "lat": 45.63831734623948,
          "lon": 8.79753291606903
        },
        {
          "lat": 45.6383473520123,
          "lon": 8.79755973815918
        },
        {
          "lat": 45.63837735776907,
          "lon": 8.797581195831299
        },
        {
          "lat": 45.63842236637408,
          "lon": 8.797597289085388
        },
        {
          "lat": 45.63845612280413,
          "lon": 8.797624111175537
        },
        {
          "lat": 45.63848987921382,
          "lon": 8.797629475593567
        },
        {
          "lat": 45.638527386311864,
          "lon": 8.797661662101746
        },
        {
          "lat": 45.63856489338479,
          "lon": 8.797683119773865
        },
        {
          "lat": 45.63860615113601,
          "lon": 8.797693848609924
        },
        {
          "lat": 45.63864365815621,
          "lon": 8.797715306282043
        },
        {
          "lat": 45.63868116515133,
          "lon": 8.797731399536133
        },
        {
          "lat": 45.63873367490229,
          "lon": 8.797747492790222
        },
        {
          "lat": 45.63875617906622,
          "lon": 8.797758221626282
        },
        {
          "lat": 45.638782433912695,
          "lon": 8.7977796792984
        },
        {
          "lat": 45.638808688746884,
          "lon": 8.7977796792984
        },
        {
          "lat": 45.63883494356875,
          "lon": 8.79780113697052
        },
        {
          "lat": 45.63887995180621,
          "lon": 8.79782259464264
        },
        {
          "lat": 45.63893246137089,
          "lon": 8.797838687896729
        },
        {
          "lat": 45.63896246681431,
          "lon": 8.797876238822937
        }
      ];                    //end vec[id_green] with Green Vehicle positions

/*
      console.log("vec[id_emergency]:" + Object.keys(vec[id_emergency]).length);    //log can be seen in the browser by Ctrl+Shift+C in the tab Console
      console.log("vec[id_yellow]:" + Object.keys(vec[id_yellow]).length);          //log can be seen in the browser by Ctrl+Shift+C in the tab Console
      console.log("vec[id_blue]:" + Object.keys(vec[id_blue]).length);              //log can be seen in the browser by Ctrl+Shift+C in the tab Console
      console.log("vec[id_red]:" + Object.keys(vec[id_red]).length);                //log can be seen in the browser by Ctrl+Shift+C in the tab Console
      console.log("vec[id_green]:" + Object.keys(vec[id_green]).length);            //log can be seen in the browser by Ctrl+Shift+C in the tab Console
*/

      var update_time = 150; // ms

      // Function to treat the json with the coordenates
      function updateMap() {         
        setTimeout(function() {
          var angle=0, delta_x=0, delta_y=0, ddist=0;

          //Loop to update vehicles from 1 to 5 [green, red, blue, yellow and emergency, respectively]
          for(var k=1; k<6; k++){
              //if the vector vec[k] wasn't entirely read:
              if(i[k]<Object.keys(vec[k]).length){

                  //if it is not the emergency vehicle, calculate:
                  if(k!=id_emergency){
                      //calculating distance between the car and the emergency vehicle
                      var abs_dist = CalcDistance(vec[k][i[k]].lat, vec[k][i[k]].lon, current_position[id_emergency][1], current_position[id_emergency][2], EarthRadiusInKilometers);

                      //write this distance from the emergency vehicle in the page
                      document.getElementById("car"+k).innerHTML = (abs_dist*1000);

                      //request from the server infos ("http://193.205.83.99:5000/route/v1/driving/lonA,latA;lonB,latB?steps=true")
                      url_ri = "http://193.205.83.99:5000/route/v1/driving/";
                      url_ra = vec[k][i[k]].lat + "," + vec[k][i[k]].lon + ";";
                      url_rb = vec[id_emergency][i[id_emergency]].lat + "," + vec[id_emergency][i[id_emergency]].lon;
                      url_rl = "?steps=true";
                      url_rq = url_ri + url_ra + url_rb + url_rl;
/*
                      serv_info = wsConnect(url_rq);            //format:  serv_info = "distance ; direction ; tot_distance"
                      //--must wait wsConnect() before continue--//
                      console.log("serv_info: " + serv_info);
                      values = serv_info.toString().split(";");
                      serv_distance = parseFloat(values[0]);
                      serv_direction = parseFloat(values[1]);
                      serv_totdistance = parseFloat(values[2]);
*/
                  }

                  //evaluating difference between next and last position (angle and instantaneous velocity)
                  if(i[k]!=0){
                      delta_x = vec[k][i[k]].lat - current_position[k][1];
                      delta_y = vec[k][i[k]].lon - current_position[k][2];
                      angle = Math.atan2(delta_x,delta_y) * 180 / Math.PI;  //0 = east; 90 = north; 180 = west; -90 = south; -135 = south_west; -45 = south_east; 45 = north_east; 135 = north_west
                      ddist = CalcDistance(current_position[k][1], current_position[k][2], vec[k][i[k]].lat, vec[k][i[k]].lon, EarthRadiusInKilometers);
//                      console.log("Vehicle["+k+"]: angle = "+angle.toFixed(2)+" degrees;  dist = "+(ddist*1000).toFixed(2)+" m;  velocity = "+((ddist/update_time)*1e6).toFixed(2)+" m/s = "+((ddist/update_time)*3.6e6).toFixed(2)+" km/h");
                  }

                  //parsing json (w/ latitude and longitude info) and building the msg to be handle in the function updateMarker()
                  msg = k + ";" + vec[k][i[k]].lat + ";" + vec[k][i[k]].lon + ";"+ angle +";"+ (abs_dist*1000);

                  //calling function updateMarker()
                  updateMarker(msg);

                  //update the current position saved in the matrix
                  current_position[k][1] = vec[k][i[k]].lat;
                  current_position[k][2] = vec[k][i[k]].lon;

                  //walk to the next position in the vector in json (w/ latitude and longitude info)
                  i[k]++;
              } //end if vec[k]
//              console.log("vec["+k+"]: "+i[k]+" of "+Object.keys(vec[k]).length);
          } //end for()
          
          //if it didn't reach the end of the vector return to beggin of the function for the next iteration
          if (i[id_emergency] < Object.keys(vec[id_emergency]).length || i[id_yellow] < Object.keys(vec[id_yellow]).length || i[id_blue] < Object.keys(vec[id_blue]).length || i[id_red] < Object.keys(vec[id_red]).length || i[id_green] < Object.keys(vec[id_green]).length) {          
              updateMap();
/*              console.log('Distance between green and emergency: ' + CalcDistance(vec[id_emergency][i[id_emergency]-1].lat, vec[id_emergency][i[id_emergency]-1].lon, vec[id_green][i[id_green]-1].lat, vec[id_green][i[id_green]-1].lon, EarthRadiusInKilometers) + " km");
              console.log('Distance between red and emergency: ' + CalcDistance(vec[id_emergency][i[id_emergency]-1].lat, vec[id_emergency][i[id_emergency]-1].lon, vec[id_red][i[id_red]-1].lat, vec[id_red][i[id_red]-1].lon, EarthRadiusInKilometers) + " km");
              console.log('Distance between blue and emergency: ' + CalcDistance(vec[id_emergency][i[id_emergency]-1].lat, vec[id_emergency][i[id_emergency]-1].lon, vec[id_blue][i[id_blue]-1].lat, vec[id_blue][i[id_blue]-1].lon, EarthRadiusInKilometers) + " km");
              console.log('Distance between yellow and emergency: ' + CalcDistance(vec[id_emergency][i[id_emergency]-1].lat, vec[id_emergency][i[id_emergency]-1].lon, vec[id_yellow][i[id_yellow]-1].lat, vec[id_yellow][i[id_yellow]-1].lon, EarthRadiusInKilometers) + " km");
*/              console.log(' ');
              //if one car ended, but the others didn't, so repeat the last (to update the distances)
              if(i[id_green]==Object.keys(vec[id_green]).length) i[id_green]--;
              if(i[id_red]==Object.keys(vec[id_red]).length) i[id_red]--;
              if(i[id_blue]==Object.keys(vec[id_blue]).length) i[id_blue]--;
              if(i[id_yellow]==Object.keys(vec[id_yellow]).length) i[id_yellow]--;
              if(i[id_emergency]==Object.keys(vec[id_emergency]).length) i[id_emergency]--;
          }
        }, update_time) //execute the loop every 'update_time' = 150ms

      } //end function updateMap()

      updateMap(); //not so sure why to call the function here again (ask Farid)

  } //end function track()

  
  ///Function to handle the socket
  function wsConnect(url_rq) {
      var xhttp = new XMLHttpRequest();                   //Syntax for creating an XMLHttpRequest object
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          serv_ans = this.responseText;                   //Returns the response data as a string
          //console.log("response: "+ serv_ans);
          var data = JSON.parse(serv_ans);
          console.log("distance: "+ data.routes[0].legs[0].steps[0].distance);
          console.log("direction: "+ data.routes[0].legs[0].steps[1].maneuver.modifier);
          console.log("tot_distance: "+ data.routes[0].legs[0].distance); 
          info = data.routes[0].legs[0].steps[0].distance + ";" + data.routes[0].legs[0].steps[1].maneuver.modifier + ";" + data.routes[0].legs[0].distance;
          console.log("info: " + info);                   //"distance ; direction ; tot_distance"
          return info;
        }
      };
      xhttp.open("GET", url_rq, true);                    //method, url, async
      xhttp.send();                                       //Sends the request to the server
  } //end function weConnect()


  ///(if I remember well... the function started with $ will be auto-called, which means that is the) Main function
  $(function() {
    track();          //handle the positions of the devices [emergency and car]
  }); //end of $function()
  
  