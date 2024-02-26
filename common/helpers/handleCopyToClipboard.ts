const handleCopyToClipBoard = (value) => {
  const textarea = document.createElement('textarea');
  textarea.textContent = value;
  document.body.appendChild(textarea);
  const selection = document.getSelection();
  const range = document.createRange();
  range.selectNode(textarea);
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand('copy');
  selection.removeAllRanges();
  document.body.removeChild(textarea);
};

export default handleCopyToClipBoard;
