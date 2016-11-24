function todoService($http) {

    this.$http = $http;

    this.save = (data) => {
        return this.$http.post('/api/save', data);
    };

    this.getAll = () => {
        return this.$http.get('/api/getAll');
    };

    this.getByDocumentId = (id) => {
        return this.$http.get('/api/getByDocumentId/' + id);
    };

    this.delete = (id) => {
        return this.$http.delete('/api/delete/' + id);
    };

}
