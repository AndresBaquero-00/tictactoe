import { Triqui } from '../lib';
import { Command } from './Command';

export class ResetButton implements Command {

    private e: MouseEvent;

    constructor(e: MouseEvent) {
        this.e = e;
    }

    public processEvent(): void {
        this.e.preventDefault();
        const triqui = Triqui.getTriqui();
        triqui.reset();
    }
}
