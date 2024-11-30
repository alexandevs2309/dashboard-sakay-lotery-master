<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed, ref, watch } from 'vue';
import AppFooter from './AppFooter.vue';
import AppTopbar from './AppTopbar.vue';
import CustomAppSidebar from './CustomAppSidebar.vue';

const { layoutConfig, layoutState, isSidebarActive, resetMenu } = useLayout();

const outsideClickListener = ref(null);

watch(isSidebarActive, (newVal) => {
    if (newVal) {
        bindOutsideClickListener();
    } else {
        unbindOutsideClickListener();
    }
});

const containerClass = computed(() => {
    return {
        'layout-overlay': layoutConfig.menuMode === 'overlay',
        'layout-static': layoutConfig.menuMode === 'static',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive,
        'layout-mobile-active': layoutState.staticMenuMobileActive
    };
});

function bindOutsideClickListener() {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                resetMenu();
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
}

function unbindOutsideClickListener() {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
}

function isOutsideClicked(event) {
    const sidebarEl = document.querySelector('.layout-sidebar');
    const topbarEl = document.querySelector('.layout-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
}
</script>

<template>
    
    <div class="layout-wrapper" :class="containerClass">
        <app-topbar></app-topbar>

        <CustomAppSidebar />
        <!-- <app-sidebar></app-sidebar> -->
        <div class="layout-main-container">
            <!-- Aviso de pago pendiente -->
            <div class="border-l-4 border-yellow-400 bg-yellow-50 p-4 mb-6 rounded-md shadow-md">
                <div class="flex items-center">
                    <span class="h-5 w-5 text-yellow-400 pi pi-exclamation-triangle mr-3" aria-hidden="true"></span>
                    <p class="text-lg text-yellow-700 flex-grow">
                        Tiene pendiente el pago de su servicios con fecha de corte: <span class="font-semibold">23 / 12
                            /
                            2024</span>
                    </p>
                    <a href="#" class="font-medium text-yellow-700 underline hover:text-yellow-600 ml-auto">Pagar</a>
                </div>
            </div>
            <div class="layout-main">
                <router-view></router-view>
            </div>
            <app-footer></app-footer>
        </div>
        <div class="layout-mask animate-fadein"></div>
    </div>
    <Toast />
</template>
