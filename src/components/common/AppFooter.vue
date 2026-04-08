<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-links">
        <a href="#" class="footer-link">关于我们</a>
        <a href="#" class="footer-link">联系方式</a>
        <a href="#" class="footer-link">意见反馈</a>
      </div>
      <div class="footer-copyright">
        <p>© 2026 洛克王国世界资料站 - 仅供学习交流使用</p>
        <p>本站数据来源于游戏公开信息，如有侵权请联系删除</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.app-footer {
  background: rgba(255, 255, 255, 0.86);
  border-top: 2px solid #dbeafe;
  padding: 30px 20px;
  margin-top: 40px;
  backdrop-filter: blur(6px);

  .footer-container {
    max-width: 1400px;
    margin: 0 auto;
    text-align: center;
  }

  .footer-links {
    margin-bottom: 16px;

    .footer-link {
      color: #475569;
      text-decoration: none;
      margin: 0 16px;
      padding: 6px 12px;
      border-radius: 999px;
      border: 2px solid transparent;
      transition: all 0.2s ease;

      &:hover {
        color: #1f2937;
        border-color: #facc15;
        background: #fff7d6;
      }
    }
  }

  .footer-copyright {
    color: #64748b;
    font-size: 14px;

    p {
      margin: 4px 0;
    }
  }
}
</style>
