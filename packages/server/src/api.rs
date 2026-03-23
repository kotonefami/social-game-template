// API module
use axum::{Json, http::StatusCode};
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::ToSchema;

#[derive(Serialize, Deserialize, TS, ToSchema)]
#[ts(export)]
pub struct RefineRequest {
    pub target_id: String,
    pub resource_amount: u32,
}

#[derive(Serialize, Deserialize, TS, ToSchema)]
#[ts(export)]
pub struct RefineResponse {
    pub success: bool,
    pub new_level: u32,
}

#[derive(Serialize, Deserialize, TS, ToSchema)]
#[ts(export)]
pub struct ErrorBody {
    pub code: String,
    pub message: String,
}

#[utoipa::path(
    get,
    path = "/health",
    responses(
        (status = 200, description = "Server is healthy")
    )
)]
pub async fn health_check() -> &'static str {
    "OK"
}

#[utoipa::path(
    post,
    path = "/api/refine",
    request_body = RefineRequest,
    responses(
        (status = 200, description = "Refinement successful", body = RefineResponse),
        (status = 400, description = "Bad request", body = ErrorBody)
    )
)]
pub async fn refine(Json(_req): Json<RefineRequest>) -> (StatusCode, Json<RefineResponse>) {
    (
        StatusCode::OK,
        Json(RefineResponse {
            success: true,
            new_level: 1,
        }),
    )
}

