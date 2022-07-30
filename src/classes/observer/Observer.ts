import { ComponentBuilder } from '../builder';
import { Triqui } from '../lib';

export abstract class Observer {

    protected component!: ComponentBuilder;
    protected subject!: Triqui;
    
    constructor(component: ComponentBuilder, subject: Triqui) {
        this.component = component;
        this.subject = subject;
    }

    public abstract refresh(subject: Triqui): void;
}