// Release builds on Windows use the GUI subsystem so no console window opens.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[cfg(windows)]
mod webview2;

fn main() {
    #[cfg(windows)]
    webview2::ensure_installed();
    cc_switch_lite_lib::run();
}
