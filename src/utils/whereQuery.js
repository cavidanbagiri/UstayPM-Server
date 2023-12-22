const { where } = require("sequelize");

class WhereQuery {
  
  // Where Query For STF
  static STFWhereQuery(start_keyword, filtered_object, table_name) {
    start_keyword = start_keyword.trim();
    /*Where Query For Filtering Data For STF's */
    let time_query = "";
    /*start_keyword if filtered data for user will be add 'and' after where user id*/
    let where_query = `${start_keyword} `;

    for (let [key, value] of Object.entries(filtered_object)) {
      if (filtered_object[key] !== "" && filtered_object[key] !== "All") {
        // If Key name is material name or material type, ILIKE query will work will start wil entering value
        if (key === "material_name") {
          where_query += `${key} ILIKE '%${filtered_object[key]}%' `;
        }
        else if (key === "usernames") {
          where_query += `users_models.id = ${filtered_object[key]} `
        }
        else if (key === "stf_num") {
          where_query += `${key} ILIKE '%${filtered_object[key]}' `;
        } 
        else if (key === "createdAt") {
          where_query += `stf_models."${key}"::date = '${filtered_object[key]}' `;
        }
        else if (key === "user" && key != "") {
          where_query += `${table_name}."userId" = '${filtered_object[key]}' `; // main
        }
        else if (key === "date_order") {
          where_query = where_query.slice(0, -4);

          if (filtered_object[key] === "Ascending") {
            time_query += ` ORDER BY ${table_name}."createdAt" ASC `;
          } else if (filtered_object[key] === "Descending") {
            time_query += ` ORDER BY ${table_name}."createdAt" DESC `;
          } else {
            time_query = "";
          }
        } else {
          where_query += `${key} = '${filtered_object[key]}' `;
        }

        where_query += "and ";
      }
    }

    if (where_query.trim().length === start_keyword.length) {
      where_query = where_query.slice(0, -(start_keyword.length + 1));
    }

    // Remove Last and operation
    where_query = where_query.slice(0, -4);

    // Add Ascending Or Descending
    where_query += time_query;
    return where_query;
  }

  // Where Query For STF
  static SMWhereQuery(start_keyword, filtered_object, table_name) {
    start_keyword = start_keyword.trim();
    /*
      Where Query For Filtering Data For STF's 
    */
    let time_query = "";
    /*
      start_keyword if filtered data for user will be add 'and' after where user id
    */
    let where_query = `${start_keyword} `;

    for (let [key, value] of Object.entries(filtered_object)) {
      if (filtered_object[key] !== "" && filtered_object[key] !== "All") {
        // If Key name is material name or material type, IILIKE query will work will start wil entering value
        if (key === "sm_material_name") {
          where_query += `${key} ILIKE '%${filtered_object[key]}%' `;
          // where_query += ` or sm_material_name ILIKE '${filtered_object[key]}%' `
        } 
        else if (key === "usernames" && filtered_object[key] !== "All") {
          where_query += `users_models.id = ${filtered_object[key]} `
        }
        else if (key === "vendor_name" && filtered_object[key] !== "All" ) {
          where_query += `vendors_models.id = ${filtered_object[key]} `
        }
        else if (key === "stf_num") {
          where_query += `${key} ILIKE '%${filtered_object[key]}' `;
        }
        else if (key === "sm_num") {
          where_query += `${key} ILIKE '%${filtered_object[key]}' `;
        }
        else if (key === "createdAt") {
          where_query += `${table_name}."${key}"::date = '${filtered_object[key]}' `;
        }
        else if (key === "date_order") {
          where_query = where_query.slice(0, -4);
          if (filtered_object[key] === "Ascending") {
            time_query += ` ORDER BY ${table_name}."createdAt" ASC `;
          } else if (filtered_object[key] === "Descending") {
            time_query += ` ORDER BY ${table_name}."createdAt" DESC `;
          } else {
            time_query = "";
          }
        } else {
          where_query += `${key} = '${filtered_object[key]}' `;
        }

        where_query += "and ";
      }
    }

    if (where_query.trim().length === start_keyword.length) {
      where_query = where_query.slice(0, -(start_keyword.length + 1));
    }

    // Remove Last and operation
    where_query = where_query.slice(0, -4);

    // Add Ascending Or Descending
    where_query += time_query;

    
    return where_query;
  }

  // Where Query For Warehouse
  static WarehouseWhereQuery(start_keyword, filtered_object, table_name) {
    // console.log('Sm Filtered Object : ',filtered_object);
    start_keyword = start_keyword.trim();
    /*
      Where Query For Filtering Data For STF's 
    */
    let time_query = "";
    /*
      start_keyword if filtered data for user will be add 'and' after where user id
    */
    let where_query = `${start_keyword} `;

    for (let [key, value] of Object.entries(filtered_object)) {
      if (filtered_object[key] !== "" && filtered_object[key] !== "All") {
        // If Key name is material name or material type, ILIKE query will work will start wil entering value
        if (key === "sm_material_name") {
          where_query += `${key} ILIKE '${filtered_object[key]}%' `;
          // where_query += ` or sm_material_name ILIKE '${filtered_object[key]}%' `
        } 
        else if (key === "usernames" && filtered_object[key] !== "All") {
          where_query += `users_models.id = ${filtered_object[key]} `
        }
        else if (key === "vendor_name" && filtered_object[key] !== "All" ) {
          where_query += `vendors_models.id = ${filtered_object[key]} `
        }
        else if (key === "stf_num") {
          where_query += `${key} ILIKE '%${filtered_object[key]}' `;
        }
        else if (key === "sm_num") {
          where_query += `${key} ILIKE '%${filtered_object[key]}' `;
        }
        else if (key === "user" && key != "") {
          where_query += `stf_models."userId" = '${filtered_object[key]}' `;
        }
        else if (key === "createdAt") {
          where_query += `${table_name}."${key}"::date = '${filtered_object[key]}' `;
        }
        else if (key === "date_order") {
          where_query = where_query.slice(0, -4);

          if (filtered_object[key] === "Ascending") {
            time_query += ` ORDER BY ${table_name}."createdAt" ASC `;
          } else if (filtered_object[key] === "Descending") {
            time_query += ` ORDER BY ${table_name}."createdAt" DESC `;
          } else {
            time_query = "";
          }
        } else {
          where_query += `${key} = '${filtered_object[key]}' `;
        }

        where_query += "and ";
      }
    }

    if (where_query.trim().length === start_keyword.length) {
      where_query = where_query.slice(0, -(start_keyword.length + 1));
    }

    // Remove Last and operation
    where_query = where_query.slice(0, -4);

    // Add Ascending Or Descending
    where_query += time_query;

    return where_query;
  }

  // Where Query For Warehouse
  static ProvidedWhereQuery(start_keyword, filtered_object, table_name) {
    // console.log('Sm Filtered Object : ',filtered_object);
    start_keyword = start_keyword.trim();
    /*
      Where Query For Filtering Data For STF's 
    */
    let time_query = "";
    /*
      start_keyword if filtered data for user will be add 'and' after where user id
    */
    let where_query = `${start_keyword} `;

    for (let [key, value] of Object.entries(filtered_object)) {
      if (filtered_object[key] !== "" && filtered_object[key] !== "All") {
        // If Key name is material name or material type, ILIKE query will work will start wil entering value
        if (key === "sm_material_name") {
          where_query += `${key} ILIKE '${filtered_object[key]}%' `;
          // where_query += ` or sm_material_name ILIKE '${filtered_object[key]}%' `
        } 
        else if (key === "usernames" && filtered_object[key] !== "All") {
          where_query += `users_models.id = ${filtered_object[key]} `
        }
        else if (key === "vendor_name" && filtered_object[key] !== "All" ) {
          where_query += `vendors_models.id = ${filtered_object[key]} `
        }
        else if (key === "stf_num") {
          where_query += `${key} ILIKE '%${filtered_object[key]}' `;
        }
        else if (key === "sm_num") {
          where_query += `${key} ILIKE '%${filtered_object[key]}' `;
        }
        else if (key === "department" && key != "") {
          where_query += `provided_models."departmentId" = '${filtered_object[key]}' `;
        }
        else if (key === "createdAt") {
          where_query += `${table_name}."${key}"::date = '${filtered_object[key]}' `;
        }
        else if (key === "date_order") {
          where_query = where_query.slice(0, -4);

          if (filtered_object[key] === "Ascending") {
            time_query += ` ORDER BY ${table_name}."createdAt" ASC `;
          } else if (filtered_object[key] === "Descending") {
            time_query += ` ORDER BY ${table_name}."createdAt" DESC `;
          } else {
            time_query = "";
          }
        } else {
          where_query += `${key} = '${filtered_object[key]}' `;
        }

        where_query += "and ";
      }
    }

    if (where_query.trim().length === start_keyword.length) {
      where_query = where_query.slice(0, -(start_keyword.length + 1));
    }

    // Remove Last and operation
    where_query = where_query.slice(0, -4);

    // Add Ascending Or Descending
    where_query += time_query;
    return where_query;
  }

}

module.exports = WhereQuery;
