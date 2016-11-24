function mainController($http, $location, todoService, $routeParams) {

    this.getAll = () => {
        todoService.getAll()
            .then((result) => {
                this.items = result.data;
            });
    };

    this.delete = (documentId) => {
        todoService.delete(documentId)
            .then((result) => {
                delete this.items[documentId];
                this.getAll();
            });
    };
    
}
