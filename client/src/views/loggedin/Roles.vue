<template>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-12">
                <header><h3>Verwaltungspanel Rollen</h3></header>
                <hr>
            </div>
            <div class="col-3">
                <label for="newRole" class="form-label">Neue Rolle anlegen</label>
                <input type="text" class="form-control" id="newRole" ref="newRole">
            </div>
            <div class="col-3">
                <label class="form-label">&nbsp;</label>
                <button class="btn btn-primary form-control" @click="createRole(this.$refs.newRole.value)">Hinzufügen</button>
            </div>
            <div class="col-12 mt-3">
                <hr>
                <h3>Rollen</h3>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Räume</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="rolerow hovering-highlight" v-for="role in roles" :key="role.id" @click="manageRole(role.id)">
                            <th scope="row">{{ role.id }}</th>
                            <td>{{ role.name }}</td>
                            <td>{{ (role.rooms.join(',').length !== 0) ? role.rooms.join(',') : "Keine Räume" }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-1">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="rolerow" v-for="role in roles" :key="role.id">
                        <td>
                            <button class="btn-sm btn-danger" @click="deleteRole(role.id)">Löschen</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
.hovering-highlight:hover {
    background-color: lightgrey;
    cursor: pointer;
}
.rolerow td, .table tr th {
    line-height: 40px;
}
</style>

<script>
import RoleService from "../../services/role.service";

export default {
    name: "Roles",
    data() {
        return {
            roles: null,
        };
    },
    mounted() {
        RoleService.getRoles().then(
            (response) => {
                this.roles = response.data;
            }
        );
    },
    methods: {
        manageRole(id) {
            return this.$router.push('/role/management/' + id);
        },
        createRole(newRoleName) {
            if (newRoleName) {
                newRoleName = newRoleName.toLowerCase();
                RoleService.createRole(newRoleName);
            }
        },
        deleteRole(roleId) {
            RoleService.deleteRole(roleId)
        }
    }
};
</script>
