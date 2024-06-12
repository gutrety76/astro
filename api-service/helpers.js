
const Enum = require('enum');
const zodiac_flags = new Enum({'Aquarius': 0, 'Pisces': 1, 'Aries': 2, 'Taurus': 3, 'Gemini': 4, 'Cancer': 5, 'Leo': 6, 'Virgo': 7, 'Libra': 8, 'Scorpio': 9, 'Sagittarius': 10, 'Capricorn': 11}, { ignoreCase: true })



function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

module.exports = {addDays, zodiac_flags}