<img src="./images/icon.png" alt="Stallion icon" align="left" width="86" style="margin-right: -15px;" />

# stallion

<br/>

VSCode extension to send scripts to [Cavalry](https://cavalry.scenegroup.co/).

> **Warning**  
> This extension is still in beta stage. Please report any issues you run into.

## Features

-   Send scripts to Cavalry
-   Install the Stallion script
-   Insert Cavalry's Typescript definitions

## Requirements

-   [VSCode](https://code.visualstudio.com/)
-   [Cavalry](https://cavalry.scenegroup.co/) 1.4.1+

## Installation

[Install `Stallion`](https://marketplace.visualstudio.com/items?itemName=Scenery.stallion) from the marketplace or look for `Stallion` in the VSCode extension tab and click on the chevron next to the `install` button. Choose `Install pre-release version`. Otherwise it will throw an error.

## Usage

1. Run the `Install Stallion Script` command from VSCode. This will copy the Cavalry script to the scripts folder. Now you can open the script in Cavalry from `Scripts > Stallion`. The script will start a server that listens to the data sent by VSCode.

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

3. Run the `Insert Cavalry Types` command to enable auto-complete for Cavalry's scripting API. This inserts a comment at the top of your file which references the [cavalry-types](https://github.com/scenery-io/cavalry-types).

<!-- ## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

-   `myExtension.enable`: Enable/disable this extension.
-   `myExtension.thing`: Set to `blah` to do something. -->

## Known Issues

1. The server address and port are hardcoded (`127.0.0.1:8080`). Make sure nothing else is using this port. This will be made configurable in a later update.

2. Any UI elements sent to the Stallion panel in Cavalry will not be removed. Close and reopen the Stallion panel and send the script again.

3. `ui.scriptLocation` returns the path of the Stallion script, not the path to your own script.

#### Icon Credits

The icon is [Horse](https://thenounproject.com/icon/horse-2128337/) by Buztas Linggar from [Noun Project](https://thenounproject.com/)
