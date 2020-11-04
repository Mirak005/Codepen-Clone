const htmlCode = document.getElementById("htmlCode");
const cssCode = document.getElementById("cssCode");
const javascriptCode = document.getElementById("javascriptCode");
const view = document.getElementById("view");

class CodeEditor {
  constructor(textArea, mode, options) {
    this.editor = CodeMirror.fromTextArea(textArea, {
      theme: "monokai",
      lineNumbers: true,
      mode,
      ...options,
    });
  }
}

const htmlEditor = new CodeEditor(htmlCode, "text/html", {
  autoCloseTags: true,
  autocorrect: true,
});
const cssEditor = new CodeEditor(cssCode, "css", {
  autoCloseBrackets: true,
  extraKeys: { "Ctrl-Space": "autocomplete" },
});
const javascriptEditor = new CodeEditor(javascriptCode, "javascript", {
  autoCloseBrackets: true,
  extraKeys: { "Ctrl-Space": "autocomplete" },
});

let initialState =
  htmlEditor.editor.getValue() +
  cssEditor.editor.getValue() +
  javascriptEditor.editor.getValue();

let timeout = null;

function addCode({ editor }) {
  editor.on("change", () => {
    let currentState =
      htmlEditor.editor.getValue() +
      cssEditor.editor.getValue() +
      javascriptEditor.editor.getValue();

    if (currentState !== initialState) {
      clearTimeout(timeout);
      initialState = currentState;
      timeout = setTimeout(() => {
        view.srcdoc = `
       <html>
       <head>
       <style>
       ${cssEditor.editor.getValue()}
       </style>
       </head>
       <body>
      ${htmlEditor.editor.getValue()}
      <script>
      ${javascriptEditor.editor.getValue()}
      </script>
       </body>
      </html>
    `;
      }, 250);
    }
  });
}

addCode(htmlEditor);
addCode(cssEditor);
addCode(javascriptEditor);
