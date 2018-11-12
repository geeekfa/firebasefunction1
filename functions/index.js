const functions = require('firebase-functions');
const firebaseAdmin = require('firebase-admin');
var serviceAccount = require('./path/to/serviceAccountKey.json');

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://ninja-fd241.firebaseio.com"
});

const fireStore = firebaseAdmin.firestore();
const setting = { timestampsInSnapshots: true };
fireStore.settings(setting);

exports.cafes = functions.https.onRequest((request, response) => {
    fireStore.collection('cafes').get()
        .then(sns => {
            var json1 = [];
            sns.docs.forEach(doc => {
                json1.push(doc.data());
            });
            response.send(json1);
            return;
        })
        .catch(exp => {
            response.send(exp);
        });
});
//all students
exports.students = functions.https.onRequest((request, response) => {
    fireStore.collection('student').get()
        .then(sns => {
            var json1 = [];
            sns.docs.forEach(doc => {
                json1.push(doc.data());
            });
            response.send(json1);
            return;
        })
        .catch(exp => {
            response.send(exp);
        });
});

// Special Students
exports.studentMajidi = functions.https.onRequest((request, response) => {
    fireStore.collection('student').where('family', '==', 'majidi').get()
        .then(sns => {
            var json1 = [];
            sns.docs.forEach(doc => {
                json1.push(doc.data());
            });
            response.send(json1);
            return;
        })
        .catch(exp => {
            response.send(exp);
        });
});
