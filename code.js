let shareCounter = 0;
const maxShares = 5;

const form = document.getElementById("regForm");
const shareBtn = document.getElementById("shareBtn");
const shareCount = document.getElementById("shareCount");
const finalMsg = document.getElementById("finalMsg");

const scriptURL = "https://script.google.com/macros/s/AKfycbzyD3lTp3twQsgL1hW8R6PSCSJBgwBvmvs6rWE0O4pFqRnpYVZr4G9CJsm8moKIaBwZeA/exec"; // replace with your actual script link

// Block re-submission if already submitted
if (localStorage.getItem("submitted") === "true") {
  form.querySelectorAll("input, select, button").forEach(el => el.disabled = true);
  finalMsg.textContent = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
}

// Handle WhatsApp Sharing
shareBtn.addEventListener("click", () => {
  if (shareCounter < maxShares) {
    shareCounter++;
    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
    window.open(`https://wa.me/?text=${message}`, "_blank");
    shareCount.textContent = `Click count: ${shareCounter}/5`;

    if (shareCounter === maxShares) {
      shareBtn.disabled = true;
      shareCount.textContent = "Sharing complete. Please continue.";
    }
  }
});

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (shareCounter < maxShares) {
    alert("Please complete WhatsApp sharing before submission.");
    return;
  }

  const formData = new FormData(form);

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: formData,
    });

    const result = await response.text();
    if (result.includes("Success")) {
      localStorage.setItem("submitted", "true");
      form.querySelectorAll("input, select, button").forEach(el => el.disabled = true);
      finalMsg.textContent = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
    } else {
      alert("Submission failed: " + result);
      console.error("Response:", result);
    }
  } catch (error) {
    alert("Submission error: " + error.message);
    console.error("Fetch error:", error);
  }
});
