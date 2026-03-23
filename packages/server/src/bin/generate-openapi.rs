use std::fs;
use std::path::PathBuf;
use utoipa::OpenApi;

// Import our server's API module components (we'll implement this next)
#[path = "../api.rs"]
mod api;

#[derive(OpenApi)]
#[openapi(
    paths(api::health_check, api::refine),
    components(schemas(api::RefineRequest, api::RefineResponse, api::ErrorBody))
)]
struct ApiDoc;

fn main() {
    let manifest_dir = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    let root_dir = manifest_dir.parent().unwrap().parent().unwrap();
    let schema_path = root_dir.join("openapi.json");

    let schema_json = ApiDoc::openapi().to_pretty_json().expect("Failed to generate OpenAPI JSON");
    fs::write(&schema_path, schema_json).expect("Failed to write OpenAPI JSON file");

    println!("OpenAPI schema generated to: {}", schema_path.display());
}
