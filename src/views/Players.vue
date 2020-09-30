<template>
    <div>
        <h1>Players</h1>
        <PlayersTable  style="margin-top: 20px"/>
    </div>
</template>

<script>
import PlayersTable from "@/components/PlayersTable";

export default {
    name: 'players',
    components: {
        PlayersTable
    }
};
</script>