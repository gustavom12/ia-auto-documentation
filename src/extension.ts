import * as vscode from "vscode";
import comments from "./comments";

export function activate(context: vscode.ExtensionContext) {
  const readmeDisposable = vscode.commands.registerCommand(
    "ia-auto-documentation.makeReadme",
    // "mac": "shift+cmd+a"
    () => comments("readme")
  );

  const commentsDisposable = vscode.commands.registerCommand(
    "ia-auto-documentation.makeComments",
    // "mac": "shift+cmd+i"
    () => comments("comments")
  );

  context.subscriptions.push(readmeDisposable);
  context.subscriptions.push(commentsDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
