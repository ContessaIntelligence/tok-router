//! Start-up check for the Microsoft Edge WebView2 runtime (Windows only).
//!
//! Tauri renders the UI with WebView2. Windows 11 and recent Windows 10 builds
//! ship it, older systems may not. Without it the app would fail with no
//! visible message, so `main` calls `ensure_installed` before Tauri starts.
//! A native message box is used because no Tauri window exists yet.

use std::ptr::{null, null_mut};

use windows_sys::Win32::Globalization::GetUserDefaultUILanguage;
use windows_sys::Win32::System::Registry::{
    RegGetValueW, HKEY, HKEY_CURRENT_USER, HKEY_LOCAL_MACHINE, RRF_RT_REG_SZ,
};
use windows_sys::Win32::UI::Shell::ShellExecuteW;
use windows_sys::Win32::UI::WindowsAndMessaging::{
    MessageBoxW, IDYES, MB_ICONERROR, MB_YESNO, SW_SHOWNORMAL,
};

/// Official "Evergreen Bootstrapper" link. It downloads
/// `MicrosoftEdgeWebview2Setup.exe` (about 2 MB) directly.
const INSTALLER_URL: &str = "https://go.microsoft.com/fwlink/p/?LinkId=2124703";

/// Client ID of the WebView2 runtime in the EdgeUpdate registry tree.
const CLIENT_KEYS: [(HKEY, &str); 3] = [
    (
        HKEY_LOCAL_MACHINE,
        r"SOFTWARE\WOW6432Node\Microsoft\EdgeUpdate\Clients\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}",
    ),
    (
        HKEY_LOCAL_MACHINE,
        r"SOFTWARE\Microsoft\EdgeUpdate\Clients\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}",
    ),
    (
        HKEY_CURRENT_USER,
        r"Software\Microsoft\EdgeUpdate\Clients\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}",
    ),
];

/// Returns when WebView2 is present. Otherwise shows install instructions and
/// exits the process.
pub fn ensure_installed() {
    if is_installed() {
        return;
    }
    let chinese = is_chinese_ui();
    let (title, text) = message(chinese);
    // SAFETY: both strings are NUL-terminated UTF-16 buffers that outlive the call.
    let answer = unsafe {
        MessageBoxW(
            null_mut(),
            wide(text).as_ptr(),
            wide(title).as_ptr(),
            MB_YESNO | MB_ICONERROR,
        )
    };
    if answer == IDYES {
        // SAFETY: as above. The result only reports launch failures, which the
        // user can see because the download does not start.
        unsafe {
            ShellExecuteW(
                null_mut(),
                wide("open").as_ptr(),
                wide(INSTALLER_URL).as_ptr(),
                null(),
                null(),
                SW_SHOWNORMAL,
            );
        }
    }
    std::process::exit(1);
}

fn is_installed() -> bool {
    official_api_finds_runtime() || registry_finds_runtime()
}

/// Asks the WebView2 loader, the same code Tauri uses, for the installed
/// runtime. It also finds per-user installs and future registry changes.
fn official_api_finds_runtime() -> bool {
    use webview2_com_sys::Microsoft::Web::WebView2::Win32::GetAvailableCoreWebView2BrowserVersionString;
    use windows_core::{PCWSTR, PWSTR};

    let mut version = PWSTR::null();
    // SAFETY: a null folder means "the installed Evergreen runtime"; on success
    // the loader hands over a CoTaskMem string that we free below.
    let result =
        unsafe { GetAvailableCoreWebView2BrowserVersionString(PCWSTR::null(), &mut version) };
    if result.is_err() || version.is_null() {
        return false;
    }
    // SAFETY: `version` is a valid NUL-terminated UTF-16 string.
    let text = unsafe { version.to_string() }.unwrap_or_default();
    // SAFETY: allocated by the loader with CoTaskMemAlloc.
    unsafe { windows_sys::Win32::System::Com::CoTaskMemFree(version.0.cast()) };
    is_real_version(&text)
}

fn registry_finds_runtime() -> bool {
    CLIENT_KEYS
        .iter()
        .filter_map(|(root, key)| read_version(*root, key))
        .any(|version| is_real_version(&version))
}

/// WebView2 writes `0.0.0.0` (or an empty string) for a removed runtime.
fn is_real_version(version: &str) -> bool {
    let version = version.trim();
    !version.is_empty() && version != "0.0.0.0"
}

fn read_version(root: HKEY, key: &str) -> Option<String> {
    let key = wide(key);
    let value = wide("pv");
    let mut size: u32 = 0;
    // SAFETY: first call only asks for the required buffer size in bytes.
    let status = unsafe {
        RegGetValueW(
            root,
            key.as_ptr(),
            value.as_ptr(),
            RRF_RT_REG_SZ,
            null_mut(),
            null_mut(),
            &mut size,
        )
    };
    if status != 0 || size == 0 {
        return None;
    }
    let mut buffer = vec![0u16; (size as usize).div_ceil(2)];
    // SAFETY: `buffer` holds at least `size` bytes.
    let status = unsafe {
        RegGetValueW(
            root,
            key.as_ptr(),
            value.as_ptr(),
            RRF_RT_REG_SZ,
            null_mut(),
            buffer.as_mut_ptr().cast(),
            &mut size,
        )
    };
    if status != 0 {
        return None;
    }
    let end = buffer.iter().position(|c| *c == 0).unwrap_or(buffer.len());
    Some(String::from_utf16_lossy(&buffer[..end]))
}

fn is_chinese_ui() -> bool {
    // SAFETY: plain system query without arguments.
    let language = unsafe { GetUserDefaultUILanguage() };
    // The primary language ID is the low 10 bits. 0x04 is Chinese.
    language & 0x3ff == 0x04
}

fn message(chinese: bool) -> (&'static str, &'static str) {
    if chinese {
        (
            "Token Router 无法启动",
            "此电脑缺少 Microsoft Edge WebView2 运行时,Token Router 需要它来显示界面。\n\
             \n\
             安装方法:\n\
             1. 点击下方的“是”,浏览器会下载 MicrosoftEdgeWebview2Setup.exe(约 2 MB,需要联网)。\n\
             2. 运行下载的文件,等待安装完成,无需任何设置。\n\
             3. 重新打开 Token Router。\n\
             \n\
             点击“否”将直接退出。",
        )
    } else {
        (
            "Token Router cannot start",
            "The Microsoft Edge WebView2 runtime is missing on this computer. \
             Token Router needs it to show its window.\n\
             \n\
             How to install it:\n\
             1. Click \"Yes\" below. Your browser downloads MicrosoftEdgeWebview2Setup.exe \
             (about 2 MB, internet required).\n\
             2. Run the downloaded file and wait for it to finish. No settings are needed.\n\
             3. Open Token Router again.\n\
             \n\
             Click \"No\" to exit.",
        )
    }
}

fn wide(text: &str) -> Vec<u16> {
    text.encode_utf16().chain(std::iter::once(0)).collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn rejects_empty_and_zero_versions() {
        assert!(!is_real_version(""));
        assert!(!is_real_version("  "));
        assert!(!is_real_version("0.0.0.0"));
    }

    #[test]
    fn accepts_real_version() {
        assert!(is_real_version("130.0.2849.80"));
    }

    #[test]
    fn wide_is_nul_terminated() {
        assert_eq!(wide("ab"), vec![97, 98, 0]);
    }

    #[test]
    fn messages_mention_installer_and_both_languages_exist() {
        for chinese in [true, false] {
            let (title, text) = message(chinese);
            assert!(!title.is_empty());
            assert!(text.contains("MicrosoftEdgeWebview2Setup.exe"));
        }
    }

    #[test]
    fn client_keys_use_webview2_runtime_guid() {
        for (_, key) in CLIENT_KEYS {
            assert!(key.ends_with("{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}"));
        }
    }

    #[test]
    fn detects_runtime_on_this_machine() {
        // Smoke test: must not panic. The result depends on the machine.
        eprintln!(
            "api={} registry={}",
            official_api_finds_runtime(),
            registry_finds_runtime()
        );
    }
}
