<template>
  <div>
    <!-- Main Featured Card -->
    <div v-for="(item, index) in mainFeatured" :key="index">
      <v-card to="detail">
        <v-img
          :aspect-ratio="16 / 9"
          dark
          gradient="to top, rgba(25,32,72,.7), rgba(25,32,72,.0)"
          height="500px"
          :src="item.img"
        >
          <v-card-text class="fill-height d-flex align-end">
            <v-row class="flex-column">
              <v-col>
                <v-btn color="accent" to="category">{{ item.category }}</v-btn>
              </v-col>
              <v-col cols="12" lg="8" md="10" xl="7">
                <h2 class="text-h3 py-3" style="line-height: 1.2">{{ item.title }}</h2>
              </v-col>
              <v-col class="d-flex align-center">
                <v-avatar class="elevation-4" color="accent">
                  <v-icon large>mdi-feather</v-icon>
                </v-avatar>
                <div class="text-h6 pl-2">{{ item.author }} · {{ item.desc }}</div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-img>
      </v-card>
    </div>

    <v-row>
      <v-col cols="12" lg="12" xl="8">
        <!-- Recommended For You -->
        <div class="pt-16">
          <h2 class="text-h4 font-weight-bold pb-4">Recommended For You</h2>
          <v-row>
            <v-col
              v-for="(item, index) in recommended"
              :key="index"
              cols="12"
              lg="4"
              md="6"
            >
              <v-hover v-slot:default="{ hover }" close-delay="50" open-delay="50">
                <div>
                  <v-card :color="hover ? 'white' : 'transparent'" :elevation="hover ? 12 : 0" flat hover to="/detail">
                    <v-img
                      :aspect-ratio="16 / 9"
                      class="elevation-2"
                      gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                      height="200px"
                      :src="item.img"
                      style="border-radius: 16px"
                    >
                      <v-card-text>
                        <v-btn color="accent" to="category">{{ item.category }}</v-btn>
                      </v-card-text>
                    </v-img>

                    <v-card-text>
                      <div class="text-h5 font-weight-bold primary--text">{{ item.title }}</div>
                      <div class="text-body-1 py-4">{{ item.desc }}</div>
                      <div class="d-flex align-center">
                        <v-avatar color="accent" size="36">
                          <v-icon dark>mdi-feather</v-icon>
                        </v-avatar>
                        <div class="pl-2">{{ item.author }}</div>
                      </div>
                    </v-card-text>
                  </v-card>
                </div>
              </v-hover>
            </v-col>
          </v-row>
        </div>

        <!-- Featured -->
        <div class="pt-16">
          <h2 class="text-h4 font-weight-bold pb-4">Featured</h2>
          <v-row>
            <v-col
              v-for="(item, index) in featured"
              :key="index"
              cols="6"
              lg="4"
            >
              <v-card dark flat>
                <v-img
                  :aspect-ratio="16 / 9"
                  class="elevation-2 fill-height"
                  gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                  height="600px"
                  :src="item.img"
                >
                  <div class="d-flex flex-column justify-space-between fill-height">
                    <v-card-text>
                      <v-btn color="accent">{{ item.category }}</v-btn>
                    </v-card-text>
                    <v-card-text>
                      <div class="text-h5 py-3 font-weight-bold" style="line-height: 1.2">{{ item.title }}</div>
                      <div class="d-flex align-center">
                        <v-avatar color="accent" size="36">
                          <v-icon dark>mdi-feather</v-icon>
                        </v-avatar>
                        <div class="pl-2">{{ item.author }}</div>
                      </div>
                    </v-card-text>
                  </div>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>

      <v-col>
        <div class="pt-16">
          <siderbar />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    siderbar: () => import("@/components/details/sidebar"),
  },
  data() {
    return {
      mainFeatured: [
        {
          img: "https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg",
          category: "IT Insights",
          title: "Master the Future of IT: Insights, Tools, and Trends",
          author: "Yan Lee · 22 July 2025",
          desc: "Khám phá các xu hướng công nghệ, mẹo nghề nghiệp và hướng dẫn thực tế giúp bạn phát triển nhanh trong lĩnh vực IT."
        }
      ],
      recommended: [
        {
          img: "https://th.bing.com/th/id/OIP.PW8UolH8DIm-w29UX8gMuwHaEK?w=312&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
          category: "TIPS",
          title: "Top 5 Programming Languages to Learn in 2025",
          desc: "Không phải tất cả ngôn ngữ lập trình đều có giá trị như nhau...",
          author: "Yan Lee · 15 Aug 2025"
        },
        {
          img: "https://th.bing.com/th/id/OIP.fVhugALJONmLNfkXYnySCQHaEo?w=259&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
          category: "TIPS",
          title: "Mastering Git: Tips for Version Control",
          desc: "Git là công cụ quan trọng cho mọi lập trình viên nhưng nhiều người vẫn sử dụng chưa hiệu quả...",
          author: "Yan Lee · 10 Aug 2025"
        },
        {
          img: "https://th.bing.com/th/id/OIP.5S6lfKp9_rwKJdrACZSXswHaE8?w=226&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
          category: "TIPS",
          title: "Cybersecurity Essentials for Beginners",
          desc: "Bảo mật mạng không chỉ dành cho chuyên gia. Học cách nhận diện lỗ hổng cơ bản...",
          author: "Yan Lee · 08 Aug 2025"
        }
      ],
      featured: [
        {
          img: "https://th.bing.com/th/id/OIP.hP14jlzy_3RjCgwY2aOSxQHaEo?w=203&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
          category: "AI",
          title: "AI Trends That Will Shape 2025",
          author: "Yan Lee · 01 Aug 2025"
        },
        {
          img: "https://th.bing.com/th/id/OIP.aAiF9dPUC-NEwZaFmdAeVgHaEK?w=250&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
          category: "Cloud",
          title: "Cloud Computing: From Beginner to Pro",
          author: "Yan Lee · 28 Jul 2025"
        },
        {
          img: "https://th.bing.com/th/id/OIP.0BUKX8r0J8hTLqUuemG48QHaEK?w=288&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
          category: "Web Dev",
          title: "Building Scalable Web Applications",
          author: "Yan Lee · 25 Jul 2025"
        }
      ]
    };
  }
};
</script>
