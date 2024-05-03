// Get the elements
const noteTitleInput = document.getElementById('title');
const noteTextInput = document.getElementById('note');
const addNoteButton = document.querySelector('.addNote');
const searchInput = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const notesContainer = document.querySelector('.notes-container');

let notes = [];

addNoteButton.addEventListener('click', () => {
  const title = noteTitleInput.value.trim();
  const note = noteTextInput.value.trim();

  if (title && note) {
    const newNote = {
      title,
      note
    };

    notes.push(newNote);
    noteTitleInput.value = '';
    noteTextInput.value = '';

    createNotes();
  }
});

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (searchTerm) {
    const filteredNotes = notes.filter(note => {
      return note.title.toLowerCase().includes(searchTerm) || note.note.toLowerCase().includes(searchTerm);
    });
    createNotes(filteredNotes);
  } else {
    createNotes();
  }
});

function createNotes(notesArray = notes) {
  notesContainer.innerHTML = '';

  notesArray.forEach((note, index) => {
    const noteElement = document.createElement('div');
    noteElement.className = 'note';

    const titleElement = document.createElement('h2');
    titleElement.textContent = note.title;

    const noteTextElement = document.createElement('p');
    noteTextElement.textContent = note.note;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.innerHTML = 'delete';
    deleteButton.addEventListener('click', () => {
      let confirmDelete = confirm("Are you sure you want to delete this note?");
      if (confirmDelete) {
        notes.splice(index, 1);
        createNotes();
      }
    });

    noteElement.appendChild(titleElement);
    noteElement.appendChild(noteTextElement);
    noteElement.appendChild(deleteButton);

    notesContainer.appendChild(noteElement);
  });
}

createNotes();
