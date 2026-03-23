// Battle logic module
use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Serialize, Deserialize, TS)]
#[ts(export)]
pub struct BattleState {
    pub boss_hp: i64,
    pub boss_phase: BossPhase,
    pub character_hp: Vec<i64>,
}

#[derive(Serialize, Deserialize, TS)]
#[ts(export)]
pub enum BossPhase {
    Guard,
    Frenzy,
    Core,
}
