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
  if (!Session.get('listeArrets')){
      Meteor.call("listeArret", function (error, result) {
              var listeArrets = JSON.parse(result.content);
              Session.set('listeArrets', listeArrets);
          }
      );
  }
    return Session.get('listeArrets');
}
});

Template.arret.events({
    'click .selectLigneButton'(event){
    Session.set("tempsAttente",[]);
    FlowRouter.go("/tempsAttente/"+$(event.target).val());
   /* var temp = Session.get('listeArrets');
    Session.set('listeArrets',[]);
    Session.set('listeArrets',temp);*/
}
});

Template.arret.events({
    'input #triArret'(event){
        var temp = Session.get('listeArrets');
        Session.set('listeArrets',[]);
        Session.set('listeArrets',temp);
}
});
