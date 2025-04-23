// Подключение библиотеки express
const express = require('express');
const app = express();

// Определение порта, используя переменные окружения Render ($PORT)
const PORT = process.env.PORT || 3000;

// Запускаем сервер
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});