import Ember from "ember";

const FIXTURES = [
    {id: 1, latitude: 50.3021079, longitude: 18.6771861, radius: 3000, transitionType: 1, notification: {text: "Gliwice Train Station"}},
    {id: 2, latitude: 50.4728049, longitude: 19.0736874, radius: 3000, transitionType: 1, notification: {text: "Pyrzowice Airport"}},
    {id: 3, latitude: 50.0671974, longitude: 19.945232, radius: 3000, transitionType: 1, notification: {text: "Cracow Main Station"}},
    {id: 4, latitude: 52.2287803, longitude: 21.001124, radius: 3000, transitionType: 1, notification: {text: "Warsaw Main Station"}}
];

export default Ember.Service.extend({
    _geofences: Ember.makeArray(FIXTURES),
    // Only for test purposes
    simulateDelay: 500,

    addOrUpdate(geofences) {
        let geofencesToAdd = Ember.makeArray(geofences);

        return new Ember.RSVP.Promise((resolve) => {
            Ember.run.later(() => {
                geofencesToAdd.forEach((geofence) => {
                    const finded = this._geofences.find((g) => g.id === geofence.id);

                    if (!finded) {
                        this._geofences.push(geofence);
                    } else {
                        this._geofences[this._geofences.indexOf(finded)] = geofence;
                    }
                });
                resolve();
            }, this.simulateDelay);
        });
    },

    remove(geofenceIds) {
        let ids = Ember.makeArray(geofenceIds);

        return new Ember.RSVP.Promise((resolve) => {
            Ember.run.later(() => {
                ids.forEach((id) => {
                    const finded = this._geofences.find((g) => g.id === id);

                    if (finded) {
                        this._geofences.removeAt(this._geofences.indexOf(finded));
                    }
                });
                resolve();
            }, this.simulateDelay);
        });
    },

    removeAll() {
        return new Ember.RSVP.Promise((resolve) => {
            Ember.run.later(() => {
                this._geofences.clear();
                resolve();
            }, this.simulateDelay);
        });
    },

    getWatched() {
        return new Ember.RSVP.Promise((resolve) => {
            Ember.run.later(()=>{
                resolve(this._geofences);
            }, this.simulateDelay);
        });
    }
});
