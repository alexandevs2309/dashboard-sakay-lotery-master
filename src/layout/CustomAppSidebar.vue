 <template>
  <div class="layout-sidebar sidebar-custom" :class="{'dark-theme': isDarkTheme}">
      <ul class="layout-menu">
          <li v-for="item in menuItems" :key="item.label" class="menu-item-container">
              <router-link :to="item.routerLink" class="menu-item" @click="toggleSubMenu(item)">
                  <i :class="item.iconClass"></i>
                  <span>{{ item.label }}</span>
              </router-link>
              <ul v-if="item.hasSubmenu && item.submenuVisible" :class="['submenu card', 'floating-submenu '] ">
                  <li v-for="subItem in item.submenuItems" :key="subItem.label">
                      <router-link :to="subItem.routerLink" class="submenu-item"
                      @click="closeSubMenu"
                      >
                          <i :class="subItem.iconClass"></i>
                          <span>{{ subItem.label }}</span>
                      </router-link>
                  </li>
              </ul>
          </li>
      </ul>
  </div>
</template> 

<script setup>


import { onBeforeUnmount, onMounted, ref } from 'vue';

  const menuItems = ref([
    { label: 'Panel', iconClass: 'pi pi-home', routerLink: '/' },
    { label: 'Cuadres', iconClass: 'pi pi-money-bill', routerLink: '/pages/cuadre' },
    { label: 'Sorteos', iconClass: 'pi pi-calendar', routerLink: '/sorteos' },
    { label: 'Empleados', iconClass: 'pi pi-users', routerLink: '/empleados' },
    {
        label: 'Bancas',
        iconClass: 'pi pi-building',
        routerLink: '#',
        hasSubmenu: true,
        submenuVisible: false,
        submenuItems: [
            { label: 'Listas de Bancas', iconClass: 'pi pi-list', routerLink: '/pages/listabancas' },
            { label: 'Crear Banca', iconClass: 'pi pi-plus', routerLink: '/pages/bancas/new' },
            { label: 'Duplicar', iconClass: 'pi pi-clone', routerLink: '#' }
      ]
  },
  {
      label: 'Reportes',
      iconClass: 'pi pi-chart-line',
      routerLink: '#',
      hasSubmenu: true,
      submenuVisible: false,
      submenuItems: [
          { label: 'Premios', iconClass: 'pi pi-file', routerLink: '/pages/ReportesPremios' },
          { label: 'Resumen Banquer@s ', iconClass: 'pi pi-file', routerLink: '/pages/ReporteDeEmpleados' },
          { label: 'Analisis de riegos', iconClass: 'pi pi-file', routerLink: '/pages/AnalisisdeRiesgos' },
         
      ]
  },
  { label: 'Ajustes', 
    iconClass: 'pi pi-cog',
    routerLink: '#',
    hasSubmenu: true,
    submenuVisible: false,
    submenuItems: [
       {label: 'Consorcios' , iconClass: '  pi pi-star', routerLink: '/consorcios' },
       {label: 'Restricciones' , iconClass: 'pi pi-ban', routerLink: '/restricciones' },
       {label: 'Cierres De Loterias' , iconClass: 'pi pi-times-circle', routerLink: '/cierreDeLoteria' },
       {label: 'Configurar Puntos de Fidelidad', iconClass: 'pi pi-cog', routerLink: '/puntos'}
    ] 
  
  },
  { label: 'Facturación', iconClass: 'pi pi-dollar', routerLink: '/facturacion' },
]);
const isDarkTheme = ref(false);

const toggleSubMenu = (item) => {

  menuItems.value.forEach(i => {
    if (i !== item && i.submenuVisible) {
      i.submenuVisible = false;
    }
  });

  item.submenuVisible = !item.submenuVisible;
};

const handleClickOutside = (event) => {
    menuItems.value.forEach(item => {
        if (item.submenuVisible && !event.target.closest('.menu-item-container')) {
            item.submenuVisible = false;
        }
    });
};
const closeSubMenu = () => {
  menuItems.value.forEach(item => {
    item.submenuVisible = false; // Cierra todos los submenús
  });
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* Estilos para la barra lateral y el menú */

.sidebar-custom {
  height: 100vh;
  width: 100px;
  z-index: 997;
  margin-left: 0px;
  margin-top: 0;
  position: fixed;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.08);
  overflow-y: visible;
}

.custom-layout-menu {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.menu-item-container {
  position: relative;
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.7rem;
  margin: 0px 0px;
  color: #888;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
  width: 100%;
  
}

.menu-item:hover {
  color: #007bff;
}

.menu-item i {
  font-size: 1.5rem;
  margin-right: 10px;
}

.menu-item span {
  font-size: 1rem;
  text-align: left;
}

.floating-submenu {
    position: absolute;
    top: 0;
    left: 55%;
    margin-left: 1px;
    background-color: rgb(248, 243, 243);
    padding: 0.5rem;
    border-radius: 5px;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.15);
    z-index: 999;
    min-width: 200px;
    display: flex;
    flex-direction: column;
}

/* Espacio entre los elementos del submenú */
.floating-submenu .submenu-item {
    display: block;
    padding: 0.5rem;
    margin-top: 0.5rem; 
    margin-left: 0.5rem;
    margin-bottom: 0.5rem;
    color: #888;
}


/* Remueve el margen inferior del último elemento */
.floating-submenu .submenu-item:last-child {
    margin-bottom: 0;
}

.floating-submenu .submenu-item:hover {
    color: #007bff;
}


.dark-theme .submenu { background-color: #333333; color: #ffffff; }

</style> 







