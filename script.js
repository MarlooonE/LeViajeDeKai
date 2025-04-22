// script.js
const scenes = {
    start: {
        title: "El inicio del viaje",
        story: "Kai está frente al Cruce del Caos. Un camino tranquilo lo distrae, el otro le exige valentía. ¿Qué elige?",
        options: [
            { text: "Evitar el reto", next: "evita_reto" },
            { text: "Enfrentar el miedo", next: "cruce_valiente" }
        ]
    },
    evita_reto: {
        title: "Evitando el reto",
        story: "Kai se aleja. La calma es breve. El deseo de avanzar regresa.",
        options: [{ text: "Volver al cruce", next: "start" }]
    },
    cruce_valiente: {
        title: "Paso valiente",
        story: "Kai respira profundo y avanza. El camino cruje bajo sus pies. Una sombra lo detiene...",
        options: [{ text: "Escuchar a la sombra", next: "voz_miedo" }]
    },
    voz_miedo: {
        title: "La voz del miedo",
        story: "'No puedes', 'Vas a fallar'... ¿Qué hace Kai?",
        options: [
            { text: "Creerle", next: "retroceso" },
            { text: "Usar autoinstrucciones", next: "afronta_miedo" }
        ]
    },
    retroceso: {
        title: "Retroceso emocional",
        story: "El miedo lo envuelve. Pero recuerda que tiene opciones...",
        options: [{ text: "Intentarlo de nuevo", next: "voz_miedo" }]
    },
    afronta_miedo: {
        title: "Confrontando el miedo",
        story: "'Tengo miedo, pero puedo avanzar', dice Kai. La sombra se disipa.",
        options: [{ text: "Seguir adelante", next: "desierto_estres" }]
    },
    desierto_estres: {
        title: "El desierto del estrés",
        story: "Cansancio, exigencias y dudas lo rodean. ¿Cómo responde Kai?",
        options: [
            { text: "Respirar y reorganizarse", next: "lago_recuerdos" },
            { text: "Ignorar todo", next: "agotamiento" }
        ]
    },
    lago_recuerdos: {
        title: "Lago de los recuerdos",
        story: "Kai se sienta, reflexiona. ¿Qué logros ha tenido?",
        reflection: true,
        options: [{ text: "Continuar con claridad", next: "montaña_comparacion" }]
    },
    agotamiento: {
        title: "Colapso emocional",
        story: "Kai sigue, pero sin energía. Debe detenerse.",
        options: [{ text: "Volver y respirar", next: "desierto_estres" }]
    },
    montaña_comparacion: {
        title: "Montaña de la comparación",
        story: "Kai ve a otros que parecen más rápidos. ¿Cómo se siente consigo mismo?",
        options: [
            { text: "Se juzga con dureza", next: "viento_deberia" },
            { text: "Recuerda su proceso", next: "sabio_interior" }
        ]
    },
    viento_deberia: {
        title: "El viento de los 'debería'",
        story: "'Debería ser más fuerte', 'más rápido'... ¿Kai los acepta o los transforma?",
        options: [
            { text: "Transformarlos en autocompasión", next: "sabio_interior" },
            { text: "Seguir autoexigiéndose", next: "agotamiento" }
        ]
    },
    sabio_interior: {
        title: "El sabio interior",
        story: "Una voz suave le dice: 'Vas bien. Tu paso es el correcto'. ¿Qué emoción no ha atendido Kai?",
        reflection: true,
        options: [{ text: "Seguir con sabiduría", next: "valle_risa" }]
    },
    valle_risa: {
        title: "Valle de la risa",
        story: "Kai encuentra alivio en el juego. Aprende que reír también sana.",
        options: [{ text: "Fortalecido, sigue su viaje", next: "espejo_valor" }]
    },
    espejo_valor: {
        title: "Espejo del valor",
        story: "Kai se ve reflejado. ¿Qué reconoce de sí mismo?",
        reflection: true,
        options: [{ text: "Finalizar el viaje por hoy", next: "fin" }]
    },
    fin: {
        title: "Cierre del viaje",
        story: "Kai ha recorrido pensamientos, emociones y elecciones. El viaje sigue, pero hoy ha dado grandes pasos.",
        options: [{ text: "Volver al inicio", next: "start" }]
    }
};

const title = document.getElementById("title");
const story = document.getElementById("story");
const optionsDiv = document.getElementById("options");
const reflectionDiv = document.getElementById("reflection");

const sceneImages = {
    start: 'imagenes/perro9.webp',
    cruce_valiente: 'imagenes/perro11.jpg',
    lago_recuerdos: 'imagenes/perro13.webp',
    montaña_comparacion: 'imagenes/perro14.jpg',
    valle_risa: 'imagenes/perro12.png',
    espejo_valor: 'imagenes/perro15.jpg',
    fin: 'imagenes/perro16.jpg'
    // imagenes perritos
};

function showScene(key) {
    const scene = scenes[key];
    const sceneImage = document.createElement('img');
    sceneImage.className = 'scene-image';
    sceneImage.alt = `Ilustración de ${scene.title}`;
    
    const oldImage = document.querySelector('.scene-image');
    if (oldImage) {
        oldImage.remove();
    }
    
    //imagen titulo
    if (sceneImages[key]) {
        sceneImage.src = sceneImages[key];
        title.parentNode.insertBefore(sceneImage, title.nextSibling);
    }
    
    title.textContent = scene.title;
    story.textContent = scene.story;
    optionsDiv.innerHTML = "";
    reflectionDiv.innerHTML = "";
    
    if (scene.reflection) {
        const label = document.createElement("label");
        label.textContent = "Escribe aquí tu reflexión:";
        const textarea = document.createElement("textarea");
        reflectionDiv.appendChild(label);
        reflectionDiv.appendChild(textarea);
    }
    
    scene.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option.text;
        button.onclick = () => showScene(option.next);
        optionsDiv.appendChild(button);
    });
}

// Sistema de audio
const audioPlayer = {
    init() {
        this.audio = document.getElementById('audioPlayer');
        this.playPauseButton = document.getElementById('playPauseBtn');
        this.volumeControl = document.getElementById('volumeControl');
        
        this.setupEventListeners();
        this.setVolume(0.7); // Volumen inicial
        
        // Reproducir automáticamente al cargar
        this.audio.load();
    },
    
    setupEventListeners() {
        let volumeTimeoutId;
        
        // play
        this.playPauseButton.addEventListener('click', () => this.togglePlay());
        
        // Implementar debouncing solo para el control de volumen
        this.volumeControl.addEventListener('input', (e) => {
            // Asegurarnos de que el evento viene del control de volumen
            if (e.target === this.volumeControl) {
                clearTimeout(volumeTimeoutId);
                volumeTimeoutId = setTimeout(() => {
                    this.setVolume(this.volumeControl.value);
                }, 150);
            }
        });
        
        // fin
        this.audio.addEventListener('ended', () => {
            this.playPauseButton.textContent = '▶';
        });
    }, 
    
    togglePlay() {
        if (this.audio.paused) {
            this.audio.play();
            this.playPauseButton.textContent = '⏸';
        } else {
            this.audio.pause();
            this.playPauseButton.textContent = '▶';
        }
    },
    
    setVolume(value) {
        this.audio.volume = value;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    audioPlayer.init();
    showScene("start");
});

// Sistema de relajación
const relaxSystem = {
    init() {
        this.currentIndex = 0;
        this.images = [
            'imagenes/17.png',
            'imagenes/18.png',
            'imagenes/19.png'
        ];
        
        this.relaxBtn = document.getElementById('relaxBtn');
        this.relaxModal = document.getElementById('relaxModal');
        this.relaxImage = document.getElementById('relaxImage');
        this.prevBtn = document.getElementById('prevImage');
        this.closeBtn = document.getElementById('closeRelaxModal');
        this.nextBtn = document.getElementById('nextImage');
        this.quotes = [
            "Toma una pausa, no olvides que lo más importante eres tú",
            
"Es hora de distraer nuestras reacciones fisiológicas",
            
"No lo dejes para después, este es el momento para calmarnos",
            
"Este es el mejor momento para pensar en ti y tomar un descanso",
"No lo dejes para después, este es el momento para calmarnos"
        ];
        this.quoteElement = document.getElementById('inspirationalQuote'); // Asegúrate de que este ID esté en tu HTML
        
        this.setupEventListeners();
    },
    
    setupEventListeners() {
        this.relaxBtn.addEventListener('click', () => this.toggleModal());
        this.prevBtn.addEventListener('click', () => this.showPrevious());
        this.nextBtn.addEventListener('click', () => this.showNext());
        this.closeBtn.addEventListener('click', () => this.toggleModal());
        
        // Cerrar modal al hacer clic fuera
        this.relaxModal.addEventListener('click', (e) => {
            if (e.target === this.relaxModal) {
                this.toggleModal();
            }
        });
    },
    
    toggleModal() {
        this.relaxModal.style.display = this.relaxModal.style.display === 'flex' ? 'none' : 'flex';
        if (this.relaxModal.style.display === 'flex') {
            this.showImage(0);
            this.showRandomQuote(); // Mostrar una frase aleatoria al abrir el modal
        }
    },
    
    showImage(index) {
        this.currentIndex = index;
        this.relaxImage.src = this.images[index];
        this.relaxImage.alt = `Imagen de relajación ${index + 1}`;
    },
    
    showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * this.quotes.length);
        this.quoteElement.textContent = this.quotes[randomIndex];
    },
    
    showPrevious() {
        const newIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showImage(newIndex);
    },
    
    showNext() {
        const newIndex = (this.currentIndex + 1) % this.images.length;
        this.showImage(newIndex);
    }
};

// Inicializar el sistema de relajación
document.addEventListener('DOMContentLoaded', () => {
    relaxSystem.init();
});

const sudokuSystem = {
    init() {
        this.currentIndex = 0;
        this.images = [
            'imagenes/sud1.jpg',
            'imagenes/sud2.jpg',
            'imagenes/sud3.jpg',
            'imagenes/sud4.jpg'
        ];
        
        this.sudokuBtn = document.getElementById('sudokuBtn');
        this.sudokuModal = document.getElementById('sudokuModal');
        this.sudokuImage = document.getElementById('sudokuImage');
        this.prevBtn = document.getElementById('prevSudoku');
        this.closeBtn = document.getElementById('closeSudokuModal');
        this.nextBtn = document.getElementById('nextSudoku');
        this.quotes = [
            "Tienes un nuevo reto, corrígelo y resuelve.",
            "Es hora de tomarte un descanso, corrige y resuelve.",
            "Corrige y resuelve ¡No te rindas!.",
             "El momento perfecto para calamar los pensamientos corrige y resuelve."
        ];
        this.quoteElement = document.getElementById('sudokuQuote');
        
        this.setupEventListeners();
    },
    
    setupEventListeners() {
        this.sudokuBtn.addEventListener('click', () => this.toggleModal());
        this.prevBtn.addEventListener('click', () => this.showPrevious());
        this.nextBtn.addEventListener('click', () => this.showNext());
        this.closeBtn.addEventListener('click', () => this.toggleModal());
        
        // Cerrar modal al hacer clic fuera
        this.sudokuModal.addEventListener('click', (e) => {
            if (e.target === this.sudokuModal) {
                this.toggleModal();
            }
        });
    },
    
    toggleModal() {
        this.sudokuModal.style.display = this.sudokuModal.style.display === 'flex' ? 'none' : 'flex';
        if (this.sudokuModal.style.display === 'flex') {
            this.showImage(0);
            this.showRandomQuote();
        }
    },
    
    showImage(index) {
        this.currentIndex = index;
        this.sudokuImage.src = this.images[index];
        this.sudokuImage.alt = `Imagen de Sudoku ${index + 1}`;
    },
    
    showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * this.quotes.length);
        this.quoteElement.textContent = this.quotes[randomIndex];
    },
    
    showPrevious() {
        const newIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showImage(newIndex);
    },
    
    showNext() {
        const newIndex = (this.currentIndex + 1) % this.images.length;
        this.showImage(newIndex);
    }
};

// Inicializar el sistema de Sudoku
document.addEventListener('DOMContentLoaded', () => {
    sudokuSystem.init();
});
const wordSystem = {
    init() {
        this.currentIndex = 0;
        this.images = [
            'imagenes/sopa5.jpg',
            'imagenes/sopa6.jpg',
            'imagenes/sopa7.jpg',
            'imagenes/sopa8.jpg'
        ];
        
        this.wordBtn = document.getElementById('wordBtn');
        this.wordModal = document.getElementById('wordModal');
        this.wordImage = document.getElementById('wordImage');
        this.prevBtn = document.getElementById('prevWord');
        this.closeBtn = document.getElementById('closeWordModal');
        this.nextBtn = document.getElementById('nextWord');
        this.quotes = [
            "Te gustan los retos, esto puede interesarte ¡Inténtalo!",
            "No hay otro momento, este es el indicado para que pienses en ¡Lo logré!",
            "¡No te rindas! Es hora de dejar todos los pensamientos y hacer algo más divertido",
            "¡Es ahora o nunca! No te pierdas la oportunidad de hacer algo diferente, la rutina a veces es aburrida"
        ];
        this.quoteElement = document.getElementById('wordQuote');
        
        this.setupEventListeners();
    },
    
    setupEventListeners() {
        this.wordBtn.addEventListener('click', () => this.toggleModal());
        this.prevBtn.addEventListener('click', () => this.showPrevious());
        this.nextBtn.addEventListener('click', () => this.showNext());
        this.closeBtn.addEventListener('click', () => this.toggleModal());
        
        // Cerrar modal al hacer clic fuera
        this.wordModal.addEventListener('click', (e) => {
            if (e.target === this.wordModal) {
                this.toggleModal();
            }
        });
    },
    
    toggleModal() {
        this.wordModal.style.display = this.wordModal.style.display === 'flex' ? 'none' : 'flex';
        if (this.wordModal.style.display === 'flex') {
            this.showImage(0);
            this.showRandomQuote();
        }
    },
    
    showImage(index) {
        this.currentIndex = index;
        this.wordImage.src = this.images[index];
        this.wordImage.alt = `Imagen de Sopa de Letras ${index + 1}`;
    },
    
    showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * this.quotes.length);
        this.quoteElement.textContent = this.quotes[randomIndex];
    },
    
    showPrevious() {
        const newIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showImage(newIndex);
    },
    
    showNext() {
        const newIndex = (this.currentIndex + 1) % this.images.length;
        this.showImage(newIndex);
    }
};

// Inicializar el sistema de Sopa de Letras
document.addEventListener('DOMContentLoaded', () => {
    wordSystem.init();
});

const mazeSystem = {
    init() {
        this.currentIndex = 0;
        this.images = [
            'imagenes/lab8.jpg',
            'imagenes/lab5.jpg',
            'imagenes/lab6.jpg',
            'imagenes/lab7.jpg'
        ];
        
        this.mazeBtn = document.getElementById('mazeBtn');
        this.mazeModal = document.getElementById('mazeModal');
        this.mazeImage = document.getElementById('mazeImage');
        this.prevBtn = document.getElementById('prevMaze');
        this.closeBtn = document.getElementById('closeMazeModal');
        this.nextBtn = document.getElementById('nextMaze');
        this.quotes = [
            "Puedes intentarlo será divertido",
            "Si hay una salida, en este reto y en la vida ¡Puedes hacerlo!",
            "Es hora de comenzar una actividad diferente, que estimule tu mente y te de la salida",
          "¡No lo dejes para después! Si estás aquí hazlo, es tu pequeño propósito"
        ];
        this.quoteElement = document.getElementById('mazeQuote');
        
        this.setupEventListeners();
    },
    
    setupEventListeners() {
        this.mazeBtn.addEventListener('click', () => this.toggleModal());
        this.prevBtn.addEventListener('click', () => this.showPrevious());
        this.nextBtn.addEventListener('click', () => this.showNext());
        this.closeBtn.addEventListener('click', () => this.toggleModal());
        
        // Cerrar modal al hacer clic fuera
        this.mazeModal.addEventListener('click', (e) => {
            if (e.target === this.mazeModal) {
                this.toggleModal();
            }
        });
    },
    
    toggleModal() {
        this.mazeModal.style.display = this.mazeModal.style.display === 'flex' ? 'none' : 'flex';
        if (this.mazeModal.style.display === 'flex') {
            this.showImage(0);
            this.showRandomQuote();
        }
    },
    
    showImage(index) {
        this.currentIndex = index;
        this.mazeImage.src = this.images[index];
        this.mazeImage.alt = `Imagen de Laberinto ${index + 1}`;
    },
    
    showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * this.quotes.length);
        this.quoteElement.textContent = this.quotes[randomIndex];
    },
    
    showPrevious() {
        const newIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showImage(newIndex);
    },
    
    showNext() {
        const newIndex = (this.currentIndex + 1) % this.images.length;
        this.showImage(newIndex);
    }
};

// Inicializar el sistema de Laberintos
document.addEventListener('DOMContentLoaded', () => {
    mazeSystem.init();
});