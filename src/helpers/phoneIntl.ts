// Справочник кодов стран, форматов и флагов перенесён из phoneIntl.js
// вашего архива без изменений. Правки только в сигнатурах — под TypeScript.

function digitsOnly(str: string): string {
  return (str || "").replace(/\D/g, "");
}

function formatNational(s: string, pattern: string): string {
  let out = "";
  let i = 0;
  for (let k = 0; k < pattern.length; k++) {
    if (pattern[k] === "X") {
      if (i < s.length) out += s[i++];
    } else {
      if (i < s.length) out += pattern[k];
    }
  }
  while (i < s.length) out += s[i++];
  return out;
}

// prefix, total len, national pattern; longer prefixes first
export type PhoneCountry = {
  prefix: string
  total: number
  national: string
}

export const PHONE_COUNTRIES: PhoneCountry[] = [
  { prefix: "998", total: 12, national: "XX XXX XX XX" },
  { prefix: "996", total: 12, national: "XXX XXX XXX" },
  { prefix: "995", total: 12, national: "XXX XXX XXX" },
  { prefix: "994", total: 12, national: "XX XXX XX XX" },
  { prefix: "993", total: 11, national: "XX XXXXXX" },
  { prefix: "992", total: 12, national: "XX XXX XX XX" },
  { prefix: "991", total: 10, national: "XXX XX XX" },
  { prefix: "976", total: 11, national: "XXXX XXXX" },
  { prefix: "975", total: 11, national: "XX XX XX XX" },
  { prefix: "974", total: 11, national: "XXXX XXXX" },
  { prefix: "973", total: 11, national: "XXXX XXXX" },
  { prefix: "972", total: 12, national: "XX XXX XXXX" },
  { prefix: "971", total: 12, national: "XX XXX XXXX" },
  { prefix: "970", total: 12, national: "XXX XXX XXX" },
  { prefix: "968", total: 11, national: "XXXX XXXX" },
  { prefix: "967", total: 12, national: "XXX XXX XXX" },
  { prefix: "966", total: 12, national: "XX XXX XXXX" },
  { prefix: "965", total: 11, national: "XXXX XXXX" },
  { prefix: "964", total: 13, national: "XXX XXX XXXX" },
  { prefix: "963", total: 12, national: "XXX XXX XXX" },
  { prefix: "962", total: 12, national: "X XXXX XXXX" },
  { prefix: "961", total: 11, national: "XX XXX XXX" },
  { prefix: "960", total: 10, national: "XXX XXXX" },
  { prefix: "886", total: 12, national: "XXX XXX XXX" },
  { prefix: "885", total: 11, national: "XX XXX XXX" },
  { prefix: "856", total: 11, national: "XX XXX XXX" },
  { prefix: "855", total: 11, national: "XX XXX XXX" },
  { prefix: "853", total: 11, national: "XXXX XXXX" },
  { prefix: "852", total: 11, national: "XXXX XXXX" },
  { prefix: "850", total: 14, national: "XXX XXXX XXXX" },
  { prefix: "692", total: 10, national: "XXX XXXX" },
  { prefix: "691", total: 11, national: "X XXX XXXX" },
  { prefix: "690", total: 7, national: "XXXX" },
  { prefix: "689", total: 9, national: "XX XX XX" },
  { prefix: "688", total: 8, national: "XX XXX" },
  { prefix: "687", total: 9, national: "XX XX XX" },
  { prefix: "686", total: 10, national: "XXX XXXX" },
  { prefix: "685", total: 10, national: "XX XXXXX" },
  { prefix: "684", total: 10, national: "XXX XXXX" },
  { prefix: "683", total: 7, national: "XXXX" },
  { prefix: "682", total: 8, national: "XX XXX" },
  { prefix: "681", total: 9, national: "XX XX XX" },
  { prefix: "680", total: 10, national: "XXX XXXX" },
  { prefix: "679", total: 10, national: "XXX XXXX" },
  { prefix: "678", total: 10, national: "XXX XXXX" },
  { prefix: "677", total: 10, national: "XX XXXXX" },
  { prefix: "676", total: 8, national: "XXXXX" },
  { prefix: "675", total: 10, national: "XXX XXXX" },
  { prefix: "674", total: 10, national: "XXX XXXX" },
  { prefix: "673", total: 10, national: "XXX XXXX" },
  { prefix: "672", total: 10, national: "X XXX XXX" },
  { prefix: "671", total: 10, national: "XXX XXXX" },
  { prefix: "670", total: 10, national: "XXX XXXX" },
  { prefix: "599", total: 11, national: "X XXX XXXX" },
  { prefix: "598", total: 11, national: "X XXX XXXX" },
  { prefix: "597", total: 10, national: "XXX XXXX" },
  { prefix: "595", total: 12, national: "XXX XXX XXX" },
  { prefix: "594", total: 12, national: "X XX XX XX XX" },
  { prefix: "593", total: 12, national: "XX XXX XXXX" },
  { prefix: "592", total: 10, national: "XXX XXXX" },
  { prefix: "591", total: 11, national: "XXXX XXXX" },
  { prefix: "590", total: 12, national: "XXX XX XX XX" },
  { prefix: "509", total: 11, national: "XX XX XXXX" },
  { prefix: "508", total: 9, national: "XX XX XX" },
  { prefix: "507", total: 10, national: "XXX XXXX" },
  { prefix: "506", total: 10, national: "XXX XXXX" },
  { prefix: "505", total: 10, national: "XXX X XXX" },
  { prefix: "504", total: 11, national: "XXXX XXXX" },
  { prefix: "503", total: 11, national: "XX XX XX XX" },
  { prefix: "502", total: 11, national: "XXXX XXXX" },
  { prefix: "501", total: 10, national: "XXX XXXX" },
  { prefix: "500", total: 8, national: "XXXXX" },
  { prefix: "423", total: 10, national: "XXX XXXX" },
  { prefix: "421", total: 12, national: "XXX XXX XXX" },
  { prefix: "420", total: 12, national: "XXX XXX XXX" },
  { prefix: "389", total: 11, national: "XX XXX XXX" },
  { prefix: "386", total: 11, national: "XX XXX XXX" },
  { prefix: "385", total: 12, national: "XX XXX XXXX" },
  { prefix: "383", total: 11, national: "XX XXX XXX" },
  { prefix: "382", total: 11, national: "XX XXX XXX" },
  { prefix: "381", total: 12, national: "XX XXX XXXX" },
  { prefix: "380", total: 12, national: "XX XXX XX XX" },
  { prefix: "379", total: 12, national: "XX XXX XXXX" },
  { prefix: "378", total: 13, national: "XXXX XXXXXX" },
  { prefix: "377", total: 12, national: "X XX XX XX XX" },
  { prefix: "376", total: 9, national: "XXX XXX" },
  { prefix: "375", total: 12, national: "(XX) XXX-XX-XX" },
  { prefix: "374", total: 11, national: "XX XXX XXX" },
  { prefix: "373", total: 11, national: "XX XXX XXX" },
  { prefix: "372", total: 11, national: "XXXX XXXX" },
  { prefix: "371", total: 11, national: "XX XXX XXX" },
  { prefix: "370", total: 11, national: "XXX XXXXX" },
  { prefix: "359", total: 12, national: "XX XXX XXXX" },
  { prefix: "358", total: 13, national: "XX XXX XXXX" },
  { prefix: "357", total: 11, national: "XX XXX XXX" },
  { prefix: "356", total: 11, national: "XXXX XXXX" },
  { prefix: "355", total: 12, national: "XX XXX XXXX" },
  { prefix: "354", total: 10, national: "XXX XXXX" },
  { prefix: "353", total: 12, national: "XX XXX XXXX" },
  { prefix: "352", total: 11, national: "XXX XXX" },
  { prefix: "351", total: 12, national: "XXX XXX XXX" },
  { prefix: "350", total: 10, national: "XXXXXXX" },
  { prefix: "299", total: 9, national: "XX XX XX" },
  { prefix: "298", total: 9, national: "XX XX XX" },
  { prefix: "297", total: 10, national: "XXX XXXX" },
  { prefix: "291", total: 10, national: "X XXX XXX" },
  { prefix: "290", total: 7, national: "XXXX" },
  { prefix: "269", total: 10, national: "XX XXX XX" },
  { prefix: "268", total: 10, national: "XX XXX XX" },
  { prefix: "267", total: 11, national: "XX XXX XXX" },
  { prefix: "266", total: 11, national: "X XXX XXXX" },
  { prefix: "265", total: 12, national: "X XX XX XX XX" },
  { prefix: "264", total: 12, national: "XX XXX XXXX" },
  { prefix: "263", total: 12, national: "XX XXX XXXX" },
  { prefix: "262", total: 12, national: "XXX XX XX XX" },
  { prefix: "261", total: 12, national: "XX XX XXX XX" },
  { prefix: "260", total: 12, national: "XX XXX XXXX" },
  { prefix: "258", total: 12, national: "XX XXX XXXX" },
  { prefix: "257", total: 11, national: "XX XX XX XX" },
  { prefix: "256", total: 12, national: "XXX XXX XXX" },
  { prefix: "255", total: 12, national: "XXX XXX XXX" },
  { prefix: "254", total: 12, national: "XXX XXX XXX" },
  { prefix: "253", total: 11, national: "XX XX XX XX" },
  { prefix: "252", total: 12, national: "XX XXX XXXX" },
  { prefix: "251", total: 12, national: "XX XXX XXXX" },
  { prefix: "250", total: 12, national: "XXX XXX XXX" },
  { prefix: "249", total: 12, national: "XXX XXX XXX" },
  { prefix: "248", total: 10, national: "X XXX XXX" },
  { prefix: "246", total: 10, national: "XXX XXXX" },
  { prefix: "245", total: 10, national: "XXX XXXX" },
  { prefix: "244", total: 12, national: "XXX XXX XXX" },
  { prefix: "243", total: 12, national: "XXX XXX XXX" },
  { prefix: "242", total: 12, national: "XX XXX XXXX" },
  { prefix: "241", total: 11, national: "XX XX XX XX" },
  { prefix: "240", total: 12, national: "XXX XXX XXX" },
  { prefix: "239", total: 10, national: "XXX XXXX" },
  { prefix: "238", total: 10, national: "XXX XX XX" },
  { prefix: "237", total: 11, national: "XX XX XX XX" },
  { prefix: "236", total: 11, national: "XX XX XX XX" },
  { prefix: "235", total: 11, national: "XX XX XX XX" },
  { prefix: "234", total: 13, national: "XXX XXX XXXX" },
  { prefix: "233", total: 12, national: "XX XXX XXXX" },
  { prefix: "232", total: 11, national: "XX XXXXXX" },
  { prefix: "231", total: 12, national: "XX XXX XXXX" },
  { prefix: "230", total: 11, national: "XXXX XXXX" },
  { prefix: "229", total: 11, national: "XX XX XX XX" },
  { prefix: "228", total: 11, national: "XX XX XX XX" },
  { prefix: "227", total: 11, national: "XX XX XX XX" },
  { prefix: "226", total: 11, national: "XX XX XX XX" },
  { prefix: "225", total: 11, national: "XX XX XX XX" },
  { prefix: "224", total: 12, national: "XXX XX XX XX" },
  { prefix: "223", total: 11, national: "XX XX XX XX" },
  { prefix: "222", total: 11, national: "XX XX XX XX" },
  { prefix: "221", total: 12, national: "XXX XXX XXX" },
  { prefix: "220", total: 10, national: "XXX XXXX" },
  { prefix: "218", total: 12, national: "XX XXX XXXX" },
  { prefix: "213", total: 12, national: "XXX XXX XXX" },
  { prefix: "212", total: 12, national: "XXX XXX XXX" },
  { prefix: "98", total: 12, national: "XXX XXX XXXX" },
  { prefix: "97", total: 12, national: "X XXX XXX XXX" },
  { prefix: "95", total: 11, national: "XX XXX XXXX" },
  { prefix: "94", total: 11, national: "XX XXX XXXX" },
  { prefix: "93", total: 11, national: "XXX XXX XXX" },
  { prefix: "92", total: 12, national: "XXX XXX XXXX" },
  { prefix: "91", total: 12, national: "XXXXX XXXXX" },
  { prefix: "90", total: 12, national: "XXX XXX XXXX" },
  { prefix: "86", total: 13, national: "XXX XXXX XXXX" },
  { prefix: "84", total: 12, national: "XX XXXX XXXX" },
  { prefix: "82", total: 12, national: "XX XXXX XXXX" },
  { prefix: "81", total: 12, national: "XX XXXX XXXX" },
  { prefix: "66", total: 11, national: "XX XXX XXXX" },
  { prefix: "65", total: 10, national: "XXXX XXXX" },
  { prefix: "64", total: 12, national: "XX XXX XXXX" },
  { prefix: "63", total: 12, national: "XXX XXX XXXX" },
  { prefix: "62", total: 13, national: "XXX XXXX XXXX" },
  { prefix: "61", total: 11, national: "XXX XXX XXX" },
  { prefix: "60", total: 12, national: "XX XXXX XXXX" },
  { prefix: "58", total: 12, national: "XXX XXX XXXX" },
  { prefix: "57", total: 12, national: "XXX XXX XXXX" },
  { prefix: "56", total: 11, national: "X XXXX XXXX" },
  { prefix: "55", total: 13, national: "XX XXXXX XXXX" },
  { prefix: "54", total: 13, national: "XX XXXX XXXX" },
  { prefix: "53", total: 10, national: "X XXX XXXX" },
  { prefix: "52", total: 12, national: "XXX XXX XXXX" },
  { prefix: "51", total: 12, national: "X XXX XXX XXX" },
  { prefix: "49", total: 13, national: "XXX XXXXXXXX" },
  { prefix: "48", total: 11, national: "XXX XXX XXX" },
  { prefix: "47", total: 10, national: "XXX XX XXX" },
  { prefix: "46", total: 12, national: "XX XXX XX XX" },
  { prefix: "45", total: 10, national: "XX XX XX XX" },
  { prefix: "44", total: 12, national: "XXXX XXXXXX" },
  { prefix: "43", total: 13, national: "XXX XXXXXXX" },
  { prefix: "41", total: 11, national: "XX XXX XX XX" },
  { prefix: "40", total: 11, national: "XXX XXX XXX" },
  { prefix: "39", total: 13, national: "XXX XXX XXXX" },
  { prefix: "36", total: 11, national: "XX XXX XXXX" },
  { prefix: "34", total: 11, national: "XXX XXX XXX" },
  { prefix: "33", total: 11, national: "X XX XX XX XX" },
  { prefix: "32", total: 11, national: "XXX XX XX XX" },
  { prefix: "31", total: 12, national: "X XX XXX XXXX" },
  { prefix: "30", total: 12, national: "XXX XXX XXXX" },
  { prefix: "27", total: 11, national: "XX XXX XXXX" },
  { prefix: "20", total: 12, national: "XXX XXX XXXX" },
  { prefix: "7", total: 11, national: "XXX XXX-XX-XX" },
  { prefix: "1", total: 11, national: "XXX XXX-XXXX" },
];

// Страны с переменной длиной номера: одним total её не выразить, поэтому
// здесь total держит запас сверх шаблона. Заниженный total блокировал бы
// валидный ввод — это хуже лишней цифры.
export const VARIABLE_LENGTH_PREFIXES = new Set([
  "39",  // Италия: NSN 9-11
  "43",  // Австрия: NSN до 13
  "46",  // Швеция
  "54",  // Аргентина
  "64",  // Новая Зеландия
  "352", // Люксембург: NSN 4-11
  "358", // Финляндия
])

// Инвариант: total = длина кода страны + число X в шаблоне.
// Нарушение означает, что можно ввести лишнюю цифру (total больше) либо
// что шаблон нельзя заполнить целиком (total меньше).
export function findTotalMismatches(): PhoneCountry[] {
  return PHONE_COUNTRIES.filter((country) => {
    if (VARIABLE_LENGTH_PREFIXES.has(country.prefix)) return false
    const digits = (country.national.match(/X/g) ?? []).length
    return country.total !== country.prefix.length + digits
  })
}

export function normalizePhoneDigits(str: string): string {
  let digits = digitsOnly(str);
  // 8XXXXXXXXXX -> 7...
  if (digits.length === 11 && digits.charAt(0) === "8") digits = "7" + digits.slice(1);
  return digits;
}

export function getMaxDigitsByPrefix(digits: string): number {
  if (!digits) return 15;
  for (let i = 0; i < PHONE_COUNTRIES.length; i++) {
    const c = PHONE_COUNTRIES[i];
    if (digits.startsWith(c.prefix)) return c.total;
  }
  return 15; // E.164 max
}

export function formatPhoneForDisplay(digits: string): string {
  if (!digits) return "";
  digits = normalizePhoneDigits(digits);
  for (let i = 0; i < PHONE_COUNTRIES.length; i++) {
    const c = PHONE_COUNTRIES[i];
    if (digits.startsWith(c.prefix) && digits.length <= c.total) {
      const nat = digits.slice(c.prefix.length);
      const formatted = formatNational(nat, c.national);
      return formatted ? `+${c.prefix} ${formatted}` : `+${c.prefix}`;
    }
  }
  const g = digits.match(/.{1,3}/g) || [];
  return `+${g.join(" ")}`;
}

export function formatPhoneE164(digits: string): string {
  digits = normalizePhoneDigits(digits);
  return digits ? `+${digits}` : "";
}

const FLAG_DEFAULT = "🌍";

const FLAG_BY_PREFIX: Record<string, string> = {
  "375": "🇧🇾",
  "380": "🇺🇦",
  "370": "🇱🇹",
  "371": "🇱🇻",
  "372": "🇪🇪",
  "373": "🇲🇩",
  "374": "🇦🇲",
  "995": "🇬🇪",
  "48": "🇵🇱",
  "49": "🇩🇪",
  "420": "🇨🇿",
  "421": "🇸🇰",
  "40": "🇷🇴",
  "359": "🇧🇬",
  "30": "🇬🇷",
  "90": "🇹🇷",
  "31": "🇳🇱",
  "32": "🇧🇪",
  "33": "🇫🇷",
  "34": "🇪🇸",
  "39": "🇮🇹",
  "41": "🇨🇭",
  "43": "🇦🇹",
  "44": "🇬🇧",
  "45": "🇩🇰",
  "46": "🇸🇪",
  "47": "🇳🇴",
  "351": "🇵🇹",
  "353": "🇮🇪",
  "358": "🇫🇮",

  "972": "🇮🇱",
  "971": "🇦🇪",
  "966": "🇸🇦",
  "20": "🇪🇬",
  "212": "🇲🇦",
  "216": "🇹🇳",
  "27": "🇿🇦",

  "1": "🇺🇸", // NANP
  "52": "🇲🇽",
  "54": "🇦🇷",
  "55": "🇧🇷",
  "56": "🇨🇱",
  "57": "🇨🇴",
  "58": "🇻🇪",
  "51": "🇵🇪",
  "593": "🇪🇨",

  "91": "🇮🇳",
  "92": "🇵🇰",
  "880": "🇧🇩",
  "86": "🇨🇳",
  "81": "🇯🇵",
  "82": "🇰🇷",
  "84": "🇻🇳",
  "66": "🇹🇭",
  "65": "🇸🇬",
  "60": "🇲🇾",
  "62": "🇮🇩",
  "63": "🇵🇭",
  "61": "🇦🇺",
  "64": "🇳🇿",
};

const FLAG_PREFIXES = Object.keys(FLAG_BY_PREFIX).sort((a, b) => b.length - a.length);

// ISO-код страны из emoji-флага: региональные индикаторы U+1F1E6..U+1F1FF
// кодируют латинские буквы, поэтому отдельная карта ISO не нужна.
// Нужен для SVG-флагов: Windows не рисует emoji-флаги, показывает буквы.
export function isoFromFlagEmoji(emoji: string): string | null {
  const letters = [...emoji]
    .map((char) => char.codePointAt(0) ?? 0)
    .filter((code) => code >= 0x1f1e6 && code <= 0x1f1ff)
    .map((code) => String.fromCharCode(65 + code - 0x1f1e6))

  return letters.length === 2 ? letters.join("") : null
}

export function flagEmojiForPhoneDigits(digits: string): string {
  if (!digits) return FLAG_DEFAULT;

  // +7: KZ 0/6/7, иначе RU
  if (digits.startsWith("7") && digits.length >= 2) {
    const second = digits[1];
    if (second === "0" || second === "6" || second === "7") return "🇰🇿";
    return "🇷🇺";
  }

  for (const p of FLAG_PREFIXES) {
    if (digits.startsWith(p)) return FLAG_BY_PREFIX[p];
  }
  return FLAG_DEFAULT;
}

