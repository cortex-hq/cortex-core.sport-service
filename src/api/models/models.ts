import { Model, Property, Reference, Validator } from "vulcain-corejs";


// -----------------------------------------------------------
// Sport
// -----------------------------------------------------------
@Model({description: 'Can be a yellow card, red card, an injury'})
export class Incident {
    @Property({ type: "string", required: true, unique: true, isKey: true })
    id: string;
    @Property({ type: "string", required: true })
    description: string;
    @Property({ type: "number", description: 'At what minute, the incident happened', required: true })
    minute: number;
    @Property({ type: "arrayOf", description: 'The list of protagonist ids', items: 'string', required: true })
    protagonists: string[];
}

@Model()
export class Game {
    @Property({ type: "string", required: true, unique: true, isKey: true })
    id: string;
    @Property({ type: "date-iso8601", required: true })
    date: string;
    @Property({ type: "string", required: true })  // TOO : Replace with GeoLoc.
    where: string;
    @Property({ type: "number", required: false })
    homeScore?: number; // ? provide the possibility to plan a game
    @Property({ type: "number", required: false, })
    awayScore?: number; // ? provide the possibility to plan a game
    @Property({ type: "boolean", required: false })
    played: boolean = false;
    @Property({ type: "string", required: true })
    homeTeamId: string;
    @Property({ type: "string", required: true })
    awayTeamId: string;
    @Reference({ cardinality: 'many', item: 'Incident', required: false })
    incidents?: Incident[];
}

// TODO : Add string field (description, label...).
@Model()
export class Season {
    @Property({ type: "string", required: true, unique: true, isKey: true })
    id: string;
    @Property({ type: "date-iso8601", required: true })
    startDate: string;
    @Property({ type: "date-iso8601", required: true, })
    endDate: string;
    @Reference({ cardinality: 'many', item: 'Game' })
    games: Game[];
    @Property({ type: "string", required: true })
    sportId: string;
}

@Model()
export class Sport {
    @Property({ type: "string", required: true, unique: true, isKey: true })
    id: string;
    @Property({ type: "string", required: true, unique: true })
    label: string;
}

@Model()
export class Teammate {
    @Property({ type: "string", required: true, unique: true, isKey: true })
    id: string;
    @Property({ type: "string", required: true })
    firstName: string;
    @Property({ type: "string", required: true })
    lastName: string;
    @Property({ type: "string", required: true })
    teamId: string;
    @Property({ type: "string", required: false })
    userId?: string;
}

@Model({extends: 'Teammate'})
export class Player extends Teammate {
    @Property({ type: "number", description: "The position of the player, its jersey number.", required: true })
    number: number;
}

@Model({extends: 'Teammate'})
export class Coach extends Teammate {
}

@Model()
export class Team {
    @Property({ type: "string", required: true, unique: true, isKey: true })
    id: string;
    @Property({ type: "string", required: true })
    sportId: string;
    @Reference({ cardinality: 'many', item: 'Player' })
    players: Player[];
    @Reference({ cardinality: 'one', item: 'Coach' })
    coach: Coach;
}
