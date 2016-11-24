function itemController($http, $location, todoService, $routeParams) {

    console.log($routeParams.id);
    var id = $routeParams.id;

    if (!id) {
      console.log("new");
    } else {
      todoService.getByDocumentId(id)
        .then((result) => {
            $location.path("/item");
            this.firstname = result.data[0].firstname;
            this.lastname = result.data[0].lastname;
            this.email = result.data[0].email;
            console.log(result);
        });
    }


    this.items = {};

    this.save = (inputFirstname, inputLastname, inputEmail) => {
        todoService.save({
                firstname: inputFirstname,
                lastname: inputLastname,
                email: inputEmail,
                document_id: this.documentId
            })
            .then((result) => {
                $location.path("/list");
            });
    };

    // this.getByDocumentId = (documentId) => {
    //     todoService.getByDocumentId(documentId)
    //         .then((result) => {
    //             $location.path("/item");
    //             this.firstname = result.data[0].firstname;
    //             this.lastname = result.data[0].lastname;
    //             this.email = result.data[0].email;
    //             console.log(this);
    //         });
    // };
    // this.getByDocumentId(id);
}
