# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

-   `Added` for new features
-   `Changed` for changes in existing functionality
-   `Deprecated` for soon-to-be removed features
-   `Removed` for now removed features
-   `Fixed` for any bug fixes
-   `Security` in case of vulnerabilities

## [UNRELEASED]

### Fixed

-   Comments on last line breaking script execution

## [0.3.0] - 2024-08-05

### Added

-   Send to Cavalry as expression (JavaScript and SkSL)
-   Send data to Stallion from other tools
-   Link to documentation in the Stallion UI

### Changed

-   The data object expected by Stallion

## [0.2.5] - 2023-06-01

### Added

-   Types for Cavalry 1.5.6

## [0.2.4] - 2023-04-28

### Fixed

-   Latest types not being installed

## [0.2.3] - 2023-04-27

### Added

-   Types for Cavalry 1.5.5

## [0.2.2] - 2023-04-25

### Added

-   Types for Cavalry 1.5.3 and 1.5.4

## [0.2.1] - 2023-04-12

### Fixed

-   ENOENT error when the Cavalry scripts folder doesn't exist
-   Mentions the Stallion script panel in the readme

### Removed

-   Install command from package

## [0.2.0] - 2023-03-06

### Added

-   Scripts with a UI now run in a separate context
-   Stallion is installed automatically
-   Types for Cavalry 1.5.2

### Changed

-   Minimum supported version is Cavalry 1.5.2
-   Editor contents are saved to a temp file
-   Scripts with a UI automatically focus Cavalry
-   Scripts are received quicker by the server

### Removed

-   `Install Stallion` command in favor of auto-install
-   Support for Cavalry versions lower than 1.5.2

### Fixed

-   `ui.scriptLocation` returned the path of the Stallion script

## [0.1.1] - 2023-02-14

### Fixed

-   Language is automatically set to JavaScript with the `Insert Cavalry Types` command
-   Consistent slashes in reference path
-   More detailed instructions in readme

## [0.1.0] - 2023-02-14

### Added

-   `Insert Cavalry Types` command
-   Extension icon

## [0.0.2] - 2022-11-18

-   Fixes ESM errors

## [0.0.1] - 2022-11-18

-   Working alpha version
