import { ComponentBuilder } from './ComponentBuilder';

import { BoxButton, Invoker } from '../command';
import { Triqui } from '../lib';

export class BoardBuilder extends ComponentBuilder {

    private boxes!: HTMLDivElement[];
    private board!: string[];

    public create(): void {
        this.panel = document.createElement('div');

        const numBoxes = Math.pow(Triqui.size, 2);
        this.boxes = [];

        for (let i = 0; i < numBoxes; i++) {
            const box = document.createElement('div');
            box.classList.add('box', 'blank');
            box.setAttribute('data-index', `${i}`);
            this.boxes.push(box);
        }
    }

    public initialize(): void {
        this.panel.append(...this.boxes);
        this.panel.classList.add('game-board');
    }

    public setValues(...args: string[]): void {        
        this.board = args;

        this.boxes.forEach((box, i) => {
            if (this.board[i] !== '') {
                box.className = '';

                const data = this.board[i].split('');
                box.classList.add('box', 'active', data[0]);
                
                if (data[1]) {
                    box.classList.add('match-3');
                }
                
            } else if (this.board[i] === '' && !box.classList.contains('blank')) {
                box.className = '';
                box.classList.add('box', 'blank');
            }
        });
    }

    public setInvoker(invoker: Invoker): void {
        this.boxes.forEach(box => {
            const handler = (e: MouseEvent) => {
                invoker.actionPerformed({
                    source: new BoxButton(e)
                });
            }

            box.onmouseenter = handler;
            box.onmouseleave = handler;
            box.onclick = handler;
        });
    }

}