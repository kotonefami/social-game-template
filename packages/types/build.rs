use std::env;
use std::path::PathBuf;

fn main() {
    // Ensure generated directory exists
    let frontend_generated = PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .unwrap()
        .parent()
        .unwrap()
        .join("packages/frontend/src/generated");

    std::fs::create_dir_all(&frontend_generated).ok();

    // Set the TS_RS_EXPORT_DIR for ts-rs
    println!(
        "cargo:rustc-env=TS_RS_EXPORT_DIR={}",
        frontend_generated.display()
    );
    println!("cargo:rerun-if-changed=src/lib.rs");
}
