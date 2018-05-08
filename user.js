var arr = [];


var geolocationlat;
var geolocationlong;
var weatherapilatitude;
var weatherapilongitude;

var user = {
    applicantsinfo : {
        name    : "christopher",
        age     : 25,
        address : "binangonan, rizal",
        zipcode : 1940,
        work    :  {
                    sizmek : {
                        position : "creative Developer",
                        companyname : "Sizmek Technologies inc.",
                        location : "8th floor, i2 bldg, Cebu It park, Cebu",
                        year        : "march 2015 - december 2017",
                        logo : "images/sizmek.png",
                    },
    
                    wideout : {
                        position : "jr. flash developer",
                        companyname : "Wide-Out Workforces inc.",
                        location : "Pacific star Bldg, Makati city",
                        year : "December 2014 - January 2015",
                        logo : "images/wideout.png"
                    } 
                }, 
    },  
    userinfo :{ 
        IP : "",
        CITY : "",
        LONG : undefined,
        LAT : undefined,
        COUNTRYCODE : "",
        COUNTRY : "",
        CURRENCY : ""

    },
    //datas
    imgPath : {
            img1 : "images/img1.png",
            img2 : "images/img2.png",
            img3 : "images/img3.png"
           },
    text : {
            headline    : "welcome to my page",
            description : "this is a sample page for my portfolio",
            cta     : "learn more",
            frame1  : "buy 1 get 1 free",
            frame2  : "one stop shop",
            frame3  : "pasok mga suki"
            },
    div: {
            div1 : "div1", 
            div2 : "div2"
            },
    locations: {
                 loc1 : {
                    long : "-33.890542",
                    lat :  "151.274856"
                 },
                 loc2 : {
                    long : "-33.890542",
                    lat :  "151.274856"
                 },
                 loc3 : {
                    long : "-33.890542",
                    lat :  "151.274856"
                 }
    },//
    init : function (){ 
             user.eventlisteners(); 
             //user.geolocation.geolocation();
             user.timedate();
            
             user.mapcreatejavascript();
            
             user.getIPaddress();
           
    },

    eventlisteners: function(){
            var divname0 = document.getElementById("divname0");
            var divname1 = document.getElementById("divname1");
            var divname2 = document.getElementById("divname2");
       
            divname0.addEventListener("click", user.clickhandler);
            divname1.addEventListener("click", user.clickhandler);
            divname2.addEventListener("click", user.clickhandler);
     },

    clickhandler: function(e){ 
        console.log(e.currentTarget.id)
    },

  //it will get first the ip of the visitor of the page, once it gets the ip, 
  //it will call the function user.getLocationUsingIPAddress(); 
  //to find the info about the IP. like city,long,lat,country, 
   getIPaddress : function(){
    console.log("GetIPAddress")

    var path =  "http://api.ipify.org?format=json"; //https://api.ipify.org?format=jsonp or //https://api.ipify.org?format=jsonp&callback=getip or https://api.ipify.org
    $.ajax({
        dataType:   "json",
        url: path,
        data: {},
        method: "GET",
        success: function(e) {
            console.log("GetIPAddress")
            console.log(e)
            console.log(e.ip)
            user.userinfo.IP = e.ip;
            divname1.innerHTML = e.ip;
            user.getLocationUsingIPAddress(); //call this when done getting ip.
        }
    });


},
getLocationUsingIPAddress : function(){
    var path =  "https://ipfind.co/?ip="+user.userinfo.IP;  //if you want accurate location of longitude and latitude - change this to more accurate site.
    //https://api.hackertarget.com/geoip/?q=110.93.87.156
    //my accurate long,lat is = 14.479873, 121.196205
    //isp = https://json.geoiplookup.io/api
    
    //lat: 14.4656, long: 121.1919 = LA Plaza, P. Gomez, Binangonan, Rizal, Philippines  = https://www.latlong.net/Show-Latitude-Longitude.html
        $.ajax({
            dataType:   "json",
            url: path,
            data: {},
            method: "GET",
            success: function(e) {
                console.log(e)
                user.userinfo.CITY        = e.city
                user.userinfo.LONG        = e.longitude;
                user.userinfo.LAT         = e.latitude;
                user.userinfo.COUNTRYCODE = e.country_code;
                user.userinfo.COUNTRY     = e.country;
                user.userinfo.CURRENCY    =e.currency;
                //console.log(user.userinfo.LONG);
                //console.log(user.userinfo.LAT);
                user.weather(); //call this when done long lat OR city,country.
                user.map();     //call this when done getting long and lat
                user.currencyexchangerate(); // call this when done getting the currency
              
            }
        });
    },


    weather : function(){ //this will never be using the exact long and lat, because weather the area of weather is not specific exact location of the user. it covers whole area.

       var apikey = "faebfc71bdff4979";
      // var country = user.userinfo.COUNTRYCODE;
       //var place =  user.userinfo.CITY;
      // var url1 = "http://api.wunderground.com/api/"+apikey+"/conditions/q/"+country+"/"+place+".json"
      var url1 = "http://api.wunderground.com/api/"+apikey+"/conditions/q/"+user.userinfo.LAT+","+user.userinfo.LONG+".json"
       console.log(url1);


        $.ajax({
            dataType:   "json",
            url: url1,
            data: {},
            method: "GET",
            success: function(e) {
                    console.log(e);
                    console.log(e.current_observation)
                  /*  for(var x in e.current_observation){
                        console.log(x)
                    }*/
                   //console.log(e.current_observation.temp_f)
                   //console.log(e.current_observation.temp_c)
                   //console.log(e.current_observation.feelslike_f)
                   //console.log(e.current_observation.feelslike_c)
                   //console.log(e.current_observation.display_location.full)
                   //console.log(e.current_observation.icon)
                   //console.log(e.current_observation.weather)
                   //console.log(e.current_observation.observation_time)
                   //console.log(e.current_observation.icon_url)
             
                   icon.style.backgroundImage = "url("+e.current_observation.icon_url+")";
                   icon.style.height         = "70px";
                   icon.style.width          = "70px";
                   icon.style.backgroundSize = "contain";
                   weather.innerHTML         =                 e.current_observation.weather;
                   tempc.innerHTML           =                 e.current_observation.temp_c + " c";
                   feelslikec.innerHTML      = "FEELS LIKE: " +e.current_observation.feelslike_c + " c";
                   locationfull.innerHTML    =                 e.current_observation.display_location.full;
                   observationtime.innerHTML =                 e.current_observation.observation_time;
                   humidity.innerHTML        = "HUMIDITY: " +  e.current_observation.relative_humidity;
                  // longitude.innerHTML       = "LONGITUDE: " + e.current_observation.display_location.longitude;
                  // latitude.innerHTML        = "LATITUDE: " +  e.current_observation.display_location.latitude;
                   wind.innerHTML            =                 e.current_observation.wind_string;

                   //weatherapilongitude   =  parseInt(e.current_observation.display_location.longitude);
                  // weatherapilatitude    =  parseInt(e.current_observation.display_location.latitude);
               

            }
        })
    },

  


    mapcreatejavascript : function(e){
                var GOOGLE_API_KEY = "AIzaSyBxRq2d5703EdO_1MHRkcRZQqq-JUNOH94"
                var s = document.createElement("script");
                s.type = "text/javascript";
                s.src = "https://maps.googleapis.com/maps/api/js?key="+GOOGLE_API_KEY;
                document.head.appendChild(s);
    },

    map : function(){

                console.log("map")
                //var longlat = new google.maps.LatLng(user.locations[o].lat, locations[o].long)
                var longlat = {lat: user.userinfo.LAT , lng: user.userinfo.LONG};
                var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 8,
                center: longlat
                });
                   
               // for(var o = 0; o < count; o++ ){   
                    var marker = new google.maps.Marker({
                        position: longlat,
                        map: map
                        });
             // }   
                //var count = Object.keys(user.locations).length;
               // console.log(count)
    },
    

    currencyexchangerate : function(){
        console.log("currency function")
        var apikey = "LkniInionwAOIwapoRUhwhk5Y8cczpju"
        var from = "USD";
        var to = "JPY" ; // user.currencyexchangerate();
        var path =  "https://forex.1forge.com/1.0.3/convert?from="+ from +"&to="+ to +"&quantity=100&api_key="+apikey;
        $.ajax({
            dataType:   "json",
            url: path,
            data: {},
            method: "GET",
            success: function(e) {
                console.log(e)
                console.log(e.text)
                currencyexhangerate1.innerHTML = e.text;
            }
        });


    },

/*************************************************this portion doesnt need any data from IP ******************************************8 */

    geolocation : {
        geolocation : function(){
                                            //Geolocation 
            if ("geolocation" in navigator) {
                /* geolocation is available */
                console.log("available")
                console.log(navigator.geolocation)
                console.log(navigator.geolocation.getCurrentPosition(user.geolocation.getCurrentPosition))
               navigator.geolocation.getCurrentPosition(user.geolocation.watchPosition)
              navigator.geolocation.watchPosition(user.geolocation.watchPosition)
               document.getElementById("divname1").innerHTML =  "longtitude: " + geolocationlong;
               document.getElementById("divname2").innerHTML =  "latitude: " + geolocationlat;
            } else {
                /* geolocation IS NOT available */
              }
        },
        getCurrentPosition : function(position){
                console.log("getCurrentPosition")
                console.log(position.coords.latitude, position.coords.longitude);
            
                for ( var j in position.coords){
                    //console.log(j);
                } 

                geolocationlat = position.coords.latitude;
                geolocationlong = position.coords.longitude;
                console.log( position.coords.latitude)
             

        },
        watchPosition : function(position){
            console.log("watchPosition")
             console.log(position.coords.latitude, position.coords.longitude);
            for ( var x in navigator.geolocation){
                //console.log(x)
            }
        }

    },


    timedate : function() {

        var d            = new Date();
        this.day         = d.getDate(); //1-31
        this.month       = d.getMonth(); //0-11
        this.arr1month   = ["January" , "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        this.year        = d.getFullYear();
        this.militaryhour = d.getHours() //0-23 //12 pm, 21 am
        this.minute      = d.getMinutes()  //0-59
        this.seconds     = d.getSeconds() //0-59
        this.millisecond =  d.getMilliseconds() //0-999
        
        this.dayname     = d.getDay(); //0-6
        this.arr1day     = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

        this.ampm = this.militaryhour >= 12 ? 'PM' : 'AM';
        this.militaryhour = this.militaryhour % 12;
        this.militaryhour = this.militaryhour ? this.militaryhour : 12; 
        //d.getTimezoneOffset()
        //d.getUTCHours())
        //console.log(user.timedate().day) for global call //or this.day
        document.getElementById('divname3').innerHTML = "" + 
        this.arr1month[this.month]+ " " + this.day + " " + this.year +
         " " + this.arr1day[this.dayname] + " "  + this.militaryhour + ":" + this.minute +
          ":" + this.seconds + ":" + this.millisecond + " " + this.ampm;

       // window.setInterval("user.timedate()", 5000);

    },


}
user.init();




http://api.ipify.org/  to get the ip

https://ipfind.co/?ip=





//console.log(user.div.div1) //or user.divObj.["div1"]
 
/*
for( var i in user.applicantsinfo){

    console.log(i)
}*/



setTimeout(function(){ 
    console.log(user.applicantsinfo);
console.log(user.userinfo);

 }, 3000);
//convert long lat to GPS Coordinates.