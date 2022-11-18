# stallion

Unofficial extension to send scripts from VSCode to [Cavalry](https://cavalry.scenegroup.co/). This is a temporary solution until the [Cavalry](https://cavalry.scenegroup.co/) arrives with a more robust solution.

> **Warning** This extension is still in alpha stage and hardly tested. Please report any issues you run into.

## Features

-   Send scripts to Cavalry
-   Install Stallion script
-   Incomplete type definitions

## Requirements

-   VSCode (tested only on 1.73.1)
-   Cavalry 1.4.1 (currently in beta)

## Installation

Look for `stallion` in the VSCode extension tab and click on the chevron next to the `install` button. Choose `Install pre-release version`. Otherwise it will throw an error.

## Usage

1. Run the `Install Stallion Panel` command from VSCode. This will copy the Cavalry script to the scripts folder. You only have to do this once. Now you can open the script in Cavalry from `Scripts > stallion`. The script will start a server that listens to the data sent by VSCode.

    If it was sucessful the Log Window will show:

    ```bash
    Server Started at: 127.0.0.1, port: 8080
    ```

2. Run the `Send To Cavalry` command from an open editor. The text from the editor will be sent to Cavalry, so it doesn't have to be a saved file. Focus the Cavalry window and check the Log Window for any errors.

    If it was sucessful the Log Window will show:

    ```bash
    [Info]
    JavaScript: Stallion: Script successfully executed
    ```

<!-- ## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

-   `myExtension.enable`: Enable/disable this extension.
-   `myExtension.thing`: Set to `blah` to do something. -->

## Known Issues

The server address and port are hardcoded (`127.0.0.1:8000`). Make sure nothing else is using this port. This will be made configurable in a later update.
