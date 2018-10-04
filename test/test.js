const assert = require('assert');
const Registrations = require('../services/regServices');
const pg = require('pg');
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder123@localhost:5432/my_registrations';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});
describe('The basic database web app', function () {
    beforeEach(async function () {
        await pool.query('delete from registrations');
    });

    it('should be able to give all added registrations ', async function () {
        // the Factory Function is called CategoryService
        const registrations = Registrations(pool);
        let results = await registrations.numberPlates();
        assert.deepStrictEqual(0, results.length);
    });

    it('should to shouls be able to return number of registrations added', async function () {
        const registrations = Registrations(pool);
        await registrations.addPlates('CA 1236','1 ');
        await registrations.addPlates('CY 1236','2');
        await registrations.addPlates('CA 789','1 ');

        // await registrations.addPlates('CL', 'CJ 123-123');
        let results = await registrations.numberPlates();
        assert.deepEqual(3, results.length);
    });

    it('should not add the same registration number twice', async function () {
        const registrations = Registrations(pool);
        await registrations.addPlates('CA 1236', '1');
        await registrations.addPlates('CA 1236', '1');
        let results = await registrations.numberPlates();

        assert.strictEqual(1, results.length);
    });

    it('should to be able to filter all registrations from Cape Town', async function () {
        const registrations = Registrations(pool);
        await registrations.addPlates('CA 123654', '1');
        await registrations.addPlates('CJ 85236', '2');
        await registrations.addPlates('CA 85236', '1');
        let results = await registrations.filterByTown('CA');
        assert.deepEqual([{"num_plates":"CA 123654"},{"num_plates":"CA 85236"}], results);
    });

    it('should to be able to filter all registrations number', async function () {
        // the Factory Function is called CategoryService
        const registrations = Registrations(pool);
        await registrations.addPlates('CA 789', '1');
        await registrations.addPlates('CL 45862', '2');
        let results = await registrations.filterByTown('All');
        assert.deepEqual([ {'num_plates':'CA 789'},
        {'num_plates': 'CL 45862' } ], results);
    });

    after(function () {
        pool.end();
    });
});
