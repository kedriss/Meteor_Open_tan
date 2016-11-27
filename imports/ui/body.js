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

FlowRouter.route('/tempsAttente/:idarret',{
    name:'tempsAttenteRoute',
    action(params,queryParams){
        Session.set('idarret',params.idarret);
        BlazeLayout.render('App_body', {main: 'tempsAttenteTemplate'});
}
}
);
Template.body.helpers({

});



Template.body.events({
'input #triArret'(event){
    var temp = Session.get('listeArrets');
    Session.set('listeArrets',[]);
    Session.set('listeArrets',temp);
}
});