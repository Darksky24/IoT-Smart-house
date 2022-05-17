class Users {
    constructor (name, username, password ) {
        this.name = name;
        this.username = username;
        this.password = password;
    }
    toString() {
        return this.name + ', ' + this.username + ', ' + this.password;
    }
}

// Firestore data converter
const converter = {
    toFirestore: (city) => {
        return {
            name: city.name,
            username: city.username,
            password: city.password
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Users   (data.name, data.username, data.password);
    }
};