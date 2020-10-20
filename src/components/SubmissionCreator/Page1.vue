<template>
    <div class="transition-all duration-300">
        <div class="w-full px-4 mt-4">
            <input v-model="name" class="text-xl py-2 w-full shadow rounded-lg border-solid border border-theme-light" type="text" placeholder="Figure Name">
        </div>
        <div class="w-full px-4 mt-4">
            <div class="w-full flex flex-row">
                <button @click="hasBox = true;" :class="{'bg-green-500 text-white': hasBox}" class="w-full px-4 py-2 text-center text-xl hover:bg-gray-300 focus:bg-green-500 focus:text-white rounded-l-lg shadow outline-none focus:outline-none">Box</button>
                <button @click="hasBox = false;" :class="{'bg-gray-600 text-white': !hasBox}" class="w-full px-4 py-2 text-center text-xl hover:bg-gray-300 focus:bg-gray-600 focus:text-white rounded-r-lg shadow outline-none focus:outline-none">No Box</button>
            </div>
        </div>
        <div class="mt-4 px-4 w-full flex flex-row font-semibold flex-wrap items-center justify-evenly">
            <button @click="type = '2D'" :class="{'bg-blue-500 text-white': type === '2D'}" class="w-full my-1 text-2xl px-10 py-10 rounded-lg shadow transition-all duration-300 hover:bg-gray-300 focus:bg-blue-500 focus:text-white outline-none focus:outline-none">2D</button>
            <button @click="type = '3D'" :class="{'bg-red-500 text-white': type === '3D'}" class="w-full my-1 text-2xl px-10 py-10 rounded-lg shadow transition-all duration-300 hover:bg-gray-300 focus:bg-red-500 focus:text-white outline-none focus:outline-none">3D</button>
            <button @click="type = '2D+3D'" :class="{'bg-purple-500 text-white': type === '2D+3D'}" class="w-full my-1 text-2xl px-10 py-10 rounded-lg shadow transition-all duration-300 hover:bg-gray-300 focus:bg-purple-500 focus:text-white outline-none focus:outline-none">2D+3D</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        eName: String,
        eHasBox: Boolean,
        eType: String
    },
    data(){
        return {
            name: '',
            hasBox: false,
            type: '',
        }
    },
    mounted(){
        if(this.eName !== undefined) this.name = this.eName;
        if(this.eHasBox !== undefined) this.hasBox = this.eHasBox;
        if(this.eType !== undefined) this.type = this.eType;
    }
}
</script>