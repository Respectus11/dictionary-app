document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.search-form button');
  const input = document.querySelector('.search-form input');
  const card = document.querySelector('.card');

  const displayResult = (data) => {
    const word = data[0].word;
    const phonetics = data[0].phonetics[0]?.text || 'N/A';
    const audio = data[0].phonetics[0]?.audio || '';
    const definition = data[0].meanings[0]?.definitions[0]?.definition || 'Definition not found';
    const example = data[0].meanings[0]?.definitions[0]?.example || 'No example available';
    const partOfSpeech = data[0].meanings[0]?.partOfSpeech || 'Unknown';

    card.innerHTML = `
      <div class="property"><span>Word:</span> <span>${word}</span></div>
      <div class="property"><span>Phonetics:</span> <span>${phonetics}</span></div>
      <div class="property"><span>Audio:</span> ${audio ? `<audio controls src="${audio}"></audio>` : 'N/A'}</div>
      <div class="property"><span>Definition:</span> <span>${definition}</span></div>
      <div class="property"><span>Example:</span> <span>${example}</span></div>
      <div class="property"><span>Part of Speech:</span> <span>${partOfSpeech}</span></div>
    `;
  };

  const showError = (word) => {
    card.innerHTML = `
      <div class="property"><span>Sorry!</span> <span>No definition found for "${word}".</span></div>
    `;
  };

  button.addEventListener('click', async () => {
    const word = input.value.trim();
    if (!word) return;

    card.innerHTML = `<div class="property"><span>Loading...</span></div>`;

    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!res.ok) throw new Error('No result');

      const data = await res.json();
      displayResult(data);
    } catch (error) {
      showError(word);
    }
  });
});
