# AGENTS.md

Guidance for AI agents working in this repository. Read it before changing branding, presets, translations, icons or CI.

## What this project is

**Token Router** is a Tauri 2 + React desktop app by routok.com. It is a rebranded fork of CC Switch Lite (`upstream` remote: `CCS-HQ/cc-switch-lite`) and is distributed under the MIT license. Provider data comes from the external `cc-switch-core` crate, pinned by git revision in `src-tauri/Cargo.toml`.

## Branding rules

User-facing name is **Token Router**. Do not write "CC Switch Lite" in new UI text or docs.

| Place                                      | Value                                                                         |
| ------------------------------------------ | ----------------------------------------------------------------------------- |
| Window title, `productName`, About heading | `Token Router`                                                                |
| Executable name                            | `token-router` (`token-router.exe` on Windows)                                |
| About page copyright line                  | `Copyright: routok.com` (zh: `版权所有：routok.com`)                          |
| Add-provider button                        | `Add Routok Key` (zh: `添加 Routok Key`)                                      |
| Website                                    | `https://api.routok.com`, shown in full (including `https://`) and clickable  |
| `LICENSE`                                  | Keep the original `SaladDay` copyright line. A routok.com line sits below it. |

The executable name comes from two places that must stay in sync: the `[[bin]]` entry in `src-tauri/Cargo.toml` and `mainBinaryName` in `src-tauri/tauri.conf.json`. Changing only the Cargo package name would also rename the lib crate and break `cargo` paths.

### Identifiers that must NOT be renamed

These keep the upstream names on purpose. Renaming them breaks existing user data or the core dependency.

- Cargo package `cc-switch-lite`, lib `cc_switch_lite_lib`, dependencies `cc-switch-core` and `cc-switch-store`.
- Tauri `identifier`: `org.cc-switch.lite`.
- `localStorage` keys, all prefixed `cc-switch-lite:` (`theme`, `last-app`, `last-view`, `visible-apps`, `language`).
- The shared database path under `~/.cc-switch` and the `org.cc-switch.builtin` plugin ID.
- Text such as "shared CC Switch database" refers to the separate full CC Switch app, so it stays.

## Icons and logos

- The brand source files live outside the repo in `D:\dev\tmp\token-router-assets` (on the maintainer's machine). Ask the user if you need them.
- `src/assets/app-icon.svg` is the in-app logo (About page, header).
- `src-tauri/icons/*` are generated with `pnpm tauri icon <1024px png>`. That command also creates `android/` and `ios/` folders. Delete them, because this is a desktop app.
- The provider icon key `routok` is registered in `src/icons/extracted/index.ts` and `metadata.ts`, with the file `routok.svg`.
- `src/lib/provider-icon.ts`: a provider with no stored icon gets the `routok` icon when its name, website URL or endpoint contains "routok". Providers created from a preset already carry the icon.

## UI behaviour worth knowing

- Home header, top left, in order: logo + "Token Router", the clickable URL, then the Settings button. The header is `BRAND_HEADER_HEIGHT` (104px) on the providers view and `HEADER_HEIGHT` (64px) elsewhere.
- The URL opens in the system browser through the Rust command `open_routok_site` (`src-tauri/src/lib.rs`). The URL is hard-coded in Rust and the command takes no arguments. Do not make it accept a URL from the frontend.
- The header `+` button's accessible name is `Add Routok Key for <app>`. The empty state button is plain `Add Routok Key`. They must differ, or tests that look up one button by name find two.
- Success notices for switching a provider, setting the Claude Code default and removing a provider end with a restart reminder, for example "RouTok 已在 Claude Desktop 中启用，请重启 Claude Desktop 使用。" Importing a configuration does not need a restart, so that notice has no reminder.

## Provider presets (RouTok)

Core presets are `&'static` data inside `cc-switch-core` and cannot be edited here. `src-tauri/src/lib.rs` rewrites them:

- `PRESET_RULES` lists, per app, the RouTok preset to put first and the core preset IDs to hide.
- `simple_provider_forms()` applies the rules once (cached in a `OnceLock`). Both `list_simple_provider_forms` and `create_simple_provider` use it, so a preset shown in the UI is also accepted when saving. Keep it that way.
- Tests in `lib.rs` (`routok_preset_replaces_hidden_presets_for_configured_applications`) check the table below. Update the table and the test together.

| App(s)                                 | Base URL                    | Model              | Hidden core presets                     |
| -------------------------------------- | --------------------------- | ------------------ | --------------------------------------- |
| `claude`, `claude-desktop`             | `https://api.routok.com`    | `claude-haiku-5-5` | kimi, kimi-coding, deepseek, openrouter |
| `codex`                                | `https://api.routok.com/v1` | `gpt-6.1-sol`      | packycode, deepseek, openrouter         |
| `gemini`, `grokbuild`                  | `https://api.routok.com/v1` | empty              | packycode, apinebula, openrouter        |
| `opencode`, `pi`, `openclaw`, `hermes` | `https://api.routok.com/v1` | `gpt-6.1-sol`      | kimi, deepseek, openrouter              |

Grok Build requires a model, so after picking RouTok the user must type one.

## Language (i18n)

- Language provider and hook: `src/lib/i18n.tsx` (`useI18n()` returns `{ language, setLanguage, t }`). Chinese strings: `src/lib/i18n-zh.ts`.
- English source text is the key. `t("Some text {name}", { name })` falls back to the English text when no Chinese entry exists. Placeholders use `{name}`.
- Every new user-visible string needs an entry in `i18n-zh.ts`, including `aria-label`, `title` and `placeholder` text.
- English is the default in tests. First launch uses Chinese when the browser language starts with `zh`. The choice is saved under `cc-switch-lite:language`. The switch is in Settings, General, Language.
- Not translated on purpose: errors coming from Rust or the core crate, core preset names such as Kimi, and MCP preset descriptions.

## Release process

Releases are built by `.github/workflows/build.yml`. It runs **only when a tag matching `v*` is pushed**. Pushing to `main` does not build.

```text
git tag v0.1.0-alpha.1
git push origin v0.1.0-alpha.1
```

1. The `build` job runs `pnpm tauri build --no-bundle --ci --target <triple>` on four targets and uploads one artifact each. Nothing is signed, and there are no installers.
2. When all four succeed, the `release` job downloads the artifacts and runs `gh release create <tag>` with generated notes. A tag containing `-` (for example `v0.1.0-alpha.1`) is marked as a pre-release.
3. Release files:

| Platform            | Runner / target                            | File                              |
| ------------------- | ------------------------------------------ | --------------------------------- |
| Windows x64         | `windows-latest`, `x86_64-pc-windows-msvc` | `token-router-windows-x64.exe`    |
| Linux x64           | `ubuntu-22.04`, `x86_64-unknown-linux-gnu` | `token-router-linux-x64.tar.gz`   |
| macOS Apple silicon | `macos-latest`, `aarch64-apple-darwin`     | `token-router-macos-arm64.tar.gz` |
| macOS Intel         | `macos-latest`, `x86_64-apple-darwin`      | `token-router-macos-x64.tar.gz`   |

Notes:

- The tag name is not checked against the app version. The version lives in three files that must be bumped together: `package.json` (shown on the About page), `src-tauri/Cargo.toml` and `src-tauri/tauri.conf.json`. Currently all three say `0.1.0-alpha.1`. Update them before tagging a release.
- If one platform fails, no release is created. Fix the problem, then delete the tag locally and on the remote (`git push origin :refs/tags/<tag>`) and tag again.
- Linux and macOS archives are `tar.gz` so the executable bit survives the artifact upload.
- macOS may quarantine downloaded binaries (`xattr -d com.apple.quarantine token-router`).
- `tauri.conf.json` has `bundle.active: false`. Turn it on only if installers are wanted.
- The release job needs the repo setting Actions, Workflow permissions, "Read and write permissions".

## GitHub Actions: pinned commit SHAs

Every third-party action is pinned to a full commit SHA with the version in a trailing comment. A tag like `@v7` can be moved by the upstream owner, while a SHA cannot. Keep this convention. Do not switch to bare version tags without asking the user.

| Action                      | Pinned SHA                                 | Version |
| --------------------------- | ------------------------------------------ | ------- |
| `actions/checkout`          | `d23441a48e516b6c34aea4fa41551a30e30af803` | v6      |
| `actions/setup-node`        | `249970729cb0ef3589644e2896645e5dc5ba9c38` | v6      |
| `actions-rust-lang/audit`   | `72c09e02f132669d52284a3323acdb503cfc1a24` | v1      |
| `actions/upload-artifact`   | `cf430e030ddbb5b0abf93d22962f4752f3646cd9` | v7.0.2  |
| `actions/download-artifact` | `9000827ccba6bdab643e8b6fd33ac0654aef8333` | v8.0.2  |

To update or add an action, resolve the SHA from the upstream repository and keep the version comment:

```text
git ls-remote https://github.com/actions/upload-artifact.git "refs/tags/v7*"
```

If a tag is annotated, use the `^{}` line (the commit it points to), not the tag object. Update this table in the same change.

## Checks before committing

Run these from the repo root. CI runs the same steps (`.github/workflows/ci.yml`).

```text
pnpm typecheck
pnpm test
pnpm build
npx prettier --check .
cargo fmt --check --manifest-path src-tauri/Cargo.toml
cargo clippy --locked --manifest-path src-tauri/Cargo.toml --all-targets -- -D warnings
cargo test --locked --manifest-path src-tauri/Cargo.toml
```

- Rust is pinned to 1.88.0 by `rust-toolchain.toml`. Clippy warnings fail CI.
- On Windows, git checks files out with CRLF, so a plain `prettier --check .` reports many files that CI (LF on Linux) accepts. Use `npx prettier --check --end-of-line auto .` locally.
- `cargo test` has one failure on Windows without symlink rights: `skill::tests::startup_reconciliation_repairs_managed_reference_drift`. It fails on the original code too and passes on Linux and macOS.
- A running `pnpm tauri dev` keeps `src-tauri/target/debug/token-router.exe` locked, so `cargo build` fails with "access denied". Stop the dev app, or build with `pnpm tauri build --no-bundle`, which writes to `target/release`.
- Commit and push only when the user asks.
