<template>
  <div>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="py-6">
          <v-card-title class="d-flex justify-center">
            <div class="text-h4">Thông tin tài khoản</div>
          </v-card-title>
          
          <v-card-text>
            <v-form @submit.prevent="updateAccount">
              <v-text-field
                label="Username"
                outlined
                v-model="userInfo.username"
                readonly
                disabled
              ></v-text-field>
              
              <v-text-field
                label="Email"
                outlined
                v-model="userInfo.email"
                type="email"
                :rules="[rules.required, rules.email]"
              ></v-text-field>

              <v-text-field
                label="Mật khẩu cũ"
                outlined
                v-model="userInfo.oldPassword"
                type="password"
                :rules="[rules.requiredOldPassword]"
                hint="Nhập mật khẩu hiện tại để xác nhận"
                persistent-hint
              ></v-text-field>
              
              <v-text-field
                label="Mật khẩu mới"
                outlined
                v-model="userInfo.newPassword"
                type="password"
                :rules="[rules.minLength]"
                hint="Để trống nếu không muốn đổi mật khẩu"
                persistent-hint
              ></v-text-field>
              
              <v-text-field
                label="Xác nhận mật khẩu mới"
                outlined
                v-model="userInfo.confirmPassword"
                type="password"
                :rules="[rules.confirmPassword]"
              ></v-text-field>
              
              <div class="d-flex justify-space-between align-center mt-6">
                <v-btn
                  color="secondary"
                  outlined
                  @click="$router.push('/')"
                >
                  Quay lại
                </v-btn>
                
                <v-btn
                  color="primary"
                  type="submit"
                  :loading="loading"
                  :disabled="!isFormValid"
                >
                  Cập nhật
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Account",
  data() {
    return {
      userInfo: {
        username: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      loading: false,
      rules: {
        required: v => !!v || 'Trường này là bắt buộc',
        email: v => /.+@.+\..+/.test(v) || 'Email không hợp lệ',
        requiredOldPassword: v => !!v || 'Vui lòng nhập mật khẩu cũ',
        minLength: v => !v || v.length >= 6 || 'Mật khẩu phải có ít nhất 6 ký tự',
        confirmPassword: v => !this.userInfo.newPassword || v === this.userInfo.newPassword || 'Mật khẩu xác nhận không khớp'
      }
    }
  },
  computed: {
    isFormValid() {
      return this.userInfo.email && 
             this.userInfo.oldPassword &&
             (!this.userInfo.newPassword || 
              (this.userInfo.newPassword.length >= 6 && 
               this.userInfo.newPassword === this.userInfo.confirmPassword));
    }
  },
  created() {
    // Kiểm tra xem có user đã đăng nhập không
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      this.userInfo.username = userData.username;
      this.userInfo.email = userData.email;
    } else {
      // Nếu không có user, chuyển về trang login
      this.$router.push('/login');
    }
  },
  methods: {
    async updateAccount() {
      if (!this.isFormValid) return;
      
      this.loading = true;
      
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        
        const updateData = {
          email: this.userInfo.email
        };
        
        // Kiểm tra mật khẩu cũ có đúng không
        if (user.password !== this.userInfo.oldPassword) {
          alert('Mật khẩu cũ không đúng!');
          return;
        }
        
        if (this.userInfo.newPassword) {
          updateData.password = this.userInfo.newPassword;
        }
        
        const response = await fetch(`http://localhost:3000/accounts/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateData)
        });
        
        if (response.ok) {
          const updatedUser = { ...user, ...updateData };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          
          alert('Cập nhật thông tin thành công!');
          
          this.userInfo.oldPassword = '';
          this.userInfo.newPassword = '';
          this.userInfo.confirmPassword = '';
        } else {
          throw new Error('Cập nhật thất bại');
        }
      } catch (error) {
        alert('Có lỗi xảy ra khi cập nhật thông tin!');
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
