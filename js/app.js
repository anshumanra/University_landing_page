document.addEventListener("DOMContentLoaded", init);

async function init() {
  const API = window.API_BASE;
  const pipedream = window.PIPEDREAM_ENDPOINT;

  // Fetch university JSON data
  const res = await fetch(API);
  const data = await res.json();

  populatePage(data);

  // Modal Open
  const modal = document.getElementById("modal");
  document.getElementById("fees-btn").onclick = () => {
    showFees(data);
    modal.setAttribute("aria-hidden", "false");
  };

  // Modal Close
  document.getElementById("modal-close").onclick = () =>
    modal.setAttribute("aria-hidden", "true");

  // CLICK OUTSIDE MODAL TO CLOSE
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.setAttribute("aria-hidden", "true");
    }
  });

  // FORM SUBMISSION HANDLER
  document.getElementById("lead-form").onsubmit = async (e) => {
    e.preventDefault();

    const msgBox = document.getElementById("form-msg");
    msgBox.className = "";
    msgBox.style.display = "none";

    const fd = new FormData(e.target);
    const obj = Object.fromEntries(fd.entries());

    // PHONE VALIDATION
    if (!/^\d{10}$/.test(obj.phone)) {
      msgBox.textContent = "❌ Enter a valid 10-digit phone number.";
      msgBox.classList.add("form-error");
      msgBox.style.display = "block";
      return;
    }

    // CONSENT VALIDATION
    if (!obj.consent) {
      msgBox.textContent = "❌ Please check the consent box.";
      msgBox.classList.add("form-error");
      msgBox.style.display = "block";
      return;
    }

    // SEND DATA
    try {
      const res = await fetch(pipedream, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      });

      if (!res.ok) {
        throw new Error("Server error");
      }

      // SUCCESS MESSAGE
      msgBox.textContent = "✔ Your form has been submitted successfully!";
      msgBox.classList.add("form-success");
      msgBox.style.display = "block";

      e.target.reset();

    } catch (err) {
      msgBox.textContent = "❌ Submission failed. Please try again.";
      msgBox.classList.add("form-error");
      msgBox.style.display = "block";
    }
  };
}

// Populate homepage content
function populatePage(data) {
  document.getElementById("uni-name").textContent = data.university;
  document.getElementById("uni-location").textContent = data.location;
  document.getElementById("overview-text").textContent = data.overview;

  // COURSES LIST
  const list = document.getElementById("courses-list");
  const select = document.getElementById("course-select");

  data.courses.forEach((c) => {
    list.innerHTML += `<li>${c.name} — ${c.duration}</li>`;
    select.innerHTML += `<option>${c.name}</option>`;
  });

  // PLACEMENTS
  let p = "";
  for (let key in data.placements) {
    p += `<p><b>${key.replace(/_/g, " ")}:</b> ${data.placements[key]}</p>`;
  }
  document.getElementById("placements").innerHTML = p;
}

// Show Fees Modal
function showFees(data) {
  const div = document.getElementById("fees-content");
  div.innerHTML = "";

  for (let course in data.fees) {
    const f = data.fees[course];

    div.innerHTML += `
      <p><b>${course}</b><br>
      ₹${f.min_inr.toLocaleString()} - ₹${f.max_inr.toLocaleString()}</p>
      <hr>
    `;
  }
}
