/**
 * Created by kedri on 03/10/2016.
 */
import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import { ReactiveDict } from 'meteor/reactive-dict'
import { Session } from 'meteor/session';
import './task.js';
import './arrets/arret.js';
import './tempsAttente/tempsAttente.js';
import './horraireArret/horairesArret.js';
import './body.html';
import './app_body/App_body.html';

function listeArrets1(){
    return Meteor.call("listeArret","COMM","commerce");
     }

BlazeLayout.setRoot("#container");
FlowRouter.route('/arrets', {
        name: 'arrets',
        action(params, queryParams) {
        BlazeLayout.render('App_body', {main: 'arret'});
}
});
FlowRouter.route('/arrets/:lat/:long', {
    name: 'arrets',
    action(params, queryParams) {
        Session.set('lat',params.lat);
        Session.set('long',params.long);
        Session.set('NextToMe','checked');
        BlazeLayout.render('App_body', {main: 'arret'});
    }
});
FlowRouter.route('/tempsAttente/:idarret',{
    name:'tempsAttenteRoute',
    action(params,queryParams){
    Session.set('idarret',params.idarret);
    Session.set('idligne',params.idligne);
    BlazeLayout.render('App_body', {main: 'tempsAttenteTemplate'});
}
}
);

FlowRouter.route('/tempsAttente/:idarret/:idligne',{
    name:'tempsAttenteRoute2',
    action(params,queryParams){
        Session.set('idarret',params.idarret);
        Session.set('idligne',params.idligne);
        BlazeLayout.render('App_body', {main: 'tempsAttenteTemplate'});
}
}
);

FlowRouter.route('/horairesArret/:codeArret/:numLigne/:sens',{
    name:'horairesArretRoute',
    action(params,queryParams){
    Session.set('horaire.codeArret',params.codeArret);
    Session.set('horaire.numLigne',params.numLigne);
    Session.set('horaire.sens',params.sens);
    BlazeLayout.render('App_body', {main: 'horairesArret'});
}
}
);

Template.body.events({
'input #triArret'(event){
    var temp = Session.get('listeArrets');
    Session.set('listeArrets',[]);
    Session.set('listeArrets',temp);
}
});