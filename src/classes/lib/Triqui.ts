import { Observable, Observer } from '../observer';

export class Triqui implements Observable {

    public static readonly size = 3;
    private static triqui: Triqui;

    private observers!: Observer[];
    private currentPlayer!: string;
    private board!: string[];
    private scores!: number[];
    private finished!: {
        finished: boolean,
        type: string
    };

    static {
        this.triqui = new Triqui();
    }

    private constructor() {
        this.observers = [];
        this.scores = [0, 0, 0];
    }

    private isValid(pos: number): boolean {
        if (this.board[pos] === '') {
            this.board[pos] = this.currentPlayer;
            return true;
        }
        
        return false;
    }

    private isWinner(): boolean {
        const limit = Math.pow(Triqui.size, 2);
        let counter, k;
        let board;

        counter = 0; 
        board = this.board.map(pos => pos);
        // Se verifica por filas que el jugador haya ganado.
        for (let i = 0; i < limit; i++) {
            if (this.board[i] === this.currentPlayer) { 
                board[i] = `${this.board[i]}!`; 
                counter++;
            }
            if (counter === Triqui.size) { 
                this.board = board; 
                return true; 
            }
            if ((i + 1) % Triqui.size === 0) { 
                counter = 0; 
                board = this.board.map(pos => pos);
            }
        }

        counter = 0;
        board = this.board.map(pos => pos);
        // Se verifica por columnas que el jugador haya ganado.
        for (let i = 0; i < Triqui.size; i++) {
            let k = 0;
            while (k < limit) {
                if (this.board[k + i] === this.currentPlayer) {
                    board[k + i] = `${this.board[k + i]}!`; 
                    counter++; 
                }
                if (counter === Triqui.size) { 
                    this.board = board; 
                    return true; 
                }
                k += Triqui.size;
            }
            counter = 0;
            board = this.board.map(pos => pos);
        }

        counter = 0; k = 0;
        board = this.board.map(pos => pos);
        // Se verifica por diagonales que el jugador haya ganado.
        for (let i = 0; i < Triqui.size; i++) {
            if (this.board[k + i] === this.currentPlayer) { 
                board[k + i] = `${this.board[k + i]}!`; 
                counter++; 
            }
            if (counter === Triqui.size) { 
                this.board = board; 
                return true; 
            }
            k += Triqui.size;
        }

        counter = 0; k = limit - Triqui.size;
        board = this.board.map(pos => pos);
        for (let i = 0; i < Triqui.size; i++) {            
            if (this.board[k + i] === this.currentPlayer) {
                board[k + i] = `${this.board[k + i]}!`; 
                counter++; 
            }
            if (counter === Triqui.size) { 
                this.board = board; 
                return true; 
            }
            k -= Triqui.size;
        }

        return false;
    }

    private changePlayer(): void {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O':'X';
    }

    public isTie(): boolean {
        return this.board.every(pos => pos !== '');
    }

    public play(pos: number): void {
        if (this.finished.finished) return;
        
        if (this.isValid(pos)) {
            if (this.isWinner()) {
                this.currentPlayer === 'X' ? (this.scores[0]++):(this.scores[1]++);
                this.finished = {
                    finished: true,
                    type: 'player'
                };
            } else {
                if (this.isTie()) {
                    this.scores[2]++;
                    this.finished = {
                        finished: true,
                        type: 'draw'
                    };
                }
            }

            this.changePlayer();
            this.notify();
        }
    }

    public reset(): void {
        this.scores = [0, 0, 0];
        this.initialize();
    }

    public initialize(): void {
        const rand = Math.random();
        this.board = [];
        this.currentPlayer = rand >= 0.5 ? 'X':'O';
        this.finished = { finished: false, type: '' };

        const limit = Math.pow(Triqui.size, 2);
        for (let i = 0; i < limit; i++) {
            this.board.push('');
        }

        this.notify();
    }

    public getCurrentPlayer(): string {
        return this.currentPlayer;
    }

    public getScores(): number[] {
        return this.scores;
    }

    public getFinished() {
        return this.finished;
    }

    public getBoard(): string[] {
        return this.board;
    }

    public notify(): void {
        this.observers.forEach(obs => obs.refresh(this));
    }
    
    public register(obs: Observer): void {
        this.observers.push(obs);
    }

    public static getTriqui(): Triqui {
        return this.triqui;
    }
}