import { Invoker } from '../command/Invoker';

export abstract class ComponentBuilder {

    protected panel!: HTMLDivElement;

    public abstract create(): void;
    public abstract initialize(): void;

    public abstract setInvoker(invoker: Invoker): void;
    public abstract setValues(...args: string[]): void;

    public getPanel(): HTMLDivElement {
        return this.panel;
    }
}