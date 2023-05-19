export default class Controller {
    //Atributos privados
    #view
    #worker
    #events = {
        alive: () => { console.log('alive'); },
        progress: () => { console.log('progess'); },
        ocurrenceUpdate: () => { console.log('ocurrenceUpdate'); }
    };

    constructor({ view, worker }) {
        this.#view = view;
        this.#worker = this.#configureWorker(worker);
    };

    static init(deeps) {
        const controller = new Controller(deeps)
        controller.init()
        return controller
    };

    init() {
        this.#view.configureOnFileChange(
            this.#configureOnFileChange.bind(this)//aqui eu me refiro a ela mesmo
        );

        this.#view.configureOnFormSubmit(
            this.#configureOnFormSubmit.bind(this)//aqui eu me refiro a ela mesmo
        );
    };

    #configureWorker(worker) {
        worker.onmessage = ({ data }) => {
            const event = data.eventType;
            this.#events[event](data);
        };
        return worker;
    }

    #formatByte(bytes) {
        const units = ['B', 'KB', 'GB', 'TB'];

        let i = 0;
        for (i; bytes >= 1024 && i < 4; i++) {
            bytes /= 1024
        };

        return `${bytes.toFixed(2)} ${units[i]}`
    }

    #configureOnFileChange(file) {
        this.#view.setFileSize(
            this.#formatByte(file.size)
        )
    };

    #configureOnFormSubmit({ description, file }) {
        const query = {};
        query['call description'] = new RegExp(
            description, 'i'
        )
        if (this.#view.isWorkerEnabled()) {
            this.#worker.postMessage({ description, file })
            console.log('Habilitado, worker trhead');
            return
        }
        console.log('Executing on main trhead!!!');

    };
}