<img src="./images/icon.png" alt="Stallion icon" align="left" width="86" style="margin-right: -15px;" />

# stallion

<br/>

VSCode extension to send scripts to [Cavalry](https://cavalry.scenegroup.co/).

> [!NOTE]
> This extension is still in beta. Please report any issues you run into.

## Features

-   Send scripts to Cavalry
-   Insert Cavalry's Typescript definitions
-   Automatically installs the Stallion script

## Requirements

-   [VSCode](https://code.visualstudio.com/)
-   [Cavalry](https://cavalry.scenegroup.co/) 1.5.2+

## Installation

[Install `Stallion`](https://marketplace.visualstudio.com/items?itemName=Scenery.cavalry-bridge) from the marketplace or look for `Stallion` in the VSCode extension tab and click the `install` button.

## Usage

To send scripts to Cavalry the Stallion script needs to be open in Cavalry. After the extension is installed, the Stallion script should be available in Cavalry via `Scripts > Stallion`.

The VSCode extension exposes the following commands to the Command Palette (`View > Command Palette`).

1.  ### `Send To Cavalry`

    This will send the text from an open editor to Cavalry. It doesn't have to be a saved file. Focus the Cavalry window and check the Log Window for any errors.

        If it was sucessful the Log Window will show:

        ```bash
        [Info]
        JavaScript: Stallion: Script successfully executed
        ```

1.  ### `Insert Cavalry Types`
    This will enable auto-complete for Cavalry's scripting API. It inserts a comment at the top of the open editor which references the latest [cavalry-types](https://github.com/scenery-io/cavalry-types).

## Known Issues

1. The server address and port are hardcoded (`127.0.0.1:8080`). Make sure nothing else is using this port.
1. `ui.scriptLocation` returns a temporary path if the document in VSCode hasn't been saved.

## Sponsors

Huge thanks to Cavalry for sponsoring this project! Interested in sponsoring? Send us [a message](https://scenery.io/support).

<picture width="400">
  <source media="(prefers-color-scheme: dark)" srcset="./images/cavalry-white.png">
  <img alt="Cavalry" src="./images/cavalry-black.png" width="300">
</picture>

#### Icon Credits

The icon is [Horse](https://thenounproject.com/icon/horse-2128337/) by Buztas Linggar from [Noun Project](https://thenounproject.com/)
