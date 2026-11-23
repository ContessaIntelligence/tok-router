# Token Router 用户使用说明

[English](user-guide.md)

Token Router 是一个桌面应用，用来管理 AI 编程工具的 API Key 和服务商配置。
添加一次 Routok Key，就可以在 Claude Desktop、Claude Code、Codex、Gemini、
Grok Build、OpenCode、Pi、OpenClaw 和 Hermes 之间切换服务商。

官网：<https://api.routok.com>

## 1. 下载

从 [GitHub Releases 页面](https://github.com/ContessaIntelligence/tok-router/releases)
下载对应系统的文件。选择最新的版本。预发布版本（如 `v0.1.0-alpha.1`）也会列在那里。

| 系统                | 文件                                                                                |
| ------------------- | ----------------------------------------------------------------------------------- |
| Windows（64 位）    | `token-router-windows-x64.msi`（安装包）或 `token-router-windows-x64.exe`（免安装） |
| Linux（64 位）      | `token-router-linux-x64.tar.gz`                                                     |
| macOS（Apple 芯片） | `token-router-macos-arm64.tar.gz`                                                   |
| macOS（Intel 芯片） | `token-router-macos-x64.tar.gz`                                                     |

说明：

- **Windows：** 程序没有签名，Windows SmartScreen 可能会弹出警告。点击“更多信息”，
  再点击“仍要运行”。
- **Linux 和 macOS：** 解压 `.tar.gz` 文件，得到 `token-router` 程序。macOS 可能因为
  隔离属性而阻止下载的程序。在程序所在文件夹的终端中运行一次以下命令：

  ```sh
  xattr -d com.apple.quarantine token-router
  ```

## 2. 首次启动

1. 打开 Token Router。
2. 首次启动时，界面语言跟随浏览器语言。之后可以在 **设置 > 常规 > 语言** 中修改。

> 截图 1：启动后的第一个界面，截取整个窗口。
> 保存为 `docs/screenshots/01-first-launch.png`。

## 3. 主界面

主界面左上角依次显示：

- Token Router 的图标和名称。
- 官网链接 `https://api.routok.com`。点击后在浏览器中打开官网。
- **设置** 按钮。

标题栏下方选择要配置的应用。每个应用有自己的服务商列表。

> 截图 2：主界面，需要包含标题栏和应用选项卡。
> 保存为 `docs/screenshots/02-main-screen.png`。

## 4. 添加 Routok Key

1. 选择应用，例如 **Claude Desktop** 或 **Codex**。
2. 点击 **添加 Routok Key**。如果列表中已有服务商，也可以点击标题栏的 **+** 按钮，
   其无障碍名称为“为 <应用> 添加 Routok Key”。
3. 选择 RouTok 预设。预设会自动填入该应用的 Base URL 和模型。
4. 粘贴你的 API Key。
5. 保存。

各应用的预设值：

| 应用                           | Base URL                    | 模型               |
| ------------------------------ | --------------------------- | ------------------ |
| Claude Desktop、Claude Code    | `https://api.routok.com`    | `claude-haiku-5-5` |
| Codex                          | `https://api.routok.com/v1` | `gpt-6.1-sol`      |
| Gemini、Grok Build             | `https://api.routok.com/v1` | （空）             |
| OpenCode、Pi、OpenClaw、Hermes | `https://api.routok.com/v1` | `gpt-6.1-sol`      |

Grok Build 不会自动填入模型。选择 RouTok 预设后，需要自己输入模型名称。

> 截图 3：选中 RouTok 预设后的“添加 Routok Key”对话框。
> 保存为 `docs/screenshots/03-add-key.png`。

## 5. 切换服务商

1. 打开应用的服务商列表。
2. 点击要使用的服务商上的 **切换**。
3. 界面会提示“... 已在 <应用> 中启用，请重启 <应用> 使用。”重启该应用后，新的服务商才会生效。

> 截图 4：服务商列表，其中一个服务商处于启用状态。
> 保存为 `docs/screenshots/04-switch-provider.png`。

## 6. Claude Code 默认服务商

Token Router 可以为你的用户账户设置 Claude Code 的默认服务商。项目级、本地或托管设置
仍可能覆盖这个默认值。修改后需要重启 Claude Code。

## 7. 导入现有配置

如果某个应用已经有可用的配置，使用 **导入当前配置**。Token Router 只读取它能够复现的
API 服务商字段。导入不需要重启。

## 8. 移除服务商

点击服务商上的 **移除**，然后确认。之后需要重启对应的应用。
移除服务商不会删除 Routok 网站上的 Key。

## 9. MCP 服务器和技能

Token Router 还可以为每个应用管理 MCP 服务器和技能选择。在主界面中使用
**管理 MCP 服务器** 和 **管理技能** 按钮。

Token Router 不会安装、发现、更新或卸载技能，只负责为每个应用开启或关闭已安装的技能。

## 10. 设置

打开 **设置** 可以修改：

- **语言：** 英文或中文。
- **外观：** 浅色或深色主题。
- **关于：** 版本号和版权信息。

> 截图 5：设置页面的“常规”部分。
> 保存为 `docs/screenshots/05-settings.png`。

## 11. 数据存放位置

服务商记录保存在 `~/.cc-switch/cc-switch.db`。这是完整版 CC Switch 应用使用的同一个数据库。
不要同时在 CC Switch 和 Token Router 中修改配置。

## 12. 常见问题

- **修改没有生效：** 重启你配置的应用。大多数工具只在启动时读取服务商设置。
- **Key 被拒绝：** 确认 Key 在 <https://api.routok.com> 上仍然有效，并且预设的 Base URL
  与上表一致。
- **Grok Build 报模型错误：** 在模型字段中输入模型名称。
- **Windows 提示“Token Router 无法启动”并提到 WebView2：** 电脑缺少 Microsoft Edge
  WebView2 运行时。Windows 11 自带，部分较旧的系统没有。在提示框中点击“是”，浏览器会下载
  `MicrosoftEdgeWebview2Setup.exe`（约 2 MB，需要联网）。运行它，等待安装完成，再重新打开
  Token Router。如果点了“否”，可以从 <https://go.microsoft.com/fwlink/p/?LinkId=2124703>
  下载。
- **Windows 或 macOS 阻止运行程序：** 参见第 1 节的说明。

如果遇到问题或有疑问，请在 <https://github.com/ContessaIntelligence/tok-router/issues>
提交 issue。
