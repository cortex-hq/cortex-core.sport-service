import { ActionHandler, Action, DefaultActionHandler } from "vulcain-corejs";

// -----------------------------------------------------------
// Default crud action handlers
// -----------------------------------------------------------
@ActionHandler({ async: false, scope: "?", schema: 'Sport' })
export class SportActionHandler extends DefaultActionHandler {

}

@ActionHandler({ async: false, scope: "?", schema: 'Season' })
export class SeasonActionHandler extends DefaultActionHandler {

}

@ActionHandler({ async: false, scope: "?", schema: 'Team' })
export class TeamActionHandler extends DefaultActionHandler {

}