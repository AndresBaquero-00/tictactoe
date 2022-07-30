import { Command } from './Command';

import { ActionEvent, ActionListener } from '../../interfaces';


export class Invoker implements ActionListener {

    constructor() {}

    public actionPerformed(e: ActionEvent): void {
        const command = e.source as Command;
        command.processEvent();
    }

}