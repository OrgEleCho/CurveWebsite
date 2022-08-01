<template>
  <div class="contact-card">
    <table>
      <tr>
        <td class="name">{{ contact.name }}</td>
        <td class="site">{{ contact.site }}</td>
        <td class="dest">{{ contact.dest }}</td>
        <td class="tip">{{ contact.tip }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
module.exports = {
  props: ["contact"],
};
</script>

<style>
.contact-card {
    /*联系方式卡*/
  background-color:darkcyan;
  border-radius: 6px;
}
.contact-card table {
    /*整个表的样式*/
  margin: 4px;
}
.contact-card td {
    /*对于每一列*/
  font-size: 10px;
  padding: 0px 5px 0px 5px;
  border-radius: 3px;
}
/*各种项目*/
.contact-card .name {
  background-color: rgba(95, 255, 255, 0.658);
}
.contact-card .site {
  background-color: aqua;
}
.contact-card .dest {
  background-color: aqua;
}
.contact-card .tip {
  background-color: aqua;
}
</style>