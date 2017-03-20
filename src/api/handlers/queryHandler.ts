import { Sport, Team, Season, Player, Game } from "../models/models";
import { QueryHandler, DefaultQueryHandler } from "vulcain-corejs";

// -----------------------------------------------------------
// Defaut query handlers (get/search)
// -----------------------------------------------------------
@QueryHandler({ scope: "?", schema: "Sport" })
export class SportQueryHandler extends DefaultQueryHandler<Sport> {
}

@QueryHandler({ scope: "?", schema: "Team" })
export class TeamQueryHandler extends DefaultQueryHandler<Team> {
}

@QueryHandler({ scope: "?", schema: "Season", serviceName : "SeasonQueryService" })
export class SeasonQueryHandler extends DefaultQueryHandler<Season> {
}

@QueryHandler({ scope: "?", schema: "Player" })
export class PlayerQueryHandler extends DefaultQueryHandler<Player> {
}

@QueryHandler({ scope: "?", schema: "Game" })
export class GameQueryHandler extends DefaultQueryHandler<Game> {
}

