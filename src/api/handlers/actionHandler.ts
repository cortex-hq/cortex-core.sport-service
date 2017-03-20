import { ActionHandler, Action, DefaultActionHandler } from "vulcain-corejs";
import { Game, InjuryReport } from '../models/models';

// -----------------------------------------------------------
// Default crud action handlers
// -----------------------------------------------------------
@ActionHandler({ async: false, scope: "?", schema: 'Sport' })
export class SportActionHandler extends DefaultActionHandler {

}



@ActionHandler({ async: false, scope: "?", schema: 'Season' })
export class SeasonActionHandler extends DefaultActionHandler {



    // /api/season.updategame
    @Action({ description: "Provides way to update a game (Score, Incidents)", outputSchema: "string" }) // action = method name (minus Async)
    async updateGame(game: Game) {

        const cmd = await this.requestContext.getCommandAsync("UpdateGameCommand", this.metadata.schema);
        cmd.executeAsync(game);
        return 'echo';
    }

//      @Action({ description: "Provides way to report an injury", outputSchema: "string" }) // action = method name (minus Async)
//     async reportInjury(injuryReport: InjuryReport) {

// this.container.get<SeasonQueryHandler>('SeasonQueryService');
// }


}

@ActionHandler({ async: false, scope: "?", schema: 'Team' })
export class TeamActionHandler extends DefaultActionHandler {

}