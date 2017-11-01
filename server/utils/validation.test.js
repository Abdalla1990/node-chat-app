var expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {

    it('should reject a non-string values', () => {


        var obj = isRealString(89);

        expect(obj).toBe(false);
        // expect(message).toInclude({ name, room });
    });
    it('should reject strings with only spaces', () => {
        var obj = isRealString('   ');
        expect(obj).toBe(false);
    });
    it('should allow strings with non-space characters', () => {
        var obj = isRealString('  abdalla  ');
        expect(obj).toBe(true);
    });

})