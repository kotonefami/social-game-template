// Type definitions for WebSocket communication
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use logic::battle::{BattleState, BossPhase};

#[derive(Serialize, Deserialize, TS)]
#[ts(export)]
#[serde(tag = "type", content = "payload")]
pub enum ServerMessage {
    BattleLog(BattleLog),
    StateSync(BattleState),
    PhaseChange { new_phase: BossPhase },
}

#[derive(Serialize, Deserialize, TS)]
#[ts(export)]
#[serde(tag = "type", content = "payload")]
pub enum ClientMessage {
    Intervene(InterveneCommand),
}

#[derive(Serialize, Deserialize, TS)]
#[ts(export)]
pub struct BattleLog {
    pub tick: u64,
    pub damage: i64,
    pub target_hp: i64,
}

#[derive(Serialize, Deserialize, TS)]
#[ts(export)]
pub struct InterveneCommand {
    pub skill_id: String,
    pub target: String,
}


