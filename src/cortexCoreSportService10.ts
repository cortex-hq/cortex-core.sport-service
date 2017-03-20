import { System, ServiceDependency, Command, RequestContext, AbstractServiceCommand, Model,
Property, Reference } from 'vulcain-corejs';

// Models
/**
* .
*/
@Model()
export class Sport {
    @Property({"type":"string","required":true})
    label: string;
    @Property({"type":"string","required":true})
    id: string;
}
/**
* .
*/
@Model()
export class Game {
    @Property({"type":"string","required":true})
    awayTeamId: string;
    @Property({"type":"string","required":true})
    homeTeamId: string;
    @Property({"type":"boolean","required":true})
    completed: boolean;
    @Property({"type":"number","required":true})
    awayScore: number;
    @Property({"type":"number","required":true})
    homeScore: number;
    @Property({"type":"string","required":true})
    where: string;
    @Property({"type":"date-iso8601","required":true})
    date: string;
    @Property({"type":"string","required":true})
    id: string;
    @Reference({"item":"Incident","cardinality":"many"})
    incidents?: Incident[];
}
/**
* .
*/
@Model()
export class Season {
    @Property({"type":"string","required":true})
    sportId: string;
    @Property({"type":"date-iso8601","required":true})
    endDate: string;
    @Property({"type":"date-iso8601","required":true})
    startDate: string;
    @Property({"type":"string","required":true})
    id: string;
    @Reference({"item":"Game","cardinality":"many"})
    games?: Game[];
}
/**
* .
*/
@Model()
export class Incident {
    /**
    * The list of protagonist ids
    */
    @Property({"type":"arrayOf","items":"string","required":true,"description":"The list of protagonist ids"})
    protagonists: string[];
    /**
    * At what minute, the incident happened
    */
    @Property({"type":"number","required":true,"description":"At what minute, the incident happened"})
    minute: number;
    @Property({"type":"string","required":true})
    description: string;
    @Property({"type":"string","required":true})
    id: string;
}
/**
* .
*/
@Model()
export class Player {
    /**
    * The position of the player, its jersey number.
    */
    @Property({"type":"number","required":true,"description":"The position of the player, its jersey number."})
    number: number;
    @Property({"type":"string","required":true})
    userId: string;
    @Property({"type":"string","required":true})
    teamId: string;
    @Property({"type":"string","required":true})
    sportId: string;
    @Property({"type":"string","required":true})
    id: string;
}
/**
* .
*/
@Model()
export class Coach {
    @Property({"type":"string","required":true})
    userId: string;
    @Property({"type":"string","required":true})
    id: string;
}
/**
* .
*/
@Model()
export class Team {
    @Property({"type":"string","required":true})
    sportId: string;
    @Property({"type":"string","required":true})
    id: string;
    @Reference({"item":"Player","cardinality":"many"})
    players?: Player[];
    @Reference({"item":"Coach","cardinality":"one"})
    coach?: Coach;
}
/**
* .
*/
@Model()
export class Customer {
    @Property({"type":"string","required":true})
    lastName: string;
    @Property({"type":"string","required":true})
    firstName: string;
}

// Command
@Command({ executionTimeoutInMilliseconds: 1500 })
@ServiceDependency('cortex-core.sport-service', '1.0', 'http://localhost:8080/api/_servicedescription') 
export class CortexCoreSportServiceCommand extends AbstractServiceCommand {
}

// Service proxy
export class CortexCoreSportService {

    private static serviceName = "cortex-core.sport-service";
    private static serviceVersion = "1.0";
    private userContext: {apiKey: string, tenant: string};

    /**
    * 
    */
    constructor(private context: RequestContext, apiKey?: string, apiKeyTenant=System.defaultTenant) {
        if(apiKey) {
            this.userContext = {apiKey, tenant: apiKeyTenant};
        }
    }
    /**
    * Action: Create a new entity
    * @params {string} label - .
    * @params {string} id - .
    * @params [optional] args - additional url parameters
    */
    async sportCreateAsync(label: string, id: string,  args?) {
        const $data = {label, id};
        return this.sportCreateEntityAsync($data, args);
    }
    /**
    * Action: Create a new entity
    * @params {Sport} entity -
    * @params [optional] args - additional url parameters
    */
    async sportCreateEntityAsync(data: Sport, args?): Promise<Sport> {
        let command = await this.context.getCommandAsync('CortexCoreSportServiceCreateCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<Sport>(
            'action', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'sport.create', 
            this.userContext, 
            data, 
            args
        );
        return response;
    }
    /**
    * Action: Update an entity
    * @params {string} label - .
    * @params {string} id - .
    * @params [optional] args - additional url parameters
    */
    async sportUpdateAsync(label: string, id: string,  args?) {
        const $data = {label, id};
        return this.sportUpdateEntityAsync($data, args);
    }
    /**
    * Action: Update an entity
    * @params {Sport} entity -
    * @params [optional] args - additional url parameters
    */
    async sportUpdateEntityAsync(data: Sport, args?): Promise<Sport> {
        let command = await this.context.getCommandAsync('CortexCoreSportServiceUpdateCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<Sport>(
            'action', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'sport.update', 
            this.userContext, 
            data, 
            args
        );
        return response;
    }
    /**
    * Action: Delete an entity
    * @params {string} label - .
    * @params {string} id - .
    * @params [optional] args - additional url parameters
    */
    async sportDeleteAsync(label: string, id: string,  args?) {
        const $data = {label, id};
        return this.sportDeleteEntityAsync($data, args);
    }
    /**
    * Action: Delete an entity
    * @params {Sport} entity -
    * @params [optional] args - additional url parameters
    */
    async sportDeleteEntityAsync(data: Sport, args?): Promise<boolean> {
        let command = await this.context.getCommandAsync('CortexCoreSportServiceDeleteCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<boolean>(
            'action', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'sport.delete', 
            this.userContext, 
            data, 
            args
        );
        return response;
    }
    /**
    * Action: Create a new entity
    * @params {string} sportId - .
    * @params {string} endDate - .
    * @params {string} startDate - .
    * @params {string} id - .
    * @params {Game[]} games - .
    * @params [optional] args - additional url parameters
    */
    async seasonCreateAsync(sportId: string, endDate: string, startDate: string, id: string, games?: Game[],  args?) {
        const $data = {sportId, endDate, startDate, id, games};
        return this.seasonCreateEntityAsync($data, args);
    }
    /**
    * Action: Create a new entity
    * @params {Season} entity -
    * @params [optional] args - additional url parameters
    */
    async seasonCreateEntityAsync(data: Season, args?): Promise<Season> {
        let command = await this.context.getCommandAsync('CortexCoreSportServiceCreateCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<Season>(
            'action', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'season.create', 
            this.userContext, 
            data, 
            args
        );
        return response;
    }
    /**
    * Action: Update an entity
    * @params {string} sportId - .
    * @params {string} endDate - .
    * @params {string} startDate - .
    * @params {string} id - .
    * @params {Game[]} games - .
    * @params [optional] args - additional url parameters
    */
    async seasonUpdateAsync(sportId: string, endDate: string, startDate: string, id: string, games?: Game[],  args?) {
        const $data = {sportId, endDate, startDate, id, games};
        return this.seasonUpdateEntityAsync($data, args);
    }
    /**
    * Action: Update an entity
    * @params {Season} entity -
    * @params [optional] args - additional url parameters
    */
    async seasonUpdateEntityAsync(data: Season, args?): Promise<Season> {
        let command = await this.context.getCommandAsync('CortexCoreSportServiceUpdateCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<Season>(
            'action', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'season.update', 
            this.userContext, 
            data, 
            args
        );
        return response;
    }
    /**
    * Action: Delete an entity
    * @params {string} sportId - .
    * @params {string} endDate - .
    * @params {string} startDate - .
    * @params {string} id - .
    * @params {Game[]} games - .
    * @params [optional] args - additional url parameters
    */
    async seasonDeleteAsync(sportId: string, endDate: string, startDate: string, id: string, games?: Game[],  args?) {
        const $data = {sportId, endDate, startDate, id, games};
        return this.seasonDeleteEntityAsync($data, args);
    }
    /**
    * Action: Delete an entity
    * @params {Season} entity -
    * @params [optional] args - additional url parameters
    */
    async seasonDeleteEntityAsync(data: Season, args?): Promise<boolean> {
        let command = await this.context.getCommandAsync('CortexCoreSportServiceDeleteCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<boolean>(
            'action', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'season.delete', 
            this.userContext, 
            data, 
            args
        );
        return response;
    }
    /**
    * Action: Create a new entity
    * @params {string} sportId - .
    * @params {string} id - .
    * @params {Player[]} players - .
    * @params {Coach} coach - .
    * @params [optional] args - additional url parameters
    */
    async teamCreateAsync(sportId: string, id: string, players?: Player[], coach?: Coach,  args?) {
        const $data = {sportId, id, players, coach};
        return this.teamCreateEntityAsync($data, args);
    }
    /**
    * Action: Create a new entity
    * @params {Team} entity -
    * @params [optional] args - additional url parameters
    */
    async teamCreateEntityAsync(data: Team, args?): Promise<Team> {
        let command = await this.context.getCommandAsync('CortexCoreSportServiceCreateCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<Team>(
            'action', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'team.create', 
            this.userContext, 
            data, 
            args
        );
        return response;
    }
    /**
    * Action: Update an entity
    * @params {string} sportId - .
    * @params {string} id - .
    * @params {Player[]} players - .
    * @params {Coach} coach - .
    * @params [optional] args - additional url parameters
    */
    async teamUpdateAsync(sportId: string, id: string, players?: Player[], coach?: Coach,  args?) {
        const $data = {sportId, id, players, coach};
        return this.teamUpdateEntityAsync($data, args);
    }
    /**
    * Action: Update an entity
    * @params {Team} entity -
    * @params [optional] args - additional url parameters
    */
    async teamUpdateEntityAsync(data: Team, args?): Promise<Team> {
        let command = await this.context.getCommandAsync('CortexCoreSportServiceUpdateCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<Team>(
            'action', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'team.update', 
            this.userContext, 
            data, 
            args
        );
        return response;
    }
    /**
    * Action: Delete an entity
    * @params {string} sportId - .
    * @params {string} id - .
    * @params {Player[]} players - .
    * @params {Coach} coach - .
    * @params [optional] args - additional url parameters
    */
    async teamDeleteAsync(sportId: string, id: string, players?: Player[], coach?: Coach,  args?) {
        const $data = {sportId, id, players, coach};
        return this.teamDeleteEntityAsync($data, args);
    }
    /**
    * Action: Delete an entity
    * @params {Team} entity -
    * @params [optional] args - additional url parameters
    */
    async teamDeleteEntityAsync(data: Team, args?): Promise<boolean> {
        let command = await this.context.getCommandAsync('CortexCoreSportServiceDeleteCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<boolean>(
            'action', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'team.delete', 
            this.userContext, 
            data, 
            args
        );
        return response;
    }
    /**
    * Action: Create a new entity
    * @params {number} number - The position of the player, its jersey number.
    * @params {string} userId - .
    * @params {string} teamId - .
    * @params {string} sportId - .
    * @params {string} id - .
    * @params [optional] args - additional url parameters
    */
    async playerCreateAsync(number: number, userId: string, teamId: string, sportId: string, id: string,  args?) {
        const $data = {number, userId, teamId, sportId, id};
        return this.playerCreateEntityAsync($data, args);
    }
    /**
    * Action: Create a new entity
    * @params {Player} entity -
    * @params [optional] args - additional url parameters
    */
    async playerCreateEntityAsync(data: Player, args?): Promise<Player> {
        let command = await this.context.getCommandAsync('CortexCoreSportServiceCreateCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<Player>(
            'action', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'player.create', 
            this.userContext, 
            data, 
            args
        );
        return response;
    }
    /**
    * Action: Update an entity
    * @params {number} number - The position of the player, its jersey number.
    * @params {string} userId - .
    * @params {string} teamId - .
    * @params {string} sportId - .
    * @params {string} id - .
    * @params [optional] args - additional url parameters
    */
    async playerUpdateAsync(number: number, userId: string, teamId: string, sportId: string, id: string,  args?) {
        const $data = {number, userId, teamId, sportId, id};
        return this.playerUpdateEntityAsync($data, args);
    }
    /**
    * Action: Update an entity
    * @params {Player} entity -
    * @params [optional] args - additional url parameters
    */
    async playerUpdateEntityAsync(data: Player, args?): Promise<Player> {
        let command = await this.context.getCommandAsync('CortexCoreSportServiceUpdateCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<Player>(
            'action', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'player.update', 
            this.userContext, 
            data, 
            args
        );
        return response;
    }
    /**
    * Action: Delete an entity
    * @params {number} number - The position of the player, its jersey number.
    * @params {string} userId - .
    * @params {string} teamId - .
    * @params {string} sportId - .
    * @params {string} id - .
    * @params [optional] args - additional url parameters
    */
    async playerDeleteAsync(number: number, userId: string, teamId: string, sportId: string, id: string,  args?) {
        const $data = {number, userId, teamId, sportId, id};
        return this.playerDeleteEntityAsync($data, args);
    }
    /**
    * Action: Delete an entity
    * @params {Player} entity -
    * @params [optional] args - additional url parameters
    */
    async playerDeleteEntityAsync(data: Player, args?): Promise<boolean> {
        let command = await this.context.getCommandAsync('CortexCoreSportServiceDeleteCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<boolean>(
            'action', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'player.delete', 
            this.userContext, 
            data, 
            args
        );
        return response;
    }
    /**
    * Action: Custom action
    * @params [optional] args - additional url parameters
    */
    async customerMyactionAsync( args?): Promise<string> {
        const $data = null;
        let command = await this.context.getCommandAsync('CortexCoreSportServiceMyactionCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<string>(
            'action', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'customer.myaction', 
            this.userContext, 
            $data, 
            args
        );
        return response;
    }
    /**
    * Action: Create a new entity
    * @params {string} lastName - .
    * @params {string} firstName - .
    * @params [optional] args - additional url parameters
    */
    async customerCreateAsync(lastName: string, firstName: string,  args?) {
        const $data = {lastName, firstName};
        return this.customerCreateEntityAsync($data, args);
    }
    /**
    * Action: Create a new entity
    * @params {Customer} entity -
    * @params [optional] args - additional url parameters
    */
    async customerCreateEntityAsync(data: Customer, args?): Promise<Customer> {
        let command = await this.context.getCommandAsync('CortexCoreSportServiceCreateCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<Customer>(
            'action', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'customer.create', 
            this.userContext, 
            data, 
            args
        );
        return response;
    }
    /**
    * Action: Update an entity
    * @params {string} lastName - .
    * @params {string} firstName - .
    * @params [optional] args - additional url parameters
    */
    async customerUpdateAsync(lastName: string, firstName: string,  args?) {
        const $data = {lastName, firstName};
        return this.customerUpdateEntityAsync($data, args);
    }
    /**
    * Action: Update an entity
    * @params {Customer} entity -
    * @params [optional] args - additional url parameters
    */
    async customerUpdateEntityAsync(data: Customer, args?): Promise<Customer> {
        let command = await this.context.getCommandAsync('CortexCoreSportServiceUpdateCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<Customer>(
            'action', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'customer.update', 
            this.userContext, 
            data, 
            args
        );
        return response;
    }
    /**
    * Action: Delete an entity
    * @params {string} lastName - .
    * @params {string} firstName - .
    * @params [optional] args - additional url parameters
    */
    async customerDeleteAsync(lastName: string, firstName: string,  args?) {
        const $data = {lastName, firstName};
        return this.customerDeleteEntityAsync($data, args);
    }
    /**
    * Action: Delete an entity
    * @params {Customer} entity -
    * @params [optional] args - additional url parameters
    */
    async customerDeleteEntityAsync(data: Customer, args?): Promise<boolean> {
        let command = await this.context.getCommandAsync('CortexCoreSportServiceDeleteCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<boolean>(
            'action', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'customer.delete', 
            this.userContext, 
            data, 
            args
        );
        return response;
    }
    /**
    * Get an entity by id
    * @params id string - unique id
    */
    async getSportAsync(id: string): Promise<Sport> {
        let command = await this.context.getCommandAsync('CortexCoreSportServiceGetSportCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<Sport>(
            'get', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'sport.get', 
            this.userContext, 
            id,
            null
        );
        return response;
    }
        /**
    * Get all entities
    * @params {any} query - Query filter
    * @params [optional] query - filter query
    * @params {number} page - Page to retrieve
    * @params {number} maxByPage - Item by page (default 100)
    */
    async getAllSportAsync( query?, page?: number, maxByPage?: number): Promise<Sport[]> {
        let command = await this.context.getCommandAsync('CortexCoreSportServiceGetAllSportCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<Sport[]>(
            'query', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'sport.all', 
            this.userContext, 
            query, 
            null, 
            page, 
            maxByPage
        );
        return response;
    }
    /**
    * Get an entity by id
    * @params id string - unique id
    */
    async getTeamAsync(id: string): Promise<Team> {
        let command = await this.context.getCommandAsync('CortexCoreSportServiceGetTeamCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<Team>(
            'get', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'team.get', 
            this.userContext, 
            id,
            null
        );
        return response;
    }
        /**
    * Get all entities
    * @params {any} query - Query filter
    * @params [optional] query - filter query
    * @params {number} page - Page to retrieve
    * @params {number} maxByPage - Item by page (default 100)
    */
    async getAllTeamAsync( query?, page?: number, maxByPage?: number): Promise<Team[]> {
        let command = await this.context.getCommandAsync('CortexCoreSportServiceGetAllTeamCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<Team[]>(
            'query', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'team.all', 
            this.userContext, 
            query, 
            null, 
            page, 
            maxByPage
        );
        return response;
    }
    /**
    * Get an entity by id
    * @params id string - unique id
    */
    async getSeasonAsync(id: string): Promise<Season> {
        let command = await this.context.getCommandAsync('CortexCoreSportServiceGetSeasonCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<Season>(
            'get', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'season.get', 
            this.userContext, 
            id,
            null
        );
        return response;
    }
        /**
    * Get all entities
    * @params {any} query - Query filter
    * @params [optional] query - filter query
    * @params {number} page - Page to retrieve
    * @params {number} maxByPage - Item by page (default 100)
    */
    async getAllSeasonAsync( query?, page?: number, maxByPage?: number): Promise<Season[]> {
        let command = await this.context.getCommandAsync('CortexCoreSportServiceGetAllSeasonCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<Season[]>(
            'query', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'season.all', 
            this.userContext, 
            query, 
            null, 
            page, 
            maxByPage
        );
        return response;
    }
    /**
    * Get an entity by id
    * @params id string - unique id
    */
    async getPlayerAsync(id: string): Promise<Player> {
        let command = await this.context.getCommandAsync('CortexCoreSportServiceGetPlayerCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<Player>(
            'get', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'player.get', 
            this.userContext, 
            id,
            null
        );
        return response;
    }
        /**
    * Get all entities
    * @params {any} query - Query filter
    * @params [optional] query - filter query
    * @params {number} page - Page to retrieve
    * @params {number} maxByPage - Item by page (default 100)
    */
    async getAllPlayerAsync( query?, page?: number, maxByPage?: number): Promise<Player[]> {
        let command = await this.context.getCommandAsync('CortexCoreSportServiceGetAllPlayerCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<Player[]>(
            'query', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'player.all', 
            this.userContext, 
            query, 
            null, 
            page, 
            maxByPage
        );
        return response;
    }
    /**
    * Get an entity by id
    * @params id string - unique id
    */
    async getGameAsync(id: string): Promise<Game> {
        let command = await this.context.getCommandAsync('CortexCoreSportServiceGetGameCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<Game>(
            'get', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'game.get', 
            this.userContext, 
            id,
            null
        );
        return response;
    }
        /**
    * Get all entities
    * @params {any} query - Query filter
    * @params [optional] query - filter query
    * @params {number} page - Page to retrieve
    * @params {number} maxByPage - Item by page (default 100)
    */
    async getAllGameAsync( query?, page?: number, maxByPage?: number): Promise<Game[]> {
        let command = await this.context.getCommandAsync('CortexCoreSportServiceGetAllGameCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<Game[]>(
            'query', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'game.all', 
            this.userContext, 
            query, 
            null, 
            page, 
            maxByPage
        );
        return response;
    }
    /**
    * Get an entity by id
    * @params id string - unique id
    */
    async getCustomerAsync(id: string): Promise<Customer> {
        let command = await this.context.getCommandAsync('CortexCoreSportServiceGetCustomerCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<Customer>(
            'get', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'customer.get', 
            this.userContext, 
            id,
            null
        );
        return response;
    }
        /**
    * Get all entities
    * @params {any} query - Query filter
    * @params [optional] query - filter query
    * @params {number} page - Page to retrieve
    * @params {number} maxByPage - Item by page (default 100)
    */
    async getAllCustomerAsync( query?, page?: number, maxByPage?: number): Promise<Customer[]> {
        let command = await this.context.getCommandAsync('CortexCoreSportServiceGetAllCustomerCommand');
        if( !command ) {
            command = await this.context.getCommandAsync('CortexCoreSportServiceCommand');
        }
        const response = await command.executeAsync<Customer[]>(
            'query', 
            CortexCoreSportService.serviceName, 
            CortexCoreSportService.serviceVersion, 
            'customer.all', 
            this.userContext, 
            query, 
            null, 
            page, 
            maxByPage
        );
        return response;
    }
}
