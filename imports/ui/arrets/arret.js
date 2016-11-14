/**
 * Created by kedri on 07/10/2016.
 */
import './arret.html';

Template.registerHelper('equalFindArret', function (libelle) {
   // console.log(libelle+" contre "+$("#triArret").val());
    return $("#triArret").val()?libelle.toUpperCase().includes($("#triArret").val().toUpperCase()): true;
});

Template.arret.helpers({

    listeArrets(){
    console.log("dans liste arret");
    Meteor.call("listeArret", function(error, result){
            Session.set('listeArrets',JSON.parse(JSON.parse(result).content));
        }
    );
    return Session.get('listeArrets');
},
})
