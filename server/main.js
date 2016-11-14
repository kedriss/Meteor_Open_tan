import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';
import { HTTP } from 'meteor/http'

Meteor.startup(() => {
    // code to run on server at startup
  //  var serveurTan = "http://open_preprod.tan.fr/ewp/";
      var serveurTan = "http://open.tan.fr/ewp/";

var getArrets = function (idLigne, codeArret) {}


    if (Meteor.isServer) {
        Meteor.methods({
            tempsAttente: function (idLigne, codeArret) {
                this.unblock();
                var url = serveurTan + "tempsattente.json/" + idLigne ;//+ "/" + codeArret;
                console.log(url);
                /* return callTempsAttente(url);*/
                return HTTP.get(url);


            },
            listeArret: function (lattitude, longitude) {
                var coordinate="";
                if (lattitude && longitude){
                    var coordinate = "/"+lattitude+"/"+longitude;
                }
                var url = serveurTan + "arrets.json"+coordinate;
                var retour = HTTP.get(url);
                return JSON.stringify(retour);
            }
        });
    }
    //  Meteor.publish('horaire.arret', function(idLigne, codeArret) {
    // http://open_preprod.tan.fr/ewp/tempsattente.json/COMM


//});

//});

});