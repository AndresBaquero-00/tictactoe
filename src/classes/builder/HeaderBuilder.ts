import { ComponentBuilder } from './ComponentBuilder';
import { Invoker, ResetButton } from '../command';

import { x, o, xTurn, oTurn, restarIcon } from '../../assets';


export class HeaderBuilder extends ComponentBuilder {

    private buttonReset!: HTMLDivElement;
    private imageTurn!: HTMLImageElement;

    public create(): void {
        this.panel = document.createElement('div');

        const panelLogo = document.createElement('div');
        panelLogo.innerHTML  = `<img src="${ x }">`;
        panelLogo.innerHTML += `<img src="${ o }">`;
        panelLogo.classList.add('logo');

        this.imageTurn = document.createElement('img');
        const labelTurn = document.createElement('span');
        labelTurn.innerText = 'TURN';

        const panelTurn = document.createElement('div');
        panelTurn.append(this.imageTurn);
        panelTurn.append(labelTurn);
        panelTurn.classList.add('turn');

        this.buttonReset = document.createElement('div');
        this.buttonReset.innerHTML = `<img src="${ restarIcon }">`;
        this.buttonReset.classList.add('btn-reset');
        
        this.panel.append(panelLogo, panelTurn, this.buttonReset);
    }

    public initialize(): void {        
        this.imageTurn.src = '';
        this.panel.classList.add('game-header');
    }

    public setValues(...args: string[]): void {
        this.imageTurn.src = args[0] === 'X' ? xTurn:oTurn;
    }

    public setInvoker(invoker: Invoker): void {
        this.buttonReset.onclick = (e) => {
            invoker.actionPerformed({
                source: new ResetButton(e)
            });
        }
    }
    
}