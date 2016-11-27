import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';
import { HTTP } from 'meteor/http'
function flattenTempsArret(objets, retour){

    var promise = new Promise(function(resolve, reject){
        _.forEach(objets,function(objet){

            if (retour[objet.arret.codeArret]){
                if(retour[objet.arret.codeArret].temps[objet.sens]){
                    retour[objet.arret.codeArret].temps[objet.sens].attente.push(objet.temps);
                }else{
                    retour[objet.arret.codeArret].temps[objet.sens]= {
                        sens: objet.sens,
                        attente: [objet.temps]
                    }
                }
            }
            else {
                retour.codesArret.push(objet.arret.codeArret);
                var temps =[];
                temps[objet.sens]= {
                    sens: objet.sens,
                    attente: [objet.temps]
                };
                console.log(temps);
                retour[objet.arret.codeArret] = {
                    codeArret: objet.arret.codeArret,
                    ligne: objet.ligne,
                    temps:temps
                }
            }

        });
        retour.data=[]
        _.forEach(retour.codesArret, function(variable){
            retour.data.push(retour[variable]);

        })
       // console.log(retour);
        resolve(retour);
    });
    return promise;
};
Meteor.startup(() => {
    // code to run on server at startup
  //  var serveurTan = "http://open_preprod.tan.fr/ewp/";
      var serveurTan = "http://open.tan.fr/ewp/";

var getArrets = function (idLigne, codeArret) {}

//test

    if (Meteor.isServer) {
        Meteor.methods({
            gettempsAttente: function (codeLieu) {
                var tab ={codesArret:[]};
                var url = serveurTan + "tempsattente.json/" + codeLieu;
               // console.log(url);
                var retour = HTTP.get(url);
                return flattenTempsArret(JSON.parse(retour.content), tab);


            },
            listeArret: function (lattitude, longitude) {
                var coordinate="";
                if (lattitude && longitude){
                    var coordinate = "/"+lattitude+"/"+longitude;
                }
                var url = serveurTan + "arrets.json"+coordinate;
                var retour = HTTP.get(url);
                //console.log(url);
                return retour;
            }
        });
    }
    //  Meteor.publish('horaire.arret', function(idLigne, codeArret) {
    // http://open_preprod.tan.fr/ewp/tempsattente.json/COMM


//});

//});

});

