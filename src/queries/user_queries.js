
class UserQueries {

    // Fetch All Users
    static fetchAllUsers(project_id, user_id){

        return `
        select users_models.id as user_id, users_models.image_url, INITCAP(concat(users_models.name, ' ', users_models.surname )) as username,
        department_models.department_name, project_models.project_name, status_models.status_name
        from users_models
        left join department_models on department_models.id = users_models."departmentId"
        left join project_models on project_models.id = users_models."projectId"
        left join status_models on status_models.id = users_models."statusId"
        where users_models.id <> ${user_id} and users_models."projectId" = ${project_id}
        `

    }

}

module.exports = UserQueries;
