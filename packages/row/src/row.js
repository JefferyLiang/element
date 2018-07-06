export default {
  name: 'ElRow',

  componentName: 'ElRow',

  props: {
    // 组件渲染的标签类型
    tag: {
      type: String,
      default: 'div'
    },
    // 组件内部的列的分隔距离
    gutter: Number,
    // 是有使用flex来行内布局
    type: String,
    // 如果是flex布局的情况下 justify-content 的值
    justify: {
      type: String,
      default: 'start'
    },
    // 如果是flex布局的情况下 align-items 的值
    align: {
      type: String,
      default: 'top'
    }
  },

  computed: {
    style() {
      const ret = {};
      // 获取内部分隔的距离，去掉第一个和最后一个的影响
      if (this.gutter) {
        ret.marginLeft = `-${this.gutter / 2}px`;
        ret.marginRight = ret.marginLeft;
      }

      return ret;
    }
  },

  render(h) {
    return h(this.tag, {
      class: [
        'el-row',
        this.justify !== 'start' ? `is-justify-${this.justify}` : '',
        this.align !== 'top' ? `is-align-${this.align}` : '',
        { 'el-row--flex': this.type === 'flex' }
      ],
      style: this.style
    }, this.$slots.default);
  }
};
