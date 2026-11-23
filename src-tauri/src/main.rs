#[cfg(windows)]
mod webview2;

fn main() {
    #[cfg(windows)]
    webview2::ensure_installed();
    cc_switch_lite_lib::run();
}
