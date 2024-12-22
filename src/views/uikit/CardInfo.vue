<template>
    <div class="bg-surface-0 dark:bg-surface-900 shadow p-4 rounded-border">
        <div class="flex justify-between mb-4">
            <div>
                <span class="block text-surface-500 dark:text-surface-300 font-medium mb-4">{{ title }}</span>
                <slot />
            </div>
            <div class="flex items-center justify-center rounded-border w-10 h-10">
                <i :class="icon" :style="{ color: iconColor }" class="!text-xl"></i>
            </div>
        </div>
        <slot name="footer" />
    </div>
</template>

<script setup>
defineProps({
    title: String,
    icon: String,
    iconColor: String
});
</script>
