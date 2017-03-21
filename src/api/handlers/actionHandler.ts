import { ActionHandler, Action, DefaultActionHandler } from "vulcain-corejs";
import { Game, InjuryReport, Incident } from '../models/models';
import { SeasonQueryHandler } from './queryHandler';

// -----------------------------------------------------------
// Default crud action handlers
// -----------------------------------------------------------
@ActionHandler({ async: false, scope: "?", schema: 'Sport' })
export class SportActionHandler extends DefaultActionHandler {

}

@ActionHandler({ async: false, scope: "?", schema: 'Season' })
export class SeasonActionHandler extends DefaultActionHandler {

    //api/season.updategame
    @Action({ description: "Provides way to update a game (Score, Incidents)", outputSchema: "Season" }) // action = method name (minus Async)
    async updateGame(game: Game) {

        let handler = this.container.get<SeasonQueryHandler>('SeasonQueryService');
        let season1 = await handler.getAsync(game.seasonId);
        let gameIndex = season1.games.findIndex(g => g.id === game.id);
        season1.games.splice(gameIndex, 1, game);
        let season2 = await this.updateAsync(season1);
        return season2;
    }

    //api/season.reportInjury
    @Action({ description: "Provides way to report an injury", outputSchema: "string" }) // action = method name (minus Async)
    async reportInjury(injuryReport: InjuryReport) {

        let handler = this.container.get<SeasonQueryHandler>('SeasonQueryService');
        let season = await handler.getAsync(injuryReport.seasonId);
        let game = season.games.find(g => g.id === injuryReport.gameId);
        if (!game.incidents) {
            game.incidents = [];
        }
        let incidentReportIndex = game.incidents.findIndex(i => i.id === injuryReport.id);
        if (-1 === incidentReportIndex) {
            game.incidents.push(injuryReport);
        }
        else {
            game.incidents.splice(incidentReportIndex, 1, injuryReport); // TODO : It's stupid, many persons can be reported the same incident
        }

        return await this.updateAsync(season);
    }
}

@ActionHandler({ async: false, scope: "?", schema: 'Team' })
export class TeamActionHandler extends DefaultActionHandler {

}