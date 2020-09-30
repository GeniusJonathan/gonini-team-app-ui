<template>
    <div>
        <h1>Games</h1>
        <GamesTable  style="margin-top: 20px"/>
    </div>
</template>

<script>
import GamesTable from "@/components/GamesTable";

export default {
    name: 'games',
    components: {
        GamesTable
    }
};
</script>