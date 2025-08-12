<template>
  <div>
    <v-navigation-drawer
        v-if="!$vuetify.breakpoint.smAndUp"
        v-model="drawer"
        :clipped="$vuetify.breakpoint.lgAndUp"
        app
        color="primary"
        dark
    >
      <v-list color="primary" nav>
        <v-list-item
            v-for="(item, i) in btnItems"
            :key="i"
            :href="item.href"
            :target="item.target"
            :to="item.to"
            link
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
            v-for="(item, i) in barItems"
            :key="i"
            :href="item.href"
            :target="item.target"
            :to="item.to"
            link
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        app
        color="white"
        elevate-on-scroll
        flat
    >
      <v-container :class="{ 'px-0': !$vuetify.breakpoint.smAndUp }">
        <v-row
            :no-gutters="!$vuetify.breakpoint.smAndUp"
            align="center"
            justify="space-between"
        >
          <v-col class="d-flex align-center">
            <v-app-bar-nav-icon
                v-if="!$vuetify.breakpoint.mdAndUp"
                @click.stop="drawer = !drawer"
            />
            <v-toolbar-title
                class="font-weight-bold text-h5 primary--text"
                style="cursor: pointer"
                @click="$router.push('/')"
            >
              <v-icon color="primary" large>mdi-feather</v-icon>
              AssM
              <span class="accent--text">Lập trình tếu</span>
            </v-toolbar-title>
          </v-col>

          <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="6">
            <v-btn
                v-for="(item, i) in barItems"
                :key="i"
                :to="item.to"
                class="text-capitalize"
                exact
                exact-active-class="accent--text"
                text
            >{{ item.title }}
            </v-btn
            >
          </v-col>

          <v-col v-if="$vuetify.breakpoint.mdAndUp" class="text-right">
            <template v-if="user">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" class="ml-3 text-capitalize" color="primary" outlined>
                    <v-icon left>mdi-account</v-icon>
                    {{ user.username }}
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="goToAccount">
                    <v-list-item-title>Thông tin tài khoản</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="logout">
                    <v-list-item-title>Đăng xuất</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
            <template v-else>
              <v-btn
                color="primary"
                outlined
                class="ml-3 text-capitalize"
                @click="$router.push('/login')"
              >
                <v-icon left>mdi-login</v-icon>
                Login
              </v-btn>
            </template>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    barItems: [
      { title: "Home", to: "/" },
      { title: "Category", to: "/category" },
      { title: "Detail", to: "/detail" },
      { title: "Authors", to: "/authors" },
      // { title: "Login", to: "/login" }, // Sẽ thay thế bằng menu tài khoản khi đã đăng nhập
    ],
    user: null, // Thông tin user đăng nhập
  }),
  created() {
    // KHÔNG xóa user ở đây nữa!
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    } else {
      this.user = null;
    }
  },
  watch: {
    $route() {
      const user = localStorage.getItem('user');
      if (user) {
        this.user = JSON.parse(user);
      } else {
        this.user = null;
      }
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('user');
      this.user = null;
      this.$router.push('/login');
    },
    goToAccount() {
      this.$router.push('/account');
    }
  }
}
</script>
