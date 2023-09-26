class STFQUeries {
  static createSTFNUMSAndReturn(projectId) {
    let create_stf_nums_and_return = `INSERT INTO stf_nums(stf_nums, projectId, "createdAt", "updatedAt") VALUES (1 + (select stf_nums from stf_nums order by id DESC limit 1), ${projectId}, current_timestamp, current_timestamp ) returning stf_nums
  `;
  }
}

module.exports = STFQUeries;
