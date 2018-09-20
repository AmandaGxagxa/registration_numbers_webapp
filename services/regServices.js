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
    async function getPlates(plate) {
        const results = await pool.query('select * from registrations where num_plates = $1',[plate])
        return results.rows;
    }
    async function insertPlates(regNum, locID) {
        await pool.query('insert into registrations (num_plates,town_id)values($1,$2)',[regNum, locID])
    }
    async function addPlates(regNum, id) {
        let results = await getPlates(regNum);
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
        getPlates,
        addPlates,
        insertPlates
    }
}