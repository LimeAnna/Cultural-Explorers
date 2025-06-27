// XP atual do aluno e controle de questões respondidas
let xp = 0;
        let answeredQuestions = [];
        let mapVisible = false;

        // Função para personalizar o background
        function setCustomBackground(imagePath) {
            const root = document.documentElement;
            root.style.setProperty('--bg-image', `url('${imagePath}')`);
            root.style.setProperty('--bg-gradient', 'none');
            root.style.setProperty('--bg-overlay', 'rgba(0, 0, 0, 0.4)');
            root.style.setProperty('--container-bg', 'rgba(255, 255, 255, 0.95)');
        }

        function toggleMap() {
            const placeholder = document.getElementById('mapPlaceholder');
            const iframe = document.getElementById('mapIframe');
            const button = document.getElementById('mapToggle');
            
            if (!mapVisible) {
                placeholder.style.display = 'none';
                iframe.style.display = 'block';
                button.textContent = 'Fechar Mapa';
                mapVisible = true;
            } else {
                placeholder.style.display = 'flex';
                iframe.style.display = 'none';
                button.textContent = 'Ver Mapa';
                mapVisible = false;
            }
        }
// paginas
        function showPage(pageId) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Hide main page
            document.getElementById('main-page').style.display = 'none';
            
            if (pageId === 'main') {
                document.getElementById('main-page').style.display = 'block';
                // Reset map when returning to main page
                if (mapVisible) {
                    toggleMap();
                }
            } else {
                document.getElementById(pageId + '-page').classList.add('active');
            }
        }
// Mapa do google maps
        function openGoogleMaps() {
            // Coordenadas do Parque Estadual de Vila Velha
            const lat = -25.2493;
            const lng = -50.0228;
            const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=ChIJX3W0JgBF15QRo1muEJSgARQ`;
            window.open(url, '_blank');
        }
//respostas de perguntas do quiz
        function answerQuestion(button, correct, questionIndex) {
            // Verifica se a pergunta já foi respondida
            if (answeredQuestions.includes(questionIndex)) {
                return;
            }

            // Marca a pergunta como respondida
            answeredQuestions.push(questionIndex);

            // Pega todos os botões da mesma pergunta
            const questionButtons = button.parentElement.querySelectorAll('.quiz-option');
            
            // Desabilita todos os botões da pergunta
            questionButtons.forEach(btn => {
                btn.disabled = true;
            });

            if (correct) {
                button.classList.add('correct');
                xp += 50;
                updateQuizResult(true);
            } else {
                button.classList.add('incorrect');
                // Resposta correta destacada
                questionButtons.forEach(btn => {
                    if (btn !== button && !btn.classList.contains('incorrect')) {
                        btn.classList.add('correct');
                    }
                });
                updateQuizResult(false);
            }
        }
//resultado do quiz
        function updateQuizResult(correct) {
            const resultDiv = document.getElementById('quiz-result');
            
            if (correct) {
                resultDiv.innerHTML = 
                    `<div style="color: #00bf63; font-size: 24px;">🎉</div>
                     <p>Resposta correta! Você ganhou 50 XP!</p>
                     <p>XP Total: ${xp}</p>`;
            } else {
                resultDiv.innerHTML = 
                    `<div style="color: #FF6B6B; font-size: 24px;">❌</div>
                     <p>Resposta incorreta. A resposta correta está destacada!</p>
                     <p>XP Total: ${xp}</p>`;
            }
        }
        //animação botões
        document.addEventListener('DOMContentLoaded', function() {
            const menuButtons = document.querySelectorAll('.menu-button');
            menuButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                });
            });
        });