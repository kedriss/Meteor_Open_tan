/**
 * Created by kedri on 03/10/2016.
 */
import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import { ReactiveDict } from 'meteor/reactive-dict'
import { Session } from 'meteor/session';
import './task.js';
import './arrets/arret.js';
import './body.html';

function listeArrets1(){
    return Meteor.call("listeArret","COMM","commerce");
     }

FlowRouter.route('/lists/:_id', {
    name: 'Lists.show',
    action(params, queryParams) {
    console.log("Looking at a list?");
}
});

Template.body.helpers({
    listeArrets(){
      Meteor.call("listeArret", function(error, result){
          Session.set('listeArrets',JSON.parse(JSON.parse(result).content));
            }
          );
        return Session.get('listeArrets');
    },
/*listeArrets(){
 var fonctionsync = Meteor.wrapAsync(Meteor.call);
    var retour = fonctionsync("listeArret","COMM","commerce");
    console.log(retour);
    return retour;
},*/
    incompleteCount(){
        return Tasks.find({ checked: { $ne: true } }).count();
    }
});

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});

Template.body.events({
    'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Tasks.insert({
        text:text,
        createdAt: new Date(), // current time
    });

    // Clear form
    target.text.value = '';
},'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
},'input #triArret'(event){
    var temp = Session.get('listeArrets');
    Session.set('listeArrets',[]);
    Session.set('listeArrets',temp);
}
});