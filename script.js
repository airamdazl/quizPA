/* =========================================================
   AIRAM • SEXTA À NOITE - SCRIPT INTERATIVO
========================================================= */


/* =========================================================
   PERFIS DE PERSONALIDADE DO ROLÊ
========================================================= */

const profiles = {
    curticao: {
        title: "CURTIÇÃO",
        description: "Você foi pra dançar, sentir o grave tremer o peito e esquecer de tudo. Onde tiver paredão estalando, você tá na frente!"
    },

    pegador: {
        title: "PEGADOR",
        description: "Passa o rodo e tá sempre de olho. Você não perde uma troca de olhar e nunca volta pra casa no zero a zero!"
    },

    julgador: {
        title: "JULGADOR",
        description: "Vai pra observar, dar risada e comentar os podres de todo mundo. Seu grupo de zap que se prepare pros áudios de amanhã!"
    },

    fashionista: {
        title: "FASHIONISTA",
        description: "Você demorou duas horas escolhendo o look e foi pro rolê pra causar e desfilar. O importante é ser visto e elogiado!"
    },

    influencer: {
        title: "INFLUENCER",
        description: "Se não gravou, não aconteceu! Você cobre o rolê do início ao fim, faz Stories, vídeos do paredão e curte a vibe pelo celular."
    },

    sombra: {
        title: "SOMBRA",
        description: "Prefere os cantos mais tranquilos, um cantinho no escuro e curte na sua tática. Discreto, misterioso e reservado."
    },

    caseiro: {
        title: "CASEIRO",
        description: "Quase nunca sai e ama sua cama. Quando vai pro rolê, fica pensando na coberta e no lanche que vai pedir na volta."
    },

    matine: {
        title: "MATINÊ",
        description: "Curte pra caramba, mas deu 1h30 da manhã já tá caçando o rumo de casa. Paga seu Uber e dorme com a consciência tranquila."
    },

    sem_limite: {
        title: "SEM LIMITE",
        description: "Manda o 'só vou dar uma passadinha' e acorda 11h da manhã de sábado num after que ninguém sabe de onde surgiu!"
    }
};


/* =========================================================
   ESTADO DO QUIZ
========================================================= */

let currentScene = "q1";
let selected = false;
let quizFinished = false;
let history = [];


/* =========================================================
   PONTUAÇÃO
========================================================= */

let scores = createEmptyScores();

function createEmptyScores() {
    return {
        curticao: 0,
        pegador: 0,
        julgador: 0,
        fashionista: 0,
        influencer: 0,
        sombra: 0,
        caseiro: 0,
        matine: 0,
        sem_limite: 0
    };
}

function resetScores() {
    scores = createEmptyScores();
}

function recalculateScores() {
    resetScores();

    history.forEach(item => {
        Object.entries(item.option.points).forEach(([profile, points]) => {
            if (scores[profile] !== undefined) {
                scores[profile] += points;
            }
        });
    });
}


/* =========================================================
   CONTROLE DE TRANSIÇÃO
========================================================= */

let pendingTransition = null;
let pendingFrameTransition = null;

function clearPendingTransitions() {
    if (pendingTransition) {
        clearTimeout(pendingTransition);
        pendingTransition = null;
    }

    if (pendingFrameTransition) {
        clearTimeout(pendingFrameTransition);
        pendingFrameTransition = null;
    }
}


/* =========================================================
   ELEMENTOS HTML
========================================================= */

const questionCard = document.getElementById("questionCard");
const frame = document.getElementById("frame");

const questionNumber = document.getElementById("questionNumber");
const sceneTitle = document.getElementById("sceneTitle");
const question = document.getElementById("question");
const description = document.getElementById("description");

const answers = document.getElementById("answers");

const progressLabel = document.getElementById("progressLabel");
const progressNumber = document.getElementById("progressNumber");
const progressFill = document.getElementById("progressFill");

const backButton = document.getElementById("backButton");

const resultScreen = document.getElementById("resultScreen");
const resultTitle = document.getElementById("resultTitle");
const resultDescription = document.getElementById("resultDescription");
const resultScore = document.getElementById("resultScore");
const resultActions = document.getElementById("resultActions");

const soundButton = document.getElementById("soundButton");
const shareMusicButton = document.getElementById("shareMusicButton");
const shareResultButton = document.getElementById("shareResultButton");


/* =========================================================
   ÁRVORE DE CENAS
========================================================= */

const scenes = {

    q1: {
        number: "PERGUNTA 01 DE 04",
        title: "SEXTA-FEIRA, 23H.",
        frame: "assets/img/moldura4.png",

        question: "Seu amigo manda: “Cheguei. Tá lotado! Vem logo!” O que você faz?",
        description: "Você tinha planejado ficar em casa de bobeira. Mas é sexta-feira na ZL...",

        options: [
            {
                text: "Já tô com look e pronto pra causar!",
                points: {
                    fashionista: 3,
                    influencer: 2,
                    curticao: 1
                },
                next: "q2_role"
            },

            {
                text: "Bora logo! Só volto quando o som desligar!",
                points: {
                    sem_limite: 4,
                    curticao: 3,
                    pegador: 2
                },
                next: "q2_role"
            },

            {
                text: "Vou passar só pra dar um oi e volto cedo.",
                points: {
                    matine: 3,
                    sombra: 1
                },
                next: "q2_passada"
            },

            {
                text: "Nem ferrando. Vou pedir um lanche e ver filme.",
                points: {
                    caseiro: 4,
                    julgador: 1
                },
                next: "q2_casa"
            }
        ]
    },


    q2_role: {
        number: "PERGUNTA 02 DE 04",
        title: "CHEGOU NO PONTO.",
        frame: "assets/img/moldura4.png",

        question: "O paredão tá batendo forte e a rua tá cheia. Qual seu primeiro passo?",
        description: "A iluminação reflete na galera e o tuim arrepia até a alma.",

        options: [
            {
                text: "Vou pra frente do som dançar sem parar!",
                points: {
                    curticao: 4,
                    sem_limite: 2
                },
                next: "q3_festa"
            },

            {
                text: "Saco o celular e gravo um story do rolê.",
                points: {
                    influencer: 4,
                    fashionista: 2
                },
                next: "q3_festa"
            },

            {
                text: "Dou aquela circulada procurando quem tem de interessante.",
                points: {
                    pegador: 4,
                    julgador: 1
                },
                next: "q3_festa"
            },

            {
                text: "Encosto num canto e fico só observando as vergonhas alheias.",
                points: {
                    julgador: 3,
                    sombra: 2
                },
                next: "q3_festa"
            }
        ]
    },


    q2_passada: {
        number: "PERGUNTA 02 DE 04",
        title: "SÓ UMA PASSADINHA...",
        frame: "assets/img/moldura4.png",

        question: "Você chega de fininho e seu amigo te puxa pra um shot e um copo de drink. O que faz?",
        description: "Você jurou que ia embora em 30 minutos...",

        options: [
            {
                text: "Aceito o drink! Agora não vou embora mais!",
                points: {
                    curticao: 4,
                    sem_limite: 3
                },
                next: "q3_festa"
            },

            {
                text: "Aceito, mas fico num canto conversando e de olho no movimento.",
                points: {
                    sombra: 4,
                    julgador: 2
                },
                next: "q3_festa"
            },

            {
                text: "Recuso e já fico olhando no relógio do celular.",
                points: {
                    matine: 4,
                    caseiro: 2
                },
                next: "q3_festa"
            },

            {
                text: "Aproveito pra tirar umas fotos do meu look.",
                points: {
                    fashionista: 4,
                    influencer: 2
                },
                next: "q3_festa"
            }
        ]
    },


    q2_casa: {
        number: "PERGUNTA 02 DE 04",
        title: "SABOTAGEM EM CASA.",
        frame: "assets/img/moldura4.png",

        question: "Chega uma notificação de vídeo do paredão com a frase: 'Perdeu, tá insano!'. O que faz?",
        description: "Seu pijama tá quentinho, mas a FOMO começa a bater forte.",

        options: [
            {
                text: "Posto no story que perdi sono, pra alguem me buscar!",
                points: {
                    influencer: 2,
                    curticao: 1
                },
                next: "q3_casa"
            },

            {
                text: "Tiro print da roupa feia das pessoas no fundo do vídeo pra fofocar.",
                points: {
                    julgador: 4,
                    caseiro: 1
                },
                next: "q3_casa"
            },

            {
                text: "Troco de roupa correndo e vou pro rolê mesmo de madrugada!",
                points: {
                    sem_limite: 3,
                    curticao: 3
                },
                next: "q3_festa"
            },

            {
                text: "Desligo a internet e me cubro até a cabeça e durmo.",
                points: {
                    caseiro: 4
                },
                next: "q3_casa"
            }
        ]
    },


    q3_festa: {
        number: "PERGUNTA 03 DE 04",
        title: "O AUGE DA NOITE.",
        frame: "assets/img/moldura4.png",

        question: "A música do Airam começa a tocar no talo! O que você faz nesse momento?",
        description: "A energia atinge o topo. Todo mundo tá conectado no mesmo grave.",

        options: [
            {
                text: "Vou dançar perto de alguém que tô afim pra já flertar.",
                points: {
                    pegador: 4,
                    curticao: 2
                },
                next: "q4_final_festa"
            },

            {
                text: "Gravo o drop da música pra postar com a localização.",
                points: {
                    influencer: 3,
                    fashionista: 1
                },
                next: "q4_final_festa"
            },

            {
                text: "Aproveito a luz escura e vou pro dark room!",
                points: {
                    pegador: 4,
                    sombra: 2
                },
                next: "q4_final_festa"
            },

            {
                text: "Fico Reparando como o povo perde a linha depois das 2h.",
                points: {
                    julgador: 4,
                    matine: 1
                },
                next: "q4_final_festa"
            }
        ]
    },


    q3_casa: {
        number: "PERGUNTA 03 DE 04",
        title: "MADRUGADA ADENTRO.",
        frame: "assets/img/moldura4.png",

        question: "São 2h da manhã. O que está acontecendo na sua madrugada?",
        description: "Enquanto o paredão estremece a ZL, seu universo é outro.",

        options: [
            {
                text: "Tô fofocando no grupo com quem ficou em casa.",
                points: {
                    julgador: 3,
                    caseiro: 1
                },
                next: "q4_final_casa"
            },

            {
                text: "Criei 3 rascunhos de reels usando a música nova.",
                points: {
                    influencer: 3,
                    fashionista: 1
                },
                next: "q4_final_casa"
            },

            {
                text: "Tô capotado de sono faz tempo.",
                points: {
                    caseiro: 4,
                    matine: 2
                },
                next: "q4_final_casa"
            },

            {
                text: "Mandei 'oi sumido(a)' pra 5 pessoas diferentes no Insta.",
                points: {
                    pegador: 3,
                    sombra: 1
                },
                next: "q4_final_casa"
            }
        ]
    },


    q4_final_festa: {
        number: "PERGUNTA 04 DE 04",
        title: "O FECHAMENTO.",
        frame: "assets/img/moldura4.png",

        question: "O som começa a baixar e a luz do posto dá sinais de desligar. O que você decide?",
        description: "A saideira ressoa. É o momento derradeiro da sua jornada.",

        options: [
            {
                text: "Procuro onde vai ser o after! A noite tá só começando!",
                points: {
                    sem_limite: 4,
                    curticao: 2
                }
            },

            {
                text: "Já garanti o contatinho da noite e vou embora acompanhado(a).",
                points: {
                    pegador: 4
                }
            },

            {
                text: "Chamo o Uber bem pleno(a) pra não estragar meu look e maquiagem.",
                points: {
                    fashionista: 4,
                    matine: 2
                }
            },

            {
                text: "Sumo no meio da multidão sem dar tchau pra ninguém.",
                points: {
                    sombra: 3,
                    caseiro: 1
                }
            }
        ]
    },


    q4_final_casa: {
        number: "PERGUNTA 04 DE 04",
        title: "O FECHAMENTO.",
        frame: "assets/img/moldura4.png",

        question: "Sábado de manhã amanheceu. Qual é o seu primeiro pensamento?",
        description: "O sol nasceu na Zona Leste e o rolê virou história.",

        options: [
            {
                text: "Melhor decisão da vida ter ficado no meu conforto!",
                points: {
                    caseiro: 4
                }
            },

            {
                text: "Hora de checar os Stories pra ver quem passou vergonha!",
                points: {
                    julgador: 3,
                    influencer: 1
                }
            },

            {
                text: "Perdi o rolê ontem, mas hoje de noite ninguém me segura!",
                points: {
                    curticao: 2,
                    sem_limite: 1,
                    caseiro: 1
                }
            },

            {
                text: "Planejar o look perfeito pro próximo rolê.",
                points: {
                    fashionista: 4,
                    curticao: 1
                }
            }
        ]
    }
};


/* =========================================================
   IDENTIFICAR ETAPA
========================================================= */

function getStep(sceneId) {
    if (sceneId.startsWith("q1")) return 1;
    if (sceneId.startsWith("q2")) return 2;
    if (sceneId.startsWith("q3")) return 3;
    if (sceneId.startsWith("q4")) return 4;

    return 1;
}


/* =========================================================
   CONTROLE DE VISIBILIDADE
========================================================= */

function showQuizContent() {
    answers.style.display = "grid";

    questionNumber.style.display = "block";
    sceneTitle.style.display = "block";
    question.style.display = "block";
    description.style.display = "block";

    resultScreen.classList.remove("active");
}

function hideQuizContent() {
    answers.style.display = "none";

    questionNumber.style.display = "none";
    sceneTitle.style.display = "none";
    question.style.display = "none";
    description.style.display = "none";
}


/* =========================================================
   RENDERIZAR CENA
========================================================= */

function renderScene(sceneId) {
    const scene = scenes[sceneId];

    if (!scene) return;

    clearPendingTransitions();

    currentScene = sceneId;
    selected = false;
    quizFinished = false;

    showQuizContent();

    /* ESCONDER COMPARTILHAR RESULTADO */
    if (resultActions) {
        resultActions.style.display = "none";
    }

    /* ANIMAÇÃO DO CARD */
    questionCard.classList.remove("card-enter");
    void questionCard.offsetWidth;
    questionCard.classList.add("card-enter");

    /* MOLDURA */
    frame.style.opacity = "0";

    pendingFrameTransition = setTimeout(() => {
        frame.src = scene.frame;
        frame.style.opacity = "1";
        pendingFrameTransition = null;
    }, 100);

    /* TEXTOS */
    questionNumber.textContent = scene.number;
    sceneTitle.textContent = scene.title;
    question.textContent = scene.question;
    description.textContent = scene.description;

    /* PROGRESSO */
    const step = getStep(sceneId);
    const percentage = Math.round((step / 4) * 100);

    progressLabel.textContent = `ETAPA ${step} DE 4`;
    progressNumber.textContent = `${percentage}%`;
    progressFill.style.width = `${percentage}%`;

    /* RESPOSTAS */
    answers.innerHTML = "";

    scene.options.forEach((option) => {

        const button = document.createElement("button");

        button.type = "button";
        button.className = "answer";
        button.textContent = option.text;

        button.addEventListener("click", () => {
            selectOption(button, option, sceneId);
        });

        answers.appendChild(button);
    });

    /* BOTÃO VOLTAR */
    backButton.style.display = history.length > 0 ? "flex" : "none";
}


/* =========================================================
   SELECIONAR OPÇÃO
========================================================= */

function selectOption(button, option, sceneId) {

    if (selected) return;

    selected = true;

    /* SOMAR PONTOS */
    Object.entries(option.points).forEach(([profile, points]) => {

        if (scores[profile] !== undefined) {
            scores[profile] += points;
        }

    });

    /* REGISTRAR HISTÓRICO */
    history.push({
        sceneId: sceneId,
        option: option
    });

    /* DESABILITAR RESPOSTAS */
    const allAnswers = document.querySelectorAll(".answer");

    allAnswers.forEach(answer => {
        answer.classList.add("disabled");
    });

    button.classList.remove("disabled");
    button.classList.add("selected");

    /* TRANSIÇÃO VISUAL */
    frame.style.opacity = ".5";

    pendingFrameTransition = setTimeout(() => {
        const nextScene = option.next ? scenes[option.next] : null;

        if (nextScene) {
            frame.src = nextScene.frame;
        } else {
            frame.src = "assets/img/moldura4.png";
        }

        frame.style.opacity = "1";
        pendingFrameTransition = null;
    }, 80);

    /* AVANÇO AUTOMÁTICO */
    pendingTransition = setTimeout(() => {

        pendingTransition = null;

        if (option.next) {
            renderScene(option.next);
        } else {
            showResult();
        }

    }, 550);
}


/* =========================================================
   BOTÃO VOLTAR
========================================================= */

function previousQuestion() {

    if (history.length === 0) return;

    /*
       Cancela qualquer avanço automático que ainda esteja
       aguardando depois de uma resposta.
    */
    clearPendingTransitions();

    /*
       Remove a última resposta escolhida.
       Isso também remove seus pontos quando recalculamos
       a pontuação abaixo.
    */
    history.pop();

    /* RECALCULAR PONTUAÇÃO */
    recalculateScores();

    /*
       Se ainda existe histórico, voltamos para a pergunta
       que gerou a última resposta registrada.

       Se não existe mais histórico, voltamos para o início.
    */
    currentScene = history.length > 0
        ? history[history.length - 1].sceneId
        : "q1";

    renderScene(currentScene);
}


/* =========================================================
   DETERMINAR VENCEDOR
========================================================= */

function getWinner() {

    let winner = "curticao";
    let highest = -1;

    Object.entries(scores).forEach(([profile, score]) => {

        if (score > highest) {
            highest = score;
            winner = profile;
        }

    });

    return winner;
}


/* =========================================================
   TELA FINAL DE RESULTADO
========================================================= */

function showResult() {

    clearPendingTransitions();

    quizFinished = true;

    const winnerKey = getWinner();
    const profile = profiles[winnerKey];

    /* ESCONDER CONTEÚDO DO QUIZ */
    hideQuizContent();

    /*
       O botão voltar permanece disponível quando existe
       histórico, permitindo retornar às perguntas anteriores.
    */
    backButton.style.display = history.length > 0 ? "flex" : "none";

    /* MOLDURA FINAL */
    frame.style.opacity = "0";

    pendingFrameTransition = setTimeout(() => {
        frame.src = "assets/img/moldura4.png";
        frame.style.opacity = "1";
        pendingFrameTransition = null;
    }, 100);

    /* RESULTADO */
    resultScore.textContent = "SEU PERFIL NO ROLÊ É:";
    resultTitle.textContent = profile.title;
    resultDescription.textContent = profile.description;

    resultScreen.classList.add("active");

    /* COMPARTILHAR RESULTADO */
    if (resultActions) {
        resultActions.style.display = "flex";
    }

    /* PROGRESSO */
    progressLabel.textContent = "QUIZ CONCLUÍDO";
    progressNumber.textContent = "100%";
    progressFill.style.width = "100%";
}


/* =========================================================
   BOTÃO OUVIR MÚSICA
========================================================= */

function openSpotify() {

    /*
       Mantido temporariamente no Spotify.
       O link específico da música será colocado posteriormente.
    */
    window.open(
        "https://open.spotify.com/",
        "_blank",
        "noopener,noreferrer"
    );
}


/* =========================================================
   COMPARTILHAR MÚSICA
========================================================= */

async function shareMusic() {

    const text = `Ouça agora "Putaria Aditivada" do Airam! 🎧🔥`;

    await handleShare(
        text,
        "AIRAM • Putaria Aditivada",
        shareMusicButton,
        "COMPARTILHAR MÚSICA"
    );
}


/* =========================================================
   COMPARTILHAR RESULTADO
========================================================= */

async function shareResult() {
    if (!quizFinished) return;

    const winnerKey = getWinner();
    const profile = profiles[winnerKey];

    const originalText = shareResultButton.innerHTML;

    shareResultButton.innerHTML = "GERANDO...";
    shareResultButton.disabled = true;

    try {
        /* =====================================================
           CRIAR CANVAS DO CARD
        ===================================================== */

        const canvas = document.createElement("canvas");

        canvas.width = 1080;
        canvas.height = 1920;

        const ctx = canvas.getContext("2d");

        if (!ctx) {
            throw new Error("Canvas não suportado.");
        }


        /* =====================================================
           CARREGAR CARD-BASE
        ===================================================== */

        const baseImage = new Image();

        baseImage.src = "assets/img/card-resultado.png";

        await new Promise((resolve, reject) => {

            baseImage.onload = resolve;

            baseImage.onerror = () => {
                reject(
                    new Error(
                        "Não foi possível carregar card-resultado.png."
                    )
                );
            };

        });


        /* =====================================================
           DESENHAR CARD-BASE
        ===================================================== */

        ctx.drawImage(
            baseImage,
            0,
            0,
            canvas.width,
            canvas.height
        );


        /* =====================================================
           ÁREA DO RESULTADO
           
           O texto será colocado somente na área central
           reservada pela arte do card.
        ===================================================== */

        const centerX = canvas.width / 2;

        const resultArea = {
            maxWidth: 700,
            maxHeight: 245
        };


        /* =====================================================
           AJUSTAR TAMANHO DA FONTE
        ===================================================== */

        function fitFont(
            text,
            fontFamily,
            weight,
            maxSize,
            minSize,
            maxWidth
        ) {

            let size = maxSize;

            while (size > minSize) {

                ctx.font =
                    `${weight} ${size}px ${fontFamily}`;

                if (
                    ctx.measureText(text).width <= maxWidth
                ) {
                    break;
                }

                size -= 2;
            }

            return size;
        }


        /* =====================================================
           DESENHAR NOME DO PERFIL
           
           O nome do resultado é o principal destaque.
        ===================================================== */

        function drawProfileTitle(text) {

            const fontFamily =
                'Impact, Haettenschweiler, "Arial Narrow Bold", Arial, sans-serif';

            const fontSize = fitFont(
                text,
                fontFamily,
                "900",
                112,
                62,
                resultArea.maxWidth
            );

            ctx.font =
                `900 ${fontSize}px ${fontFamily}`;

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            /*
               Contorno preto para separar o texto
               da arte de fundo.
            */

            ctx.lineWidth = 12;
            ctx.strokeStyle = "rgba(0, 0, 0, 0.95)";

            ctx.strokeText(
                text,
                centerX,
                735
            );


            /*
               Texto principal.
            */

            ctx.fillStyle = "#ffffff";

            ctx.fillText(
                text,
                centerX,
                735
            );


            /*
               Pequeno contorno verde para integrar
               o texto à identidade do card.
            */

            ctx.lineWidth = 3;
            ctx.strokeStyle = "rgba(0, 255, 56, 0.8)";

            ctx.strokeText(
                text,
                centerX,
                735
            );
        }


        /* =====================================================
           QUEBRAR E DESENHAR DESCRIÇÃO
        ===================================================== */

        function drawProfileDescription(
            text,
            centerX,
            startY,
            maxWidth,
            maxHeight
        ) {

            const fontFamily =
                "Arial, Helvetica, sans-serif";

            const fontSize = 34;
            const lineHeight = 42;

            ctx.font =
                `700 ${fontSize}px ${fontFamily}`;

            ctx.textAlign = "center";
            ctx.textBaseline = "top";

            const words = text
                .trim()
                .split(/\s+/);

            const lines = [];

            let line = "";


            /*
               Monta as linhas respeitando
               a largura máxima.
            */

            words.forEach(word => {

                const testLine = line
                    ? `${line} ${word}`
                    : word;

                if (
                    ctx.measureText(testLine).width <= maxWidth
                ) {

                    line = testLine;

                } else {

                    if (line) {
                        lines.push(line);
                    }

                    line = word;
                }

            });


            if (line) {
                lines.push(line);
            }


            /*
               Limita a quantidade de linhas
               para não invadir outros elementos.
            */

            const maxLines =
                Math.floor(maxHeight / lineHeight);

            const visibleLines =
                lines.slice(0, maxLines);


            visibleLines.forEach(
                (lineText, index) => {

                    const y =
                        startY +
                        (index * lineHeight);


                    /*
                       Contorno preto.
                    */

                    ctx.lineWidth = 7;
                    ctx.strokeStyle =
                        "rgba(0, 0, 0, 0.9)";

                    ctx.strokeText(
                        lineText,
                        centerX,
                        y
                    );


                    /*
                       Texto branco.
                    */

                    ctx.fillStyle = "#ffffff";

                    ctx.fillText(
                        lineText,
                        centerX,
                        y
                    );

                }
            );
        }


        /* =====================================================
           ESCREVER RESULTADO NO CARD
        ===================================================== */

        drawProfileTitle(
            profile.title
        );

        drawProfileDescription(
            profile.description,
            centerX,
            805,
            700,
            resultArea.maxHeight
        );


        /* =====================================================
           GERAR PNG
        ===================================================== */

        const blob = await new Promise(resolve => {

            canvas.toBlob(
                resolve,
                "image/png"
            );

        });


        if (!blob) {
            throw new Error(
                "Não foi possível gerar a imagem."
            );
        }


        /* =====================================================
           CRIAR ARQUIVO
        ===================================================== */

        const file = new File(
            [blob],
            `resultado-${winnerKey}.png`,
            {
                type: "image/png"
            }
        );


        /* =====================================================
           COMPARTILHAMENTO NATIVO
        ===================================================== */

        if (
            navigator.share &&
            navigator.canShare &&
            navigator.canShare({
                files: [file]
            })
        ) {

            await navigator.share({

                title:
                    `Meu perfil no rolê: ${profile.title}`,

                text:
                    `Meu perfil no rolê é ${profile.title}! ` +
                    `Faça o quiz e descubra o seu.\n`+'https://airamdazl.github.io/quizPA/',

                files: [file]

            });

            return;
        }


        /* =====================================================
           FALLBACK — DOWNLOAD DO PNG
        ===================================================== */

        const downloadUrl =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = downloadUrl;

        link.download =
            `resultado-${winnerKey}.png`;

        document.body.appendChild(link);

        link.click();

        link.remove();

        URL.revokeObjectURL(downloadUrl);


        alert(
            "Seu card foi gerado! " +
            "A imagem foi salva para você compartilhar."
        );


    } catch (error) {

        console.error(
            "Erro ao gerar ou compartilhar o resultado:",
            error
        );


        alert(
            "Não foi possível gerar o card. " +
            "Verifique se o arquivo " +
            "card-resultado.png está na pasta assets/img."
        );


    } finally {

        shareResultButton.innerHTML =
            originalText;

        shareResultButton.disabled =
            false;
    }
}


/* =========================================================
   FUNÇÃO AUXILIAR DE COMPARTILHAMENTO
========================================================= */

async function handleShare(text, title, buttonEl, originalText) {

    if (navigator.share) {

        try {

            await navigator.share({
                title: title,
                text: text,
                url: window.location.href
            });

            return;

        } catch (error) {

            /*
               O usuário pode ter cancelado o compartilhamento.
               Nesse caso, seguimos para o fallback.
            */

        }
    }

    try {

        await navigator.clipboard.writeText(
            `${text}\n${window.location.href}`
        );

        const oldHTML = buttonEl.innerHTML;

        buttonEl.innerHTML =
            '<span class="action-icon">✓</span> COPIADO!';

        setTimeout(() => {
            buttonEl.innerHTML = oldHTML;
        }, 2000);

    } catch (error) {

        alert(text);

    }
}


/* =========================================================
   LISTENERS DE EVENTOS
========================================================= */

backButton.addEventListener("click", previousQuestion);

soundButton.addEventListener("click", openSpotify);

shareMusicButton.addEventListener("click", shareMusic);

shareResultButton.addEventListener("click", shareResult);


/* =========================================================
   TECLADO
========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowLeft") {
        previousQuestion();
    }

});


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

renderScene("q1");