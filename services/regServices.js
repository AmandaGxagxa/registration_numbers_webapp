module.exports = function (pool) {
    async function numberPlates(){
        const results = await pool.query('select * from registrations')
        return results.rows;
    }
    async function filterByTown(towns) {
        const results = await pool.query('select * from registrations where num_plates LIKE $1',['%'+ towns +' %']);
       return results.rows;
    }
    async function getTown(town) {
        const results = await pool.query('select * from townnames where init_town = $1', [town]);
       return results.rows;
    }
    async function getPlate(plate) {
        const results = await pool.query('select * from registrations where num_plates = $1',[plates])
        return results.rows;
    }
    async function insertPlates(regNum, locID) {
        await pool.query('insert into registrations (num_plates,town_id)valuesc($1,$)',[regNum, locID])
    }
    async function addPlates(regNum, id) {
        let results = await getPlates(plate);
        if (results.length !== 0){
            return false;
        }
        else{
            await insertPlates(regNum,id);
            return true;
        }
    }
    return {
        numberPlates,
        filterByTown,
        getTown,
        getPlate,
        addPlates,
        insertPlates
    }
}