<template>
  <div>
    <v-row>
      <v-col cols="12" lg="12" xl="8">
        <div>
          <div>
            <div class="my-2">
              <h2 class="text-h4 font-weight-bold">Our Authors</h2>
            </div>

            <v-row>
              <v-col cols="12" md="6" v-for="author in authors" :key="author.id">
                <v-hover v-slot:default="{ hover }" open-delay="50" close-delay="50">
                  <div>
                    <v-card flat :color="hover ? 'white' : 'transparent'" :elevation="hover ? 12 : 0" hover>
                      <v-img :src="author.image" :aspect-ratio="16 / 9"
                        gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)" height="300px" class="elevation-2"
                        style="border-radius: 16px"></v-img>

                      <v-card-text class="text-center">
                        <v-avatar color="accent" size="86" class="authors">
                          <v-icon dark size="64">mdi-feather</v-icon>
                        </v-avatar>

                        <div class="text-h5 font-weight-bold primary--text pt-4">
                          {{ author.name }}
                        </div>

                        <div class="text-body-1 py-4">
                          {{ author.description }}
                        </div>

                        <div>
                          <v-btn icon v-for="(icon, index) in author.social" :key="index">
                            <v-icon>{{ icon }}</v-icon>
                          </v-btn>
                        </div>
                      </v-card-text>
                    </v-card>
                  </div>
                </v-hover>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>

      <v-col>
        <div>
          <siderbar />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Category",
  components: {
    siderbar: () => import("@/components/details/sidebar"),
  },
  data() {
    return {
      authors: [
        {
          id: 1,
          name: "Dương Quang Vinh",
          description: "Thiết kế và lập trình giao diện web.",
          image: "https://images.stockcake.com/public/3/4/9/349d7648-f1a2-46ef-94de-8614b63732a7_large/antique-feather-pen-stockcake.jpg",
          social: ['mdi-facebook', 'mdi-twitter', 'mdi-youtube', 'mdi-instagram']
        },
        {
          id: 2,
          name: "Dương Quang Thanh",
          description: "Lập dự án, chỉ đạo phát triển và hỗ trợ mọi người.",
          image: "https://images.stockcake.com/public/3/4/9/349d7648-f1a2-46ef-94de-8614b63732a7_large/antique-feather-pen-stockcake.jpg",
          social: ['mdi-facebook', 'mdi-twitter', 'mdi-youtube', 'mdi-instagram']
        },
        {
          id: 3,
          name: "Văn ĐaHy",
          description: "Lập trình backend đăng blog, bình luận.",
          image: "https://images.stockcake.com/public/3/4/9/349d7648-f1a2-46ef-94de-8614b63732a7_large/antique-feather-pen-stockcake.jpg",
          social: ['mdi-facebook', 'mdi-twitter', 'mdi-youtube', 'mdi-instagram']
        },
        {
          id: 4,
          name: "Nguyễn Trung Nghĩa",
          description: "Lập trình backend thông tin người dùng.",
          image: "https://images.stockcake.com/public/3/4/9/349d7648-f1a2-46ef-94de-8614b63732a7_large/antique-feather-pen-stockcake.jpg",
          social: ['mdi-facebook', 'mdi-twitter', 'mdi-youtube', 'mdi-instagram']
        },
        {
          id: 5,
          name: "Lê Bá Tuấn Vỹ",
          description: "Lập trình backend đăng nhập/đăng ký.",
          image: "https://images.stockcake.com/public/3/4/9/349d7648-f1a2-46ef-94de-8614b63732a7_large/antique-feather-pen-stockcake.jpg",
          social: ['mdi-facebook', 'mdi-twitter', 'mdi-youtube', 'mdi-instagram']
        },
        {
          id: 6,
          name: "???",
          description: "Null.",
          image: "https://images.stockcake.com/public/3/4/9/349d7648-f1a2-46ef-94de-8614b63732a7_large/antique-feather-pen-stockcake.jpg",
          social: ['mdi-facebook', 'mdi-twitter', 'mdi-youtube', 'mdi-instagram']
        },
        // Add more authors here
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.authors {
  position: relative;
  top: -50px;
  margin-bottom: -50px;
}
</style>