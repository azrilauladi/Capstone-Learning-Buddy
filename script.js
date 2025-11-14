// --- BAGIAN 1: DATA & RENDER BUDDY ---

const buddiesData = [
    { name: "Rizky", role: "Mahasiswa IT", skills: ["Python", "AI", "Data Science"] },
    { name: "Siti", role: "Designer", skills: ["Figma", "UI/UX", "CSS"] },
    { name: "Budi", role: "Web Dev", skills: ["React", "NodeJS", "JavaScript"] },
    { name: "Alya", role: "Data Analyst", skills: ["SQL", "Excel", "Tableau"] },
    { name: "Tedy", role: "Fullstack", skills: ["PHP", "Laravel", "Vue"] },
    { name: "Dina", role: "Mobile Dev", skills: ["Flutter", "Dart", "Firebase"] }
];

const container = document.getElementById('buddyContainer');
const searchInput = document.getElementById('searchInput');

// Fungsi Render Kartu
function renderBuddies(data) {
    container.innerHTML = ''; 

    if (data.length === 0) {
        container.innerHTML = '<p style="text-align:center; width:100%;">Tidak ada buddy ditemukan :(</p>';
        return;
    }

    data.forEach(buddy => {
        const card = document.createElement('div');
        card.classList.add('card');

        const skillsHtml = buddy.skills.map(skill => 
            `<span class="skill-tag">${skill}</span>`
        ).join('');

        card.innerHTML = `
            <div style="font-size:3rem; margin-bottom:10px;">👤</div>
            <h3>${buddy.name}</h3>
            <p style="color:#777; margin-bottom:15px;">${buddy.role}</p>
            <div class="skills">
                ${skillsHtml}
            </div>
            <button style="margin-top:20px; padding:8px 20px; border:1px solid #6C63FF; background:none; color:#6C63FF; border-radius:5px; cursor:pointer;">Ajak Belajar</button>
        `;

        container.appendChild(card);
    });
}

// Fungsi Filter Pencarian
function filterBuddies() {
    const keyword = searchInput.value.toLowerCase();
    const filteredData = buddiesData.filter(buddy => {
        const matchName = buddy.name.toLowerCase().includes(keyword);
        const matchSkill = buddy.skills.some(skill => skill.toLowerCase().includes(keyword));
        return matchName || matchSkill;
    });
    renderBuddies(filteredData);
}

searchInput.addEventListener('keyup', filterBuddies);
renderBuddies(buddiesData);


// --- BAGIAN 2: LOGIKA AI CHATBOT ---

const chatInput = document.getElementById("chatInput");
const sendChatBtn = document.getElementById("sendBtn");
const chatbox = document.getElementById("chatbox");

// Toggle Class untuk Buka/Tutup Chat
function toggleChat() {
    document.body.classList.toggle("show-chatbot");
}

// Membuat Elemen Chat (Li)
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" 
        ? `<p>${message}</p>` 
        : `<span class="bot-icon">🤖</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

// Menangani Chat User
const handleChat = () => {
    const userMessage = chatInput.value.trim();
    if(!userMessage) return;

    // 1. Tampilkan pesan user
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatInput.value = "";
    chatbox.scrollTop = chatbox.scrollHeight;

    // 2. Simulasi AI "Mengetik..."
    setTimeout(() => {
        const incomingChatLi = createChatLi("Sedang berpikir...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTop = chatbox.scrollHeight;

        // 3. Ganti pesan dengan respon AI
        setTimeout(() => {
            incomingChatLi.querySelector("p").textContent = generateAIResponse(userMessage);
        }, 600);
    }, 600);
}

// Logika Respon Dummy (Bisa diganti API nanti)
function generateAIResponse(input) {
    input = input.toLowerCase();
    if(input.includes("halo") || input.includes("hai") || input.includes("pagi")) {
        return "Halo juga! Siap belajar apa hari ini?";
    } else if (input.includes("python")) {
        return "Python adalah bahasa populer untuk AI dan Data. Coba cari buddy dengan skill 'Python'!";
    } else if (input.includes("teman") || input.includes("buddy")) {
        return "Kamu bisa mencari teman di kolom pencarian di atas sesuai minatmu.";
    } else if (input.includes("terima kasih") || input.includes("thanks")) {
        return "Sama-sama! Semangat terus belajarnya ya!";
    } else {
        return "Maaf, saya bot sederhana. Coba tanya tentang 'Python', 'Teman', atau ucapkan 'Halo'.";
    }
}

sendChatBtn.addEventListener("click", handleChat);
chatInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});