const regex = /\/project\/\d+/
const string = 'Это строкак содержит /project/123 внутри.'
const match = string.match(regex)
if (match) {
  const fullString = match
  console.log('Найдена полная строка:', fullString)
} else {
  console.log('Совпадений не найдено.')
}
