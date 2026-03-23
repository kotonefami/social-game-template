// Server main module
mod api;

use axum::{
    routing::get,
    Router,
};

pub async fn run() {
    let app = Router::new()
        .route("/health", get(health_check));

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn health_check() -> &'static str {
    "OK"
}

#[tokio::main]
async fn main() {
    run().await;
}
