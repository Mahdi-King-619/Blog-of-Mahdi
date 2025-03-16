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

// Admin Login
document.getElementById("adminLogin").addEventListener("click", () => {
    let username = prompt("Enter Admin Username:");
    let password = prompt("Enter Admin Password:");

    if (username === "S.Mahdi Al Hasan" && password === "Iamaboyandsiu") {
        alert("Login Successful!");
        window.location.href = "admin.html"; // Redirect to admin panel
    } else {
        alert("Invalid credentials!");
    }
});

// Subscribe Users
document.getElementById("subscribeBtn").addEventListener("click", () => {
    let email = document.getElementById("userEmail").value;
    if (email === "") {
        alert("Enter an email to subscribe!");
        return;
    }
    db.collection("subscribers").doc(email).set({ email: email })
    .then(() => {
        document.getElementById("subStatus").innerText = "✅ Subscribed!";
    })
    .catch(error => {
        console.error("Error subscribing: ", error);
    });
});

// Load Blog Posts
function loadPosts() {
    const blogSection = document.getElementById("blogPosts");
    db.collection("posts").orderBy("date", "desc").onSnapshot(snapshot => {
        blogSection.innerHTML = "";
        snapshot.forEach(doc => {
            let post = doc.data();
            let postId = doc.id;

            blogSection.innerHTML += `
                <div class="post">
                    <h2>${post.title}</h2>
                    <p>${post.content}</p>
                    <small>Posted on ${new Date(post.date).toLocaleDateString()}</small>
                    <h3>Comments:</h3>
                    <div id="comments-${postId}"></div>
                    <textarea id="commentInput-${postId}" placeholder="Write a comment..."></textarea>
                    <button onclick="addComment('${postId}')">Comment</button>
                </div>
            `;

            loadComments(postId);
        });
    });
}

// Load Comments
function loadComments(postId) {
    db.collection("comments").where("postId", "==", postId)
    .orderBy("timestamp", "asc").onSnapshot(snapshot => {
        let commentSection = document.getElementById(`comments-${postId}`);
        commentSection.innerHTML = "";
        snapshot.forEach(doc => {
            let comment = doc.data();
            commentSection.innerHTML += `<p><b>${comment.email}:</b> ${comment.text}</p>`;
        });
    });
}

// Add Comment
function addComment(postId) {
    let email = document.getElementById("userEmail").value;
    let commentText = document.getElementById(`commentInput-${postId}`).value;

    if (email === "" || commentText === "") {
        alert("You must subscribe & write a comment!");
        return;
    }

    db.collection("subscribers").doc(email).get().then(doc => {
        if (doc.exists) {
            db.collection("comments").add({
                postId: postId,
                email: email,
                text: commentText,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                alert("Comment added!");
            }).catch(error => {
                console.error("Error adding comment: ", error);
            });
        } else {
            alert("You must subscribe to comment!");
        }
    });
}

window.onload = loadPosts;
