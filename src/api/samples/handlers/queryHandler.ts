import { Customer } from "../models/models";
import { QueryHandler, DefaultQueryHandler } from "vulcain-corejs";

// -----------------------------------------------------------
// Defaut query handlers (get/search)
// -----------------------------------------------------------
@QueryHandler({ scope: "?", schema: "Customer" })
export class CustomerQueryHandler extends DefaultQueryHandler<Customer> {
}

