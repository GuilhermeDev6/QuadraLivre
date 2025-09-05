import { db } from './firebase-config.js';
import { collection, addDoc, query, where, onSnapshot, Timestamp, getDocs } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

// Gerar um ID aleatório para identificar o usuário no navegador
let usuarioID = localStorage.getItem('usuarioID');
if (!usuarioID) {
    usuarioID = 'user-' + Math.floor(Math.random() * 1000000);
    localStorage.setItem('usuarioID', usuarioID);
}

// Inicializar gráfico
const ctx = document.getElementById('graficoPresencas').getContext('2d');
const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Praça do avião', 'Garavelo', 'Parque da Criança'],
        datasets: [{
            label: 'Presenças',
            data: [0, 0, 0],
            backgroundColor: ['red', 'blue', 'green']
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
    }
});

// Função para obter início e fim do dia em Timestamp
function getInicioFimDia() {
    const hoje = new Date();
    const inicioDia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(), 0, 0, 0);
    const fimDia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(), 23, 59, 59);
    return { inicioDia: Timestamp.fromDate(inicioDia), fimDia: Timestamp.fromDate(fimDia) };
}

// Confirmar presença
document.getElementById('confirmar').addEventListener('click', async () => {
    const quadra = document.getElementById('quadra').value;
    const { inicioDia, fimDia } = getInicioFimDia();

    // Verifica se o usuário já confirmou presença hoje na mesma quadra
    const q = query(
        collection(db, "presencas"),
        where("usuario", "==", usuarioID),
        where("quadra", "==", quadra),
        where("data", ">=", inicioDia),
        where("data", "<=", fimDia)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        await addDoc(collection(db, "presencas"), {
            usuario: usuarioID,
            quadra: quadra,
            data: Timestamp.now() // salva data e hora exata
        });
        alert("Presença confirmada!");
    } else {
        alert("Você já confirmou presença nesta quadra hoje.");
    }
});

// Atualizar gráfico em tempo real
const { inicioDia, fimDia } = getInicioFimDia();
const qGrafico = query(
    collection(db, "presencas"),
    where("data", ">=", inicioDia),
    where("data", "<=", fimDia)
);

onSnapshot(qGrafico, (querySnapshot) => {
    let contagem = { quadra1: 0, quadra2: 0, quadra3: 0 };
    querySnapshot.forEach(doc => {
        const dataDoc = doc.data();
        contagem[dataDoc.quadra]++;
    });
    chart.data.datasets[0].data = [contagem.quadra1, contagem.quadra2, contagem.quadra3];
    chart.update();
});
