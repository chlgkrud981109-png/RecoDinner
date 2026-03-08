const themeToggleButton = document.getElementById('theme-toggle');

// Theme switcher
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

themeToggleButton.addEventListener('click', () => {
  let theme = document.documentElement.getAttribute('data-theme');
  if (theme === 'light') {
    theme = 'dark';
  } else {
    theme = 'light';
  }
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
});

// Memo app logic (only runs on index.html)
const memoList = document.getElementById('memo-list');

if (memoList) {
  const memoForm = document.getElementById('memo-form');
  const memoInput = document.getElementById('memo-input');

  let memos = JSON.parse(localStorage.getItem('memos')) || [];

  if (memos.length === 0) {
    memos = [
      { text: "This is a sample memo. You can delete this." },
      { text: "Write down your thoughts and worries to clear your head." },
      { text: "RecoDinner helps you to organize your thoughts." }
    ];
    saveMemos();
  }

  class MemoItem extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });

      const wrapper = document.createElement('div');
      wrapper.setAttribute('class', 'memo-item');

      const text = document.createElement('p');
      text.textContent = this.getAttribute('text');

      const deleteButton = document.createElement('button');
      deleteButton.textContent = '삭제';
      deleteButton.addEventListener('click', () => {
        const memoText = this.getAttribute('text');
        memos = memos.filter(memo => memo.text !== memoText);
        saveMemos();
        renderMemos();
      });

      const style = document.createElement('style');
      style.textContent = `
        .memo-item {
          background-color: var(--memo-bg-color);
          padding: 15px;
          border-radius: 5px;
          box-shadow: var(--memo-box-shadow);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        p {
          margin: 0;
          color: var(--text-color);
        }
        button {
          padding: 5px 10px;
          border: none;
          background-color: #ff4d4d;
          color: #fff;
          border-radius: 3px;
          cursor: pointer;
        }
        button:hover {
          background-color: #ff1a1a;
        }
      `;

      shadow.appendChild(style);
      shadow.appendChild(wrapper);
      wrapper.appendChild(text);
      wrapper.appendChild(deleteButton);
    }
  }

  customElements.define('memo-item', MemoItem);

  function renderMemos() {
    memoList.innerHTML = '';
    memos.forEach(memo => {
      const memoItem = document.createElement('memo-item');
      memoItem.setAttribute('text', memo.text);
      memoList.appendChild(memoItem);
    });
  }

  function saveMemos() {
    localStorage.setItem('memos', JSON.stringify(memos));
  }

  memoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const memoText = memoInput.value.trim();
    if (memoText) {
      memos.push({ text: memoText });
      saveMemos();
      renderMemos();
      memoInput.value = '';
    }
  });

  renderMemos();
}