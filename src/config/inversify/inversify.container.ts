import {Container} from "inversify";

export class InversifyContainer {
    private static _instance: InversifyContainer
    private readonly _container: Container

    private constructor() {
        this._container = new Container({
            defaultScope: "Singleton"
        })
    }

    public static getInstance(): Container {
        if (!InversifyContainer._instance) {
            InversifyContainer._instance = new InversifyContainer()
        }
        return InversifyContainer._instance._container
    }
}
