// Firebase Config (Replace with your actual credentials)
const firebaseConfig = {
  apiKey: "AIzaSyBIh5vRPXV6G_bMIO-xmM5QMMwuWSDkiEs",
  authDomain: "blog-91afe.firebaseapp.com",
  projectId: "blog-91afe",
  storageBucket: "blog-91afe.firebasestorage.app",
  messagingSenderId: "998518328744",
  appId: "1:998518328744:web:a4b56031fe72ba3156e19d",
  measurementId: "G-07K8Z2VMSS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Handle Form Submission
document.getElementById("blogForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;

    db.collection("posts").add({
        title: title,
        content: content,
        date: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        alert("Post Published!");
        document.getElementById("blogForm").reset();
    }).catch(error => {
        alert("Error publishing post: " + error);
    });
});
