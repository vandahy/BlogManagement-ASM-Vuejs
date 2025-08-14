<template>
  <div>
    <v-row>
      <v-col cols="12" lg="12" xl="8">
        <v-card flat color="transparent">
          <!-- Ảnh lớn đầu bài -->
          <v-img
            src="https://th.bing.com/th/id/OIP.4jD24TUEaP-vLn6f03CnMAHaEJ?w=284&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="Ảnh bìa JavaScript"
            :aspect-ratio="16 / 9"
            gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
            style="border-radius: 16px"
          >
          </v-img>

          <v-card-text>
            <!-- Nhãn -->
            <div>
              <v-btn color="accent">TECH</v-btn>
            </div>

            <!-- Tiêu đề -->
            <div class="text-h4 font-weight-bold primary--text pt-4">
              <h4>10 Tips to Master JavaScript in 2025</h4>
            </div>

            <!-- Mô tả ngắn -->
            <div class="text-body-1 py-4">
              JavaScript là xương sống của lập trình web hiện đại. Bài viết này chia sẻ những mẹo quan trọng giúp bạn nâng cao kỹ năng coding, làm chủ framework mới và viết code sạch hơn, tối ưu hơn.
            </div>

            <!-- Tác giả & lượt xem -->
            <div class="d-flex align-center justify-space-between">
              <div class="d-flex align-center">
                <v-avatar color="accent" size="36">
                  <v-icon dark>mdi-laptop</v-icon>
                </v-avatar>
                <div class="pl-2 text-body-1">Yan Lee · 14 August 2025</div>
              </div>

              <div class="d-flex align-center">
                <v-chip small color="transparent">
                  <v-icon left>mdi-eye</v-icon>3.2k
                </v-chip>

                <v-chip small color="transparent">
                  <v-icon left>mdi-comment-outline</v-icon>12 Comments
                </v-chip>
              </div>
            </div>

            <v-divider class="my-4"></v-divider>

            <!-- Giới thiệu -->
            <div class="text-subtitle-1 primary--text font-weight-medium">
              Lập trình web hiện đại yêu cầu bạn thành thạo cả front-end và back-end. Hiểu lập trình bất đồng bộ, cấu trúc module và sử dụng framework như Vue.js, React là kỹ năng quan trọng để dẫn đầu.
            </div>

            <v-alert
              class="font-italic text-h6 text-center py-4"
              border="left"
              colored-border
              color="accent"
            >
              Pro Tip: Luôn viết code sạch và cập nhật tính năng mới của ES6+ để dễ bảo trì.
            </v-alert>

            <!-- Advanced Concepts -->
            <div class="text-h5 primary--text font-weight-bold">
              Advanced Concepts You Should Know
              <p class="text-subtitle-1 primary--text font-weight-medium mt-5">
                Học về closures, promises, async/await, module pattern. Tối ưu ứng dụng web về hiệu suất, khả năng mở rộng và tính dễ đọc.
              </p>
            </div>

            <!-- 2 ảnh nhỏ gần cuối bài (đã thay ảnh mới) -->
            <div class="my-4">
              <v-row>
                <v-col cols="6">
                  <v-card>
                    <v-img
                      src="https://png.pngtree.com/background/20230330/original/pngtree-the-concept-of-modern-it-technology-with-machine-learning-concept-of-picture-image_2210817.jpg"
                      alt="Công nghệ Machine Learning"
                      :aspect-ratio="16 / 9"
                      gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                    >
                    </v-img>
                  </v-card>
                </v-col>

                <v-col cols="6">
                  <v-card>
                    <v-img
                      src="https://th.bing.com/th/id/OIP.gRzY9iGM0qFplUDhAbQ1jQHaEo?r=0&o=7&rm=3&rs=1&pid=ImgDetMain"
                      alt="Ảnh công nghệ"
                      :aspect-ratio="16 / 9"
                      gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                    >
                    </v-img>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <!-- Key Topics -->
            <div class="text-h5 primary--text font-weight-bold">
              Key JavaScript Topics
              <div class="text-subtitle-1 primary--text font-weight-medium mt-5">
                <ul>
                  <li class="my-2">Các khái niệm cơ bản: biến, kiểu dữ liệu, hàm, vòng lặp, điều kiện.</li>
                  <li class="my-2">JS bất đồng bộ: callbacks, promises, async/await.</li>
                  <li class="my-2">Framework: Vue.js, React, Node.js và tích hợp vào web app.</li>
                </ul>
                <p>Cập nhật các thực hành JS mới giúp dự án chạy nhanh và dễ bảo trì hơn.</p>
              </div>
            </div>

            <!-- Tags & Share -->
            <div class="d-flex align-center justify-space-between mt-8">
              <v-row>
                <v-col class="flex-shrink-0" cols="auto"><v-chip color="accent">#JavaScript</v-chip></v-col>
                <v-col class="flex-shrink-0" cols="auto"><v-chip color="accent">#WebDevelopment</v-chip></v-col>
                <v-col class="flex-shrink-0" cols="auto"><v-chip color="accent">#Programming</v-chip></v-col>
              </v-row>

              <div class="text-h5">
                Share >
                <v-btn icon large><v-icon large color="primary">mdi-facebook</v-icon></v-btn>
                <v-btn icon large><v-icon large color="primary">mdi-twitter</v-icon></v-btn>
                <v-btn icon large><v-icon large color="primary">mdi-linkedin</v-icon></v-btn>
                <v-btn icon large><v-icon large color="primary">mdi-instagram</v-icon></v-btn>
              </div>
            </div>

            <v-divider class="my-8"></v-divider>

            <!-- Author -->
            <div class="my-8">
              <div class="d-flex align-center">
                <v-avatar color="accent" size="128">
                  <v-icon dark size="100">mdi-laptop</v-icon>
                </v-avatar>
                <div class="pl-4">
                  <div class="text-h5 primary--text font-weight-bold">Written by <span class="accent--text">Yan Lee</span></div>
                  <div class="text-subtitle-1 my-2">
                    Yan là lập trình viên web và blogger chia sẻ mẹo, hướng dẫn cho lập trình viên mới.
                  </div>
                  <div class="text-subtitle-1">
                    Get in touch >
                    <v-btn icon><v-icon>mdi-facebook</v-icon></v-btn>
                    <v-btn icon><v-icon>mdi-twitter</v-icon></v-btn>
                    <v-btn icon><v-icon>mdi-youtube</v-icon></v-btn>
                    <v-btn icon><v-icon>mdi-instagram</v-icon></v-btn>
                  </div>
                </div>
              </div>
            </div>

            <!-- Previous / Next Post -->
            <v-row justify="space-between">
              <v-col cols="12" md="6" lg="4">
                <div class="d-flex align-center">
                  <v-icon>mdi-arrow-left</v-icon>
                  <div class="text-h6 primary--text pl-2">
                    <div class="text-subtitle-1">Previous Post</div>Understanding CSS Grid and Flexbox
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="6" lg="4">
                <div class="d-flex align-center text-right">
                  <div class="text-h6 primary--text pr-2">
                    <div class="text-subtitle-1">Next Post</div>Building REST APIs with Node.js
                  </div>
                  <v-icon>mdi-arrow-right</v-icon>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col>
        <siderbar />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Category",
  components: {
    siderbar: () => import("@/components/details/sidebar")
  }
};
</script>