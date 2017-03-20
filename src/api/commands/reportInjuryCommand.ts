import { Command, AbstractProviderCommand } from "vulcain-corejs";
import { Season, Game, InjuryReport } from "../models/models";

@Command()
class ReportInjuryCommand extends AbstractProviderCommand<Season> {

    // Execute command
    async runAsync(injuryReport: InjuryReport) {
        let season1 = await this.provider.getAsync(this.schema, injuryReport.seasonId);
        let game = season1.games.find(g => g.id === injuryReport.gameId);
        //season1.games.splice(gameIndex, 1, game);
        let incidentReport = game.incidents.findIndex(i => i.id === injuryReport.id);
        if (-1 === incidentReport) {

        }
        else
        { }
        let season2 = await this.provider.updateAsync(this.schema, season1);
        return season2;
    }
}