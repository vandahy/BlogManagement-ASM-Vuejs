<template>
  <!-- Layout căn giữa form đăng nhập/đăng ký trên màn hình -->
  <v-row class="d-flex justify-center align-center fill-height" style="min-height: 100vh">
    <v-col cols="12" md="6">
      <v-card class="py-6">
        <!-- Tiêu đề động: Login hoặc Register -->
        <v-card-title class="d-flex justify-center">
          <div class="text-h4">{{ isRegister ? 'Register' : 'Login' }}</div>
        </v-card-title>
        <v-card-text>
          <!-- Nếu chưa đăng ký, hiển thị form đăng nhập -->
          <template v-if="!isRegister">
            <v-form ref="loginForm" v-model="valid" lazy-validation>
              <v-text-field label="Username" outlined v-model="username" :rules="usernameRules"></v-text-field>
              <v-text-field label="Password" outlined type="password" v-model="password" :rules="passwordRules"></v-text-field>
              <div class="text-right">
                <!-- Nút đăng nhập, gọi hàm handleLogin -->
                <v-btn color="primary" @click="handleLogin">Login</v-btn>
              </div>
            </v-form>
            <v-divider class="my-4"></v-divider>
            <div class="d-flex justify-center">
              <div id="g_id_signin"></div>
            </div>
            <div class="subtitle">
              Don't have an account?
              <!-- Chuyển sang form đăng ký khi bấm Create Account -->
              <span class="subtitle-action" @click="isRegister = true">Create Account</span>
            </div>
          </template>
          <!-- Nếu đang ở form đăng ký -->
          <template v-else>
            <v-text-field label="Username" outlined v-model="regUsername"></v-text-field>
            <v-text-field label="Email" outlined v-model="regEmail"></v-text-field>
            <v-text-field label="Password" outlined type="password" v-model="regPassword"></v-text-field>
            <v-text-field label="Confirm Password" outlined type="password" v-model="regConfirm"></v-text-field>
            <div class="text-right">
              <!-- Nút đăng ký, gọi hàm handleRegister -->
              <v-btn color="primary" @click="handleRegister">Register</v-btn>
              <!-- Nút quay lại form đăng nhập -->
              <v-btn text @click="isRegister = false">Back</v-btn>
            </div>
          </template>
          <!-- Hiển thị lỗi nếu có -->
          <div v-if="error" style="color: red; margin-top: 10px;">
            {{ error }}
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      // Biến cho form đăng nhập
      username: '',    // Lưu username nhập vào
      password: '',    // Lưu password nhập vào
      valid: false,
      usernameRules: [
        v => !!(v && String(v).trim()) || 'Username là bắt buộc',
        v => String(v || '').trim().length >= 3 || 'Username tối thiểu 3 ký tự'
      ],
      passwordRules: [
        v => !!(v && String(v).trim()) || 'Password là bắt buộc',
        v => String(v || '').trim().length >= 3 || 'Password tối thiểu 3 ký tự'
      ],
      // Biến cho form đăng ký
      regUsername: '', // Lưu username đăng ký
      regEmail: '',    // Lưu email đăng ký
      regPassword: '', // Lưu password đăng ký
      regConfirm: '',  // Lưu xác nhận password đăng ký
      // Trạng thái chuyển đổi giữa login/register
      isRegister: false, // true: hiện form đăng ký, false: hiện form đăng nhập
      error: ''          // Lưu thông báo lỗi
    }
  },
  mounted() {
    // Khởi tạo nút Google sau khi mount
    this.$nextTick(() => {
      this.initGoogleSignIn();
    });
  },
  watch: {
    // Khi chuyển từ Register về Login, render lại nút Google
    isRegister(newVal) {
      if (!newVal) {
        this.$nextTick(() => {
          this.initGoogleSignIn();
        });
      }
    }
  },
  methods: {
    // Hàm xử lý đăng nhập
    async handleLogin() {
      // Validate client-side trước khi gọi API
      if (this.$refs.loginForm && !this.$refs.loginForm.validate()) {
        this.error = 'Vui lòng nhập đầy đủ và hợp lệ Username/Password';
        return;
      }
      const username = String(this.username || '').trim();
      const password = String(this.password || '').trim();
      if (!username || !password) {
        this.error = 'Vui lòng nhập Username và Password';
        return;
      }
      try {
        // Gửi yêu cầu GET tới API để kiểm tra tài khoản
        const response = await fetch(`http://localhost:3000/accounts?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`)
        const data = await response.json()
        // Đảm bảo khớp chính xác đề phòng server trả rộng
        const matched = Array.isArray(data) ? data.find(acc => acc.username === username && acc.password === password) : null;
        if (matched) {
          this.error = '';
          alert('Đăng nhập thành công!');
          
          // Lưu thông tin user vào localStorage (sẽ bị xóa khi đóng web)
          localStorage.setItem('user', JSON.stringify(matched));
          
          // Cập nhật trạng thái user trong AppBar
          this.$root.$emit('user-logged-in', matched);
          
          this.$router.push('/'); // Chuyển về trang chủ
        } else {
          // Nếu không tìm thấy, báo lỗi
          this.error = 'Sai username hoặc mật khẩu!';
        }
      } catch (err) {
        // Nếu có lỗi kết nối server, báo lỗi
        this.error = 'Lỗi kết nối server!';
      }
    },
    // Google Identity Services
    initGoogleSignIn() {
      const mountButton = () => {
        try {
          const el = document.getElementById('g_id_signin');
          if (!el) return;
          el.innerHTML = '';
          window.google.accounts.id.initialize({
            client_id: '748961342225-f9qhu661v3cgcltqdvbcnsrrcmhd6a7m.apps.googleusercontent.com',
            callback: (res) => this.onGoogleCredentialResponse(res)
          });
          window.google.accounts.id.renderButton(el, {
            theme: 'outline',
            size: 'large',
            text: 'signin_with',
            width: 320
          });
        } catch (e) {
          // ignore if script not loaded yet
        }
      };
      if (window.google && window.google.accounts && window.google.accounts.id) {
        mountButton();
      } else {
        const timer = setInterval(() => {
          if (window.google && window.google.accounts && window.google.accounts.id) {
            clearInterval(timer);
            mountButton();
          }
        }, 200);
        setTimeout(() => clearInterval(timer), 10000);
      }
    },
    async onGoogleCredentialResponse(response) {
      try {
        const payload = this.parseJwt(response && response.credential ? response.credential : '');
        const email = payload && payload.email ? payload.email : '';
        if (!email) {
          this.error = 'Không lấy được email từ Google.';
          return;
        }
        const res = await fetch(`http://localhost:3000/accounts?email=${encodeURIComponent(email)}`);
        const accounts = await res.json();
        if (Array.isArray(accounts) && accounts.length > 0) {
          const user = accounts[0];
          localStorage.setItem('user', JSON.stringify(user));
          this.$root.$emit('user-logged-in', user);
          alert('Đăng nhập thành công bằng Google!');
          this.$router.push('/');
        } else {
          this.isRegister = true;
          this.regEmail = email;
          this.regUsername = '';
          this.regPassword = '';
          this.regConfirm = '';
          this.error = '';
        }
      } catch (e) {
        this.error = 'Đăng nhập Google thất bại!';
      }
    },
    parseJwt(token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
      } catch (e) {
        return null;
      }
    },
    // Hàm xử lý đăng ký
    async handleRegister() {
      // Kiểm tra dữ liệu nhập vào có đủ không
      if (!this.regUsername || !this.regEmail || !this.regPassword || !this.regConfirm) {
        this.error = 'Vui lòng điền đầy đủ thông tin!';
        return;
      }
      // Kiểm tra xác nhận mật khẩu
      if (this.regPassword !== this.regConfirm) {
        this.error = 'Mật khẩu xác nhận không khớp!';
        return;
      }
      try {
        // Lấy danh sách tài khoản hiện tại
        const res = await fetch('http://localhost:3000/accounts');
        const accounts = await res.json();
        // Kiểm tra trùng username
        if (accounts.some(acc => acc.username === this.regUsername)) {
          this.error = 'Username đã tồn tại!';
          return;
        }
        // Kiểm tra trùng email
        if (accounts.some(acc => acc.email === this.regEmail)) {
          this.error = 'Email đã tồn tại!';
          return;
        }
        // Tìm id lớn nhất để tự động tăng id cho tài khoản mới
        const maxId = accounts.length > 0 ? Math.max(...accounts.map(acc => Number(acc.id))) : 0;
        // Tạo tài khoản mới
        const newAccount = {
          id: maxId + 1,
          username: this.regUsername,
          password: this.regPassword,
          email: this.regEmail
        };
        // Gửi POST để thêm tài khoản mới vào db.json qua json-server
        const response = await fetch('http://localhost:3000/accounts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newAccount)
        });
        // Nếu đăng ký thành công
        if (response.ok) {
          alert('Đăng ký thành công!');
          this.isRegister = false; // Quay lại form đăng nhập
          this.error = '';
          // Reset form đăng ký
          this.regUsername = '';
          this.regEmail = '';
          this.regPassword = '';
          this.regConfirm = '';
        } else {
          // Nếu đăng ký thất bại
          this.error = 'Đăng ký thất bại!';
        }
      } catch (err) {
        // Nếu có lỗi kết nối server
        this.error = 'Lỗi kết nối server!';
      }
    }
  }
}
</script>