export default class Controller {
    //Atributos privados
    #view
    #worker
    constructor({ view, worker }) {
        this.#view = view;
        this.#worker = worker;
    };

    static init(deeps) {
        const controller = new Controller(deeps)
        controller.init()
        return controller
    };

    init() {
        this.#view.configureOnFileChange(
            this.#configureOnFileChange.bind(this)//aqui eu me refiro a ela mesmo
        )
    };

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
}