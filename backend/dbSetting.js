const conn = require('./models/database');

async function createTestTable()  {
    // const sql1 = 'DROP TABLE TEST';
    // const sql2 = 'CREATE TABLE TEST ("id" NUMBER NOT NULL, "data" VARCHER(20) NULL)';
    const sql = `declare
    begin
      execute immediate 'create table "TEST" ("id" NUMBER NOT NULL, "data" VARCHAR(20) NULL)';
      exception when others then
        if SQLCODE = -955 then null; else raise; end if;
    end;`;
    //console.log(sql);
    try {
        await conn.simpleExecute(sql);
        // await conn.simpleExecute(sql2);
    } catch(e) {
        console.error(e);
    }
}

module.exports = {
    createTestTable : createTestTable
}