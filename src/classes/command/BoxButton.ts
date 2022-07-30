import { o, x } from '../../assets';
import { Button, Modal } from '../components';
import { Triqui } from '../lib';
import { Command } from './Command';

export class BoxButton implements Command {

    private e: MouseEvent;

    constructor(e: MouseEvent) {
        this.e = e;
    }

    public processEvent(): void {
        const { type, target: t } = this.e;

        const triqui = Triqui.getTriqui();
        const target = t as HTMLDivElement;
        const currentPlayer = triqui.getCurrentPlayer();

        if (type === 'mouseenter') {
            target.classList.add(`preview-${ currentPlayer }`);
        } else if (type === 'mouseleave') { 
            target.classList.remove(`preview-${ currentPlayer }`);
        } else if (type === 'click') {
            const { index } = target.dataset;
            triqui.play( parseInt(index || '0') );

            const btnQuit = new Button({
                className: 'grey',
                onClick: () => { console.log('quit'); },
                desc: 'QUIT'
            });

            const { finished, type } = triqui.getFinished();
            if (finished) {
                if (type === 'draw') {
                    const modal = new Modal({
                        desc: 'DRAW',
                    });

                    const btnRestart = new Button({
                        className: currentPlayer === 'X' ? 'green':'yellow',
                        onClick: () => { triqui.initialize(); modal.dismiss(); },
                        desc: 'RESTART'
                    });

                    modal.addActions(btnQuit, btnRestart);
                    modal.present();
                } else {
                    const modal = new Modal({
                        player: currentPlayer === 'X' ? 'P1':'P2',
                        desc: 'TAKES THE ROUND',
                        playerImg: currentPlayer === 'X' ? x:o
                    });

                    const btnRestart = new Button({
                        className: currentPlayer === 'X' ? 'green':'yellow',
                        onClick: () => { triqui.initialize(); modal.dismiss(); },
                        desc: 'RESTART'
                    });

                    modal.addActions(btnQuit, btnRestart);
                    modal.present();
                }

            }
        }
    }
}
