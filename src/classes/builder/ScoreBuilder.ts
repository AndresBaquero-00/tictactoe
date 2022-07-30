import { Invoker } from '../command';
import { ComponentBuilder } from './ComponentBuilder';

export class ScoreBuilder extends ComponentBuilder {

    private scoreX!: HTMLElement;
    private scoreTies!: HTMLElement;
    private scoreO!: HTMLElement;

    private createScorePanel(player: string, text: string): HTMLDivElement {
        const scorePanel = document.createElement('div');
        scorePanel.innerHTML = `<label>${ text }</label>`;
        scorePanel.classList.add('game-scores', player);

        return scorePanel;
    }

    public create(): void {
        this.panel = document.createElement('div');

        const scoreXPanel = this.createScorePanel('X','X (P1)');
        this.scoreX = document.createElement('b');
        scoreXPanel.append(this.scoreX);

        const scoreTiesPanel = this.createScorePanel('ties','TIES');
        this.scoreTies = document.createElement('b');
        scoreTiesPanel.append(this.scoreTies);

        const scoreOPanel = this.createScorePanel('O','O (P2)');
        this.scoreO = document.createElement('b');
        scoreOPanel.append(this.scoreO);
        
        this.panel.append(scoreXPanel, scoreTiesPanel, scoreOPanel);
    }

    public initialize(): void {
        this.panel.classList.add('score');
        this.scoreX.innerText = this.scoreTies.innerText = this.scoreO.innerText = '';
    }

    public setInvoker(_invoker: Invoker): void {}

    public setValues(...args: string[]): void {
        this.scoreX.innerText = args[0];
        this.scoreO.innerText = args[1];
        this.scoreTies.innerText = args[2];
    }
    
}