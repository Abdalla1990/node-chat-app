var expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {

    it('should generate a correct message object', () => {

        var from = 'jan';
        var text = 'hello its me';
        var message = generateMessage(from, text);


        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, text });
    });

})

describe('generateLocationMessage', () => {

    it('should generate a correct google link', () => {
        var from = 'user';
        var lat = '10';
        var long = '19';
        var location = 'https://google.com/maps?q=10,19';
        var message = generateLocationMessage(from, lat, long);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, location });
    });



});