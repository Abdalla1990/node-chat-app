var expect = require('expect');
const { generateMessage } = require('./message');

describe('generateMessage', () => {

    it('should generate a correct message object', () => {

        var from = 'jan';
        var text = 'hello its me';
        var message = generateMessage(from, text);


        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, text });
    });

})