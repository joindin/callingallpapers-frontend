export function truncateWords(text: string, wordCount: number = 50) {
  const words = text.split(/(?=\s)/gi);
  let indexToStop = words.length;
  let count = 0;
  for (let i = 0; i < words.length && count <= wordCount; i++) {
    if (words[i].trim() != '') {
      if (++count > wordCount) indexToStop = i;
    }
  }

  return words.slice(0, indexToStop).join('');
}
