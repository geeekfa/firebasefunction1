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

//all students
exports.students = functions.https.onRequest((request, response) => {
    //http://localhost:8010/fir-1-4d266/us-central1/students/a?b=1
    //request.path = a
    //request.query = {b,1}
    switch (request.originalUrl) {
        case '':
        case '/':
            fireStore.collection('student').get()
                .then(sns => {
                    response.send( docForEach(sns));
                    return;
                })
                .catch(exp => {
                    response.send(exp);
                });
            break;
        default:
            fireStore.collection('student').where('name', '==', request.path.replace('/', '')).get()
                .then(sns => {
                    response.send( docForEach(sns));
                    return;
                })
                .catch(exp => {
                    response.send(exp);
                });
            break
    }
});

function docForEach(sns) {
    var json1 = [];
    sns.docs.forEach(doc => {
        json1.push(doc.data());
    });
    return json1;
   
}