let mediaRecorder;
let audioChunks = [];

// Функция для инициализации микрофона
async function initMicrophone() {
  try {
    // Ждем, пока пользователь разрешит доступ к микрофону
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Создаем экземпляр MediaRecorder
    mediaRecorder = new MediaRecorder(stream);

    // Событие сбора данных
    mediaRecorder.ondataavailable = event => {
      audioChunks.push(event.data);
    };

    // Событие завершения записи
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      audioChunks = []; // Очищаем массив для будущего использования

      // Создаем плеер на странице
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.controls = true;
      document.body.appendChild(audio);
    };

    console.log('Микрофон успешно подключен');
  } catch (error) {
    // Сюда код попадет, если пользователь запретил доступ или нет микрофона
    console.error('Ошибка доступа к микрофону:', error);
  }
}

// Запуск записи
function startRecording() {
  if (mediaRecorder && mediaRecorder.state === 'inactive') {
    audioChunks = [];
    mediaRecorder.start();
    console.log('Запись пошла...');
  }
}

// Остановка записи
function stopRecording() {
  if (mediaRecorder && mediaRecorder.state === 'recording') {
    mediaRecorder.stop();
    console.log('Запись остановлена.');
  }
}

// Вызываем инициализацию при загрузке скрипта
initMicrophone();