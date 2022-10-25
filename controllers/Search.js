import ParisEvents from "../models/ParisEvents.js";
import app from "../app/app.js";
export default class Search {
    constructor() {
        this.view = 'search.html';
        this.api = new ParisEvents();
        this.currentPage = null;
        this.isLoad = false;
        this.stopScroll = false;
    }

    executeHttpRequest() {
        document.querySelector('#formSearch').addEventListener('submit', (e) => {
            e.preventDefault();
            this.currentPage = 1;
            this.stopScroll = false;
            this.search(
                document.querySelector('#q').value,
                document.querySelector('#dateStart').value,
                document.querySelector('#sortBy').value,
                12,
                this.currentPage
            );
        });

        document.addEventListener('scroll', () => {
            if (this.currentPage >= 1 && this.stopScroll !== true) {
                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
                    // si il y a déjà un chgargement en cours on patiente
                    if (this.isLoad) return;

                    // on veut les donner de la prochaine page
                    this.isLoad = true;
                    this.currentPage++;
                    this.search(
                        document.querySelector('#q').value,
                        document.querySelector('#dateStart').value,
                        document.querySelector('#sortBy').value,
                        12,
                        this.currentPage
                    );
                }
            }
        })
    }

    search(q, dateStart, sortBy, limit, page) {
        this.api.getAll(q, dateStart, sortBy, limit, (limit * page) - limit).then((data) => {
            if (data.nhits <= limit * page) {
                this.stopScroll = true;
            }
            this.isLoad = false;
            app.dom.renderEvents(data.records, (page == 1 ? true : false));
        });
    }
}