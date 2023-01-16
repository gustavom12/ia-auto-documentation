import * as vscode from "vscode";
import { commentaries } from "./autodocumentation";
import { markdownRequest } from "./readme";
import * as fs from "fs";

const MAXIMUM_CHARACTERS = 1000;

export default async function (type: string) {
  const activeEditor = vscode.window.activeTextEditor;
  if (!activeEditor) {
    return;
  }
  const document = activeEditor.document;
  const selection = activeEditor.selection;

  const selectedText = document.getText(selection);
  if (selectedText.length === 0) {
    return vscode.window.showErrorMessage(`You don't have selected text`);
  }

  if (selectedText.length < 10) {
    return vscode.window.showErrorMessage(`Selected text is too short`);
  }

  if (selectedText.length > MAXIMUM_CHARACTERS) {
    return vscode.window.showErrorMessage(
      `While using BETA, the maximum length is ${MAXIMUM_CHARACTERS} characters, we are working on improving it`
    );
  }

  vscode.window.showInformationMessage(
    `The request is being processed, this may take a moment, we are working on improving the waiting time`
  );
  console.log("characters: ", selectedText.length);

  const URL = activeEditor.document.uri.fsPath;

  const extension = URL.split(".").pop();
  let languageSelected = "javascript";
  if (extension) {
    languageSelected =
      {
        js: "javascript",
        ts: "typescript",
        jsx: "javascript",
        tsx: "typescript",
      }[extension] || "javascript";
  }

  if (type === "comments") {
    console.log("sigue en comments");

    const response = await commentaries(selectedText);
    activeEditor.edit((editBuilder) => {
      editBuilder.delete(selection);
      editBuilder.insert(
        new vscode.Position(selection.active.line, selection.active.character),
        `${response}`
      );
    });
  }
  if (type === "readme") {
    console.log("sigue en readme");
    const response = await markdownRequest(selectedText);
    const splitted = URL.split(/\//);
    const [filename, folder] = [splitted.pop(), splitted.join("/")];
    const newFileUrl = `${folder}/${filename}_README.md`;
    await fs.writeFile(newFileUrl, response, (err) => {});
  }
  console.log("termina");

  vscode.window.showInformationMessage(`${URL}`);
}
