import { Command, AbstractProviderCommand } from "vulcain-corejs";
import { Season, Game } from "../models/models";

@Command()
class UpdateGameCommand extends AbstractProviderCommand<Season> {

    // Execute command
    async runAsync(game: Game) {
        let season1 = await this.provider.getAsync(this.schema, game.seasonId);
        let gameIndex = season1.games.findIndex(g => g.id === game.id);
        season1.games.splice(gameIndex, 1, game);
        let season2 = await this.provider.updateAsync(this.schema, season1);
        return season2;
    }
}