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
  if (!Session.get('listeArrets')) {
      var lat = Session.get('lat');
      var long = Session.get('long');
      if (!isNaN(lat) && !isNaN(long)){
          Meteor.call("listeArret", {lat: lat, long: long}, function (error, result) {
                  console.log(result);
                  var listeArrets = JSON.parse(result.content);
                  Session.set('listeArrets', listeArrets);
              }
          );
      }
  }
    return Session.get('listeArrets');
},
    NextToMe(){
        return Session.get('NextToMe');
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
    'click #position'(event){
        navigator.geolocation.getCurrentPosition(function(position){
        var url ='';
            console.log($(event.target));
            if ($(event.target)[0].checked)
            {
                var lat=position.coords.latitude;
                var long = position.coords.longitude;
                url=lat+"/"+long;
            }
        console.log(url);
        FlowRouter.go("/arrets/"+url);
        location.reload();
        /* var temp = Session.get('listeArrets');
         Session.set('listeArrets',[]);
         Session.set('listeArrets',temp);*/
        })
    }
})
Template.arret.events({
    'input #triArret'(event){
        var temp = Session.get('listeArrets');
        Session.set('listeArrets',[]);
        Session.set('listeArrets',temp);
}
});
