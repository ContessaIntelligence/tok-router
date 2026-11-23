# Token Router User Guide

[中文版](user-guide.zh-CN.md)

Token Router is a desktop app for managing the API keys and provider settings of
AI coding tools. Add a Routok key once, then switch between providers for
Claude Desktop, Claude Code, Codex, Gemini, Grok Build, OpenCode, Pi, OpenClaw,
and Hermes.

Website: <https://api.routok.com>

## 1. Download

Download the file for your system from the
[GitHub releases page](https://github.com/ContessaIntelligence/tok-router/releases).
Pick the newest release. Pre-release versions such as `v0.1.0-alpha.1` are listed
there too.

| System                | File                                                                                    |
| --------------------- | --------------------------------------------------------------------------------------- |
| Windows (64-bit)      | `token-router-windows-x64.msi` (installer) or `token-router-windows-x64.exe` (portable) |
| Linux (64-bit)        | `token-router-linux-x64.tar.gz`                                                         |
| macOS (Apple silicon) | `token-router-macos-arm64.tar.gz`                                                       |
| macOS (Intel)         | `token-router-macos-x64.tar.gz`                                                         |

Notes:

- **Windows:** The app is not signed. Windows SmartScreen may show a warning.
  Choose "More info", then "Run anyway".
- **Linux and macOS:** Extract the `.tar.gz` file to get the `token-router`
  program. On macOS, downloaded programs can be blocked by quarantine. Run this
  command in Terminal once, in the folder that contains the program:

  ```sh
  xattr -d com.apple.quarantine token-router
  ```

## 2. First launch

1. Open Token Router.
2. The language follows your browser language on first launch. You can change it
   later in **Settings > General > Language**.

> Screenshot 1: the first screen after launch. Capture the whole window.
> Save it as `docs/screenshots/01-first-launch.png`.

## 3. The main screen

The top left of the main screen shows:

- The Token Router logo and name.
- The website link, `https://api.routok.com`. Click it to open the site in your
  browser.
- The **Settings** button.

Below the header, choose the application you want to configure. Each application
has its own provider list.

> Screenshot 2: the main screen with the header and application tabs visible.
> Save it as `docs/screenshots/02-main-screen.png`.

## 4. Add a Routok key

1. Select the application, for example **Claude Desktop** or **Codex**.
2. Click **Add Routok Key**. If the list already has providers, the same action
   is the **+** button in the header, labeled "Add Routok Key for <application>".
3. Choose the RouTok preset. The preset fills in the base URL and the model for
   that application.
4. Paste your API key.
5. Save.

Preset values by application:

| Application                    | Base URL                    | Model              |
| ------------------------------ | --------------------------- | ------------------ |
| Claude Desktop, Claude Code    | `https://api.routok.com`    | `claude-haiku-5-5` |
| Codex                          | `https://api.routok.com/v1` | `gpt-6.1-sol`      |
| Gemini, Grok Build             | `https://api.routok.com/v1` | (empty)            |
| OpenCode, Pi, OpenClaw, Hermes | `https://api.routok.com/v1` | `gpt-6.1-sol`      |

Grok Build does not fill in a model. Type the model name yourself after you pick
the RouTok preset.

> Screenshot 3: the Add Routok Key dialog with the preset selected.
> Save it as `docs/screenshots/03-add-key.png`.

## 5. Switch to a provider

1. Open the provider list for an application.
2. Click **Switch** on the provider you want to use.
3. A message appears: "... is now active for <application>. Restart
   <application> to use it." Restart that application to load the new provider.

> Screenshot 4: the provider list with one provider marked active.
> Save it as `docs/screenshots/04-switch-provider.png`.

## 6. Claude Code default

For Claude Code, Token Router can set the default provider for your user account.
Project, local, or managed settings can still override it. Restart Claude Code
after you change the default.

## 7. Import an existing configuration

If an application already has a working configuration, use **Import current
configuration**. Token Router reads only the API provider fields it can reproduce.
Importing does not require a restart.

## 8. Remove a provider

Click **Remove** on a provider, then confirm. Restart the application afterward.
Removing a provider does not delete your keys from the Routok website.

## 9. MCP servers and Skills

Token Router can also manage MCP servers and Skill selections for each
application. Use the **Manage MCP servers** and **Manage Skills** buttons in the
main screen.

Token Router does not install, discover, update, or uninstall Skills. It only
turns installed Skills on or off for each application.

## 10. Settings

Open **Settings** to change:

- **Language:** English or Chinese.
- **Appearance:** Light or dark theme.
- **About:** The version number and the copyright line.

> Screenshot 5: the Settings page, General section.
> Save it as `docs/screenshots/05-settings.png`.

## 11. Where your data is stored

Provider records are stored in `~/.cc-switch/cc-switch.db`. This is the same
database the full CC Switch application uses. Do not change configuration in CC
Switch and Token Router at the same time.

## 12. Troubleshooting

- **The change does not work:** Restart the application you configured. Most
  tools read their provider settings only at startup.
- **A key is rejected:** Check that the key is still valid on
  <https://api.routok.com>, and that the preset base URL matches the table above.
- **Grok Build returns a model error:** Type a model name in the model field.
- **Windows or macOS blocks the program:** See the notes in section 1.
- **Windows shows "Token Router cannot start" and mentions WebView2:** The
  Microsoft Edge WebView2 runtime is missing. Windows 11 includes it, some older
  systems do not. Click "Yes" in the message. Your browser downloads
  `MicrosoftEdgeWebview2Setup.exe` (about 2 MB, internet required). Run it, wait
  for it to finish, then open Token Router again. If you clicked "No", download
  it from <https://go.microsoft.com/fwlink/p/?LinkId=2124703>.

For bugs or questions, open an issue at
<https://github.com/ContessaIntelligence/tok-router/issues>.
