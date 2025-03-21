<template>
  <v-app-bar :height="xs ? 60 : 100" class="px-md-5" color="teal-lighten-5">
    <v-container fluid>
      <v-row>
        <v-col
          sm="4"
          class="d-flex align-center justify-space-between text-grey-darken-4"
        >
          <h1 class="text-h5 text-md-h4 font-weight-bold">
            <nuxt-link to="/" class="text-decoration-none text-surface-variant">
              juno midwives
            </nuxt-link>
          </h1>
          <v-btn
            icon="mdi-menu"
            @click="showMenu = !showMenu"
            class="d-sm-none"
          />
        </v-col>

        <v-col class="justify-end d-none d-sm-flex flex-wrap align-center">
          <template v-for="item in menuItems" :key="item.title">
            <v-menu v-if="item.subitems" open-on-hover offset="6">
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  color="surface-variant"
                  class="text-subtitle-1 px-2 px-md-3"
                  append-icon="mdi-chevron-down"
                >
                  {{ item.title }}
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="subitem in item.subitems"
                  :key="subitem.title"
                  density="compact"
                >
                  <nuxt-link :to="subitem.link" class="text-decoration-none">
                    <v-list-item-title class="text-subtitle-1">
                      {{ subitem.title }}
                    </v-list-item-title>
                  </nuxt-link>
                </v-list-item>
              </v-list>
            </v-menu>

            <nuxt-link
              v-else
              :to="item.link"
              class="text-subtitle-1 px-2 px-md-3"
            >
              {{ item.title }}
            </nuxt-link>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>

  <v-navigation-drawer
    v-model="showMenu"
    temporary
    location="bottom"
    class="rounded-t-xl"
    xszseazdddb
  >
    <v-list>
      <!-- {{ menuItems }} -->
      <!-- <template v-for="item in menuItems" :key="item.title"> -->
      <!-- <v-list-group v-if="item.subitems" :value="item.title">
          <template #activator="{ props }">
            <v-list-item v-bind="props">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </template>
          <v-list-item
            v-for="subitem in item.subitems"
            :key="subitem.title"
            :to="subitem.link"
          >
            <v-list-item-title>{{ subitem.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group> -->

      <!-- <v-list-item :to="item.link" :title="item.title" />
      </template> -->
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

const { xs } = useDisplay();
const showMenu = ref(false);
const { menuItems } = useNavigation();
</script>
