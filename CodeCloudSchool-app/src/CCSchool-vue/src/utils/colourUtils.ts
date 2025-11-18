export function getRandomGradient(): string {
  const gradients = [
    'linear-gradient(to right, #ff7e5f, #feb47b)',
    'linear-gradient(to right, #6a11cb, #2575fc)',
    'linear-gradient(to right, #11998e, #38ef7d)',
    'linear-gradient(to right, #ee9ca7, #ffdde1)',
    'linear-gradient(to right, #ff9966, #ff5e62)',
    'linear-gradient(to right, #00c6ff, #0072ff)',
    'linear-gradient(to right, #f7971e, #ffd200)',
  ]
  return gradients[Math.floor(Math.random() * gradients.length)]
}

export function getRandomColor(): string {
  const colors = ['#f87171', '#60a5fa', '#34d399', '#fbbf24', '#a78bfa', '#f472b6', '#38bdf8']
  return colors[Math.floor(Math.random() * colors.length)]
}
