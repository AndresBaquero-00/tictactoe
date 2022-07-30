
import { BuilderFactory, Director } from '../builder';
import { Invoker } from '../command';
import { ObserverFactory } from '../observer';
import { Triqui } from './Triqui';

export class Client {

    private static gameScene: HTMLDivElement;

    static {
        this.gameScene = document.querySelector('.game-scene') as HTMLDivElement;
    }

    public static main(...types: string[]) {
        const invoker = new Invoker();
        const triqui = Triqui.getTriqui();

        types.forEach(type => {
            // Create an appropiate builder instance
            const builder = BuilderFactory.getBuilder(type);
            // Configure the director and invoke different builder
            const director = new Director(builder);
            director.build();
            // Set invoker
            builder.setInvoker(invoker);
            // Create a observer
            const observer = ObserverFactory.getObserver(type, builder, triqui);
            triqui.register(observer);

            this.gameScene.append(builder.getPanel());
        });

        triqui.initialize();
    }

}