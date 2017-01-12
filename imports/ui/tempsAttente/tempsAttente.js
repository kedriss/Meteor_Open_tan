/**
 * Created by kedri on 12/01/2017.
 */

import './tempsAttente.html';

Template.tempsAttenteTemplate.helpers({
    tempsAttente(){
    var idarret = Session.get('idarret');
    Meteor.call("gettempsAttente",idarret, function(error, result){
            console.log(error);
            console.log(result);
            if (result)Session.set("tempsAttente",result);
        }
    );

    return Session.get("tempsAttente");
}
});