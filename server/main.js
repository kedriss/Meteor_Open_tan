import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';
import { HTTP } from 'meteor/http'

function flattenTempsArret(objets,idLigne){

    var promise = new Promise(function(resolve, reject){
    var retour =[];
        _.forEach(objets,function(objet){
        retour[objet.ligne.numLigne]=getObject(retour, objet, objet.terminus, objet.sens);

        });
        var data=[]

       if(idLigne && retour[idLigne]) data.push(retour[idLigne]);
       else for (var key in retour)
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
        if(objet.numLigne == objetCourrant.ligne.numLigne){
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
    retour= {numLigne : objetCourrant.ligne.numLigne,
             codeArret: objetCourrant.arret.codeArret,
             terminus :[{terminus : objetCourrant.terminus,
                         sens     : objetCourrant.sens,
                         temps    :[{value:objetCourrant.temps}]
                      }],
        ligne: objetCourrant.ligne
            }
    return retour;
}


Meteor.startup(() => {
    // code to run on server at startup
    //var serveurTan = "http://open_preprod.tan.fr/ewp/";
      var serveurTan = "http://open.tan.fr/ewp/";

//test

    if (Meteor.isServer) {
        Meteor.methods({
            gettempsAttente: function (params) {

                var url = serveurTan + "tempsattente.json/" + params.idArret;
                var retourTan = HTTP.get(url);

                var promise = flattenTempsArret(JSON.parse(retourTan.content),params.idLigne);
                return promise;
            },
            listeArret: function (params) {
                var coordinate="";
                if (params.lat && params.long){
                    var coordinate = "/"+params.lat.replace('.',',')+"/"+params.long.replace('.',',');
                }
                var url = serveurTan + "arrets.json"+coordinate;

                console.log(url);
                var retour = HTTP.get(url);
                //console.log(retour);
                return retour;
            },
            horairesArret:function(params){
                var param='/';
                param += params.codeArret+'/'+params.numLigne+'/'+params.sens;
                var url = serveurTan + "horairesarret.json"+param;
                console.log(url);
                var retour = HTTP.get(url);
                console.log(retour);
                return retour.data;

            }
        });
    }


});

