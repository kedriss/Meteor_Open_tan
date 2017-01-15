/**
 * Created by kedri on 14/01/2017.
 */
import './horairesArret.html';

Template.horairesArret.helpers({

    horairesArret(){
        var codeArret = Session.get('horaire.codeArret');
        var numligne  = Session.get('horaire.numLigne');
        var sens      = Session.get('horaire.sens');
        var params = {codeArret:codeArret, numLigne:numligne, sens:sens};
        Meteor.call("horairesArret",params, function(error, result){
            if (result) {
                Session.set("horairesArret", result);
                console.log(result);
            }
            else console.log(error);
        }

        );
       return Session.get('horairesArret');
}
})