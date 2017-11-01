var { Users } = require('./users');
var expect = require('expect');


describe('users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '123',
            name: 'abdalla',
            room: 'BBB'
        }, {
            id: '456',
            name: 'mohammed',
            room: 'AAA'
        }, {
            id: '789',
            name: 'ali',
            room: 'AAA'
        }]

    })

    it('should add a new user', () => {
        var users = new Users();
        var user = {
            name: 'abdalla',
            id: 123456,
            room: 'A'
        }
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return names for AAA room', () => {

        var resUsers = users.getUserList('AAA');

        expect(resUsers).toEqual(['mohammed', 'ali']);
    });
    it('should return names for BBB room', () => {

        var resUsers = users.getUserList('BBB');

        expect(resUsers).toEqual(['abdalla']);
    });


    it('should retuen a user ', () => {

        var userId = users.users[0].id;
        var user = users.getUser(userId);
        console.log(userId);

        console.log(user);


        expect(user.id).toBe(userId);

    });
    it('should not retuen a user', () => {
        var userId = '99';
        var user = users.getUser(userId);
        console.log(userId);

        console.log(user);


        expect(user).toNotExist();
    });

    it('should delete a user ', () => {
        var id = '123';
        var user = users.removeUser(id);

        expect(user.id).toBe(id);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var id = '999';
        var user = users.removeUser(id);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    })
});