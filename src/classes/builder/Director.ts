import { ComponentBuilder } from './ComponentBuilder';

export class Director {

    private builder!: ComponentBuilder;
    
    constructor(builder: ComponentBuilder) {
        this.builder = builder;
    }

    public build(): void {
        this.builder.create();
        this.builder.initialize();
    }

}