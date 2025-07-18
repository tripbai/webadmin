import { Pluncx } from "../../../interfaces/pluncx";
import { ActivationEvent } from "../../../services/ActivationEvent";

//#Template_Bootstrap

const ready = async () => {
    // @ts-expect-error - bootstrap function will be 
    // dynamically supplied by the template
    bootstrap()
    ActivationEvent.dispatch()
}

export namespace AppRouter {
    Pluncx.app().ready(ready)
}