export const FAKE_USER = {
  name: "Jack",
  email: "Abdullah@example.com",
  password: "12345",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export function generateId() {
  const id = Math.random().toString(36).substring(2, 9);
  return id;
}

export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};
