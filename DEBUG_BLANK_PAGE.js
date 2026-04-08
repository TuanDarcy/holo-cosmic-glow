// Quick debug test for blank page issue
// Paste this in browser console if page shows blank:

console.log("=== Debug Test ===");
console.log("React Root:", document.getElementById("root"));
console.log("Body:", document.body);
console.log("All Scripts:", document.scripts.length);

// Check if there are any render errors
window.addEventListener("error", (e) => {
  console.error("Global Error:", e.message);
  console.error("Stack:", e.stack);
});

console.log("Debug initialized. Check for errors above.");
