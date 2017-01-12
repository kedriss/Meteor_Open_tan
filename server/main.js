import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';
import { HTTP } from 'meteor/http'

function flattenTempsArret(objets){

    var promise = new Promise(function(resolve, reject){
    var retour =[];
        _.forEach(objets,function(objet){
        retour[objet.ligne.numLigne]=getObject(retour, objet, objet.terminus, objet.sens);

        });
        var data=[]

        for (var key in retour)
        {
            data.push(retour[key]);
        };
        retour.data= data;
        //console.log(data);
        resolve(data);

    });
    return promise;
};

function getObject( objets, objetCourrant, sens){
var retour = null;
    for( var objetkey in objets){//(objets, function(objet){
        var objet = objets[objetkey];
        if(objet.codeArret == objetCourrant.ligne.numLigne){
            _.forEach(objet.terminus, function(term){
                if (term.terminus==objetCourrant.terminus) // si pour un terminus on match on renvoi l'objet
                {   term.temps.push({value:objetCourrant.temps});
                    retour =objet;
                    return retour;
                }
            })
            // sinon on creer l'objet terminus, puis  on renvois l'objet global
            if (retour == null)
            objet.terminus.push({terminus :objetCourrant.terminus,
                                 sens :objetCourrant.sens ,
                                 temps :[{value:objetCourrant.temps}]});
            retour = objet;
            return retour;
        }

    }
if (retour == null)
    retour= { codeArret : objetCourrant.ligne.numLigne,
             terminus :[{terminus :objetCourrant.terminus,
                         sens :objetCourrant.sens,
                         temps :[{value:objetCourrant.temps}]
                      }],
        ligne: objetCourrant.ligne
            }
    return retour;
}


Meteor.startup(() => {
    // code to run on server at startup
    //var serveurTan = "http://open_preprod.tan.fr/ewp/";
      var serveurTan = "http://open.tan.fr/ewp/";

var getArrets = function (idLigne, codeArret) {}

//test

    if (Meteor.isServer) {
        Meteor.methods({
            gettempsAttente: function (codeLieu) {

                var url = serveurTan + "tempsattente.json/" + codeLieu;
                var retourTan = HTTP.get(url);
                var promise =   flattenTempsArret(JSON.parse(retourTan.content));
                return promise;
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

