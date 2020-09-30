<template>
    <div>
        <h1>Teams</h1>
        <TeamsTable  style="margin-top: 20px"/>
    </div>
</template>

<script>
import TeamsTable from "@/components/TeamsTable";

export default {
    name: 'teams',
    components: {
        TeamsTable
    }
};
</script>