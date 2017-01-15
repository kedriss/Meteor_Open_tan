/**
 * Created by kedri on 12/01/2017.
 */

import './tempsAttente.html';

Template.tempsAttenteTemplate.helpers({
    tempsAttente(){
        var idarret = Session.get('idarret');
        var idligne = Session.get('idligne');
        Session.set('nomArret',Session.get('listeArrets').filter( function(e){ return e.codeLieu==idarret})[0].libelle);
        var params = {idArret:idarret,idLigne:idligne};
        Meteor.call("gettempsAttente",params, function(error, result){
                if (result)Session.set("tempsAttente",result);
            }
        );

        return Session.get("tempsAttente");
    },
    nomArret(){
        return Session.get('nomArret');
    }
});



Template.tempsAttenteTemplate.events({
    'click #getBack'(event){
        Session.set("tempsAttente",[]);
        FlowRouter.go("/arrets");
    },
    'click .buttonTemps'(event){
    console.log('click sur un button'+$(event.target).val());
    FlowRouter.go("/horairesArret/"+$(event.target).val());

}
});