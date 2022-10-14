
// **WARNING** Large data objects should not be members of the class. Instance memory allocation is static and may go out of bounds. 
export abstract class BaseDataConnector {

    constructor(){}

    configForm(): string {
        // For an example see https://docs.steer.finance/data-connectors/interface-api#configuration-form
        return "A react-json-schema of any required user-inputted properties for this connector"
    }

    main(response: string): string {
        // See https://docs.steer.finance/data-connectors/interface-api#main
        return "The output of this function should be either a stringified axios config for an http request, or true to end callback loop"
    }

    transform(): string {
        // Refer to https://docs.steer.finance/data-connectors/interface-api#transform
        return "This function can perform any final logic after collecting required data and should return formatted results"
    }

    // Check the releases and docs for the latest features, interfaces, and support
    version(): i32{
        return 2
    }
}