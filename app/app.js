let app = {
    // ----------------------------------------------------------------------------------------------------------------
    // MANIPULATION DU DOM DE L'APPLICATION
    // ----------------------------------------------------------------------------------------------------------------
    dom: {
        render: (content) => {
            document.querySelector('main.container').innerHTML = content;
        },
        renderEvents(elements) {
            // Provisoire devra être déplacé dans app.dom
            let template = document.querySelector("#event-template");
            document.querySelector('.event-list.row').innerHTML = '';
            for (const element of elements) {
                console.log(elements);
                let clone = document.importNode(template.content, true);
                clone.querySelector('h6.event-title').textContent = element.name;
                clone.querySelector('img.event-image').src = element.image.url;
                document.querySelector('.event-list.row').appendChild(clone);
            }
        }
    },


    // ----------------------------------------------------------------------------------------------------------------
    // ARCHITECTURE MVC DE L'APPLICATION
    // ----------------------------------------------------------------------------------------------------------------
    mvc: {
        router: null,
        dispatchRoute: (controller) => {
            // On veut au moins l'attribut view dans notre controller
            if (!controller.hasOwnProperty('view')) {
                return console.warn(`Le controller ${controller.constructor.name} 
                          est invalide.`);
            }

            fetch(`views/${controller.view}`)
                .then(response => response.text())
                .then(htmlContent => {
                    app.dom.render(htmlContent)
                }).then(() => {
                    if (typeof controller.executeHttpRequest === 'function') {
                        controller.executeHttpRequest();
                    }
                })
        },

    }
};


// L'application est exportée afin d'être accessible par d'autres modules.
export default app;