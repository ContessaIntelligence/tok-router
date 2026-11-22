// Chinese translations keyed by the English source text.
// Placeholders such as {name} are filled in by `translate`.
export const zhMessages: Record<string, string> = {
  // Settings
  "Settings sections": "设置分类",
  General: "常规",
  About: "关于",
  Appearance: "外观",
  "Use a light, dark, or system-matched theme.":
    "使用浅色、深色或跟随系统的主题。",
  Light: "浅色",
  Dark: "深色",
  System: "跟随系统",
  Language: "语言",
  "Choose the display language of the interface.": "选择界面显示语言。",
  "Visible applications": "可见应用",
  "Choose which applications appear in the provider switcher. At least one stays visible.":
    "选择在供应商切换器中显示的应用,至少保留一个。",
  "Hide {app} in application switcher": "在应用切换器中隐藏 {app}",
  "Show {app} in application switcher": "在应用切换器中显示 {app}",
  "Version and project information.": "版本与项目信息。",
  Version: "版本",
  "Copyright: routok.com": "版权所有：routok.com",

  // App shell
  "Custom endpoint": "自定义端点",
  "In Use": "使用中",
  "Import Claude Code user configuration": "导入 Claude Code 用户配置",
  "Import current {app} configuration": "导入当前 {app} 配置",
  "Provider added.": "供应商已添加。",
  "Provider updated.": "供应商已更新。",
  "Imported the Claude Code user configuration.":
    "已导入 Claude Code 用户配置。",
  "Imported the current {app} configuration.": "已导入当前 {app} 配置。",
  "{name} is now the Claude Code user default. Project, local, or managed settings can override it. Restart Claude Code to use it.":
    "{name} 现在是 Claude Code 的用户默认配置，项目、本地或托管设置仍可覆盖它，请重启 Claude Code 使用。",
  "{name} is now active for {app}. Restart {app} to use it.":
    "{name} 已在 {app} 中启用，请重启 {app} 使用。",
  "{name} was removed from {app}. Restart {app} for it to take effect.":
    "已从 {app} 中移除 {name}，请重启 {app} 使其生效。",
  "Not supported in Lite": "此版本不支持",
  "MCP Server Management": "MCP 服务器管理",
  "Skills Management": "技能管理",
  Settings: "设置",
  "Open settings": "打开设置",
  "Back to providers": "返回供应商列表",
  "Manage Skills": "管理技能",
  "Manage MCP servers": "管理 MCP 服务器",
  "Add Routok Key": "添加 Routok Key",
  "Add Routok Key for {app}": "为 {app} 添加 Routok Key",
  Import: "导入",
  "Import existing": "导入现有",
  "Add MCP": "添加 MCP",
  "Import user default": "导入用户默认",
  "Import current": "导入当前",
  "Add your first {app} provider": "添加你的第一个 {app} 供应商",

  // App switcher
  Applications: "应用",
  "More applications": "更多应用",

  // Provider list and cards
  "Loading providers": "正在加载供应商",
  Providers: "供应商",
  "Add one manually, or import the API provider from your current live configuration.":
    "手动添加,或从当前生效的配置中导入 API 供应商。",
  "Search name, notes, or URL…": "搜索名称、备注或 URL…",
  "Search providers": "搜索供应商",
  Clear: "清除",
  "Close provider search": "关闭供应商搜索",
  "Matches provider name, notes, and URL.": "匹配供应商名称、备注和 URL。",
  "Press Esc to close": "按 Esc 关闭",
  "No providers match your search.": "没有匹配的供应商。",
  "Default endpoint": "默认端点",
  "Adapter unavailable": "适配器不可用",
  "{name} is in {app}": "{name} 已在 {app} 中",
  "{name} is the Claude Code user default": "{name} 是 Claude Code 的用户默认配置",
  "{name} is current": "{name} 为当前使用",
  Managed: "已托管",
  Remove: "移除",
  Add: "添加",
  Switch: "切换",
  Switching: "切换中",
  "Updating {name}": "正在更新 {name}",
  "{name}: {label}": "{name}:{label}",
  "Remove {name} from configuration": "从配置中移除 {name}",
  "Add {name} to configuration": "将 {name} 添加到配置",
  "Switch to {name}": "切换到 {name}",
  "Edit {name}": "编辑 {name}",
  "Delete {name}": "删除 {name}",

  // Provider presets and dialog
  "Provider preset": "供应商预设",
  "Search presets…": "搜索预设…",
  "Search provider presets": "搜索供应商预设",
  "Toggle preset sorting": "切换预设排序",
  "Provider presets": "供应商预设",
  Custom: "自定义",
  "No matching presets.": "没有匹配的预设。",
  "Choose a preset, then adjust the fields below if needed.":
    "选择一个预设,然后按需调整下面的字段。",
  "Edit Provider": "编辑供应商",
  "Add New Provider": "添加新供应商",
  "Close provider dialog": "关闭供应商对话框",
  "💡 After choosing a preset, fill in the fields below (e.g. API Key)":
    "💡 选择预设后,请填写下面的字段(例如 API Key)",
  Cancel: "取消",
  "Saving…": "保存中…",
  Save: "保存",
  "Provider name": "供应商名称",
  Optional: "可选",
  "Base URL": "Base URL",
  "The provider endpoint used by this application.": "此应用使用的供应商端点。",
  "API key": "API Key",
  "Stored in the shared CC Switch database and written only when activated.":
    "保存在共享的 CC Switch 数据库中,仅在启用时写入。",
  Model: "模型",
  "Model ID": "模型 ID",
  "The model ID sent to the provider.": "发送给供应商的模型 ID。",
  "Leave blank to keep the existing environment credential.":
    "留空以保留现有的环境凭据。",

  // Delete dialogs
  "Delete provider?": "删除供应商?",
  "{name} will be removed from the provider catalog. Live configuration is not touched.":
    "{name} 将从供应商目录中移除,不会修改正在生效的配置。",
  "Deleting…": "删除中…",
  "Delete provider": "删除供应商",
  "Delete MCP server?": "删除 MCP 服务器?",
  "{name} will be removed from the shared catalog and from every application where it is enabled.":
    "{name} 将从共享目录以及所有启用它的应用中移除。",
  "Delete server": "删除服务器",

  // MCP
  "Server ID is required.": "必须填写服务器 ID。",
  "That server ID already exists.": "该服务器 ID 已存在。",
  "Command is required for a stdio server.": "stdio 服务器必须填写命令。",
  "URL is required for a remote server.": "远程服务器必须填写 URL。",
  "The server is invalid.": "服务器配置无效。",
  "Edit MCP": "编辑 MCP",
  "Close MCP editor": "关闭 MCP 编辑器",
  Preset: "预设",
  "MCP preset": "MCP 预设",
  "Server ID": "服务器 ID",
  Name: "名称",
  "Enabled applications": "启用的应用",
  Connection: "连接方式",
  "MCP transport": "MCP 传输方式",
  "Command *": "命令 *",
  Arguments: "参数",
  "One argument per line": "每行一个参数",
  Environment: "环境变量",
  "One KEY=VALUE per line": "每行一个 KEY=VALUE",
  "Working directory": "工作目录",
  "URL *": "URL *",
  Headers: "请求头",
  "No new MCP servers were found.": "没有发现新的 MCP 服务器。",
  "Imported {servers}; enabled {enabled} and disabled {disabled} existing {links}.":
    "已导入 {servers};启用 {enabled} 个、停用 {disabled} 个现有{links}。",
  "{count} server": "{count} 个服务器",
  "{count} servers": "{count} 个服务器",
  "application link": "应用关联",
  "application links": "应用关联",
  "Some applications could not be imported: {apps}":
    "部分应用无法导入:{apps}",
  "MCP server added.": "MCP 服务器已添加。",
  "MCP server updated.": "MCP 服务器已更新。",
  "MCP server deleted.": "MCP 服务器已删除。",
  "{count} MCP server configured": "已配置 {count} 个 MCP 服务器",
  "{count} MCP servers configured": "已配置 {count} 个 MCP 服务器",
  "Search MCP name, description, tag, or command...":
    "搜索 MCP 名称、描述、标签或命令...",
  "Search managed MCP servers": "搜索已管理的 MCP 服务器",
  "Clear MCP search": "清除 MCP 搜索",
  "No servers yet": "还没有服务器",
  "Click the button in the top right to add your first MCP server.":
    "点击右上角的按钮添加第一个 MCP 服务器。",
  "No MCP servers match your search": "没有匹配的 MCP 服务器",
  "Disable {name} for {app}": "为 {app} 停用 {name}",
  "Enable {name} for {app}": "为 {app} 启用 {name}",

  // Skills
  "{count} installed": "已安装 {count} 个",
  "Search installed skill name, description, or repo...":
    "搜索已安装技能的名称、描述或仓库...",
  "Search installed skills": "搜索已安装的技能",
  "Clear Skill search": "清除技能搜索",
  "No skills installed": "尚未安装技能",
  "Skills already present in the shared catalog will appear here.":
    "共享目录中已有的技能会显示在这里。",
  "No installed skills match your search": "没有匹配的已安装技能",
  "The installed Skill source is missing.": "已安装技能的来源缺失。",
  "The installed Skill source is invalid.": "已安装技能的来源无效。",
  "A previous Skill update needs recovery.": "上一次技能更新需要恢复。",
  "The managed Skill reference has changed.": "受管技能的引用已变化。",
  "The shared selection and application state differ.":
    "共享选择与应用状态不一致。",
  "The application directory contains an unmanaged entry.":
    "应用目录中包含未受管的条目。",
  "The shared Skill directory contains a conflicting entry.":
    "共享技能目录中包含冲突的条目。",
  "The application state could not be inspected safely.":
    "无法安全地检查应用状态。",
  "The application configuration is invalid.": "应用配置无效。",
  "This application reads the unified Skill directly.":
    "此应用直接读取统一技能目录。",
  "This Skill is required by the application.": "此应用需要该技能。",
  "This Skill is disabled by the application.": "该技能已被应用停用。",
  "This Skill is disabled outside CC Switch.": "该技能已在 CC Switch 之外被停用。",
};
